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
 **/

// Main Event Listener Function triggered when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get all the sections
  const sections = document.querySelectorAll('section');
  // Get the <ul> elements by Id
  const navList = document.getElementById("navbar__list"); 
  // Create an empty array to store the <li> elements
  const navListArray = [];

  //ForEach loop to dynamically create new <li> elements and add the appropriate classList
  //NOTE: this function creates Nav-bar including smooth scrolling and active class
  sections.forEach((section, index) => { 
    const navName = section.dataset.nav;
    const listItem = document.createElement("li"); 
    listItem.classList.add("menu__link"); 
    listItem.innerText = navName; 

    // Add class 'active' to section when near top of viewport
    if (index === 0) {
      listItem.classList.add("active-nav");  
    }
    /* Click event listener function for smooth scrolling using scrollTo
    Note: this function calls in removeActiveClass() and highlightActiveNav() functions
    defined further below. This function also allows for a smooth scrolling, to avoid
    the use of <a> tags and the need for the removal of default behavior using event.preventDefault() */
    listItem.addEventListener("click", () => {
      // Get the offsetTop of the section(distance from the top of the document)
      const sectionStart = section.offsetTop; 
      
      // Scroll to the section
      window.scrollTo({
        top: sectionStart,
        behavior: "smooth"
      });

      //Call in the removeActiveClass() function
      removeActiveClass();
      // Add the active class only to clicked section in nav-bar
      section.classList.add("the-active-class");
      // Call in the highlight function
      highlightActiveNav(listItem);
    }); // End of smooth scrolling function

    //Push item into the <li> array
    navListArray.push(listItem);
  }); // End of function to create Nav-bar

  //Append the <li> items to the <ul>
  //Note: Using this line of code replaces the need for appendChild or innerHTML
  navList.append(...navListArray);

  //Function to remove active class from non-selected sections
  function removeActiveClass() {
    sections.forEach(section => {
      section.classList.remove("the-active-class");
    });
  } // End of removeActiveClass() function

  // Function to highlight the active navigation item
  function highlightActiveNav(clickedNavItem) {
    const allNavItems = navList.querySelectorAll("li");
    allNavItems.forEach(navItem => {
      navItem.classList.remove("active-nav");
    });
    clickedNavItem.classList.add("active-nav");
  } // End of highlightActiveNav() function

  // Function to check if sections are in viewport
  function makeActive() {
    // ForEach Loop to iterate through the sections  
    sections.forEach((section, index) => {
      const viewportsection = section.getBoundingClientRect();
      // Use an ideal value 150px offset might work best
      const value = 150;

      // Checking if section in viewport with conditional
      if (viewportsection.top <= value && viewportsection.bottom >= value) {
        if (!section.classList.contains("the-active-class")) {
          // Give it active state in current section
          section.classList.add("the-active-class");
        }

        highlightActiveNav(navListArray[index]);
      } else {
        // Remove active state  
        section.classList.remove("the-active-class");
        navListArray[index].classList.remove("active-nav");
      }
    }); // End of makeActive() function
  }

  // Listen for scroll events to update the active section, passing
  // makeActive() function without calling it
  // Prior to optimization
  //window.addEventListener("scroll", makeActive);
  // Call in makeActive function in case page loads with a section on view
  //makeActive();

  // After Performance Optimization
  let isScrolling = false;

  //To avoid makeActive function being called during every single scroll
  window.addEventListener("scroll", () => {
    if (!isScrolling) {
      isScrolling = true;
      window.requestAnimationFrame(() => {
        makeActive();
        isScrolling = false;
      });
    }
  }); // End of makeActive optimization event listener function

  window.addEventListener("resize", () => {
    makeActive();  // Ensure that active classes are updated on window resize
  });

  makeActive();  // Call initially to ensure the active class is set on page load
});