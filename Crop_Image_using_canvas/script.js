// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");
// ctx.moveTo(0,0);
// ctx.lineTo(200,100);
// ctx.fillStyle = "red";
// ctx.fillRect(0, 0, canvas.getAttribute("height"), canvas.getAttribute("width"));
// ctx.stroke();

// var canvas2 = document.getElementById("myCanvas2");
// var ctx2 = canvas2.getContext("2d");
// var img = document.getElementById("img");
// ctx2.drawImage(img,10,10);
// console.log("inhere");

// var p1 = document.getElementById('p1');
// p1.innerHTML='';


// canvas.addEventListener("click",function(evt){
//     var mousePosition = getMousePosition(canvas,evt);
//     console.log(mousePosition.x + " --- " + mousePosition.y);
//     p1.innerHTML +="<h3> the document coordinates "+  mousePosition.x +"-----"+ mousePosition.y +"</h3>";
    
// },false);

// function getMousePosition(canvas,evt){
//   var rect = canvas.getBoundingClientRect();
//   return {
//     x: evt.clientX - rect.left,
//     y: evt.clientY - rect.top
//   } 
// }


var proportion = 0.8; // you may change the proportion for the cropped image.
// var theImage = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/222579/beagle400.jpg";
var theImage = "https://cdn-images-1.medium.com/max/1200/1*c94SpnDXD8imHLUW0fl-ng.jpeg";
/*
original image:
----------------------------
|     |                    |
|     |sy                  |
|_____|____________        |
| sx  |           |        |
|     |           |        |
|     |           | sh     |
|     |           |        |
|     |___________|        |
|          sw              |
|                          |
|                          |
|__________________________|

cropped image:
----------------------------
|     |                    |
|     |y                   |
|_____|_________           |
|  x  |        |           |
|     |        | h         |
|     |________|           |
|          w               |
|                          |
|                          |
|__________________________|

ctx.drawImage(img,sx,sy,sw,sh,x,y,w,h)

*/


var output = document.getElementById("output");
var c1 = document.getElementById("c1");
var ctx1 = c1.getContext("2d");
var c2 = document.getElementById("c2");
var ctx2 = c2.getContext("2d");

var cw = c1.width = c2.width = 400,
  cx = cw / 2;
var ch = c1.height = c2.height = 400,
  cy = ch / 2;

var isDragging1 = false;
var isDragging2 = false;

var sy = 20;
var sx = 100;
var sw = 200;
var sh = 200;

var r = 2;

var mousePos1 = {
  x: 0,
  y: 0
};
var mousePos2 = {
  x: 0,
  y: 0
};

var o = { // cropping bars
  "sx": {
    color: "white",
    x: 0,
    y: sy,
    w: cw,
    h: r,
    bool: false,
  },
  "sy": {
    color: "yellow",
    x: sx,
    y: 0,
    w: r,
    h: ch,
    bool: false,
  },
  "sw": {
    color: "orange",
    x: 0,
    y: sy + sh,
    w: cw,
    h: r,
    bool: false,
  },
  "sh": {
    color: "red",
    x: sx + sw,
    y: 0,
    w: r,
    h: ch,
    bool: false,
  }
}

function drawGuides(o) {
  for (k in o) {
    ctx1.fillStyle = o[k].color;
    ctx1.beginPath();
    ctx1.fillRect(o[k].x, o[k].y, o[k].w, o[k].h);
  }
}


/////done
function Imgo(o, d) { // an object defining the cropped image
  var imgo = {
    sx: o.sy.x,
    sy: o.sx.y,
    sw: o.sh.x - o.sy.x,
    sh: o.sw.y - o.sx.y,
    w: ~~((o.sh.x - o.sy.x) * proportion),
    h: ~~((o.sw.y - o.sx.y) * proportion),
    x: d.x,
    y: d.y
  }
  return imgo;
}

var d = {
  x: ~~(cx - sw * proportion / 2),
  y: ~~(cy - sh * proportion / 2)
}

function Output(Imgo, output) {
  output.innerHTML = "ctx.drawImage(img," + imgo.sx + "," + imgo.sy + "," + imgo.sw + "," + imgo.sh + "," + imgo.x + "," + imgo.y + "," + imgo.w + "," + imgo.h + ")";
}

function drawCroppedImage(imgo) {
  ctx2.drawImage(img, imgo.sx, imgo.sy, imgo.sw, imgo.sh, imgo.x, imgo.y, imgo.w, imgo.h);
}

function outlineImage(imgo) {
  ctx2.beginPath();
  ctx2.rect(imgo.x, imgo.y, imgo.w, imgo.h);
}

