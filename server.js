const Koa = require("koa");
const serve = require("koa-static");

require("dotenv").config();

const router = require("./routes");

const app = new Koa();

app
  .use(serve("./client/build"))
  .use(router.routes())
  .use(router.allowedMethods())
  .on("error", e => console.log(`ERROR: ${e.message}`));

const port = process.env.PORT || process.env.DEFAULT_PORT;

app.listen(port, function() {
  console.log(`Server running on port ${port}`);
});
