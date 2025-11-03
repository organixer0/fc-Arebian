// ========== PAGE NAVIGATION ==========
function showPage(pageId) {
  document.querySelectorAll('main section').forEach(s => s.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== LOADER ==========
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
  }, 2000);
});

// ========== LIGHT/DARK MODE ==========
document.getElementById('modeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
});

// ========== OPTIONS MENU ==========
const optionsBtn = document.getElementById('optionsBtn');
const optionsMenu = document.getElementById('optionsMenu');
optionsBtn.addEventListener('click', () => {
  optionsMenu.classList.toggle('show');
});
window.addEventListener('click', (e) => {
  if (!optionsBtn.contains(e.target) && !optionsMenu.contains(e.target)) {
    optionsMenu.classList.remove('show');
  }
});

// ========== SUGGESTIONS ==========
function loadSuggestions() {
  const list = document.getElementById('suggestionsList');
  list.innerHTML = '';
  const suggestions = JSON.parse(localStorage.getItem('suggestions') || '[]');
  suggestions.forEach(s => {
    const p = document.createElement('p');
    p.textContent = '• ' + s;
    list.appendChild(p);
  });
}
function saveSuggestion() {
  const text = document.getElementById('suggestionText').value.trim();
  if (!text) return alert('Please write a suggestion first!');
  const suggestions = JSON.parse(localStorage.getItem('suggestions') || '[]');
  suggestions.push(text);
  localStorage.setItem('suggestions', JSON.stringify(suggestions));
  document.getElementById('suggestionText').value = '';
  loadSuggestions();
}
loadSuggestions();

// ========== NEWS ==========
function loadNews() {
  const newsList = document.getElementById('news-list');
  newsList.innerHTML = '';
  const news = JSON.parse(localStorage.getItem('news') || '[]');
  news.forEach(n => {
    const div = document.createElement('div');
    div.textContent = '• ' + n;
    div.style.margin = '0.5rem 0';
    newsList.appendChild(div);
  });
}
function addNews() {
  const val = document.getElementById('newsInput').value.trim();
  if (!val) return alert('Enter news content!');
  const news = JSON.parse(localStorage.getItem('news') || '[]');
  news.push(val);
  localStorage.setItem('news', JSON.stringify(news));
  document.getElementById('newsInput').value = '';
  loadNews();
}
loadNews();

// ========== EVENTS ==========
function loadEvents() {
  const ev = document.getElementById('eventsList');
  ev.innerHTML = '';
  const events = JSON.parse(localStorage.getItem('events') || '[]');
  events.forEach(e => {
    const li = document.createElement('li');
    li.textContent = '⚽ ' + e;
    ev.appendChild(li);
  });
}
function addEvent() {
  const val = document.getElementById('eventInput').value.trim();
  if (!val) return alert('Enter event detail!');
  const events = JSON.parse(localStorage.getItem('events') || '[]');
  events.push(val);
  localStorage.setItem('events', JSON.stringify(events));
  document.getElementById('eventInput').value = '';
  loadEvents();
}
loadEvents();

// ========== GALLERY ==========
const uploadInput = document.getElementById('uploadInput');
const galleryGrid = document.getElementById('galleryGrid');
function loadGallery() {
  galleryGrid.innerHTML = '';
  const gallery = JSON.parse(localStorage.getItem('gallery') || '[]');
  gallery.forEach(item => {
    if (item.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = item.data;
      galleryGrid.appendChild(img);
    } else if (item.type.startsWith('video/')) {
      const vid = document.createElement('video');
      vid.src = item.data;
      vid.controls = true;
      galleryGrid.appendChild(vid);
    }
  });
}
uploadInput.addEventListener('change', () => {
  const files = [...uploadInput.files];
  const gallery = JSON.parse(localStorage.getItem('gallery') || '[]');
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      gallery.push({ data: reader.result, type: file.type });
      localStorage.setItem('gallery', JSON.stringify(gallery));
      loadGallery();
    };
    reader.readAsDataURL(file);
  });
});
loadGallery();

// ========== ADMIN ==========
function checkAdmin() {
  const pass = document.getElementById('adminPass').value;
  if (pass === 'nobody112') {
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
  } else {
    alert('Incorrect passcode!');
  }
}
function clearData() {
  if (confirm('Clear all saved data?')) {
    localStorage.clear();
    loadSuggestions();
    loadNews();
    loadEvents();
    loadGallery();
    alert('All local data cleared.');
  }
}
