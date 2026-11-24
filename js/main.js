// Portfolio Aaron Bignon Romuald DOSSOU - Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileBackdrop = document.getElementById('mobile-backdrop');

  function openMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMenu);

  // Close menu when clicking navigation links inside mobile menu
  const mobileLinks = document.querySelectorAll('#mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Contact Form Handling with EmailJS
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  emailjs.init({
    publicKey: 'n6LNvLqzQmbES1aFF'
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Envoi en cours...';

    try {
      await emailjs.sendForm(
        'service_77w3m3e',
        'template_pjzdw8v',
        contactForm
      );

      alert('Merci ! Votre message a été envoyé avec succès.');
      contactForm.reset();

    } catch (error) {
      console.error('Erreur EmailJS :', error);
      alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");

    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

  // Interactive Filter for Projects Hub if present
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('bg-navy', 'text-white');
          b.classList.add('bg-surface', 'text-navy/70');
        });
        btn.classList.add('bg-navy', 'text-white');
        btn.classList.remove('bg-surface', 'text-navy/70');

        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
