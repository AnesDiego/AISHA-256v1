// --- Member counter widget (fake for now, easy to extend) ---
const countKey = "aisha256MemberCount";
function getMemberCount() {
  let count = localStorage.getItem(countKey);
  if (!count) {
    count = Math.floor(850 + Math.random() * 4000); // Start with a random base
    localStorage.setItem(countKey, count);
  }
  return count;
}
function updateMemberCount() {
  const el = document.getElementById('memberCount');
  if (el) el.textContent = `Community Members: ${getMemberCount()}`;
}
updateMemberCount();

// --- BTC Address copy ---
function copyBTCAddress() {
  const btc = document.querySelector('.btc-address-box code').textContent;
  navigator.clipboard.writeText(btc);
  alert('BTC address copied!');
}

// --- Suggestion form handling (Formspree) ---
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

// --- Avatar Zoom and Pan ---
window.addEventListener('DOMContentLoaded', () => {
  const avatar = document.getElementById('avatarImg');
  if (avatar && window.Panzoom) {
    const panzoom = Panzoom(avatar, {
      maxScale: 8,
      minScale: 1,
      contain: 'outside',
      panOnlyWhenZoomed: true
    });
    avatar.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);
    avatar.style.cursor = "zoom-in";
  }
});