import LivingThing from './LivingThing.js'
import { UTILS } from '../utils/utils.js'
import { astar, Graph } from '../utils/astar.js'

export default class Monster extends LivingThing {
  constructor(config) {
    super(config)
    this.directions = Object.keys(this.directionUpdate)
  }

  update(state) {
    let newDirection = null
    if (this.movingProgressRemaining === 0) {
      newDirection = this.followPlayer(state.map)

      if (UTILS.getRandomInt(1, 50) === 5)
        this.startAttack(state.map.gameObjects)
    } else {
      newDirection = this.direction
    }

    this.updatePosition(state.map, newDirection)
  }

  followPlayer(map) {
    const player = map.gameObjects.player
    const distance = UTILS.calcDistance(this.x, this.y, player.x, player.y)
    if (distance < UTILS.withGrid(2)) return

    const monsterX = Math.floor(this.x / UTILS.FLOOR_GRID_SIZE)
    const monsterY = Math.floor(this.y / UTILS.FLOOR_GRID_SIZE)
    const playerX = Math.floor(player.x / UTILS.FLOOR_GRID_SIZE)
    const playerY = Math.floor(player.y / UTILS.FLOOR_GRID_SIZE)

    let matrix = []
    for (let col = 0; col < 22; col++) {
      matrix[col] = []
      for (let row = 0; row < 14; row++) {
        const wall = map.walls[UTILS.asGridCoords(col, row)]
        if (wall && (col != playerX || row != playerY)) matrix[col][row] = 0
        else matrix[col][row] = 1
      }
    }

    const graph = new Graph(matrix)
    const start = graph.grid[monsterX][monsterY]
    const end = graph.grid[playerX][playerY]
    const result = astar.search(graph, start, end)

    //console.log('matrix :>> ', matrix)
    //console.log('mmmonster :>> ', monsterX, monsterY)
    //console.log('player :>> ', playerX, playerY)
    //console.log('result :>> ', result)

    let direction = null
    if (!result[0]) return direction
    else if (result[0].x > monsterX) direction = 'right'
    else if (result[0].x < monsterX) direction = 'left'
    else if (result[0].y > monsterY) direction = 'down'
    else if (result[0].y < monsterY) direction = 'up'

    return direction
  }
}
