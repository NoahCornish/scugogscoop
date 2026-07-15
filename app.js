
const pages = [
  ["/","Home"],
  ["/council/","Council"],
  ["/news/","News"],
  ["/opinion/","Opinion"],
  ["/election/","Election 2026"],
  ["/about/","About"]
];

function currentPath(){
  let path = location.pathname;
  if(!path.endsWith("/")) path += "/";
  return path;
}

function renderChrome(){
  const current = currentPath();
  const header = document.querySelector("[data-header]");
  const footer = document.querySelector("[data-footer]");
  const bottom = document.querySelector("[data-bottom]");

  if(header){
    header.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="/">
            <span class="brand-mark">S</span>
            <span><strong>The Scugog Scoop</strong><small></small></span>
          </a>
          <nav class="nav">
            ${pages.map(([href,label])=>`<a href="${href}" ${current===href?'aria-current="page"':''}>${label}</a>`).join("")}
          </nav>
          <button class="menu-btn" aria-label="Open navigation" aria-expanded="false">☰</button>
        </div>
      </header>
      <div class="mobile-menu" aria-hidden="true">
        <nav>${pages.map(([href,label])=>`<a href="${href}" ${current===href?'aria-current="page"':''}>${label}</a>`).join("")}</nav>
      </div>`;
  }

  if(footer){
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <strong>The Scugog Scoop</strong>
            <p>An independent local civic news and opinion project. The site is just getting started and will continue to grow.</p>
            <p><small>Not affiliated with the Township of Scugog, Council, any political party or any candidate.</small></p>
          </div>
          <nav class="footer-links">
            <a href="/news/">News</a>
            <a href="/opinion/">Opinion</a>
            <a href="/election/">Election 2026</a>
            <a href="/about/">About</a>
          </nav>
        </div>
      </footer>`;
  }

  if(bottom){
    const items=[
      ["/","⌂","Home"],
      ["/council/","◷","Council"],
      ["/news/","▤","News"],
      ["/election/","★","Election"]
    ];
    bottom.innerHTML = `<nav class="mobile-bottom">
      ${items.map(([href,icon,label])=>`<a href="${href}" ${current===href?'aria-current="page"':''}><span>${icon}</span>${label}</a>`).join("")}
    </nav>`;
  }

  const btn=document.querySelector(".menu-btn");
  const menu=document.querySelector(".mobile-menu");
  if(btn&&menu){
    btn.addEventListener("click",()=>{
      const open=menu.classList.toggle("open");
      btn.setAttribute("aria-expanded",String(open));
      menu.setAttribute("aria-hidden",String(!open));
    });
  }
}

renderChrome();
