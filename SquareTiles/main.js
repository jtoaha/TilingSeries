let canvas = undefined
let ctx = undefined
var strokeWidth = 5
var hw = 100
let r, g, b
let alpha = .25
let alphaRate = alpha/50
r = Math.floor(Math.random() * 256)
g = Math.floor(Math.random() * 256)
b = Math.floor(Math.random() * 256)
let popArray = []
let pushArray = []
let frameRate = 20

//for kaleidoscope
let gradientRate = 20;

function start() {
  canvas = document.getElementById('square-canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.lineWidth = strokeWidth
  // ctx.fillStyle = 'black'
  // ctx.fillRect(0, 0, canvas.width, canvas.height )
  //ctx.strokeRect(0, 0, hw, hw)

  let rowTracker = 1
  let iStart
  for (let j = (-3 / 4) * hw; j < canvas.height; j += (3 / 4) * hw) {
    if (rowTracker % 2 === 0) iStart = 0
    else iStart = (-3 / 4) * hw
    rowTracker++
    for (let i = iStart; i < canvas.width; i += (5 / 4) * hw) {
      r = Math.floor(Math.random() * 256)
      g = Math.floor(Math.random() * 256)
      b = Math.floor(Math.random() * 256)


    nextR = Math.floor(Math.random() * 256)
    nextG = Math.floor(Math.random() * 256)
    nextB = Math.floor(Math.random() * 256)

      popArray.push({ i: i, j: j, r: r, g: g, b: b, alpha: 0, nextR:nextR, nextG:nextG, nextB:nextB, increment: (nextR-r)/gradientRate*-1})
      // ctx.fillStyle = `rgba(${r},${g},${b}, .25)` //.6 for dark mode //.25 for light mode
    }
  }

  //If Pop Mode:
  //shuffleArray(popArray)
  mainLoop()
}

document.addEventListener('DOMContentLoaded', start)

function update() {}

function draw() {
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height )
  //For kaleidoscope colors display
//Doesn't sync up to each square
  for (let square of popArray) {
    console.log(square.r, square.nextR, "TESTING")
    if(Math.round(square.r) === square.nextR && Math.round(square.g) === square.nextG && Math.round(square.b) === square.nextB) {
      square.nextR = Math.floor(Math.random() * 256)
      square.nextG = Math.floor(Math.random() * 256)
      square.nextB = Math.floor(Math.random() * 256)
      // square.increment = (square.nextR-square.r)/gradientRate
    }

    ctx.fillStyle = `rgba(${square.r},${square.g},${square.b},${.5})`
    ctx.strokeStyle = `rgba(0, 0, 0,${square.alpha*5})`
    ctx.strokeRect(square.i, square.j, hw, hw)
    ctx.fillRect(square.i, square.j, hw, hw)
        //If current values matches up to next values, it's time to have a new set of next values


          square.r += (square.nextR-square.r)/gradientRate
          square.g += (square.nextG-square.g)/gradientRate
          square.b += (square.nextB-square.b)/gradientRate




  }


  // for (let square of pushArray) {
  //   if (square.alpha <= alpha) square.alpha += alphaRate
  //   ctx.fillStyle = `rgba(${square.r},${square.g},${square.b},${square.alpha})`
  //   ctx.strokeStyle = `rgba(0, 0, 0,${square.alpha*5})`
  //   ctx.strokeRect(square.i, square.j, hw, hw)
  //   ctx.fillRect(square.i, square.j, hw, hw)
  // }


  // let currentSquare
  // let pops = Math.floor(Math.random()*3);
  // if (popArray.length) {
  //   while(pops > 0){
  //    if(frameRate-- === 0)currentSquare = popArray.pop()
  //    else continue
  //   //Push new Square into the pushArray
  //   pushArray.push(currentSquare)
  //     //Cycle through the pushArray to display the squares fading in


  //   frameRate = 30;
  //     pops--
  // }
  // }

}

function mainLoop() {
  update()
  draw()
  window.setTimeout(mainLoop, 1000 / 60)
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
