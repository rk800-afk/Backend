const mongoose = require('mongoose')

const MONGO_URL = "mongodb://localhost:27017/"
const MONGO_DB = "rom-car";

function createConnection() {
    mongoose.connect(`${MONGO_URL}${MONGO_DB}`, {
      dbName: MONGO_DB,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  
    const connection = mongoose.connection;
  
    connection.on('error', (error) =>
      console.log(`\u001b[1;31m\nDatabase error: ${error}`)
    );
    connection.once('open', () => {
      console.log(
        '\u001b[1;32m\nConnection to database established'
      );
    });
  
    return connection;
  }
  
  module.exports = createConnection();

