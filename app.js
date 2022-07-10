const http = require('http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const mutler = require('multer')

const database = require('./db')
const upload = mutler()

const app = express()

const server = http.Server(app)
const PORT = 4000

const bootstrap = () => {
    // Use Cors Set Origin
    app.use(
        cors({
            origin: '*',
        })
    );
    // app.use(express.json());
    // app.use(express.urlencoded({ extended: true }));

    // for parsing application/json
    app.use(bodyParser.json());

    // for parsing application/xwww-
    app.use(bodyParser.urlencoded({ extended: true }));
    //form-urlencoded

    // for parsing multipart/form-data
    // app.use(upload.single('file'));

    // API'S
    require('./api')(app)

    app.get('*', (_req, res) => {
        res.sendFile(
            path.resolve(
                __dirname + '/images',
            )
        );
    });

    server.listen(PORT, () => {
        console.log("Start", PORT);
    })
}

// Start DataBase and Server
database.bootstrap(bootstrap)
