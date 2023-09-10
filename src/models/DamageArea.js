import GameObject from './GameObject.js'
import LivingThing from './LivingThing.js'

export default class DamageArea extends GameObject {
  constructor(config) {
    super(config)
    this.id = config.id
    this.owner = config.owner //LivingThing
    this.direction = config.direction
  }

  update(state) {
    const target = Object.values(state.map.gameObjects).filter((object) => {
      return (
        object instanceof LivingThing &&
        object != this.owner &&
        object.x === this.x &&
        object.y === this.y
      )
    })[0]

    if (target) {
      target.updatePosition(state.map, this.direction)
      target.receiveDamage()
    }

    //end of all animation frames
    if (
      this.sprite.currentAnimationFrame == 3 &&
      this.sprite.animationFrameProgress == 0
    ) {
      delete state.map.gameObjects[this.id]
    }
  }
}
