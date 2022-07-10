const http = require("http");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mutler = require("multer");

const database = require("./db");
const upload = mutler();

const app = express();

const server = http.Server(app);
const PORT = 4000;

const bootstrap = () => {
  // Use Cors Set Origin
  app.use(
    cors({
      origin: "*",
    })
  );
  // app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));

  // for parsing application/json
  app.use(bodyParser.json());

  // for parsing application/xwww-
  app.use(bodyParser.urlencoded({ extended: true }));
  //form-urlencoded
  //   app.use("/ground", express.static(path.join(__dirname, "/RentCardemo")));

  //    app.get('/style.css', function(req, res) {
  //      res.sendFile(__dirname + "/RentCardemo/styles/global/main.css");
  //     });

  //     app.get('/rent.html', function(req, res) {
  //     res.sendFile(__dirname + "/RentCardemo/pages/rent.html");
  //     });

  // for parsing multipart/form-data
  // app.use(upload.single('file'));

  // API'S
  require("./api")(app);

  // app.use('/js', express.static(__dirname + 'public/js'))
  // app.use('/img', express.static(__dirname + 'public/images'))

  app.get("/rent", (_req, res) => {
    res.sendFile(path.resolve(__dirname + "/RentCardemo/pages/rent.html"));
  });

  app.get("/js/index", (_req, res) => {
    res.sendFile(path.resolve(__dirname + "/RentCardemo/js/index.js"));
  });

  app.get("/js/rent", (_req, res) => {
    res.sendFile(path.resolve(__dirname + "/RentCardemo/js/rent.js"));
  });

  app.get("/css/pages/rent", (_req, res) => {
    res.sendFile(
      path.resolve(__dirname + "/RentCardemo/styles/pages/rent.css")
    );
  });

  app.get("/css/headerHamburger", (_req, res) => {
    res.sendFile(
      path.resolve(__dirname + "/RentCardemo/js/headerHamburger.js")
    );
  });

  app.get("/css/global/main", (_req, res) => {
    res.sendFile(
      path.resolve(__dirname + "/RentCardemo/styles/global/main.css")
    );
  });

  app.get("/css/global/media", (_req, res) => {
    res.sendFile(
      path.resolve(__dirname + "/RentCardemo/styles/global/media.css")
    );
  });

  app.get("/css/global/normalize", (_req, res) => {
    res.sendFile(
      path.resolve(__dirname + "/RentCardemo/styles/global/normalize.css")
    );
  });

  app.get("/css/global/variables", (_req, res) => {
    res.sendFile(
      path.resolve(__dirname + "/RentCardemo/styles/global/variables.css")
    );
  });

  app.get("/css/partials/header", (_req, res) => {
    res.sendFile(
      path.resolve(__dirname + "/RentCardemo/styles/partials/header.css")
    );
  });

  app.get("/css/partials/footer", (_req, res) => {
    res.sendFile(
      path.resolve(__dirname + "/RentCardemo/styles/partials/footer.css")
    );
  });

  app.get("/css/partials/sidebar", (_req, res) => {
    res.sendFile(
      path.resolve(__dirname + "/RentCardemo/styles/partials/sidebar.css")
    );
  });

  //     app.get('*', (_req, res) => {
  //         res.sendFile(
  //             path.resolve(
  //                 __dirname + '/RentCardemo/styles/global/normalize.css',
  //             )
  //         );
  //     });

  //     app.get('*', (_req, res) => {
  //         res.sendFile(
  //             path.resolve(
  //                 __dirname + '/RentCardemo/styles/global/variables.css',
  //             )
  //         );
  //     });

  //     app.get('*', (_req, res) => {
  //         res.sendFile(
  //             path.resolve(
  //                 __dirname + '/RentCardemo/styles/pages/*.css',
  //             )
  //         );
  //     });

  server.listen(PORT, () => {
    console.log("Start", PORT);
  });
};

// Start DataBase and Server
database.bootstrap(bootstrap);
