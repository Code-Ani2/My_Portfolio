// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-bs-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Typing Animation
const text = [
  "A passionate learner exploring Data, Design & Development!",
  "An aspiring analyst with a creative edge.",
  "Ready to turn ideas into real projects!"
];

let i = 0, j = 0;
let currentText = "";
let isDeleting = false;
let typingElement = document.getElementById("typing-text");

function type() {
  if (i < text.length) {
    if (!isDeleting && j <= text[i].length) {
      currentText = text[i].substring(0, j++);
    } else if (isDeleting && j >= 0) {
      currentText = text[i].substring(0, j--);
    }

    typingElement.innerHTML = currentText;

    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && j === text[i].length) {
      isDeleting = true;
      typingSpeed = 1500;
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % text.length;
    }

    setTimeout(type, typingSpeed);
  }
}

// About Section Dropdown
document.querySelectorAll('.about-tab').forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('data-target');
        
        // Hide all content
        document.querySelectorAll('.about-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Show selected content
        document.getElementById(target).classList.add('active');
    });
});

// Skill Cards Functionality
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', function() {
        document.querySelectorAll('.skill-card').forEach(otherCard => {
            if (otherCard !== this) {
                otherCard.classList.remove('active');
            }
        });
        this.classList.toggle('active');
    });
});

// Initialize tooltips
const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
tooltips.forEach(t => new bootstrap.Tooltip(t));

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Certificate Modal Handler
document.addEventListener('DOMContentLoaded', function() {
    const certificateModal = document.getElementById('certificateModal');
    if (certificateModal) {
        certificateModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const certificatePath = button.getAttribute('data-certificate-img');
            const certificateTitle = button.getAttribute('data-certificate-title');
            
            // Convert PDF path to viewable URL
            const pdfUrl = certificatePath.startsWith('http') ? 
                certificatePath : 
                `https://docs.google.com/viewer?url=${encodeURIComponent(certificatePath)}&embedded=true`;
            
            document.getElementById('certificateViewer').src = pdfUrl;
            document.getElementById('certificateTitle').textContent = certificateTitle;
        });
        
        // Reset viewer when modal closes
        certificateModal.addEventListener('hidden.bs.modal', function() {
            document.getElementById('certificateViewer').src = '';
        });
    }
});

// Page loader
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
    }, 1000);
});

// Initialize typing animation
type();