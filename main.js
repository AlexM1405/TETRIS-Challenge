import './style.css'
import { Block_Size, Pieces, Board_Height, Board_Widht, Event_Movements } from './Const'

const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")
const $score = document.querySelector("span")
const $section = document.querySelector('section')

let score = 0

canvas.width = Block_Size * Board_Widht
canvas.height = Block_Size * Board_Height

context.scale(Block_Size, Block_Size)




const board = [
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    0, 0
  ],
  [
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    0, 0
  ]
]





  const piece = {
    position: { x: 5, y: 5 },
    shape: [
      [1, 1],
      [1, 1]
    ]
  }



let dropCounter = 0
let lastTime = 0

function update (time = 0) {
  const deltaTime = time - lastTime
  lastTime = time

  dropCounter += deltaTime

  if (dropCounter > 1000) {
    piece.position.y++
    dropCounter = 0
  }

  if (checkCollision()) {
    piece.position.y--
    solidifyPiece()
    removeRows()
  }

  draw()
  window.requestAnimationFrame(update)

}

function draw () {
  context.fillStyle = "#000"
  context.fillRect(0, 0, canvas.width, canvas.height)

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
      context.fillStyle = "red"
      context.fillRect(x, y, 1, 1)
      }
    })
  })

  piece.shape.forEach((row, y)=> {
    row.forEach((value, x) => {
      if (value) {
      context.fillStyle = "green"
      context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1)
      }
    })
})
  $score.innerText = score
}

document.addEventListener("keydown", event => {
  if (event.key === Event_Movements.LEFT)  {
    piece.position.x--
    if(checkCollision ()) {
      piece.position.x++
    }
  }


  if (event.key === Event_Movements.RIGHT) {
  piece.position.x++
  if(checkCollision ()) {
    piece.position.x--
   }
  }

  if (event.key === Event_Movements.DOWN) {
  piece.position.y++
  if(checkCollision ()) {
    piece.position.y--
    solidifyPiece()
    removeRows()
   }
  }

  if (event.key === Event_Movements.UP) {
    const rotated = []

    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = []

      for (let j = piece.shape.length -1; j >= 0; j--) {
        row.push(piece.shape[j][i])
      }
      rotated.push(row)
    }
    const previousShape = piece.shape
    piece.shape = rotated
    if (checkCollision()) {
      piece.shape = previousShape
    }
  }
})

function checkCollision () {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value === 1 &&
        board[ y + piece.position.y][x + piece.position.x] !== 0
      )
    })
  })
}

function solidifyPiece () {
  piece.shape.forEach((row, y)=> {
    row.forEach((value, x) => {
      if (value === 1) {
      board[y + piece.position.y] [x + piece.position.x] = 1
      }
      })
  })
  resetPiece()
}

function resetPiece () {
  piece.position.x = Math.floor(Board_Widht / 2 - 2)
  piece.position.y = 0

  piece.shape = Pieces[Math.floor(Math.random() * Pieces.length)]

  if (checkCollision()) {
    window.alert("GAME OVER")
    board.forEach((row => row.fill(0)))
    score = 0
  }
}

function removeRows () {
  const rowsToRemove = []

  board.forEach((row, y) => {
    if (row.every(value => value === 1)) {
      rowsToRemove.push(y)
    }
  })

  rowsToRemove.forEach(y => {
    board.splice(y, 1)
    const NewRow = Array(Board_Widht).fill(0)
    board.unshift(NewRow)
    score += 10
  })
}

$section.addEventListener('click', () => {
  update()

  $section.remove()
})



