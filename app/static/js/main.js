$(document).ready( () => {
  console.log(dashes)
  elementLoader()
})

let elementLoader = () => {
  var firstButton = document.querySelector('.bar.topNav :first-child')
  toggleClass(firstButton, 'active')
  var activeIdx = dashes.indexOf(firstButton.innerHTML)

  $(document).on('click', '.bar.topNav > button', function () {
    if (this.classList.contains('active')) {
      return
    } else {
      var nextIdx = dashes.indexOf(this.innerHTML)
      var direction = directionFromIdxCompare(activeIdx, nextIdx)
      activeIdx = nextIdx

      updateActiveTabTo(this)
      loadNewDash(this.innerHTML, direction)
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

let loadNewDash = (dashToLd, inDir) => loadHTMLinto(dashToLd, inDir, "#innerDashC")

let directionFromIdxCompare = (current, next) => {
    if (current < next) {
      return 'right'
    } else {
      return 'left'
    }
  }

let loadHTMLinto = (fromRoute, direction, intoContainerID) => {
  if (document.querySelector(intoContainerID).children.length >= 2) {
    flushHiddenOfType('.dash-panel')
    }

  fetch("/" + fromRoute)
    .then( response => response.text() )
      .then( (data) => {
        data = data.trim()
        $(intoContainerID).prepend(data)
      })
        .then(animDashLoad(intoContainerID, direction))
    }

let animDashLoad = (intoContainer, direction) => () => {
  let animContainer = document.querySelector(intoContainer)

  let toRemove = animContainer.children.item(1)
  let toDash = animContainer.children.item(0)

  if (direction == 'left') {
    gsap.from(toDash, { x:'-100%', scale: '.7', ease: 'power1'})
    gsap.to(toRemove, { x: '100%', scale: '.7', ease: 'power1'})
  } else {
    gsap.from(toDash, { x: '100%', scale: '.7', ease: 'power1' })
    gsap.to(toRemove, { x:'-100%', scale: '.7', ease: 'power1' })
  }

  toggleClass(toRemove, 'hidden')
}
