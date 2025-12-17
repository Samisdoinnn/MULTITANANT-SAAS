# Production-Ready SaaS Billing Platform - Setup Guide

## Prerequisites

You **MUST** have the following installed:

1. **Node.js v18+** - [Download](https://nodejs.org/)
2. **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/)
3. **Git** - [Download](https://git-scm.com/)

## Installation Steps

### 1. Install Docker Desktop

**Windows:**
1. Download Docker Desktop from https://www.docker.com/products/docker-desktop/
2. Run the installer
3. Restart your computer
4. Open Docker Desktop and wait for it to start
5. Verify installation:
   ```powershell
   docker --version
   docker-compose --version
   ```

### 2. Start Infrastructure Services

```powershell
# Navigate to project directory
cd "c:\Users\shameer khan\Desktop\multitanant saas"

# Start PostgreSQL and Redis
docker-compose up -d

# Verify services are running
docker-compose ps
```

You should see:
- `saas-postgres` - running on port 5432
- `saas-redis` - running on port 6379

### 3. Install Dependencies

```powershell
npm install
```

### 4. Setup Database

```powershell
# Generate Prisma Client
cd apps/api
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev --name init

# Go back to root
cd ../..
```

### 5. Start Application Services

Open **3 separate terminal windows**:

**Terminal 1 - API Server:**
```powershell
cd apps/api
npm run dev
```
Should show: `🚀 API Service running on port 4000`

**Terminal 2 - Worker Service:**
```powershell
cd apps/workers
npm run dev
```
Should show: `🚀 Worker Service Starting...`

**Terminal 3 - Web Frontend:**
```powershell
cd apps/web
npm run dev
```
Should show: `Ready on http://localhost:3000`

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **API**: http://localhost:4000
- **Health Check**: http://localhost:4000/health

## Testing the Platform

### 1. Create Account
1. Go to http://localhost:3000
2. Click "Get Started"
3. Click "Sign up"
4. Fill in:
   - Company Name: Test Corp
   - Email: admin@test.com
   - Password: password123
5. Click "Sign Up"

### 2. Explore Dashboard
- View stats cards
- Check usage charts
- Browse invoices

### 3. Test API (Optional)

Get your JWT token from browser console (localStorage.getItem('token')), then:

```powershell
# Ingest usage event
curl -X POST http://localhost:4000/api/usage/ingest `
  -H "Authorization: Bearer YOUR_TOKEN" `
  -H "Content-Type: application/json" `
  -d '{\"eventType\":\"api_call\",\"quantity\":100}'
```

## Troubleshooting

### Docker Issues

**"docker: command not found"**
- Install Docker Desktop from https://www.docker.com/products/docker-desktop/
- Restart your computer after installation

**"Cannot connect to Docker daemon"**
- Open Docker Desktop application
- Wait for it to fully start (whale icon in system tray)

**Port already in use**
```powershell
# Stop existing containers
docker-compose down

# Check what's using the port
netstat -ano | findstr :5432
netstat -ano | findstr :6379

# Kill the process or change ports in docker-compose.yml
```

### Database Issues

**"Can't reach database server"**
```powershell
# Check if PostgreSQL container is running
docker-compose ps

# View logs
docker-compose logs postgres

# Restart containers
docker-compose restart
```

**"Migration failed"**
```powershell
# Reset database
cd apps/api
npx prisma migrate reset
npx prisma migrate dev --name init
```

### Application Issues

**"Module not found"**
```powershell
# Clean install
rm -rf node_modules
rm package-lock.json
npm install
```

**"Port 3000/4000 already in use"**
```powershell
# Find and kill the process
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## Stopping the Platform

```powershell
# Stop application services (Ctrl+C in each terminal)

# Stop Docker containers
docker-compose down

# Stop and remove volumes (WARNING: deletes all data)
docker-compose down -v
```

## Production Deployment

For production deployment, see:
- Kubernetes manifests in `infra/k8s/`
- Helm charts in `infra/helm/billing-platform/`

## Tech Stack (As Specified)

- **Frontend**: Next.js 14, Tailwind CSS, Recharts
- **Backend**: Node.js, Express, PostgreSQL, Redis
- **Queue**: BullMQ
- **ORM**: Prisma
- **Auth**: JWT
- **Infrastructure**: Docker, Kubernetes

## Support

If you encounter issues:
1. Check Docker Desktop is running
2. Verify all containers are healthy: `docker-compose ps`
3. Check logs: `docker-compose logs`
4. Ensure ports 3000, 4000, 5432, 6379 are available
