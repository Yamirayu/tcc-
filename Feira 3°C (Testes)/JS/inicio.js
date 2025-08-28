// Seleção do conteúdo principal onde será trocado o texto
const content = document.getElementById("content");

// Objeto com os conteúdos dinâmicos
const pages = {
  Linguagens: {
    title: "Linguagens de Programação",
    description: "Explore as principais linguagens para web e software: HTML, CSS, JavaScript, Python e mais!",
    media: "<img src='img/linguagens.png' alt='Linguagens'>"
  },
  Html: {
  title: "HTML",
  description: `
    HTML (HyperText Markup Language) é a base da construção de páginas web. Ele define a estrutura e o conteúdo, organizando texto, imagens, links e outros elementos de forma hierárquica e semântica.
  `,
  media: `
  <img src='static/Estrutura HTML.png' alt='HTML'>
  <div class="texto-extra">
    
    <h3>🌐 Principais Tags:</h3>
    <ul>
      <li><code>&lt;h1&gt; a &lt;h6&gt;</code>: títulos de diferentes níveis</li>
      <li><code>&lt;p&gt;</code>: parágrafos</li>
      <li><code>&lt;a&gt;</code>: links</li>
      <li><code>&lt;img&gt;</code>: imagens</li>
      <li><code>&lt;div&gt;</code> e <code>&lt;section&gt;</code>: blocos de organização</li>
      <li><code>&lt;table&gt;</code>: cria tabelas (com <code>&lt;tr&gt;</code>, <code>&lt;td&gt;</code>, <code>&lt;th&gt;</code>)</li>
      <li><code>&lt;form&gt;</code>: constrói formulários para entrada de dados</li>
      <li><code>&lt;input&gt;</code>, <code>&lt;textarea&gt;</code>, <code>&lt;button&gt;</code>: campos interativos</li>
    </ul>

    <h3>📌 Curiosidade:</h3>
    <ul>
      HTML não é uma linguagem de programação: ele não "executa", apenas estrutura. O HTML5 foi lançado em 2014 e é atualizado continuamente! Existe um modo “quirks” em navegadores que emula comportamentos antigos de HTML mal escrito. Sites estáticos podem ser hospedados gratuitamente com serviços como <b>GitHub Pages</b>.
    </ul>

    <h3>🧠 Dica de ouro:</h3>
    <ul>
      <div class="cards-wrapper">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <h3>Dica-1</h3>
            </div>
            <div class="flip-card-back">
              <p>Não aninhe blocos como <code>&lt;p&gt;</code> dentro de <code>&lt;ul&gt;</code>, isso quebra semântica.</p>
            </div>
          </div>
        </div>

        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <h3>Dica-2</h3>
            </div>
            <div class="flip-card-back">
              <p>Use atributos <code>alt=""</code> nas imagens para acessibilidade e SEO</p>
            </div>
          </div>
        </div>

        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <h3>Dica-3</h3>
            </div>
            <div class="flip-card-back">
              <p>Considere ferramentas como Emmet para acelerar escrita de HTML</p>
            </div>
          </div>
        </div>

        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <h3>Dica-4</h3>
            </div>
            <div class="flip-card-back">
              <p>Indicar o idioma da página com <code>&lt;html lang="pt-br"&gt;</code> ajuda mecanismos de busca e leitores de tela a entenderem seu conteúdo. Isso melhora a acessibilidade e o SEO.</p>
            </div>
          </div>
        </div>

        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <h3>Dica-5</h3>
            </div>
            <div class="flip-card-back">
              <p>Prefira tags <strong>semânticas</strong> ao invés de genéricas: <code>&lt;main&gt;</code> &gt; <code>&lt;div&gt;</code></p>
            </div>
          </div>
        </div>

        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <h3>Dica-6</h3>
            </div>
            <div class="flip-card-back">
              <p>Use <code>aria-label</code> em botões, links e imagens para facilitar a navegação de pessoas com deficiência visual. Exemplo: <code>&lt;button aria-label="Fechar menu"&gt;✖&lt;/button&gt;</code></p>
            </div>
          </div>
        </div>

        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <h3>Dica-7</h3>
            </div>
            <div class="flip-card-back">
              <p>Evite excesso de <code>&lt;div&gt;</code> e use tags semânticas como <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>. Isso melhora a leitura do código e a experiência em navegadores e ferramentas assistivas.</p>
            </div>
          </div>
        </div>
      </div>
    </ul>

    <h3>🔖 Tags menos conhecidas mas poderosas:</h3>
    <ul>
      <li><code>&lt;details&gt;</code> e <code>&lt;summary&gt;</code>: criam blocos colapsáveis</li>
      <li><code>&lt;mark&gt;</code>: destaca texto com marcação</li>
      <li><code>&lt;progress&gt;</code>: barra de progresso visual</li>
      <li><code>&lt;meter&gt;</code>: exibe valor com medidor (tipo bateria!)</li>
      <li><code>&lt;time&gt;</code>: indica hora/data com significado temporal</li>
    </ul>

    <h3>📎 Extra para os devs:</h3>
    <ul>
      <li>Ferramentas como o <a href="https://validator.w3.org/" target="_blank">W3C Validator</a> ajudam a manter o HTML limpo</li>
      <li>Combinar HTML com ARIA roles melhora muito a acessibilidade</li>
      <li>Você pode estilizar tudo com CSS ou até integrar com frameworks tipo Tailwind, Bootstrap</li>
      <li>O primeiro site da história foi criado por Tim Berners-Lee em 1991 e ainda está online: <a href="http://info.cern.ch/" target="_blank">info.cern.ch</a></li>
    </ul>

  </div>
  `
},

CSS: {
  title: "CSS",
  description: `
    <h2>🎨 Introdução ao CSS</h2>
    <p>CSS (Cascading Style Sheets) é a camada de design da web. Ele separa a estrutura (HTML) do estilo, permitindo que você defina cores, espaçamentos, animações, layouts responsivos e muito mais. O CSS é o que torna a web bonita e funcional.</p>
    
    <img src="static/Estrutura CSS.png" alt="Estrutura CSS">

    <h3>🌐 Principais Propriedades de CSS</h3>
    <ul>
      <li><code>color</code>: define a cor do texto</li>
      <li><code>background-color</code>: define o fundo</li>
      <li><code>margin</code> e <code>padding</code>: espaçamentos externos e internos</li>
      <li><code>border</code>: bordas com estilos e cores</li>
      <li><code>display</code>: define o comportamento visual (block, inline, flex, grid)</li>
      <li><code>position</code>: controla o posicionamento (static, relative, absolute, fixed)</li>
      <li><code>transition</code> e <code>animation</code>: criam efeitos suaves e interativos</li>
    </ul>

    <h3>🧠 Curiosidades</h3>
    <ul>
      <li>O CSS foi proposto pela primeira vez em 1994 por Håkon Wium Lie.</li>
      <li>Hoje existem várias versões, sendo o CSS3 a mais usada.</li>
      <li>Você pode escrever CSS diretamente no HTML, em arquivos separados ou até usando pré-processadores como Sass.</li>
      <li>O seletor universal <code>*</code> estiliza todos os elementos da página de uma vez!</li>
      <li>CSS pode até ser usado para criar desenhos completos, só com código!</li>
    </ul>

    <h3>🧠 Dicas de Ouro</h3>
    <div class="cards-wrapper">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <h3>Dica-1</h3>
          </div>
          <div class="flip-card-back">
            <p>Use variáveis CSS com <code>:root</code> para manter cores e tamanhos consistentes.</p>
          </div>
        </div>
      </div>

      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <h3>Dica-2</h3>
          </div>
          <div class="flip-card-back">
            <p>Evite usar apenas <code>px</code>; experimente <code>em</code>, <code>rem</code> e <code>%</code> para responsividade.</p>
          </div>
        </div>
      </div>

      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <h3>Dica-3</h3>
          </div>
          <div class="flip-card-back">
            <p>O seletor <code>:not()</code> te ajuda a excluir elementos específicos ao estilizar.</p>
          </div>
        </div>
      </div>
    </div>

    <h3>🔖 Tags menos conhecidas mas poderosas</h3>
    <ul>
      <li><code>clip-path</code>: cria formas recortadas com CSS</li>
      <li><code>aspect-ratio</code>: define proporções de elementos visualmente</li>
      <li><code>scroll-snap</code>: fixa elementos em rolagem suave</li>
      <li><code>grid-template-areas</code>: nomeia partes do grid com facilidade</li>
      <li><code>filter</code>: aplica efeitos como blur, brilho, contraste e sombra em imagens ou divs</li>
    </ul>

    <h3>📎 Extra para Devs</h3>
    <ul>
      <li>Use o DevTools do navegador para testar estilos direto na página.</li>
      <li>Frameworks como Tailwind ou Bootstrap podem acelerar o design.</li>
      <li>Sites como <a href="https://css-tricks.com/" target="_blank">CSS-Tricks</a> e <a href="https://flexboxfroggy.com/" target="_blank">Flexbox Froggy</a> são ótimos para aprender brincando.</li>
    </ul>
  `,
},

JavaScript: {
  title: "JavaScript",
  description: `
    <h2>🚀 Introdução ao JavaScript</h2>
    <p>JavaScript é a linguagem que dá vida à web! Criado por <strong>Brendan Eich</strong> em 1995, ele permite criar animações, interações, lógica de jogos e até aplicações completas.</p>

    <img src="static/Estrutura JS.png" alt="Imagem estrutura JavaScript">

    <h3>🧩 Principais Recursos</h3>
    <ul>
      <li><code>DOM Manipulation</code>: altera elementos HTML dinamicamente</li>
      <li><code>Eventos</code>: responde a cliques, teclas e ações do usuário</li>
      <li><code>Funções</code>: blocos reutilizáveis de código</li>
      <li><code>Objetos</code>: estrutura de dados com propriedades e métodos</li>
      <li><code>Arrays</code>: listas de valores</li>
      <li><code>Promises</code> e <code>async/await</code>: controle de operações assíncronas</li>
    </ul>

    <h3>📚 Curiosidades</h3>
    <ul>
      <li>JavaScript foi criado em apenas 10 dias!</li>
      <li>Apesar do nome, JavaScript não tem relação direta com Java.</li>
      <li>Hoje é usado tanto no front-end quanto no back-end (com Node.js).</li>
    </ul>

    <h3>💡 Dicas Ninja</h3>
    <div class="cards-wrapper">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front"><h3>Dica-1</h3></div>
          <div class="flip-card-back"><p>Use <code>const</code> e <code>let</code> em vez de <code>var</code> para evitar bugs de escopo.</p></div>
        </div>
      </div>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front"><h3>Dica-2</h3></div>
          <div class="flip-card-back"><p>Evite manipular diretamente o DOM — prefira frameworks como React ou Vue.</p></div>
        </div>
      </div>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front"><h3>Dica-3</h3></div>
          <div class="flip-card-back"><p>Use <code>===</code> ao invés de <code>==</code> para evitar conversões inesperadas.</p></div>
        </div>
      </div>
    </div>

    <h3>🔧 Tags e Técnicas Avançadas</h3>
    <ul>
      <li><code>template literals</code>: strings com interpolação usando <code>\`\${valor}\`</code></li>
      <li><code>destructuring</code>: extrai dados de objetos e arrays com facilidade</li>
      <li><code>spread/rest</code>: manipula coleções de forma elegante</li>
      <li><code>closures</code>: funções que lembram o escopo onde foram criadas</li>
      <li><code>tagged templates</code>: manipulação avançada de strings</li>
    </ul>

    <h3>📎 Extra para Devs</h3>
    <ul>
      <li>Use <strong>DevTools</strong> para debugar e testar código em tempo real.</li>
      <li>Frameworks como React, Vue e Angular aceleram o desenvolvimento.</li>
      <li>Sites como <a href="https://javascript.info/" target="_blank">JavaScript.info</a> e <a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript" target="_blank">MDN Web Docs</a> são ótimos para aprender.</li>
    </ul>
  `,
},

Animações: {
  title: "As melhores animações",
  description: `
    <h2>🎞️ Introdução às Animações</h2>
    <p>As animações web são responsáveis por dar fluidez, emoção e interatividade aos elementos da página. Elas podem ser feitas com <strong>CSS</strong>, <strong>JavaScript</strong> ou usando bibliotecas como <strong>GSAP</strong> e <strong>Anime.js</strong>.</p>

    <img src="static/Estrutura Animação.png" alt="Imagem de animações web">

    <h3>🎨 Tipos de Animações</h3>
    <ul>
      <li><strong>Transições CSS</strong>: mudanças suaves entre estados (hover, foco, etc.)</li>
      <li><strong>Keyframes CSS</strong>: animações complexas com múltiplos estados</li>
      <li><strong>JavaScript</strong>: controle total sobre tempo, lógica e interações</li>
      <li><strong>Canvas & SVG</strong>: animações gráficas e vetoriais</li>
      <li><strong>Web Animations API</strong>: animações nativas com controle avançado</li>
    </ul>

    <h3>📚 Curiosidades</h3>
    <ul>
      <li>O CSS3 trouxe animações nativas sem precisar de JavaScript.</li>
      <li>GSAP é usado por grandes marcas como Google e Nike.</li>
      <li>Anime.js permite animar qualquer coisa — de SVGs a objetos JS!</li>
    </ul>

    <h3>💡 Dicas Visuais</h3>
    <div class="cards-wrapper">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front"><h3>Dica-1</h3></div>
          <div class="flip-card-back"><p>Use <code>transform</code> e <code>opacity</code> para animações suaves e performáticas.</p></div>
        </div>
      </div>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front"><h3>Dica-2</h3></div>
          <div class="flip-card-back"><p>Evite animar <code>width</code> e <code>height</code> — prefira <code>scale()</code>.</p></div>
        </div>
      </div>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front"><h3>Dica-3</h3></div>
          <div class="flip-card-back"><p>Combine <code>@keyframes</code> com <code>animation-delay</code> para efeitos em sequência.</p></div>
        </div>
      </div>
    </div>

    <h3>🔧 Técnicas Avançadas</h3>
    <ul>
      <li><code>@keyframes</code>: define etapas da animação</li>
      <li><code>animation-timing-function</code>: controla a velocidade (ease, linear, etc.)</li>
      <li><code>requestAnimationFrame()</code>: animações JS sincronizadas com o navegador</li>
      <li><code>Element.animate()</code>: Web Animations API para controle direto</li>
      <li><code>GSAP</code>: animações com timeline, controle e reversão</li>
    </ul>

    <h3>📎 Extra para Devs</h3>
    <ul>
      <li>Use <strong>Codepen</strong> e <strong>GitHub</strong> para explorar exemplos prontos.</li>
      <li>Ferramentas como <a href="https://animate.style/" target="_blank">Animate.css</a> aceleram o processo.</li>
      <li>Explore <a href="https://www.sliderrevolution.com/design/cool-javascript-animations/" target="_blank">Slider Revolution</a> para animações JS avançadas.</li>
    </ul>
  `,
},

Utilidades: {
  title: "Utilidades",
  description: `
    <h2>🧰 Utilidades com HTML, CSS e JavaScript</h2>
    <p>Além de conteúdo visual, sites podem oferecer funcionalidades úteis como busca, previsão do tempo, mapas interativos, calendários, notificações e muito mais. Tudo isso é possível com a combinação poderosa de HTML, CSS e JavaScript.</p>

    <img src="static/Utilidades.png" alt="Imagem de utilidades web">

    <h3>🔍 Exemplos de Funcionalidades</h3>
    <ul>
      <li><strong>Barra de busca</strong>: permite encontrar conteúdo rapidamente</li>
      <li><strong>Previsão do tempo</strong>: integração com APIs meteorológicas</li>
      <li><strong>Mapas interativos</strong>: usando Google Maps ou Leaflet</li>
      <li><strong>Calendário</strong>: agendamento e exibição de datas</li>
      <li><strong>Modo escuro/claro</strong>: alternância de temas com CSS e JS</li>
      <li><strong>Notificações</strong>: alertas personalizados com JavaScript</li>
      <li><strong>Validação de formulários</strong>: garante dados corretos</li>
    </ul>

    <h3>📚 Curiosidades</h3>
    <ul>
      <li>É possível criar uma calculadora funcional apenas com HTML, CSS e JS.</li>
      <li>Sites modernos usam APIs para buscar dados em tempo real (como clima ou localização).</li>
      <li>Você pode criar um sistema de login básico com armazenamento local usando <code>localStorage</code>.</li>
    </ul>

    <h3>💡 Dicas Funcionais</h3>
    <div class="cards-wrapper">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front"><h3>Dica-1</h3></div>
          <div class="flip-card-back"><p>Use <code>fetch()</code> para consumir APIs e trazer dados dinâmicos.</p></div>
        </div>
      </div>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front"><h3>Dica-2</h3></div>
          <div class="flip-card-back"><p>Combine <code>input[type="date"]</code> com JS para criar calendários interativos.</p></div>
        </div>
      </div>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front"><h3>Dica-3</h3></div>
          <div class="flip-card-back"><p>Use <code>navigator.geolocation</code> para obter a localização do usuário.</p></div>
        </div>
      </div>
    </div>

    <h3>🔧 Técnicas Avançadas</h3>
    <ul>
      <li><code>localStorage</code> e <code>sessionStorage</code>: armazenam dados no navegador</li>
      <li><code>Web APIs</code>: como Weather API, Maps API, News API</li>
      <li><code>Event Listeners</code>: capturam ações do usuário</li>
      <li><code>Regex</code>: validação avançada de campos</li>
      <li><code>Service Workers</code>: permitem funcionalidades offline</li>
    </ul>

    <h3>📎 Extra para Devs</h3>
    <ul>
      <li>Explore <a href="https://rapidapi.com/" target="_blank">RapidAPI</a> para encontrar APIs úteis.</li>
      <li>Use <strong>DevTools</strong> para testar funcionalidades em tempo real.</li>
      <li>Sites como <a href="https://codepen.io/" target="_blank">CodePen</a> e <a href="https://github.com/solygambas/html-css-javascript-projects" target="_blank">GitHub Projects</a> têm exemplos incríveis.</li>
    </ul>
  `,
},

Adicionar: {
  title: "Coisas Úteis para se adicionar em seu site",
  description: `
    <h2>🧪 Elementos e Funcionalidades Maneiras</h2>
    <p>Seu site pode ser muito mais do que texto e imagens. Com HTML, CSS e JavaScript, você pode adicionar recursos interativos, visuais marcantes e utilidades que surpreendem o visitante.</p>

    <img src="static/Utilidades.png" alt="Elementos úteis para sites">

    <h3>🧰 Utilidades que fazem diferença</h3>
    <ul>
      <li><strong>Modo escuro automático</strong>: muda com base no horário ou preferência do navegador</li>
      <li><strong>Gerador de frases aleatórias</strong>: motivações, curiosidades ou piadas</li>
      <li><strong>Calculadora embutida</strong>: útil para sites de finanças, saúde ou estudos</li>
      <li><strong>Relógio em tempo real</strong>: digital, analógico ou com fusos diferentes</li>
      <li><strong>Contador regressivo</strong>: para eventos, lançamentos ou desafios</li>
      <li><strong>Barra de progresso</strong>: mostra quanto falta para concluir uma leitura ou tarefa</li>
      <li><strong>Notificações visuais</strong>: alertas com animações ou sons</li>
    </ul>

    <h3>📚 Curiosidades que engajam</h3>
    <ul>
      <li>Você pode usar <code>&lt;details&gt;</code> e <code>&lt;summary&gt;</code> para criar seções dobráveis sem JS.</li>
      <li>Com <code>SpeechSynthesis</code>, o navegador pode “falar” textos em voz alta.</li>
      <li>É possível criar um sistema de conquistas com <code>localStorage</code> e ícones desbloqueáveis.</li>
    </ul>

    <h3>💡 Dicas Criativas</h3>
    <div class="cards-wrapper">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front"><h3>Dica-1</h3></div>
          <div class="flip-card-back"><p>Use <code>&lt;canvas&gt;</code> para criar desenhos, jogos ou efeitos visuais.</p></div>
        </div>
      </div>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front"><h3>Dica-2</h3></div>
          <div class="flip-card-back"><p>Adicione um botão de “voltar ao topo” com animação suave usando <code>scrollTo()</code>.</p></div>
        </div>
      </div>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front"><h3>Dica-3</h3></div>
          <div class="flip-card-back"><p>Crie um easter egg ativado por combinação de teclas ou clique secreto.</p></div>
        </div>
      </div>
    </div>

    <h3>🔖 Tags e APIs úteis</h3>
    <ul>
      <li><code>&lt;progress&gt;</code>: barra de progresso visual</li>
      <li><code>&lt;meter&gt;</code>: medidor de valor (tipo bateria)</li>
      <li><code>navigator.geolocation</code>: obtém localização do usuário</li>
      <li><code>Notification API</code>: envia alertas nativos do navegador</li>
      <li><code>Clipboard API</code>: copia texto com um clique</li>
    </ul>

    <h3>📎 Extra para Devs</h3>
    <ul>
      <li>Explore <a href="https://uiverse.io/" target="_blank">Uiverse</a> para copiar componentes prontos</li>
      <li>Use <a href="https://webutility.io/" target="_blank">WebUtility.io</a> para testar e gerar recursos úteis</li>
      <li>Veja <a href="https://prismic.io/blog/css-animation-examples" target="_blank">39 exemplos de animações CSS</a> para se inspirar</li>
    </ul>
  `,
  media: "<img src='img/utilidades.png' alt='Elementos interativos'>"
},
};

