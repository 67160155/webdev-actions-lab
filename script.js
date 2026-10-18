const root = document.documentElement;
const themeBtn = document.querySelector('#themeBtn');
const helloBtn = document.querySelector('#helloBtn');
const statusEl = document.querySelector('#status');

/* สลับธีม Dark / Light (จำค่าไว้) */
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

/* ปุ่ม Say Hello เปลี่ยนข้อความ */
const messages = [
  'Hello from GitHub Pages!',
  'Deployed by GitHub Actions ✅',
  'สวัสดีครับ ยินดีที่ได้รู้จัก 👋'
];
let i = 0;
helloBtn.addEventListener('click', () => {
  statusEl.textContent = messages[i % messages.length];
  i++;
  statusEl.classList.remove('pop');
  void statusEl.offsetWidth;      // รีสตาร์ทแอนิเมชัน
  statusEl.classList.add('pop');
});