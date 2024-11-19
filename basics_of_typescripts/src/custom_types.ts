type Employee={
    id:number,
    name?:string,// ? means optional
    age:number,
    joining_date:String,
    retire:(date:Date)=>void
    
}

const employee_1:Employee={
    id:100238232,
    name:"Ahmed",
    age:30,
    joining_date:Date(),
    retire:(date:Date)=>{
        console.log(date)
    }
}

