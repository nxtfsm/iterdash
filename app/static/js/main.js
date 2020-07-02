$(document).ready( () => {
  elementLoader()
})

let elementLoader = () => {
  var firstButton = document.querySelector('.bar.topNav :first-child')
  console.log(firstButton)

  toggleClass(firstButton, 'active')
  $(document).on('click', '.bar.topNav > button', function () {
    if (this.classList.contains('active')) {
      return
    } else {
      updateActiveTabTo(this)
      loadNewDash(this.innerHTML)
      }
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

let flushHiddenOfType = classType => $(`${classType}.hidden`).remove()

let loadNewDash = dashToLoad => loadHTMLinto("/" + dashToLoad, "#innerDashC")

let loadHTMLinto = (fromRoute, intoContainerID) => {
  if (document.querySelector(intoContainerID).children.length >= 2) {
    flushHiddenOfType('.dash-panel')
    }

  fetch(fromRoute)
    .then( response => response.text() )
      .then( (data) => {
        data = data.trim()
        $(intoContainerID).prepend(data)
      })
        .then(animDashLoad(intoContainerID))
    }

let animDashLoad = (intoContainer) => () => {
  let animContainer = document.querySelector(intoContainer)

  let toRemove = animContainer.children.item(1)
  let toDash = animContainer.children.item(0)

  //gsap.from(toDash, {duration: 1, rotateY: '180deg', opacity:0, ease: 'sine'})
  //gsap.to(toRemove, {duration: 1, rotateY: '-180deg', opacity:0, ease: 'sine'})

  gsap.from(toDash, {duration: 1, x:'-100%', ease: 'power2'})
  gsap.to(toRemove, {duration: 1, x: '100%', ease: 'power2'})

  toggleClass(toRemove, 'hidden')
}
