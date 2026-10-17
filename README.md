# MuMuAINovel 📚✨

<div align="center">

<img src="frontend/public/logo.svg" alt="MuMuAINovel logo" width="120" />

![Version](https://img.shields.io/badge/version-1.5.7-blue.svg)
![Python](https://img.shields.io/badge/python-3.12-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-green.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)
![License](https://img.shields.io/badge/license-GPL%20v3-blue.svg)

**AI-powered intelligent novel writing assistant**

[Features](#-features) • [Quick Start](#-quick-start) • [Configuration](#%EF%B8%8F-configuration) • [Project Structure](#-project-structure)

</div>

---

<div align="center">

## 💬 Join the Community

Scan the QR code to join our QQ group — discuss AI novel writing, report issues, and get the latest updates!

<img src="frontend/public/qq.jpg" alt="QQ group QR code" width="300" />

</div>

---

<div align="center">

## 💖 Support the Project

If this project helps you, consider supporting development through the following:

**[☕ Buy me a coffee](https://mumuverse.space:1588/)**

**[🌐 MuMu's API Site](https://zhongzhuan.mumuverse.space/register?aff=gt7d)**

> Top up 50 CNY or more on MuMu's API site and you'll also receive the sponsor perks listed below.

### 🎁 Sponsor Perks

| Perk | Description |
|------|------|
| 📋 **Priority Support** | Your feature requests and issue reports get priority handling |
| 🚀 **Windows One-Click Launch** | Get a portable EXE program — just double-click to run |
| 💬 **Dedicated Technical Support** | Join the sponsors' private group for remote assistance and configuration guidance |

Your support keeps me developing! 🙏

</div>

---

## 🤝 Sponsors

> [Want to collaborate or sponsor this project?](https://qm.qq.com/q/B5N2BgEmbu)

<table>
<tr>
<td width="200" align="center" valign="middle"><a href="https://www.aiyoyoo.com/register?aff=4AXY9WGE2C5Q"><img src="images/CrazyToken.png" alt="CrazyToken" width="180"></a></td>
<td valign="middle">Thanks to <strong>CrazyToken</strong> for sponsoring this project! CrazyToken provides the full range of mainstream models — Claude, GPT, Gemini, Kimi, GLM, DeepSeek, Qwen, Grok — covering outline drafting, prose continuation, hook polishing, and manuscript revision, so you can pick the best model for each stage. All models cost as little as 5% of official pricing (<code>0.05×</code>), with transparent token-level billing; native official channels mean no dilution, no model mixing, and no long-context compression — preserving the model's native output experience. It's stable, fast, and high-concurrency with no rate limiting, supporting multi-book creation and batch chapter generation. New users who sign up via the <a href="https://www.aiyoyoo.com/register?aff=4AXY9WGE2C5Q">referral link</a> get <code>$20</code> in trial credit, bonus credit on top-ups, and an exclusive 1-on-1 remote configuration service with real human assistance — ready to use out of the box.</td>
</tr>
</table>

<br>

---

## ✨ Features

- 🤖 **Multiple AI Models** - Supports mainstream models like OpenAI, Gemini, and Claude
- 📝 **Smart Wizard** - AI automatically generates outlines, characters, and worldbuilding
- 👥 **Character Management** - Visual management of character relationships and organizations
- 📖 **Chapter Editing** - Create, edit, regenerate, and polish chapters
- 🌐 **Worldbuilding** - Build a complete story background
- 🔐 **Multiple Login Options** - LinuxDO OAuth or local account login
- 💾 **PostgreSQL** - Production-grade database with multi-user data isolation
- 🐳 **Docker Deployment** - One-click startup, ready out of the box

## 📸 Project Preview

<details>

<summary>Lots of images ahead</summary>

<div align="center">

### Login Page
![Login Page](images/1.png)

![Login Page](images/1-1.png)

### Main Interface
![Main Interface](images/2.png)

![Main Interface (Dark)](images/2-1.png)

### Project Management
![Project Management](images/3.png)

![Project Management](images/3-1.png)

### Sponsor Me 💖
![Sponsor Me](images/4.png)

![Sponsor Me](images/4-1.png)

</div>

</details>

## 📋 TODO List

### ✅ Completed Features

- [x] **Inspiration Mode** - Generation of creative inspiration and ideas
- [x] **Custom Writing Styles** - Support for custom AI writing styles
- [x] **Data Import/Export** - Import and export of project data
- [x] **Prompt Editing UI** - Visually edit prompt templates
- [x] **Chapter Word Count Limits** - Users can set the generation word count
- [x] **Chain of Thought & Chapter Relationship Graph** - Visualize the logical relationships between chapters
- [x] **One-Click Rewrite from Analysis** - Regenerate based on analysis suggestions
- [x] **Linux DO Auto Account Creation** - Automatically create accounts on OAuth login
- [x] **Career & Level System** - Custom career and level systems supporting cultivation realms, magic tiers, and more
- [x] **Character/Organization Card Import/Export** - Export character and organization cards individually, enabling cross-project data sharing
- [x] **Foreshadowing Management** - Intelligently track plot foreshadowing, remind you of unresolved threads, and visualize the foreshadowing timeline
- [x] **Prompt Workshop** - A community-driven prompt template sharing platform with one-click import of quality prompts
- [x] **Book Deconstruction** - One of the most requested features — deconstruct a book in one click and give the one from back then a happy ending

### 📝 Planned Features

......

> 💡 Issues and Pull Requests are welcome!

## 💻 Hardware Requirements

### Minimum (Personal Use / Development)

| Component | Requirement |
|------|------|
| **CPU** | 2 cores |
| **Memory** | 2 GB RAM |
| **Storage** | 10 GB available space |
| **Network** | Stable internet connection (for AI API calls) |

### Recommended (Small Team / Production)

| Component | Requirement |
|------|------|
| **CPU** | 4 cores |
| **Memory** | 8 GB RAM |
| **Storage** | 20 GB SSD |
| **Network** | Stable internet connection |

### High Concurrency (80-150 users)

| Component | Requirement |
|------|------|
| **CPU** | 8 cores |
| **Memory** | 16 GB RAM |
| **Storage** | 50 GB+ SSD |
| **Network** | High-bandwidth connection |

> **📌 Notes**
> - **Embedding Model**: About 400 MB of disk space, loaded into memory at runtime
> - **PostgreSQL**: Default configuration uses 256 MB shared_buffers and 1 GB effective_cache_size
> - **Docker Deployment**: Consider reserving an extra 1-2 GB of memory for the container runtime
> - This project mainly depends on external AI APIs (OpenAI/Claude/Gemini) and does not require a local GPU

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- An API key for at least one AI service (OpenAI/Gemini/Claude)

### Docker Compose Deployment (Recommended)

```bash
# 1. Clone the project
git clone https://github.com/xiamuceer-j/MuMuAINovel.git
cd MuMuAINovel

# 2. Configure environment variables (required)
cp backend/.env.example .env
# Edit the .env file and fill in the required settings (API key, database password, etc.)

# 3. Make sure the files are in place
# ⚠️ Important: ensure the following files exist
# - .env (config file, required to be mounted into the container)
# - backend/scripts/init_postgres.sql (database initialization script)

# 4. Start the services
docker-compose up -d

# 5. Access the app
# Open http://localhost:8000 in your browser
```

> **📌 Notes**
>
> 1. **`.env` file mount**: `docker-compose.yml` automatically mounts `.env` into the container, so make sure the file exists
> 2. **Database initialization**: `init_postgres.sql` runs automatically on first startup to install the required PostgreSQL extensions
> 3. **Building from source**: To build from source, first download the embedding model files ([join the group to get them](frontend/public/qq.jpg))

### Using the Docker Hub Image (Recommended for Beginners)

```bash
# 1. Pull the latest image (model files included)
docker pull mumujie/mumuainovel:latest

# 2. Create docker-compose.yml (click below to expand the full configuration)
```

<details>
<summary>📄 Click to expand the full docker-compose.yml configuration</summary>

```yaml
services:
  postgres:
    image: postgres:18-alpine
    container_name: mumuainovel-postgres
    environment:
      POSTGRES_DB: ${POSTGRES_DB:-mumuai_novel}
      POSTGRES_USER: ${POSTGRES_USER:-mumuai}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-123456}
      POSTGRES_INITDB_ARGS: "--encoding=UTF8 --locale=C"
      TZ: ${TZ:-Asia/Shanghai}
    volumes:
      - postgres_data:/var/lib/postgresql
      - ./backend/scripts/init_postgres.sql:/docker-entrypoint-initdb.d/init.sql:ro
    ports:
      - "${POSTGRES_PORT:-5432}:5432"
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-mumuai} -d ${POSTGRES_DB:-mumuai_novel}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
    networks:
      - ai-story-network
    command:
      - postgres
      - -c
      - max_connections=${POSTGRES_MAX_CONNECTIONS:-200}
      - -c
      - shared_buffers=${POSTGRES_SHARED_BUFFERS:-256MB}
      - -c
      - effective_cache_size=${POSTGRES_EFFECTIVE_CACHE_SIZE:-1GB}
      - -c
      - maintenance_work_mem=${POSTGRES_MAINTENANCE_WORK_MEM:-64MB}
      - -c
      - checkpoint_completion_target=${POSTGRES_CHECKPOINT_COMPLETION_TARGET:-0.9}
      - -c
      - wal_buffers=${POSTGRES_WAL_BUFFERS:-16MB}
      - -c
      - default_statistics_target=${POSTGRES_DEFAULT_STATISTICS_TARGET:-100}
      - -c
      - random_page_cost=${POSTGRES_RANDOM_PAGE_COST:-1.1}
      - -c
      - effective_io_concurrency=${POSTGRES_EFFECTIVE_IO_CONCURRENCY:-200}
      - -c
      - work_mem=${POSTGRES_WORK_MEM:-4MB}
      - -c
      - min_wal_size=${POSTGRES_MIN_WAL_SIZE:-1GB}
      - -c
      - max_wal_size=${POSTGRES_MAX_WAL_SIZE:-4GB}

  mumuainovel:
    image: mumujie/mumuainovel:latest
    container_name: mumuainovel
    depends_on:
      postgres:
        condition: service_healthy
    ports:
      - "${APP_PORT:-8000}:8000"
    volumes:
      - ./logs:/app/logs
      - ./.env:/app/.env:ro
      - ./storage/generated_covers:/app/backend/storage/generated_covers
    environment:
      # Application configuration
      - APP_NAME=${APP_NAME:-MuMuAINovel}
      - APP_VERSION=${APP_VERSION:-1.5.7}
      - APP_HOST=${APP_HOST:-0.0.0.0}
      - APP_PORT=8000
      - DEBUG=${DEBUG:-false}
      # Database configuration
      - DATABASE_URL=postgresql+asyncpg://${POSTGRES_USER:-mumuai}:${POSTGRES_PASSWORD:-123456}@postgres:5432/${POSTGRES_DB:-mumuai_novel}
      - DB_HOST=postgres
      - DB_PORT=5432
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-123456}
      # PostgreSQL connection pool configuration
      - DATABASE_POOL_SIZE=${DATABASE_POOL_SIZE:-30}
      - DATABASE_MAX_OVERFLOW=${DATABASE_MAX_OVERFLOW:-20}
      - DATABASE_POOL_TIMEOUT=${DATABASE_POOL_TIMEOUT:-60}
      - DATABASE_POOL_RECYCLE=${DATABASE_POOL_RECYCLE:-1800}
      - DATABASE_POOL_PRE_PING=${DATABASE_POOL_PRE_PING:-True}
      - DATABASE_POOL_USE_LIFO=${DATABASE_POOL_USE_LIFO:-True}
      # Global proxy configuration (optional)
      - HTTP_PROXY=${HTTP_PROXY:-}
      - HTTPS_PROXY=${HTTPS_PROXY:-}
      - NO_PROXY=${NO_PROXY:-localhost,127.0.0.1}
      # AI service configuration
      - OPENAI_API_KEY=${OPENAI_API_KEY:-}
      - OPENAI_BASE_URL=${OPENAI_BASE_URL:-https://api.openai.com/v1}
      - GEMINI_API_KEY=${GEMINI_API_KEY:-}
      - GEMINI_BASE_URL=${GEMINI_BASE_URL:-}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY:-}
      - ANTHROPIC_BASE_URL=${ANTHROPIC_BASE_URL:-}
      - DEFAULT_AI_PROVIDER=${DEFAULT_AI_PROVIDER:-openai}
      - DEFAULT_MODEL=${DEFAULT_MODEL:-gpt-4o-mini}
      - DEFAULT_TEMPERATURE=${DEFAULT_TEMPERATURE:-0.7}
      - DEFAULT_MAX_TOKENS=${DEFAULT_MAX_TOKENS:-32000}
      - ALLOW_PRIVATE_AI_ENDPOINTS=${ALLOW_PRIVATE_AI_ENDPOINTS:-false}
      - ALLOWED_AI_HOSTS=${ALLOWED_AI_HOSTS:-}
      # LinuxDO OAuth configuration
      - LINUXDO_CLIENT_ID=${LINUXDO_CLIENT_ID:-11111}
      - LINUXDO_CLIENT_SECRET=${LINUXDO_CLIENT_SECRET:-11111}
      - LINUXDO_REDIRECT_URI=${LINUXDO_REDIRECT_URI:-http://localhost:8000/api/auth/linuxdo/callback}
      - LINUXDO_PROXY_URL=${LINUXDO_PROXY_URL:-}
      - FRONTEND_URL=${FRONTEND_URL:-http://localhost:8000}
      # Local account login configuration
      - LOCAL_AUTH_ENABLED=${LOCAL_AUTH_ENABLED:-true}
      - LOCAL_AUTH_USERNAME=${LOCAL_AUTH_USERNAME:-admin}
      - LOCAL_AUTH_PASSWORD=${LOCAL_AUTH_PASSWORD:-admin123}
      - LOCAL_AUTH_DISPLAY_NAME=${LOCAL_AUTH_DISPLAY_NAME:-Local Admin}
      # Session configuration
      - SESSION_EXPIRE_MINUTES=${SESSION_EXPIRE_MINUTES:-120}
      - SESSION_REFRESH_THRESHOLD_MINUTES=${SESSION_REFRESH_THRESHOLD_MINUTES:-30}
      - SESSION_COOKIE_SECURE=${SESSION_COOKIE_SECURE:-true}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s
    networks:
      - ai-story-network

volumes:
  postgres_data:
    driver: local

networks:
  ai-story-network:
    driver: bridge
```

</details>

```bash
# 3. Start the services
docker-compose up -d

# 4. View logs
docker-compose logs -f

# 5. Update to the latest version
docker-compose pull
docker-compose up -d
```

> **💡 Tip**: The Docker Hub image already includes all dependencies and model files, so no extra downloads are needed

### Local Development / Building from Source

#### Prerequisites

```bash
# ⚠️ Important: if building from source, you must first download the embedding model files
# The model files are large (about 400 MB) and must be placed in the following directory:
# backend/embedding/models--sentence-transformers--paraphrase-multilingual-MiniLM-L12-v2/
#
# 📥 How to get them:
# - Join the project's QQ group or the Linux DO discussion to get the download link
# - Group ID: see the project homepage
# - Linux DO: https://linux.do/t/topic/1100112
```

#### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Configure the .env file
cp .env.example .env
# Edit .env and fill in the required settings

# Start PostgreSQL (Docker works too)
docker run -d --name postgres \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=mumuai_novel \
  -p 5432:5432 \
  postgres:18-alpine

# Start the backend
python -m uvicorn app.main:app --host localhost --port 8000 --reload
```

#### Frontend

```bash
cd frontend
npm install
npm run dev  # Development mode
npm run build  # Production build
```

## ⚙️ Configuration

### Required Configuration

Create a `.env` file:

```bash
# PostgreSQL database (required)
DATABASE_URL=postgresql+asyncpg://mumuai:your_password@postgres:5432/mumuai_novel
POSTGRES_PASSWORD=your_secure_password

# AI service
OPENAI_API_KEY=your_openai_key
OPENAI_BASE_URL=https://api.openai.com/v1
DEFAULT_AI_PROVIDER=openai
DEFAULT_MODEL=gpt-4o-mini

# Local account login
LOCAL_AUTH_ENABLED=true
LOCAL_AUTH_USERNAME=admin
LOCAL_AUTH_PASSWORD=your_password
```

### Optional Configuration

```bash
# LinuxDO OAuth
LINUXDO_CLIENT_ID=your_client_id
LINUXDO_CLIENT_SECRET=your_client_secret
LINUXDO_REDIRECT_URI=http://localhost:8000/api/auth/callback
# Dedicated proxy for LinuxDO login (optional, affects only OAuth token and user info requests)
LINUXDO_PROXY_URL=http://127.0.0.1:7890

# PostgreSQL connection pool (high-concurrency optimization)
DATABASE_POOL_SIZE=30
DATABASE_MAX_OVERFLOW=20

# Session Cookie Secure flag
# Defaults to true, suitable for HTTPS deployments; if you use HTTP and your browser doesn't save the login cookie, set this to false
SESSION_COOKIE_SECURE=true

# Local / Docker internal-network LLM (disabled by default to keep SSRF protection)
# ALLOW_PRIVATE_AI_ENDPOINTS=true
# ALLOWED_AI_HOSTS=host.docker.internal,127.0.0.1
```

> **🔐 About Cookie Secure**
>
> - HTTPS deployment: keep `SESSION_COOKIE_SECURE=true` so the browser only sends the login cookie over HTTPS.
> - HTTP deployment: if the browser doesn't save the cookie after login, set `SESSION_COOKIE_SECURE=false` in `.env`, then restart the backend or Docker container.
> - The Docker Compose example defaults to `SESSION_COOKIE_SECURE=${SESSION_COOKIE_SECURE:-true}`; to disable it you must configure it explicitly in `.env`.
>
> **🌐 About the LinuxDO Dedicated Proxy**
>
> - If only LinuxDO authorization login is unreachable on your network, prefer configuring `LINUXDO_PROXY_URL` rather than a global `HTTP_PROXY` / `HTTPS_PROXY`.
> - `LINUXDO_PROXY_URL` is used only for LinuxDO OAuth token exchange and user info requests; it does not affect AI services, SMTP, the database, or other network calls.
> - Common example: `LINUXDO_PROXY_URL=http://127.0.0.1:7890`; when accessing a host proxy from inside a Docker container, you usually need the host's address on the Docker network rather than the container's own `127.0.0.1`.
> - The example configures an HTTP proxy; if you need a SOCKS proxy, first make sure the runtime environment has httpx's SOCKS support dependency installed.
>
> **🖥️ About Local / Docker Internal-Network LLMs**
>
> - By default `localhost`, `127.0.0.1`, private IPs, and hostnames that resolve to the internal network (such as `host.docker.internal`) are rejected to reduce SSRF risk.
> - If your AI service runs on a local Ollama / llama.cpp, or a Docker container needs to access a model on the host, set `ALLOW_PRIVATE_AI_ENDPOINTS=true` in `.env`, or add the allowed hostnames to `ALLOWED_AI_HOSTS`.
> - Even with the local allowance enabled, link-local addresses (such as cloud metadata `169.254.169.254`) are still rejected.
> - MCP plugin URLs are not affected by this switch and continue to go through strict public-network validation.

### Relay API Configuration

Supports all OpenAI-compatible relay services:

```bash
# New API example
OPENAI_API_KEY=sk-xxxxxxxx
OPENAI_BASE_URL=https://api.new-api.com/v1

# Other relay services
OPENAI_BASE_URL=https://your-proxy-service.com/v1
```

## 🐳 Docker Deployment Details

### Service Architecture

- **postgres**: PostgreSQL 18 database
  - Port: 5432
  - Data persistence: `postgres_data` volume
  - Initialization script: `backend/scripts/init_postgres.sql` (auto-mounted)
  - Tuned configuration: supports 80-150 concurrent users

- **mumuainovel**: Main application service
  - Port: 8000
  - Log directory: `./logs`
  - Config mount: `.env` file
  - Automatically waits for the database to be ready
  - Health check: every 30 seconds

### Important Files

| File | Description | Required |
|------|------|---------|
| `.env` | Environment configuration (API keys, database password, etc.) | ✅ Required |
| `docker-compose.yml` | Service orchestration configuration | ✅ Required |
| `backend/scripts/init_postgres.sql` | PostgreSQL extension installation script | ✅ Auto-mounted |
| `backend/embedding/models--*/` | Embedding model files | ⚠️ Needed for self-hosting |

> **Note**: When using the Docker Hub image, the model files are already included in the image, so no extra downloads are needed

### Common Commands

```bash
# Start services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart services
docker-compose restart

# View resource usage
docker stats
```

### Data Persistence

- `./postgres_data` - PostgreSQL database files
- `./logs` - Application log files

### Port Configuration

Modify the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "8800:8000"  # host:container
```

## 📁 Project Structure

```
MuMuAINovel/
├── backend/                 # Backend service
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── models/         # Data models
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Middleware
│   │   ├── database.py     # Database connection
│   │   └── main.py         # Application entry point
│   ├── scripts/            # Utility scripts
│   └── requirements.txt    # Python dependencies
├── frontend/               # Frontend application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Shared components
│   │   ├── services/      # API services
│   │   └── store/         # State management
│   └── package.json
├── docker-compose.yml      # Docker Compose configuration
├── Dockerfile             # Docker image build
└── README.md
```

## 🛠️ Tech Stack

**Backend**: FastAPI • PostgreSQL • SQLAlchemy • OpenAI/Claude/Gemini SDK

**Frontend**: React 18 • TypeScript • Ant Design • Zustand • Vite

## 📖 Usage Guide

1. **Log In** - Use a local account or a LinuxDO account
2. **Create a Project** - Choose "Create with wizard"
3. **AI Generation** - Enter basic information and AI automatically generates the outline and characters
4. **Edit and Refine** - Manage character relationships, and generate and edit chapters

### API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork this project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Submit a Pull Request

### Contributors

Thanks to all the developers who have contributed to this project!

<a href="https://github.com/xiamuceer-j/MuMuAINovel/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=xiamuceer-j/MuMuAINovel" />
</a>

## 📝 License

This project is licensed under the [GNU General Public License v3.0](LICENSE)

**GPL v3 means:**
- ✅ You can freely use, modify, and distribute it
- ✅ You can use it for commercial purposes
- 📝 You must open-source modified versions
- 📝 You must retain the original author's copyright
- 📝 Derivative works must also use the GPL v3 license

## 🙏 Acknowledgements

- [FastAPI](https://fastapi.tiangolo.com/) - Python web framework
- [React](https://react.dev/) - Frontend framework
- [Ant Design](https://ant.design/) - UI component library
- [PostgreSQL](https://www.postgresql.org/) - Database

## 📧 Contact

- Submit an [Issue](https://github.com/xiamuceer-j/MuMuAINovel/issues)
- Linux DO [discussion](https://linux.do/t/topic/1106333)
- Join the QQ group [QQ group](frontend/public/qq.jpg)
- Join the WeChat group [WeChat group](frontend/public/WX.png)

---

<div align="center">

**If this project helps you, please give it a ⭐️ Star!**

Made with ❤️

</div>

## Star History

<a href="https://star-history.dera.page/#xiamuceer-j/MuMuAINovel&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://star-history.dera.page/svg?repos=xiamuceer-j/MuMuAINovel&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://star-history.dera.page/svg?repos=xiamuceer-j/MuMuAINovel&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://star-history.dera.page/svg?repos=xiamuceer-j/MuMuAINovel&type=date&theme=dark&legend=top-left" />
 </picture>
</a>

## History

![Alt](https://repobeats.axiom.co/api/embed/ee7141a5f269c64759302e067abe23b46796bafe.svg "Repobeats analytics image")