// Navegação principal via links do content-nav
document.querySelectorAll(".content-nav a").forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const page = link.getAttribute("data-page");

    const selectedPage = pages[page] || {
      title: "Erro",
      description: "Página não encontrada.",
      media: ""
    };

    content.innerHTML = `
      <h2>${selectedPage.title}</h2>
      <p>${selectedPage.description}</p>
      ${selectedPage.media}
    `;
  });
});

// Zoom
const overlay = document.createElement("div");
overlay.id = "img-overlay";
overlay.innerHTML = "<img src=''>";
document.body.appendChild(overlay);

const overlayImg = overlay.querySelector("img");
let zoomLevel = 1;

// Abrir e fechar o overlay
document.addEventListener("click", (e) => {
  const img = e.target.closest("img");

  if (img && !overlay.contains(img)) {
    overlayImg.src = img.src;
    zoomLevel = 1;
    overlayImg.style.transform = "scale(0.5)";
    overlay.classList.add("active");
  }

  if (e.target === overlay) {
    overlay.classList.remove("active");
    overlayImg.src = "";
    zoomLevel = 1;
    overlayImg.style.transform = "scale(1)";
  }
});

// Zoom com scroll
overlayImg.addEventListener("wheel", (e) => {
  e.preventDefault();
  zoomLevel += e.deltaY > 0 ? -0.1 : 0.1;
  zoomLevel = Math.min(Math.max(zoomLevel, 1), 3);
  overlayImg.style.transform = `scale(${zoomLevel})`;
});


