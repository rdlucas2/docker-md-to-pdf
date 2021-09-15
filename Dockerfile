FROM ubuntu

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y

RUN apt-get install -y nodejs; \
    apt-get install -y npm

RUN apt-get install -y wget

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb

COPY index.js .
COPY package.json .
COPY package-lock.json .

RUN npm ci

#docker run -it --rm -v "$(pwd):/work" md-to-pdf "/work/README.md" "/work/output.pdf"
ENTRYPOINT ["node", "index.js"]
