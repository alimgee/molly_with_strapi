#!/bin/bash

# Molly Rose Foundation - Development Server Startup Script
# This script starts both the Strapi backend and Next.js frontend simultaneously

echo "🚀 Starting Molly Rose Foundation Development Environment..."
echo "================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to handle cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down servers...${NC}"
    # Kill all background jobs
    jobs -p | xargs -r kill
    echo -e "${GREEN}✅ All servers stopped${NC}"
    exit 0
}

# Set up trap to handle Ctrl+C
trap cleanup SIGINT SIGTERM

# Check if Strapi directory exists (assuming it's in a sibling directory)
STRAPI_DIR="../molly_strapi_backend"
if [ ! -d "$STRAPI_DIR" ]; then
    echo -e "${YELLOW}⚠️  Strapi directory not found at $STRAPI_DIR${NC}"
    echo -e "${BLUE}Looking for alternative Strapi locations...${NC}"
    
    # Check common alternative locations
    if [ -d "./backend" ]; then
        STRAPI_DIR="./backend"
    elif [ -d "./strapi" ]; then
        STRAPI_DIR="./strapi"
    elif [ -d "../strapi" ]; then
        STRAPI_DIR="../strapi"
    else
        echo -e "${RED}❌ Could not find Strapi directory${NC}"
        echo -e "${YELLOW}Please ensure your Strapi server is in one of these locations:${NC}"
        echo "  - ../molly_strapi_backend"
        echo "  - ./backend"
        echo "  - ./strapi"
        echo "  - ../strapi"
        echo ""
        echo -e "${BLUE}Or run Strapi manually with: npm run develop${NC}"
        echo -e "${BLUE}Starting Next.js only...${NC}"
        STRAPI_DIR=""
    fi
fi

# Start Strapi server if directory exists
if [ -n "$STRAPI_DIR" ]; then
    echo -e "${BLUE}📡 Starting Strapi server...${NC}"
    cd "$STRAPI_DIR"
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        echo -e "${RED}❌ No package.json found in Strapi directory${NC}"
        cd - > /dev/null
        STRAPI_DIR=""
    else
        # Start Strapi in the background
        npm run develop > ../strapi.log 2>&1 &
        STRAPI_PID=$!
        echo -e "${GREEN}✅ Strapi server starting (PID: $STRAPI_PID)${NC}"
        echo -e "${YELLOW}   Strapi logs: ../strapi.log${NC}"
        echo -e "${YELLOW}   Strapi admin: http://localhost:1337/admin${NC}"
        cd - > /dev/null
    fi
fi

# Start Next.js server
echo -e "${BLUE}🌐 Starting Next.js server...${NC}"
npm run dev > nextjs.log 2>&1 &
NEXTJS_PID=$!
echo -e "${GREEN}✅ Next.js server starting (PID: $NEXTJS_PID)${NC}"
echo -e "${YELLOW}   Next.js logs: ./nextjs.log${NC}"
echo -e "${YELLOW}   Website: http://localhost:3000${NC}"

echo ""
echo -e "${GREEN}🎉 Development environment ready!${NC}"
echo "================================================="
echo -e "${BLUE}Servers running:${NC}"
if [ -n "$STRAPI_DIR" ]; then
    echo -e "  📡 Strapi Backend:  ${YELLOW}http://localhost:1337${NC}"
    echo -e "  🔧 Strapi Admin:   ${YELLOW}http://localhost:1337/admin${NC}"
fi
echo -e "  🌐 Next.js Frontend: ${YELLOW}http://localhost:3000${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}"
echo ""

# Keep the script running and wait for background jobs
wait
