import GameObject from './GameObject.js'
import Person from './Person.js'
import { UTILS } from './utils.js'

export default class OverworldMap {
  constructor(config) {
    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerSrc

    this.gameObjects = config.gameObjects

    //this.upperImage = new Image()
    //this.upperImage.src = config.upperSrc

    this.walls = config.walls || {}
  }

  drawLowerImage(ctx) {
    ctx.drawImage(this.lowerImage, 0, 0)
  }

  drawUpperImage(ctx) {
    ctx.drawImage(this.upperImage, 0, 0)
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = UTILS.nextPosition(currentX, currentY, direction)
    const offscreen = UTILS.isOffscreen(x, y)
    return offscreen || this.walls[`${x},${y}`] || false
  }

  mountObjects() {
    Object.values(this.gameObjects).forEach((object) => {
      //Todo: determine if this object should actually mount
      object.mount(this)
    })
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true
  }
  removeWall(x, y) {
    delete this.walls[`${x},${y}`]
  }
  updateWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY)
    const { newX, newY } = UTILS.nextPosition(wasX, wasY, direction)
    this.addWall(newX, newY)
  }
}

window.OverworldMaps = {
  FirstRoom: {
    lowerSrc: '/images/maps/desert.png',
    //upperSrc: '',
    gameObjects: {
      slime: new Person({
        x: UTILS.withGrid(5),
        y: UTILS.withGrid(6),
        src: '/images/characters/monsters/slime_full.png',
        starterAnimation: 'walk-down'
      }),
      person: new Person({
        x: UTILS.withGrid(3),
        y: UTILS.withGrid(10),
        src: '/images/characters/people/erio.png',
        isPlayerControlled: true
      }),
      cactus: new GameObject({
        x: UTILS.withGrid(17),
        y: UTILS.withGrid(4),
        src: '/images/objects/cactus.png'
      })
    },
    walls: {
      [UTILS.asGridCoords(7, 6)]: true,
      [UTILS.asGridCoords(8, 3)]: true,
      [UTILS.asGridCoords(8, 4)]: true,
      [UTILS.asGridCoords(8, 5)]: true,
      [UTILS.asGridCoords(8, 6)]: true,
      [UTILS.asGridCoords(8, 7)]: true,
      [UTILS.asGridCoords(8, 8)]: true,
      [UTILS.asGridCoords(9, 4)]: true,
      [UTILS.asGridCoords(9, 5)]: true,
      [UTILS.asGridCoords(9, 6)]: true,
      [UTILS.asGridCoords(9, 7)]: true
    }
  }
}
