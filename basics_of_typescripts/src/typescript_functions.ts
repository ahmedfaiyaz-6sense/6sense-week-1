function linear_equation(x:number,slope:number,constant:number=3,power?:number):number{
                                //|------|-------|---->must add proper types for the function parameters and return types.
    
    const y:number=slope*x+constant
    return y*(power||1)||0
    
}

console.log(linear_equation(3,4))
console.log(linear_equation(4,6))