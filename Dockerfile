ARG NODE_VERSION=23.10

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4006

CMD ["npm", "run", "start"]