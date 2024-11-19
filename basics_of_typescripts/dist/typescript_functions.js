"use strict";
function linear_equation(x, slope, constant = 3, power) {
    const y = slope * x + constant;
    return y * (power || 1) || 0;
}
console.log(linear_equation(3, 4));
console.log(linear_equation(4, 6));
//# sourceMappingURL=typescript_functions.js.map