// Menu (hambúrguer)
const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const menu = document.getElementById("menu");

// Abre o menu
menuBtn.addEventListener("click", (event) => {
  event.preventDefault();
  menu.classList.add("open");
  menuBtn.style.display = "none";
});

// Fecha o menu
closeMenu.addEventListener("click", (event) => {
  event.preventDefault();
  menu.classList.remove("open");
  setTimeout(() => {
    menuBtn.style.display = "block";
  }, 300);
});

// Fecha o menu ao clicar em qualquer link
document.querySelectorAll("#menu a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    setTimeout(() => {
      menuBtn.style.display = "block";
    }, 300);
  });
});


const elements = document.querySelectorAll(".scroll-animation");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

elements.forEach(element => observer.observe(element));

const clickSound = new Audio("sounds/click.mp3");

document.querySelectorAll("#menuBtn").forEach(element => {
    element.addEventListener("click", () => {
        clickSound.play();
    });
});

clickSound.volume = 0.7;

const dotButton = document.getElementById("dotButton");
const hiddenImage = document.getElementById("hiddenImage");
const spotifyPlayer = document.getElementById("spotifyPlayer");
const easterEgg = document.getElementById("easterEgg");

// Função para ocultar todos os elementos do easter egg
function fecharEasterEgg() {
    hiddenImage.style.display = "none";
    spotifyPlayer.style.display = "none";
    dotButton.style.display = "block"; // Mostra novamente o botão "."
}

