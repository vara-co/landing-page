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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let section1 = document.getElementById('section1');
let section2 = document.getElementById('section2');
let section3 = document.getElementById('section3');
let section4 = document.getElementById('section4');

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


document.addEventListener("DOMContentLoaded", () => {
  // Get all the sections 
  const sections = document.querySelectorAll('section');
  // Get the <ul> elements by the Id
  const navList = document.getElementById("navbar__list"); 
  // Create an empty array to store the <li> elements
  const navListArray = [];

  // ForEach loop to create new <li> elements and add the appropriate classList
  sections.forEach((section, index) => {
    const navName = section.dataset.nav;
    const listItem = document.createElement("li"); 
    listItem.classList.add("menu__link"); 
    listItem.innerText = navName; 

    // Add class 'active' to section when near top of viewport
    if (index === 0) {
      listItem.classList.add("active-nav");  
    }
    // Push item into the <li> array
    navListArray.push(listItem);
  });
  // Append the <li> items to the <ul>
  navList.append(...navListArray);
});


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


