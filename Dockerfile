FROM node:18.15.0

ENV LANG C.UTF-8
ENV WORKSPACE=/var/www/frontend_nextjs/

RUN apt update && \
    apt install -y vim

WORKDIR $WORKSPACE
