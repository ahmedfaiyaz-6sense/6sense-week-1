var Size;
(function (Size) {
    Size[Size["small"] = 0] = "small";
    Size[Size["large"] = 1] = "large";
    Size[Size["larger"] = 2] = "larger";
})(Size || (Size = {}));
var shirtSize = Size.larger;
console.log(shirtSize);
