import {
  LitElement,
  html,
  css,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

import { members } from './all/allsites.js';

let info, title, target, links, isChecked, bg, style;

const filteredMembers = members.filter((member) => member.name !== 'localhost');

const getCurrentURL = () => {
  return window.location.href;
};

const getRandom = (host) => {
  const otherMembers = filteredMembers.filter(
    (member) => !isSameDomain(member.url, host)
  );

  if (otherMembers.length === 0) {
    return '#';
  }

  const randomIndex = Math.floor(Math.random() * otherMembers.length);
  return otherMembers[randomIndex].url;
};

const getNext = (currentMember) => {
  const currentIndex = filteredMembers.indexOf(currentMember);
  const nextIndex = (currentIndex + 1) % filteredMembers.length;
  return filteredMembers[nextIndex] ? filteredMembers[nextIndex].url : '#';
};

const getPrevious = (currentMember) => {
  const currentIndex = filteredMembers.indexOf(currentMember);
  const previousIndex =
        (currentIndex + filteredMembers.length - 1) % filteredMembers.length;
  return filteredMembers[previousIndex]
    ? filteredMembers[previousIndex].url
    : '#';
};

const isSameDomain = (url1, url2) => {
  const domain1 = url1;
  const domain2 = getDomain(url2);
  return domain2.includes(domain1);
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
  const currentMember = members.find((member) => host.includes(member.url));

  let redirUrl = '#';
  if (!currentMember) {
    return redirUrl;
  }

  if (action === 'random') {
    redirUrl = getRandom(host);
  } else if (action === 'next') {
    redirUrl = getNext(currentMember);
  } else if (action === 'previous') {
    redirUrl = getPrevious(currentMember);
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
    bg = this.getAttribute('bg') || '#e4d9c3';
    style = this.getAttribute('style') || '';
    isChecked = JSON.parse(localStorage.getItem('openInTab'));
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
            href="https://github.com/toni-lappalainen/dswebring"
            class="info-link"
            >Webring Info</a
          >
          <a
            target="_blank"
            href="https://toni-lappalainen.github.io/dswebring/all/"
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
    } else if (bannerStyle === 'simple') {
      return simpleBanner();
    } else if (bannerStyle === 'custom') {
      return customBanner();
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
        border-left-color: #666;
        border-top-color: #666;
        font: 100% system-ui, sans-serif;
        padding-bottom: 8px;
        text-align: center;
      }
      .title {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        padding: 8px 30px;
      }
      .content {
        margin: 0 auto;
      }
      .links {
        align-items: center;
        display: flex;
        flex-direction: column;
        font-size: 20px;
        gap: 6px;
        justify-content: center;
        padding: 12px;
        position: relative;
      }
      .links::before,
      .links::after {
        background-image: url('https://toni-lappalainen.github.io/dswebring/assets/img/skull.gif');
        background-repeat: no-repeat;
        background-size: contain;
        content: '';
        display: block;
        height: 32px;
        margin-top: -16px;
        position: absolute;
        top: 50%;
        width: 32px;
      }
      .links::before {
        left: 30px;
      }
      .links::after {
        right: 30px;
      }
      @media (prefers-reduced-motion: reduce) {
        .links::before,
        .links::after {
          background-image: url('https://toni-lappalainen.github.io/dswebring/assets/img/skull_still.gif');
        }
      }
      @media (min-width: 420px) {
        .links {
          flex-direction: row;
        }
      }
    </style>
    <div class="banner-default">
      <div class="title">${title}</div>
      <div class="content">
        <div class="links">
          <a href="${links.prev}" target="${target}"> [Prev]</a>
          <a href="${links.random}" target="${target}"> [Random]</a>
          <a href="${links.next}" target="${target}">[Next]</a>
        </div>
        ${info}
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
        background-image: url('https://toni-lappalainen.github.io/dswebring/assets/img/axprevious.gif');
      }
      #randomgif {
        width: 50px;
        height: 134px;
        background-image: url('https://toni-lappalainen.github.io/dswebring/assets/img/torchrandom.gif');
      }
      #nextgif {
        background-image: url('https://toni-lappalainen.github.io/dswebring/assets/img/axnext.gif');
      }
      @media (prefers-reduced-motion: reduce) {
        #prevgif {
          background-image: url('https://toni-lappalainen.github.io/dswebring/assets/img/axprevious_still.gif');
        }
        #randomgif {
          background-image: url('https://toni-lappalainen.github.io/dswebring/assets/img/torchrandom_still.gif');
        }
        #nextgif {
          background-image: url('https://toni-lappalainen.github.io/dswebring/assets/img/axnext_still.gif');
        }
      }
    </style>
    <div class="banner-nick">
      <table cellspacing="5" style="font-size: 12pt; width: 500px;">
        <tbody>
          <tr>
            <td colspan="100" class="title">${title} ${info}</td>
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

const simpleBanner = () => {
  return html`
    <style>
      .banner-simple {
        background: ${bg};
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
      }
      .container {
        display: flex; /* or inline-flex */
        flex-direction: row;
        justify-content: space-around;
      }
      .content {
        flex-direction: column;
      }
    </style>
    <div class="banner-simple">
      <div class="title">${title}</div>
      <div class="content">
        <div class="links">
          <a href="${links.prev}" target="${target}"> [Prev]</a>
          <a href="${links.random}" target="${target}"> [Random]</a>
          <a href="${links.next}" target="${target}">[Next]</a>
        </div>
        ${info}
      </div>
    </div>
  `;
};

const customBanner = () => {
  return html`
    <div class="links">
      <a href="${links.prev}" target="${target}"> [Prev]</a>
      <a href="${links.random}" target="${target}"> [Random]</a>
      <a href="${links.next}" target="${target}">[Next]</a>
    </div>
    ${info}
  `;
};

if (!customElements.get('webring-banner'))
  customElements.define('webring-banner', WebringBanner);
