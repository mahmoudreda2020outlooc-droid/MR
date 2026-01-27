// ========================================
// Appwrite Configuration
// ========================================
const { Client, Databases, Query, ID } = Appwrite;
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('697121c70024e4e94ac3');

const databases = new Databases(client);
const DB_ID = '6971223f003e5f162359';
const PROJECT_COLLECTION_ID = 'project_requests';
const CONTACT_COLLECTION_ID = 'contact_messages';

// ========================================
// Navbar Scroll Effect
// ========================================
const navbar = document.querySelector('.navbar');
const SCROLL_THRESHOLD = 50;

window.addEventListener('scroll', () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// Preloader & Loading State
// ========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            document.body.classList.remove('loading');
        }, 2000); // 2 seconds to make sure it's seen
    }
});// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-menu');
const navLinksItems = document.querySelectorAll('.nav-link');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

// ========================================
// Active Link Highlighting
// ========================================
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100; // Offset for navbar height

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Reveal Animations on Scroll (Intersection Observer)
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Special handling for skill cards to animate progress bars
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const progress = progressBar.getAttribute('data-progress');
                    progressBar.style.width = progress + '%';
                }
            }

            // Once revealed, no need to keep observing
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-on-scroll, .skill-card, .project-card, .stat-item, .contact-method').forEach(el => {
    revealObserver.observe(el);
});

// ========================================
// 3D Card Effect (Smooth Tilt)
// ========================================
const initTilt = () => {
    const cards = document.querySelectorAll('.card-3d');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
};

document.addEventListener('DOMContentLoaded', initTilt);

// ========================================
// Contact Form Submission
// ========================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Simple validation
        if (name && email && message) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        // Redirect to Thank You page
                        window.location.href = 'thank-you.html';
                    } else {
                        response.json().then(data => {
                            if (Object.hasOwn(data, 'errors')) {
                                alert(data["errors"].map(error => error["message"]).join(", "));
                            } else {
                                alert('Oops! There was a problem submitting your form');
                            }
                            submitBtn.innerHTML = originalBtnText;
                            submitBtn.disabled = false;
                        });
                    }
                })
                .catch(error => {
                    alert('Oops! There was a problem submitting your form');
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// ========================================
// Parallax Effect for Hero Section
// ========================================
const heroVisual = document.querySelector('.hero-visual');

if (heroVisual) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroVisual.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// ========================================
// Dynamic Year in Footer
// ========================================
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-content p');
if (footerText) {
    footerText.innerHTML = `&copy; ${currentYear} Mahmoud. All rights reserved.`;
}

// ========================================
// Typing Effect for Hero Subtitle (Optional Enhancement)
// ========================================
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            heroSubtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing effect after page load
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 500);
    });
}

