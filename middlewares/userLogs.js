const path = require('path');
const fs = require('fs');
const logPath = path.join(__dirname, '../userLogs.txt');


function userLogs(req, res, next) {
    fs.appendFileSync(logPath, 'El usuario ingreso a la ruta: ' + req.url + "\n")

    next()
}

module.exports = userLogs