const mongoose = require("mongoose");

// connect to the DB URI
mongoose.connect("mongodb://localhost/mongooseRelations");
// grab DB connection
const db = mongoose.connection;
// callback msgs on Connection/Errors
db.once("open", () => {
    console.log(`mongoose connected @ ${db.host}:${db.port}`);
});
// module.epxorts all the db models/connections
db.on("error", (err) => {
    console.log("Error", err);
});


// export DB and everything inside

module.exports.BlogPost = require('./blog');
module.exports.User = require('./user');