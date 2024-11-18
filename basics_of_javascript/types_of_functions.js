/// named function
function greet(name){
    console.log("Hello "+name)
}
greet("ahmed")
//anon function
const some_var=function(name){
    console.log("Hello "+name)

}
some_var("Ahmed")
// lambda function

const some_other_var = (name)=>{ console.log("Hello "+name)};
some_other_var("Ahmed")



//higher order takes a function as input
function ho(somevar){
    somevar("ahmed")
}
ho(some_var)

// Immediately invoked
//(function(name){console.log("Hello "+name);})("Ahmed");
