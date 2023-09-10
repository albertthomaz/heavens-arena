import Overworld from './components/Overworld.js'
;(function () {
  const overworld = new Overworld({
    element: document.querySelector('.game-container')
  })
  overworld.init()
})()
