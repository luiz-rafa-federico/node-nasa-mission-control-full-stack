const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const initializeRouter = require("./routes/routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan("combined"));

// app.use((req, res, next) => {
//   const start = Date.now();
//   next();
//   const delta = Date.now() - start;
//   console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
// });

app.use(express.json());

//app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(
  express.static(
    "/Users/luizrafa.federico/Desktop/luiz/Tech/backend/node/node-nasa-mission-control-full-stack/backend/public"
  )
);

initializeRouter(app);

app.get("/*", (req, res) => {
  //res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
  res.sendFile(
    "/Users/luizrafa.federico/Desktop/luiz/Tech/backend/node/node-nasa-mission-control-full-stack/backend/public/index.html"
  );
});

module.exports = app;
