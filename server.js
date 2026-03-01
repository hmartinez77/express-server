const http = require('http');
const app = require('./lib/app/app.js');
const config = require('./lib/config.js');

const server = http.createServer(app);

server.listen(config.httpPort, () => {
    console.log(`Server listening on port ${config.httpPort}...`);
});
