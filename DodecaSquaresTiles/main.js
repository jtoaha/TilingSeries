var canvas = undefined
var ctx = undefined
let numSquares = 12
let degrees = (2 * Math.PI) / numSquares

let colorTheme = ['#ffcc00', '#ff9900', '#ff6600', '#bf0603', '#cc3399', '#990066', '#5a189a', '#3399cc', '#006699', '#ccee66', '#99cc33', '#669900']



let theme = '#fffff' // for Light or Dark mode
let colorAnimationCount = 0;
let frameCount = 0;

let numRings=5;
let ringsAnimationCount = 0;

function start() {
  canvas = document.getElementById('dodeca-rings')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.globalAlpha = 0.1;//.01 for color animation
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
  ctx.save()
  let circleRadius = 30
  let addHeight = 0

  for(let i= 0; i <= ringsAnimationCount; i++) {
    ctx.rotate(degrees/2)
    addHeight+=createRing (circleRadius+addHeight)
  }


  ctx.restore()

  if(frameCount++ === 10){
    colorAnimationCount++
    frameCount = 0
  }
  if(frameCount++ ===30){
    if(ringsAnimationCount < numRings) ringsAnimationCount++
    frameCount = 0;
  }
}

function mainLoop() {
  update()
  draw()
  window.setTimeout(mainLoop, 1000 / 60)
}

//Creates a ring from 12 squares
// returns height
function createRing(circleRadius){
  let squareSide = 2 * Math.sin(degrees / 2) * circleRadius

  let degreesUpdate
  ctx.globalAlpha = 0.05;
  for (let i = 0; i < 12; i++) {
    ctx.rotate(degrees)

    ctx.save()
    ctx.translate(circleRadius, 0)
    ctx.rotate(-Math.PI / 4)
    //Adding conditional so that only certain colors can be animation
    // if(i <= colorAnimationCount) {
      ctx.fillStyle = colorTheme[i]
      ctx.fillRect(0, 0, squareSide, squareSide)
      ctx.strokeRect(0, 0, squareSide, squareSide)
    //}


    ctx.restore()
  }

  //To find radius of next corresponding ring need to find height that is added by the squares - return length of half a diagonal of the square
  // return squareSide*Math.sqrt(2)/2
  return Math.sin(Math.PI/3)*squareSide
}


