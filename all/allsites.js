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
  {
    name: 'siliarin.neocities',
    url: 'https://siliarin.neocities.org/',
  },
  {
    name: 'radiantscroll.neocities',
    url: 'https://radiantscroll.neocities.org/',
  },
  {
    name: 'sylfvr.art',
    url: 'https://sylfvr.art/blog/',
  },
  {
    name: 'self.github',
    url: 'https://toni-lappalainen.github.io/dswebring/',
  },
  {
    name: 'dungeon-synth.neocities',
    url: 'https://dungeon-synth.neocities.org/',
  },
];

const app = document.querySelector('#site-list');
if (app) {
  for (const member of members) {
    const site = document.createElement('li');
    site.innerHTML = `
    <a href="${member.url}">${member.name}</a>
  `;

    app.appendChild(site);
  }
}
