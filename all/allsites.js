export const members = [
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
    name: 'dungeon-synth.neocities',
    url: 'https://dungeon-synth.neocities.org/',
  },
  {
    name: 'woodenvessels.neocities',
    url: 'https://woodenvessels.neocities.org/',
  },
  {
    name: 'miguelmolins.geocities',
    url: 'https://www.geocities.ws/miguelmolins/',
  },
  {
    name: 'localhost',
    url: 'localhost',
  },
  {
    name: 'self.github',
    url: 'https://toni-lappalainen.github.io/dswebring/',
  },
];

const app = document.querySelector('#site-list');
if (app) {
  for (const member of members) {
    if (member.name === 'self.github' || member.name === 'localhost') {
      continue;
    }
    const site = document.createElement('li');
    site.innerHTML = `
    <a href="${member.url}">${member.url}</a>
  `;

    app.appendChild(site);
  }
}
