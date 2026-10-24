const mainContent = document.getElementById('main-content');

async function loadSection(url, pushState = true) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const section = doc.getElementById('main-content');
    mainContent.innerHTML = section ? section.innerHTML : '<p>Could not find content on that page.</p>';
    if (pushState) history.pushState(null, '', url);
  } catch (err) {
    mainContent.innerHTML = '<p>Sorry, that section failed to load.</p>';
  }
}

document.querySelectorAll('a[data-load]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    loadSection(link.dataset.load);
  });
});

window.addEventListener('popstate', () => {
  loadSection(location.pathname.split('/').pop() || 'index.html', false);
});