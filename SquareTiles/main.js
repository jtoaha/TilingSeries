/**
 * @author: Jamila Toaha
 * @date: 8/20/20
 * @Title: Tiling Series: Squares
 * Created an interactive art series with square tiles.
 * Has 3 modes.
 * Pop-ups Mode: Tiles are set to randomly appear, yet falls into an ordered pattern
 * Kaleidoscope Mode: Tiles' smoothly transitions between color to color continuously
 * Stationary: Tiles are are not animated
 * Future Goal: Add adjustable parameter fields to HTML so user can test it themselves
 */

//Canvas elements
let canvas = undefined
let ctx = undefined
let theme = 'white' //Themes: Light and Dark

//Properties
var strokeWidth = 5
var hw = 100 //Tile size
let alpha = 0.25 //Dark Mode: .6, Light Mode: .25
let alphaRate = alpha / 50
let r, g, b

let popArray
let pushArray
let frameRate = 30

//State
let flag //added to make resetting easier. To break out of recursive main loop
let state = 'pop-ups' //Modes: 'pop-ups', 'kaleid', 'stationary'

//For kaleidoscope
let gradientRate = 15

function start() {
  canvas = document.getElementById('square-canvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.lineWidth = strokeWidth

  //Store tiles
  popArray = []
  pushArray = []

  //Sets up and retrieves location points for tiles, as well as random colors for tiles and stores in a sorted array
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

      if (state !== 'kaleid')
        popArray.push({ i: i, j: j, r: r, g: g, b: b, alpha: 0 })
      else {
        nextR = Math.floor(Math.random() * 256)
        nextG = Math.floor(Math.random() * 256)
        nextB = Math.floor(Math.random() * 256)

        popArray.push({
          i: i,
          j: j,
          r: r,
          g: g,
          b: b,
          alpha: 0,
          nextR: nextR,
          nextG: nextG,
          nextB: nextB,
        })
      }
    }
  }
  //If Pop-Ups Mode, randomize array:
  if (state === 'pop-ups') shuffleArray(popArray)
  if (state === 'kaleid') frameRate = 15
  mainLoop()
}

document.addEventListener('DOMContentLoaded', start)

function update() {}

function draw() {
  ctx.fillStyle = theme
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  if (state === 'pop-ups') {
    popups()
  }

  if (state === 'kaleid') kaleid()

  if (state === 'stationary') {
    for (let square of popArray) {
      if (square.alpha <= 1) square.alpha += .1
      ctx.fillStyle = `rgba(${square.r},${square.g},${square.b},${square.alpha})`
      ctx.strokeRect(square.i, square.j, hw, hw)
      ctx.fillRect(square.i, square.j, hw, hw)
    }
  }
}

//Pop-ups Mode: Tiles are set to randomly appear, yet falls into an orderly pattern
function popups() {
  //This goes through the pushArray to display whatever squares have been added. It incrementally increases alpha value so it enters canvas by fading in
  for (let square of pushArray) {
    //There are moments square becomes
    if (square.alpha <= alpha) square.alpha += alphaRate

    ctx.fillStyle = `rgba(${square.r},${square.g},${square.b},${square.alpha})`
    ctx.strokeStyle = `rgba(0, 0, 0,${square.alpha * 5})`
    ctx.strokeRect(square.i, square.j, hw, hw)
    ctx.fillRect(square.i, square.j, hw, hw)
  }

  //Kind of like the effect this alpha bug creates, so will leave here, otherwise, can be fixed
  let currentSquare
  //Adds anywhere between 1 and 2 tiles at a time according to the frame rate
  let pops = Math.floor(Math.random() * 3)
  if (popArray.length) {
    while (pops > 0 && popArray.length) {
      if (frameRate-- === 0) currentSquare = popArray.pop()
      else continue
      //Push new Square into the pushArray
      pushArray.push(currentSquare)
      //Cycle through the pushArray to display the squares fading in
      frameRate = 30
      pops--
    }
  }
}

function kaleid() {
  //For kaleidoscope colors display
  //Doesn't sync up to each square
  for (let square of popArray) {
    if (
      Math.round(square.r) === square.nextR &&
      Math.round(square.g) === square.nextG &&
      Math.round(square.b) === square.nextB
    ) {
      square.nextR = Math.floor(Math.random() * 256)
      square.nextG = Math.floor(Math.random() * 256)
      square.nextB = Math.floor(Math.random() * 256)
      // square.increment = (square.nextR-square.r)/gradientRate
    }

    ctx.fillStyle = `rgba(${square.r},${square.g},${square.b},${0.5})`
    ctx.strokeStyle = `rgba(0, 0, 0,${square.alpha * 5})`
    ctx.strokeRect(square.i, square.j, hw, hw)
    ctx.fillRect(square.i, square.j, hw, hw)
    //If current values matches up to next values, it's time to have a new set of next values

    square.r += (square.nextR - square.r) / gradientRate
    square.g += (square.nextG - square.g) / gradientRate
    square.b += (square.nextB - square.b) / gradientRate
  }
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

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

//Add Event Handlers to Radio buttons
$(document).ready(function () {
  $('input[type=radio]').click(function () {
    if (this.name === 'mode') {
      state = this.value
      flag = 'reset'
    }

    if (this.name === 'theme') {
      if (this.value === 'light') {
        theme = 'white'
        alpha = 0.25
      }
      if (this.value === 'dark') {
        console.log(this.value)
        theme = 'black'
        alpha = 0.6
      }
    }
  })
})
