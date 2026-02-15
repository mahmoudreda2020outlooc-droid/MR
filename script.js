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
// Contact form handling is moved to initContactForm() at the bottom of the file


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
        project3_title: "LAGHOWSA",
        project3_description: "A premium, high-performance food ordering platform featuring a custom meal builder, real-time tracking, and a mobile-first admin dashboard.",
        project3_feature1: "Ultra-Responsive Design: Adaptive layouts with touch-optimized navigation and a floating cart.",
        project3_feature2: "The Innovation Engine: Interactive 'Build Your Own Meal' system with live price updates.",
        project3_feature3: "Smart Tracking: Modern 'Stepper' live tracking page and digital deposit verification system.",
        project3_feature4: "Admin Powerhouse: Complete mobile-ready dashboard with real-time sync and bulk actions.",
        project3_feature5: "Technical Excellence: Built with Next.js 15 & Framer Motion for Lighthouse 90+ performance.",
        art_print_title: "Art Print",
        art_print_description: "A comprehensive custom printing platform with interactive product catalogs, design uploading, and seamless WhatsApp integration.",
        art_print_feature1: "Interactive product catalog with high-quality mockups",
        art_print_feature2: "Custom design upload with real-time preview",
        art_print_feature3: "Secure Admin dashboard for order management",
        art_print_feature4: "Direct WhatsApp integration for customer support",
        art_print_feature5: "Complaints and suggestions system",
        art_print_feature6: "PWA support for a native-like mobile experience",
        art_print_challenge1: "Solved complex CORS issues for seamless API integration",
        art_print_challenge2: "Implemented advanced mobile caching strategies",
        art_print_challenge3: "Full RTL (Right-to-Left) Arabic language support",
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
        nav_home: "الرئيسية",
        nav_about: "من أنا",
        nav_skills: "مهاراتي",
        nav_projects: "أعمالي",
        nav_portal: "بوابة المشاريع",
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
        project3_title: "لغوصة",
        project3_description: "منصة متطورة لطلب الطعام تتميز بنظام ابتكار الوجبات المخصص، وتتبع الطلبات اللحظي، ولوحة تحكم قوية مصممة للموبايل.",
        project3_feature1: "تصميم متجاوب 100%: واجهات ذكية ومنيو مطور للمس مع سلة مشتريات عائمة.",
        project3_feature2: "وحش الاختراعات: نظام تفاعلي لبناء الوجبة خطوة بخطوة مع تحديث حي للمكونات.",
        project3_feature3: "تتبع ودفع ذكي: صفحة تتبع عصرية بنظام Stepper مع نظام دفع رقمي متطور.",
        project3_feature4: "قوة الإدارة: لوحة تحكم كاملة من الموبايل مع مزامنة لحظية للبيانات.",
        project3_feature5: "التميز التقني: Next.js 15 مع Framer Motion لسرعة فائقة Lighthouse 90+.",
        art_print_title: "Art Print",
        art_print_description: "منصة شاملة للطباعة المخصصة مع كتالوجات منتجات تفاعلية، ورفع التصاميم، وتكامل سلس مع واتساب.",
        art_print_feature1: "كتالوج منتجات تفاعلي مع نماذج عرض عالية الجودة",
        art_print_feature2: "رفع التصاميم المخصصة مع معاينة فورية",
        art_print_feature3: "لوحة تحكم آمنة للأدمن لإدارة الطلبات",
        art_print_feature4: "تكامل مباشر مع واتساب لدعم العملاء",
        art_print_feature5: "نظام للشكاوى والاقتراحات",
        art_print_feature6: "دعم PWA لتجربة مستخدم شبيهة بالتطبيقات المحمولة",
        art_print_challenge1: "حل مشاكل CORS المعقدة لتكامل سلس لواجهة برمجة التطبيقات",
        art_print_challenge2: "تنفيذ استراتيجيات تخزين مؤقت متقدمة للموبايل",
        art_print_challenge3: "دعم كامل للغة العربية (RTL)",
        btn_live_demo: "عرض مباشر",
        btn_github: "جيت هاب",
        contact_title: "ابق على تواصل",
        contact_description: "دعنا نعمل معاً في مشروعك القادم",
        connect_title: "لنتواصل",
        connect_description: "أنا مهتم دائماً بسماع أخبار المشاريع والفرص الجديدة. سواء كان لديك سؤال أو تريد فقط إلقاء التحية، فلا تتردد في التواصل!",
        label_name: "اسمك",
        label_email: "بريدك الإلكتروني",
        label_message: "تفاصيل المشروع",
        placeholder_name: "محمود رضا",
        placeholder_email: "example@mail.com",
        placeholder_message: "أخبرني عن مشروعك...",
        btn_send_message: "إرسال الرسالة",
        LinkedIn: "لينكد إن",
        linkedin_connect: "تواصل معي عبر لينكد إن",
        portal_title: "بوابة المشاريع",
        portal_description: "ابدأ مشروعاً جديداً أو تتبع مشروعاً قائماً",
        request_title: "ابدأ مشروعاً جديداً",
        label_phone: "رقم الهاتف",
        label_project_type: "نوع المشروع",
        btn_submit_request: "إرسال الطلب",
        tracking_title: "تتبع مشروعك",
        label_progress: "نسبة الإنجاز",
        request_success_title: "تم إرسال الطلب!",
        request_success_message: "تم استلام مشروعك بنجاح. احفظ هذا الكود لتتبع التقدم:",
        request_success_note: "سنتواصل معك عبر الهاتف أو البريد الإلكتروني قريباً.",
        tracking_error: "الكود غير صحيح. يرجى المحاولة مرة أخرى.",
        loading: "جاري تحميل التجربة..."
    },
    fr: {
        nav_home: "Accueil",
        nav_about: "À propos",
        nav_skills: "Compétences",
        nav_projects: "Projets",
        nav_portal: "Portail Projet",
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
        project3_title: "Site Web Portfolio",
        project3_description: "Un site portfolio moderne et réactif présentant mes compétences, mes projets et mon expérience. Comprend un support multilingue et des animations fluides.",
        art_print_title: "Art Print",
        art_print_description: "Une plateforme de services d'impression personnalisée complète avec catalogues de produits interactifs, téléchargement de designs et intégration WhatsApp.",
        art_print_feature1: "Catalogue de produits interactif avec maquettes de haute qualité",
        art_print_feature2: "Téléchargement de design personnalisé avec aperçu en temps réel",
        art_print_feature3: "Tableau de bord administrateur sécurisé pour la gestion des commandes",
        art_print_feature4: "Intégration directe de WhatsApp pour le support client",
        art_print_feature5: "Système de plaintes et de suggestions",
        art_print_feature6: "Support PWA pour une expérience mobile fluide",
        art_print_challenge1: "Résolution des problèmes CORS complexes pour une intégration API fluide",
        art_print_challenge2: "Mise en œuvre de stratégies de mise en cache mobile avancées",
        art_print_challenge3: "Support complet de la langue arabe (RTL)",
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
        btn_send_message: "Envoyer le message",
        LinkedIn: "LinkedIn",
        linkedin_connect: "Connectez-vous sur LinkedIn",
        portal_title: "Portail de Projet",
        portal_description: "Démarrer un nouveau projet ou suivre un projet existant",
        request_title: "Démarrer un projet",
        label_phone: "Numéro de téléphone",
        label_project_type: "Type de projet",
        btn_submit_request: "Soumettre",
        tracking_title: "Suivre votre projet",
        label_progress: "Progression",
        request_success_title: "Demande envoyée !",
        request_success_message: "Votre projet a été reçu. Enregistrez ce code pour suivre votre progression :",
        request_success_note: "Nous vous contacterons par téléphone ou e-mail sous peu.",
        tracking_error: "Code incorrect. Veuillez réessayer.",
        loading: "Chargement de l'expérience..."
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
                    alert('Appwrite connection failed (CORS/Permissions). Please ensure your domain is added to authorized platforms in Appwrite Console.');
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
                message
            }
        ).then(() => {
            window.location.href = 'thank-you.html';
        }).catch(err => {
            console.error('Appwrite Contact Error:', err);
            if (err.code === 403) {
                alert('Appwrite connection failed (CORS/Permissions). Please ensure your domain is added to authorized platforms and collection permissions are set correctly.');
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
