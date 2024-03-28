FROM node:20.10-alpine3.19
COPY . /usr/app
RUN yarn install
RUN yarn build
EXPOSE 1337
WORKDIR /usr/app
CMD ["yarn", "start"]
    