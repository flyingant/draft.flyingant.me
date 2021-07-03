// CSS
import './css/tailwind.css';
import './scss/style.scss';
// JS
import './js/main';

import { Base64 } from 'js-base64';

document.addEventListener('DOMContentLoaded', () => {
  const editorElement = document.getElementById('editor');
  const urlElement = document.getElementById('url');
  const editorCountElement = document.getElementById('editor-count');
  const urlCountElement = document.getElementById('url-count');
  const { hash } = window.location;
  if (hash) {
    const c = `${Base64.decode(hash.slice(1, hash.length))}`;
    editorElement.innerHTML = c;
    editorCountElement.innerHTML = `${c.length} characters`;
    urlElement.innerHTML = `${window.location.href}`;
    urlCountElement.innerHTML = `${window.location.href.length} characters`;
  }
  editorElement.addEventListener('input', (event) => {
    const newHash = Base64.encode(event.target.value);
    const url = `${window.location.origin}#${newHash}`;
    urlElement.innerHTML = url;
    editorCountElement.innerHTML = `${event.target.value.length} characters`;
    urlCountElement.innerHTML = `${url.length} characters`;
    window.location.hash = newHash;
  });
});
