// data module to handle file system related operations
const file_system = require("fs");
const path = require("path");
const { parseJson } = require("./utilities");

const lib = {};

lib.base_dir = __dirname;
lib.create_path = (dir, file) => {
  const folder_path = lib.base_dir + "/" + dir;
  const file_path = folder_path + "/" + file + ".json";

  return {
    file_path: file_path,
    folder_path: folder_path,
  };
};
lib.create = (dir, file, data, callback) => {
  const fps = lib.create_path(dir, file);

  file_path = fps.file_path;
  folder_path = fps.folder_path;

  console.log("Creating file " + file_path);
  file_system.mkdir(folder_path, (err) => {
    if (err) {
      callback(false);
    } else {
      callback("Folder created successfully " + folder_path);
    }
  });

  file_system.open(file_path, "wx", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      const stringdata = JSON.stringify(data);
      console.log(stringdata);
      file_system.writeFile(fileDescriptor, stringdata, (err) => {
        if (!err) {
          file_system.close(fileDescriptor, (err) => {
            if (!err) {
              callback(false);
            } else {
              callback("Error closing the file..");
            }
          });
        } else {
          callback("Error writting file");
        }
      });
    } else {
      console.log("Could not create new file.Maybe File already exist");
      console.log("File path " + file_path);
    }
  });
};

lib.read = (folder, file_name, callback) => {
  const fps = lib.create_path(folder, file_name);

  folder_path = fps.folder_path;
  file_path = fps.file_path;
  console.log("Reading file " + file_path);
  file_system.readFile(file_path, (err, data) => {
    callback(err, parseJson(data));
  });
};

lib.update = (folder, file_name, content, callback) => {
  const fps = lib.create_path(folder, file_name);

  folder_path = fps.folder_path;
  file_path = fps.file_path;
  file_system.open(file_path, "r+", (err, fileDescriptor) => {
    console.log(err, fileDescriptor);
    if (!err && fileDescriptor) {
      const stringData = JSON.stringify(content);

      file_system.ftruncate(fileDescriptor, (err) => {
        if (!err) {
          console.log("Trucncation successfull");
          file_system.writeFile(fileDescriptor, stringData, (err) => {
            if (!err) {
              file_system.close(fileDescriptor, (err) => {
                if (err) {
                  callback("Error closing file");
                } else {
                  callback(false);
                }
              });
            } else {
              callback("Error writting files");
            }
          });
        } else {
          callback("Truncation Failed");
        }
      });
    } else {
      console.log("Error updating file does not exist");
    }
  });
};

lib.delete = (folder, file_name, callback) => {
  const fps = lib.create_path(folder, file_name);

  folder_path = fps.folder_path;
  file_path = fps.file_path;
  file_system.unlink(file_path, (err) => {
    if (!err) {
      callback(false);
    } else {
      callback(`Error deleting file`);
    }
  });
};
lib.list = (folder_name,callback)=>{
  const folder_path=lib.base_dir + "/" + folder_name;
  file_system.readdir(folder_path,(err,files)=>{
   // console.log(files)
    callback(files)
  })
}
module.exports = lib;
