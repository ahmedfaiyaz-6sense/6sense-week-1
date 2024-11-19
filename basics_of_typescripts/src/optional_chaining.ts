type Person={
    name:string,
    age:number,
    email:string,
    birth_date:Date,
    
}

function getPersonInfo(name:string|null):Person | null | undefined{
    if(typeof name==='string' && name=='John'){
        const person:Person={
            name:"John",
            age:30,
            email: "john@gmail.com",
            birth_date:new Date()
        }
        return person;
        
    }
    else if(typeof name=='string' && name!='John'){
        return undefined
    }
    else{
        return null
    }
}

const person:Person|undefined|null=getPersonInfo("John")
console.log(person)
///console.log(person.birth_date)
console.log(person?.birth_date?.getFullYear()??"2000") // optional property access operator


 // ?? nullish coalescing operator
