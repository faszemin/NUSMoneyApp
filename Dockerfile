FROM ubuntu:18.04
MAINTAINER faszemin@gmail.com
EXPOSE 8080
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Singapore

RUN apt-get update
RUN apt-get install -y nodejs npm
ENV USER root
RUN npm install --save express axios cors body-parser
RUN useradd -ms /bin/bash fahmida
COPY customer.js /home/fahmida/customer.js
COPY main.js /home/fahmida/main.js
COPY start.sh /home/fahmida/start.sh
RUN chmod a+x /home/fahmida/start.sh
USER fahmida
WORKDIR /home/fahmida

CMD ["sh","/home/fahmida/start.sh"]