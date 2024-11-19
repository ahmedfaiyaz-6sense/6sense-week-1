"use strict";
var _a, _b;
function getPersonInfo(name) {
    if (typeof name === 'string' && name == 'John') {
        const person = {
            name: "John",
            age: 30,
            email: "john@gmail.com",
            birth_date: new Date()
        };
        return person;
    }
    else if (typeof name == 'string' && name != 'John') {
        return undefined;
    }
    else {
        return null;
    }
}
const person = getPersonInfo("John");
console.log(person);
console.log((_b = (_a = person === null || person === void 0 ? void 0 : person.birth_date) === null || _a === void 0 ? void 0 : _a.getFullYear()) !== null && _b !== void 0 ? _b : "2000");
//# sourceMappingURL=optional_chaining.js.map