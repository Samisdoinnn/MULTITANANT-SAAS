import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { Worker } from 'bullmq';

dotenv.config();

const prisma = new PrismaClient();

const connection = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379')
};

console.log('🚀 Worker Service Starting...');

// Usage Event Worker
const usageWorker = new Worker('usage-events', async job => {
    console.log(`Processing usage event: ${job.id}`);

    const { tenantId, eventType, quantity, idempotencyKey, timestamp } = job.data;

    try {
        // Check idempotency
        if (idempotencyKey) {
            const existing = await prisma.usageEvent.findUnique({
                where: { idempotencyKey }
            });
            if (existing) {
                console.log(`Skipping duplicate event: ${idempotencyKey}`);
                return;
            }
        }

        // Record Event
        await prisma.usageEvent.create({
            data: {
                tenantId,
                eventType,
                quantity,
                idempotencyKey,
                timestamp: timestamp || new Date(),
                processed: true
            }
        });

        // TODO: Here we could trigger real-time updates via Socket.io or check for billing limits

        console.log(`Successfully recorded event for tenant ${tenantId}`);

    } catch (error) {
        console.error(`Failed to process job ${job.id}:`, error);
        throw error;
    }
}, { connection });

usageWorker.on('completed', job => {
    console.log(`Job ${job.id} completed successfully`);
});

usageWorker.on('failed', (job, err) => {
    console.log(`Job ${job?.id} failed: ${err.message}`);
});

// Clean shut down
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing queues');
    await usageWorker.close();
    await prisma.$disconnect();
    process.exit(0);
});
