let canvas = document.getElementById("myCanvas"),
  ctx = canvas.getContext("2d"),
  colors = [],
  currentColor = document.getElementById("current-color"),
  storedColors = document.getElementById("color-list"),
  fillColor,
  time = 0,
  intTimer;

// object representing paint brush
const brush = {
  x: undefined,
  y: undefined,
  size: 1,
  drawing: false,
};

// group of mouse events that allow drawing inside the canvas
canvas.addEventListener("mousedown", function () {
  brush.drawing = true;
});
canvas.addEventListener("mouseup", function () {
  brush.drawing = false;
  brush.x = undefined;
  brush.y = undefined;
});
canvas.addEventListener("mousemove", draw);

// R key erases canvas
document.addEventListener("keydown", function (event) {
  if (event.key == "r" || event.key == "R") {
    ctx.clearRect(0, 0, 600, 600);
  }
});

// Remember Me button stores current selected color in the colors array
document
  .getElementById("remember-button")
  .addEventListener("click", function () {
    // will only store color if it hasn't been stored before already
    if (colors.indexOf(currentColor.value) == -1) {
      colors.push(currentColor.value);
      storedColors.innerHTML = colors.toString();
    }
  });

// E key deletes all stored colors
document.addEventListener("keydown", function (event) {
  if (event.key == "e" || event.key == "E") {
    colors = [];
    storedColors.innerHTML = "No colors stored!";
  }
});

// changes the width of the line in the brush object
document.addEventListener("keydown", function (e) {
  if (e.key == "ArrowUp") {
    brush.size++;
    console.log(brush.size);
    //document.body
  } else if (e.key == "ArrowDown") {
    brush.size--;
    console.log(brush.size);
  }
});

// cycle colors to fill canvas, interval will not run multiple times
document.getElementById("cycle-button").addEventListener("click", function () {
  let i = 0;

  if (time == 0 && colors.length > 0) {
    intTimer = setInterval(function () {
      fillColor = colors[i];
      fillCanvas();
      i++;

      if (i > colors.length - 1) {
        i = 0;
      }
    }, 2000);

    time++;
  }
});

// stops interval and allows it to be run again
document.getElementById("stop-button").addEventListener("click", function () {
  clearInterval(intTimer);
  time = 0;
  intTimer = undefined;
});

// gets mouse position, updates the x and y values in the brush object and draws a line
function draw(e) {
  if (brush.drawing == true) {
    ctx.strokeStyle = currentColor.value;
    ctx.lineWidth = brush.size;
    ctx.beginPath();
    if (brush.x == undefined || brush.y == undefined) {
      ctx.moveTo(e.offsetX, e.offsetY);
    } else {
      ctx.lineTo(brush.x, brush.y);
      ctx.lineTo(e.offsetX, e.offsetY);
    }
    ctx.stroke();
    brush.x = e.offsetX;
    brush.y = e.offsetY;
  }
}

// fills canvas with a stored color
function fillCanvas() {
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.rect(0, 0, 600, 600);
  ctx.fill();
}
