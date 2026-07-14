
const pages = [
  ["index.html","Home"],
  ["council.html","Council Watch"],
  ["issues.html","Key Issues"],
  ["spending.html","Spending"],
  ["development.html","Growth & Development"],
  ["opinion.html","Opinion"],
  ["election.html","Election 2026"],
  ["about.html","About"]
];

function currentFile(){
  return location.pathname.split("/").pop() || "index.html";
}

function renderSiteChrome(){
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
          <span><a href="about.html">How we label news, analysis and opinion</a></span>
        </div>
      </div>
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="The Scugog Scoop home">
            <span class="brand-mark">S</span>
            <span class="brand-copy"><strong>The Scugog Scoop</strong><span>Local decisions. Clear information.</span></span>
          </a>
          <nav class="desktop-nav" aria-label="Primary navigation">
            ${pages.slice(1,7).map(([href,label])=>`<a href="${href}" ${current===href?'aria-current="page"':''}>${label}</a>`).join("")}
            <a class="nav-cta" href="about.html">About</a>
          </nav>
          <button class="menu-btn" aria-label="Open navigation" aria-expanded="false"><span class="menu-lines"></span></button>
        </div>
      </header>
      <div class="mobile-menu" aria-hidden="true">
        <nav>
          ${pages.map(([href,label])=>`<a href="${href}" class="${href==="council.html"?'mobile-primary':''}" ${current===href?'aria-current="page"':''}>${label}</a>`).join("")}
        </nav>
      </div>`;
  }

  if(footer){
    footer.innerHTML=`
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <strong>The Scugog Scoop</strong>
            <p>An independent civic information and opinion project focused on Township of Scugog decisions, spending, growth and local issues.</p>
            <p><small>Not affiliated with the Township of Scugog, Council, any political party or any candidate.</small></p>
          </div>
          <nav class="footer-links" aria-label="Footer links">
            <a href="about.html">About</a>
            <a href="council.html">Council Watch</a>
            <a href="opinion.html">Opinion</a>
            <a href="election.html">Election 2026</a>
          </nav>
        </div>
      </footer>`;
  }

  if(bottom){
    const items=[
      ["index.html","⌂","Home"],
      ["council.html","◷","Council"],
      ["issues.html","◎","Issues"],
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

function setupCopy(){
  document.querySelectorAll("[data-copy]").forEach(btn=>{
    btn.addEventListener("click",async()=>{
      try{
        await navigator.clipboard.writeText(location.href);
        const old=btn.textContent;
        btn.textContent="Link copied";
        setTimeout(()=>btn.textContent=old,1500);
      }catch{
        alert("Copying is not available in this browser.");
      }
    });
  });
}

renderSiteChrome();
setupCopy();
