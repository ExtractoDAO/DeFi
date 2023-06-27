FROM node:16.20.0-buster

WORKDIR /app
COPY . .

RUN apt update -y && apt install git -y
RUN yarn install --production
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
