let canvas = undefined
let ctx = undefined

function start() {
  canvas = document.getElementById('square-canvas')
  ctx = canvas.getContext('2d')
  mainLoop()

}

document.addEventListener('DOMContentLoaded', start)

function update() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function draw() {
  ctx.fillStyle = 'pink'
  ctx.fillRect(0, 0, canvas.width, canvas.height/1.25)
}

function mainLoop() {
  update()
  draw()
  window.setTimeout(mainLoop, 1000 / 60)
}
