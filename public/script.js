/* ========================================================
   Daniel Leite Portfolio - GSAP, Lenis & Cursor Glow Engine
   "No AI Slop" - Authentic Portfolio Showcase
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    initLenis();
    initCursor();
    initEdgeGlowButtons();
    initCanvasBg();
    initGSAPAnimations();
    initScrollToTop();
    initMobileMenu();
    initTimelineScroll();
});

window.addEventListener('load', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});

/* --------------------------------------------------------
   Timeline Wheel Scroll Handler
   -------------------------------------------------------- */
function initTimelineScroll() {
    const container = document.getElementById('timeline-container');
    const section = document.getElementById('experience');
    if (!container || !section) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const cards = gsap.utils.toArray('.timeline-card');
        if (!cards.length) return;

        // Limpa instâncias antigas se houver
        ScrollTrigger.getAll().forEach(st => {
            if (st.vars && st.vars.trigger === section) st.kill();
        });

        const getScrollAmount = () => {
            const containerWidth = container.scrollWidth;
            const windowWidth = window.innerWidth;
            // Garante margem de respiro suficiente para que o último card fique 100% visível na tela antes de soltar a trava de pin
            const extraPadding = windowWidth < 768 ? 40 : 250;
            return Math.max(0, containerWidth - windowWidth + extraPadding);
        };

        gsap.to(container, {
            x: () => -getScrollAmount(),
            ease: "none",
            scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: 0.6,
                start: "top top",
                end: () => "+=" + (getScrollAmount() + 500),
                invalidateOnRefresh: true,
                anticipatePin: 1
            }
        });
    } else {
        container.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                const maxScrollLeft = container.scrollWidth - container.clientWidth;
                if ((container.scrollLeft < maxScrollLeft && e.deltaY > 0) || (container.scrollLeft > 0 && e.deltaY < 0)) {
                    e.preventDefault();
                    container.scrollLeft += e.deltaY;
                }
            }
        }, { passive: false });
    }
}

/* --------------------------------------------------------
   1. Lenis Smooth Scroll Setup
   -------------------------------------------------------- */
let lenis;

function initLenis() {
    if (typeof Lenis === 'undefined') return;

    lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
    });

    lenis.on('scroll', (e) => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.update();
        }
        
        // Scroll Progress Bar
        const progress = (e.scroll / (e.limit || 1)) * 100;
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        // Header Background state (Apenas Desktop >= 768px)
        const navbar = document.getElementById('navbar-inner');
        if (navbar && window.innerWidth >= 768) {
            if (e.scroll > 40) {
                navbar.classList.add('bg-dark-card/90', 'shadow-2xl', 'shadow-black/50', 'border-white/15');
                navbar.classList.remove('bg-dark-card/70', 'border-white/10');
            } else {
                navbar.classList.remove('bg-dark-card/90', 'shadow-2xl', 'shadow-black/50', 'border-white/15');
                navbar.classList.add('bg-dark-card/70', 'border-white/10');
            }
        }
    });

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

/* --------------------------------------------------------
   2. Microkit Cursor Edge Glow Button Pattern
   (microkit.co/components/cursor-edge-glow-button)
   -------------------------------------------------------- */
function initEdgeGlowButtons() {
    const glowElements = document.querySelectorAll('.edge-glow-btn, .edge-glow-btn-sm, .glow-card-border');
    
    glowElements.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            btn.style.setProperty('--x', `${x}px`);
            btn.style.setProperty('--y', `${y}px`);
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.setProperty('--x', `50%`);
            btn.style.setProperty('--y', `50%`);
        });
    });
}

/* --------------------------------------------------------
   3. Custom Follower Cursor
   -------------------------------------------------------- */
function initCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    if (!dot || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function renderCursor() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const interactives = document.querySelectorAll('a, button, input, textarea, .edge-glow-btn, .edge-glow-btn-sm, .glow-card-border');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering-interactive'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering-interactive'));
    });
}

/* --------------------------------------------------------
   4. Ambient Grid Canvas
   -------------------------------------------------------- */
function initCanvasBg() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 30 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.35 + 0.1
    }));

    function draw() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`;
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(draw);
    }
    draw();
}

/* --------------------------------------------------------
   5. GSAP Scroll Animations
   -------------------------------------------------------- */
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Hero Reveal Stagger
    gsap.from('.hero-reveal', {
        y: 35,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.1
    });

    // Hero Scroll Parallax Effect desativado para garantir a execução contínua do vídeo sem interrupções da GPU
    /*
    if (document.querySelector('#hero')) {
        gsap.to('#hero video', {
            y: 50,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }
    */

    // Section Headers
    const headers = document.querySelectorAll('.section-header');
    headers.forEach(header => {
        gsap.from(header, {
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: header,
                start: 'top 85%'
            }
        });
    });

    // Project Cards Entrance
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
        gsap.from(card, {
            y: 45,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            }
        });
    });

    // Process Step Cards
    const stepCards = document.querySelectorAll('.process-step');
    gsap.from(stepCards, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#process-grid',
            start: 'top 85%'
        }
    });
}

/* --------------------------------------------------------
   6. Scroll To Top Engine
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
    });

    scrollTopBtn.addEventListener('click', () => {
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.2 });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

/* --------------------------------------------------------
   6. Mobile Menu
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
        if (typeof lenis !== 'undefined' && lenis) lenis.stop();
    };

    const closeMenu = () => {
        menu.classList.add('translate-x-full');
        document.body.classList.remove('overflow-hidden');
        if (typeof lenis !== 'undefined' && lenis) lenis.start();
    };

    btn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* --------------------------------------------------------
   7. Authentic Portfolio Projects Data & Case Study Modal
   -------------------------------------------------------- */
const projectsData = {
    recruitersys: {
        badge: "Recrutamento Tech & B2B SaaS",
        title: "RecruiterSys – O Ecossistema de Recrutamento Tech",
        subtitle: "Eliminando o gap de comunicação e a ineficiência técnica no recrutamento de profissionais de TI",
        role: "Senior Product Designer & Lead de UX/UI",
        coverImage: "assets/CAPA RECRUITER.png",
        gallery: ["assets/mock 1.png"],
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
        coverImage: "assets/HORUZ.png",
        gallery: ["assets/diario-edb-horuz.png", "assets/diario-cockpit.png"],
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
        coverImage: "assets/MOCK PET PLANT.png",
        gallery: ["assets/petplant1.png", "assets/petplant2.png"],
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
        coverImage: "assets/VENTIHOME.png",
        gallery: ["assets/mockupventihome.png"],
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
            <img src="${imgSrc}" alt="Interface Showcase" class="w-full h-auto object-cover">
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
                <img src="${data.coverImage}" alt="${data.title}" class="w-full h-auto object-cover">
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
                ${data.tags.map(t => `<span class="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-mono">${t}</span>`).join('')}
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
    setTimeout(() => modal.classList.add('hidden'), 300);

    if (lenis) lenis.start();
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[type="text"]')?.value || '';
    const email = form.querySelector('input[type="email"]')?.value || '';
    const message = form.querySelector('textarea')?.value || '';

    const subject = encodeURIComponent(`Contato de ${name} via Portfólio`);
    const body = encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`);

    window.location.href = `mailto:danielleitedesign@gmail.com?subject=${subject}&body=${body}`;

    const feedback = document.getElementById('form-feedback');
    if (feedback) {
        feedback.classList.remove('hidden');
    }
}
