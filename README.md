MD-to-PDF

Using nodjs package mdpdf from https://github.com/BlueHatbRit/mdpdf to convert markdown to pdf.

#WORK LOCALLY
```
npm install
```

```
node index.js C:\_git\PROD\DEVOPS-Toolkit\README.md C:\_git\PROD\DEVOPS-Toolkit\output.pdf
```

#WORK IN DOCKER (unable to install puppeteer - not working yet)
```
docker build -t md-to-pdf:latest .
```

```
docker run -it --rm -v "C:\_git\PROD\DEVOPS-Toolkit:/work" md-to-pdf "/work/README.md" "/work/output.pdf"
```