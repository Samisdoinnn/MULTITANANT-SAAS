import { Router } from 'express';
import { Queue } from 'bullmq';
import prisma from '../../db';
import { authenticate } from '../../middleware/auth.middleware';
import crypto from 'crypto';

const router = Router();
const usageQueue = new Queue('usage-events', {
    connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
    }
});

// Ingest usage event
router.post('/ingest', authenticate, async (req, res) => {
    try {
        const { eventType, quantity, idempotencyKey } = req.body;
        // @ts-ignore - tenantId comes from auth middleware
        const tenantId = req.user.tenantId;

        if (!eventType || !quantity) {
            return res.status(400).json({ message: 'Missing eventType or quantity' });
        }

        const key = idempotencyKey || crypto.randomUUID();

        // Push to queue for async processing to ensure high throughput
        // We do NOT write to DB directly here to avoid bottlenecks
        await usageQueue.add('process-usage', {
            tenantId,
            eventType,
            quantity,
            idempotencyKey: key,
            timestamp: new Date()
        }, {
            jobId: key // Deduplication at queue level if supported or handled in worker
        });

        res.status(202).json({ message: 'Event accepted', id: key });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get usage summary (Dashboard)
router.get('/summary', authenticate, async (req, res) => {
    try {
        // @ts-ignore
        const tenantId = req.user.tenantId;

        // Simple aggregation for now
        const usage = await prisma.usageEvent.groupBy({
            by: ['eventType'],
            where: { tenantId },
            _sum: {
                quantity: true
            }
        });

        res.json(usage);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
