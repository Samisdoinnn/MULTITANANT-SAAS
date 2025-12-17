import { Router } from 'express';
import prisma from '../../db';
import { authenticate } from '../../middleware/auth.middleware';
import { requireRole } from '../../middleware/rbac.middleware';

const router = Router();

// Get all pricing plans
router.get('/plans', authenticate, async (req, res) => {
    try {
        const plans = await prisma.pricingPlan.findMany();
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create pricing plan (Admin only)
router.post('/plans', authenticate, requireRole(['ADMIN']), async (req, res) => {
    try {
        const { name, description, type, basePrice, includedUnits, overageRate } = req.body;

        const plan = await prisma.pricingPlan.create({
            data: {
                name,
                description,
                type,
                basePrice,
                includedUnits,
                overageRate,
            },
        });

        res.json(plan);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
