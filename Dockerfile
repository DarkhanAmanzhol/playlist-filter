FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install 

COPY server/ server/
COPY tsconfig.json ./
RUN npm run build

COPY client/package*.json client/
RUN npm install --prefix client

COPY client/ client/
RUN npm run client-build --prefix client


FROM node:16-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --only-production

COPY --from=build /app/server ./server

CMD [ "npm", "start" ]

EXPOSE 5000