# Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

# Build the Next.js app
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
