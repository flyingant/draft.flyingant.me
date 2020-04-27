// CSS
import './css/common.css';
// JS
import './js/main';

import { Base64 } from 'js-base64';
import LZString from 'lz-string';

document.addEventListener("DOMContentLoaded", () => {
  let editorElement = document.getElementById("editor");
  let urlElement = document.getElementById("url");
  let editorCountElement = document.getElementById("editor-count");
  let urlCountElement = document.getElementById("url-count");
  let compressBtn = document.getElementById("compress-btn");
  let decompressBtn = document.getElementById("decompress-btn");
  let helperElement = document.getElementById("helper");
  let hash = window.location.hash;
  if (hash) {
    const c = `${Base64.decode(hash.slice(1, hash.length))}`;
    editorElement.innerHTML = c;
    editorCountElement.innerHTML = `length: ${c.length}`;
    urlElement.innerHTML = `${window.location.href}`;
    urlCountElement.innerHTML = `length: ${window.location.href.length}`
  }
  editorElement.addEventListener("input", (event) => {
    let newHash = Base64.encode(event.target.value);
    let url = `${window.location.origin}#${newHash}`;
    urlElement.innerHTML = url;
    editorCountElement.innerHTML = `length: ${event.target.value.length}`;
    urlCountElement.innerHTML = `length: ${url.length}`;
    window.location.hash = newHash;
  })
  compressBtn.addEventListener("click", () => {
    helperElement.innerHTML = `${LZString.compressToEncodedURIComponent(editorElement.value)}`;
  })
  decompressBtn.addEventListener("click", () => {
    helperElement.innerHTML = `${LZString.decompressFromEncodedURIComponent(editorElement.value)}`;
  })
});