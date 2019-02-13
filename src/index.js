// CSS
import './css/common.css';
import './scss/style.scss';
// JS
import './js/main';

import { Base64 } from 'js-base64';

document.addEventListener("DOMContentLoaded", () => {
  let editorElement = document.getElementById("editor");
  let urlElement = document.getElementById("url");
  let countElement = document.getElementById("count");
  let hash = window.location.hash;
  if (hash) {
    editorElement.innerHTML = `${Base64.decode(hash.slice(1, hash.length))}`;
    urlElement.innerHTML = `${window.location.href}`;
    countElement.innerHTML = `Characters: ${window.location.href.length}`
  }
  editorElement.addEventListener("input", (event) => {
    let newHash = Base64.encode(event.target.value);
    let url = `${window.location.origin}#${newHash}`;
    urlElement.innerHTML = url;
    countElement.innerHTML = `Characters: ${url.length}`;
    window.location.hash = newHash;
  })
});