// ========================================
// Cursor Trail Effect (Optional Enhancement)
// ========================================
const createCursorTrail = () => {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");

    if (circles.length === 0) return; // Only if circles exist in HTML

    const colors = [
        "#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e", "#ec805d",
        "#e36e5c", "#df685c", "#d5585c", "#d1525c", "#c5415d", "#c03b5d",
        "#b22c5e", "#ac265e", "#9c155f", "#950f5f", "#830060", "#7c0060",
        "#680060", "#60005f", "#48005f", "#3d005e"
    ];

    circles.forEach(function (circle, index) {
        circle.x = 0;
        circle.y = 0;
        circle.style.backgroundColor = colors[index % colors.length];
    });

    window.addEventListener("mousemove", function (e) {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach(function (circle, index) {
            circle.style.left = x - 12 + "px";
            circle.style.top = y - 12 + "px";
            circle.style.scale = (circles.length - index) / circles.length;

            circle.x = x;
            circle.y = y;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
};

// Modal Functions
function openLogoModal() {
    const modal = document.getElementById('logoModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeLogoModal() {
    const modal = document.getElementById('logoModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close modal when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLogoModal();
    }
});

// ========================================
// Manual Language Switcher (i18n)
// ========================================
const translations = {
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_skills: "Skills",
        nav_projects: "Projects",
        nav_portal: "Project Portal",
        nav_contact: "Contact",
        hero_greeting: "Hi, I'm",
        hero_subtitle: "Web Developer & Creative Problem Solver",
        hero_description: "I craft modern, fast, and user-friendly websites that bring ideas to life. Passionate about clean code and exceptional user experiences.",
        btn_view_projects: "View Projects",
        btn_contact_me: "Contact Me",
        scroll_down: "Scroll Down",
        about_p1: "I'm a passionate web developer dedicated to creating modern, fast, and user-friendly websites. I hold a five-year Industrial Diploma and am currently a student at the Faculty of Industrial Technology and Energy â€“ Borg El Arab University, majoring in Information Technology (IT).",
        about_p2: "With a keen eye for design and a foundation in systems thinking, I transform ideas into engaging digital experiences. I apply my technical education to build modern, efficient web solutions that not only look great but perform exceptionally.",
        stat_p_title: "Practical",
        stat_p_desc: "Project Experience",
        stat_t_title: "Modern",
        stat_t_desc: "Tech Solutions",
        stat_s_title: "Premium",
        stat_s_desc: "Quality Focused",
        skills_title: "Skills & Technologies",
        skills_description: "Tools and technologies I work with",
        projects_title: "Featured Projects",
        projects_description: "Some of my recent work",
        project1_title: "E-Commerce Platform",
        project1_description: "A full-featured online shopping platform with cart functionality, user authentication, and payment integration.",
        project2_title: "Task Manager App",
        project2_description: "An intuitive task management application with drag-and-drop functionality, categories, and priority levels.",
        project3_title: "Weather Dashboard",
        project3_description: "A beautiful weather application with real-time data, forecasts, and location-based weather information.",
        btn_live_demo: "Live Demo",
        btn_github: "GitHub",
        contact_title: "Get In Touch",
        contact_description: "Let's work together on your next project",
        connect_title: "Let's Connect",
        connect_description: "I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!",
        label_name: "Your Name",
        label_email: "Your Email",
        label_message: "Your Message",
        placeholder_name: "John Doe",
        placeholder_email: "john@example.com",
        placeholder_message: "Tell me about your project...",
        btn_send_message: "Send Message",
        LinkedIn: "LinkedIn",
        linkedin_connect: "Connect on LinkedIn",
        portal_title: "Project Portal",
        portal_description: "Start a new project or track an existing one",
        request_title: "Start New Project",
        label_phone: "Phone Number",
        label_project_type: "Project Type",
        btn_submit_request: "Submit Request",
        tracking_title: "Track Your Project",
        label_progress: "Progress",
        request_success_title: "Request Submitted!",
        request_success_message: "Your project has been received. Save this code to track your progress:",
        request_success_note: "We will contact you via phone or email shortly.",
        tracking_error: "Incorrect code. Please try again.",
        loading: "Loading Experience..."
    },
    ar: {
        nav_home: "ط§ظ„ط±ط¦ظٹط³ظٹط©",
        nav_about: "ظ…ظ† ط£ظ†ط§",
        nav_skills: "ظ…ظ‡ط§ط±ط§طھظٹ",
        nav_projects: "ط£ط¹ظ…ط§ظ„ظٹ",
        nav_portal: "ط¨ظˆط§ط¨ط© ط§ظ„ظ…ط´ط§ط±ظٹط¹",
        nav_contact: "ط§طھطµظ„ ط¨ظٹ",
        hero_greeting: "ط£ظ‡ظ„ط§ظ‹طŒ ط£ظ†ط§",
        hero_subtitle: "ظ…ط·ظˆط± ظˆظٹط¨ ظˆظ…ط­ظ„ظ„ ظ…ط´ط§ظƒظ„ ط¥ط¨ط¯ط§ط¹ظٹ",
        hero_description: "ط£ظ‚ظˆظ… ط¨ط¨ظ†ط§ط، ظ…ظˆط§ظ‚ط¹ ظˆظٹط¨ ط­ط¯ظٹط«ط© ظˆط³ط±ظٹط¹ط© ظˆط³ظ‡ظ„ط© ط§ظ„ط§ط³طھط®ط¯ط§ظ… طھط­ظˆظ„ ط§ظ„ط£ظپظƒط§ط± ط¥ظ„ظ‰ ظˆط§ظ‚ط¹. ط´ط؛ظˆظپ ط¨ط§ظ„ظƒظˆط¯ ط§ظ„ظ†ط¸ظٹظپ ظˆطھط¬ط§ط±ط¨ ط§ظ„ظ…ط³طھط®ط¯ظ… ط§ظ„ط§ط³طھط«ظ†ط§ط¦ظٹط©.",
        btn_view_projects: "ط¹ط±ط¶ ط§ظ„ظ…ط´ط§ط±ظٹط¹",
        btn_contact_me: "طھظˆط§طµظ„ ظ…ط¹ظٹ",
        scroll_down: "ظ…ط±ط± ظ„ظ„ط£ط³ظپظ„",
        about_p1: "ط£ظ†ط§ ظ…ط·ظˆط± ظˆظٹط¨ ط´ط؛ظˆظپ ظ…ظƒط±ط³ ظ„ط¥ظ†ط´ط§ط، ظ…ظˆط§ظ‚ط¹ ظˆظٹط¨ ط­ط¯ظٹط«ط© ظˆط³ط±ظٹط¹ط© ظˆط³ظ‡ظ„ط© ط§ظ„ط§ط³طھط®ط¯ط§ظ…. ط­ط§طµظ„ ط¹ظ„ظ‰ ط¯ط¨ظ„ظˆظ… طµظ†ط§ط¹ظٹ ط¨ظ†ط¸ط§ظ… ط§ظ„ط®ظ…ط³ ط³ظ†ظˆط§طھطŒ ظˆط£ظ†ط§ ط­ط§ظ„ظٹط§ظ‹ ط·ط§ظ„ط¨ ظپظٹ ظƒظ„ظٹط© طھظƒظ†ظˆظ„ظˆط¬ظٹط§ ط§ظ„طµظ†ط§ط¹ط© ظˆط§ظ„ط·ط§ظ‚ط© - ط¬ط§ظ…ط¹ط© ط¨ط±ط¬ ط§ظ„ط¹ط±ط¨طŒ ظ…طھط®طµطµ ظپظٹ طھظƒظ†ظˆظ„ظˆط¬ظٹط§ ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ (IT).",
        about_p2: "ط¨ظپط¶ظ„ ط­ط³ظٹ ط§ظ„ظپظ†ظٹ ظˆظ†ط¸ط±طھظٹ ط§ظ„طھظ‚ظ†ظٹط©طŒ ط£ظ‚ظˆظ… ط¨طھط­ظˆظٹظ„ ط§ظ„ط£ظپظƒط§ط± ط¥ظ„ظ‰ طھط¬ط§ط±ط¨ ط±ظ‚ظ…ظٹط© ط¬ط°ط§ط¨ط©. ط£ط·ط¨ظ‚ ط®ظ„ظپظٹطھظٹ ط§ظ„طھط¹ظ„ظٹظ…ظٹط© ظˆط§ظ„ط¹ظ…ظ„ظٹط© ظپظٹ ط¨ظ†ط§ط، ط­ظ„ظˆظ„ ظˆظٹط¨ ظ…طھط·ظˆط±ط© ظˆظپط¹ط§ظ„ط© طھط¶ظ…ظ† ط£ط¹ظ„ظ‰ ظ…ط³طھظˆظٹط§طھ ط§ظ„ط£ط¯ط§ط، ظˆط§ظ„ط¬ظˆط¯ط©.",
        stat_p_title: "ط®ط¨ط±ط©",
        stat_p_desc: "ظ…ط´ط§ط±ظٹط¹ ط¹ظ…ظ„ظٹط© ظˆظ†ط¸ظٹظپط©",
        stat_t_title: "ط­ظ„ظˆظ„",
        stat_t_desc: "طھظ‚ظ†ظٹط§طھ ظˆظٹط¨ ظ…طھط·ظˆط±ط©",
        stat_s_title: "ط¬ظˆط¯ط©",
        stat_s_desc: "ط£ط¯ط§ط، ظˆط§ط­طھط±ط§ظپظٹط© ط¹ط§ظ„ظٹط©",
        skills_title: "ط§ظ„ظ…ظ‡ط§ط±ط§طھ ظˆط§ظ„طھظ‚ظ†ظٹط§طھ",
        skills_description: "ط§ظ„ط£ط¯ظˆط§طھ ظˆط§ظ„طھظ‚ظ†ظٹط§طھ ط§ظ„طھظٹ ط£ط¹ظ…ظ„ ط¨ظ‡ط§",
        projects_title: "ط§ظ„ظ…ط´ط§ط±ظٹط¹ ط§ظ„ظ…ظ…ظٹط²ط©",
        projects_description: "ط¨ط¹ط¶ ط£ط¹ظ…ط§ظ„ظٹ ط§ظ„ط£ط®ظٹط±ط©",
        project1_title: "ظ…ظ†طµط© طھط¬ط§ط±ط© ط¥ظ„ظƒطھط±ظˆظ†ظٹط©",
        project1_description: "ظ…ظ†طµط© طھط³ظˆظ‚ ط¹ط¨ط± ط§ظ„ط¥ظ†طھط±ظ†طھ ظƒط§ظ…ظ„ط© ط§ظ„ظ…ظٹط²ط§طھ ظ…ط¹ ظˆط¸ط§ط¦ظپ ط§ظ„ط³ظ„ط©طŒ ظˆظ…طµط§ط¯ظ‚ط© ط§ظ„ظ…ط³طھط®ط¯ظ…طŒ ظˆطھظƒط§ظ…ظ„ ط§ظ„ط¯ظپط¹.",
        project2_title: "طھط·ط¨ظٹظ‚ ظ…ط¯ظٹط± ط§ظ„ظ…ظ‡ط§ظ…",
        project2_description: "طھط·ط¨ظٹظ‚ ط¨ط¯ظٹظ‡ظٹ ظ„ط¥ط¯ط§ط±ط© ط§ظ„ظ…ظ‡ط§ظ… ظ…ط¹ ظˆط¸ط§ط¦ظپ ط§ظ„ط³ط­ط¨ ظˆط§ظ„ط¥ظپظ„ط§طھطŒ ظˆط§ظ„ظپط¦ط§طھطŒ ظˆظ…ط³طھظˆظٹط§طھ ط§ظ„ط£ظˆظ„ظˆظٹط©.",
        project3_title: "ظ„ظˆط­ط© ط·ظ‚ط³",
        project3_description: "طھط·ط¨ظٹظ‚ ط·ظ‚ط³ ط¬ظ…ظٹظ„ ظ…ط¹ ط¨ظٹط§ظ†ط§طھ ظپظٹ ط§ظ„ظˆظ‚طھ ط§ظ„ظپط¹ظ„ظٹ ظˆطھظˆظ‚ط¹ط§طھ ظˆظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ط·ظ‚ط³ ط¨ظ†ط§ط،ظ‹ ط¹ظ„ظ‰ ط§ظ„ظ…ظˆظ‚ط¹.",
        btn_live_demo: "ط¹ط±ط¶ ظ…ط¨ط§ط´ط±",
        btn_github: "ط¬ظٹطھ ظ‡ط§ط¨",
        contact_title: "ط§ط¨ظ‚ ط¹ظ„ظ‰ طھظˆط§طµظ„",
        contact_description: "ط¯ط¹ظ†ط§ ظ†ط¹ظ…ظ„ ظ…ط¹ط§ظ‹ ظپظٹ ظ…ط´ط±ظˆط¹ظƒ ط§ظ„ظ‚ط§ط¯ظ…",
        connect_title: "ظ„ظ†طھظˆط§طµظ„",
        connect_description: "ط£ظ†ط§ ظ…ظ‡طھظ… ط¯ط§ط¦ظ…ط§ظ‹ ط¨ط³ظ…ط§ط¹ ط£ط®ط¨ط§ط± ط§ظ„ظ…ط´ط§ط±ظٹط¹ ظˆط§ظ„ظپط±طµ ط§ظ„ط¬ط¯ظٹط¯ط©. ط³ظˆط§ط، ظƒط§ظ† ظ„ط¯ظٹظƒ ط³ط¤ط§ظ„ ط£ظˆ طھط±ظٹط¯ ظپظ‚ط· ط¥ظ„ظ‚ط§ط، ط§ظ„طھط­ظٹط©طŒ ظپظ„ط§ طھطھط±ط¯ط¯ ظپظٹ ط§ظ„طھظˆط§طµظ„!",
        label_name: "ط§ط³ظ…ظƒ",
        label_email: "ط¨ط±ظٹط¯ظƒ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ",
        label_message: "طھظپط§طµظٹظ„ ط§ظ„ظ…ط´ط±ظˆط¹",
        placeholder_name: "ظ…ط­ظ…ظˆط¯ ط±ط¶ط§",
        placeholder_email: "example@mail.com",
        placeholder_message: "ط£ط®ط¨ط±ظ†ظٹ ط¹ظ† ظ…ط´ط±ظˆط¹ظƒ...",
        btn_send_message: "ط¥ط±ط³ط§ظ„ ط§ظ„ط±ط³ط§ظ„ط©",
        LinkedIn: "ظ„ظٹظ†ظƒط¯ ط¥ظ†",
        linkedin_connect: "طھظˆط§طµظ„ ظ…ط¹ظٹ ط¹ط¨ط± ظ„ظٹظ†ظƒط¯ ط¥ظ†",
        portal_title: "ط¨ظˆط§ط¨ط© ط§ظ„ظ…ط´ط§ط±ظٹط¹",
        portal_description: "ط§ط¨ط¯ط£ ظ…ط´ط±ظˆط¹ط§ظ‹ ط¬ط¯ظٹط¯ط§ظ‹ ط£ظˆ طھطھط¨ط¹ ظ…ط´ط±ظˆط¹ط§ظ‹ ظ‚ط§ط¦ظ…ط§ظ‹",
        request_title: "ط§ط¨ط¯ط£ ظ…ط´ط±ظˆط¹ط§ظ‹ ط¬ط¯ظٹط¯ط§ظ‹",
        label_phone: "ط±ظ‚ظ… ط§ظ„ظ‡ط§طھظپ",
        label_project_type: "ظ†ظˆط¹ ط§ظ„ظ…ط´ط±ظˆط¹",
        btn_submit_request: "ط¥ط±ط³ط§ظ„ ط§ظ„ط·ظ„ط¨",
        tracking_title: "طھطھط¨ط¹ ظ…ط´ط±ظˆط¹ظƒ",
        label_progress: "ظ†ط³ط¨ط© ط§ظ„ط¥ظ†ط¬ط§ط²",
        request_success_title: "طھظ… ط¥ط±ط³ط§ظ„ ط§ظ„ط·ظ„ط¨!",
        request_success_message: "طھظ… ط§ط³طھظ„ط§ظ… ظ…ط´ط±ظˆط¹ظƒ ط¨ظ†ط¬ط§ط­. ط§ط­ظپط¸ ظ‡ط°ط§ ط§ظ„ظƒظˆط¯ ظ„طھطھط¨ط¹ ط§ظ„طھظ‚ط¯ظ…:",
        request_success_note: "ط³ظ†طھظˆط§طµظ„ ظ…ط¹ظƒ ط¹ط¨ط± ط§ظ„ظ‡ط§طھظپ ط£ظˆ ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ ظ‚ط±ظٹط¨ط§ظ‹.",
        tracking_error: "ط§ظ„ظƒظˆط¯ ط؛ظٹط± طµط­ظٹط­. ظٹط±ط¬ظ‰ ط§ظ„ظ…ط­ط§ظˆظ„ط© ظ…ط±ط© ط£ط®ط±ظ‰.",
        loading: "ط¬ط§ط±ظٹ طھط­ظ…ظٹظ„ ط§ظ„طھط¬ط±ط¨ط©..."
    },
    fr: {
        nav_home: "Accueil",
        nav_about: "أ€ propos",
        nav_skills: "Compأ©tences",
        nav_projects: "Projets",
        nav_portal: "Portail Projet",
        nav_contact: "Contact",
        hero_greeting: "Salut, je suis",
        hero_subtitle: "Dأ©veloppeur Web & Solutionneur de Problأ¨mes",
        hero_description: "Je conأ§ois des sites web modernes, rapides et conviviaux qui donnent vie aux idأ©es. Passionnأ© par le code propre et les expأ©riences utilisateur exceptionnelles.",
        btn_view_projects: "Voir les projets",
        btn_contact_me: "Contactez-moi",
        scroll_down: "Dأ©filer vers le bas",
        about_p1: "Je suis un dأ©veloppeur web passionnأ©, dأ©diأ© أ  la crأ©ation de sites web modernes, rapides et conviviaux. Je dأ©tiens un diplأ´me industriel de cinq ans et je suis actuellement أ©tudiant أ  la Facultأ© de Technologie Industrielle et d'أ‰nergie â€“ Universitأ© de Borg El Arab, avec une spأ©cialisation en Technologie de l'Information (IT).",
        about_p2: "Avec un إ“il attentif au design et une base solide en pensأ©e systأ©mique, je transforme les idأ©es en expأ©riences numأ©riques engageantes. J'applique ma formation technique pour construire des solutions web modernes et efficaces qui sont non seulement esthأ©tiques mais aussi performantes.",
        stat_p_title: "Pratique",
        stat_p_desc: "Expأ©rience Projet",
        stat_t_title: "Moderne",
        stat_t_desc: "Solutions Tech",
        stat_s_title: "Premium",
        stat_s_desc: "Focus Qualitأ©",
        skills_title: "Compأ©tences & Technologies",
        skills_description: "Outils et technologies avec lesquels je travaille",
        projects_title: "Projets mis en avant",
        projects_description: "Certains de mes travaux rأ©cents",
        project1_title: "Plateforme E-commerce",
        project1_description: "Une plateforme de shopping en ligne complأ¨te avec panier, authentification utilisateur et intأ©gration de paiement.",
        project2_title: "App de Gestion de Tأ¢ches",
        project2_description: "Une application intuitive de gestion de tأ¢ches avec glisser-dأ©poser, catأ©gories et niveaux de prioritأ©.",
        project3_title: "Tableau de Bord Mأ©tأ©o",
        project3_description: "Une belle application mأ©tأ©o avec donnأ©es en temps rأ©el, prأ©visions et informations mأ©tأ©o basأ©es sur la localisation.",
        btn_live_demo: "Dأ©mo en direct",
        btn_github: "GitHub",
        contact_title: "Contactez-nous",
        contact_description: "Travaillons ensemble sur votre prochain projet",
        connect_title: "Connectons-nous",
        connect_description: "Je suis toujours intأ©ressأ© par de nouveaux projets et opportunitأ©s. Que vous ayez une question ou que vous vouliez simplement dire bonjour, n'hأ©sitez pas أ  nous contacter !",
        label_name: "Votre Nom",
        label_email: "Votre Email",
        label_message: "Votre Message",
        placeholder_name: "Jean Dupont",
        placeholder_email: "jean@example.com",
        placeholder_message: "Parlez-moi de votre projet...",
        btn_send_message: "Envoyer le message",
        LinkedIn: "LinkedIn",
        linkedin_connect: "Connectez-vous sur LinkedIn",
        portal_title: "Portail de Projet",
        portal_description: "Dأ©marrer un nouveau projet ou suivre un projet existant",
        request_title: "Dأ©marrer un projet",
        label_phone: "Numأ©ro de tأ©lأ©phone",
        label_project_type: "Type de projet",
        btn_submit_request: "Soumettre",
        tracking_title: "Suivre votre projet",
        label_progress: "Progression",
        request_success_title: "Demande envoyأ©e !",
        request_success_message: "Votre projet a أ©tأ© reأ§u. Enregistrez ce code pour suivre votre progression :",
        request_success_note: "Nous vous contacterons par tأ©lأ©phone ou e-mail sous peu.",
        tracking_error: "Code incorrect. Veuillez rأ©essayer.",
        loading: "Chargement de l'expأ©rience..."
    }
};

const languages = [
    { code: 'en', name: 'English', flag: 'ًں‡؛ًں‡¸' },
    { code: 'ar', name: 'ط§ظ„ط¹ط±ط¨ظٹط©', flag: 'ًں‡¸ًں‡¦' },
    { code: 'fr', name: 'Franأ§ais', flag: 'ًں‡«ًں‡·' }
];

function toggleLangMenu() {
    const dropdown = document.getElementById('langDropdown');
    dropdown.classList.toggle('active');
}

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.setAttribute('placeholder', translations[lang][key]);
        }
    });

    // Handle RTL
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', lang);
    }

    localStorage.setItem('preferred_lang', lang);
    toggleLangMenu();
}

