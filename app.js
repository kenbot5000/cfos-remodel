require("dotenv").config();

const consola = require("consola");
const bodyParser = require("body-parser");

const { app, server } = require('./socketapp')

app.use(bodyParser.json());

const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);

const studentRoute = require("./routes/studentRoute");
app.use("/student", studentRoute);

const menuRoute = require("./routes/menuRoute");
app.use("/menu", menuRoute);

const orderRoute = require("./routes/orderRoute");
app.use("/order", orderRoute);

const host = process.env.HOST;
const port = process.env.PORT;
server.listen(port, host);
consola.ready({
  message: `Server listening on http://${host}:${port}`,
  badge: true,
});
