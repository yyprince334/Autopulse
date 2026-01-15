FROM node:20-alpine

WORKDIR /app

# 1️⃣ Copy package files
COPY package*.json ./

# 2️⃣ Install dependencies
RUN npm install

# 3️⃣ Copy source code
COPY . .

# 4️⃣ Build NestJS
RUN npm run build

# 5️⃣ Expose API port
EXPOSE 3000

# 6️⃣ Run compiled app
CMD ["node", "dist/src/main.js"]