//Canvas Properties
var canvas = undefined
var ctx = undefined
let flag = ''

//Default Settings for DodecaSquare Rings
let numSquares = 12
let degrees = (2 * Math.PI) / numSquares
let theme = '#ffffff' // Light or Dark Mode

let border = false;
let colorTheme = [
  '#ffcc00',
  '#ff9900',
  '#ff6600',
  '#bf0603',
  '#cc3399',
  '#990066',
  '#5a189a',
  '#3399cc',
  '#006699',
  '#ccee66',
  '#99cc33',
  '#669900',
]

let colorAnimationCount
let frameCount

let numRings
let ringsAnimationCount
let circleRadius

//Mode
let mode = 'animated'

function start() {
  canvas = document.getElementById('dodeca-rings')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.fillStyle = theme
  ctx.fillRect(-canvas.width/2, -canvas.height/2, canvas.width*2, canvas.height*2)

  ctx.globalAlpha = 0.1 //.01 for color animation
  if(mode === 'animated') colorAnimationCount = 0
  else colorAnimationCount= colorTheme.length
  if(mode === 'animated')   ringsAnimationCount = 0
  else ringsAnimationCount= numRings

  frameCount = 0
  circleRadius = circleRadius || 30
  console.log("Circle Radius (in pixels):",circleRadius )
  numRings = numRings || 6
    console.log( "Number of Rings:", numRings)


  mainLoop()
}

document.addEventListener('DOMContentLoaded', start)

function update() {}

function draw() {

  ctx.save()
  let addHeight = 0

  for (let i = 0; i < ringsAnimationCount; i++) {
    ctx.rotate(degrees / 2)
    addHeight += createRing(circleRadius + addHeight)
  }

  ctx.restore()

  if (frameCount++ === 10) {
    colorAnimationCount++
    frameCount = 0
  }
  if (frameCount++ === 30) {
    if (ringsAnimationCount < numRings) ringsAnimationCount++
    frameCount = 0
  }
  if (
    colorAnimationCount >= colorTheme.length &&
    ringsAnimationCount >= numRings
  )
    ctx.globalAlpha = 1
}

function mainLoop() {
  if (flag === 'reset') {
    flag = ''
    start()
  } else {
    update()
    draw()
    window.setTimeout(mainLoop, 1000 / 60)
  }
}

//Creates a ring from 12 squares
// returns height
function createRing(circleRadius) {
  let squareSide = 2 * Math.sin(degrees / 2) * circleRadius


  ctx.globalAlpha = 0.03
  for (let i = 0; i < 12; i++) {
    ctx.rotate(degrees)

    ctx.save()
    ctx.translate(circleRadius, 0)
    ctx.rotate(-Math.PI / 4)
    //Adding conditional so that only certain colors can be animation
    if (i <= colorAnimationCount) {
      ctx.fillStyle = colorTheme[i]
      ctx.fillRect(0, 0, squareSide, squareSide)
      if(border)ctx.strokeRect(0, 0, squareSide, squareSide)
    }

    ctx.restore()
  }

  //To find radius of next corresponding ring need to find height that is added by the squares - return length of half a diagonal of the square
  // return squareSide*Math.sqrt(2)/2
  return Math.sin(Math.PI / 3) * squareSide
}

function randomizeColors(){
  let r, g, b
  colorTheme = []
  for (let i = 0; i < 12; i++) {
    r = Math.floor(Math.random() * 256)
    g = Math.floor(Math.random() * 256)
    b = Math.floor(Math.random() * 256)
    colorTheme.push(`rgb(${r},${g},${b})`)
  }
  flag = 'reset'
}
//Add Event Handlers to input items
$(document).ready(function () {
  $('input[type=range]').click(function () {
    if (this.name === 'numRings') {
      console.log(this.value, 'numRings')// future task: append to html
      numRings = this.value
      flag = 'reset'
    }

    if(this.name === 'circleRadius') {
      console.log(this.value, 'circleRadius')// future task: append to html
      circleRadius = Number(this.value)
      flag = 'reset'
    }
  })
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
    if (this.name === 'mode') {
      if (this.value === 'animated') {
        console.log(this.value)
        mode = 'animated'
        flag = 'reset'
      }
      if (this.value === 'stationary') {
        console.log(this.value)
        mode = 'stationary'
        flag = 'reset'
      }
    }
  })

  $( "#hasBorder" ).on( "click", function(){
    console.log('yooo')
    if ($('#hasBorder').prop('checked'))
    border = true
    else
    border = false

    flag = 'reset'
  })

})
