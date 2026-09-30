// Case Study Interactive Features & Menu
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-toggle-btn');
  const menu = document.getElementById('main-menu');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      document.body.classList.toggle('menu-open', isOpen);
      menu.setAttribute('aria-hidden', !isOpen);
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        document.body.classList.remove('menu-open');
        menu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // Edge Glow Button Light Tracking
  const glowButtons = document.querySelectorAll('.edge-glow-btn');
  glowButtons.forEach(btn => {
    let rect = null;
    btn.addEventListener('mouseenter', () => {
      rect = btn.getBoundingClientRect();
    }, { passive: true });

    btn.addEventListener('mousemove', (e) => {
      if (!rect) rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty('--x', `${x}px`);
      btn.style.setProperty('--y', `${y}px`);
    }, { passive: true });

    btn.addEventListener('mouseleave', () => {
      rect = null;
      btn.style.setProperty('--x', '50%');
      btn.style.setProperty('--y', '50%');
    });
  });

  // Top scroll progress bar
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    }, { passive: true });
  }
});
