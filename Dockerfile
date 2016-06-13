FROM node:5-onbuild

ENV NODE_ENV=production

USER root

RUN { \
    echo 'alias ls="ls --color=auto"'; \
    echo 'alias v="ls -al"'; \
    echo 'set -o vi'; \
} >> /root/.bashrc

RUN apt-get -qy update && apt-get install -qy locales \
    && echo en_US.UTF-8 UTF-8 > /etc/locale.gen && locale-gen

WORKDIR /usr/src/app

# RUN npm install
RUN npm install bower -g
RUN bower install --allow-root

EXPOSE 3000
