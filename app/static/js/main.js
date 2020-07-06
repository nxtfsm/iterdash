$(document).ready( () => {
  elementLoader()
})

let elementLoader = () => {
  var activeIdx = setFirst()

  $(document).on('mouseenter', '.bar.topNav > button', function() {
    if (this.classList.contains('active')) {
      return
    } else {
      topNavBtnAnim(this, 'enter')
    }
  })

  $(document).on('mouseout', '.bar.topNav > button', function() {
    if (this.classList.contains('active')) {
      return
    } else {
      topNavBtnAnim(this, 'exit')
    }
  })

  $(document).on('click', '.bar.topNav > button', function () {
    if (this.classList.contains('active')) {
      return
    } else {
      topNavBtnAnim(document.querySelector('button.active'), 'exit')
      topNavBtnAnim(this, 'select')

      var nextIdx = dashes.indexOf(this.innerHTML)
      var direction = directionFromIdxCompare(activeIdx, nextIdx)
      activeIdx = nextIdx

      updateActiveTabTo(this)
      loadNewDash(this.innerHTML, direction)
      }
    })

    $(document).on('click', '.container.for-card', function() {
      console.log('click!')
      //cardSwitcher(this)
      switchDetailCard(this)
    })
  }

let switchDetailCard = toThis => {
  detailsShowing = document.querySelector('.container.for-card.showing-details')
  if (detailsShowing && (detailsShowing != toThis)) {
    cardSwitcher(detailsShowing)
  }
  cardSwitcher(toThis)
}

let cardSwitcher = outerContainer => {
  const tl = gsap.timeline({ defaults: { transformOrigin: "bottom"} })
  innerContainer = outerContainer.children[0]
  topFace = innerContainer.children[1]

  if (Array.from(topFace.classList).includes('hidden')) {
    tl.to(topFace, {y:"0%"})
    tl.to(outerContainer, {borderStyle:"outset", borderColor:"rgb(42, 58, 73)", border:"4px"}, "-=.5")

  } else {
    tl.to(outerContainer, {borderStyle:"inset", borderColor:"rgb(199, 154, 0)", border:"2px"})
    tl.to(topFace, {y:"100%"}, "-=.5")
  }

  toggleClass(topFace, 'hidden')
  toggleClass(outerContainer, 'showing-details')
}

let setFirst = () => {
  let firstButton = document.querySelector('.bar.topNav :first-child')
  toggleClass(firstButton, 'active')
  topNavBtnAnim(firstButton, 'select')
  return dashes.indexOf(firstButton.innerHTML)
}

let topNavBtnAnim = (button, call) => {
  if (call == 'enter') {
    gsap.to(button, {duration: .3, transformOrigin: "bottom center", backgroundColor: "#a4a4a4", color: "#2a3a49", ease: 'power1'})
  } else if (call == 'exit') {
    gsap.to(button, {duration: .3, transformOrigin: "bottom center", backgroundColor: "transparent", color: "#e2f5ff", ease: 'power1'})
  } else if (call == 'select') {
    gsap.to(button, {duration: .3, transformOrigin: "bottom center", backgroundColor: "#b1c2d5", color: "#011421", ease: 'power1'})
  }
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
    gsap.from(toDash, {duration: .5, x:'-100%', scale: '.7', ease: 'power1'})
    gsap.to(toRemove, {duration: .5, x: '100%', scale: '.7', ease: 'power1'})
  } else {
    gsap.from(toDash, {duration: .5, x: '100%', scale: '.7', ease: 'power1' })
    gsap.to(toRemove, {duration: .5, x:'-100%', scale: '.7', ease: 'power1' })
  }

  toggleClass(toRemove, 'hidden')

}
