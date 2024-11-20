const url = require("url");
const { StringDecoder } = require("string_decoder");

const routes = require("../routes");
const notFoundHandler = require("../handlers/routeHandlers/notFoundHandler");
const {parseJson} = require('../lib/utilities');
const { request } = require("http");
const handler = {};
handler.handleReqRes = (req, res) => {
  //res.write('Server is running')
  //console.log(parseJson)
  const parsedUrl = url.parse(req.url, true);
  const path_name = parsedUrl.pathname;
  const trimmed_path = path_name.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headerObject = req.headerObject;
  const decoder = new StringDecoder("utf-8");
  console.log(queryStringObject)
  const reqProps = {
    parsedUrl,
    path_name,
    trimmed_path,
    method,
    queryStringObject,
    headerObject,
  };
  //console.log("All routes:");
  //console.log(routes);
  const choosen_handler = routes[trimmed_path]
    ? routes[trimmed_path]
    : notFoundHandler;
  //console.log(notFoundHandler)
  console.log("TRIMMED PATH: " + trimmed_path);
  
  let data_recieved = "";

  req.on("data", (buffer) => {
    //console.log(buffer);
    data_recieved += decoder.write(buffer);
  });
  req.on("end", () => {
    data_recieved += decoder.end();
    reqProps.body = parseJson(data_recieved);
    choosen_handler.handle(reqProps, (statuscode, payload) => {
        console.log(statuscode)
        console.log(payload)
        //console.log("RECIEVED PAYLOAD: " + payload?.message);
        //console.log("Recieved Status Code: " + statuscode);
        statuscode = typeof statuscode === "number" ? statuscode : 500;
        payload = typeof payload === "object" ? payload : {};
        //console.log(payload)
        const payloadString = JSON.stringify(payload);
        //console.log("Sending payload: " + payloadString);
        //console.log("Sending status code: " + statuscode);
        res.writeHead(statuscode);
    
        res.end(payloadString);
      }); /// first one is req prop second one is callback function that will be returned by handler
    
    //console.log("RECIEVED JSON: ")
    //console.log(reqProps?.body)
    //console.log("Recieved JSON: "+request["body"])
    //console.log(data_recieved.toString());
  });

 // res.end();
  //request handling stuffs
};
module.exports = handler;
