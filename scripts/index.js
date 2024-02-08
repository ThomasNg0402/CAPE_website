function redirectToInformation() {
  window.location.href = "information.html";
}
function redirectToGames() {
  window.location.href = "games.html";
}
function redirectToStats() {
  window.location.href = "locationstats.html";
}
/*slideshow*/
let slideIndex = 1;
let slideInterval;

// Call showSlides with initial slide index to display a default slide on page load
showSlides(slideIndex);

function plusSlides(n) {
    clearInterval(slideInterval); // Clear the interval to stop auto-scrolling
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");

    if (n > slides.length) {
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";

    // Auto-scroll to the next image every 5 seconds (adjust as needed)
    slideInterval = setInterval(function() {
        plusSlides(1);
    }, 5000); // 5000 milliseconds (5 seconds)
}

// Start the auto-scroll on page load
slideInterval = setInterval(function() {
    plusSlides(1);
}, 5000); // 5000 milliseconds (5 seconds)

function redirectToPage() {
  // Add your redirection logic here
  window.location.href = "map.html";
}
