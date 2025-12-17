# 🚀 SaaS Billing Platform - Complete Setup Guide

This guide provides step-by-step instructions to get the Multi-Tenant SaaS Billing Platform up and running on your local machine.

## 📋 System Requirements

### Hardware Requirements
- **CPU**: Minimum 2 cores (4 cores recommended)
- **RAM**: Minimum 8GB (16GB recommended)
- **Storage**: Minimum 20GB free disk space

### Software Requirements

| Software | Minimum Version | Purpose |
|----------|----------------|---------|
| Windows | 10/11 | Operating System |
| Node.js | 18.x | Runtime Environment |
| npm | 8.x | Package Manager |
| Docker Desktop | 20.10+ | Containerization |
| Git | 2.30+ | Version Control |

## 🛠️ Installation Steps

### Step 1: Install Prerequisites

#### Install Node.js
1. Download Node.js LTS version from [nodejs.org](https://nodejs.org/)
2. Run the installer and follow the setup wizard
3. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

#### Install Git
1. Download Git from [git-scm.com](https://git-scm.com/)
2. Run the installer with default settings
3. Verify installation:
   ```powershell
   git --version
   ```

#### Install Docker Desktop
Refer to [INSTALL_DOCKER.md](./INSTALL_DOCKER.md) for detailed Docker installation instructions.

### Step 2: Clone and Navigate to Project

```powershell
# Clone the repository
git clone https://github.com/Samisdoinnn/MULTITANANT-SAAS.git
cd MULTITANANT-SAAS
```

### Step 3: Start Infrastructure Services

```powershell
# Start PostgreSQL and Redis containers
docker-compose up -d

# Verify services are running
docker-compose ps
```

Expected output:
```
NAME                COMMAND                  SERVICE             STATUS              PORTS
saas-postgres       "docker-entrypoint.s…"   postgres            running             0.0.0.0:5432->5432/tcp
saas-redis          "docker-entrypoint.s…"   redis               running             0.0.0.0:6379->6379/tcp
```

### Step 4: Install Project Dependencies

```powershell
# Install root dependencies
npm install

# Install API service dependencies
cd apps/api
npm install
cd ..

# Install Web frontend dependencies
cd web
npm install
cd ..

# Install Workers service dependencies
cd workers
npm install
cd ../..
```

### Step 5: Setup Database

```powershell
# Navigate to API directory
cd apps/api

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Return to project root
cd ../..
```

### Step 6: Configure Environment Variables

Check the `.env.example` files in each service directory and create corresponding `.env` files with appropriate values:

```powershell
# Copy example environment files
copy apps\api\.env.example apps\api\.env
copy apps\web\.env.local.example apps\web\.env.local
copy apps\workers\.env.example apps\workers\.env
```

Update the `.env` files with your specific configuration if needed.

### Step 7: Start Application Services

You have two options to start the services:

#### Option A: Using the Startup Script (Recommended)

```powershell
# Run the startup script (Windows PowerShell)
.\start-all.ps1
```

#### Option B: Manual Startup (3 Terminal Windows)

**Terminal 1 - API Server:**
```powershell
cd apps/api
npm run dev
```
Expected output: `🚀 API Service running on port 4000`

**Terminal 2 - Background Workers:**
```powershell
cd apps/workers
npm run dev
```
Expected output: `🚀 Worker Service Starting...`

**Terminal 3 - Web Frontend:**
```powershell
cd apps/web
npm run dev
```
Expected output: `Ready on http://localhost:3000`

### Step 8: Access the Applications

- **Web Interface**: http://localhost:3000
- **API Server**: http://localhost:4000
- **API Health Check**: http://localhost:4000/health

## 🧪 Testing the Platform

### 1. User Registration and Authentication

1. Open your browser and navigate to http://localhost:3000
2. Click "Get Started" on the homepage
3. Click "Sign up" to create a new account
4. Fill in the registration form:
   - Company Name: Test Corporation
   - Email: admin@test.com
   - Password: SecurePass123!
5. Click "Sign Up" to create your account
6. You'll be redirected to the dashboard

### 2. Dashboard Exploration

After logging in, explore the dashboard features:
- **Stats Cards**: View revenue, active tenants, API requests, and latency metrics
- **Usage Charts**: Analyze API usage trends over time
- **Recent Invoices**: Review billing history

### 3. Usage Event Ingestion

1. Navigate to the "Usage" section in the dashboard
2. Use the API to send usage events:
   ```powershell
   # First, login to get your JWT token
   $authResponse = Invoke-RestMethod -Uri "http://localhost:4000/api/auth/login" -Method Post -Body '{"email":"admin@test.com","password":"SecurePass123!"}' -ContentType "application/json"
   $token = $authResponse.token
   
   # Send a usage event
   Invoke-RestMethod -Uri "http://localhost:4000/api/usage/ingest" -Method Post -Body '{"eventType":"api_call","quantity":50}' -ContentType "application/json" -Headers @{"Authorization"="Bearer $token"}
   ```

### 4. Pricing Plan Management

As an admin user, you can create and manage pricing plans:

1. Navigate to the "Pricing" section
2. Click "Create New Plan"
3. Fill in plan details:
   - Name: Premium Plan
   - Description: High-volume usage plan
   - Type: METERED
   - Base Price: $0.00
   - Included Units: 10000
   - Overage Rate: $0.02

### 5. Invoice Generation

1. Navigate to the "Billing" section
2. Click "Generate Invoice"
3. Select date range for billing period
4. Review and confirm invoice generation

## 🔧 Configuration Options

### Environment Variables

#### API Service (.env)
- `PORT`: API server port (default: 4000)
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_HOST`: Redis server hostname
- `REDIS_PORT`: Redis server port
- `JWT_SECRET`: Secret key for JWT token signing

#### Web Frontend (.env.local)
- `NEXT_PUBLIC_API_URL`: API server URL
- `NEXT_PUBLIC_WS_URL`: WebSocket server URL

#### Workers Service (.env)
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_HOST`: Redis server hostname
- `REDIS_PORT`: Redis server port

## 🚨 Troubleshooting Guide

### Docker-Related Issues

#### "Docker daemon is not running"
**Solution:**
1. Open Docker Desktop application
2. Wait for the whale icon to become stable in the system tray
3. Retry your Docker commands

#### "Port already allocated"
**Solution:**
```powershell
# Stop conflicting containers
docker-compose down

# Check what's using the ports
netstat -ano | findstr :5432
netstat -ano | findstr :6379

# Kill conflicting processes if needed
taskkill /PID <process_id> /F

# Restart services
docker-compose up -d
```

#### "Insufficient resources"
**Solution:**
1. Open Docker Desktop
2. Go to Settings > Resources
3. Increase allocated CPU, Memory, and Swap
4. Click "Apply & Restart"

### Database Issues

#### "Connection refused to PostgreSQL"
**Solution:**
```powershell
# Check container status
docker-compose ps

# View PostgreSQL logs
docker-compose logs postgres

# Restart containers if needed
docker-compose restart postgres
```

#### "Prisma migration failed"
**Solution:**
```powershell
# Navigate to API directory
cd apps/api

# Reset database (WARNING: This will delete all data)
npx prisma migrate reset

# Run migrations again
npx prisma migrate dev --name init
```

### Application Issues

#### "Module not found" errors
**Solution:**
```powershell
# Clean install all dependencies
rm -rf node_modules package-lock.json
npm install

# Install in each service directory
cd apps/api
rm -rf node_modules package-lock.json
npm install
cd ../web
rm -rf node_modules package-lock.json
npm install
cd ../workers
rm -rf node_modules package-lock.json
npm install
cd ../..
```

#### "Port already in use" errors
**Solution:**
```powershell
# Find processes using the ports
netstat -ano | findstr :3000
netstat -ano | findstr :4000

# Kill the processes
taskkill /PID <process_id> /F
```

#### "TypeScript compilation errors"
**Solution:**
```powershell
# Clean TypeScript build cache
npx tsc --build --clean

# Rebuild
npx tsc --build
```

### Network Issues

#### "ECONNREFUSED" errors
**Solution:**
1. Verify all services are running
2. Check firewall settings
3. Ensure localhost connections are allowed
4. Restart all services

## 🛑 Stopping the Platform

### Graceful Shutdown

```powershell
# If using manual startup, press Ctrl+C in each terminal window

# Stop Docker containers
docker-compose down
```

### Complete Cleanup (Deletes All Data)

```powershell
# Stop and remove containers, networks, and volumes
docker-compose down -v
```

## 🚀 Production Deployment

### Kubernetes Deployment

The platform includes Kubernetes manifests and Helm charts for production deployment:

- **Kubernetes manifests**: `infra/k8s/`
- **Helm charts**: `infra/helm/billing-platform/`

### Environment-Specific Configuration

For production deployment, update the following:

1. **Security**:
   - Change default JWT secrets
   - Use strong database passwords
   - Enable HTTPS
   - Configure proper CORS policies

2. **Performance**:
   - Adjust resource limits in Kubernetes manifests
   - Configure database connection pooling
   - Optimize Redis configuration

3. **Monitoring**:
   - Integrate with logging solutions
   - Add health checks
   - Configure metrics collection

## 📚 Additional Documentation

- [API Contracts](./docs/api-contracts.md) - Detailed API documentation
- [Data Model](./docs/data-model.md) - Database schema documentation
- [Requirements](./docs/requirements.md) - System requirements and dependencies
- [Docker Installation Guide](./INSTALL_DOCKER.md) - Detailed Docker setup instructions

## 🤝 Support

If you encounter issues that aren't resolved by this guide:

1. Check all prerequisites are installed correctly
2. Verify Docker Desktop is running and healthy
3. Ensure all containers are running: `docker-compose ps`
4. Check service logs: `docker-compose logs <service>`
5. Confirm ports 3000, 4000, 5432, and 6379 are available
6. Open an issue on GitHub with detailed error information

## 📈 Next Steps

After successfully setting up the platform:

1. Explore the admin features for pricing plan management
2. Test the billing workflow with multiple tenants
3. Review the analytics and reporting capabilities
4. Customize the UI to match your branding
5. Extend the platform with additional features

The platform is now ready for development, testing, and production use!
