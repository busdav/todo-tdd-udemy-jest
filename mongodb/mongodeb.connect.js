const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://SuperTestUser:mypassword@cluster0-miqjw.mongodb.net/test?retryWrites=true&w=majority"
      );
  } catch (err) {
    console.error("Error connecting to mongodb");
    console.error(err);
  }
}

module.exports = { connect };
