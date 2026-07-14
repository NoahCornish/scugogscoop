
const pages = [
  ["index.html","Home"],
  ["council.html","Council"],
  ["news.html","News"],
  ["opinion.html","Opinion"],
  ["election.html","Election 2026"],
  ["about.html","About"]
];

function currentFile(){
  return location.pathname.split("/").pop() || "index.html";
}

function renderChrome(){
  const current=currentFile();
  const header=document.querySelector("[data-header]");
  const footer=document.querySelector("[data-footer]");
  const bottom=document.querySelector("[data-bottom]");

  if(header){
    header.innerHTML=`
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="top-strip">
        <div class="container">
          <span>Independent local civic coverage for Scugog</span>
          <span><a href="about.html">News, opinion and Council coverage are clearly labelled</a></span>
        </div>
      </div>
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="The Scugog Scoop home">
            <span class="brand-mark">S</span>
            <span class="brand-copy"><strong>The Scugog Scoop</strong><span>Local decisions. Clear information.</span></span>
          </a>
          <nav class="desktop-nav" aria-label="Primary navigation">
            ${pages.map(([href,label])=>`<a href="${href}" ${current===href?'aria-current="page"':''}>${label}</a>`).join("")}
          </nav>
          <button class="menu-btn" aria-label="Open navigation" aria-expanded="false"><span class="menu-lines"></span></button>
        </div>
      </header>
      <div class="mobile-menu" aria-hidden="true">
        <nav>
          ${pages.map(([href,label])=>`<a href="${href}" ${current===href?'aria-current="page"':''}>${label}</a>`).join("")}
        </nav>
      </div>`;
  }

  if(footer){
    footer.innerHTML=`
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <strong>The Scugog Scoop</strong>
            <p>An independent civic news and opinion project covering Council, local issues and the 2026 municipal election.</p>
            <p><small>Not affiliated with the Township of Scugog, Council, any political party or any candidate.</small></p>
          </div>
          <nav class="footer-links">
            <a href="council.html">Council</a>
            <a href="news.html">News</a>
            <a href="opinion.html">Opinion</a>
            <a href="about.html">About</a>
          </nav>
        </div>
      </footer>`;
  }

  if(bottom){
    const items=[
      ["index.html","⌂","Home"],
      ["council.html","◷","Council"],
      ["news.html","▤","News"],
      ["election.html","★","Election"]
    ];
    bottom.innerHTML=`<nav class="mobile-bottom" aria-label="Quick navigation">
      ${items.map(([href,icon,label])=>`<a href="${href}" ${current===href?'aria-current="page"':''}><span>${icon}</span>${label}</a>`).join("")}
    </nav>`;
  }

  const button=document.querySelector(".menu-btn");
  const menu=document.querySelector(".mobile-menu");
  if(button&&menu){
    button.addEventListener("click",()=>{
      const open=menu.classList.toggle("open");
      document.body.classList.toggle("menu-open",open);
      button.setAttribute("aria-expanded",String(open));
      menu.setAttribute("aria-hidden",String(!open));
    });
  }
}

renderChrome();
