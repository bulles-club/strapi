FROM node:20.10-alpine3.19
COPY . /usr/app
WORKDIR /usr/app
RUN yarn install
RUN yarn build
EXPOSE 1337

CMD ["yarn", "start"]
    