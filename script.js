
document.addEventListener("DOMContentLoaded", function () {
    console.log("Website Loaded Successfully!");
});




// Navigation function
function navigateTo(page) {
    window.location.href = page;
}

// Toggle Dropdown
function toggleDropdown(id) {
    let dropdown = document.getElementById(id);
    let isVisible = dropdown.style.display === "block";
    
    // Hide all dropdowns first
    let allDropdowns = document.querySelectorAll(".dropdown-content");
    allDropdowns.forEach(d => {
        d.style.display = "none";
        d.style.opacity = "0";
    });

    // Show the selected one
    if (!isVisible) {
        dropdown.style.display = "block";
        setTimeout(() => {
            dropdown.style.opacity = "1";
        }, 100);
    }
}






document.addEventListener("DOMContentLoaded", function() {
    // Smooth fade-in effect for contact page elements
    document.querySelector(".contact-container").style.opacity = "1";
    document.querySelector(".contact-container").style.transform = "translateY(0)";
});

// Apply animations
document.querySelector(".btn").addEventListener("mouseover", function() {
    this.style.background = "gold";
    this.style.color = "black";
});

document.querySelector(".btn").addEventListener("mouseout", function() {
    this.style.background = "transparent";
    this.style.color = "gold";
});
