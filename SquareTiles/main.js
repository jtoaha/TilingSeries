let canvas = undefined
let ctx = undefined
var strokeWidth = 5
var hw = 100
function start() {
  canvas = document.getElementById('square-canvas')
  ctx = canvas.getContext('2d')
  mainLoop()
}

document.addEventListener('DOMContentLoaded', start)

function update() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.lineWidth = strokeWidth
}

function draw() {
  ctx.fillStyle = 'pink'
  ctx.fillRect(0, 0, canvas.width, canvas.height / 1.25)

  ctx.strokeRect(0, 0, hw, hw)

  let rowTracker = 1
  let iStart
  for (let j = (-3 / 4) * hw; j < canvas.height; j += (3 / 4) * hw) {
    if (rowTracker % 2 === 0) iStart = 0
    else iStart = (-3 / 4) * hw
    rowTracker++
    for (let i = iStart; i < canvas.width; i += (5 / 4) * hw) {
      ctx.strokeRect(i, j, hw, hw)
    }
  }
}

function mainLoop() {
  update()
  draw()
  window.setTimeout(mainLoop, 1000 / 60)
}
