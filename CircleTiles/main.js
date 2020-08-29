var canvas = undefined
var canvasContext = undefined

let numCircles = 10
let degrees = (2 * Math.PI) / numCircles
let circleRadius = 100

let animX = 0

let theme = '#ffffff'
let colorTheme = []

for (let i = 0; i < numCircles; i++) {
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
  ctx.fillStyle = theme
  ctx.fillRect(
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width * 2,
    canvas.height * 2
  )
  for (let i = 0; i < numCircles; i++) {
    ctx.fillStyle = colorTheme[i]
    ctx.save()
    ctx.beginPath()
    ctx.translate(easeInQuad(animX), 0)
    ctx.ellipse(0, 0, circleRadius, circleRadius, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fill()
    ctx.restore()
    ctx.rotate(degrees)
  }
  animX += 0.1
}

function mainLoop() {
  update()
  draw()
  window.setTimeout(mainLoop, 1000 / 60)
}

function easeInSine(x) {
  return 1 - Math.cos((x * Math.PI) / 2)
}
function easeInQuad(x) {
  //return 1 - Math.pow(1 - x, 3);
  return x * x //ease in
}

//Add Event Handlers to input items
$(document).ready(function () {
  $('input[type=range]').click(function () {
    //User can adjust number of rings
    if (this.name === 'numCircles') {
      console.log(this.value, 'numCircles') // future task: append to html
      numCircles = this.value
      //flag = 'reset'
    }})
  //User can choose dark theme or light theme
  $('input[type=radio]').click(function () {
    if (this.name === 'theme') {
      if (this.value === 'light') {
        theme = 'white'
        flag = 'reset'
      }
      if (this.value === 'dark') {
        console.log(this.value)
        theme = 'black'
        flag = 'reset'
      }
    }
  })


})
