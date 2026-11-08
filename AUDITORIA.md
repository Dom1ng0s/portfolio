# Auditoria de interface

> **Estado: todas as 32 correções foram aplicadas**, mais o acerto de alvo de toque nos links de ação. O que mudou, medido antes e depois,
> está em [Correções aplicadas](#correções-aplicadas), no fim do arquivo. Os achados abaixo
> ficam como registro do que foi encontrado e por quê.

**Veredito.** O site está acima da média de portfólio júnior: contraste passa em todos os pares medidos nos dois temas, nada quebra a 320px, o texto aguenta 200% de zoom, a performance é excelente (LCP 228ms, CLS 0,000) e o linter de copy da `design-taste-frontend` passou com 0 FAIL em 1069 palavras — a escrita é o ponto mais forte da página.
Um bloqueador: `scroll-behavior: smooth` impede que a página role atrás do foco do teclado, então quem navega por Tab perde o anel de foco fora da tela a partir do 11º Tab. Reproduzido em dois navegadores independentes.
O resto é consistência e acabamento: ordem de leitura invertida no mobile dos estudos de caso, 10 links com o mesmo nome acessível, hover que gruda no toque, e um bloco de stack que contradiz o posicionamento "Fullstack Developer".

**Escopo.** `/` e os 5 estudos de caso, servidos em `http://localhost:8080` (`python -m http.server`), em 1440, 1024, 820, 768, 390, 375 e 320px, nos temas claro e escuro, em PT e EN. Nenhum arquivo do site foi alterado.

---

## Bloqueador

### 1. O foco do teclado sai da tela e a página não rola atrás dele

**Onde:** [assets/css/style.css:56](assets/css/style.css#L56) — `html { scroll-behavior: smooth; }`

**O que acontece.** A partir do 11º Tab na home, o foco vai para o primeiro link de card, a 1254px do topo, e `scrollY` continua em 0 três segundos depois. O anel de foco existe e está correto, mas está fora da tela: quem navega por teclado não enxerga onde está.

**Evidência.** Mesmo teste com `scroll-behavior: auto`: `scrollY` vai para 781px e o link fica visível. A única variável trocada foi essa. O checker da `design-taste-frontend`, rodando em Chrome headless próprio, reportou o mesmo de forma independente: `FAIL focus-visible — Tab stop 12, "Estudo de caso →": the focus lands on something you cannot see`.

**Ressalva honesta.** Os dois navegadores que observaram isso não estavam pintando continuamente (o painel do Claude estava oculto; o checker é headless). A rolagem suave é dirigida por frames de animação, então pode se comportar diferente numa janela visível. Confirme em 10 segundos: abra a home, clique na barra de endereço, aperte Tab 11 vezes e veja se a página acompanha.

**Correção.** Apagar a linha. A rolagem suave em `html` também afeta âncoras do menu; se quiser mantê-la só nos cliques do menu, troque por um `scrollIntoView({behavior:'smooth'})` no handler e deixe o CSS fora disso.

```css
/* assets/css/style.css:56 */
html { scroll-padding-top: 72px; }   /* sem scroll-behavior: smooth */
```

A regra `@media (prefers-reduced-motion: reduce)` da linha 57 fica sem função e pode sair junto.

---

## Importante

### 2. No mobile dos estudos de caso, a ficha técnica aparece antes do conteúdo — mas vem depois no HTML

**Onde:** [assets/css/style.css:254](assets/css/style.css#L254) — `.aside { order: -1; }`, abaixo de 900px. Afeta os 5 estudos de caso.

**Medido** em `/projetos/gupy-orchestrator/` a 375px: o `<aside>` é desenhado a 461px do topo, o `.case-main` a 963px — mas no DOM o aside vem **depois**. Quem usa teclado ou leitor de tela percorre o estudo de caso inteiro e só então chega na ficha que está visualmente no topo.

Tem um efeito de conteúdo junto: no celular, o recrutador bate primeiro na tabela de stack e não no problema que o projeto resolve — o oposto da camada simples em cima.

**Correção (a mais barata é apagar):**

```css
/* assets/css/style.css:252-255 — remover a regra order */
@media (max-width: 899px) {
  .case-layout { gap: 40px; }
}
```

A ficha passa a vir depois do conteúdo no celular, que é a ordem que o HTML já declara.

### 3. Título de projeto comprido é cortado sem jeito de ler

**Onde:** [assets/css/style.css:69](assets/css/style.css#L69) (`h1,h2,h3`, sem `overflow-wrap`) + [assets/css/style.css:178](assets/css/style.css#L178) (`.card { overflow: hidden; }`)

**Medido** injetando um título sem espaços num card real (nada foi salvo): a 1440px o `h3` fica com `scrollWidth` 702px dentro de um `clientWidth` de 448px; a 375px, 947px dentro de 293px. O `overflow: hidden` do card corta o excesso — o texto some e não há como chegar nele.

Com espaços o título quebra e o card cresce normalmente (altura 694px a 375px, sem overflow). O risco é só com palavra longa sem separador — nenhum projeto atual tem, mas o nome de um repositório tem.

**Correção:**

```css
h1, h2, h3 { overflow-wrap: break-word; }   /* junto com as outras declarações da linha 69 */
```

O mesmo risco existe no `.featured`: com um título longo a coluna `1.1fr` estica além da sua fatia porque a trilha não tem `minmax(0, 1fr)` ([assets/css/style.css:158](assets/css/style.css#L158)).

### 4. Dez links com o mesmo nome acessível

**Onde:** [index.html:102](index.html#L102), [129](index.html#L129), [146](index.html#L146), [162](index.html#L162), [178](index.html#L178) e os "Código" ao lado.

**Medido** na home: `"Estudo de caso →"` × 5 e `"Código"` × 4, todos visíveis ao mesmo tempo. Leitor de tela navega por lista de links; essa lista tem nove entradas indistinguíveis.

**Correção** — sem mudar nada visualmente:

```html
<a href="projetos/rastria/" aria-label="Estudo de caso: RastrIA">
  <span lang="pt">Estudo de caso</span><span lang="en">Case study</span> →
</a>
```

Com o `aria-label` em inglês quando o idioma for EN, ou um `<span>` visualmente oculto com o nome do projeto, que evita duplicar a string.

### 5. A borda dos botões de ícone não chega a 3:1

**Onde:** [assets/css/style.css:112](assets/css/style.css#L112) (`.icon-btn { border: 1px solid var(--line) }`) e o token `--line` ([assets/css/style.css:13](assets/css/style.css#L13) e [:42](assets/css/style.css#L42))

**Medido:** `--line` contra `--bg` dá **1,24:1** no claro e **1,43:1** no escuro. Os dois botões do header têm fundo transparente, então essa borda é a única coisa que marca que ali existe um controle. WCAG 1.4.11 pede 3:1 para o limite de um componente de interface.

Nos separadores (`.rule`, `.card`, `.featured`, `.tags`) o mesmo token é só decoração e não precisa passar — o problema é usar um token de separador no papel de contorno de controle.

**Correção — reaproveitando um primitivo que já existe:** `--slate-400` (`#647b82`) mede **4,12:1** no claro e **3,94:1** no escuro. Passa nos dois.

```css
:root { --control-line: var(--slate-400); }
.icon-btn { border: 1px solid var(--control-line); }
```

### 6. O bloco de stack contradiz o posicionamento fullstack

**Onde:** [index.html:226-241](index.html#L226)

**Medido** na página: JavaScript, React e Java aparecem **ao mesmo tempo** em "Já usei em projeto" e em "Estudando". Lido rápido, parece erro de copiar e colar.

E "Uso com segurança" lista Python, Django, Flask, SQL, C — **nenhuma tecnologia de frontend**. O hero diz "Fullstack Developer" e o RastrIA descreve trabalho em React; o bloco que o recrutador usa para classificar o perfil diz backend.

**Correção** — sem inflar nada: cada tecnologia em um balde só, e um recorte que torne o frontend visível pelo que já é verdade:

- **Uso com segurança:** Python, Django, Flask, SQL, C
- **Frontend:** JavaScript, React, Vite, Tailwind *(usados no RastrIA)*
- **Já usei em projeto:** C#, Unity, Java, Docker, GitHub Actions
- **Estudando:** Machine Learning

### 7. O hover gruda depois do toque no celular

**Onde:** [assets/css/style.css:67](assets/css/style.css#L67), [106](assets/css/style.css#L106), [117](assets/css/style.css#L117), [130](assets/css/style.css#L130), [132](assets/css/style.css#L132) — cinco regras `:hover` fora de `@media (hover: hover)`.

Em tela de toque o `:hover` fica travado depois do tap: o botão tocado continua com o fundo `--accent-soft` até você tocar em outro lugar, e lê como estado selecionado. O próprio documento do projeto diz que muito recrutador abre o link no celular.

**Correção:**

```css
@media (hover: hover) {
  a:hover { text-decoration-thickness: 2px; }
  .nav a:hover { color: var(--text); }
  .icon-btn:hover,
  .btn:hover { background: var(--accent-soft); }
  .btn-primary:hover { background: var(--accent); border-color: var(--accent); color: var(--bg); }
}
```

### 8. A página do Gupy Orchestrator não tem imagem nenhuma — nem na página, nem no compartilhamento

**Onde:** [projetos/gupy-orchestrator/index.html](projetos/gupy-orchestrator/index.html) (0 `<figure>`) e o bloco de metatags, [linhas 10-16](projetos/gupy-orchestrator/index.html#L10) (sem `og:image`).

É o único dos cinco estudos de caso sem `og:image` — as outras quatro páginas têm. Colada no LinkedIn, essa página aparece como um retângulo de texto. E é o projeto mais novo, com o texto mais bem escrito dos cinco.

Os outros estudos de caso também estão magros nesse ponto: rastria, polymorph e gado-scraper têm 1 figura cada; sistema-gado tem 2.

**Correção:** um print do relatório que chega no WhatsApp (com os dados borrados) resolve a página e o `og:image` de uma vez.

### 9. Metadados e 404

**Onde:** [index.html:9-18](index.html#L9) e as mesmas linhas nos 5 estudos de caso.

Duas coisas:

- **O idioma só troca no `<title>`.** O `main.js` atualiza `document.title` pelos atributos `data-title-pt/en` ([assets/js/main.js:24](assets/js/main.js#L24)), mas `description`, `og:title`, `og:description` e `og:image` continuam em português mesmo com a página em inglês. Quem compartilha a versão EN manda um preview em PT.
- **Não existe página 404.** Confirmado no browser: `/rota-inexistente/` cai no erro cru do servidor, sem caminho de volta. No GitHub Pages basta um `404.html` na raiz, que é servido automaticamente.

---

## Polimento

| # | Onde | O que está errado | Correção |
|---|---|---|---|
| 10 | [sistema-gado:115-119](projetos/sistema-gado/index.html#L115) | 5 `<th>` sem `scope`, numa tabela de cabeçalhos de linha | `<th scope="row">` nos cinco |
| 11 | [index.html:46](index.html#L46) | Texto visível "EN", nome acessível "Switch to English" — não contém "EN". WCAG 2.5.3 Label in Name: comando de voz "clicar EN" falha | `aria-label="EN — switch to English"` |
| 12 | [index.html:47](index.html#L47) | O botão de tema não expõe estado: nome fixo, sem `aria-pressed`. Quem não vê a tela não sabe qual tema está ativo — e o botão de idioma, que atualiza o nome, faz o oposto | Atualizar o nome no `main.js:28` como já se faz com o idioma ("Mudar para tema escuro" / "claro") |
| 13 | [style.css:135](assets/css/style.css#L135) | A 320px o link de email (199×25px) fica a 0px do alvo seguinte. WCAG 2.5.8 pede folga entre alvos de 24px. Achado pelo checker, confirmado no relatório | `min-height: 44px; display: inline-flex; align-items: center` em `.minor-links a` |
| 14 | [index.html:27](index.html#L27) + [style.css:149](assets/css/style.css#L149), [166](assets/css/style.css#L166), [212](assets/css/style.css#L212) | O Google Fonts carrega Source Serif 4 só em 500 e 600, mas as ledes usam peso 400. O navegador cai no 500; com a fonte de fallback (Georgia) renderiza 400 de verdade, então o peso muda quando a webfont chega | `font-weight: 500` nas três regras, ou `;8..60,400` na URL |
| 15 | todos os 6 HTML | Zero apóstrofos tipográficos em todo o site: `I've`, `I'm`, `family's`, `Gupy's`, `wasn't`, `Let's` usam `'` reto. ~30 ocorrências, só no texto EN | Trocar por `’` no texto renderizado (dentro de `<code>` e `<pre>` o reto está certo) |
| 16 | [index.html:71](index.html#L71) vs [:264](index.html#L264) | "LinkedIn" é botão de contorno no hero e botão preenchido no contato: a mesma ação com dois pesos. Achado pelo checker (`same-action`, `button-styles`: 3 estilos de botão numa tela) | Decidir qual é a ação primária da página e deixar uma só preenchida |
| 17 | [style.css:162](assets/css/style.css#L162), [164](assets/css/style.css#L164), [167](assets/css/style.css#L167), [240](assets/css/style.css#L240), [297](assets/css/style.css#L297) | Primitivos (`--navy-900`, `--navy-700`, `--sage-300`, `--slate-400`) e hex cru (`#e9eff0`, `#fff`) usados direto em componente, furando a camada semântica. É por isso que o painel do RastrIA fica azul-marinho também no tema claro | Apontar tokens semânticos para os primitivos e usar só os semânticos |
| 18 | [style.css:25-48](assets/css/style.css#L25) | Os valores do tema escuro estão duplicados em dois blocos; mudar um e esquecer o outro é questão de tempo | `color-scheme: light dark` + `light-dark(claro, escuro)` em cada token, definido uma vez |
| 19 | [style.css:16-17](assets/css/style.css#L16), [33-34](assets/css/style.css#L33), [46-47](assets/css/style.css#L46), [88-91](assets/css/style.css#L88) | `--todo-bg`, `--todo-text` e `.todo` não são usados em HTML nenhum: 4 tokens e 1 classe mortos | Apagar |
| 20 | `assets/img/sistema-gado/viewgmd.webp` | Não é referenciado em nenhum HTML (43 KB no repositório) | Apagar ou usar |
| 21 | [style.css:180](assets/css/style.css#L180), [220](assets/css/style.css#L220) | Borda de imagem com neutro tingido (`--line`): no tema escuro é `#24364c`, azul, e aparece como franja colorida na beirada do print | `outline: 1px solid rgb(0 0 0 / .1)` no claro, `rgb(255 255 255 / .1)` no escuro |
| 22 | todo o CSS | Nenhuma regra `:active`: verificado nos 6 tipos de controle, `transform` é `none` em todos. Nada responde ao clique | `@media (hover: hover) { .btn:active, .icon-btn:active { scale: .96 } }` com transição de 150ms |
| 23 | [style.css:244](assets/css/style.css#L244) | `scroll-padding-top: 116px` é número mágico contra um header que mede 115px — 1px de folga. Com o texto em 200% o header vai a 196px e a folga some | `scroll-padding-top: 7.25rem`, que escala junto com o texto |
| 24 | [style.css:271](assets/css/style.css#L271) | `.case-main pre` rola na horizontal sem `overscroll-behavior`: no trackpad, rolar o bloco de código até o fim dispara o voltar do navegador | `overscroll-behavior-x: contain` |
| 25 | [style.css:158](assets/css/style.css#L158) | As duas colunas do card em destaque começam 43px desalinhadas no topo (paddings 40px e 28px). Achado pelo checker (`split-pair`) | Mesmo padding-top nas duas colunas |
| 26 | [style.css:169](assets/css/style.css#L169) | As pills de stack começam 11px à direita da margem comum da seção (borda + padding), então a linha de tags não bate com o texto acima. Achado pelo checker (`off-grid`, 12 elementos) | `margin-left: -11px` na `.tags` do bloco de stack, ou aceitar como escolha |
| 27 | [index.html:191](index.html#L191), [projetos/*/](projetos/) | 3 imagens servidas 3,9× a 4,5× maiores que o tamanho exibido (`rebanho.webp` 1400px para 356; `profile.webp` 1182px para 260), sem `srcset` | `srcset`/`sizes` com uma variante de 800px |
| 28 | [index.html:27](index.html#L27) | 166,7 KB de fonte = 55% do peso da página, em CSS que bloqueia a renderização | Self-host com subset, ou `&text=` para os títulos |
| 29 | [index.html:242](index.html#L242) | `style="font-size:.9rem;color:var(--muted);margin-top:12px"` inline, furando o sistema | Uma classe |
| 30 | [style.css:306](assets/css/style.css#L306) | `h4` a 16px fica abaixo do corpo de texto a 17px. Dentro da linha do tempo a hierarquia funciona (o parágrafo tem 14,4px), mas na escala da página o nível desce abaixo do texto | `1.0625rem` |
| 31 | [README.md](README.md) | Lista `/projetos/plin/`, que não existe mais, e diz "Flask + MySQL" onde o site diz PostgreSQL | Atualizar as duas linhas |
| 32 | [style.css:69](assets/css/style.css#L69) | Sem `text-wrap: balance` nos títulos nem `pretty` nos parágrafos: a quebra de "Davi Domingos de Oliveira" e dos h2 fica irregular | `text-wrap: balance` em `h1,h2,h3`; `pretty` em `p` |

---

## O que foi checado e passou

Vale registrar, porque é trabalho que já está feito:

- **Contraste de texto:** 21 pares medidos no claro e no escuro, do corpo aos rodapés de figura. O pior é 6,45:1 (`--sage-300` sobre o painel navy) contra um mínimo de 4,5:1. Estados de hover também: `--bg` sobre `--accent` dá 11,35:1 / 8,89:1.
- **Nomes acessíveis:** todos os 26 elementos focáveis da home têm nome. Nenhum `<img>` sem `alt`, nenhum link vazio.
- **Anel de foco:** `:focus-visible` com 2px sólidos, verificado com Tab real em todas as paradas; nenhuma caiu atrás do header fixo.
- **Reflow:** nenhum overflow horizontal em 1440, 1024, 820, 768, 390, 375 e **320px**. Zoom de texto a 200%: sem corte e sem rolagem lateral em 1440 e em 375.
- **`prefers-reduced-motion`:** o site não tem nenhuma transição, keyframe ou animação. A única coisa que se movia era a rolagem suave, que já estava desligada sob a preferência ([style.css:57](assets/css/style.css#L57)) — e que o achado nº 1 manda tirar de vez.
- **Imagem quebrada:** testado com `src` inexistente. O box mantém 341×192px (os atributos `width`/`height` + `aspect-ratio` seguram o espaço), o `alt` aparece e o fundo `--accent-soft` preenche. Degrada bem, sem salto de layout.
- **Performance:** LCP 228ms, CLS **0,000**, 0 long tasks, 305,7 KiB no total, 14 requisições.
- **Copy:** `copy-lint` da `design-taste-frontend`, 1069 palavras, **0 FAIL**. Sem palavra de efeito, sem frase de catálogo, sem resíduo. 52 frases, média de 18,8 palavras.
- **Links externos:** os 6 respondem 200, incluindo a demo do RastrIA no Railway e o loodus.app.br.
- **Medida de linha:** 65ch na bio, 65ch no corpo dos estudos de caso, 52ch no contato, 34ch na lede. Tudo dentro da faixa.

## O que não acrescentou nada

- **Formulário de contato:** não existe no site. Isso esvazia a parte de formulário da `better-accessibility`, os estados vazio / preenchendo / inválido / enviando / sucesso / erro de rede, e as mensagens de erro e sucesso da `better-writing`. Em vez disso renderizei numa página temporária os estados que os controles reais têm — repouso, hover, foco e pressionado, nos dois temas — e o resultado está no achado nº 22: a coluna "pressionado" é idêntica a "repouso" em todos os seis tipos de controle.
- **Empty states:** não há lista alimentada por dados. Com a grade de projetos esvaziada, a seção fica com 0px de altura e nenhuma mensagem — mas os cards são HTML escrito à mão, então isso não acontece sozinho. Com 50 cards injetados: 31.922px de grade, sem overflow e sem paginação; também não é um caso real.
- **RTL:** o site é PT/EN, duas línguas da esquerda para a direita. As propriedades físicas (`left`, `padding-left`, `margin-left`) no CSS não causam defeito nenhum hoje.
- **Crescimento por tradução:** o texto em inglês já está no DOM e foi medido renderizado. Não estoura em nenhuma largura testada.
- **`better-layout` sobre sombras e elevação:** o projeto não usa sombra em lugar nenhum, de forma consistente. É escolha de estilo, não achado.

## Veredito de taste

Passa como trabalho profissional, não lê como template. O que sustenta isso é a escrita: 0 FAIL no linter mais severo que rodei, textos que contam uma decisão de engenharia de verdade em vez de listar tecnologia, e um tom que não tenta vender. A tipografia (Source Serif 4 + Inter, medida controlada, escala declarada) e a sobriedade do sistema de cor estão no nível de site de consultoria, que é a direção escolhida.

O que separa da referência (figma.com, x.ai) é densidade visual: 1 figura por estudo de caso, nenhuma no mais novo, nenhum movimento em nenhum lugar — nem `:active`, nem transição de hover, nem entrada. A página lê como documento, não como site. Isso é defensável para o público (recrutador técnico lê), e eu **não** recomendo adicionar efeito, shader ou scroll animation: contraria a direção sóbria já escolhida e o `design-taste-frontend` só autoriza isso em página de produto técnico. O que falta é mais prova visual — print, diagrama do fluxo, o relatório que o Gupy Orchestrator manda — e o mínimo de resposta ao toque.

**Sobre o checker.** Rodei `copy-lint.mjs`, `consistency.mjs` (1440/1024/820/768/390 + varredura a 320) e `perf.mjs`, cada um em Chrome headless próprio. O `consistency.mjs` acusou 161 FAIL, e a maioria é doutrina da skill, não defeito: 76 deles são a regra "uma seção por tela" (`hero-fill`, `hero-screen`, `section-height`, `one-section`, `section-air`, `empty-area`) e "toda seção tem visual" (`no-visual`, `text-only`), que valem para landing page de empresa e não para um portfólio em formato de documento. Outros são falso positivo direto: `off-viewport` no skip link (é a técnica padrão de esconder fora da tela, e verifiquei que não gera rolagem lateral), `copy-headings` reclamando que "RastrIA" não nomeia um produto (nome de projeto é cabeçalho correto aqui), `hover-move` tratando o `<article>` em destaque como card clicável, e `container-edges` medindo margem de 180px contra uma faixa de 64–120px que é preferência da skill. Os FAIL que viraram achado real aqui são `focus-visible` (nº 1), `tap-size` a 320 (nº 13), `button-styles` e `same-action` (nº 16), `split-pair` (nº 25), `off-grid` (nº 26) e `heading-scale` (h3 em dois tamanhos, 12,8px e 20,8px — os rótulos "EXPERIÊNCIA" e "STACK" são overlines deliberados, então deixei fora da lista). O único WARN do copy-lint, `copy-stat-strip` sobre "2023 / 2023 / 2022 / 2022", é a coluna de datas da linha do tempo lida como faixa de números: falso positivo.

A saída dos checkers foi gravada em `.taste-skill/` e removida depois; `git status` está limpo.

---

## Os 5 que mais pagam pelo esforço

1. **Apagar `scroll-behavior: smooth`** ([style.css:56](assets/css/style.css#L56)). Uma linha, resolve o único bloqueador.
2. **`overflow-wrap: break-word` nos títulos e apagar `.aside { order: -1 }`** ([style.css:69](assets/css/style.css#L69) e [:254](assets/css/style.css#L254)). Duas linhas, resolvem o risco de perder conteúdo e a ordem de leitura invertida em cinco páginas no celular.
3. **Envolver as cinco regras `:hover` em `@media (hover: hover)`** ([style.css:67-132](assets/css/style.css#L67)). Um bloco, conserta o estado grudado no celular — que é onde boa parte do público abre o link.
4. **Reorganizar o bloco de stack** ([index.html:226-241](index.html#L226)). Tira a contradição JavaScript/React/Java em dois baldes e faz o frontend aparecer onde o recrutador classifica o perfil, sem afirmar nada que não seja verdade.
5. **Dar nome próprio aos 10 links de "Estudo de caso" e "Código"** ([index.html:102](index.html#L102) em diante). `aria-label`, nada muda na tela, e a lista de links deixa de ser nove entradas iguais.

---

## Correções aplicadas

Todos os 32 achados foram corrigidos. Medições de antes e depois feitas no mesmo browser,
com o CSS e o JS recarregados sem cache.

### Medido antes e depois

| | Antes | Depois |
|---|---|---|
| Rolagem acompanha o foco do teclado | não (`scrollY` 0 com o foco a 1254px) | sim (`scrollY` 800, elemento visível) |
| Contorno do botão de ícone | 1,24:1 claro / 1,43:1 escuro | **4,12:1 / 3,94:1** |
| Links com nome acessível repetido | 9 (`Estudo de caso →` ×5, `Código` ×4) | **0** |
| Peso total da página | 305,7 KiB | **168 KiB** |
| Imagens | 111,3 KiB, 3 servidas 3,9–4,5× maiores | **39 KiB, 0 fora de escala** |
| Fontes | 166,7 KiB | **96,9 KiB** |
| Apóstrofos tipográficos | 0 | **70** |
| Alvos abaixo de 44px em `.minor-links` | 25px, a 0px do vizinho | **44px, 20px de folga** |
| Alvos dos links de ação (`.card-links`, `.back`) | 25px | **44px**, igual aos secundários |
| `scroll-padding` vs header a 200% de zoom | 116px contra 196px | **232px contra 196px** |
| Regras `:hover` fora de `@media (hover: hover)` | 5 | **0** |
| Estado `:active` | nenhum | `scale: .96`, com fallback sem movimento |
| `<th>` sem `scope` | 5 | **0** |
| Páginas sem `og:image` | 1 | **0** |
| Página 404 | não existia | `/404.html`, 9 links internos checados em 200 |
| Checker: `focus-visible`, `tap-size`, `off-viewport`, `same-action`, `fold-cut`, `stagger` | FAIL | **PASS** |
| `copy-lint` na home | 0 FAIL | 0 FAIL (1115 palavras) |
| Contraste de texto (20 amostras × 2 temas) | 0 falhas | **0 falhas** |
| Reflow a 320px e zoom de texto a 200% | sem overflow | **sem overflow** |

### Duas coisas que mudei e precisei desfazer

Vale registrar, porque as duas pareciam certas no papel:

- **`light-dark()` nos tokens.** Era a forma mais curta de tirar a duplicação do tema escuro
  (achado nº 18), mas o Chrome não reinvalida as cores já computadas quando o botão de tema
  troca o `color-scheme` em tempo de execução: depois de um clique, o botão primário ficava
  com fundo do tema escuro e texto do claro, em 1,07:1. Troquei por um conjunto `--d-*` com os
  valores do tema escuro definidos uma vez e dois seletores que só remapeiam. A duplicação de
  **valores** sumiu do mesmo jeito; o que se repete agora são linhas de `var()`.
- **Puxar as pills de stack em -11px** (achado nº 26) para alinhar o texto interno à margem.
  Alinhava o texto e desalinhava a caixa: o checker passou a acusar `stagger` em 5 linhas e o
  `off-grid` subiu de 4 para 5. Desfiz. A caixa da pill fica na grade; o recuo óptico do texto
  é como pill se comporta.

Também ajustei o `padding-bottom` do hero de 120px para 152px: ao tirar o botão do LinkedIn
dali (achado nº 16), a seção seguinte subiu e o h2 "O que construí" passou a ser cortado ao
meio pela dobra a 1440×900. Com 152px o título cai inteiro abaixo da dobra.

### O que ficou de fora, e por quê

- **`cdn-cgi/rum` (beacon do Cloudflare) continua como FAIL de requisição quebrada.** É CORS de
  `localhost`, não dá para verificar daqui. Em produção, no domínio próprio, deve responder.
  Confirme no DevTools depois do deploy.
- **`og:image` da página do Gupy aponta para `profile.jpg`, provisoriamente.** Não dá para
  inventar um print do relatório do WhatsApp. O lugar está marcado com comentário no HTML;
  troque por um print com os dados borrados e a página ganha imagem na página e no link.
- **`hole` a 820px na seção Sobre.** A 820 o layout ainda é de uma coluna e a foto de 260px
  deixa 481px vazios ao lado. Fechar isso significa descer o breakpoint de 2 colunas de 860 para
  760, e aí a medida de linha do texto cai para ~41 caracteres, abaixo da faixa boa. Preferi a
  medida de linha. O checker acusa só nessa largura.
- **`button-styles`, `copy-headline`, `copy-headings`, `heading-scale`, `off-grid`,
  `hover-move`, `split-pair`, `row-lines`, `container-edges` e os 93 FAIL de "uma seção por
  tela".** São doutrina da `design-taste-frontend` para landing page de empresa, ou falso
  positivo num portfólio: nome próprio como h1, nome de projeto como cabeçalho, o `<article>`
  em destaque tratado como card clicável, a margem de 180px contra a faixa de 64–120px da skill.
  A seção **Veredito de taste** explica caso a caso. As colunas do card em destaque, por
  exemplo, estão alinhadas no topo desde a correção — medi os dois primeiros filhos no mesmo y.

### Um achado novo, que não é meu de corrigir

Rodando o `copy-lint` nos estudos de caso (a auditoria só tinha rodado na home), a página do
**Gupy Orchestrator** dá 1 FAIL: `copy-contrast`, 7 construções "X, não Y" contra um orçamento
de 2 ("não foi código, foi escrever o critério", "o que mudou não foi a vaga, foi quanto tempo
me resta", e mais cinco). Lido de uma vez, vira tique. As outras quatro páginas passam com 0
FAIL. Não mexi: reescrever cinco frases suas é decisão de voz, não correção de interface.
