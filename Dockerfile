FROM node:10.15
LABEL maintainer "54421573@qq.com"
COPY . /app/
WORKDIR /app
RUN npm install
EXPOSE 80
CMD ["node", "app.js"]