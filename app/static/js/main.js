$(document).ready( () => {
  animTests()
  elementLoader()

})

let elementLoader = () => {
  $(document).on('click', '.bar.topNav > button', function () {
    document.querySelector('#testText').innerHTML = this.innerHTML
    updateActiveTabTo(this)

  })
}

let updateActiveTabTo = toThis => { clearActiveClass(), toggleClass(toThis, 'active') }

let clearActiveClass = () => {
  // Removes 'active' class tag from *all* elements where currently set
  Array.from(document.querySelectorAll('.active')).forEach((currentActive) => {
    toggleClass(currentActive, 'active')

  });
}

let toggleClass = (element, className) => element.classList.toggle(className)

let animTests = () =>
  //gsap.from('.bar.topNav', {duration: 1, y: '-100%', ease: 'sine'})
  gsap.from('.dash-panel.test', {duration: 1, delay: 1, x: '-100%', y:'100%', opacity:0, ease: 'sine'})
