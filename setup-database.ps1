# Setup Database Script for SaaS Billing Platform

Write-Host "Setting up database for SaaS Billing Platform..." -ForegroundColor Green

# Navigate to API directory
Set-Location -Path "$PSScriptRoot\apps\api"

# Generate Prisma Client
Write-Host "Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate

# Run database migrations
Write-Host "Running database migrations..." -ForegroundColor Yellow
npx prisma migrate dev --name init

Write-Host "Database setup completed successfully!" -ForegroundColor Green