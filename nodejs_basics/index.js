//const fruits=require('./fruits')------> module import practice
//console.log(fruits)


/// PATH MODULE

var path = require('path')
console.log(path)


////fs module
//read text file
var file_system = require('fs')
var text_file = file_system.readFile('test.txt',(err,data)=>{
    
    console.log(data.toString())
})
console.log("DATA: ")

///events module
// for practice creating a event based todo list
const EventEmitter = require('events')
class TodoList extends EventEmitter{
    constructor(username){
        super(``)
        this.todo_event_emitter=new EventEmitter()
        this.todo_list =[]
        this.username=username
        this.todo_event_emitter.on(this.username,(task)=>{
            console.log(this.username+" added task: "+task)
        })
        
    }
    addItem(task){
        if(typeof(task)==='string'){
            this.todo_list.push(task)
        }
        this.todo_event_emitter.emit(this.username,task)

    }
}

const todoList=new TodoList('Dummy')
todoList.addItem("Sleep")


/// http module
const http=require('http')
const server=http.createServer((req,res)=>{
    res.write('Server is running');
    res.end();
})
server.on("connection",()=>{console.log("Client connected")})
server.listen(3000)
console.log("Server started in port 3000")
