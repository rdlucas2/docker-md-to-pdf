MD-to-PDF

Using nodejs package mdpdf from https://github.com/BlueHatbRit/mdpdf to convert markdown to pdf.

#WORK LOCALLY
```
npm install
```

```
node index.js {PATH_TO_YOUR_MARKDOWN_HERE}/README.md {PATH_TO_YOUR_MARKDOWN_HERE}/output.pdf
```

#WORK IN DOCKER (unable to install puppeteer - not working yet)
```
docker build -t md-to-pdf:latest .
```

```
docker run -it --rm -v "{PATH_TO_YOUR_MARKDOWN_HERE}:/work" md-to-pdf "/work/README.md" "/work/output.pdf"
```