// Populate Dropdown
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) {
        languages.forEach(lang => {
            const item = document.createElement('div');
            item.className = 'lang-item';
            item.innerHTML = `
                <span class="lang-flag">${lang.flag}</span>
                <span class="lang-name">${lang.name}</span>
            `;
            item.onclick = () => setLanguage(lang.code);
            dropdown.appendChild(item);
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item-lang')) {
            dropdown.classList.remove('active');
        }
    });

    // Initial language
    const savedLang = localStorage.getItem('preferred_lang') || 'en';
    if (savedLang !== 'en') {
        setLanguage(savedLang);
    }
});

// ========================================
// Skills Progress Animation
// ========================================
const skillsSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.skill-progress');

function showProgress() {
    progressBars.forEach(progressBar => {
        const value = progressBar.dataset.progress;
        progressBar.style.width = `${value}%`;
    });
}

if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            showProgress();
        }
    }, {
        root: null,
        threshold: 0.1,
    });

    observer.observe(skillsSection);
}

// ========================================
// Project Carousel Logic
// ========================================
function initCarousel() {
    const carousels = document.querySelectorAll('.project-carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        if (!track) return;

        const slides = Array.from(track.children);
        const nextButton = carousel.querySelector('.carousel-btn.next');
        const prevButton = carousel.querySelector('.carousel-btn.prev');
        const dotsNav = carousel.querySelector('.carousel-dots');
        const dots = dotsNav ? Array.from(dotsNav.children) : [];

        if (slides.length === 0) return;

        const slideWidth = slides[0].getBoundingClientRect().width;

        const setSlidePosition = (slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        };
        slides.forEach(setSlidePosition);

        const moveToSlide = (track, currentSlide, targetSlide) => {
            track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
        };

        const updateDots = (currentDot, targetDot) => {
            if (!currentDot || !targetDot) return;
            currentDot.classList.remove('active');
            targetDot.classList.add('active');
        };

        if (nextButton) {
            nextButton.addEventListener('click', e => {
                e.preventDefault();
                const currentSlide = track.querySelector('.current-slide') || slides[0];
                const nextSlide = currentSlide.nextElementSibling || slides[0];
                const currentDot = dotsNav ? dotsNav.querySelector('.active') : null;
                const nextDot = currentDot ? (currentDot.nextElementSibling || dots[0]) : null;

                moveToSlide(track, currentSlide, nextSlide);
                if (currentDot && nextDot) updateDots(currentDot, nextDot);
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', e => {
                e.preventDefault();
                const currentSlide = track.querySelector('.current-slide') || slides[0];
                const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
                const currentDot = dotsNav ? dotsNav.querySelector('.active') : null;
                const prevDot = currentDot ? (currentDot.previousElementSibling || dots[dots.length - 1]) : null;

                moveToSlide(track, currentSlide, prevSlide);
                if (currentDot && prevDot) updateDots(currentDot, prevDot);
            });
        }

        if (dotsNav) {
            dotsNav.addEventListener('click', e => {
                const targetDot = e.target.closest('button');
                if (!targetDot) return;

                const currentSlide = track.querySelector('.current-slide') || slides[0];
                const currentDot = dotsNav.querySelector('.active');
                const targetIndex = dots.findIndex(dot => dot === targetDot);
                const targetSlide = slides[targetIndex];

                moveToSlide(track, currentSlide, targetSlide);
                updateDots(currentDot, targetDot);
            });
        }

        window.addEventListener('resize', () => {
            const newSlideWidth = slides[0].getBoundingClientRect().width;
            slides.forEach((slide, index) => {
                slide.style.left = newSlideWidth * index + 'px';
            });
            const currentSlide = track.querySelector('.current-slide') || slides[0];
            track.style.transform = 'translateX(-' + currentSlide.style.left + ')';
        });
    });
}

