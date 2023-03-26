export const UTILS = {
  GAME_OBJECT_GRID_SIZE: 32,
  FLOOR_GRID_SIZE: 16,

  withGrid(n) {
    return n * 16
  },

  asGridCoords(x, y) {
    return `${x * this.FLOOR_GRID_SIZE},${y * this.FLOOR_GRID_SIZE}`
  },

  nextPosition(initialX, initialY, direction) {
    let x = initialX
    let y = initialY
    if (direction === 'left') {
      x -= this.FLOOR_GRID_SIZE
    } else if (direction === 'right') {
      x += this.FLOOR_GRID_SIZE
    } else if (direction === 'up') {
      y -= this.FLOOR_GRID_SIZE
    } else if (direction === 'down') {
      y += this.FLOOR_GRID_SIZE
    }
    return { x, y }
  },

  isOffscreen(x, y) {
    return (
      x < 0 ||
      y < 0 ||
      x > 21 * this.FLOOR_GRID_SIZE ||
      y > 13 * this.FLOOR_GRID_SIZE
    )
  }
}
