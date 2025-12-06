# 🚀 Portainer Quick Deploy Guide

## One-Click Portainer Stack Deployment

### Step 1: Access Portainer
- URL: `http://your-server:9000`
- Login with your credentials

### Step 2: Create Stack
1. Click **Stacks** → **+ Add stack**
2. Name: `tfc-forging-calculator`

### Step 3: Choose Deployment Method

#### Option A: From Git Repository (Best for updates)
```
Build method: Repository
Repository URL: https://github.com/YOUR_USERNAME/tfc-forging-calculator
Reference: refs/heads/main
Compose path: docker-compose.yml
```

#### Option B: Web Editor (Quick deploy)
Copy and paste this into the editor:

```yaml
version: '3.8'

services:
  tfc-forging-calculator:
    image: ghcr.io/YOUR_USERNAME/tfc-forging-calculator:latest
    container_name: tfc-forging-calculator
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      - TZ=America/New_York
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 3s
      retries: 3
```

### Step 4: Deploy
- Click **Deploy the stack**
- Wait 2-3 minutes for first build

### Step 5: Access Your App
- Open: `http://YOUR_SERVER_IP:8080`
- Health check: `http://YOUR_SERVER_IP:8080/health`

## Configuration

### Change Port
Replace `8080:80` with `YOUR_PORT:80`:
```yaml
ports:
  - "3000:80"  # App will be on port 3000
```

### Change Timezone
```yaml
environment:
  - TZ=Europe/London  # Your timezone
```

## Stack Management

### Update Stack
1. Stacks → Select `tfc-forging-calculator`
2. Click **Editor** (if using web editor) or **Pull and redeploy** (if using Git)
3. Click **Update**

### View Logs
1. Stacks → Select `tfc-forging-calculator`
2. Click container name
3. Click **Logs**

### Restart
1. Stacks → Select `tfc-forging-calculator`
2. Click **Stop** then **Start**

Or use Quick actions: **Restart**

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 8080 in use | Change to different port in compose file |
| Can't access | Check firewall: `sudo ufw allow 8080` |
| Build fails | Check logs, ensure enough disk space (>2GB) |
| Container unhealthy | Wait 30s, check logs |

## Advanced: Reverse Proxy (Traefik)

Add to your compose under `labels`:

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.tfc.rule=Host(`forge.yourdomain.com`)"
  - "traefik.http.routers.tfc.entrypoints=websecure"
  - "traefik.http.routers.tfc.tls.certresolver=letsencrypt"
```

## Resources

- Image Size: ~25MB
- Memory: ~50MB
- CPU: Minimal
- Startup: 2-3 seconds

## Support

- Full docs: See `DOCKER_DEPLOYMENT.md`
- Issues: GitHub Issues
- Health endpoint: `/health`
