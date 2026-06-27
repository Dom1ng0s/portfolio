const translations = {
  pt: {
    // NAV
    "nav.projects":  "Projetos",
    "nav.tools":     "Ferramentas para o Agro",
    "nav.contact":   "Contato",
    "nav.back":      "← Home",
    "back.link":     "← Voltar",

    // HERO
    "hero.greeting":      "Olá, sou",
    "hero.role":          "Backend Developer · Python · Agronegócio",
    "hero.live":          "ERP pecuário em produção",
    "hero.desc":          "ETL que coleta 33 praças pecuárias por dia. ERP pecuário em produção, com rastreamento individual por animal e caixa em tempo real.",
    "hero.available":     "🟢 Disponível para estágio, com início imediato",
    "hero.btn.projects":  "Ver meus projetos",
    "hero.btn.contact":   "Entre em contato",

    // PROJECTS
    "section.projects":      "Projetos Selecionados",
    "badge.featured":        "⭐ Destaque",
    "project.sgg.title":     "Sistema de Gestão de Gado",
    "project.sgg.desc":      "Produtores controlavam rebanhos de R$ 400 mil em planilhas que não cruzavam pesagens com fluxo de caixa. O ERP roda em produção com rastreamento individual: na Fazenda São Marcos, 235 animais cadastrados e 17 com GMD abaixo de 0,395 kg/dia sinalizados imediatamente. GMD, fluxo de caixa e valuation calculados por Views SQL com CTEs e window functions.",
    "project.sgg.live":      "Ver ao Vivo →",
    "project.sgg.demo":      "Acesso demo: usuário demonstracao / senha demonstracao",
    "project.scraper.title": "Gado-Scraper",
    "project.scraper.desc":  "Em 33 praças pecuárias brasileiras, cada fonte publica cotações no próprio layout, sem API e sem formato padronizado. O pipeline ETL roda de graça via GitHub Actions e armazena cada resultado como commit no próprio repositório, construindo um histórico auditável por data. Seis meses de coleta diária acumulados desde dezembro de 2025. Alimenta o ERP em produção.",
    "project.polymorph.title": "Polymorph AI",
    "project.polymorph.desc":  "Recrutadores usam filtros ATS para triagem, e um currículo sem as palavras certas é descartado antes de qualquer humano ler. A CLI usa Google Gemini para reescrever o currículo no vocabulário exato da vaga em menos de 30 segundos, com cache MD5 e modo batch para múltiplas vagas. O currículo que você está avaliando passou pelo Polymorph.",
    "project.plin.title":    "Plin Bot",
    "project.plin.desc":     "Apps de finanças pedem categoria, data e valor separados quando o usuário só quer anotar o que gastou. O Plin lê linguagem natural, como \"gastei 45 reais no mercado\", e cuida do registro e da categorização via spaCy NLP, dispensando qualquer formulário. Roda em self-hosting via Docker no homelab próprio, com isolamento total por usuário.",
    "project.plin.live":     "Testar ao Vivo →",

    // SHARED LINKS
    "link.github": "Ver no GitHub →",
    "link.live":   "Ver ao Vivo →",

    // STACK
    "section.stack":   "Minha Stack",
    "stack.languages": "Linguagens",
    "stack.frontend":  "Frontend",
    "stack.database":  "Banco de Dados",
    "stack.others":    "Outros",

    // ABOUT
    "section.about":        "Quem sou eu?",
    "about.agro.title":     "Raízes no Agro, Mente de Engenheiro",
    "about.agro.desc":      "Dado sem contexto de negócio não vira decisão. Cresci no agronegócio antes de programar, então leio problemas de fora para dentro: o ponto de partida é sempre o impacto no negócio do produtor. A solução técnica vem depois.",
    "about.agro.tag1":      "Pecuária",
    "about.agro.tag2":      "Visão de Negócio",
    "about.agro.tag3":      "Impacto Real",
    "about.tech.title":     "Amplitude Técnica",
    "about.tech.desc":      "Os projetos aqui cobrem ETL, ERP pecuário, NLP e LLM, todos em produção ou em uso ativo. Estudo Engenharia de Software na UFAL e tenho inglês fluente (Cambridge FCE) para ler documentação e pesquisa direto na fonte.",
    "about.pressure.title": "Construído sob Pressão",
    "about.pressure.desc":  "Vice-campeão nas etapas Estadual e Nacional do Hackathon SEB 22/23, com dois MVPs entregues em menos de 48h cada, antes de entrar na faculdade. Pesquisador no Laboratório TOCA da UFAL: o Loodus é um app gamificado de Libras para crianças surdas em desenvolvimento ativo.",

    // EXPERIENCE
    "section.experience":    "Experiências",
    "exp.hackathon.title":   "Vice-Campeão Hackathon SEB",
    "exp.hackathon.desc":    "Vice-campeão nas etapas Estadual e Nacional do Hackathon SEB 22/23, antes de entrar na faculdade. Em menos de 48h por edição, fui da ideação ao MVP apresentado para banca.",
    "exp.csbc.title":        "Monitor no CSBC 2025",
    "exp.csbc.desc":         "No CSBC 2025, maior congresso de computação do Brasil, coordenei múltiplos workshops simultâneos com milhares de participantes no total. Fiquei responsável pela equipe de monitores e pela execução de cada trilha no dia do evento.",
    "exp.toca.title":        "Pesquisador · Laboratório TOCA/UFAL",
    "exp.toca.desc":         "O <strong>Loodus</strong> é um app gamificado de Libras para crianças surdas, desenvolvido como pesquisa aplicada no Laboratório TOCA da UFAL.",

    // CERTIFICATES
    "section.certs":        "Cursos e Certificações",
    "cert.cambridge.title": "Cambridge FCE (Inglês)",
    "cert.cambridge.desc":  "First Certificate in English pela Cambridge Assessment English. Leitura de documentações nativas, consumo de conteúdo técnico global e comunicação clara com equipes internacionais sem depender de tradução.",
    "cert.sql.title":       "SQL do Zero ao Avançado",
    "cert.sql.desc":        "30 horas pela Udemy. Modelagem de dados, queries complexas, Views e otimização de índices, base da arquitetura Database-First que aplico no Sistema de Gestão de Gado.",
    "cert.agile.title":     "Metodologia Ágil",
    "cert.agile.desc":      "10 horas pela OxeTech. Frameworks ágeis para entrega contínua de valor e prototipação rápida, habilidades que testei sob pressão real nas duas experiências em Hackathons.",

    // EXPLORATIONS
    "section.explorations":     "Experimentos de Aprendizado",
    "exp.sim.title":   "Simulador de Engorda",
    "exp.sim.desc":    "Ferramenta web que modela o custo de suplementação mês a mês — iterando pelo peso real do animal — e projeta o lucro operacional de Proteinado vs. Sal Mineral antes do lote ser iniciado. JavaScript puro, mobile-first, sem backend.",
    "exp.sim.link":    "Abrir Ferramenta →",
    "exp.rsa.title":   "RSA Implementation",
    "exp.rsa.desc":    "Toda conexão HTTPS depende de criptografia assimétrica, mas poucos desenvolvedores entendem o que acontece por baixo. Implementei o RSA do zero, sem bibliotecas: geração de primos, exponenciação modular e o algoritmo de Euler estendido.",
    "exp.rsa.github":  "Ver no GitHub →",
    "exp.flappy.title":  "Flappy Bird Clone",
    "exp.flappy.desc":   "Clone do clássico jogo desenvolvido como parte da introdução a C# e Unity do Laboratório TOCA da UFAL. O foco foi a aplicação prática de física 2D, instanciação procedural de objetos e gerenciamento de estados via <code>Time.timeScale</code> e <code>SceneManager</code>.",
    "exp.flappy.github": "Ver no GitHub →",

    // CONTACT
    "section.contact": "Vamos conversar?",
    "contact.desc":    "Busco estágio em backend Python com foco em dados do agronegócio. Respondo em até 24h e tenho inglês fluente para equipes com comunicação internacional.",

    // FOOTER
    "footer.text": "Backend Developer · Python · Agronegócio · © 2026 Davi Domingos de Oliveira.",
  },

  en: {
    // NAV
    "nav.projects":  "Projects",
    "nav.tools":     "Agri Tools",
    "nav.contact":   "Contact",
    "nav.back":      "← Home",
    "back.link":     "← Back",

    // HERO
    "hero.greeting":      "Hi, I'm",
    "hero.role":          "Backend Developer · Python · Agribusiness",
    "hero.live":          "cattle ERP in production",
    "hero.desc":          "ETL collecting 33 Brazilian cattle markets daily. Cattle ERP in production, with per-animal tracking and real-time cash flow.",
    "hero.available":     "🟢 Available for internship, immediate start",
    "hero.btn.projects":  "See my projects",
    "hero.btn.contact":   "Get in touch",

    // PROJECTS
    "section.projects":      "Selected Projects",
    "badge.featured":        "⭐ Featured",
    "project.sgg.title":     "Cattle Management System",
    "project.sgg.desc":      "Producers managed herds worth R$400,000 in spreadsheets that couldn't link weight records to cash flow. The ERP runs in production with per-animal tracking: at Fazenda São Marcos, 235 animals logged and 17 flagged below the 0.395 kg/day ADG threshold in real time. ADG, cash flow, and valuation computed by SQL Views with CTEs and window functions.",
    "project.sgg.live":      "See Live →",
    "project.sgg.demo":      "Demo access: user demonstracao / password demonstracao",
    "project.scraper.title": "Gado-Scraper",
    "project.scraper.desc":  "Across 33 Brazilian cattle markets, each source publishes prices in its own layout, with no public API and no standard format. The ETL pipeline runs for free via GitHub Actions and stores each result as a commit in the same repository, building an auditable history by date. Six months of daily collection accumulated since December 2025. Feeds the ERP in production.",
    "project.polymorph.title": "Polymorph AI",
    "project.polymorph.desc":  "Recruiters use ATS filters for screening, and a resume without the right keywords gets cut before any human reads it. The CLI uses Google Gemini to rewrite a resume in the exact vocabulary of a job posting in under 30 seconds, with MD5 cache and batch mode for multiple listings. The resume you're reading went through Polymorph.",
    "project.plin.title":    "Plin Bot",
    "project.plin.desc":     "Finance apps ask for category, date, and amount separately when all the user wants is to jot down what they spent. Plin reads natural language, like \"spent 45 on groceries\", and handles logging and categorization via spaCy NLP, with no form to fill out. Self-hosted via Docker on a home lab, with full per-user data isolation.",
    "project.plin.live":     "Try Live →",

    // SHARED LINKS
    "link.github": "See on GitHub →",
    "link.live":   "See Live →",

    // STACK
    "section.stack":   "My Stack",
    "stack.languages": "Languages",
    "stack.frontend":  "Frontend",
    "stack.database":  "Database",
    "stack.others":    "Others",

    // ABOUT
    "section.about":        "About Me",
    "about.agro.title":     "Agro Roots, Engineering Mindset",
    "about.agro.desc":      "Data without business context never becomes a decision. I grew up in agribusiness before learning to code, so I read problems outside in: the starting point is always the business impact for the producer. The technical solution comes after.",
    "about.agro.tag1":      "Ranching",
    "about.agro.tag2":      "Business Acumen",
    "about.agro.tag3":      "Real Impact",
    "about.tech.title":     "Technical Breadth",
    "about.tech.desc":      "The projects here cover ETL, cattle ERP, NLP, and LLM, all in production or active use. I study Software Engineering at UFAL and have fluent English (Cambridge FCE) to read documentation and research straight from the source.",
    "about.pressure.title": "Built Under Pressure",
    "about.pressure.desc":  "Runner-up at the State and National levels of the SEB Hackathon 22/23, with two MVPs delivered in under 48h each, before starting university. Researcher at UFAL's TOCA Lab: Loodus is a gamified Brazilian Sign Language app for deaf children, in active development.",

    // EXPERIENCE
    "section.experience":    "Experience",
    "exp.hackathon.title":   "Runner-Up · SEB Hackathon",
    "exp.hackathon.desc":    "Runner-up at both the State and National levels of the SEB Hackathon 22/23, before starting university. In under 48h per edition, I went from a blank slate to an MVP pitched to a panel.",
    "exp.csbc.title":        "Workshop Coordinator · CSBC 2025",
    "exp.csbc.desc":         "At CSBC 2025, Brazil's largest computing conference, I coordinated multiple simultaneous workshops with thousands of attendees in total. I was responsible for the team of teaching assistants and for running each track on the day of the event.",
    "exp.toca.title":        "Researcher · TOCA Lab / UFAL",
    "exp.toca.desc":         "<strong>Loodus</strong> is a gamified Brazilian Sign Language app for deaf children, developed as applied research at UFAL's TOCA Lab.",

    // CERTIFICATES
    "section.certs":        "Courses & Certifications",
    "cert.cambridge.title": "Cambridge FCE (English)",
    "cert.cambridge.desc":  "First Certificate in English by Cambridge Assessment English. I read documentation and follow technical content natively, and can work with international teams without a translation layer.",
    "cert.sql.title":       "SQL Zero to Advanced",
    "cert.sql.desc":        "30 hours via Udemy. Data modeling, complex queries, Views, and index optimization, the foundation of the Database-First architecture behind the Cattle Management System.",
    "cert.agile.title":     "Agile Methodology",
    "cert.agile.desc":      "10 hours via OxeTech. Agile frameworks for continuous delivery and rapid prototyping, skills I tested under real pressure at both hackathon editions.",

    // EXPLORATIONS
    "section.explorations":     "Learning Experiments",
    "exp.sim.title":   "Cattle Fattening Simulator",
    "exp.sim.desc":    "Web tool that models supplementation cost month by month, iterating over the animal's actual weight, and projects the operating profit of Protein Supplement vs. Mineral Salt before a batch starts. Pure JavaScript, mobile-first, runs entirely client-side.",
    "exp.sim.link":    "Open Tool →",
    "exp.rsa.title":   "RSA Implementation",
    "exp.rsa.desc":    "Every HTTPS connection depends on asymmetric encryption, but most developers don't look at what's underneath. RSA built from scratch, no libraries: prime generation, modular exponentiation, and the extended Euclidean algorithm.",
    "exp.rsa.github":  "See on GitHub →",
    "exp.flappy.title":  "Flappy Bird Clone",
    "exp.flappy.desc":   "A Flappy Bird clone built as part of TOCA Lab / UFAL's introduction to C# and Unity. The focus was 2D physics, procedural object instantiation, and state management via <code>Time.timeScale</code> and <code>SceneManager</code>.",
    "exp.flappy.github": "See on GitHub →",

    // CONTACT
    "section.contact": "Let's talk?",
    "contact.desc":    "I'm looking for a backend Python internship focused on agribusiness data. I reply within 24h and have fluent English for teams that work internationally.",

    // FOOTER
    "footer.text": "Backend Developer · Python · Agribusiness · © 2026 Davi Domingos de Oliveira.",
  }
};

function getLang() {
  const saved = localStorage.getItem('lang');
  if (saved === 'pt' || saved === 'en') return saved;
  return navigator.language.startsWith('en') ? 'en' : 'pt';
}

function applyLang(lang) {
  document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-br' : 'en');
  const t = translations[lang] || translations.pt;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  localStorage.setItem('lang', lang);
}

function switchLang(lang) {
  applyLang(lang);
}

document.addEventListener('DOMContentLoaded', () => {
  applyLang(getLang());
});