// Initialize Carousel on Load
window.addEventListener('load', initCarousel);

// ========================================
// Lightbox Implementation
// ========================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const prevBtn = lightbox ? lightbox.querySelector('.lightbox-btn.prev') : null;
    const nextBtn = lightbox ? lightbox.querySelector('.lightbox-btn.next') : null;

    if (!lightbox || !lightboxImg) return;

    let currentImages = [];
    let currentIndex = 0;

    const openLightbox = (index, images) => {
        currentImages = images;
        currentIndex = index;
        lightboxImg.src = currentImages[currentIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    const showNext = (e) => {
        if (e) e.stopPropagation();
        if (currentImages.length <= 1) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        lightboxImg.src = currentImages[currentIndex];
    };

    const showPrev = (e) => {
        if (e) e.stopPropagation();
        if (currentImages.length <= 1) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        lightboxImg.src = currentImages[currentIndex];
    };

    // Add click events to gallery images
    document.querySelectorAll('.project-card').forEach(card => {
        const cardImages = Array.from(card.querySelectorAll('img')).map(img => img.src);

        card.querySelectorAll('img').forEach((img, index) => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(index, cardImages);
            });
        });

        // Link Zoom Button (Lens)
        const zoomBtn = card.querySelector('.zoom-btn');
        if (zoomBtn) {
            zoomBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const activeSlide = card.querySelector('.carousel-slide.current-slide') || card.querySelector('.carousel-slide');
                const imagesInCard = card.querySelectorAll('.carousel-slide img, .project-image > img');
                const imageList = Array.from(imagesInCard).map(img => img.src);

                let activeIndex = 0;
                if (activeSlide) {
                    const activeImg = activeSlide.querySelector('img');
                    activeIndex = Array.from(imagesInCard).indexOf(activeImg);
                }

                openLightbox(activeIndex >= 0 ? activeIndex : 0, imageList);
            });
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
}

