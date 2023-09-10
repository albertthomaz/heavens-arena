import Sprite from '../components/Sprite.js'

export default class GameObject {
  constructor(config) {
    if (new.target === GameObject) {
      throw new TypeError('Cannot construct GameObject instances directly')
    }
    this.x = config.x || 0
    this.y = config.y || 0
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src,
      currentAnimation: config.starterAnimation,
      animationFrameLimit: config.animationFrameLimit,
      useShadow: config.useShadow
    })
  }

  mount(map) {
    map.addWall(this.x, this.y)
  }

  update() {
    throw new Error("Method 'update()' must be implemented.")
  }
}
