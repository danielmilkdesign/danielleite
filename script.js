/* ========================================================
   Daniel Leite Portfolio - Zero-Jank 120FPS Interaction Engine
   GSAP, Lenis Smooth Scroll, Project Filters & Micro-Interactions
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    initLenis();
    initHeroVideoObserver();
    initCursor();
    initEdgeGlowButtons();
    initCanvasBg();
    initGSAPAnimations();
    initProjectFilters();
    initNumberCounters();
    initScrollToTop();
    initMobileMenu();
    initTimelineScroll();
});

/* --------------------------------------------------------
   1. Lenis Smooth Scroll Engine (1:1 Frame Sync, 0 Stutter)
   -------------------------------------------------------- */
let lenis;

function initLenis() {
    if (typeof Lenis === 'undefined') return;

    lenis = new Lenis({
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
    });

    const progressBar = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar-inner');

    lenis.on('scroll', (e) => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.update();
        }
        
        if (progressBar) {
            const progress = (e.scroll / (e.limit || 1)) * 100;
            progressBar.style.width = `${progress}%`;
        }

        if (navbar && window.innerWidth >= 768) {
            if (e.scroll > 40) {
                navbar.classList.add('bg-dark-card/95', 'shadow-2xl', 'border-white/15');
                navbar.classList.remove('bg-dark-card/80', 'border-white/10');
            } else {
                navbar.classList.remove('bg-dark-card/95', 'shadow-2xl', 'border-white/15');
                navbar.classList.add('bg-dark-card/80', 'border-white/10');
            }
        }
    });

    if (typeof gsap !== 'undefined') {
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    }
}

/* --------------------------------------------------------
   2. Hero Video Auto-Pause Observer (Frees GPU on Scroll)
   -------------------------------------------------------- */
function initHeroVideoObserver() {
    const video = document.querySelector('#hero video');
    const heroSection = document.getElementById('hero');
    if (!video || !heroSection || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.1 });

    observer.observe(heroSection);
}

/* --------------------------------------------------------
   3. Interactive Follower Cursor (GPU Accelerated)
   -------------------------------------------------------- */
function initCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    if (!dot || !ring || window.innerWidth < 1024) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isMoving) {
            ringX = mouseX;
            ringY = mouseY;
            isMoving = true;
        }
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }, { passive: true });

    function renderCursor() {
        if (isMoving) {
            const dx = mouseX - ringX;
            const dy = mouseY - ringY;
            ringX += dx * 0.2;
            ringY += dy * 0.2;
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        }
        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const interactives = document.querySelectorAll('a, button, input, textarea, .filter-tab, .edge-glow-btn, .edge-glow-btn-sm');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering-interactive'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering-interactive'));
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => document.body.classList.add('hovering-case'));
        card.addEventListener('mouseleave', () => document.body.classList.remove('hovering-case'));
    });
}

/* --------------------------------------------------------
   4. Edge Glow Button Light Tracking (No Layout Thrashing)
   -------------------------------------------------------- */
function initEdgeGlowButtons() {
    const glowElements = document.querySelectorAll('.edge-glow-btn, .edge-glow-btn-sm, .glow-card-border');
    
    glowElements.forEach(el => {
        let rect = null;

        el.addEventListener('mouseenter', () => {
            rect = el.getBoundingClientRect();
        }, { passive: true });

        el.addEventListener('mousemove', (e) => {
            if (!rect) rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            el.style.setProperty('--x', `${x}px`);
            el.style.setProperty('--y', `${y}px`);
        }, { passive: true });

        el.addEventListener('mouseleave', () => {
            rect = null;
            el.style.setProperty('--x', `50%`);
            el.style.setProperty('--y', `50%`);
        });
    });
}

/* --------------------------------------------------------
   5. Ambient Background Canvas (Zero-Allocation Loop)
   -------------------------------------------------------- */
