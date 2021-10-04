const log = require('loglevel');
const app = require('./app');

log.setLevel(log.levels.TRACE);
app.run(process.argv, log);
