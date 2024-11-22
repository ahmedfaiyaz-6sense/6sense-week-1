const express = require("express");
const mongoose = require("mongoose");
const todo_route = express.Router();
const todoSchema = require("../schemas/todoSchema");
//console.log(todoSchema)
const Todo = new mongoose.model("Todo", todoSchema);
//get all the todos
todo_route.get("/", async (req, res) => {
  res.send({
    message: "Get request",
  });
})
todo_route.get("/find_active",async (req,res)=>{
  const todo_instance = new Todo()
  const data = await todo_instance.findActive()

  if (data){
    res.send({
      message:"Success",
      data:data
    })
  }else{
    res.send({
      message:"Failed"
    })
  }
})
//get a todo by id
todo_route.get("/:id", async (req, res) => {
  await Todo.findByIdAndUpdate(
    { _id: req.params.id },

  )
    .then((data) => {
      if (data) {
        res.send({
          message: "Updated",
          mongo_message: data,
        });
      } else {
        res.send({
          message: "Record not found",
        });
      }
    })
    .catch((error) => {
      res.send({
        message: "Error Not a valid id",
      });
    });
});

//post todo
todo_route.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save().then((data) => {
    res.send({
      message: "Note insertion successful",
      mongo_message:data,
    });
  }).catch((error)=>{
    res.send({
      message:error
    })
  });
});

//post multiple todo
todo_route.post("/all", async (req, res) => {
  //console.log(req.body)
  await Todo.insertMany(req.body)
    .then((data) => {
      res.send({
        message: "Notes inserted.",
        mongo_message: data,
      });
    })
    .catch((err) => {
      res.send({
        error: "Error",
      });
    });
});

//put todo
todo_route.put("/:id", async (req, res) => {
  await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    }
  )
    .then((data) => {
      res.send({
        message: "Updated",
        mongo_message: data,
      });
    })
    .catch((error) => {
      res.send({
        message: "Error",
      });
    });
});

//post delete
todo_route.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    }
  )
    .then((data) => {
      if (data) {
        res.send({
          message: "Deleted",
          mongo_message: data,
        });
      } else {
        res.send({
          message: "No record found",
        });
      }
    })
    .catch((error) => {
      res.send({
        message: "Error",
      });
    });
});

module.exports = todo_route
