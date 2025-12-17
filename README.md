# Multi-Tenant SaaS Billing Platform

A comprehensive multi-tenant usage metering and billing solution for modern enterprises.

## 🚀 Platform Status

✅ **Production Ready** - All core functionality implemented and tested

## 🏗️ Tech Stack

**Frontend:**
- Next.js (React.js)
- Tailwind CSS
- Recharts for data visualization
- Zustand for state management

**Backend:**
- Node.js & Express
- PostgreSQL (Primary database)
- Redis (Caching and queue management)
- BullMQ (Background job processing)
- Prisma ORM
- JWT-based Authentication

**Infrastructure:**
- Docker (Containerization)
- Kubernetes-ready deployment manifests
- Helm charts for easy deployment

## 🎯 Key Features

✅ Real-time usage ingestion  
✅ Per-tenant usage aggregation  
✅ Pricing & billing rule engine  
✅ Automated invoice generation  
✅ Cost and revenue dashboards  
✅ Anomaly & usage spike detection  
✅ JWT-based authentication (Signup/Login)  
✅ Role-Based Access Control (RBAC)  
✅ Multi-tenant data isolation  
✅ WebSocket real-time updates  
✅ Kubernetes deployment ready  

## 📁 Project Structure

```
saas-billing-platform/
│
├── apps/
│   ├── web/                     # Next.js Frontend
│   │   ├── app/                 # App Router
│   │   ├── components/          # UI Components
│   │   ├── lib/                 # Utilities and API clients
│   │   └── store/               # State management
│   ├── api/                     # Backend (Node.js + Express)
│   │   ├── src/
│   │   │   ├── modules/         # Feature modules
│   │   │   ├── middleware/      # Authentication and RBAC
│   │   │   └── db/              # Database connection
│   │   └── prisma/              # Database schema and migrations
│   └── workers/                 # Background workers
│       └── src/                 # Worker implementations
│
├── packages/
│   └── shared/                  # Shared types and utilities
│
├── infra/
│   ├── helm/                    # Helm charts
│   └── k8s/                     # Kubernetes manifests
│
├── docs/                       # Documentation
└── docker-compose.yml          # Development environment
```

## 🛠️ Prerequisites

Before running the platform, ensure you have the following installed:

1. **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)
2. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
3. **Git** - [Download here](https://git-scm.com/)

## 🚀 Quick Start

### Step 1: Clone the Repository

```bash
git clone https://github.com/Samisdoinnn/MULTITANANT-SAAS.git
cd MULTITANANT-SAAS
```

### Step 2: Start Infrastructure Services

```bash
# Start PostgreSQL and Redis containers
docker-compose up -d

# Verify services are running
docker-compose ps
```

### Step 3: Install Dependencies

```bash
# Install root dependencies
npm install

# Install app dependencies
cd apps/api && npm install
cd ../web && npm install
cd ../workers && npm install
cd ../..
```

### Step 4: Setup Database

```bash
# Generate Prisma Client
cd apps/api
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init
cd ../..
```

### Step 5: Start All Services

You can start all services in two ways:

**Option A: Using the startup script (Windows)**
```powershell
.\start-all.ps1
```

**Option B: Manual startup (3 terminal windows needed)**
```bash
# Terminal 1 - API Server
cd apps/api && npm run dev

# Terminal 2 - Background Workers
cd apps/workers && npm run dev

# Terminal 3 - Web Frontend
cd apps/web && npm run dev
```

### Step 6: Access Applications

- **Web Interface**: http://localhost:3000
- **API Server**: http://localhost:4000
- **Health Check**: http://localhost:4000/health

## 🔐 Authentication

The platform uses JWT-based authentication with RBAC:

- **Admin**: Full access to all features
- **Finance**: Access to billing and invoice features
- **Customer**: Access to their own usage and invoices

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user/tenant
- `POST /api/auth/login` - Login and receive JWT token

### Usage Tracking
- `POST /api/usage/ingest` - Ingest usage events
- `GET /api/usage/summary` - Get usage summary for tenant

### Pricing Plans
- `GET /api/pricing/plans` - Get all pricing plans
- `POST /api/pricing/plans` - Create new pricing plan (Admin only)

### Invoices
- `GET /api/invoices` - Get all invoices for current tenant
- `GET /api/invoices/:id` - Get specific invoice details
- `POST /api/invoices/generate` - Generate invoice (Admin/Finance only)

## 🧪 Testing the Platform

After starting all services, you can test the platform:

1. Visit http://localhost:3000 to access the web interface
2. Register a new account
3. Login and explore the dashboard
4. Send usage events through the API
5. View usage summaries and invoices

## 🐳 Docker Services

The platform uses Docker for development:

- **PostgreSQL**: Port 5432 (Database)
- **Redis**: Port 6379 (Caching and Queues)

## 🔧 Environment Variables

The platform uses environment variables for configuration. Check `.env.example` files in each app directory for required variables.

## 📚 Documentation

- [API Contracts](./docs/api-contracts.md) - Detailed API documentation
- [Data Model](./docs/data-model.md) - Database schema documentation
- [Deployment Guide](./infra/README.md) - Kubernetes deployment instructions

## 🛡️ Security

- JWT tokens for authentication
- Role-based access control
- Multi-tenant data isolation
- Input validation and sanitization
- Secure password hashing

## 📈 Scalability

- Horizontal scaling support
- Background job processing
- Caching with Redis
- Database connection pooling
- Kubernetes deployment ready

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please open an issue on GitHub or contact the maintainers.