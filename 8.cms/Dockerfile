# 使用最新的node.js的官方镜像作为构建阶段的基础镜像
FROM node:latest AS build

#设置工作目录为/app
WORKDIR /app

# 复制package.json package-lock.json到容器的当前的工作目录中，也就是/app
COPY package.json package-lock.json ./

RUN npm config set registry https://registry.npmmirror.com

# 安装依赖
RUN  npm ci

# 将本地目录下的所有的文件复制到容器的工作目录内
COPY . .

# 运行构建命令，构建项目 
RUN npm run build

# 使用最新的node镜像作为生产环境的基础镜像
FROM node:latest

# 设置工作目录为/app
WORKDIR /app

# 从构建阶段复制生成的dist目录到当前的工作目录
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public
COPY --from=build /app/views ./views
COPY --from=build /app/front ./front

# 复制package.json package-lock.json到容器的当前的工作目录中，也就是/app
COPY package.json package-lock.json ./

RUN npm config set registry https://registry.npmmirror.com

# 使用npm ci安装生产环境所需要依赖
RUN npm ci --only=production

# 向外暴露应用的3000端口
EXPOSE 3000

# 指定容器启动后的执行的命令，启动应用
CMD ["node","dist/main.js"]