!function(){var t,e=document.querySelector("button[data-start]"),a=document.querySelector("button[data-stop]"),n=document.querySelector("body");e.addEventListener("click",(function(e){e.target.disabled=!0,a.disabled=!1,t=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));n.style.background=t}),1e3)})),a.addEventListener("click",(function(a){a.target.disabled=!0,e.disabled=!1,clearInterval(t)}))}();
//# sourceMappingURL=01-color-switcher.7d23d12f.js.map
