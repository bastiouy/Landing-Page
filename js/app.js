/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const navContainer = document.querySelectorAll('section')
const navLi = document.getElementById('navbar__list')
 

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
navContainer.forEach(el => {
  const navLiContainer = `<li class='menu__link ${el.className}' data-link=${el.id}><a href="#${el.id}">${el.dataset.nav}</li>`
  navLi.insertAdjacentHTML('beforeend', navLiContainer)
})

// Add class 'active' to section when near top of viewport
const callback = entries => {
  entries.forEach(entry => {
    const navLiContainer = document.querySelector(
      `.menu__link[data-link='${entry.target.id}']`,
    )
    const section = document.getElementById(entry.target.id)

    if (entry && entry.isIntersecting) {
      navLiContainer.classList.add('active')
      section.classList.add('active')
    } else {
      if (navLiContainer.classList.contains('active')) {
        navLiContainer.classList.remove('active')
      }

      if (section.classList.contains('active')) {
        section.classList.remove('active')
      }
    }
  })
}

// Scroll to anchor ID using scrollTO event

navLi.addEventListener('click', e => {
  e.preventDefault()
  const parent = e.target.hasAttribute('data-link')
    ? e.target
    : e.target.parentElement
  const ScrollToSection = document.getElementById(parent.dataset.link)
  ScrollToSection.scrollIntoView({block: 'end', behavior: 'smooth'})
})

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
}

const observer = new IntersectionObserver(callback, options)
navContainer.forEach(el => {
  observer.observe(document.getElementById(el.id))
})

