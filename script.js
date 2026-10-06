document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Language Toggle Functionality (Arabic / English)
    const langToggleBtn = document.getElementById('lang-toggle');
    const langTextSpan = langToggleBtn.querySelector('.lang-text');
    let currentLang = localStorage.getItem('lang') || 'ar';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        htmlElement.setAttribute('lang', lang);
        htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        langTextSpan.textContent = lang === 'ar' ? 'EN' : 'AR';

        document.querySelectorAll('[data-ar]').forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = text;
                } else if (el.tagName === 'SELECT') {
                    // Update default option if needed
                } else {
                    el.textContent = text;
                }
            }
        });
    }

    setLanguage(currentLang);

    langToggleBtn.addEventListener('click', () => {
        setLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.getElementById('navbar');

    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuBtn.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuBtn.classList.remove('open');
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Contact Form Handling & WhatsApp Integration
    const projectForm = document.getElementById('project-form');
    
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const country = document.getElementById('country').value.trim();
        const city = document.getElementById('city').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const email = document.getElementById('email').value.trim();
        const projectType = document.getElementById('project-type').value;
        const projectTitle = document.getElementById('project-title').value.trim();
        const projectNature = document.getElementById('project-nature').value.trim();
        const projectSummary = document.getElementById('project-summary').value.trim();
        const contactMethod = document.getElementById('contact-method').value;

        // Construct WhatsApp Message format
        let message = `🚀 *طلب مشروع / استفسار جديد*\n\n`;
        message += `👤 *الاسم:* ${firstName} ${lastName}\n`;
        message += `🌍 *الدولة والمدينة:* ${country} - ${city}\n`;
        message += `📱 *رقم الهاتف:* ${phone}\n`;
        message += `💬 *رقم الواتساب:* ${whatsapp}\n`;
        message += `📧 *البريد الإلكتروني:* ${email}\n`;
        message += `🛠️ *نوع المشروع:* ${projectType}\n`;
        message += `📌 *عنوان المشروع:* ${projectTitle}\n`;
        message += `💡 *طبيعة المشروع:* ${projectNature}\n`;
        message += `📝 *نبذة مختصرة:* ${projectSummary}\n`;
        message += `📞 *طريقة التواصل المفضلة:* ${contactMethod}\n`;

        const encodedMessage = encodeURIComponent(message);
        const targetWhatsAppNumber = '970567728087';
        const whatsappURL = `https://wa.me/${targetWhatsAppNumber}?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappURL, '_blank');
    });
});
