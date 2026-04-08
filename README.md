# 🏎 Ferrari Dubai — Showroom Landing Page

A premium React landing page for Ferrari Dubai, built for Docker deployment with CI/CD pipeline support.

---

## Tech Stack

- **React 18** — UI framework
- **CSS Modules** — Component-scoped styling (no extra dependencies)
- **Nginx Alpine** — Production web server inside Docker
- **Multi-stage Docker build** — Lean production image (~25MB)
- **GitHub Actions** — CI/CD pipeline

---

## Project Structure

```
ferrari-dubai/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / .css
│   │   ├── Hero.jsx / .css
│   │   ├── Models.jsx / .css
│   │   ├── VirtualTour.jsx / .css
│   │   ├── Contact.jsx / .css
│   │   └── Footer.jsx / .css
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── Dockerfile             ← Production (multi-stage)
├── Dockerfile.dev         ← Development (hot reload)
├── docker-compose.yml
├── nginx.conf
└── .dockerignore
```

---

## Quick Start

### Local development (no Docker)

```bash
npm install
npm start
# Opens at http://localhost:3000
```

### Local development with Docker

```bash
docker compose --profile dev up
# Opens at http://localhost:3000 with hot reload
```

---

## Docker — Production Build

### Build the image

```bash
docker build -t ferrari-dubai:latest .
```

### Run the container

```bash
docker run -d \
  --name ferrari-dubai \
  --restart unless-stopped \
  -p 80:80 \
  ferrari-dubai:latest
```

### Using docker-compose (production)

```bash
docker compose up -d
# Serves at http://localhost:80
```

### Check health

```bash
curl http://localhost/health
# → healthy
```

---

## CI/CD Pipeline (GitHub Actions)

The pipeline lives in `.github/workflows/ci-cd.yml` and runs on every push.

### Pipeline stages

| Stage | Trigger | Action |
|---|---|---|
| **Test** | Any push / PR | `npm test` |
| **Build & Push** | Push to `main` or `staging` | Builds Docker image, pushes to GHCR |
| **Deploy Production** | Push to `main` | SSH deploy to production server |
| **Deploy Staging** | Push to `staging` | SSH deploy to staging server |

### Required GitHub Secrets

Go to **Settings → Secrets and variables → Actions** and add:

| Secret | Description |
|---|---|
| `DEPLOY_HOST` | Production server IP / hostname |
| `DEPLOY_USER` | SSH username (e.g. `ubuntu`) |
| `DEPLOY_SSH_KEY` | Private SSH key for production server |
| `STAGING_HOST` | Staging server IP / hostname |
| `STAGING_USER` | SSH username for staging |
| `STAGING_SSH_KEY` | Private SSH key for staging server |
| `SLACK_WEBHOOK_URL` | *(Optional)* Slack webhook for deploy notifications |

### Using DockerHub instead of GHCR

In `ci-cd.yml`, replace the registry section:

```yaml
env:
  REGISTRY: docker.io

# And update the login step:
- uses: docker/login-action@v3
  with:
    username: ${{ secrets.DOCKERHUB_USERNAME }}
    password: ${{ secrets.DOCKERHUB_TOKEN }}
```

---

## Environment Variables

Create a `.env` file in the root for any runtime config:

```env
REACT_APP_SHOWROOM_NAME=Ferrari Dubai
REACT_APP_PHONE=+971 4 329 7700
REACT_APP_EMAIL=dubai@ferrari.com
```

Reference in components: `process.env.REACT_APP_PHONE`

---

## Adding a Real Video Background

In `Hero.jsx`, add video sources inside the `<video>` tag:

```jsx
<video autoPlay loop muted playsInline className="hero__video">
  <source src="/videos/ferrari-hero.mp4" type="video/mp4" />
  <source src="/videos/ferrari-hero.webm" type="video/webm" />
</video>
```

Place video files in `public/videos/`. The cinematic gradient fallback displays automatically if no video loads.

---

## Deployment Checklist

- [ ] Update domain in `ci-cd.yml` (`environment.url`)
- [ ] Add all required GitHub Secrets
- [ ] Point DNS to your server
- [ ] Set up SSL (e.g. Certbot / Cloudflare) in front of the container
- [ ] Replace placeholder contact form endpoint with real backend/API
- [ ] Add real Ferrari model images to `/public/images/`
