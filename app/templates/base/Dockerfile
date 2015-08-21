FROM node:0.12.7

RUN mkdir -p /usr/local/app
WORKDIR /usr/local/app

COPY package.json /usr/local/app/
RUN npm install --production
COPY . /usr/local/app/

ENV NODE_ENV production

CMD [ "npm", "start" ]
