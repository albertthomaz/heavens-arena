import DirectionInput from './DirectionInput.js'
import OverworldMap from './OverworldMap.js'

export default class Overworld {
  constructor(config) {
    this.element = config.element
    this.canvas = this.element.querySelector('.game-canvas')
    this.ctx = this.canvas.getContext('2d')
    this.map = null
  }

  startGameLoop() {
    const step = () => {
      // Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      // Draw lower layer
      this.map.drawLowerImage(this.ctx)

      // Draw game objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          movementKeyPressed: this.directionInput.direction,
          map: this.map
        })
        object.sprite.draw(this.ctx)
      })

      // Draw upper layer
      //this.map.drawUpperImage(this.ctx)

      requestAnimationFrame(() => {
        step()
      })
    }
    step()
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.FirstRoom)
    this.map.mountObjects()

    this.directionInput = new DirectionInput()
    this.directionInput.init()

    this.startGameLoop()
  }
}
