FROM node:8

WORKDIR /WeMo_CRUD_Project

ADD . /WeMo_CRUD_Project
RUN yarn install

EXPOSE 3000
CMD yarn start