// Evento de clique no botão "."
dotButton.addEventListener("click", (event) => {
    event.stopPropagation();
    dotButton.style.display = "none"; 
    hiddenImage.style.display = "block"; 
});

// Evento de clique na imagem
hiddenImage.addEventListener("click", (event) => {
    event.stopPropagation(); // Impede que o clique feche o easter egg
    hiddenImage.style.display = "none"; 
    spotifyPlayer.style.display = "block";
});

// Evento que fecha o easter egg ao clicar fora dele
document.addEventListener("click", (event) => {
    if (!easterEgg.contains(event.target)) { 
        fecharEasterEgg();
    }
});

// Palavras Dinamicas
const palavras =  ['Incrivel', 'Insana', 'de outro Mundo', 'Construtiva', 'Magnifica', 'Inesquecível', 'Divertida', 'Maneira'];
const palavraEl = document.getElementById('palavra-dinamica');
let palavraAtual = 0;

function digitaTexto(texto,i = 0) {
    if (i <= texto.length) {
        palavraEl.textContent = texto.slice(0, i);
        setTimeout(() => digitaTexto(texto, i + 1), 80);
    }
}

function alteraPalavra() {
    const palavra = palavras[palavraAtual];
    digitaTexto(palavra);
    palavraAtual = (palavraAtual + 1) % palavras.length;
}

