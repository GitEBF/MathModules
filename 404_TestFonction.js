V.setTextSize(25)
V.setRoundTo(5)


function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  textSize(V.textsize);
  frameRate(4);
}

function draw() {
  //clearVariables()
  background(230);
  CENTER = {x:300, y:300}
  A = {
    x: 38,
    y: 24
  }

  B = {
    x: 43,
    y: 36
  }
  V.visualize(A, "A")
  V.visualize(B, "B")
  BA = V.getVector(B, A)

  //Trouver BC
  // Perp BA
  BC = V.perp(BA, false)
  // unit et * 20u
  BCunit = V.unit(BC)
  BC = V.multiply(BCunit, 20)
  // C = B + BC
  C = V.add(B, BC)
  V.visualize(C, "C")
  //Trouver CR
  // unit * 10u
  // angle = 180-80= 100
  CR = V.fromAngle(100, 10)
  // C + CR = R
  R = V.add(C, CR)
  REALR = V.sub(R, CENTER)
  V.visualize(R, "R")
  V.setPrintedStatus(true)
}

/* HTML NECESSAIRE POUR VISUALISER LES VARIABLES
<style>

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
          border-bottom: 1px solid #ddd;
          transition: background-color 0.3s;
      }

      #variablesList li:last-child {
          border-bottom: none;
      }

      #variablesList li:hover {
          background-color: #f5f5f5;
      }
  </style>
  </head>

  <body>
    
    <div id="container">
      <h2></h2>
      <ul id="variablesList"></ul>
    </div>
    <div id="canvasContainer">
      
    </div>
    <script src="libraries/vectorOperations.js"></script>
    <script src="404_TestFonction.js"></script>
  </body>
</html>


*/