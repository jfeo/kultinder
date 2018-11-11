FROM debian:buster
MAINTAINER jfeo "jensfeodor@gmail.dk"
RUN apt-get update -y
RUN apt-get install -y curl gpg
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -y
RUN apt-get install -y nodejs yarn
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
WORKDIR /app
RUN yarn
COPY src /app/src
COPY public /app/public
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
