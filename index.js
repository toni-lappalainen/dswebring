import {
  LitElement,
  html,
  css,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

let members = [
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
    name: 'runesong.neocities',
    url: 'https://runesong.neocities.org/',
  },
  {
    name: 'myrrys',
    url: 'https://myrrys.net/',
  },
];

let info, title, target, links, isChecked;

const getCurrentURL = () => {
  return window.location.href;
};

const getRandom = (host) => {
  const otherMembers = members.filter(
    (member) => !isSameDomain(member.url, host)
  );

  if (otherMembers.length === 0) {
    return res.sendStatus(404);
  }

  const randomIndex = Math.floor(Math.random() * otherMembers.length);
  return otherMembers[randomIndex].url;
};

const getNext = (currentMember) => {
  const currentIndex = members.indexOf(currentMember);
  const nextIndex = (currentIndex + 1) % members.length;
  return members[nextIndex].url;
};

const getPrevious = (currentMember) => {
  const currentIndex = members.indexOf(currentMember);
  const previousIndex = (currentIndex + members.length - 1) % members.length;
  return members[previousIndex].url;
};

const isSameDomain = (url1, url2) => {
  const domain1 = getDomain(url1);
  const domain2 = getDomain(url2);
  return domain1 === domain2;
};

const getDomain = (url) => {
  const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
  const matches = url.match(domainRegex);

  if (matches && matches.length >= 2) {
    return matches[1];
  }

  return null;
};

export const getSite = (arg) => {
  const host = getCurrentURL();
  const action = arg;

  const currentMember = members.find((member) => member.url.includes(host));

  if (!currentMember) {
    // return res.sendStatus(404);
  }

  let redirUrl;

  if (action === 'random') {
    redirUrl = getRandom(host);
  } else if (action === 'next') {
    redirUrl = getNext(currentMember);
  } else if (action === 'previous') {
    redirUrl = getPrevious(currentMember);
  } else {
    redirUrl = '#';
  }
  return redirUrl;
};

export class WebringBanner extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-width: 500px;
      margin: 1rem auto;
    }
    .info {
      font-size: 14px;
      padding-top: 10px;
    }
    .info-link {
      margin-right: 10px;
    }
  `;

  render() {
    const bannerStyle = this.getAttribute('banner') || 'default';
    isChecked = JSON.parse(localStorage.getItem('openInTab'));
    hostName = this.getAttribute('host-name') || 'default';
    title = this.getAttribute('title') || 'Member of the Dungeon Synth Webring';
    target = '_self';

    links = {
      prev: getSite('previous'),
      random: getSite('random'),
      next: getSite('next'),
    };

    if (
      this.hasAttribute('open-new') &&
      localStorage.getItem('openInTab') === null
    ) {
      target = '_blank';
      isChecked = true;
    }

    const changeOpenInTab = (e) => {
      isChecked = e.target.checked;
      localStorage.setItem('openInTab', isChecked);

      if (isChecked) target = '_blank';
      else target = '_self';

      const links = this.renderRoot
        .querySelector('.links')
        .querySelectorAll('a');
      links.forEach((link) => {
        link.setAttribute('target', target);
      });
    };

    info = html`
      <div class="info">
        <div class="info-link">
          <a
            target="_blank"
            href="https://myrrys.net/ds/webring"
            class="info-link"
            >Webring Info</a
          >
          <a target="_blank" href="https://myrrys.net/ds/webring/all"
            >All Sites</a
          >
        </div>
        <div>
          <label for="opentab">
            Open sites in new tab
            <input
              type="checkbox"
              id="opentab"
              @change="${changeOpenInTab}"
              ?checked=${isChecked}
            />
          </label>
        </div>
      </div>
    `;

    if (bannerStyle === 'nick') {
      return nickBanner();
    } else {
      return defaultBanner();
    }
  }
}

const defaultBanner = () => {
  return html`
    <style>
      .banner-default {
        background: #d7d7d7;
        border: 15px solid #222;
        border-top-color: #666;
        border-left-color: #666;
        text-align: center;
        font: 100% system-ui, sans-serif;
        padding-bottom: 8px;
      }
      .title {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        padding: 8px;
      }
      .links {
        font-size: 20px;
        padding: 12px;
      }
      .container {
        display: flex; /* or inline-flex */
        flex-direction: row;
        justify-content: space-around;
      }
      .content {
        flex-direction: column;
      }
      .img {
        background-image: url('https://myrrys.net/webring/static/img/skull.gif');
        background-size: contain;
        background-repeat: no-repeat;
        margin-top: 24px;
        width: 32px;
        height: 32px;
      }
      @media (prefers-reduced-motion: reduce) {
        .img {
          background-image: url('https://myrrys.net/webring/static/img/skull_still.gif');
        }
      }
    </style>
    <div class="banner-default">
      <div class="title">${title}</div>

      <div class="container">
        <div class="img" alt="Dungeon Synth Webring"></div>
        <div class="content">
          <div class="links">
            <a href="${links.prev}" target="${target}"> [Prev]</a>
            <a href="${links.random}" target="${target}"> [Random]</a>
            <a href="${links.next}" target="${target}">[Next]</a>
          </div>
          ${info}
        </div>
        <div class="img" alt="Dungeon Synth Webring"></div>
      </div>
    </div>
  `;
};

const nickBanner = () => {
  return html`
    <style>
      .banner-nick {
        background-color: black;
        color: white;
        padding: 0px;
        margin: 0px;
      }
      td {
        border: 20px ridge #e6e6e6;
      }
      a {
        color: yellow;
      }
      .title {
        color: yellow;
        font-size: 16pt;
        font-weight: bold;
        text-align: center;
        padding: 8px;
      }
      .img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 76px;
        height: 76px;
        background-size: contain;
        background-repeat: no-repeat;
      }
      #prevgif {
        background-image: url('https://myrrys.net/webring/static/img/axprevious.gif');
      }
      #randomgif {
        width: 50px;
        height: 134px;
        background-image: url('https://myrrys.net/webring/static/img/torchrandom.gif');
      }
      #nextgif {
        background-image: url('https://myrrys.net/webring/static/img/axnext.gif');
      }
      @media (prefers-reduced-motion: reduce) {
        #prevgif {
          background-image: url('https://myrrys.net/webring/static/img/axprevious_still.gif');
        }
        #randomgif {
          background-image: url('https://myrrys.net/webring/static/img/torchrandom_still.gif');
        }
        #nextgif {
          background-image: url('https://myrrys.net/webring/static/img/axnext_still.gif');
        }
      }
    </style>
    <div class="banner-nick">
      <table cellspacing="5" style="font-size: 12pt; width: 500px;">
        <tbody>
          <tr>
            <td colspan="100%" class="title">${title} ${info}</td>
          </tr>
          <tr style="text-align: center" class="links">
            <td>
              <a href="${links.prev}" target="${target}">
                <div class="img" id="prevgif"></div>
                <br />
                Previous Site
              </a>
            </td>
            <td>
              <a href="${links.random}" target="${target}">
                <div class="img" id="randomgif"></div>
                <br />
                Random Site
              </a>
            </td>
            <td>
              <a href="${links.next}" target="${target}">
                <div class="img" id="nextgif"></div>
                <br />
                Next Site
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
};

customElements.define('webring-banner', WebringBanner);
