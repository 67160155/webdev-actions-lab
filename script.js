const root = document.documentElement;
const themeBtn = document.querySelector('#themeBtn');
const statusEl = document.querySelector('#status');
const helloBtn = document.querySelector('#helloBtn');

/* --- Toggle Theme (จำค่าไว้ในเบราว์เซอร์) --- */
function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(saved || (preferDark ? 'dark' : 'light'));

themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

/* --- Say Hello (เปลี่ยนข้อความ) --- */
const messages = [
  'Hello from GitHub Pages!',
  'Deployed by GitHub Actions ✅',
  'สวัสดีครับ ยินดีที่ได้รู้จัก 👋'
];
let i = 0;
helloBtn.addEventListener('click', () => {
  statusEl.textContent = messages[i % messages.length];
  i++;
});

/* --- แถบ Skills เลื่อนขึ้นเมื่อเลื่อนมาถึง --- */
const skills = document.querySelector('.skills');
if ('IntersectionObserver' in window) {
  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); obs.unobserve(e.target); } });
  }, { threshold: 0.3 }).observe(skills);
} else {
  skills.classList.add('show');
}