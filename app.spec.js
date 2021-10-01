const app = require('./app');
const log = require('loglevel');
const path = require('path');
const toMatchStructure = require('./tests/jest-helpers').toMatchStructure;

// if you need to log to console for the test: log.setLevel(log.levels.TRACE);

expect.extend({
    toMatchStructure
});

const inputPath = 'README.md';
const outputPath = 'output.pdf';
const customCssPath = 'custom.css';
const processArg0 = '/usr/bin/node';
const processArg1 = 'index.js';

let mockArgs, mockOptions;

beforeEach(() => {
    mockArgs = {
        inputPath: inputPath,
        outputPath: outputPath,
        customCssPath: customCssPath
    };
    
    mockOptions = {
        source: path.join(__dirname, mockArgs.inputPath), //'README.md'
        destination: path.join(__dirname,mockArgs.outputPath), //'output.pdf'
        //styles: path.join(__dirname, 'md-styles.css'), //'md-styles.css' //moved to only add if provided in args
        pdf: {
            format: 'A4',
            orientation: 'portrait'
        },
        styles: mockArgs.customCssPath
    };
});

test('parseArgs should parse to an object', () => {
    expect(typeof (app.parseArgs([processArg0, processArg1, inputPath, outputPath], log))).toBe('object');
});

test('parseArgs should parse to an object that has the right structure', () => {
    let actual = app.parseArgs([processArg0, processArg1, inputPath, outputPath, customCssPath], log);
    expect(actual).toMatchStructure(mockArgs);
});

test('setOptions should output to an object', () => {
    expect(typeof (app.setOptions(mockArgs))).toBe('object');
});

test('setOptions should return an object that has the right structure', () => {
    expect(app.setOptions(mockArgs)).toMatchStructure(mockOptions);
});

test('convertMdToPdf should return true if pdf created', async () => {
    mockOptions.styles = null;
    let actual = app.convertMdToPdf(mockOptions, log);
    await expect(actual).resolves.toBe(true);
});

test('convertMdToPdf should return false if pdf creation fails', async () => {
    mockOptions.source = inputPath;
    mockOptions.destination = outputPath;
    mockOptions.styles = null;
    let actual = app.convertMdToPdf(mockOptions, log);
    await expect(actual).resolves.toBe(false);
});
