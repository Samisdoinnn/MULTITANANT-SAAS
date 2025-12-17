# Quick Start Script for SaaS Billing Platform
# Run this after Docker Desktop is installed and running

Write-Host "🚀 Starting SaaS Billing Platform..." -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
Write-Host "Checking Docker..." -ForegroundColor Yellow
try {
    docker --version | Out-Null
    Write-Host "✅ Docker is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not installed or not running" -ForegroundColor Red
    Write-Host "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop/" -ForegroundColor Red
    Write-Host "See INSTALL_DOCKER.md for instructions" -ForegroundColor Red
    exit 1
}

# Start infrastructure
Write-Host ""
Write-Host "Starting PostgreSQL and Redis..." -ForegroundColor Yellow
docker-compose up -d

# Wait for services to be healthy
Write-Host "Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Check service status
Write-Host ""
Write-Host "Service Status:" -ForegroundColor Yellow
docker-compose ps

# Setup database
Write-Host ""
Write-Host "Setting up database..." -ForegroundColor Yellow
Set-Location apps/api
npx prisma generate
npx prisma migrate dev --name init
Set-Location ../..

Write-Host ""
Write-Host "✅ Infrastructure is ready!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Open 3 terminal windows" -ForegroundColor White
Write-Host "2. Terminal 1: cd apps/api && npm run dev" -ForegroundColor White
Write-Host "3. Terminal 2: cd apps/workers && npm run dev" -ForegroundColor White
Write-Host "4. Terminal 3: cd apps/web && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then visit: http://localhost:3000" -ForegroundColor Green