alteraPalavra();
setInterval(alteraPalavra, 3000);

// --- Início do Widget de Previsão do Tempo ---
const API_KEY = "091a5278f57f023fbcf6853d179be3c2";
const OPENCAGE_KEY = "0c9e4c20211e4c7d8adef9ed31bf5f9d";
let currentCity = "Sao Paulo";

// Mapeamento manual de bairros específicos
const bairroOverrides = {
  "Avenida Manoel Bolívar": "Jardim Carombé",
  // Adicione outras ruas conhecidas aqui
};

const sunBtn = document.getElementById("sun-btn");
const weatherPopup = document.getElementById("weather-popup");
const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const descEl = document.getElementById("desc");
const windEl = document.getElementById("wind");
const forecastLink = document.getElementById("full-forecast-link");
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

// Caixa de sugestões
const suggestionBox = document.createElement("ul");
Object.assign(suggestionBox.style, {
  position: "absolute",
  top: "100%",
  right: "0",
  background: "#333",
  color: "white",
  borderRadius: "4px",
  padding: "5px 0",
  marginTop: "4px",
  listStyle: "none",
  maxHeight: "160px",
  overflowY: "auto",
  zIndex: "1000",
  width: "100%",
});
suggestionBox.id = "suggestions";
document.getElementById("search-bar").style.position = "relative";
document.getElementById("search-bar").appendChild(suggestionBox);

