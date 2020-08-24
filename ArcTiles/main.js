var canvas = undefined
var canvasContext = undefined

function start() {
  canvas = document.getElementById('myCanvas')
  canvasContext = canvas.getContext('2d')
  mainLoop()
}

document.addEventListener('DOMContentLoaded', start)

function update() {}

function draw() {
  canvasContext.fillStyle = 'blue'
  canvasContext.fillRect(0, 0, canvas.width, canvas.height)
}
function mainLoop() {
  update()
  draw()
  window.setTimeout(mainLoop, 1000 / 60)
}
