const http = require('http')
const express = require('express')
const cors = require('cors')

const database = require('./db')

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
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // API'S
    require('./api')(app)

    server.listen(PORT, () => {
        console.log("Start", PORT);
    })
}

// Start DataBase and Server
database.bootstrap(bootstrap)
