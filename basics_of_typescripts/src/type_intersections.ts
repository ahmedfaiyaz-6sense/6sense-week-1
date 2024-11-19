type Fly={
    flying:()=>void
    
}

type Drive={
    driving:()=>void,
    speed:number
}

const flyingCar:Fly & Drive={
    flying: ()=>{console.log("Flying")},
    speed: 10,
    driving: ()=>{console.log("Driving")}
}