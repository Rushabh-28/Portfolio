/* ==========================================================================
   RUSHABH PATIL PORTFOLIO - MAIN JAVASCRIPT LOGIC (NEO-BRUTALISM)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. TERMINAL TYPING SIMULATOR
  const typingCmd = document.getElementById('typing-cmd');
  const commands = [
    'python manage.py runserver',
    'php -S localhost:8000',
    'git commit -m "Build amazing projects"',
    'npm run dev',
    'echo "Hello World from Rushabh Patil!"'
  ];
  let cmdIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeTerminal() {
    if (!typingCmd) return;
    const currentCmd = commands[cmdIdx];

    if (isDeleting) {
      typingCmd.textContent = currentCmd.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingCmd.textContent = currentCmd.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 30 : 70;

    if (!isDeleting && charIdx === currentCmd.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      cmdIdx = (cmdIdx + 1) % commands.length;
      typeSpeed = 400;
    }

    setTimeout(typeTerminal, typeSpeed);
  }
  typeTerminal();

  // 2. THEME TOGGLE
  const themeBtn = document.getElementById('theme-btn');
  const themeIcon = document.getElementById('theme-icon');
  const htmlEl = document.documentElement;

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', newTheme);
      themeIcon.className = newTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });
  }

  // 3. MOBILE MENU TOGGLE
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // 4. PROJECT FILTERING
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });

  // 5. PROJECT DETAILS MODAL
  const projectData = {
    'urban': {
      title: 'Urban Service Website',
      category: 'Python & Django Web Platform',
      tech: ['Python', 'Django', 'SQLite', 'HTML5', 'CSS3', 'JavaScript'],
      desc: 'Built a service-booking web platform using Python and the Django framework, with modules to manage service listings and user requests.',
      features: [
        'Modular Django app architecture separating listing management, service categories, and user bookings.',
        'User dashboard for searching service providers, requesting appointments, and checking status.',
        'Admin backend control panel for managing vendors, listings, and customer accounts.'
      ],
      github: 'https://github.com/Rushabh-28'
    },
    'hotel': {
      title: 'Hotel Management System',
      category: 'PHP & MySQL Full-Stack Application',
      tech: ['PHP', 'MySQL', 'XAMPP', 'JavaScript', 'CRUD Operations'],
      desc: 'Engineered a comprehensive Hotel Management System with PHP and a local XAMPP MySQL server.',
      features: [
        'Complete CRUD functionality for room reservations, customer records, and staff schedules.',
        'Relational MySQL database schema designed for efficient querying and data integrity.',
        'Dashboard for real-time room availability, check-in, and check-out management.'
      ],
      github: 'https://github.com/Rushabh-28'
    },
    'sustainable': {
      title: 'Sustainable Rush Website',
      category: 'HTML & AI/ML Eco Recommendation System',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'AI/ML Concepts'],
      desc: 'Created a sustainability-focused website in HTML integrated with AI/ML concepts to deliver smart, eco-conscious recommendations.',
      features: [
        'Carbon footprint calculator evaluating daily user energy consumption.',
        'Smart AI recommendation engine providing tailored eco-conscious advice.',
        'Interactive UI dashboard promoting green alternatives and environmental awareness.'
      ],
      github: 'https://github.com/Rushabh-28'
    }
  };

  const modalOverlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-modal');
      const data = projectData[key];
      if (!data) return;

      modalBody.innerHTML = `
        <span class="badge-pill bg-cyan" style="margin-bottom: 0.8rem;">${data.category}</span>
        <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 0.8rem;">${data.title}</h2>
        <p style="font-size: 1rem; color: #4b5563; margin-bottom: 1.2rem;">${data.desc}</p>
        
        <h4 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 0.5rem;">Key Architecture & Features:</h4>
        <ul style="padding-left: 1.2rem; margin-bottom: 1.5rem; font-size: 0.95rem;">
          ${data.features.map(f => `<li style="margin-bottom: 0.4rem;">${f}</li>`).join('')}
        </ul>

        <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 0.5rem;">Tech Stack:</h4>
        <div class="pill-tags" style="margin-bottom: 1.5rem;">
          ${data.tech.map(t => `<span class="pill" style="background:#ffe600; color:#000;">${t}</span>`).join('')}
        </div>

        <a href="${data.github}" target="_blank" class="neo-btn btn-black btn-full"><i class="fa-brands fa-github"></i> VIEW CODE ON GITHUB</a>
      `;

      modalOverlay.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => modalOverlay.classList.remove('active'));
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
  }

  // 6. TOAST & COPY TO CLIPBOARD
  const toast = document.getElementById('toast');
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('sp2277933@gmail.com');
      showToast('⚡ Email copied: sp2277933@gmail.com');
    });
  }

  const copyEmailRow = document.getElementById('copy-email-row');
  if (copyEmailRow) {
    copyEmailRow.querySelector('.copy-icn').addEventListener('click', () => {
      navigator.clipboard.writeText('sp2277933@gmail.com');
      showToast('⚡ Email copied to clipboard!');
    });
  }

  const copyPhoneRow = document.getElementById('copy-phone-row');
  if (copyPhoneRow) {
    copyPhoneRow.querySelector('.copy-icn').addEventListener('click', () => {
      navigator.clipboard.writeText('6351306136');
      showToast('⚡ Phone number copied to clipboard!');
    });
  }

  // 7. FORM SUBMIT
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      showToast(`🔥 Thanks ${name}! Message sent successfully.`);
      contactForm.reset();
    });
  }
});
