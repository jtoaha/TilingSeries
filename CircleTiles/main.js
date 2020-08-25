var canvas = undefined
var canvasContext = undefined

let numCircles = 12;
let degrees = 2 * Math.PI / numCircles;

function start() {
  canvas = document.getElementById('circle-canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.globalAlpha = .1
  mainLoop()
}

document.addEventListener('DOMContentLoaded', start)

function update() {}

function draw() {
  ctx.fillStyle = 'blue'
  //ctx.fillRect(0, 0, canvas.width, canvas.height)
  for (let i= 0 ; i <numCircles; i++) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(0,0, 50, 50, 0, 0, Math.PI*2)
    ctx.stroke()
    ctx.fill();
    ctx.restore()
  }

}
function mainLoop() {
  update()
  draw()
  window.setTimeout(mainLoop, 1000 / 60)
}
