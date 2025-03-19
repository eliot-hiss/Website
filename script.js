// scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// intersection observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.page-section').forEach((section) => {
    observer.observe(section);
});

// nav link
const sections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// contact form submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const buttonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        formStatus.textContent = 'Sending message...';
        formStatus.className = 'form-status';
        formStatus.style.display = 'block';

        try {
            // createe form data
            const formData = new FormData(this);
            
            // send data to api
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                // success message
                formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                formStatus.className = 'form-status success';
                // reset form
                contactForm.reset();
            } else {
                // rrror message
                formStatus.textContent = data.message || 'Something went wrong. Please try again.';
                formStatus.className = 'form-status error';
            }
        } catch (error) {
            // network or other error
            formStatus.textContent = 'Failed to send message. Please check your connection and try again.';
            formStatus.className = 'form-status error';
            console.error('Form submission error:', error);
        } finally {
            // restore button state
            submitButton.innerHTML = buttonText;
            submitButton.disabled = false;
        }
    });
}

// copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// subtitle effect 
const typewriter = document.querySelector('.typewriter h2');
const text = typewriter.textContent;
typewriter.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typewriter.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// start typewriter when loads
window.addEventListener('load', typeWriter);

// scroll reveal animations
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.skill-card, .about-content, .contact-container');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// light/ dark mode toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }

    //  toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // theme from localStorage or default to dark
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme('dark'); //  dark mode default
        }
    }

    themeToggle.addEventListener('click', toggleTheme);

    initializeTheme();

    // mobile menu
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.nav-links');

    if (mobileNavToggle && mobileNav) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });

        // user clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
            });
        });

        // user clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileNav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                mobileNav.classList.remove('active');
            }
        });
    }
});
