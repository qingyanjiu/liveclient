#FROM daocloud.io/library/node:4.4.7
FROM node:4.4.7
#为了弹幕正常工作，修改了时区为上海
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

COPY . /srs-client

WORKDIR /srs-client/

#RUN echo -n "108.61.182.153" > conf/DBIp

#RUN echo -n "108.61.182.153" > conf/ServerIp

RUN npm install

RUN npm install -g supervisor

EXPOSE 5000

CMD ["supervisor","bin/www"]