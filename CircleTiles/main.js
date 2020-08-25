var canvas = undefined
var canvasContext = undefined

let numCircles = 10
let degrees = (2 * Math.PI) / numCircles
let circleRadius = 100


let colorTheme = [];

for (let i = 0; i < numCircles; i++){
  let r = Math.floor(Math.random() * 256)
  let g = Math.floor(Math.random() * 256)
  let b = Math.floor(Math.random() * 256)
  colorTheme.push(`rgba(${r},${g},${b}, .25 )`)
}

function start() {
  canvas = document.getElementById('circle-canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.translate(canvas.width / 2, canvas.height / 2)
  //ctx.globalAlpha = 0.1
  mainLoop()
}

document.addEventListener('DOMContentLoaded', start)

function update() {}

function draw() {

  //ctx.fillRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < numCircles; i++) {

    ctx.fillStyle = colorTheme[i]
    ctx.save()
    ctx.beginPath()
    ctx.translate(circleRadius, circleRadius*2)
    ctx.ellipse(0, 0, circleRadius, circleRadius, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fill();
    ctx.restore()
    ctx.rotate(degrees)
  }
}
function mainLoop() {
  update()
  draw()
  window.setTimeout(mainLoop, 1000 / 60)
}
