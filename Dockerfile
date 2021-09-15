FROM ubuntu

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y
RUN apt-get install -y nodejs; \
    apt-get install -y npm

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
#RUN npm install mdpdf -g

COPY index.js .
COPY package.json .
COPY package-lock.json .

RUN npm ci

#docker run -it --rm -v "$(pwd):/work" md-to-pdf "/work/README.md" "/work/output.pdf"
ENTRYPOINT ["node", "index.js"]