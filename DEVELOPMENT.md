# Development Server Startup Scripts

This directory contains several scripts to easily start both the Strapi backend and Next.js frontend servers simultaneously for the Molly Rose Foundation website.

## 🚀 Available Startup Options

### 1. NPM Scripts (Recommended)

The easiest way to start both servers is using the npm scripts:

```bash
# Start both servers using concurrently (requires Strapi in ../molly_strapi_backend)
npm run dev:full

# Start both servers using the Node.js script (cross-platform, auto-detects Strapi location)
npm run dev:node

# Start both servers using bash script (Linux/Mac only)
npm run dev:bash

# Start only Next.js (normal development)
npm run dev
```

### 2. Direct Script Execution

#### Bash Script (Linux/Mac)
```bash
./start-dev.sh
```

#### Windows Batch File
```cmd
start-dev.bat
```

#### Node.js Script (Cross-platform)
```bash
node start-dev.js
```

## 📁 Strapi Directory Detection

The scripts will automatically look for your Strapi server in these locations:

1. `../molly_strapi_backend` (default expected location)
2. `./backend`
3. `./strapi`
4. `../strapi`

If Strapi is not found, the scripts will start only the Next.js server and display instructions for running Strapi manually.

## 🌐 Server URLs

Once started, you can access:

- **Next.js Frontend**: http://localhost:3000
- **Strapi Backend**: http://localhost:1337
- **Strapi Admin Panel**: http://localhost:1337/admin

## 🛑 Stopping Servers

- **Bash/Node.js scripts**: Press `Ctrl+C` to stop all servers
- **Windows batch**: Press any key to stop all servers
- **NPM concurrently**: Press `Ctrl+C` to stop all servers

## 📋 Script Features

### All Scripts Include:
- ✅ Automatic Strapi directory detection
- ✅ Colored console output
- ✅ Error handling and fallbacks
- ✅ Graceful shutdown on Ctrl+C
- ✅ Status messages and server URLs

### Additional Features by Script:

#### Node.js Script (`start-dev.js`)
- Cross-platform compatibility
- Real-time log output from both servers
- Robust error handling
- Process cleanup on exit

#### Bash Script (`start-dev.sh`)
- Linux/Mac optimized
- Background process management
- Log file creation
- Detailed status reporting

#### Windows Batch (`start-dev.bat`)
- Windows-specific commands
- Separate command windows for each server
- Easy termination process

## 🔧 Dependencies

### Required:
- Node.js and npm
- Next.js project setup
- Strapi project (optional, will start Next.js only if not found)

### Optional:
- `concurrently` package (for `npm run dev:full`) - automatically installed

## 🎯 Recommended Usage

1. **For daily development**: `npm run dev:node` (most reliable, cross-platform)
2. **For quick testing**: `npm run dev:full` (fastest startup)
3. **For Linux/Mac users**: `./start-dev.sh` (most features)
4. **For Windows users**: `start-dev.bat` (native Windows experience)

## 🐛 Troubleshooting

### Strapi Not Found
- Ensure your Strapi project is in one of the expected directories
- Check that the Strapi directory contains a `package.json`
- Run Strapi manually: `cd your-strapi-directory && npm run develop`

### Port Conflicts
- Make sure ports 3000 (Next.js) and 1337 (Strapi) are not in use
- Stop any existing servers before running the scripts

### Permission Errors (Linux/Mac)
```bash
chmod +x start-dev.sh
chmod +x start-dev.js
```

### Windows Execution Policy
If you get execution policy errors, run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy RemoteSigned
```

## 📝 Customization

You can modify the scripts to:
- Change default Strapi directory paths
- Modify server ports
- Add additional startup commands
- Customize log output
- Add environment-specific configurations

Edit the script files directly or modify the npm scripts in `package.json` to suit your specific needs.
