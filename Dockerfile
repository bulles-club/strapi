FROM node:20.10-alpine3.19

ENV NODE_ENV production
COPY . /usr/app
WORKDIR /usr/app
RUN yarn install
RUN yarn build
EXPOSE 1337
VOLUME /usr/app/public

CMD ["yarn", "start"]
    