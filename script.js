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
// Reveal Animations on Scroll
// ========================================
const revealElements = document.querySelectorAll('.card-3d, .about-text, .about-stats, .section-title, .form-group');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial setup for reveal elements
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease-out';
});

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// ========================================
// 3D Card Effect (Tilt)
// ========================================
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.card-3d');

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Only apply if mouse is over or near the card
        if (x >= -50 && x <= rect.width + 50 && y >= -50 && y <= rect.height + 50) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max rotation deg
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        } else {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        }
    });
});

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
        nav_contact: "Contact",
        hero_greeting: "Hi, I'm",
        hero_subtitle: "Web Developer & Creative Problem Solver",
        hero_description: "I craft modern, fast, and user-friendly websites that bring ideas to life. Passionate about clean code and exceptional user experiences.",
        btn_view_projects: "View Projects",
        btn_contact_me: "Contact Me",
        scroll_down: "Scroll Down",
        about_p1: "I'm a passionate web developer dedicated to creating modern, fast, and user-friendly websites. I hold a five-year Industrial Diploma and am currently a student at the Faculty of Industrial Technology and Energy – Borg El Arab University, majoring in Information Technology (IT).",
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
        btn_send_message: "Send Message"
    },
    ar: {
        nav_home: "الرئيسية",
        nav_about: "من أنا",
        nav_skills: "مهاراتي",
        nav_projects: "أعمالي",
        nav_contact: "اتصل بي",
        hero_greeting: "أهلاً، أنا",
        hero_subtitle: "مطور ويب ومحلل مشاكل إبداعي",
        hero_description: "أقوم ببناء مواقع ويب حديثة وسريعة وسهلة الاستخدام تحول الأفكار إلى واقع. شغوف بالكود النظيف وتجارب المستخدم الاستثنائية.",
        btn_view_projects: "عرض المشاريع",
        btn_contact_me: "تواصل معي",
        scroll_down: "مرر للأسفل",
        about_p1: "أنا مطور ويب شغوف مكرس لإنشاء مواقع ويب حديثة وسريعة وسهلة الاستخدام. حاصل على دبلوم صناعي بنظام الخمس سنوات، وأنا حالياً طالب في كلية تكنولوجيا الصناعة والطاقة - جامعة برج العرب، متخصص في تكنولوجيا المعلومات (IT).",
        about_p2: "بفضل حسي الفني ونظرتي التقنية، أقوم بتحويل الأفكار إلى تجارب رقمية جذابة. أطبق خلفيتي التعليمية والعملية في بناء حلول ويب متطورة وفعالة تضمن أعلى مستويات الأداء والجودة.",
        stat_p_title: "خبرة",
        stat_p_desc: "مشاريع عملية ونظيفة",
        stat_t_title: "حلول",
        stat_t_desc: "تقنيات ويب متطورة",
        stat_s_title: "جودة",
        stat_s_desc: "أداء واحترافية عالية",
        skills_title: "المهارات والتقنيات",
        skills_description: "الأدوات والتقنيات التي أعمل بها",
        projects_title: "المشاريع المميزة",
        projects_description: "بعض أعمالي الأخيرة",
        project1_title: "منصة تجارة إلكترونية",
        project1_description: "منصة تسوق عبر الإنترنت كاملة الميزات مع وظائف السلة، ومصادقة المستخدم، وتكامل الدفع.",
        project2_title: "تطبيق مدير المهام",
        project2_description: "تطبيق بديهي لإدارة المهام مع وظائف السحب والإفلات، والفئات، ومستويات الأولوية.",
        project3_title: "لوحة طقس",
        project3_description: "تطبيق طقس جميل مع بيانات في الوقت الفعلي وتوقعات ومعلومات الطقس بناءً على الموقع.",
        btn_live_demo: "عرض مباشر",
        btn_github: "جيت هاب",
        contact_title: "ابق على تواصل",
        contact_description: "دعنا نعمل معاً في مشروعك القادم",
        connect_title: "لنتواصل",
        connect_description: "أنا مهتم دائماً بسماع أخبار المشاريع والفرص الجديدة. سواء كان لديك سؤال أو تريد فقط إلقاء التحية، فلا تتردد في التواصل!",
        label_name: "اسمك",
        label_email: "بريدك الإلكتروني",
        label_message: "رسالتك",
        placeholder_name: "محمود رضا",
        placeholder_email: "example@mail.com",
        placeholder_message: "أخبرني عن مشروعك...",
        btn_send_message: "إرسال الرسالة"
    },
    fr: {
        nav_home: "Accueil",
        nav_about: "À propos",
        nav_skills: "Compétences",
        nav_projects: "Projets",
        nav_contact: "Contact",
        hero_greeting: "Salut, je suis",
        hero_subtitle: "Développeur Web & Solutionneur de Problèmes",
        hero_description: "Je conçois des sites web modernes, rapides et conviviaux qui donnent vie aux idées. Passionné par le code propre et les expériences utilisateur exceptionnelles.",
        btn_view_projects: "Voir les projets",
        btn_contact_me: "Contactez-moi",
        scroll_down: "Défiler vers le bas",
        about_p1: "Je suis un développeur web passionné, dédié à la création de sites web modernes, rapides et conviviaux. Je détiens un diplôme industriel de cinq ans et je suis actuellement étudiant à la Faculté de Technologie Industrielle et d'Énergie – Université de Borg El Arab, avec une spécialisation en Technologie de l'Information (IT).",
        about_p2: "Avec un œil attentif au design et une base solide en pensée systémique, je transforme les idées en expériences numériques engageantes. J'applique ma formation technique pour construire des solutions web modernes et efficaces qui sont non seulement esthétiques mais aussi performantes.",
        stat_p_title: "Pratique",
        stat_p_desc: "Expérience Projet",
        stat_t_title: "Moderne",
        stat_t_desc: "Solutions Tech",
        stat_s_title: "Premium",
        stat_s_desc: "Focus Qualité",
        skills_title: "Compétences & Technologies",
        skills_description: "Outils et technologies avec lesquels je travaille",
        projects_title: "Projets mis en avant",
        projects_description: "Certains de mes travaux récents",
        project1_title: "Plateforme E-commerce",
        project1_description: "Une plateforme de shopping en ligne complète avec panier, authentification utilisateur et intégration de paiement.",
        project2_title: "App de Gestion de Tâches",
        project2_description: "Une application intuitive de gestion de tâches avec glisser-déposer, catégories et niveaux de priorité.",
        project3_title: "Tableau de Bord Météo",
        project3_description: "Une belle application météo avec données en temps réel, prévisions et informations météo basées sur la localisation.",
        btn_live_demo: "Démo en direct",
        btn_github: "GitHub",
        contact_title: "Contactez-nous",
        contact_description: "Travaillons ensemble sur votre prochain projet",
        connect_title: "Connectons-nous",
        connect_description: "Je suis toujours intéressé par de nouveaux projets et opportunités. Que vous ayez une question ou que vous vouliez simplement dire bonjour, n'hésitez pas à nous contacter !",
        label_name: "Votre Nom",
        label_email: "Votre Email",
        label_message: "Votre Message",
        placeholder_name: "Jean Dupont",
        placeholder_email: "jean@example.com",
        placeholder_message: "Parlez-moi de votre projet...",
        btn_send_message: "Envoyer le message"
    }
};

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
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
