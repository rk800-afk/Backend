const { carRouter } = require("./routes");

module.exports = (app) => {
  app.use("/api/cars", carRouter);
};
