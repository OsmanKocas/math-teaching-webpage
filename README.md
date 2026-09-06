# Monster Maths

Two maths games for kids, built as a phone web app. No build step, no
dependencies, no server code — just static files.

## Structure

```
index.html            hub: pick a monster
count.html            Grumbo — counting, ages 3-5
math.html             Zizzo — four operations, ages 5-9
manifest.json         makes it installable to the home screen
apple-touch-icon.png  iOS home-screen icon (180px)
icon-192.png          Android / PWA icon
icon-512.png          Android / PWA icon, maskable
README.md             this file
```

All files live at the top level of the repo, in one folder. Moving
`index.html` into a subfolder will break the icon and manifest paths.

## Grumbo — ages 3 to 5 (count.html)

For kids who can't read yet. Every instruction is spoken aloud using the
browser's built-in speech synthesis.

| Game | What it teaches |
|---|---|
| **How many?** | Subitizing and numeral recognition. Snacks appear, the kid taps the matching numeral, then the game counts each item aloud. |
| **Feed me** | One-to-one correspondence. A number appears; the kid taps exactly that many snacks, each counted aloud as it's eaten. |
| **Which is more?** | Quantity comparison, no numerals needed. |

There is no failure state. A wrong tap wiggles and lets them try again.

## Zizzo — ages 5 to 9 (math.html)

The four operations, each paired with the visual model that makes it click:

| Operation | Picture |
|---|---|
| **+** | Two groups of dots pushed together. |
| **−** | One group with some dots crossed out. |
| **×** | A rectangular array — rows of columns. This is the model that makes multiplication stop being memorisation. |
| **÷** | A total shared out onto equal plates. |

Three number ranges (to 10, to 20, to 100) and a toggle for whether the
picture shows by default. Answers go in via keypad, not multiple choice, so
there's nothing to guess from.

Get it wrong and the picture appears automatically — the scaffold arrives at
the moment it's needed rather than being permanently on. Three wrong tries
reveals the answer and moves on. The results screen lists the specific facts
that were missed, deduplicated, so you know what to drill.

Division always divides exactly, subtraction never goes negative.

## Putting it on GitHub Pages

1. Open your repository on github.com
2. **Add file → Upload files**
3. Drag in all eight files
4. **Commit changes**
5. Settings → Pages → Source: *Deploy from a branch*, branch `main`,
   folder `/ (root)` → Save
6. Wait a minute, then open `https://yourname.github.io/your-repo-name/`

## Home screen

Open the URL in Safari → Share → **Add to Home Screen**. Launches fullscreen
with the monster icon and no address bar.

**Check the ringer switch before handing it to a small child.** iOS mutes
speech synthesis when the phone is on silent, and without the voice Grumbo is
unplayable for a pre-reader.

Safari caches home-screen icons aggressively. If you had an earlier version
installed, delete the shortcut and re-add it.

## Tuning

**count.html**, near the top of the `<script>` block:

- `var ROUND = 5;` — stars per round. Five is about ninety seconds, roughly a
  three-year-old's attention span.
- `u.rate = opts.rate || 0.82;` — speech speed. Lower is slower.
- `u.pitch = opts.pitch || 1.25;` — monster voice pitch.
- The `SNACKS` array holds four inline SVG drawings on a 64x64 grid. Add more
  by appending strings.

**math.html**:

- `var ROUND = 10;` — questions per round.
- `makeQuestion()` holds the number ranges for each tier and operation.
- `tooMany(n)` caps how many dots get drawn before the picture falls back to a
  text description. Raise it on tablets, lower it on small phones.
- Three wrong tries reveals the answer; change the `state.tries === 2` branch
  in `check()` to adjust.

Colours are CSS variables at the top of each file's `<style>` block.

## Notes

- Speech uses `speechSynthesis`; voice quality varies by device, and iOS
  voices are noticeably better than most Android ones.
- Sound effects are generated with the Web Audio API — no audio files.
- Both games respect `prefers-reduced-motion`.
- math.html accepts physical keyboard input (digits, Backspace, Enter) as well
  as the on-screen keypad, which helps when testing on a laptop.