function cursorStyleC1() {
  c1.style.cursor = "default";
  for (k in o) { //o[k].bool = false;
    ctx1.beginPath();
    ctx1.rect(o[k].x - 10, o[k].y - 10, o[k].w + 20, o[k].h + 20);
    if (ctx1.isPointInPath(mousePos1.x, mousePos1.y)) {
      if (k == "sx" || k == "sw") {
        c1.style.cursor = "row-resize";
      } else {
        c1.style.cursor = "col-resize";
      }
      break;
    } else {
      c1.style.cursor = "default";
    }
  }
}

function cursorStyleC2() {
  c2.style.cursor = "default";
  outlineImage(imgo);
  if (ctx2.isPointInPath(mousePos2.x, mousePos2.y)) {
    c2.style.cursor = "move";
  } else {
    c2.style.cursor = "default";
  }
}

drawGuides(o);
var imgo = Imgo(o, d); // an object defining the cropped image
Output(Imgo, output); // text: "drawImage(img,130,10,200,220,150,145,100,110)";

var img = new Image();
img.src = theImage;
img.onload = function() {
  c1.style.backgroundImage = "url("+theImage+")";
  drawCroppedImage(imgo);
}

// mousedown ***************************

c1.addEventListener('mousedown', function(evt) {
  isDragging1 = true;

  mousePos1 = oMousePos(c1, evt);
  for (k in o) {
    ctx1.beginPath();
    ctx1.rect(o[k].x - 10, o[k].y - 10, o[k].w + 20, o[k].h + 20);
    if (ctx1.isPointInPath(mousePos1.x, mousePos1.y)) {
      o[k].bool = true;
      if (k == "sx" || k == "sw") {
        o[k].y = mousePos1.y;
      } else {
        o[k].x = mousePos1.x;
      }
      break;
    } else {
      o[k].bool = false;
    }
  }
  //alert("mouse down c1");
  Output(Imgo, output);

}, false);

// c2.addEventListener('mousedown', function(evt) {
//   mousePos2 = oMousePos(c2, evt);
//   outlineImage(imgo)
//   if (ctx2.isPointInPath(mousePos2.x, mousePos2.y)) {
//     isDragging2 = true;

//     deltaX = mousePos2.x - imgo.x;
//     deltaY = mousePos2.y - imgo.y;

//     Output(Imgo, output);
//     //alert("mouse down c2");
//   }
// }, false);

// mousemove ***************************
c1.addEventListener('mousemove', function(evt) {
  mousePos1 = oMousePos(c1, evt); //console.log(mousePos)	
  cursorStyleC1();

  if (isDragging1 == true) {
    ctx1.clearRect(0, 0, cw, ch);

    for (k in o) {
      if (o[k].bool) {
        if (k == "sx" || k == "sw") {
          o[k].y = mousePos1.y;
        } else {
          o[k].x = mousePos1.x;
        }
        break;
      }
    }
    //alert("mouse move c1");
    
    drawGuides(o);
    ctx2.clearRect(0, 0, cw, ch);
    imgo = Imgo(o, d);
    drawCroppedImage(imgo);
    Output(Imgo, output);
  }
}, false);

// c2.addEventListener('mousemove', function(evt) {
//   mousePos2 = oMousePos(c2, evt);
//   //alert("mouse move c2");

//   if (isDragging2 == true) {
//     ctx2.clearRect(0, 0, cw, ch);
//     d.x = mousePos2.x - deltaX;
//     d.y = mousePos2.y - deltaY;
//     imgo = Imgo(o, d);
//     drawCroppedImage(imgo);
//     Output(Imgo, output);
//   }
//   cursorStyleC2();
// }, false);

// mouseup ***************************
c1.addEventListener('mouseup', function(evt) {
  //alert("mouse up c1");
  isDragging1 = false;
  for (k in o) {
    o[k].bool = false;
  }
}, false);

// c2.addEventListener('mouseup', function(evt) {
//   isDragging2 = false;
//   //alert("mouse up c2");

// }, false);

// mouseout ***************************
c1.addEventListener('mouseout', function(evt) {
  isDragging1 = false;
  //alert("mouse out c1");
  for (k in o) {
    o[k].bool = false;
  }
}, false);

// c2.addEventListener('mouseout', function(evt) {
//   isDragging2 = false;
//   //alert("drag");

// }, false);

function oMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  //alert("oMousePos");
  return {
    x: Math.round(evt.clientX - rect.left),
    y: Math.round(evt.clientY - rect.top)
  }
}