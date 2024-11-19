"use strict";
function get_employee_id(employee_id) {
    if (typeof employee_id === 'number') {
        console.log("Employee ID is a number: " + employee_id);
        return employee_id;
    }
    else {
        console.log("Employee ID is a string: " + employee_id);
    }
    return 0;
}
//# sourceMappingURL=narrowing.js.map