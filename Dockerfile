FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install 

COPY server/ server/
COPY tsconfig.json ./
RUN npm run build

COPY server/src/prisma/schema.prisma server/dist/prisma/schema.prisma
RUN npx prisma generate --schema=./server/src/prisma/schema.prisma

COPY client/package*.json client/
RUN npm install --prefix client

COPY client/ client/
RUN npm run client-build --prefix client    


FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only-production

COPY --from=build /app/server ./server

CMD ["npm", "run", "migrate:docker", "&&", "npm", "start"]

EXPOSE 5000