const data_module = require("../../lib/data");
const { hash, parseJson } = require("../../lib/utilities");
const tokenHandler = require("../routeHandlers/tokenHandler");
const handler = {};

handler.handle = (reqProps, callback) => {
  const accepted_methods = new Set(["get", "post", "put", "delete"]);
  if (accepted_methods.has(reqProps?.method)) {
    handler.user[reqProps?.method](reqProps, callback);
  } else {
    callback(201, {
      message: "this is userHandler",
    });
  }
};
handler.user = {};

handler.user.post = (reqProps, callback) => {
  const firstName =
    typeof reqProps?.body?.firstName === "string" &&
    reqProps.body?.firstName?.trim().length > 0
      ? reqProps?.body?.firstName
      : false;
  const lastName =
    typeof reqProps?.body?.lastName === "string" &&
    reqProps.body?.lastName?.trim().length > 0
      ? reqProps?.body?.lastName
      : false;
  const mobile_number =
    typeof reqProps?.body?.mobile_number === "string" &&
    reqProps?.body?.mobile_number.trim().length > 0
      ? reqProps?.body?.mobile_number
      : false;
  const password =
    typeof reqProps?.body?.password === "string" &&
    reqProps?.body?.password.trim().length > 0
      ? reqProps?.body?.password
      : false;

  if (firstName && lastName && mobile_number && password) {
    console.log("USER OBJECT: ");
    const userObject = {
      firstName,
      lastName,
      mobile_number,
      password: hash(password),
    };
    console.log(userObject);
    data_module.create("user", mobile_number, userObject, (err) => {
      if (err) {
        console.log(err);
        callback(500, {
          message: "Internal Server error",
        });
      } else {
        callback(201, {
          success: "True.",
          message: "User created",
        });
      }
    });
  } else {
    callback(404, {
      message: "Invalid Fields",
    });
  }
};
handler.user.put = (reqProps, callback) => {
  const phone =
    typeof reqProps.queryStringObject?.mobile_number === "string" &&
    reqProps.queryStringObject?.mobile_number?.trim()
      ? reqProps.queryStringObject?.mobile_number
      : false;
    //need to add verify like get
  //console.log(phone)
 
      data_module.read("user", phone, (err, userInfo) => {
        if (!err && userInfo) {
          const firstName =
            typeof reqProps?.body?.firstName === "string" &&
            reqProps.body?.firstName?.trim().length > 0
              ? reqProps?.body?.firstName
              : false;
          const lastName =
            typeof reqProps?.body?.lastName === "string" &&
            reqProps.body?.lastName?.trim().length > 0
              ? reqProps?.body?.lastName
              : false;
          const mobile_number =
            typeof reqProps?.body?.mobile_number === "string" &&
            reqProps?.body?.mobile_number.trim().length > 0
              ? reqProps?.body?.mobile_number
              : false;
          const password =
            typeof reqProps?.body?.password === "string" &&
            reqProps?.body?.password.trim().length > 0
              ? reqProps?.body?.password
              : false;
          if (firstName || lastName || mobile_number || password) {
            console.log("One or more field needs to be updated...");

            if (userInfo.firstName) userInfo.firstName = firstName;
            if (userInfo.lastName) userInfo.lastName = lastName;
            if (userInfo.mobile_number) userInfo.mobile_number = mobile_number;
            if (userInfo.password) userInfo.password = password;
            data_module.update("user", phone, userInfo, (err) => {
              if (err) {
                console.log(err);
                callback(500, {
                  message: "Internal server error",
                });
              } else {
                callback(201, { message: "User updated" });
              }
            });
          } else {
            callback(500, {
              message: "Invalid fields",
            });
          }
        }
      });
    
  
};
handler.user.get = (reqProps, callback) => {
  const phone =
    typeof reqProps.queryStringObject?.mobile_number === "string"
      ? reqProps.queryStringObject?.mobile_number
      : false;
  const token =
    typeof reqProps.headersObject?.token === "string"
      ? reqProps.headersObject?.token
      : false;
  console.log("Header Object: " + reqProps.headersObject);
  //console.log(reqProps)
  if (phone) {
    if (token) {
      tokenHandler._token.verify(token, phone, (isVerified) => {
        if (isVerified) {
          data_module.read("user", phone, (err, data) => {
            //console.log(data)
            callback(200, {
              user: data,
            });
          });
        } else {
          callback(404, {
            error: "Authentication failure",
          });
        }
      });
    } else {
      callback(404, {
        message: "Please add token in header",
      });
    }
  } else {
    callback(404, {
      message: "Mobile number is not specified",
    });
  }
};

handler.user.delete = (reqProps, callback) => {
  const phone =
    typeof reqProps.queryStringObject.mobile_number === "string" &&
    reqProps.queryStringObject.mobile_number.trim()
      ? reqProps.queryStringObject.mobile_number
      : false;
  if (phone) {
    data_module.read("user", phone, (err, data) => {
      if (!err && data) {
        data_module.delete("user", phone, (err) => {
          if (!err) {
            callback(200, {
              message: "User was successfully deleted.",
            });
          } else {
            callback(500, {
              error: "there was a server side error -1",
            });
          }
        });
      } else {
        console.log(err);
        callback(500, {
          error: "There was a server side error. -2",
        });
      }
    });
  } else {
    callback(500, {
      error: "There was a server side error- 3",
    });
  }
};

module.exports = handler;
