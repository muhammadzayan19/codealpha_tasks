let slideIndex = 1;

// Function to open the modal
function openModal() {
    document.getElementById("modal").style.display = "block";
    document.getElementById("modal").style.opacity = "1";
}

// Function to close the modal
function closeModal() {
    document.getElementById("modal").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("modal").style.display = "none";
    }, 500);
}

// Function to navigate through slides
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Function to set the current slide
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Function to show the current slide
function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const formResponse = document.getElementById('formResponse');

    // Simulate form submission process
    setTimeout(() => {
        formResponse.textContent = 'Thank you for submitting! You will be contacted via our team.';
    }, 500); // Display the thank-you message after a short delay

    // Optionally, reset the form after submission
    document.getElementById('contactForm').reset();
}

// Function to change background color every 3 seconds
function changeBackgroundColor() {
    const colors = ['#ff7e5f', '#feb47b', '#ff6a6a', '#6a82fb', '#fc5c7d'];
    let i = 0;
    setInterval(() => {
        document.body.style.backgroundColor = colors[i];
        i = (i + 1) % colors.length; // Loop through the colors
    }, 3000); // Change color every 3 seconds
}

// Initialize event listeners and start background color change
document.addEventListener("DOMContentLoaded", function() {
    let close = document.getElementsByClassName("close")[0];
    close.addEventListener("click", closeModal);
    changeBackgroundColor();
    showSlides(slideIndex); // Show the first slide by default
});
