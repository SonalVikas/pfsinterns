// Responsive navbar
document.getElementById('mobile-menu').addEventListener('click', function() {
    var menu = document.querySelector('.menu');
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
});

// Slider
let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll('.project-slide');
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    const offset = -slideIndex * 100;
    document.querySelector('.slider').style.transform = `translateX(${offset}%)`;
}

function changeSlide(n) {
    slideIndex += n;
    showSlides();
}

showSlides();



// Contact Form   
    function handleSubmit(event) {
        event.preventDefault(); 
        
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
       
        alert('Message sent! Thank you...');

        document.getElementById('contactForm').reset();
    }

    
    document.getElementById('contactForm').addEventListener('submit', handleSubmit);

