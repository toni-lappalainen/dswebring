import { members } from 'index.js';

const app = document.querySelector('#site-list');

for (const member of members) {
  const site = document.createElement('li');
  site.innerHTML = `
    <a href="${member.url}">${member.name}</a>
  `;

  app.appendChild(site);
}
