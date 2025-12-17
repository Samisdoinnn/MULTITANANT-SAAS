# 🐳 Docker Installation Guide for SaaS Billing Platform

**Important**: Docker is REQUIRED for this platform to run PostgreSQL and Redis services.

## 📋 Prerequisites

- Windows 10/11 Pro, Enterprise, or Education (Build 19041 or higher)
- Minimum 4GB RAM (8GB recommended)
- Administrator privileges

## Step 1: Download Docker Desktop

1. Visit [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Click "Download for Windows"
3. Save the installer to your Downloads folder

## Step 2: Install Docker Desktop

1. Close all applications
2. Right-click the downloaded installer and select "Run as administrator"
3. Follow the installation wizard:
   - Accept the default installation location
   - **Important**: Check "Use WSL 2 instead of Hyper-V" if available
   - Check "Add Docker to PATH"
   - Check "Enable Docker Compose V2"
4. Click "Install" and wait for completion
5. Restart your computer when prompted

## Step 3: Start Docker Desktop

1. Search for "Docker Desktop" in Start Menu
2. Click to open Docker Desktop
3. Wait 2-3 minutes for Docker to fully start
4. Ensure the Docker icon in system tray is green and stable

## Step 4: Verify Installation

Open PowerShell and run:

```powershell
docker --version
docker-compose --version
```

Expected output:
```
Docker version 24.x.x, build xxxxx
Docker Compose version v2.x.x
```

## Step 5: Test Docker Installation

Run these commands to verify Docker is working correctly:

```powershell
# Test Docker
docker run hello-world

# Test Docker Compose
mkdir docker-test
cd docker-test
echo 'version: "3.8"
services:
  test:
    image: nginx:alpine' > docker-compose.yml
docker-compose up -d
docker-compose down
cd ..
rm -r docker-test
```

## 🚨 Common Issues and Solutions

### Issue: "WSL 2 installation is incomplete"

**Solution**:
1. Download the latest WSL2 Linux kernel update package from Microsoft
2. Install it from the Microsoft Store
3. Open PowerShell as Administrator and run:
   ```powershell
   wsl --set-default-version 2
   wsl --install -d Ubuntu
   ```
4. Restart your computer

### Issue: "Docker Desktop requires the Windows Subsystem for Linux 2"

**Solution**:
1. Open PowerShell as Administrator
2. Run: `wsl --install`
3. Restart your computer
4. After restart, open PowerShell and run: `wsl --set-default-version 2`

### Issue: "Hardware assisted virtualization is not enabled"

**Solution**:
1. Restart your computer and enter BIOS/UEFI settings (usually by pressing F2, F12, or Del during boot)
2. Find Virtualization Technology (VT-x for Intel, AMD-V for AMD) and enable it
3. Save settings and exit BIOS
4. In Windows, enable Hyper-V:
   - Open Control Panel
   - Go to Programs > Turn Windows features on or off
   - Check "Hyper-V" and click OK
   - Restart your computer

### Issue: "Docker Desktop failed to start"

**Solution**:
1. Completely uninstall Docker Desktop
2. Delete Docker directories:
   - `C:\Program Files\Docker`
   - `C:\Users\[Username]\AppData\Roaming\Docker Desktop`
   - `C:\Users\[Username]\AppData\Local\Docker`
3. Reboot your computer
4. Reinstall Docker Desktop

## 🛠️ Post-Installation Configuration

### Increase Docker Resources

1. Open Docker Desktop
2. Go to Settings > Resources
3. Allocate:
   - CPUs: 2-4 cores
   - Memory: 4-6 GB
   - Swap: 1-2 GB
4. Click "Apply & Restart"

### Enable File Sharing

1. Open Docker Desktop
2. Go to Settings > Resources > File Sharing
3. Add the project directory:
   - `C:\Users\shameer khan\Desktop\multitanant saas`
4. Click "Apply & Restart"

## 🚀 Starting the SaaS Platform

After Docker is successfully installed:

```powershell
cd "c:\Users\shameer khan\Desktop\multitanant saas"
docker-compose up -d
```

This will start:
- PostgreSQL on port 5432
- Redis on port 6379

Verify services are running:
```powershell
docker-compose ps
```

## 🆘 Need Help?

If you continue to have issues:

1. Check [Docker Documentation](https://docs.docker.com/desktop/windows/install/) for detailed instructions
2. Visit Docker Community Forums
3. Contact platform support

Remember: Docker is essential for this platform. Manual installation of PostgreSQL and Redis is possible but not recommended as it significantly increases complexity and reduces reliability.
