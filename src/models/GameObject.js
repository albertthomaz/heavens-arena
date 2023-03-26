import Sprite from '../components/Sprite.js'

export default class GameObject {
  constructor(config) {
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction || 'down'
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src,
      currentAnimation: config.starterAnimation
    })
  }

  mount(map) {
    map.addWall(this.x, this.y)
  }

  update() {}
}
