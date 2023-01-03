FROM node:16
WORKDIR /update
COPY . .
RUN npm install
CMD ["npm", "start"]