import { UTILS } from '../utils/utils.js'

export default class Sprite {
  constructor(config) {
    // Reference the game object
    this.gameObject = config.gameObject

    // Set up the image
    this.image = new Image()
    this.image.src = config.src
    this.image.onload = () => {
      this.isLoaded = true
    }

    // Shadow
    this.useShadow = true // config.useShadow || false
    if (this.useShadow) {
      this.shadow = new Image()
      this.shadow.src = '/src/assets/images/characters/shadow.png'
      this.shadow.onload = () => {
        this.isShadowLoaded = true
      }
    }

    // Configure Animation & Initial State
    this.animations = config.animations || {
      'idle-down': [[0, 0]],
      'idle-right': [[0, 1]],
      'idle-up': [[0, 2]],
      'idle-left': [[0, 3]],
      'walk-down': [
        [1, 0],
        [2, 0],
        [3, 0],
        [0, 0]
      ],
      'walk-right': [
        [1, 1],
        [2, 1],
        [3, 1],
        [0, 1]
      ],
      'walk-up': [
        [1, 2],
        [2, 2],
        [3, 2],
        [0, 2]
      ],
      'walk-left': [
        [1, 3],
        [2, 3],
        [3, 3],
        [0, 3]
      ]
    }
    this.currentAnimation = config.currentAnimation || 'idle-down'
    this.currentAnimationFrame = 0

    // time until next animation frame
    this.animationFrameLimit = config.animationFrameLimit || 32
    this.animationFrameProgress = this.animationFrameLimit
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key
      this.currentAnimationFrame = 0
      this.animationFrameProgress = this.animationFrameLimit
    }
  }

  updateAnimationProgress() {
    // downtick frame progress
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1
      return
    }
    // reset the counter
    this.animationFrameProgress = this.animationFrameLimit
    // set next animation frame
    this.currentAnimationFrame += 1
    if (this.frame === undefined) {
      this.currentAnimationFrame = 0
    }
  }

  draw(ctx) {
    const x = this.gameObject.x - 8
    const y = this.gameObject.y - 18

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)

    const [frameX, frameY] = this.frame

    this.isLoaded &&
      ctx.drawImage(
        this.image,
        frameX * UTILS.GAME_OBJECT_GRID_SIZE,
        frameY * UTILS.GAME_OBJECT_GRID_SIZE,
        UTILS.GAME_OBJECT_GRID_SIZE,
        UTILS.GAME_OBJECT_GRID_SIZE,
        x,
        y,
        UTILS.GAME_OBJECT_GRID_SIZE,
        UTILS.GAME_OBJECT_GRID_SIZE
      )

    this.updateAnimationProgress()
  }
}
