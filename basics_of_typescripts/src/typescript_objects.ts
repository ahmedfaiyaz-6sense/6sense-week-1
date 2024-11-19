let employee:{
    id:number,
    name?:string,// ? means optional
    age:number,
    joining_date:String,
    retire:(date:Date)=>void
    
}={
    id:1000,
    name:"John",
    age:30,
    joining_date:Date(),//returns date string
    retire:(date:Date)=>{
        console.log(date)
    }


}