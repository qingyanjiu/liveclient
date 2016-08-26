FROM daocloud.io/library/node:4.4.7

COPY . /srs-client

WORKDIR /srs-client/

RUN npm install

RUN npm install -g supervisor

CMD ["supervisor","bin/www"]