#!/usr/bin/env node

/**
 * Molly Rose Foundation - Development Server Startup Script
 * Cross-platform Node.js script to start both Strapi and Next.js servers
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function findStrapiDirectory() {
  const possiblePaths = [
    '../molly_strapi_backend',
    './backend',
    './strapi',
    '../strapi'
  ];

  for (const dir of possiblePaths) {
    const fullPath = path.resolve(dir);
    if (fs.existsSync(fullPath) && fs.existsSync(path.join(fullPath, 'package.json'))) {
      return fullPath;
    }
  }
  
  return null;
}

function startServer(command, args, cwd, name, color) {
  return new Promise((resolve, reject) => {
    log(`🚀 Starting ${name}...`, color);
    
    const server = spawn(command, args, {
      cwd: cwd,
      stdio: 'pipe',
      shell: true
    });

    server.stdout.on('data', (data) => {
      const output = data.toString().trim();
      if (output) {
        log(`[${name}] ${output}`, color);
      }
    });

    server.stderr.on('data', (data) => {
      const output = data.toString().trim();
      if (output && !output.includes('Warning')) {
        log(`[${name}] ${output}`, 'red');
      }
    });

    server.on('close', (code) => {
      if (code !== 0) {
        log(`❌ ${name} exited with code ${code}`, 'red');
        reject(new Error(`${name} failed to start`));
      } else {
        log(`✅ ${name} stopped`, color);
        resolve();
      }
    });

    server.on('error', (error) => {
      log(`❌ Failed to start ${name}: ${error.message}`, 'red');
      reject(error);
    });

    // Store the process for cleanup
    server.name = name;
    return server;
  });
}

async function main() {
  log('🚀 Starting Molly Rose Foundation Development Environment...', 'cyan');
  log('='.repeat(60), 'cyan');

  const servers = [];
  
  // Find and start Strapi server
  const strapiDir = findStrapiDirectory();
  if (strapiDir) {
    log(`📡 Found Strapi at: ${strapiDir}`, 'blue');
    const strapiServer = spawn('npm', ['run', 'develop'], {
      cwd: strapiDir,
      stdio: 'pipe',
      shell: true
    });
    servers.push(strapiServer);
    
    strapiServer.stdout.on('data', (data) => {
      const output = data.toString().trim();
      if (output) {
        log(`[Strapi] ${output}`, 'blue');
      }
    });
    
    strapiServer.stderr.on('data', (data) => {
      const output = data.toString().trim();
      if (output && !output.includes('Warning')) {
        log(`[Strapi] ${output}`, 'red');
      }
    });
  } else {
    log('⚠️  Strapi directory not found', 'yellow');
    log('Please run Strapi manually or ensure it\'s in the expected location', 'yellow');
  }

  // Start Next.js server
  log('🌐 Starting Next.js server...', 'green');
  const nextServer = spawn('npm', ['run', 'dev'], {
    cwd: process.cwd(),
    stdio: 'pipe',
    shell: true
  });
  servers.push(nextServer);

  nextServer.stdout.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      log(`[Next.js] ${output}`, 'green');
    }
  });

  nextServer.stderr.on('data', (data) => {
    const output = data.toString().trim();
    if (output && !output.includes('Warning')) {
      log(`[Next.js] ${output}`, 'red');
    }
  });

  // Display success message
  setTimeout(() => {
    log('', 'reset');
    log('🎉 Development environment ready!', 'green');
    log('='.repeat(40), 'green');
    log('Servers running:', 'cyan');
    if (strapiDir) {
      log('  📡 Strapi Backend:  http://localhost:1337', 'blue');
      log('  🔧 Strapi Admin:   http://localhost:1337/admin', 'blue');
    }
    log('  🌐 Next.js Frontend: http://localhost:3000', 'green');
    log('', 'reset');
    log('Press Ctrl+C to stop all servers', 'yellow');
  }, 2000);

  // Handle cleanup on exit
  process.on('SIGINT', () => {
    log('\n🛑 Shutting down servers...', 'yellow');
    servers.forEach(server => {
      try {
        server.kill('SIGTERM');
      } catch (error) {
        // Ignore errors when killing processes
      }
    });
    
    setTimeout(() => {
      log('✅ All servers stopped', 'green');
      process.exit(0);
    }, 1000);
  });

  process.on('SIGTERM', () => {
    servers.forEach(server => {
      try {
        server.kill('SIGTERM');
      } catch (error) {
        // Ignore errors when killing processes
      }
    });
    process.exit(0);
  });
}

// Run the script
main().catch(error => {
  log(`❌ Error: ${error.message}`, 'red');
  process.exit(1);
});
