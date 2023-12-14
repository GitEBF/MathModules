/*
Etienne B. Frappier
13 Dec 2023
https://github.com/GitEBF/MathModules
*/

//
// PRELOAD
//
var styleElement = document.createElement('style');

var cssCode = `
  #container {
    display: flex;
    float: right;
  }

  #variablesList {
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    font-family:'Courier New', Courier, monospace;
    font-size: 35px;
    font-weight: bolder;
  }

  #variablesList li {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #ddd;
    transition: background-color 0.3s;
  }

  #variablesList li p {
    margin: 0;
    padding: 0;
    padding-right: 10px;
  }

  #variablesList li:last-child {
    border-bottom: none;
  }

  #variablesList li:hover {
    background-color: #f5f5f5;
  }
`;



var container = document.createElement('div');
container.id = 'container';

var heading = document.createElement('h2');

var variablesList = document.createElement('ul');
variablesList.id = 'variablesList';

container.appendChild(heading);
container.appendChild(variablesList);
document.body.appendChild(container);

styleElement.textContent = cssCode;

document.head.appendChild(styleElement);

//
// PRELOAD END
//


var V = (function () {
    var textsize = 25;
    var printed = false;
    var roundTo = 5;

    // Variables Functions
    function setTextSize(size) {
        textsize = size;
    }

    function setPrintedStatus(status) {
        printed = status;
    }

    function setRoundTo(value) {
        roundTo = value;
    }


    // Vector Functions
    function MCBetter(vector, angle) { // Version plus facile a utiliser de la formule du prof
        rep = MC(vector.x, vector.y, cos(angle), sin(angle))
        return rep;
    }

    function MC(a, b, c, d) { // Formule du prof
        rep = {
            x: (a * c) - (b * d),
            y: (a * d) + (b * c)
        }
        return rep;
    }

    function getVector(a, b) {
        ab = {
            x: b.x - a.x,
            y: b.y - a.y
        }
        return ab;
    }

    function negative(a) {
        b = {
            x: -a.x,
            y: -a.y
        }
        return b;
    }

    function lineBetween(a, b) {
        line(a.x, a.y, b.x, b.y)
    }

    function multiply(a, multiplier) {
        b = {
            x: a.x * multiplier,
            y: a.y * multiplier
        }
        return b;
    }

    function getAngle(a) {
        return atan2(a.y, a.x);
    }

    function fromAngle(angle, length) {
        a = {
            x: length * cos(angle),
            y: length * sin(angle)
        }
        return a;
    }

    function length(a) {
        return Math.sqrt(a.x * a.x + a.y * a.y);
    }

    function unit(a) {
        len = length(a)
        b = {
            x: a.x / len,
            y: a.y / len
        }
        return b;
    }

    function divide(a, divider) {
        b = {
            x: a.x / divider,
            y: a.y / divider
        }
        return b;
    }

    function add(a, AB) {
        b = {
            x: a.x + AB.x,
            y: a.y + AB.y
        }
        return b;
    }

    function sub(a, AB) {
        b = {
            x: a.x - AB.x,
            y: a.y - AB.y
        }
        return b;
    }

    function perp(a, positiveDeg) {
        if (positiveDeg) {
            return b = {
                x: -a.y,
                y: a.x
            }
        }
        return b = {
            x: a.y,
            y: -a.x
        }
    }

    // Check si c une table avec x et y
    function is2DPoint(obj) {
        if (typeof obj === 'object' && obj !== null) {
            return obj.hasOwnProperty('x') && obj.hasOwnProperty('y');
        }
        return false;
    }

    function copyTextToClipboard(text) {
        var tempInput = document.createElement("input");
        tempInput.style = "position: absolute; left: -1000px; top: -1000px";
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
    }

    function rounded(number) {
        print(number)
        realNumber = Number(number);
        if (isNaN(realNumber)) {
            realNumber = String(number)
            realNumber = Number(realNumber)
        }
        print(realNumber)
        return Number(number.toFixed(roundTo));
    }

    // CHATGPT & Me, inscrit les valeurs dans une liste et les li a un click qui donne dans le clipboard le nombre cliquer
    function toHTML(point, name) {
        if (printed) {
            return false;
        }

        var list = document.getElementById("variablesList");

        // Create list items and append variables to the list
        var listItem = document.createElement("li");

        // Check the type of point
        if (typeof point === 'number' || typeof point === 'string') {
            // If point is a number or string, treat it as a simple value
            var valuePart = document.createElement("p");
            valuePart.textContent = name + " = " + rounded(point);
            listItem.appendChild(valuePart);
        } else if (is2DPoint(point)) {
            // If point is an object with x and y properties, treat it as a 2D point
            var namePart = document.createElement("p");
            namePart.textContent = name + ", ";
            var xPart = document.createElement("p");
            xPart.textContent = "X=" + rounded(point.x);
            var yPart = document.createElement("p");
            yPart.textContent = "Y=" + rounded(point.y);

            // Append the parts to the list item
            listItem.appendChild(namePart);
            listItem.appendChild(xPart);
            listItem.appendChild(yPart);
        } else {
            // Ignore other types
            return false;
        }

        // Add a click event listener to the created li element
        listItem.addEventListener('click', function (event) {
            // Extract the number from the clicked part
            var clickedPart = event.target.textContent;
            var extractedNumber = extractNumber(clickedPart);

            // Copy the extracted number to clipboard
            if (extractedNumber !== null) {
                copyTextToClipboard(extractedNumber);

                // Provide some visual feedback (optional)
                listItem.style.backgroundColor = '#f0f0f0';
                setTimeout(function () {
                    listItem.style.backgroundColor = '';
                }, 200);
            }
        });

        list.appendChild(listItem);
    }

    // Function to extract a number from the text CHATGPT
    function extractNumber(text) {
        var matches = text.match(/[-+]?[0-9]*\.?[0-9]+/);
        return matches ? matches[0] : null;
    }


    function visualize(A, name) {
        stroke(0, 0, 0)
        textSize(textsize)
        ellipse(A.x, A.y, 12);
        text(name, A.x - (textsize / 3), A.y - (textsize / 3));
        toHTML(A, name)
    }

    // Export
    return {
        textsize: textsize,
        printed: printed,
        roundTo: roundTo,
        setTextSize: setTextSize,
        setPrintedStatus: setPrintedStatus,
        setRoundTo: setRoundTo,
        MC: MC,
        MCBetter: MCBetter,
        getVector: getVector,
        negative: negative,
        lineBetween: lineBetween,
        multiply: multiply,
        getAngle: getAngle,
        fromAngle: fromAngle,
        length: length,
        unit: unit,
        divide: divide,
        add: add,
        sub: sub,
        perp: perp,
        is2DPoint: is2DPoint,
        toHTML: toHTML,
        visualize: visualize
    };
})();
