const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

// const goodsRouter = require("./routes/goods.js");
// const connect = require("./schemas/index.js");


const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/spa_mall")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;