# Boyfriend's Day website ♡

## How to edit (the only thing you need to know)
1. Open **`content.js`** in any text editor (Notepad, TextEdit, VS Code).
2. Change the words between the "quotes". Save.
3. Open **`index.html`** in your browser (or refresh it). That's it. No installing, no rebuilding.

### Add or remove things
- Copy one whole `{ ... },` block and paste it right under another one to add a memory, timeline moment, love card, joke or "open when" letter.
- Delete a whole `{ ... },` block to remove it.
- Don't delete commas, quotes or brackets.

### Add your photos
1. Drop the pictures into the **`photos/`** folder (JPG/PNG, ideally under 1 MB each so it loads fast on a phone).
2. In `content.js` write the file name, e.g. `image: "photos/beach.jpg"`.
3. Photos left empty show a cute "your photo here" placeholder.

### Add your song
Put the mp3 in `photos/` and write `audio: "photos/our-song.mp3"`, or paste a direct link ending in `.mp3`.
You can also paste a Spotify embed link into `spotifyEmbed`. The song never autoplays.

## Putting it online for him (free)
Zip the whole folder or drag it into Netlify Drop (app.netlify.com/drop), GitHub Pages or Cloudflare Pages. You get a link you can text him.
(Opening `index.html` straight from your computer works too, but a link is easier to send.)

## Folder map
- `content.js`  your words, dates, photos, songs (**edit this**)
- `index.html`  the page shell
- `app.js`      builds the page from content.js
- `styles/main.css`, `styles/animations.css`  look and motion
- `assets/characters.js`  the two little mascots and decorations (drawn in code)
- `photos/`  your pictures and song

The two mascots are original characters: a mischievous dark-red imp-cat and a fluffy white cloud-puff.
To hide them completely, set `mascots: { enabled: false }` at the bottom of `content.js`.
