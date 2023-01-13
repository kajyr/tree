FROM node:18.10-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json lerna.json ./
COPY . .

RUN npm install
RUN NODE_ENV=production && npm run build


FROM node:18.10-alpine
ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/public public
COPY --from=builder /app/backend backend
COPY --from=builder /app/common common
COPY --from=builder /app/package.json ./

WORKDIR /app
EXPOSE 4445
CMD [ "npm", "start" ] 