// --- Funções principais ---
async function getWeatherData(input) {
  const isCep = /^\d{5}-?\d{3}$/.test(input) || /^\d{4,5}$/.test(input);
  const url = isCep
    ? `https://api.openweathermap.org/data/2.5/weather?zip=${input},BR&appid=${API_KEY}&units=metric&lang=pt_br`
    : `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}&units=metric&lang=pt_br`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar clima:", error.message);
    updateWeatherUI(null);
    return null;
  }
}

async function getWeatherDataByCoords(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Erro por coordenadas:", error.message);
    updateWeatherUI(null);
    return null;
  }
}

function updateWeatherUI(data) {
  if (!data) return;

  const condition = data.weather[0].main.toLowerCase();
  const description = data.weather[0].description;
  let iconHTML = `<img src="gifs/padrao.gif" alt="Clima atual" width="60">`;

  if (condition.includes("clear")) iconHTML = `<img src="gifs/sol.gif" alt="Ensolarado">`;
  else if (condition.includes("rain")) iconHTML = `<img src="gifs/chuva.gif" alt="Chuvoso">`;
  else if (condition.includes("cloud")) iconHTML = `<img src="gifs/nublado.gif" alt="Nublado">`;
  else if (condition.includes("thunderstorm")) iconHTML = `<img src="gifs/tempestade.gif" alt="Tempestade">`;
  else if (["mist", "fog", "haze", "smoke"].some(x => condition.includes(x)))
    iconHTML = `<img src="static/nevoa.png" alt="Neblina">`;

  sunBtn.innerHTML = iconHTML;
  cityEl.textContent = `Cidade: ${data.name}`;
  tempEl.textContent = `Temperatura: ${Math.round(data.main.temp)}°C`;
  descEl.textContent = `Condição: ${description.charAt(0).toUpperCase() + description.slice(1)}`;
  windEl.textContent = `Vento: ${data.wind.speed} m/s`;

  if (forecastLink && data.coord) {
    const { lat, lon } = data.coord;
    forecastLink.href = `https://openweathermap.org/weathermap?lat=${lat}&lon=${lon}&zoom=10`;
  }
}

