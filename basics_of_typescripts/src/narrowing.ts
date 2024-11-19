function get_employee_id(employee_id:string| number):any{
    //narrowing 
    // narrow down if employee id is a string or number
    if (typeof employee_id==='number'){
        console.log("Employee ID is a number: "+employee_id)
        return  employee_id
    }
    else{
        console.log("Employee ID is a string: "+employee_id)
    }
    return 0
}