function toggleGrid(btn) {
  const grid = document.querySelector('.grid-overlay')

  if (btn.classList.contains('on')) {
    grid.innerHTML = null
  } else {
    for (let row = 0; row < 14; row++) {
      for (let col = 0; col < 22; col++) {
        const div = document.createElement('div')
        div.innerHTML = `(${col},${row})`
        grid.appendChild(div)
      }
    }
  }
  btn.classList.toggle('on')
  btn.classList.toggle('off')
}
