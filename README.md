# Grumbo Counts

A talking counting game for kids aged roughly 3 to 5, built for phones.
No reading required — every instruction is spoken aloud.

Single HTML file, no build step, no dependencies, no server code.

## The three games

| Game | What it teaches |
|---|---|
| **How many?** | Subitizing and numeral recognition. Snacks appear, the kid taps the matching number, then the game counts each item aloud. |
| **Feed me** | One-to-one correspondence. A number appears; the kid taps exactly that many snacks, each one counted aloud as it's eaten. |
| **Which is more?** | Quantity comparison, no numerals involved. |

## Files

```
index.html            the whole game
manifest.json         makes it installable to the home screen
apple-touch-icon.png  iOS home-screen icon (180px)
icon-192.png          Android / PWA icon
icon-512.png          Android / PWA icon, maskable
```

## Putting it on GitHub Pages

1. Go to your repository on github.com
2. **Add file → Upload files**
3. Drag in all five files (or select them from Files on iPhone)
4. **Commit changes**
5. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)` → Save
6. Wait a minute, then open `https://yourname.github.io/your-repo-name/`

All five files go in the same folder, at the top level of the repo. If you
put `index.html` in a subfolder, the icon and manifest paths will break.

## Getting it onto the home screen

Open the URL in Safari → Share → **Add to Home Screen**. It launches
fullscreen with the Grumbo icon and no address bar.

**Check the ringer switch.** iOS mutes speech synthesis when the phone is on
silent, and without the voice a pre-reader can't play at all.

## Tuning it

Everything worth changing is near the top of the `<script>` block:

- `var ROUND = 5;` — stars per round. Five is about ninety seconds, which is
  roughly a three-year-old's attention span. Raise it for older kids.
- `u.rate = opts.rate || 0.82;` — speech speed. Lower is slower.
- `u.pitch = opts.pitch || 1.25;` — monster voice pitch.
- The `SNACKS` array holds four inline SVG drawings. Add a fifth by appending
  another string of SVG shapes drawn on a 64×64 grid.
- Colours are CSS variables at the very top of the `<style>` block.

In `turnFeed()`, `Math.min(state.max, 6)` caps how many items the monster can
ask for — counting past six by touch gets frustrating on a small screen.

## Notes

- Speech uses the browser's built-in `speechSynthesis`. Voice quality varies
  by device; iOS voices are noticeably better than most Android ones.
- Sound effects are generated with the Web Audio API, so there are no audio
  files to load.
- Respects `prefers-reduced-motion`.
- There is no failure state anywhere in the game. A wrong tap wiggles and
  lets the kid try again. This is deliberate — at this age a lose condition
  ends the session.
