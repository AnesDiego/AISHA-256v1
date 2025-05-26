// --- Member counter widget (simulate with localStorage for now) ---
const countKey = "aisha256MemberCount";
function getMemberCount() {
  let count = localStorage.getItem(countKey);
  if (!count) {
    count = Math.floor(100 + Math.random() * 1000); // Start with a random base
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

// --- Suggestion form handling ---
const suggestForm = document.getElementById('suggestForm');
if (suggestForm) {
  suggestForm.onsubmit = function(e) {
    e.preventDefault();
    // Here you would normally send to a backend or a form service
    document.getElementById('suggestMsg').innerHTML = 
      "<span style='color: #18e;'>Thank you for your suggestion! 💡</span>";
    suggestForm.reset();
  }
}