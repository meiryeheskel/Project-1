

 //   Project 1 - Shape Simulator
 //           by: Meir Yeheskel


let selectedShape: number = Number(prompt("Welcome to the best shape program\nPlease select desired shape:\n1) Square\n2) Rectangle\n3) Triangle\n4) Diamond"));
let shapeContent: string, mat: Array<Array<string>>;

switch (selectedShape) {
    case 1:                     // square selected
        let squareSideLength: number = Number(prompt("Please enter square side length:"));
        if (!ValidNumber(squareSideLength)) break;         // if the input entered by the user is not valid - end the program
        if ((shapeContent = ContentOfShape()) == "invalid number") break;  // get the content of the shape and assign it to shapeContent, if the input is not valid - end the program
        mat = new Array<Array<string>>(squareSideLength);        // create a matrix 
        ShapeBuilder(mat, squareSideLength, squareSideLength);   // send ShapeBuilder function a square 
        Print(mat);
        document.write(`Square Perimeter: ${squareSideLength * 4}<br/>Square Area:${squareSideLength * squareSideLength}`);
        break;

    case 2:                     // rectangle selected
        let rectangleWidth: number = Number(prompt("Please enter Rectangle width:"));
        if (!ValidNumber(rectangleWidth)) break;
        let rectangleHeight: number = Number(prompt("Please enter Rectangle height:"));
        if (!ValidNumber(rectangleHeight)) break;
        if ((shapeContent = ContentOfShape()) == "invalid number") break;
        mat = new Array<Array<string>>(rectangleHeight);    // set mat rows
        ShapeBuilder(mat, rectangleHeight, rectangleWidth);
        Print(mat);
        document.write(`Rectangle Perimeter: ${(rectangleWidth + rectangleHeight) * 2}<br/>Rectangle Area:${rectangleWidth * rectangleHeight}`);
        break;
    case 3:                     // triangle selected
        let TriangleSideLength: number = Number(prompt("Please enter Triangle side length:"));
        if (!ValidNumber(TriangleSideLength)) break;
        if ((shapeContent = ContentOfShape()) == "invalid number") break;
        mat = new Array<Array<string>>(TriangleSideLength);
        ShapeBuilder(mat, TriangleSideLength, TriangleSideLength);
        Print(mat);
        document.write(`Triangle Perimeter: ${TriangleSideLength * (2 + Math.sqrt(2))}<br/>Triangle Area:${0.5 * TriangleSideLength * TriangleSideLength}`);
        break;
    case 4:                     // diamond selected
        let diamondSideLength: number = Number(prompt("Please enter diamond side length:"));
        if (!ValidNumber(diamondSideLength)) break;
        if ((shapeContent = ContentOfShape()) == "invalid number") break;
        mat = new Array<Array<string>>(diamondSideLength * 2 - 1);  // the mat dimension that conatins the diamond is diamondSideLength * 2 - 1
        Diamond(mat, diamondSideLength);
        Print(mat);
        document.write(`Diamond Perimeter: ${diamondSideLength * 4}<br/>Diamond Area:${0.5 * (4 * Math.pow(diamondSideLength, 2) - 4 * diamondSideLength + 1)}`);
        break;

    default: document.write(" Error. Please select 1 or 2 or 3 or 4 for the shape type.")

}

function ShapeBuilder(mat: Array<Array<string>>, height: number, width: number): void { // build a mat of either a square, a rectangle or build a triangle
    for (let i: number = 0; i < height; i++)
        if (selectedShape == 3) // if the selected shape is  a triangle..
             mat[i] = new Array<string>(i + 1);  //  build ascending arrays (which form a triangle)
            else mat[i] = new Array<string>(width)  // otherwise build a square or a rectangular mat
        

    Initialize(mat, height);    // initialize mat with spaces
    switch (shapeContent) {
        case "asterisks":                              // fill mat with asterisks 
            for (let i: number = 0; i < height; i++)
                for (let j: number = 0; j < mat[i].length; j++)
                    mat[i][j] = "*";
            break;

        case "frame":                                 // fill mat frame only
            for (let i: number = 0; i < height; i++)
                if (i == 0 || i == height - 1)
                    for (let j: number = 0; j < mat[i].length; j++)
                        mat[i][j] = "*";
                else {
                    mat[i][0] = "*";
                    mat[i][mat[i].length - 1] = "*";
                }
            break;

        case "ascending numbers":                                 // fill mat with ascending numbers
            for (let i: number = 0; i < height; i++)
                for (let j: number = 0; j < mat[i].length; j++)
                    mat[i][j] = `${j + 1}`;
            break;

        case "descending numbers":                                // fill mat with descending numbers
            for (let i: number = 0; i < height; i++)
                for (let j: number = 0; j < mat[i].length; j++)
                    mat[i][j] = `${width - j}`;

    }
}

