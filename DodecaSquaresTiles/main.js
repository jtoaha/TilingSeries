var canvas = undefined
var ctx = undefined
let numSquares = 12
let degrees = (2 * Math.PI) / numSquares

function start() {
  canvas = document.getElementById('dodeca-rings')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.translate(canvas.width / 2, canvas.height / 2)
  mainLoop()
}

document.addEventListener('DOMContentLoaded', start)

function update() {}

function draw() {
  // ctx.fillStyle = 'olive'
  // ctx.fillRect(0, 0, canvas.width, canvas.height)

  //   degrees/2 = 30/2 = 15
  // SOH - sin15 = opposite/hypotenuse
  // sin15 = halfofSquareside/circleradius
  // squareside = 2* halfofSquareside
  let circleRadius = 50
  let squareSide = 2 * Math.sin(degrees / 2) * circleRadius

  let degreesUpdate
  for (let i = 0; i < 12; i++) {
    ctx.rotate(degrees)

    ctx.save()
    ctx.translate(circleRadius, 0)
    ctx.rotate(-Math.PI / 4)
    ctx.strokeRect(0, 0, squareSide, squareSide)
    ctx.restore()
  }
}

function mainLoop() {
  update()
  draw()
  window.setTimeout(mainLoop, 1000 / 60)
}
