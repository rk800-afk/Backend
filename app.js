const http = require('http')
const express = require('express')
const cors = require('cors')

const database = require('./db')

const app = express()

const server = http.Server(app)
const PORT = 4000

const bootstrap = () => {
    app.use(
        cors({
            origin: '*',
        })
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    server.listen(PORT, () => {
        console.log("Start", PORT);
    })
}

// Start Server
database.bootstrap(bootstrap)
