import GameObject from './GameObject.js'

export default class Overworld {
  constructor(config) {
    this.element = config.element
    this.canvas = this.element.querySelector('.game-canvas')
    this.ctx = this.canvas.getContext('2d')
  }

  init() {
    const floor = new Image()
    floor.onload = () => {
      this.ctx.drawImage(floor, 0, 0)
    }
    floor.src = '/images/maps/floor_ok.png'

    // Place some Game Objects!
    const slime = new GameObject({
      x: 5,
      y: 6,
      src: '/images/characters/people/slime3.png'
    })

    const person = new GameObject({
      x: 3,
      y: 4,
      src: '/images/characters/people/erio.png'
    })

    setTimeout(() => {
      slime.sprite.draw(this.ctx)
      person.sprite.draw(this.ctx)
    }, 200)
  }
}
