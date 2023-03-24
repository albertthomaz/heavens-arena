import GameObject from './GameObject.js'
import Person from './Person.js'
import { UTILS } from './utils.js'

export default class OverworldMap {
  constructor(config) {
    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerSrc

    //this.upperImage = new Image()
    //this.upperImage.src = config.upperSrc

    this.gameObjects = config.gameObjects
  }

  drawLowerImage(ctx) {
    ctx.drawImage(this.lowerImage, 0, 0)
  }

  drawUpperImage(ctx) {
    ctx.drawImage(this.upperImage, 0, 0)
  }
}

window.OverworldMaps = {
  FirstRoom: {
    lowerSrc: '/images/maps/floor_ok.png',
    //upperSrc: '',
    gameObjects: {
      slime: new Person({
        x: UTILS.withGrid(5),
        y: UTILS.withGrid(6),
        src: '/images/characters/people/slime3.png'
      }),
      person: new GameObject({
        x: UTILS.withGrid(3),
        y: UTILS.withGrid(4),
        src: '/images/characters/people/erio.png'
      })
    }
  }
}
