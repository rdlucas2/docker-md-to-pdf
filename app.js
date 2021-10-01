const mdpdf = require('mdpdf');

function parseArgs(args, logger) {
    //index 0 and 1 are reserved for /usr/bin/node and /index.js respectively, and are there by default.
    const inputIndex = 2;
    const outputIndex = 3;
    const cssIndex = 4;

    //show the arguments being passed in
    args.forEach(function (val, index) {
        logger.debug(index + ': ' + val);
    });

    //parse arguments
    let inputPath = args[inputIndex];
    let outputPath = args[outputIndex];
    let customCssPath = null;
    if(args[cssIndex]) {
        customCssPath = args[cssIndex];
    }

    return {
        inputPath: inputPath,
        outputPath: outputPath,
        customCssPath: customCssPath
    };
}
exports.parseArgs = parseArgs;

function setOptions(args) {
    //set options
    let options = {
        source: args.inputPath, //'README.md'
        destination: args.outputPath, //'output.pdf'
        //styles: path.join(__dirname, 'md-styles.css'), //'md-styles.css' //moved to only add if provided in args
        pdf: {
            format: 'A4',
            orientation: 'portrait'
        }
    };

    //a non-required option that may not be passed in via the command line
    if(args.customCssPath) {
        options.styles = args.customCssPath;
    }

    return options;
}
exports.setOptions = setOptions;

function convertMdToPdf(options, logger) {
    //convert md to pdf
    return mdpdf.convert(options).then((pdfPath) => {
        logger.debug('PDF Path:', pdfPath);
        return true;
    }).catch((err) => {
        logger.error(err);
        return false;
    });
}
exports.convertMdToPdf = convertMdToPdf;

async function run(args, log) {
    let a = parseArgs(args, log);
    let o = setOptions(a);
    let success = await convertMdToPdf(o, log);
    if(success) {
        process.exit();
    } else {
        process.exit(1);
    }
}

exports.run = run;
