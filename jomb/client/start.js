const mongoose = require("mongoose");

require("dotenv").config({ path: "variables.env" });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on("error", err => {
  console.error(`*** Error connecting -> ${err.message}`);
});

// require(./models/Model);

const app = require("./src/index");
app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running on PORT ${server.address().port}`);
});
