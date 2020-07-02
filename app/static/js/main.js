$(document).ready( () => {
  animTests()
  elementLoader()
})

let elementLoader = () => {
  $(document).on('click', '.bar.topNav > button', function () {
    updateActiveTabTo(this)
    loadNewDash(this.innerHTML)
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

let loadNewDash = dashToLoad => loadDashHTML("/" + dashToLoad)

let loadDashHTML = fromRoute => {
  fetch(fromRoute)
    .then( response => response.text() )
      .then( (data) => {
        data = data.trim()
        $("#topGrid").append(data)
      })

}

let animDashLoad = () => {

  //gsap.to('#topGrid:')
}

let animTests = () => {
  //gsap.from('.bar.topNav', {duration: 1, y: '-100%', ease: 'sine'})
  //gsap.from('#testPanel', {duration: 1, delay: 1, x: '-100%', opacity:0, ease: 'sine'})
  //gsap.from('#anotherTestPanel', {duration: 1, delay: 1, x: '-100%', opacity:0, ease: 'sine'})
   //const tl = gsap.timeline({defaults: { duration: 1 }});
  //tl
  //  .from('#testPanel', {delay: 1, x: '-100%', opacity:0, ease: 'sine'})
  //  .from('#anotherTestPanel', {delay: 1, x: '-100%', opacity:0, ease: 'sine'})
  //return tl
}