function Diamond(mat: Array<Array<string>>, diamondSideLength: number): void {  // buid a diamond mat
    let diamondDimension = diamondSideLength * 2 - 1;   // the mat dimension that conatins the diamond is diamondSideLength * 2 - 1
    for (let i: number = 0; i < diamondDimension; i++)
        mat[i] = new Array<string>(diamondDimension);
    Initialize(mat, diamondDimension);  // initialize mat with spaces

    switch (shapeContent) {
        case "asterisks":                                       // fill diamond with asterisks, 1st loop: upper diamond, 2nd loop:lower diamond                                   
            for (let i: number = 0; i < diamondSideLength; i++)
                for (let j: number = diamondSideLength - 1 - i; j <= diamondSideLength - 1 + i; j++)
                    mat[i][j] = "*";
            for (let i: number = diamondSideLength - 2; i >= 0; i--)
                for (let j: number = diamondSideLength - 1 - i; j <= diamondSideLength - 1 + i; j++)
                    mat[diamondDimension - 1 - i][j] = "*";
            break;

        case "frame":                                        // fill diamond frame only, 1st loop: upper frame, 2nd loop:lower frame
            for (let i: number = 0; i < diamondSideLength; i++) {
                mat[i][diamondSideLength - 1 - i] = "*";
                mat[i][diamondSideLength - 1 + i] = "*";
            }
            for (let i: number = diamondSideLength - 2; i >= 0; i--) {
                mat[diamondDimension - 1 - i][diamondSideLength - 1 - i] = "*";
                mat[diamondDimension - 1 - i][diamondSideLength - 1 + i] = "*";
            }
            break;

        case "ascending numbers":                             // fill diamond with ascending numbers, 1st loop: upper diamond, 2nd loop:lower diamond
            for (let i: number = 0; i < diamondSideLength; i++) {
                let counter: number = 1;
                for (let j: number = diamondSideLength - 1 - i; j <= diamondSideLength - 1 + i; j++)
                    mat[i][j] = `${counter++}`;
            }
            for (let i: number = diamondSideLength - 2; i >= 0; i--) {
                let counter: number = 1;
                for (let j: number = diamondSideLength - 1 - i; j <= diamondSideLength - 1 + i; j++)
                    mat[diamondDimension - 1 - i][j] = `${counter++}`;
            }
            break;

        case "descending numbers":                           // fill diamond with descending numbers, 1st loop: upper diamond, 2nd loop:lower diamond
            for (let i: number = 0; i < diamondSideLength; i++) {
                let counter: number = diamondDimension;
                for (let j: number = diamondSideLength - 1 - i; j <= diamondSideLength - 1 + i; j++)
                    mat[i][j] = `${counter--}`;
            }
            for (let i: number = diamondSideLength - 2; i >= 0; i--) {
                let counter: number = diamondDimension;
                for (let j: number = diamondSideLength - 1 - i; j <= diamondSideLength - 1 + i; j++)
                    mat[diamondDimension - 1 - i][j] = `${counter--}`;
            }

    }
}

function Initialize(mat: Array<Array<string>>, height: number): void { // initialize mat with spaces
    for (let i: number = 0; i < height; i++)
        for (let j: number = 0; j < mat[i].length; j++)
            mat[i][j] = "&nbsp;";

}

function ContentOfShape(): string {
    let shape: number = Number(prompt("Please select shape content:\n1) *****\n2) *    *\n3) 12345\n4) 54321"));
    switch (shape) {
        case 1: return "asterisks";
        case 2: return "frame";
        case 3: return "ascending numbers";
        case 4: return "descending numbers";
        default: document.write("Error. Please select 1 or 2 or 3 or 4, for the shape content.");
            return "invalid number";

    }

}

function ValidNumber(input: number): boolean {
    if (isNaN(input) || Math.floor(input) != input || input <= 0) {
        document.write("Error. Please enter a positive integer number.");
        return false;
    }
    return true;
}

function Print(mat: Array<Array<string>>): void {
    for (let i: number = 0; i < mat.length; i++) {
        for (let j: number = 0; j < mat[i].length; j++)
            if (selectedShape == 4 && Number(mat[i][j]) > 9)  // if the selected shape is diamond - avoid asymmetry by omitting space 
                document.write(mat[i][j]);                    //                                                        after a two digits number
            else
                document.write(mat[i][j] + " ");
        document.write("<br/>");
    }
    document.write("<br/>");
}