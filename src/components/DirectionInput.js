export default class DirectionInput {
  constructor() {
    this.heldDirections = []
    this.map = {
      ArrowUp: 'up',
      KeyW: 'up',
      ArrowDown: 'down',
      KeyS: 'down',
      ArrowLeft: 'left',
      KeyA: 'left',
      ArrowRight: 'right',
      KeyD: 'right'
    }
    this.heldAttack = false
  }

  get direction() {
    return this.heldDirections[0]
  }

  get attack() {
    return this.heldAttack
  }

  init() {
    document.addEventListener('keydown', (e) => {
      const dir = this.map[e.code]
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir)
      } else if (e.code === 'KeyE') {
        this.heldAttack = true
      }
    })
    document.addEventListener('keyup', (e) => {
      const dir = this.map[e.code]
      const index = this.heldDirections.indexOf(dir)
      if (index > -1) {
        this.heldDirections.splice(index, this.heldDirections.length - index)
      } else if (e.code == 'KeyE') {
        this.heldAttack = false
      }
    })
  }
}
