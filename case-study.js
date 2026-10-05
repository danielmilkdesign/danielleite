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

  // Drag-to-scroll utility for interactive viewports
  function setupDragToScroll(el) {
    if (!el) return;
    let isDown = false;
    let startX, scrollLeft, startY, scrollTop;

    el.addEventListener('mousedown', (e) => {
      isDown = true;
      el.classList.add('is-dragging');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      startY = e.pageY - el.offsetTop;
      scrollTop = el.scrollTop;
    });

    const stopDrag = () => {
      isDown = false;
      el.classList.remove('is-dragging');
    };

    el.addEventListener('mouseleave', stopDrag);
    el.addEventListener('mouseup', stopDrag);

    el.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walkX = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walkX;

      const y = e.pageY - el.offsetTop;
      const walkY = (y - startY) * 1.5;
      el.scrollTop = scrollTop - walkY;
    });
  }

  const flowViewport = document.getElementById('flow-viewport');
  if (flowViewport) {
    setupDragToScroll(flowViewport);
  }

  const flowModalContent = document.getElementById('flow-modal-content');
  if (flowModalContent) {
    setupDragToScroll(flowModalContent);
  }

  // Flow Fullscreen Lightbox Modal
  const flowModal = document.getElementById('flow-modal');
  const openFlowBtn = document.getElementById('open-flow-modal');
  const closeFlowBtn = document.getElementById('close-flow-modal');

  function openFlowModal() {
    if (!flowModal) return;
    flowModal.classList.add('is-open');
    flowModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeFlowModal() {
    if (!flowModal) return;
    flowModal.classList.remove('is-open');
    flowModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openFlowBtn) {
    openFlowBtn.addEventListener('click', openFlowModal);
  }
  if (flowViewport) {
    // Double click or clicking directly on the image also opens high-res modal
    flowViewport.addEventListener('dblclick', openFlowModal);
  }
  if (closeFlowBtn) {
    closeFlowBtn.addEventListener('click', closeFlowModal);
  }
  if (flowModal) {
    flowModal.addEventListener('click', (e) => {
      if (e.target === flowModal || e.target === flowModalContent) {
        closeFlowModal();
      }
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && flowModal.classList.contains('is-open')) {
        closeFlowModal();
      }
    });
  }
});
