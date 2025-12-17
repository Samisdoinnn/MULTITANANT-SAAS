# Script to start all services for the SaaS Billing Platform

Write-Host "Starting SaaS Billing Platform..." -ForegroundColor Green

# Start API Server
Write-Host "Starting API Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$(Get-Location)\apps\api'; npm run dev" -WindowStyle Normal

# Wait a moment for API to start
Start-Sleep -Seconds 5

# Start Workers
Write-Host "Starting Workers..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$(Get-Location)\apps\workers'; npm run dev" -WindowStyle Normal

# Wait a moment for workers to start
Start-Sleep -Seconds 5

# Start Web Server
Write-Host "Starting Web Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$(Get-Location)\apps\web'; npm run dev" -WindowStyle Normal

Write-Host "All services started!" -ForegroundColor Green
Write-Host "API Server: http://localhost:4000" -ForegroundColor Cyan
Write-Host "Web Server: http://localhost:3000" -ForegroundColor Cyan