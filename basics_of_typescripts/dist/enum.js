"use strict";
var Size;
(function (Size) {
    Size[Size["small"] = 0] = "small";
    Size[Size["large"] = 1] = "large";
    Size[Size["larger"] = 2] = "larger";
})(Size || (Size = {}));
const shirtSize = Size.larger;
console.log(shirtSize);
//# sourceMappingURL=enum.js.map