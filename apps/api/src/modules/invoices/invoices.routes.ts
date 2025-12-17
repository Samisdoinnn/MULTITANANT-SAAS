import { Router } from 'express';
import prisma from '../../db';
import { authenticate } from '../../middleware/auth.middleware';
import { requireRole } from '../../middleware/rbac.middleware';

const router = Router();

// Get invoices for current tenant
router.get('/', authenticate, async (req, res) => {
    try {
        // @ts-ignore
        const tenantId = req.user.tenantId;

        const invoices = await prisma.invoice.findMany({
            where: { tenantId },
            include: {
                items: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get single invoice
router.get('/:id', authenticate, async (req, res) => {
    try {
        // @ts-ignore
        const tenantId = req.user.tenantId;
        const { id } = req.params;

        const invoice = await prisma.invoice.findFirst({
            where: {
                id,
                tenantId,
            },
            include: {
                items: true,
            },
        });

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.json(invoice);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Generate invoice (Admin/Finance only)
router.post('/generate', authenticate, requireRole(['ADMIN', 'FINANCE']), async (req, res) => {
    try {
        const { tenantId, billingStart, billingEnd } = req.body;

        // Get usage events for the period
        const usageEvents = await prisma.usageEvent.findMany({
            where: {
                tenantId,
                timestamp: {
                    gte: new Date(billingStart),
                    lte: new Date(billingEnd),
                },
            },
        });

        // Simple calculation: $0.01 per API call
        const totalUsage = usageEvents.reduce((sum, event) => sum + event.quantity, 0);
        const amount = totalUsage * 0.01;

        // Create invoice
        const invoice = await prisma.invoice.create({
            data: {
                tenantId,
                amount,
                status: 'PENDING',
                billingStart: new Date(billingStart),
                billingEnd: new Date(billingEnd),
                items: {
                    create: [
                        {
                            description: 'API Usage',
                            quantity: totalUsage,
                            unitPrice: 0.01,
                            total: amount,
                        },
                    ],
                },
            },
            include: {
                items: true,
            },
        });

        res.json(invoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
