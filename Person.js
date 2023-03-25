import GameObject from './GameObject.js'
import { UTILS } from './utils.js'

export default class Person extends GameObject {
  constructor(config) {
    super(config)
    this.isPlayerControlled = config.isPlayerControlled || false
    this.movingProgressRemaining = 0
    this.hasStarterAnimation = config.starterAnimation

    this.directionUpdate = {
      up: ['y', -1],
      down: ['y', 1],
      left: ['x', -1],
      right: ['x', 1]
    }
  }

  update(state) {
    if (this.isPlayerControlled) {
      this.updatePosition()
      this.updateSprite(state)

      if (this.movingProgressRemaining === 0 && state.arrow) {
        this.direction = state.arrow
        if (!state.map.isSpaceTaken(this.x, this.y, this.direction)) {
          state.map.updateWall(this.x, this.y, this.direction)
          this.movingProgressRemaining = UTILS.FLOOR_GRID_SIZE
        }
      }
    }
  }

  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction]
      this[property] += change
      this.movingProgressRemaining -= 1
    }
  }

  updateSprite(state) {
    if (
      this.movingProgressRemaining === 0 &&
      !this.hasStarterAnimation &&
      !state.arrow
    ) {
      this.sprite.setAnimation(`idle-${this.direction}`)
    } else if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation(`walk-${this.direction}`)
    }
  }
}
