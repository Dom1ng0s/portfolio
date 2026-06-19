# 🌐 Portfólio — Davi Domingos de Oliveira

**Site pessoal com foco em performance, SEO e apresentação de projetos de backend Python para o agronegócio**

[![Site ao vivo](https://img.shields.io/badge/site-davioliveira.is--a.dev-brightgreen?style=flat&logo=google-chrome&logoColor=white)](https://davioliveira.is-a.dev)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](.)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](.)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](.)
[![SEO](https://img.shields.io/badge/SEO-Schema.org%20%2B%20OpenGraph-orange?style=flat)](.)
[![Licença](https://img.shields.io/badge/licença-MIT-green?style=flat)](LICENSE)

---

## Índice

1. [Demo](#demo)
2. [Seções do site](#seções-do-site)
3. [Stack e estrutura](#stack-e-estrutura)
4. [SEO e performance](#seo-e-performance)
5. [Como rodar localmente](#como-rodar-localmente)
6. [Como personalizar](#como-personalizar)
7. [Licença](#licença)

---

## Demo

**URL ao vivo:** [davioliveira.is-a.dev](https://davioliveira.is-a.dev)

> 📸 **Screenshot pendente** — tire um screenshot da página inicial e salve em `assets/screenshot.png`

![Portfólio](assets/screenshot.png)

---

## Seções do site

| Seção | Descrição |
|---|---|
| **Hero** | Apresentação com efeito de digitação (*typewriter*) e CTA para projetos e contato |
| **Stack** | Grade de ícones organizados por categoria (Linguagens, Frontend, Banco de Dados, Outros) |
| **Quem sou eu** | Cards narrativos: background no agronegócio, linha do tempo e diferenciais |
| **Projetos** | Cards com links para páginas de detalhe de cada projeto |
| **Contato** | Links diretos para email, GitHub e LinkedIn |

### Páginas de detalhe (`pages/`)

Cada projeto tem uma página dedicada com descrição técnica aprofundada:

- `sistema-gado.html` — ERP zootécnico com deploy no Railway
- `gado-scraper.html` — Pipeline ETL de cotações pecuárias
- `polymorph.html` — CLI com IA para personalização de currículos
- `plin-bot.html` — Bot Telegram de finanças pessoais
- `rsa-criptografia.html` — RSA do zero em Python
- `flappy-bird.html` — Clone Unity/C# desenvolvido no Lab TOCA
- `hub-ferramentas-agro.html` — Hub de ferramentas para o agronegócio
- `comparador-pecuario.html` — Comparador de preços pecuários

---

## Stack e estrutura

```
portfolio/
├── index.html          # página principal
├── style.css           # estilos globais
├── script.js           # efeito typewriter e interações
├── CNAME               # domínio personalizado (davioliveira.is-a.dev)
├── pages/              # páginas de detalhe de cada projeto
│   ├── sistema-gado.html
│   ├── gado-scraper.html
│   ├── polymorph.html
│   ├── plin-bot.html
│   ├── rsa-criptografia.html
│   ├── flappy-bird.html
│   ├── hub-ferramentas-agro.html
│   └── comparador-pecuario.html
└── assets/
    └── img/
        ├── profile.jpg
        ├── logonobg2.png
        └── icons/      # SVGs da stack (python, flask, docker, mysql...)
```

**Sem frameworks, sem bundlers** — HTML, CSS e JS puros. Zero dependências de runtime.

---

## SEO e performance

O site implementa as principais técnicas de descoberta e indexação:

### Meta tags primárias
```html
<title>Davi Domingos | Backend Developer · Python · Flask · Docker</title>
<meta name="description" content="...">
<meta name="keywords" content="desenvolvedor backend, Python, Flask, Docker, MySQL, agronegócio...">
<link rel="canonical" href="https://davioliveira.is-a.dev/">
```

### Open Graph (LinkedIn, WhatsApp, Facebook)
```html
<meta property="og:type" content="website">
<meta property="og:title" content="Davi Domingos · Backend Developer">
<meta property="og:description" content="Sistemas que monitoram 33 praças pecuárias...">
<meta property="og:image" content="https://davioliveira.is-a.dev/assets/img/profile.jpg">
```

### Twitter Card
```html
<meta name="twitter:card" content="summary_large_image">
```

### Schema.org — Dados Estruturados (Google)
```json
{
  "@type": "Person",
  "name": "Davi Domingos de Oliveira",
  "jobTitle": "Backend Developer",
  "alumniOf": { "@type": "CollegeOrUniversity", "name": "Universidade Federal de Alagoas" },
  "knowsAbout": ["Python", "Flask", "Docker", "MySQL", "ETL", "Agronegócio"]
}
```

### Fontes otimizadas
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

---

## Como rodar localmente

O site é estático — basta abrir com qualquer servidor HTTP simples:

```bash
git clone https://github.com/Dom1ng0s/portfolio.git
cd portfolio

# Opção 1 — Python (já instalado na maioria dos sistemas)
python -m http.server 8000

# Opção 2 — Node.js
npx serve .
```

Acesse em `http://localhost:8000`.

> Não abra `index.html` diretamente pelo explorador de arquivos (`file://`) — algumas fontes e recursos podem não carregar corretamente sem um servidor HTTP.

---

## Como personalizar

Para adaptar este portfólio para uso próprio:

### 1. Informações pessoais — `index.html`

```html
<!-- Linha 74: seu nome -->
<span class="typewriter">Seu Nome Aqui</span>

<!-- Linha 75: sua função -->
<span class="role">Sua função · Sua linguagem · Sua universidade</span>
```

### 2. Meta tags e SEO — `<head>` do `index.html`

```html
<title>Seu Nome | Sua Função</title>
<meta name="description" content="Sua descrição aqui...">
<link rel="canonical" href="https://seu-dominio.com/">
<meta property="og:url" content="https://seu-dominio.com/">
<meta property="og:image" content="https://seu-dominio.com/assets/img/profile.jpg">
```

### 3. Schema.org

Atualize o bloco `<script type="application/ld+json">` com seus dados, links de GitHub/LinkedIn e áreas de conhecimento.

### 4. Foto de perfil

Substitua `assets/img/profile.jpg` pela sua foto. Dimensões recomendadas: 400×400px.

### 5. Projetos

Edite os cards na seção `#projects` do `index.html` e crie/adapte as páginas em `pages/`.

### 6. Domínio personalizado (GitHub Pages)

Edite o arquivo `CNAME` com seu domínio:
```
seu-dominio.com
```

---

## Licença

Distribuído sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.

---

**Davi Domingos de Oliveira** — Backend Developer · UFAL  
[![GitHub](https://img.shields.io/badge/GitHub-Dom1ng0s-181717?style=flat&logo=github)](https://github.com/Dom1ng0s)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-davidomingosdeoliveira-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/davidomingosdeoliveira/)
[![Email](https://img.shields.io/badge/Email-odomingosdavi%40gmail.com-D14836?style=flat&logo=gmail&logoColor=white)](mailto:odomingosdavi@gmail.com)
