const typingText = document.getElementById('typing-text');
if (typingText) {
    const names = ['Rizqi Ikhwani', 'Web Developer', 'Mahasiswa SI'];
    let nameIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentName = names[nameIndex];
        if (isDeleting) {
            typingText.textContent = currentName.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentName.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === currentName.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            nameIndex = (nameIndex + 1) % names.length;
            delay = 500;
        }
        setTimeout(typeEffect, delay);
    }
    typeEffect();
}

const themeToggleBtn = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = 'Light Mode';
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeToggleBtn.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggleBtn.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        let isValid = true;
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;


        if (name.trim() === '') {
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('name-error').style.display = 'none';
        }

        if (email.trim() === '' || !email.includes('@')) {
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('email-error').style.display = 'none';
        }

        if (message.trim() === '') {
            document.getElementById('message-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('message-error').style.display = 'none';
        }

        if (isValid) {
            alert('Pesan berhasil dikirim! Terima kasih.');
            contactForm.reset();
        }
    });
}