# Develop 分支开发与镜像构建

## 本地热加载开发环境

首次启动前准备本地环境变量：

```bash
cp .env.example .env.local
```

启动完整开发栈：

```bash
docker compose -f docker-compose.dev.yml up --build -d
docker compose -f docker-compose.dev.yml logs -f web-dev
```

浏览器访问 `http://localhost:3001`。项目目录会挂载到容器 `/app`，修改源码后 Next.js 会自动热加载。需要其他端口时，可在启动命令前设置 `DEV_WEB_PORT`。

本地端口：

- Web：`3001`（可通过 `DEV_WEB_PORT` 修改）
- PostgreSQL：`5433`
- Redis：`6380`

停止服务但保留开发数据库：

```bash
docker compose -f docker-compose.dev.yml down
```

如果 `package-lock.json` 发生变化，重新构建开发镜像并更新依赖卷：

```bash
docker compose -f docker-compose.dev.yml build --no-cache web-dev
docker compose -f docker-compose.dev.yml run --rm web-dev npm ci
docker compose -f docker-compose.dev.yml up -d
```

## Develop 镜像

每次推送到 `develop`，GitHub Actions 都会构建并推送以下架构：

- `linux/amd64`
- `linux/arm64`

镜像地址和标签：

```text
ghcr.io/cnmbdb/tgnl-home:develop
ghcr.io/cnmbdb/tgnl-home:develop-<short-sha>
```
