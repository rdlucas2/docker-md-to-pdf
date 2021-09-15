const mdpdf = require('mdpdf');

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});

let inputPath = process.argv[2];
let outputPath = process.argv[3];
let customCssPath = null;
if(process.argv[4]) {
    customCssPath = process.argv[4];
}

let options = {
    source: inputPath, //'README.md'
    destination: outputPath, //'output.pdf'
    //styles: path.join(__dirname, 'md-styles.css'), //'md-styles.css' //moved to only add if provided in args
    pdf: {
        format: 'A4',
        orientation: 'portrait'
    }
};

if(customCssPath) {
    options.styles = customCssPath
}

mdpdf.convert(options).then((pdfPath) => {
    console.log('PDF Path:', pdfPath);
    process.exit();
}).catch((err) => {
    console.error(err);
    process.exit();
})