function initCanvasBg() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }, 250);
    }, { passive: true });

    const particles = Array.from({ length: 10 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.2 + 0.05
    }));

    let isDocumentVisible = true;
    document.addEventListener('visibilitychange', () => {
        isDocumentVisible = !document.hidden;
    });

    function draw() {
        if (!isDocumentVisible) {
            requestAnimationFrame(draw);
            return;
        }

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 6.283185307179586);
            ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
            ctx.fill();
        }

        requestAnimationFrame(draw);
    }
    draw();
}

/* --------------------------------------------------------
   6. Interactive Project Filtering
   -------------------------------------------------------- */
function initProjectFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterTabs.length || !projectCards.length) return;

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.getAttribute('data-filter');

            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                const categories = category.split(' ');

                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    if (typeof gsap !== 'undefined') {
                        gsap.fromTo(card, 
                            { opacity: 0, y: 15 }, 
                            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
                        );
                    }
                } else {
                    card.style.display = 'none';
                }
            });

            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        });
    });
}

/* --------------------------------------------------------
   7. Animated Numerical Counters
   -------------------------------------------------------- */
function initNumberCounters() {
    const counters = document.querySelectorAll('.metric-counter');
    if (!counters.length || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target')) || 0;
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';

        gsap.to(counter, {
            scrollTrigger: {
                trigger: counter,
                start: 'top 90%',
                once: true
            },
            innerHTML: target,
            duration: 1.2,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            onUpdate: function() {
                counter.innerHTML = `${prefix}${Math.round(this.targets()[0].innerHTML)}${suffix}`;
            }
        });
    });
}

/* --------------------------------------------------------
   8. GSAP Scroll Entrance
   -------------------------------------------------------- */
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-reveal', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.05
    });

    const headers = document.querySelectorAll('.section-header');
    headers.forEach(header => {
        gsap.from(header, {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: header,
                start: 'top 85%'
            }
        });
    });

    const stepCards = document.querySelectorAll('.process-step');
    if (stepCards.length) {
        gsap.from(stepCards, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#process-grid',
                start: 'top 85%'
            }
        });
    }
}

/* --------------------------------------------------------
   9. Timeline Horizontal Scroll
   -------------------------------------------------------- */
function initTimelineScroll() {
    const container = document.getElementById('timeline-container');
    const section = document.getElementById('experience');
    if (!container || !section) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && window.innerWidth >= 1024) {
        gsap.registerPlugin(ScrollTrigger);

        const getScrollAmount = () => {
            const containerWidth = container.scrollWidth;
            const windowWidth = window.innerWidth;
            return Math.max(0, containerWidth - windowWidth + 120);
        };

        gsap.to(container, {
            x: () => -getScrollAmount(),
            ease: "none",
            scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: 0.6,
                start: "top top",
                end: () => "+=" + (getScrollAmount() + 300),
                invalidateOnRefresh: true
            }
        });
    }
}

