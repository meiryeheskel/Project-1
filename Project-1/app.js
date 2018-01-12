//   Project 1 - Shape Simulator
//           by: Meir Yeheskel
var selectedShape = Number(prompt("Welcome to the best shape program\nPlease select desired shape:\n1) Square\n2) Rectangle\n3) Triangle\n4) Diamond"));
var shapeContent, mat;
switch (selectedShape) {
    case 1:// square selected
        var squareSideLength = Number(prompt("Please enter square side length:"));
        if (!ValidNumber(squareSideLength))
            break; // if the input entered by the user is not valid - end the program
        if ((shapeContent = ContentOfShape()) == "invalid number")
            break; // get the content of the shape and assign it to shapeContent, if the input is not valid - end the program
        mat = new Array(squareSideLength); // create a matrix 
        ShapeBuilder(mat, squareSideLength, squareSideLength); // send ShapeBuilder function a square 
        Print(mat);
        document.write("Square Perimeter: " + squareSideLength * 4 + "<br/>Square Area:" + squareSideLength * squareSideLength);
        break;
    case 2:// rectangle selected
        var rectangleWidth = Number(prompt("Please enter Rectangle width:"));
        if (!ValidNumber(rectangleWidth))
            break;
        var rectangleHeight = Number(prompt("Please enter Rectangle height:"));
        if (!ValidNumber(rectangleHeight))
            break;
        if ((shapeContent = ContentOfShape()) == "invalid number")
            break;
        mat = new Array(rectangleHeight); // set mat rows
        ShapeBuilder(mat, rectangleHeight, rectangleWidth);
        Print(mat);
        document.write("Rectangle Perimeter: " + (rectangleWidth + rectangleHeight) * 2 + "<br/>Rectangle Area:" + rectangleWidth * rectangleHeight);
        break;
    case 3:// triangle selected
        var TriangleSideLength = Number(prompt("Please enter Triangle side length:"));
        if (!ValidNumber(TriangleSideLength))
            break;
        if ((shapeContent = ContentOfShape()) == "invalid number")
            break;
        mat = new Array(TriangleSideLength);
        ShapeBuilder(mat, TriangleSideLength, TriangleSideLength);
        Print(mat);
        document.write("Triangle Perimeter: " + TriangleSideLength * (2 + Math.sqrt(2)) + "<br/>Triangle Area:" + 0.5 * TriangleSideLength * TriangleSideLength);
        break; // the perimeter of this triangle equals: [X + X + X * sqrt(2)] or [X * (2 + sqrt(2))]
    case 4:// diamond selected
        var diamondSideLength = Number(prompt("Please enter diamond side length:"));
        if (!ValidNumber(diamondSideLength))
            break;
        if ((shapeContent = ContentOfShape()) == "invalid number")
            break;
        mat = new Array(diamondSideLength * 2 - 1); // the mat dimension that conatins the diamond is diamondSideLength * 2 - 1
        Diamond(mat, diamondSideLength);
        Print(mat);
        document.write("Diamond Perimeter: " + diamondSideLength * 4 + "<br/>Diamond Area:" + 0.5 * Math.pow((2 * diamondSideLength - 1), 2));
        break; // the diamond's area equals half of the diamond's diagonals product
    default: document.write(" Error. Please select 1 or 2 or 3 or 4 for the shape type.");
}
function ShapeBuilder(mat, height, width) {
    for (var i = 0; i < height; i++)
        if (selectedShape == 3)
            mat[i] = new Array(i + 1); //  build ascending arrays (which form a triangle)
        else
            mat[i] = new Array(width); // otherwise build a square or a rectangular mat
    Initialize(mat, height); // initialize mat with spaces
    switch (shapeContent) {
        case "asterisks":// fill mat with asterisks 
            for (var i = 0; i < height; i++)
                for (var j = 0; j < mat[i].length; j++)
                    mat[i][j] = "*";
            break;
        case "frame":// fill mat frame only
            for (var i = 0; i < height; i++)
                if (i == 0 || i == height - 1)
                    for (var j = 0; j < mat[i].length; j++)
                        mat[i][j] = "*";
                else {
                    mat[i][0] = "*";
                    mat[i][mat[i].length - 1] = "*";
                }
            break;
        case "ascending numbers":// fill mat with ascending numbers
            for (var i = 0; i < height; i++)
                for (var j = 0; j < mat[i].length; j++)
                    mat[i][j] = "" + (j + 1);
            break;
        case "descending numbers":// fill mat with descending numbers
            for (var i = 0; i < height; i++)
                for (var j = 0; j < mat[i].length; j++)
                    mat[i][j] = "" + (width - j);
    }
}
function Diamond(mat, diamondSideLength) {
    var diamondDimension = diamondSideLength * 2 - 1; // the mat dimension that conatins the diamond is diamondSideLength * 2 - 1
    for (var i = 0; i < diamondDimension; i++)
        mat[i] = new Array(diamondDimension);
    Initialize(mat, diamondDimension); // initialize mat with spaces
    switch (shapeContent) {
        case "asterisks":// fill diamond with asterisks, 1st loop: upper diamond, 2nd loop:lower diamond                                   
            for (var i = 0; i < diamondSideLength; i++)
                for (var j = diamondSideLength - 1 - i; j <= diamondSideLength - 1 + i; j++)
                    mat[i][j] = "*";
            for (var i = diamondSideLength - 2; i >= 0; i--)
                for (var j = diamondSideLength - 1 - i; j <= diamondSideLength - 1 + i; j++)
                    mat[diamondDimension - 1 - i][j] = "*";
            break;
        case "frame":// fill diamond frame only, 1st loop: upper frame, 2nd loop:lower frame
            for (var i = 0; i < diamondSideLength; i++) {
                mat[i][diamondSideLength - 1 - i] = "*";
                mat[i][diamondSideLength - 1 + i] = "*";
            }
            for (var i = diamondSideLength - 2; i >= 0; i--) {
                mat[diamondDimension - 1 - i][diamondSideLength - 1 - i] = "*";
                mat[diamondDimension - 1 - i][diamondSideLength - 1 + i] = "*";
            }
            break;
        case "ascending numbers":// fill diamond with ascending numbers, 1st loop: upper diamond, 2nd loop:lower diamond
            for (var i = 0; i < diamondSideLength; i++) {
                var counter = 1;
                for (var j = diamondSideLength - 1 - i; j <= diamondSideLength - 1 + i; j++)
                    mat[i][j] = "" + counter++;
            }
            for (var i = diamondSideLength - 2; i >= 0; i--) {
                var counter = 1;
                for (var j = diamondSideLength - 1 - i; j <= diamondSideLength - 1 + i; j++)
                    mat[diamondDimension - 1 - i][j] = "" + counter++;
            }
            break;
        case "descending numbers":// fill diamond with descending numbers, 1st loop: upper diamond, 2nd loop:lower diamond
            for (var i = 0; i < diamondSideLength; i++) {
                var counter = diamondDimension;
                for (var j = diamondSideLength - 1 - i; j <= diamondSideLength - 1 + i; j++)
                    mat[i][j] = "" + counter--;
            }
            for (var i = diamondSideLength - 2; i >= 0; i--) {
                var counter = diamondDimension;
                for (var j = diamondSideLength - 1 - i; j <= diamondSideLength - 1 + i; j++)
                    mat[diamondDimension - 1 - i][j] = "" + counter--;
            }
    }
}
function Initialize(mat, height) {
    for (var i = 0; i < height; i++)
        for (var j = 0; j < mat[i].length; j++)
            mat[i][j] = "&nbsp;";
}
function ContentOfShape() {
    var shape = Number(prompt("Please select shape content:\n1) *****\n2) *    *\n3) 12345\n4) 54321"));
    switch (shape) {
        case 1: return "asterisks";
        case 2: return "frame";
        case 3: return "ascending numbers";
        case 4: return "descending numbers";
        default:
            document.write("Error. Please select 1 or 2 or 3 or 4, for the shape content.");
            return "invalid number";
    }
}
function ValidNumber(input) {
    if (isNaN(input) || Math.floor(input) != input || input <= 0 || input > 100) {
        document.write("Error. Please enter a positive integer number.");
        return false;
    }
    return true;
}
function Print(mat) {
    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat[i].length; j++)
            if (selectedShape == 4 && Number(mat[i][j]) > 9)
                document.write(mat[i][j]); //                                                        after a two digits number
            else
                document.write(mat[i][j] + " ");
        document.write("<br/>");
    }
    document.write("<br/>");
}
//# sourceMappingURL=app.js.map