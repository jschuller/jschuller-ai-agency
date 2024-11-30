// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    updateThemeIcon();
    // Save theme preference
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode');
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu if open
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
    });
});

// Scroll Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// ROI Calculator
const roiCalculator = document.getElementById('roi-calculator');
const annualSavings = document.getElementById('annual-savings');
const roiPercentage = document.getElementById('roi-percentage');

roiCalculator.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values
    const revenue = parseFloat(document.getElementById('annual-revenue').value);
    const employees = parseInt(document.getElementById('employees').value);
    const industry = document.getElementById('industry').value;

    // Calculate ROI based on industry and company size
    let savingsMultiplier;
    switch(industry) {
        case 'retail':
            savingsMultiplier = 0.15;
            break;
        case 'finance':
            savingsMultiplier = 0.18;
            break;
        case 'healthcare':
            savingsMultiplier = 0.16;
            break;
        case 'manufacturing':
            savingsMultiplier = 0.17;
            break;
        default:
            savingsMultiplier = 0.15;
    }

    // Calculate estimated savings
    const employeeMultiplier = Math.min(employees / 100, 1.5);
    const estimatedSavings = revenue * savingsMultiplier * employeeMultiplier;
    const estimatedROI = (estimatedSavings / (revenue * 0.05)) * 100; // Assuming 5% investment

    // Update results
    annualSavings.textContent = '$' + estimatedSavings.toLocaleString(undefined, {
        maximumFractionDigits: 0
    });
    roiPercentage.textContent = estimatedROI.toFixed(1) + '%';

    // Animate the result update
    document.querySelector('.calculator-result').classList.add('highlight');
    setTimeout(() => {
        document.querySelector('.calculator-result').classList.remove('highlight');
    }, 300);
});

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add form submission logic here
        alert('Thank you for your message. We will get back to you soon!');
        this.reset();
    });
}