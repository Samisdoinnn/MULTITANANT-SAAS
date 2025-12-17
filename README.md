# SaaS Billing Platform

A comprehensive multi-tenant usage metering and billing solution for modern enterprises.

## Platform Status

✅ **Production Ready** - All core functionality implemented and tested

## Architecture Overview

```
saas-billing-platform/
│
├── apps/
│   ├── web/                     # Next.js Frontend
│   ├── api/                     # Backend (Node.js + Express)
│   └── workers/                 # Background workers
│
├── packages/
│   └── shared/                  # Shared types and utilities
│
├── infra/
│   ├── helm/
│   └── k8s/
│
└── docs/
```

## Tech Stack

**Frontend:**
- Next.js (React.js)
- Tailwind CSS
- WebSockets (real-time updates)

**Backend:**
- Node.js & Express
- PostgreSQL
- Redis
- Background Workers / Event Processing
- JWT-based Authentication

## Key Features Implemented

✅ Real-time usage ingestion  
✅ Per-tenant usage aggregation  
✅ Pricing & billing rule engine  
✅ Invoice generation and previews  
✅ Cost and revenue dashboards  
✅ Anomaly & usage spike detection  
✅ JWT-based authentication (Signup/Login)  
✅ Role-Based Access Control (RBAC)  
✅ Multi-tenant isolation  

## Setup Instructions

1. **Start Docker Containers** (PostgreSQL & Redis):
   ```bash
   docker-compose up -d
   ```

2. **Start All Services**:
   ```bash
   # Windows PowerShell
   .\start-all.ps1
   ```

3. **Access Applications**:
   - Web Interface: http://localhost:3000
   - API Server: http://localhost:4000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Usage
- `POST /api/usage/ingest` - Ingest usage events
- `GET /api/usage/summary` - Get usage summary

### Pricing
- `GET /api/pricing/plans` - Get all pricing plans
- `POST /api/pricing/plans` - Create pricing plan (Admin only)

### Invoices
- `GET /api/invoices` - Get invoices for current tenant
- `GET /api/invoices/:id` - Get specific invoice
- `POST /api/invoices/generate` - Generate invoice (Admin/Finance only)

## Testing

The platform has been thoroughly tested with:
- User registration and authentication
- Usage event ingestion and processing
- Pricing plan management
- Usage summary reporting

All services are functioning correctly and ready for production use.