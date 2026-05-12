document.addEventListener('DOMContentLoaded', () => {
    // 1. Observador para revelado de elementos al hacer scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Efecto de Navbar en Scroll
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(4, 13, 26, 0.95)';
            navbar.style.padding = '1rem 3rem';
        } else {
            navbar.style.background = 'rgba(4, 13, 26, 0.8)';
            navbar.style.padding = '1.5rem 3rem';
        }
    });

    // 3. Galería Interactiva (Lightbox)
    const galleryImages = document.querySelectorAll('.galeria-impacto img');
    
    // Crear el contenedor de la ventana emergente (Modal)
    const modal = document.createElement('div');
    modal.id = 'gallery-modal';
    Object.assign(modal.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(4, 13, 26, 0.95)',
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '2000',
        backdropFilter: 'blur(8px)',
        cursor: 'zoom-out',
        transition: 'opacity 0.4s ease'
    });

    // Crear el contenedor de la imagen dentro del modal
    const modalContent = document.createElement('img');
    Object.assign(modalContent.style, {
        maxWidth: '85%',
        maxHeight: '85%',
        border: '2px solid #00e5d1',
        boxShadow: '0 0 30px rgba(0, 229, 209, 0.3)',
        borderRadius: '4px',
        cursor: 'default'
    });

    // Botón de cerrar
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    Object.assign(closeBtn.style, {
        position: 'absolute',
        top: '20px',
        right: '40px',
        color: '#00e5d1',
        fontSize: '40px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: '0.3s'
    });

    modal.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Eventos para abrir el modal
    galleryImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            modal.style.display = 'flex';
            modal.style.opacity = '0';
            modalContent.src = img.src;
            // Pequeño delay para la transición de opacidad
            setTimeout(() => { modal.style.opacity = '1'; }, 10);
        });
    });

    // Eventos para cerrar el modal
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => { modal.style.display = 'none'; }, 400);
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target !== modalContent) closeModal();
    });

    // 4. Manejo del Formulario
    const actionForm = document.getElementById('subscription-form');
    if (actionForm) {
        actionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = actionForm.querySelector('button');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            setTimeout(() => {
                actionForm.innerHTML = `
                    <div class="form-success" style="color: #00e5d1; padding: 2rem; border: 1px solid #00e5d1; background: rgba(0,229,209, 0.05);">
                        <h3 style="margin-bottom: 0.5rem;">¡Gracias por unirte!</h3>
                        <p>Tu compromiso con el océano es el primer paso para el cambio.</p>
                    </div>
                `;
            }, 1500);
        });
    }

    // 5. Marquesina Inferior (Ticker)
    const marqueeContainer = document.createElement('div');
    Object.assign(marqueeContainer.style, {
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100%',
        background: 'rgba(4, 13, 26, 0.9)',
        color: '#ffffff',
        padding: '10px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        zIndex: '1000',
        borderTop: '1px solid #00e5d1'
    });

    const marqueeText = document.createElement('div');
    marqueeText.textContent = "bienvenidos, gracias por unirte a la causa • protegiendo nuestros mares • acción industrial responsable • ";
    marqueeText.textContent += marqueeText.textContent;
    
    Object.assign(marqueeText.style, {
        display: 'inline-block',
        position: 'relative',
        fontFamily: 'DM Sans, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        fontSize: '0.8rem'
    });

    marqueeContainer.appendChild(marqueeText);
    document.body.appendChild(marqueeContainer);

    let position = 0;
    const speed = 1.5;

    function animateMarquee() {
        position -= speed;
        if (Math.abs(position) >= marqueeText.offsetWidth / 2) {
            position = 0;
        }
        marqueeText.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animateMarquee);
    }

    animateMarquee();
});

// Generador de Medusas
function createJellyfish() {
  const container = document.getElementById('jellyfish-container');
  const count = 5; // Número de medusas
  
  for (let i = 0; i < count; i++) {
    const jelly = document.createElement('div');
    jelly.className = 'jellyfish';
    // Se posicionan aleatoriamente en la pantalla
    jelly.style.left = Math.random() * 100 + 'vw';
    jelly.style.top = Math.random() * 100 + 'vh';
    // Se les asigna una duración de animación distinta para naturalidad
    jelly.style.animationDuration = (6 + Math.random() * 4) + 's';
    jelly.style.opacity = 0.2 + Math.random() * 0.3;
    
    // Aquí puedes insertar un SVG simple de medusa
    jelly.innerHTML = `<svg width="40" height="60" viewBox="0 0 40 60"><path d="M20,0 C10,0 0,10 0,25 L0,30 L40,30 L40,25 C40,10 30,0 20,0" fill="var(--foam)" opacity="0.6"/></svg>`;
    container.appendChild(jelly);
  }
}

// Iniciar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  createJellyfish();
});