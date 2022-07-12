const EventEmitter = require("events");
const http = require("http");
const myEmitter = new Sales();

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

myEmitter.on("newSale", () => {
  console.log("There was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("Cutomer name: jonas");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock`);
});

myEmitter.emit("newSale", 9);

//////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  res.end("asfdsfd");
});

server.on("request", (req, res) => {
  res.end("another request");
});

server.on("close", () => {
  res.end("Server closed");
});

server.listen(8000, "localhost", () => {
  console.log("waiting for request");
});
