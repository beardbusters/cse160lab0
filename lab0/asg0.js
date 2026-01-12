// asg0.js

let canvas = null;
let ctx = null;

function clearCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawVector(v, color) {
    //draw vector3 v with color 
    const SCALE = 20
    
    const ORIGIN_X = canvas.width / 2;
    const ORIGIN_Y = canvas.height / 2;

    const x = v.elements[0];
    const y = v.elements[1];

    ctx.beginPath();
    ctx.moveTo(ORIGIN_X, ORIGIN_Y);
    ctx.lineTo(ORIGIN_X + x * SCALE, ORIGIN_Y - y * SCALE); // invert Y for canvas coords
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}


function handleDrawEvent() {
    clearCanvas();

    const x = Number(document.getElementById("v1x").value);
    const y = Number(document.getElementById("v1y").value);

    const v1 = new Vector3([x, y, 0]);
    drawVector(v1, "red");

    // draw the second blue vector
    const x2 = Number(document.getElementById("v2x").value);
    const y2 = Number(document.getElementById("v2y").value);

    const v2 = new Vector3([x2, y2, 0]);
    drawVector(v2, "blue");
}


function readNumber(id) {
    const n = Number(document.getElementById(id).value);
    return Number.isFinite(n) ? n : 0;
}

function readV1() {
    return new Vector3([readNumber("v1x"), readNumber("v1y"), 0]);
}

function readV2() {
    return new Vector3([readNumber("v2x"), readNumber("v2y"), 0]);
}

function angleBetween(v1, v2) {
    // return angle between two vectors 
    // get magnitude
    const m1 = v1.magnitude();
    const m2 = v2.magnitude();

    if (m1 === 0 || m2 === 0) {
      console.log("angleBetween: undefined (one of the vectors has magnitude 0)");
      return NaN;
    }

    // get dot product
    const d = Vector3.dot(v1, v2);
    let cosA = d / (m1 * m2);

    //cosA = Math.max(-1, Math.min(1, cosA));

    const angleRad = Math.acos(cosA);
    const angleDeg = angleRad * (180 / Math.PI);
    return angleDeg;
}

function areaTriangle(v1, v2) {
    var cross = Vector3.cross(v1,v2);
    area = (cross.magnitude() / 2);
    return area;
}

// Step: operations
function handleDrawOperationEvent() {
    clearCanvas();

    const v1 = readV1();
    drawVector(v1, "red");

    const v2 = readV2();
    drawVector(v2, "blue");

    const op = document.getElementById("opSelect").value;
    const s = readNumber("scalarInput");

    if (op === "add") {
      const v3 = new Vector3(v1.elements);
      v3.add(v2);
      drawVector(v3, "green");
      return;
    }

    if (op === "sub") {
      const v3 = new Vector3(v1.elements);
      v3.sub(v2);
      drawVector(v3, "green");
      return;
    }

    if (op === "mul") {
      const v3 = new Vector3(v1.elements);
      const v4 = new Vector3(v2.elements);
      v3.mul(s);
      v4.mul(s);
      drawVector(v3, "green");
      drawVector(v4, "green");
      return;
    }

    if (op === "div") {
      const v3 = new Vector3(v1.elements);
      const v4 = new Vector3(v2.elements);
      v3.div(s);
      v4.div(s);
      drawVector(v3, "green");
      drawVector(v4, "green");
      return;
    }

    if (op === "mag") {
      console.log("Magnitude v1:", v1.magnitude());
      console.log("Magnitude v2:", v2.magnitude());
      return;
    }

    if (op === "norm") {
      const nv1 = new Vector3(v1.elements);
      const nv2 = new Vector3(v2.elements);
      nv1.normalize();
      nv2.normalize();
      drawVector(nv1, "green");
      drawVector(nv2, "green");
      return;
    }

    if (op ==="angle") {
        const a = angleBetween(v1, v2);
        console.log("Angle: ", a);
        return;
    }

    if (op ==="area") {
        const area = areaTriangle(v1,v2);
        console.log("Area of the triangle:",area);
        return;
    }
}




function main() {
    //retreive canvas element
    canvas = document.getElementById('example');
    if (!canvas) {
        console.log("Failed to retrieve the <canvas> element");
        return;
    }

    // get rendering context for @DCG
    ctx = canvas.getContext('2d');
    if (!ctx) {
        console.log("Failed to get 2D context");
        return;
    }

    /* step 1 
    //draw a blue rectangle
    ctx.fillStyle = 'rgba(0,0,255,1.0)'; // get blue color
    ctx.fillRect(120,10,150,150); // fill a rectangle with the color
    */ 

    // step 2
    // instantiate vector v1 with Vector3 class
    // Step 2: instantiate v1 (z = 0)
    /*
    const v1 = new Vector3([2.25, 2.25, 0]);
    drawVector(v1, "red");
    */ 

    document.getElementById("drawBtn").onclick = handleDrawEvent;
    //handleDrawEvent()
    document.getElementById("drawOpBtn").onclick = handleDrawOperationEvent;
}
