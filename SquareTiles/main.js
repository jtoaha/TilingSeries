let canvas = undefined
let ctx = undefined
var strokeWidth = 5
var hw = 100
let r, g, b
r = Math.floor(Math.random() * 256)
g = Math.floor(Math.random() * 256)
b = Math.floor(Math.random() * 256)

function start() {
  canvas = document.getElementById('square-canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.lineWidth = strokeWidth
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
      console.log(Math.floor(Math.random() * 256))
      r = Math.floor(Math.random() * 256)
      g = Math.floor(Math.random() * 256)
      b = Math.floor(Math.random() * 256)

      ctx.fillStyle = `rgba(${r},${g},${b}, .25)`
      ctx.strokeRect(i, j, hw, hw)

      ctx.fillRect(i, j, hw, hw)
    }
  }
  mainLoop()
}

document.addEventListener('DOMContentLoaded', start)

function update() {


}

function draw() {

}

function mainLoop() {
  update()
  draw()
  window.setTimeout(mainLoop, 1000 / 60)
}
