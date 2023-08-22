FROM node:17-alpine
WORKDIR /advertisement-site/

COPY public/ /advertisement-site/public
COPY src/ /advertisement-site/src
COPY package.json /advertisement-site/

RUN npm install
CMD ["npm", "start"]