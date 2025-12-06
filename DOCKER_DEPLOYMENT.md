# Docker Deployment Guide

This guide covers deploying the TerraFirmaCraft Forging Calculator using Docker and Portainer.

## Quick Start with Docker Compose

### Local Deployment

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/tfc-forging-calculator.git
cd tfc-forging-calculator

# Build and run
docker-compose up -d

# Access the app
# Open http://localhost:8080
```

### Stop the stack

```bash
docker-compose down
```

## Portainer Deployment

### Method 1: Using Portainer Stacks (Recommended)

1. **Login to Portainer** (http://your-portainer-url:9000)

2. **Navigate to Stacks**
   - Click "Stacks" in the left sidebar
   - Click "+ Add stack"

3. **Configure Stack**
   - **Name**: `tfc-forging-calculator`
   - **Build method**: Choose one option below

#### Option A: Repository (Recommended)

- Select "Repository" 
- Repository URL: `https://github.com/YOUR_USERNAME/tfc-forging-calculator`
- Repository reference: `refs/heads/main`
- Compose path: `docker-compose.yml`
- Enable "Auto update" (optional)

#### Option B: Web Editor

Copy and paste the `docker-compose.yml` content:

```yaml
version: '3.8'

services:
  tfc-forging-calculator:
    image: tfc-forging-calculator:latest
    build:
      context: .
      dockerfile: Dockerfile
    container_name: tfc-forging-calculator
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      - TZ=America/New_York
    labels:
      - "com.centurylinklabs.watchtower.enable=true"
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 5s
```

4. **Deploy**
   - Click "Deploy the stack"
   - Wait for the build to complete (first build takes ~2-3 minutes)

5. **Access**
   - Open `http://YOUR_SERVER_IP:8080`

### Method 2: Using Pre-built Image

If you want to skip building and use a pre-built image:

1. **Build locally first**:
   ```bash
   docker build -t tfc-forging-calculator:latest .
   docker save tfc-forging-calculator:latest | gzip > tfc-calculator.tar.gz
   ```

2. **Import in Portainer**:
   - Go to "Images"
   - Click "Import"
   - Upload `tfc-calculator.tar.gz`

3. **Create Container**:
   - Go to "Containers"
   - Click "+ Add container"
   - Name: `tfc-forging-calculator`
   - Image: `tfc-forging-calculator:latest`
   - Port mapping: `8080:80`
   - Restart policy: `Unless stopped`
   - Click "Deploy"

## Configuration Options

### Port Configuration

To change the external port, modify `docker-compose.yml`:

```yaml
ports:
  - "3000:80"  # Change 3000 to your desired port
```

### Environment Variables

Available environment variables:

- `TZ`: Timezone (default: `America/New_York`)

Example:

```yaml
environment:
  - TZ=Europe/London
```

### Reverse Proxy Setup

If using with Traefik or nginx-proxy, add labels:

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.tfc.rule=Host(`tfc.yourdomain.com`)"
  - "traefik.http.services.tfc.loadbalancer.server.port=80"
```

## Monitoring

### Health Checks

The container includes built-in health checks:

```bash
# Check container health
docker ps

# View health check logs
docker inspect tfc-forging-calculator | grep -A 10 Health
```

### Logs

```bash
# View logs
docker logs tfc-forging-calculator

# Follow logs
docker logs -f tfc-forging-calculator

# Last 100 lines
docker logs --tail 100 tfc-forging-calculator
```

## Updating

### With Portainer Auto-update

If you enabled auto-update in stack settings, Portainer will automatically pull and rebuild.

### Manual Update

```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

### In Portainer

1. Go to "Stacks"
2. Select `tfc-forging-calculator`
3. Click "Update the stack"
4. Select "Pull and redeploy"
5. Click "Update"

## Troubleshooting

### Container won't start

```bash
# Check logs
docker logs tfc-forging-calculator

# Check container status
docker ps -a

# Restart container
docker restart tfc-forging-calculator
```

### Build fails

```bash
# Clean build
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```

### Port already in use

Change the external port in `docker-compose.yml`:

```yaml
ports:
  - "9090:80"  # Use different port
```

### Can't access from outside

1. Check firewall settings
2. Ensure port is exposed: `sudo ufw allow 8080`
3. Verify container is running: `docker ps`

## Performance Tuning

### Resource Limits

Add resource constraints in `docker-compose.yml`:

```yaml
deploy:
  resources:
    limits:
      cpus: '0.5'
      memory: 256M
    reservations:
      cpus: '0.25'
      memory: 128M
```

### Enable Gzip Compression

Already enabled in `nginx.conf`. Reduces transfer size by ~70%.

## Security

### HTTPS Setup

Use a reverse proxy like Traefik or nginx-proxy with Let's Encrypt.

Example with Traefik:

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.tfc.rule=Host(`tfc.yourdomain.com`)"
  - "traefik.http.routers.tfc.entrypoints=websecure"
  - "traefik.http.routers.tfc.tls.certresolver=letsencrypt"
```

## Backup

### Configuration Backup

```bash
# Backup compose file
cp docker-compose.yml docker-compose.yml.backup

# Backup entire stack
tar -czf tfc-calculator-backup.tar.gz .
```

## Support

- GitHub Issues: https://github.com/YOUR_USERNAME/tfc-forging-calculator/issues
- Documentation: See README.md

## Architecture

- **Build Stage**: Node.js 20 Alpine (builds Angular app)
- **Runtime Stage**: Nginx Alpine (serves static files)
- **Size**: ~25MB final image
- **Startup Time**: ~2-3 seconds
