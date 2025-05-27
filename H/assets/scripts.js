// Inclui header e footer automaticamente em todas as páginas
function includeHTML(selector, file) {
  fetch(file)
    .then(response => response.text())
    .then(html => {
      document.querySelector(selector).innerHTML = html;
      if (file === 'header.html') setupMenu();
    });
}

function setupMenu() {
  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.menu-mobile-overlay');
  const body = document.body;
  if (hamburger && overlay) {
    hamburger.onclick = () => {
      overlay.style.display = 'flex';
      body.classList.add('menu-open');
    };
    overlay.onclick = e => {
      if (e.target === overlay) {
        overlay.style.display = 'none';
        body.classList.remove('menu-open');
      }
    };
    document.querySelectorAll('.menu-mobile-overlay .menu-list a').forEach(link => {
      link.onclick = () => {
        overlay.style.display = 'none';
        body.classList.remove('menu-open');
      };
    });
    // Ativa link atual
    let path = window.location.pathname.split('/').pop();
    if (!path) path = "index.html";
    document.querySelectorAll('.menu-list a').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === path);
    });
  }
}

// Member counter widget (fake for now)
const countKey = "aisha256MemberCount";
function getMemberCount() {
  let count = localStorage.getItem(countKey);
  if (!count) {
    count = Math.floor(850 + Math.random() * 4000);
    localStorage.setItem(countKey, count);
  }
  return count;
}
function updateMemberCount() {
  const el = document.getElementById('memberCount');
  if (el) el.textContent = `Community Members: ${getMemberCount()}`;
}
document.addEventListener('DOMContentLoaded', updateMemberCount);

// BTC Address copy
function copyBTCAddress() {
  const btc = document.querySelector('.btc-address-box code').textContent;
  navigator.clipboard.writeText(btc);
  alert('BTC address copied!');
}

// Suggestion form handling (Formspree)
document.addEventListener('DOMContentLoaded', function() {
  const suggestForm = document.getElementById('suggestForm');
  if (suggestForm) {
    suggestForm.onsubmit = async function(e) {
      e.preventDefault();
      const formData = new FormData(suggestForm);
      // Replace below with your own Formspree endpoint!
      const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORM_ID";
      try {
        const res = await fetch(FORMSPREE_URL, {
          method: "POST",
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          document.getElementById('suggestMsg').innerHTML =
            "Thank you for your suggestion! 💡";
          suggestForm.reset();
        } else {
          document.getElementById('suggestMsg').innerHTML =
            "Sorry, something went wrong. Please try again later.";
        }
      } catch {
        document.getElementById('suggestMsg').innerHTML =
          "Sorry, something went wrong. Please try again later.";
      }
    }
  }
});

// === ZOOM Ajustável com PinchZoom.js ===
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.avatar-frame pinch-zoom').forEach(pz => {
    // PinchZoom.js já se inicializa sozinho, mas garantimos o máximo de zoom:
    pz.zoomFactor = 10;
  });
});