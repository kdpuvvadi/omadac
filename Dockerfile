FROM node:lts as base

ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

RUN yarn install
COPY . .
RUN yarn build

FROM nginx:stable-alpine
WORKDIR /home/node/app
COPY --from=base /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