// Update DOMContentLoaded to include initLightbox
document.addEventListener('DOMContentLoaded', () => {
    initLightbox();
});

// ========================================
// Project Portal Logic (Request & Track)
// ========================================
const projectDatabase = {
    'DEV-2024-001': {
        name: 'E-Commerce Website',
        status: 'Development',
        percentage: 65,
        delivery: 'Feb 15, 2024'
    },
    'MOBI-APPS-99': {
        name: 'Fitness Mobile App',
        status: 'Testing',
        percentage: 90,
        delivery: 'Jan 30, 2024'
    }
};

function initProjectPortal() {
    const requestForm = document.getElementById('projectRequestForm');
    const trackBtn = document.getElementById('trackProjectBtn');
    const trackInput = document.getElementById('projectCodeInput');
    const resultDiv = document.getElementById('trackingResult');
    const errorDiv = document.getElementById('trackingError');

    // Modal Elements
    const modal = document.getElementById('codeModal');
    const closeBtn = modal ? modal.querySelector('.close-modal') : null;
    const codeDisplay = document.getElementById('generatedCode');
    const copyBtn = document.getElementById('copyCodeBtn');

    if (!trackBtn || !trackInput) return;

    // --- 1. Project Request Handling ---
    if (requestForm) {
        requestForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect Data
            const clientName = document.getElementById('clientName').value;
            const clientEmail = document.getElementById('clientEmail').value;
            const clientPhone = document.getElementById('clientPhone').value;
            const projectType = document.getElementById('projectType').value;
            const projectNotes = document.getElementById('projectNotes').value;

            // Generate Unique Code
            const prefix = projectType.substring(0, 3).toUpperCase();
            const random = Math.random().toString(36).substring(2, 6).toUpperCase();
            const code = `${prefix}-${random}`;

            // Create Document in Appwrite
            databases.createDocument(
                DB_ID,
                PROJECT_COLLECTION_ID,
                ID.unique(),
                {
                    code: code,
                    clientName: clientName,
                    clientPhone: clientPhone,
                    clientEmail: clientEmail,
                    projectType: projectType,
                    projectNotes: projectNotes,
                    status: 'Pending Review',
                    percentage: 5,
                    delivery: 'TBD (After Review)'
                }
            ).then(() => {
                // Show Success Modal
                if (codeDisplay) codeDisplay.textContent = code;
                if (modal) modal.style.display = 'block';

                // Reset Form
                requestForm.reset();
            }).catch(err => {
                console.error('Appwrite Project Request Error:', err);
                if (err.code === 403) {
                    alert('ط¨ظˆط§ط¨ط© Appwrite طھط±ظپط¶ ط§ظ„ط§طھطµط§ظ„ (CORS). ظٹط±ط¬ظ‰ ط§ظ„طھط£ظƒط¯ ظ…ظ† ط¥ط¶ط§ظپط© localhost ظˆ 127.0.0.1 ظپظٹ ظ…ظ†طµط§طھ (Platforms) ط§ظ„ظ…ط´ط±ظˆط¹.');
                } else {
                    alert('Error submitting request: ' + (err.message || 'Please check console.'));
                }
            });
        });
    }

    // --- 2. Project Tracking Handling ---
    trackBtn.addEventListener('click', async () => {
        const code = trackInput.value.trim().toUpperCase();

        try {
            const response = await databases.listDocuments(
                DB_ID,
                PROJECT_COLLECTION_ID,
                [Query.equal('code', code)]
            );

            if (response.documents.length > 0) {
                const project = response.documents[0];
                errorDiv.style.display = 'none';
                resultDiv.style.display = 'block';

                const nameEl = document.getElementById('trackProjectName');
                const statusEl = document.getElementById('trackStatusBadge');
                const percentEl = document.getElementById('trackPercentageText');
                const deliveryEl = document.getElementById('trackDeliveryDate');
                const bar = document.getElementById('trackProgressBar');

                if (nameEl) nameEl.textContent = `${project.clientName}'s ${project.projectType} Project`;
                if (statusEl) statusEl.textContent = project.status;
                if (percentEl) percentEl.textContent = project.percentage + '%';
                if (deliveryEl) deliveryEl.textContent = project.delivery;

                setTimeout(() => {
                    if (bar) bar.style.width = project.percentage + '%';
                }, 100);

                resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                resultDiv.style.display = 'none';
                errorDiv.style.display = 'block';
            }
        } catch (err) {
            console.error('Tracking Error:', err);
            alert('Error fetching project status.');
        }
    });

    // Support Enter key for tracking
    trackInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') trackBtn.click();
    });

    // --- 3. Modal & Utilities ---
    if (closeBtn) {
        closeBtn.onclick = () => modal.style.display = 'none';
    }
    window.addEventListener('click', (e) => {
        if (modal && e.target == modal) modal.style.display = 'none';
    });

    if (copyBtn && codeDisplay) {
        copyBtn.addEventListener('click', () => {
            const codeToCopy = codeDisplay.textContent;
            navigator.clipboard.writeText(codeToCopy).then(() => {
                const originalIcon = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = originalIcon;
                }, 2000);
            });
        });
    }
}

// ========================================
// Contact Form Handler
// ========================================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Save to Appwrite
        databases.createDocument(
            DB_ID,
            CONTACT_COLLECTION_ID,
            ID.unique(),
            {
                name,
                email,
                phone,
                message,
                site: 'portfolio'
            }
        ).then(() => {
            window.location.href = 'thank-you.html';
        }).catch(err => {
            console.error('Appwrite Contact Error:', err);
            if (err.code === 403) {
                alert('ط¨ظˆط§ط¨ط© Appwrite طھط±ظپط¶ ط§ظ„ط§طھطµط§ظ„ (CORS). ظٹط±ط¬ظ‰ ط§ظ„طھط£ظƒط¯ ظ…ظ† ط¥ط¶ط§ظپط© localhost ظˆ 127.0.0.1 ظپظٹ ظ…ظ†طµط§طھ (Platforms) ط§ظ„ظ…ط´ط±ظˆط¹ ظƒظ…ط§ ط´ط±ط­طھ ظ„ظƒ.');
            } else {
                alert('Error sending message: ' + (err.message || 'Please check console.'));
            }
        });
    });
}

// Initializations
window.addEventListener('DOMContentLoaded', () => {
    initProjectPortal();
    initContactForm();
});
