export let members = [
  {
    name: 'desolationplains.neocities',
    url: 'https://desolationplains.neocities.org/',
  },
  {
    name: 'thedungeonmusicshoppe',
    url: 'https://thedungeonmusicshoppe.com/',
  },
  {
    name: 'thewillowtea.neocities',
    url: 'http://thewillowtea.neocities.org/',
  },
  {
    name: 'hjartans.neocities',
    url: 'https://hjartans.neocities.org/',
  },
];

const app = document.querySelector('#site-list');
for (const member of members) {
  const site = document.createElement('li');
  site.innerHTML = `
    <a href="${member.url}">${member.name}</a>
  `;

  app.appendChild(site);
}
