const mongoose = require("mongoose");

async function connect() {
  try {
    if (process.env.NODE_ENV == "test") {
      await mongoose.connect(
        "mongodb+srv://SuperTestUser:mypassword@cluster0-miqjw.mongodb.net/test?retryWrites=true&w=majority",
        { useNewUrlParser: true, 
          useUnifiedTopology: true }
      );
    } else {
      await mongoose.connect(
        "mongodb+srv://SuperTestUser:mypassword@cluster0-miqjw.mongodb.net/dev?retryWrites=true&w=majority",
        { useNewUrlParser: true, 
          useUnifiedTopology: true }
      );
    }
  } catch (err) {
    console.error("Error connecting to mongodb");
    console.error(err);
  }
}

module.exports = { connect };
