const data_module = require("../../lib/data");
const handler = {};
handler.handle = (reqProps, callback) => {
  const accepted_methods = new Set(["get", "post", "put", "delete"]);
  if (accepted_methods.has(reqProps?.method)) {
    console.log(reqProps);
    handler.check[reqProps?.method](reqProps, callback);
  } else {
    callback(500, {
      message: "this is check handler",
    });
  }
};
handler.check = {};

handler.check.post = (reqProps, callback) => {
  const methods = new Set(["get", "post", "put", "delete"]);
  const protocols = new Set(["https://", "http://"]);
  /// console.log(reqProps.body)
  const protocol =
    typeof reqProps.body?.protocol == "string" &&
    protocols.has(reqProps.body?.protocol)
      ? reqProps.body?.protocol
      : false;
  const url =
    typeof reqProps.body?.url == "string" ? reqProps.body?.url : false;
  const method =
    typeof reqProps.body?.method == "string" &&
    methods.has(reqProps.body?.method)
      ? reqProps.body?.method
      : false;
  const successCodes =
    typeof reqProps.body?.successCodes === "object"
      ? reqProps.body?.successCodes
      : false;
  const timeoutSeconds =
    typeof reqProps.body?.timeoutSeconds === "number" &&
    Number(reqProps.body?.timeoutSeconds) > 5
      ? reqProps.body?.timeoutSeconds
      : false;
  const phone =
    typeof reqProps.body?.phone === "string" ? reqProps.body?.phone : false;
  console.log(protocol, url, method, successCodes, timeoutSeconds, phone);
  if (protocol && url && method && successCodes && timeoutSeconds && phone) {
    data_module.read("user", phone, (err, userInfo) => {
      console.log(userInfo);
      const check_id = Math.random().toString().substring(2);
      const check_object = {
        id: check_id,
        protocol: protocol,
        url: url,
        method: method,
        successCodes: successCodes,
        timeoutSeconds: timeoutSeconds,
        phone: phone,
      };
      if (typeof userInfo.checks == "undefined") {
        userInfo.checks = [check_object];
      } else if (typeof userInfo.checks == "object") {
        userInfo.checks.push(check_object);
      }

      data_module.create("checks", check_id, check_object, (err) => {
        if (!err) {
          data_module.update("user", phone, userInfo, (err) => {
            if (!err) {
              callback(201, {
                message: "Check added",
                user: userInfo,
              });
            } else {
              callback(404, {
                error: "User not found",
              });
            }
          });
        } else {
          //console.log(err)
          callback(404, {
            error: "Could not create check id",
          });
        }
      });
    });
  } else {
    callback(404, {
      error: "Invalid input fields",
    });
  }
};
handler.check.get = (reqProps, callback) => {
  const check_id =
    typeof reqProps.queryStringObject?.check_id === "string"
      ? reqProps.queryStringObject?.check_id
      : false;
  console.log(check_id);
  if (check_id) {
    data_module.read("checks", check_id, (err, checkInfo) => {
      if (!err && check_id) {
        callback(200, {
          checkInfo,
        });
      } else {
        callback(404, {
          error: "Error no check info found",
        });
      }
    });
  } else {
    callback(404, {
      error: "Check id is invalid",
    });
  }
};
handler.check.put = (reqProps, callback) => {
  const methods = new Set(["get", "post", "put", "delete"]);
  const protocols = new Set(["https://", "http://"]);
  /// console.log(reqProps.body)
  const check_id =
    typeof reqProps.queryStringObject?.check_id === "string"
      ? reqProps.queryStringObject?.check_id
      : false;

  const protocol =
    typeof reqProps.body?.protocol == "string" &&
    protocols.has(reqProps.body?.protocol)
      ? reqProps.body?.protocol
      : false;
  const url =
    typeof reqProps.body?.url == "string" ? reqProps.body?.url : false;
  const method =
    typeof reqProps.body?.method == "string" &&
    methods.has(reqProps.body?.method)
      ? reqProps.body?.method
      : false;
  const successCodes =
    typeof reqProps.body?.successCodes === "object"
      ? reqProps.body?.successCodes
      : false;
  const timeoutSeconds =
    typeof reqProps.body?.timeoutSeconds === "number" &&
    Number(reqProps.body?.timeoutSeconds) > 5
      ? reqProps.body?.timeoutSeconds
      : false;
  const phone =
    typeof reqProps.body?.phone === "string" ? reqProps.body?.phone : false;
  if (check_id) {
    data_module.read("checks", check_id, (err, checkInfo) => {
      if (protocol) {
        checkInfo.protocol = protocol;
      }
      if (url) {
        checkInfo.url = url;
      }
      if (method) {
        checkInfo.method = method;
      }
      if (successCodes) {
        checkInfo.successCodes = successCodes;
      }
      if (timeoutSeconds) {
        checkInfo.timeoutSeconds = timeoutSeconds;
      }
      data_module.update('checks',check_id,checkInfo,(err)=>{
            if(!err){
                callback(200,{
                    message:"success",
                    checkInfo
                })
            }else{
                callback(404,{
                    error:"Failed"
                })
            }
      })

      
    });
  } else {
    callback(404, {
      error: "Check id is invalid",
    });
  }
};

handler.check.delete=(reqProps,callback)=>{
    callback(404,{
        error:"To be implemented"
    })
}
module.exports = handler;
