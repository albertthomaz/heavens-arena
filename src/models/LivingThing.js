import { UTILS } from '../utils/utils.js'
import GameObject from './GameObject.js'

export default class LivingThing extends GameObject {
  constructor(config) {
    if (new.target === LivingThing) {
      throw new TypeError('Cannot construct LivingThing instances directly')
    }
    super(config)
    this.direction = config.direction || 'down'
    this.movingProgressRemaining = 0
    this.attackProgressRemaining = 0
    this.hasStarterAnimation = config.starterAnimation

    this.directionUpdate = {
      up: ['y', -1],
      down: ['y', 1],
      left: ['x', -1],
      right: ['x', 1]
    }
  }

  update() {
    throw new Error("Method 'update()' must be implemented.")
  }

  updatePosition(map, newDirection) {
    // set direction
    if (newDirection && this.movingProgressRemaining === 0) {
      this.direction = newDirection
      // start moving
      if (!map.isSpaceTaken(this.x, this.y, this.direction)) {
        map.updateWall(this.x, this.y, this.direction)
        this.movingProgressRemaining = UTILS.FLOOR_GRID_SIZE
      }
    }
    // keep moving
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction]
      this[property] += change
      this.movingProgressRemaining -= 1
    }

    // set sprite type
    if (this.attackProgressRemaining > 0) {
      this.attackProgressRemaining -= 1
      this.sprite.animationFrameLimit = 10
      this.updateAttackSprite()
    } else {
      this.sprite.animationFrameLimit = 32
      this.updateMovementSprite(newDirection)
    }
  }

  updateMovementSprite(newDirection) {
    if (
      this.movingProgressRemaining === 0 &&
      !newDirection &&
      !this.hasStarterAnimation
    ) {
      this.sprite.setAnimation(`idle-${this.direction}`)
    } else if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation(`walk-${this.direction}`)
    }
  }

  updateAttackSprite() {
    this.sprite.setAnimation(`attack-${this.direction}`)
  }

  startAttack() {
    this.attackProgressRemaining = 10
  }
}
