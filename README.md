## How to join

Contact myrrys (cptnelson) on Discord, or join Melkor's DS Dungeon server and ask there.

## Setup

Add this script:

```html {.codeline}
<script
  type="module"
  src="https://myrrys.net/webring/static/webring-banner.js"
></script>
```

inside your page's <body> tag, and then add this where you want the banner to be shown:

```html {.codeline}
<webring-banner host-name="<your-identifier>"></webring-banner>
```

### Attribute options

- Add `open-new` to make the links open to a new tab.
- Add `title="your custom title"` to change the default title.
- Add `banner="nick"` to change the default banner.

## Simple Example

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Runesong</title>
    <link href="/style.css" rel="stylesheet" type="text/css" media="all" />
  </head>
  <body>
    <webring-banner
      host-name="runesong.neocities"
      title="Totally Awesome Dungeon Synth Webring"
      open-new
    >
    </webring-banner>
    <script
      type="module"
      src="https://myrrys.net/webring/static/webring-banner.js"
    ></script>
  </body>
</html>
```

This will render the banner like this:

 <body>
    <webring-banner
      host-name="runesong.neocities" title="Totally Awesome Dungeon Synth Webring" open-new>
    </webring-banner>
    <script type="module" src="https://myrrys.net/webring/static/webring-banner.js"></script>
  </body>

Or with the `banner="nick"` attribute:

 <body>
    <webring-banner
      host-name="runesong.neocities" title="Totally Awesome Dungeon Synth Webring" open-new banner="nick">
    </webring-banner>
    <script type="module" src="https://myrrys.net/webring/static/webring-banner.js"></script>
  </body>
