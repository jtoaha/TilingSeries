let canvas = undefined
let ctx = undefined

function start() {
  canvas = document.getElementById('square-canvas')
  ctx = canvas.getContext('2d')
  mainLoop()

}

document.addEventListener('DOMContentLoaded', start)

function update() {}

function draw() {
  ctx.fillStyle = 'blue'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function mainLoop() {
  update()
  draw()
  window.setTimeout(mainLoop, 1000 / 60)
}