// Comportamento do botão do sol
sunBtn.addEventListener("click", async (event) => {
  event.stopPropagation();
  weatherPopup.classList.toggle("show");
  if (weatherPopup.classList.contains("show")) {
    const data = await getWeatherData(currentCity);
    updateWeatherUI(data);
  }
});

// Fecha popup ao clicar fora
document.addEventListener("click", (event) => {
  if (!weatherPopup.contains(event.target) && !sunBtn.contains(event.target)) {
    weatherPopup.classList.remove("show");
  }
});

// Lupa ativa a busca
searchBtn.addEventListener("click", () => {
  cityInput.classList.toggle("visible");
  searchBtn.classList.add("spin");
  setTimeout(() => {
    searchBtn.classList.remove("spin");
    cityInput.focus();
  }, 400);
});

// Autocomplete com override de bairro
cityInput.addEventListener("input", async () => {
  const query = cityInput.value.trim();
  suggestionBox.innerHTML = "";
  if (query.length < 3) return;

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${OPENCAGE_KEY}&limit=5&language=pt&countrycode=br`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    data.results.forEach(result => {
      const components = result.components;
      const rua = components.road || "";
      let bairro =
        components.suburb ||
        components.neighbourhood ||
        components.quarter ||
        components.hamlet ||
        components.village ||
        components.district ||
        "";

      if (bairroOverrides[rua]) {
        bairro = bairroOverrides[rua];
      }

      const cidade =
        components.city ||
        components.town ||
        components.municipality ||
        components.village ||
        "";

      const estado = components.state || "";
      const pais = components.country || "";
      const cep = components.postcode || "";

      let labelParts = [];
      if (bairro) labelParts.push(bairro);
      if (cidade) labelParts.push(cidade);
      if (estado) labelParts.push(estado);
      if (pais) labelParts.push(pais);
      if (cep) labelParts.push(`CEP ${cep}`);
      const label = labelParts.length > 0 ? labelParts.join(", ") : result.formatted;

      const lat = result.geometry.lat;
      const lon = result.geometry.lng;

      const item = document.createElement("li");
      item.textContent = `📍 ${label}`;
      Object.assign(item.style, {
        padding: "8px 12px",
        cursor: "pointer",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      });

      item.addEventListener("click", async () => {
        currentCity = label;
        suggestionBox.innerHTML = "";
        cityInput.value = "";
        weatherPopup.classList.add("show");
        const data = await getWeatherDataByCoords(lat, lon);
        updateWeatherUI(data);
      });

      suggestionBox.appendChild(item);
    });
  } catch (err) {
    console.error("Erro no autocomplete:", err);
  }
});

// Enter ativa busca direta
cityInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const input = cityInput.value.trim();
    suggestionBox.innerHTML = "";
    if (input) {
      currentCity = input;
      const data = await getWeatherData(input);
      updateWeatherUI(data);
      cityInput.value = "";
      weatherPopup.classList.add("show");
    }
  }
});

// --- Curiosidades ---
const curiosidades = [
  "Polvos têm três corações e azul no sangue. 🐙",
  "A banana é uma fruta radioativa — por causa do potássio! 🍌",
  "Você sabia que o Google era chamado de BackRub em 1996?",
  "Cafés no Japão podem cobrar pela companhia de gatos… ou de corujas 🦉",
  "Tem mais formas de baralhar cartas do que átomos no universo conhecido♦️♣️.",
  "O emoji 💩 foi adicionado ao Unicode em 2010. Revolução silenciosa.",
  "Você consegue lamber seu cotovelo? 1 em cada 100 tenta agora 👅",
  "Se você digitar 'do a barrel roll' no Google, algo mágico acontece ⁉️",
  "O barulho do sabre de luz em Star Wars foi feito com um projetor velho e TV analógica 📺",
  "Desafio: escreva seu nome como se fosse um feitiço de Harry Potter 🪄",
  "Ironicamente, o inventor da lâmpada elétrica não curtia muito estar sem luz 💡",
  "Existe um buraco geográfico na França chamado o vilarejo mais silencioso do mundo 🕳️",
  "Quando o Hulk surgiu nas HQs em 1962, sua cor original era cinza. Mudaram para verde por causa de problemas na impressão",
  "Água quente congela mais rápido que água fria, parece mentira, mas é o chamado Efeito Mpemba. Cientistas ainda debatem exatamente por quê!🧊",
  "Lulas gigantes têm olhos do tamanho de pratos de jantar chegam a medir até 27 cm de diâmetro, os maiores olhos do reino animal 🦑",
  "Napoleão tinha uma fobia de gatos, apesar de seu poder militar, ele era totalmente aterrorizado por gatos 🐈",
  "O aroma de pizza ativa as mesmas áreas do cérebro que o amor romântico, é por isso que é quase impossível resistir a uma fatia! 🍕",
  "Há mais formas de jogar xadrez do que átomos no universo, o número de combinações possíveis passa dos 10⁴⁰, superando fácil qualquer tentativa humana de dominar tudo."
];

document.getElementById("btn-gerar").addEventListener("click", () => {
  const frase = curiosidades[Math.floor(Math.random() * curiosidades.length)];
  const resultado = document.getElementById("resultado");

  resultado.style.opacity = 0;
  resultado.innerText = frase;

  // Anima suavemente a opacidade
  setTimeout(() => {
    resultado.style.transition = "opacity 0.6s ease";
    resultado.style.opacity = 1;
  }, 50);
});


// Limpa o resultado ao clicar fora da caixa
document.addEventListener("click", (e) => {
  const resultado = document.getElementById("resultado");
  const randomBox = document.getElementById("caixa");

  // Se clicou fora do botão ou da caixa, limpa o conteúdo
  if (!randomBox.contains(e.target)) {
    resultado.innerText = "";
  }
});

// --- Tecla secreta ---
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "-") {
    document.body.classList.toggle("tema-escuro");
  }
});

const randomBox = document.getElementById("caixa");
const toggleBtn = document.getElementById("btn-aleatorio");

let recolhido = false;

toggleBtn.addEventListener("click", () => {
  recolhido = !recolhido;
  randomBox.classList.toggle("recolhido", recolhido);
  toggleBtn.textContent = recolhido ? "›" : "‹";
});
