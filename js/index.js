// ============================================================================
// INDEX.JS - Funcionalidades principales del sitio
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initButtons();
  initScrollAnimations();
});

/**
 * Inicializar navbar activo
 */
function initNavbar() {
  const navLinks = document.querySelectorAll('.navbar__link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Inicializar interactividad de botones
 */
function initButtons() {
  const ctaButtons = document.querySelectorAll('.btn--primary, .cta .btn--large');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.textContent.includes('Planificar')) {
        e.preventDefault();
        showModal('Planificar Viaje', 'Tu plataforma de viajes en desarrollo. ¡Pronto disponible!');
      }
    });
  });

  const exploreBtn = document.querySelector('.navbar__cta');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', function() {
      document.querySelector('.featured-destinations').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/**
 * Animaciones al hacer scroll
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll(
    '.service-card, .destination-card, .testimonial-card, .statistic-item__number'
  );

  elements.forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
  });
}

/**
 * Modal simple
 */
function showModal(title, message) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal__content">
      <div class="modal__header">
        <h2>${title}</h2>
        <button class="modal__close">&times;</button>
      </div>
      <div class="modal__body">
        <p>${message}</p>
      </div>
      <div class="modal__footer">
        <button class="modal__btn">Cerrar</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('.modal__close');
  const footerBtn = modal.querySelector('.modal__btn');

  const closeModal = () => {
    modal.remove();
  };

  closeBtn.addEventListener('click', closeModal);
  footerBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// Agregar estilos de animación dinámicamente
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .modal__content {
    background: white;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
  }

  .modal__header {
    padding: 24px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal__header h2 {
    margin: 0;
    font-size: 1.3rem;
    color: #1a1a1a;
  }

  .modal__close {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #999;
    transition: color 0.2s ease;
  }

  .modal__close:hover {
    color: #1a1a1a;
  }

  .modal__body {
    padding: 24px;
  }

  .modal__body p {
    color: #666;
    line-height: 1.6;
    margin: 0;
  }

  .modal__footer {
    padding: 24px;
    border-top: 1px solid #e8e8e8;
    text-align: right;
  }

  .modal__btn {
    padding: 10px 24px;
    background: linear-gradient(135deg, #FF6B6B, #FF8E72);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .modal__btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 107, 107, 0.3);
  }
`;
document.head.appendChild(style);
