// Membership Pricing (10% discount applied)
const prices = {
    daily: (9.99 * 0.9).toFixed(2), // Apply 10% discount
    weekly: (29.99 * 0.9).toFixed(2), // Apply 10% discount
    basic: { 
        monthly: (19.99 * 0.9).toFixed(2), 
        annual: (19.99 * 12 * 0.9).toFixed(2) 
    },
    premium: { 
        monthly: (49.99 * 0.9).toFixed(2), 
        annual: (49.99 * 12 * 0.9).toFixed(2) 
    },
    ultimate: { 
        monthly: (99.99 * 0.9).toFixed(2), 
        annual: (99.99 * 12 * 0.9).toFixed(2) 
    },
};

// Update Tier Price Display
function updateTierPriceDisplay() {
    const tier = document.getElementById("tier").value;
    const tierPriceDisplay = document.getElementById("tierPriceDisplay").querySelector("span");

    let monthlyPrice = prices[tier]?.monthly || 0;
    tierPriceDisplay.textContent = tier ? `$${monthlyPrice}/month` : "$0.00";
}

// Update Plan Price Display
function updatePlanPriceDisplay() {
    const tier = document.getElementById("tier").value;
    const plan = document.getElementById("membership").value;
    const planPriceDisplay = document.getElementById("planPriceDisplay").querySelector("span");

    let price = (tier && prices[tier]?.[plan]) || 0;
    planPriceDisplay.textContent = plan ? `$${price}` : "$0.00";
}

// Update Short-Term Plan Price Display
function updateShortTermPriceDisplay() {
    const shortTermPlan = document.getElementById("shortTerm").value;
    const shortTermPriceDisplay = document.getElementById("shortTermPriceDisplay").querySelector("span");

    let price = prices[shortTermPlan] || 0;
    shortTermPriceDisplay.textContent = shortTermPlan ? `$${price}` : "$0.00";
}

// Attach event listeners for price updates
document.getElementById("tier").addEventListener("change", () => {
    updateTierPriceDisplay();
    updatePlanPriceDisplay();
});
document.getElementById("membership").addEventListener("change", updatePlanPriceDisplay);
document.getElementById("shortTerm").addEventListener("change", updateShortTermPriceDisplay);

// Countdown Timer Logic
function startCountdown(deadline) {
    const countdownElement = document.getElementById("countdown");

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = deadline - now;

        if (timeLeft <= 0) {
            countdownElement.innerHTML = "<h2>Offer expired!</h2>";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days.toString().padStart(2, "0");
        document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
    }

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

// Set the countdown deadline to December 31, 2024
const countdownDeadline = new Date("December 31, 2024 23:59:59").getTime();
startCountdown(countdownDeadline);

// Form Validation Logic
document.getElementById("membershipForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Gather form inputs
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value;
    const tier = document.getElementById("tier").value;
    const membership = document.getElementById("membership").value;
    const shortTerm = document.getElementById("shortTerm").value;

    // Initialize an array to collect error messages
    const errors = [];

    // Validation rules
    if (name === "") {
        errors.push("Name is required.");
    }
    if (email === "" || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        errors.push("A valid email address is required.");
    }
    if (age === "" || isNaN(age) || age < 18 || age > 100) {
        errors.push("Age is required and must be between 18 and 100.");
    }
    if (tier === "") {
        errors.push("You must select a membership tier.");
    }
    if (membership === "" && shortTerm === "") {
        errors.push("You must select either a membership plan or a short-term plan.");
    }

    // Display errors or proceed
    if (errors.length > 0) {
        alert(errors.join("\n")); // Show all errors in an alert box
    } else {
        alert("Form submitted successfully!\nThank you for joining KC Fitness!");
        this.reset(); // Reset the form
    }
});

// Slideshow data
const slides = [
    { img: "gymhero1.jpg", description: '"Joining KC Fitness changed my life. The trainers are amazing!" - Sarah' },
    { img: "gymhero2.jpg", description: '"I lost 20 pounds in three months. Highly recommend this gym!" - Mike' },
    { img: "gymhero3.jpg", description: '"The best decision I ever made for my health and fitness." - Emily' },
];

let slideIndex = 0;

function showSlide(index) {
    const imgElement = document.getElementById("slideshow-image");
    const descriptionElement = document.getElementById("slideshow-description");

    if (index < 0) {
        slideIndex = slides.length - 1;
    } else if (index >= slides.length) {
        slideIndex = 0;
    } else {
        slideIndex = index;
    }

    imgElement.src = slides[slideIndex].img;
    descriptionElement.textContent = slides[slideIndex].description;
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

function prevSlide() {
    showSlide(slideIndex - 1);
}

// Initialize Slideshow
document.addEventListener("DOMContentLoaded", () => {
    showSlide(slideIndex);

    // Optional: Auto-slide every 5 seconds
    setInterval(() => {
        nextSlide();
    }, 5000); // 5000ms = 5 seconds
});
