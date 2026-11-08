# Portfólio · Davi Domingos de Oliveira

Site pessoal de Fullstack Developer, com estudos de caso dos meus projetos. Em português e inglês.

**No ar:** [davioliveira.is-a.dev](https://davioliveira.is-a.dev)

## Páginas

| Endereço | Conteúdo |
|---|---|
| `/` | Apresentação, projetos, sobre (experiência e stack) e contato |
| `/projetos/rastria/` | RastrIA: saúde e desempenho físico para instituições (Django + React, em desenvolvimento) |
| `/projetos/sistema-gado/` | Sistema-Gado: gestão de rebanho e fluxo de caixa (Flask + PostgreSQL) |
| `/projetos/gado-scraper/` | Gado-Scraper: coleta diária de cotações via GitHub Actions |
| `/projetos/polymorph/` | PolyMorph: CLI que adapta currículos com o Gemini |
| `/projetos/gupy-orchestrator/` | Gupy Orchestrator: varredura semanal de vagas com aviso no WhatsApp |
| `/404.html` | Página de erro, servida pelo GitHub Pages em qualquer endereço inexistente |

## Estrutura

```
portfolio/
├── index.html              # home
├── 404.html                # página de erro (caminhos absolutos, ver comentário no arquivo)
├── projetos/<nome>/index.html  # um estudo de caso por projeto
├── hexagon-letter-d.svg    # logo e favicon
├── CNAME                   # domínio (GitHub Pages)
├── AUDITORIA.md            # auditoria de interface e o que foi corrigido
└── assets/
    ├── css/style.css       # tokens de cor, temas claro/escuro, layout
    ├── js/main.js          # troca de idioma e de tema
    └── img/                # fotos e prints (WebP, com variante -700/-520 para srcset)
```

HTML, CSS e JS puros, sem framework nem etapa de build.

- **Idiomas:** cada texto existe em PT e EN no próprio HTML (`<span lang="pt">` / `<span lang="en">`). O CSS esconde o idioma que não está ativo, e a escolha fica salva no navegador. O `<title>` e as metatags de descrição vêm dos atributos `data-*-pt` / `data-*-en` no `<html>` e trocam junto.
- **Tema:** segue o sistema por padrão, com um botão para trocar manualmente. Os tokens de cor usam `light-dark()` com `color-scheme`, então cada papel tem um valor só, com os dois temas na mesma linha.
- **Fontes:** Source Serif 4 (títulos) e Inter (texto), via Google Fonts.

## Rodar localmente

```bash
python -m http.server 8080
```

Depois é só abrir `http://localhost:8080`. Pelo `file://` o CSS e os endereços `/projetos/<nome>/` não funcionam direito.

## Contato

[LinkedIn](https://www.linkedin.com/in/davidomingosdeoliveira/) · [GitHub](https://github.com/Dom1ng0s) · odomingosdavi@gmail.com