/* --------------------------------------------------------
   10. Scroll To Top Engine
   -------------------------------------------------------- */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-to-top');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            scrollTopBtn.classList.add('opacity-100', 'pointer-events-auto');
        } else {
            scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
            scrollTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
        }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        if (lenis) {
            lenis.scrollTo(0, { duration: 0.8 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

/* --------------------------------------------------------
   11. Mobile Menu Engine
   -------------------------------------------------------- */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-nav-link');

    if (!btn || !menu) return;

    const openMenu = () => {
        menu.classList.remove('translate-x-full');
        document.body.classList.add('overflow-hidden');
        if (lenis) lenis.stop();
    };

    const closeMenu = () => {
        menu.classList.add('translate-x-full');
        document.body.classList.remove('overflow-hidden');
        if (lenis) lenis.start();
    };

    btn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* --------------------------------------------------------
   12. Case Study Modal System
   -------------------------------------------------------- */
const projectsData = {
    recruitersys: {
        badge: "Recrutamento Tech & B2B SaaS",
        title: "RecruiterSys – O Ecossistema de Recrutamento Tech",
        subtitle: "Eliminando o gap de comunicação e a ineficiência técnica no recrutamento de profissionais de TI",
        role: "Senior Product Designer & Lead de UX/UI",
        coverImage: "assets/CAPA RECRUITER.webp",
        gallery: ["assets/mock 1.webp"],
        problem: {
            title: "01. O Problema: O Abismo no Recrutamento Tech",
            items: [
                "Para o Recrutador: Excesso de candidatos sem o stack técnico necessário, gerando fadiga na triagem manual.",
                "Para o Candidato (TI): Falta de transparência. O sentimento constante de enviar currículos para um 'buraco negro'.",
                "Contexto de Mercado: Plataformas genéricas não falam a língua do desenvolvedor (GitHub, repositórios, stack real)."
            ]
        },
        process: {
            title: "02. O Processo (Double Diamond)",
            fase1: "Fase 1: Descobrir — Entrevistas com Tech Recruiters para entender o fluxo de decisão (Stack Principal, Anos de Experiência e Localização).",
            fase2: "Fase 2: Definir — Convergimos os dados em uma estratégia de Ecossistema Dual: Dashboard ATS para recrutadores e App Mobile para candidatos.",
            fase3: "Fase 3: Desenvolver — Criação de um Design System robusto com Dark Theme e acentos tecnológicos.",
            northStar: "North Star Metric: Reduzir a fricção na aplicação e garantir feedback em cada etapa do funil."
        },
        solutions: [
            {
                title: "Recruiter Dashboard (B2B)",
                desc: "Foco: Alta Densidade de Dados e Gestão Ágil. Pipeline Visual em Kanban customizado para o fluxo tech, Card de Candidato Inteligente e Analytics em tempo real."
            },
            {
                title: "App de Candidatos (B2C)",
                desc: "Foco: Experiência Premium e Carreira. Perfil Tech-Centric com destaque para repositórios e 'The Tracker' (linha do tempo de feedback em tempo real)."
            }
        ],
        results: "O RecruiterSys entrega uma solução onde o design atua como mediador de conflitos de mercado: organizando o caos para o negócio e respeitando o tempo do profissional de TI.",
        tags: ["UX Strategy", "Double Diamond", "B2B Dashboard", "Design System", "Mobile App"]
    },
    diario: {
        badge: "Aviação Geral & Compliance ANAC",
        title: "Diário de Bordo Aeronáutico (Hóruz eDB)",
        subtitle: "Plataforma estratégica de dados para modernizar o diário de bordo da aviação geral no Brasil",
        role: "Product Designer & CDO",
        coverImage: "assets/HORUZ.webp",
        gallery: ["assets/diario-edb-horuz.webp", "assets/diario-cockpit.webp"],
        problem: {
            title: "01. O Desafio Operacional e Regulatório",
            items: [
                "Setor de aviação geral no Brasil (especialmente Região Norte) ainda operava com processos analógicos e ineficientes em papel.",
                "Diário de Bordo manual gerava riscos severos de conformidade ANAC, lentidão operacional e alto custo logístico de armazenamento físico.",
                "Ausência de comunicação efetiva entre aeronaves privadas e órgãos de governo em emergências (como combate a incêndios florestais)."
            ]
        },
        process: {
            title: "02. Estratégia de Design & Operação em Cabine",
            fase1: "Conformidade como Experiência: Validações em tempo real segundo normas estritas da ANAC.",
            fase2: "Ergonomia de Cabine: Interface desenhada para uso em Tablet 10.4'' com alta legibilidade e contraste sob luz solar direta.",
            fase3: "Green UX: Metrificação de pegada de carbono (GEE) no fluxo de voo para converter dados operacionais em ativos ambientais."
        },
        solutions: [
            {
                title: "Plataforma Hóruz eDB",
                desc: "Autenticação segura, armazenamento centralizado, operação offline autorizada pela ANAC e eliminação completa de papel."
            },
            {
                title: "Suporte Emergencial & Combate a Queimadas",
                desc: "Integração de mensagens em tempo real para mobilizar aeronaves privadas no combate a incêndios florestais na Amazônia."
            }
        ],
        results: "Start-up pioneira da Região Norte em eDB, eliminação total de formulários físicos, redução de custos logísticos e autorização regulatória oficial da ANAC.",
        tags: ["Aviação Geral", "Compliance ANAC", "Green UX", "Tablet Cockpit UX", "SaaS B2B"]
    },
    petplant: {
        badge: "IoT B2C & Monitoramento Botânico",
        title: "Pet Plant App – UX Botânica e Monitoramento Inteligente",
        subtitle: "Consolidação de tecnologia IoT com uma interface de gestão biológica completa",
        role: "Product Designer Sênior",
        coverImage: "assets/MOCK PET PLANT.webp",
        gallery: ["assets/petplant1.webp", "assets/petplant2.webp"],
        problem: {
            title: "01. O Desafio: A Natureza 'Invisível' das Plantas",
            items: [
                "Sem dados concretos, o cultivo doméstico depende da tentativa e erro, gerando perda frequente de plantas por falta de irrigação ou luz adequada.",
                "Necessidade de transformar dados complexos de sensores IoT (umidade, luz, fertilidade, temperatura) em ações simples e intuitivas."
            ]
        },
        process: {
            title: "02. Decisões de Arquitetura & UX",
            fase1: "Dashboard de Status Vital: Leitura rápida e visual das métricas biológicas da planta em tempo real.",
            fase2: "Alertas Baseados no Status do Sensor: Lembretes inteligentes ativados apenas quando os sensores detectam necessidade real.",
            fase3: "Histórico & Diário de Cultivo: Registro cronológico de saúde e crescimento para acompanhamento da evolução."
        },
        solutions: [
            {
                title: "Ecossistema de Monitoramento",
                desc: "Dashboard vital completo, gestão de tarefas de irrigação/adubação, catálogo integrado de espécies botânicas e gestão multidisciplinar de sensores."
            }
        ],
        results: "Redução do desperdício de água e insumos, aumento na taxa de sobrevivência das plantas e transição do cultivo para uma rotina educativa e gratificante.",
        tags: ["IoT B2C", "Product Design", "UX Botânica", "Mobile App", "Sensors Interface"]
    },
    ailab: {
        badge: "IoT & Automação Residencial",
        title: "VentHome – Além do Vento",
        subtitle: "Transformando um eletrodoméstico analógico em um serviço personalizado de ventilação inteligente",
        role: "Product Designer (UX/UI)",
        coverImage: "assets/VENTIHOME.webp",
        gallery: ["assets/mockupventihome.webp"],
        problem: {
            title: "01. O Desafio: Humanizando a IoT",
            items: [
                "Como um ventilador convencional poderia se adaptar organicamente ao ritmo de vida moderno no clima desafiador de Manaus?",
                "Controles físicos tradicionais oferecem níveis rígidos (Fraco, Médio, Forte) que raramente atendem às necessidades reais dos usuários."
            ]
        },
        process: {
            title: "02. UX Strategy & Abordagem Contextual",
            fase1: "Imersão & Empatia: Entendimento de que a ventilação é situacional (dormir, praticar exercícios indoor, trabalhar em home office).",
            fase2: "Design Centrado no Contexto: Criação de perfis automatizados como 'Modo Gamer' e 'Modo Bike' para adequar a curva de ar ao ambiente.",
            fase3: "Minimalismo Visual: Layout limpo com uso estratégico de whitespace para operação sem esforço visual em ambientes escuros."
        },
        solutions: [
            {
                title: "Controle Inteligente & Curva de Ventilação",
                desc: "Módulo mobile via Bluetooth com status onipresente, presets situacionais e modo noturno focado na preservação do ciclo circadiano."
            }
        ],
        results: "Elevou o valor percebido de um produto commoditizado, oferecendo autonomia ao usuário e criando um diferencial competitivo claro no mercado de hardware.",
        tags: ["IoT UX Strategy", "Hardware to Software", "Contextual Design", "Mobile UI"]
    }
};

function openCaseModal(id) {
    const modal = document.getElementById('case-modal');
    const content = document.getElementById('modal-content');
    const data = projectsData[id];

    if (!modal || !content || !data) return;

    let solutionsHTML = data.solutions.map(s => `
        <div class="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h4 class="text-base font-heading font-bold text-white">${s.title}</h4>
            <p class="text-slate-300 text-sm leading-relaxed">${s.desc}</p>
        </div>
    `).join('');

    let problemItemsHTML = data.problem.items.map(item => `
        <li class="flex items-start gap-2 text-slate-300 text-sm">
            <span class="text-brand-400 font-bold mt-0.5">•</span>
            <span>${item}</span>
        </li>
    `).join('');

    let galleryHTML = data.gallery ? data.gallery.map(imgSrc => `
        <div class="rounded-xl overflow-hidden border border-white/10 shadow-lg">
            <img src="${imgSrc}" alt="Interface Showcase" class="w-full h-auto object-cover" loading="lazy">
        </div>
    `).join('') : '';

    content.innerHTML = `
        <div class="space-y-6">
            <div class="flex flex-wrap gap-2">
                <span class="px-3.5 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-semibold">${data.badge}</span>
                <span class="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-semibold">${data.role}</span>
            </div>
            
            <div class="space-y-2">
                <h2 class="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight">${data.title}</h2>
                <p class="text-cyan-400 text-base font-medium">${data.subtitle}</p>
            </div>

            <div class="rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <img src="${data.coverImage}" alt="${data.title}" class="w-full h-auto object-cover" loading="lazy">
            </div>

            <div class="h-px bg-white/10 w-full"></div>

            <div class="space-y-4">
                <h3 class="text-lg font-heading font-bold text-white">${data.problem.title}</h3>
                <ul class="space-y-2">
                    ${problemItemsHTML}
                </ul>
            </div>

            <div class="space-y-4">
                <h3 class="text-lg font-heading font-bold text-white">${data.process.title}</h3>
                <div class="space-y-2 text-sm text-slate-300">
                    <p>${data.process.fase1}</p>
                    <p>${data.process.fase2}</p>
                    <p>${data.process.fase3}</p>
                    ${data.process.northStar ? `<p class="text-brand-300 font-medium pt-1">${data.process.northStar}</p>` : ''}
                </div>
            </div>

            <div class="space-y-4">
                <h3 class="text-lg font-heading font-bold text-white">Soluções Entregues</h3>
                <div class="grid gap-3">
                    ${solutionsHTML}
                </div>
            </div>

            ${galleryHTML ? `
            <div class="space-y-4 pt-2">
                <h3 class="text-lg font-heading font-bold text-white">Visual & Screenshots</h3>
                <div class="grid gap-4">
                    ${galleryHTML}
                </div>
            </div>
            ` : ''}

            <div class="p-5 rounded-2xl bg-brand-950/40 border border-brand-500/30 space-y-2">
                <h3 class="text-base font-heading font-bold text-brand-300">Resultados & Impacto</h3>
                <p class="text-slate-300 text-sm leading-relaxed">${data.results}</p>
            </div>

            <div class="flex flex-wrap gap-2 pt-2">
                ${data.tags.map(t => `<span class="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-sans">${t}</span>`).join('')}
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('active'), 10);

    if (lenis) lenis.stop();
}

function closeCaseModal() {
    const modal = document.getElementById('case-modal');
    if (!modal) return;

    modal.classList.remove('active');
    setTimeout(() => modal.classList.add('hidden'), 250);

    if (lenis) lenis.start();
}
