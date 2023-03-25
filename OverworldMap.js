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
    lowerSrc: '/images/maps/desert.png',
    //upperSrc: '',
    gameObjects: {
      slime: new Person({
        x: UTILS.withGrid(5),
        y: UTILS.withGrid(6),
        src: '/images/characters/monsters/slime_full.png',
        isPlayerControlled: true,
        starterAnimation: 'walk-down'
      }),
      person: new Person({
        x: UTILS.withGrid(6),
        y: UTILS.withGrid(6),
        src: '/images/characters/people/erio.png',
        isPlayerControlled: true
      }),
      cactus: new GameObject({
        x: UTILS.withGrid(17),
        y: UTILS.withGrid(4),
        src: '/images/objects/cactus.png'
      })
    }
  }
}
