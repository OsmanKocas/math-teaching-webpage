# Monster Maths / Canavar Matematik

Two maths games for kids, built as a phone web app, in English and Turkish.
No build step, no dependencies, no server code — just static files.

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

All files live at the top level of the repo, in one folder.

## Language

The site picks a language from the device, then lets you override it:

- `?lang=tr` forces Turkish, `?lang=en` forces English
- No parameter means it reads `navigator.language` — a Turkish phone lands on
  Turkish automatically
- The EN/TR switch on the hub, and the small language button on each game
  screen, set the choice; it carries between pages through the URL

No cookies or local storage, so nothing to clear and nothing to consent to.

### Turkish speech

Grumbo speaks aloud, and the Turkish build sets the utterance language to
`tr-TR` and prefers a Turkish system voice. iOS ships one (Yelda) and it is
good. Android coverage varies by manufacturer; if no Turkish voice is
installed the browser falls back to whatever it has, and the numbers will be
pronounced with an English accent. On Android that is fixed under
Settings → Language & input → Text-to-speech → install Turkish voice data.

Turkish counting words: sıfır, bir, iki, üç, dört, beş, altı, yedi, sekiz,
dokuz, on. The "Bana {n} tane ver!" phrasing works with every number without
suffix changes, so nothing has to be special-cased.

## Grumbo — ages 3 to 5 (count.html)

For kids who can't read yet. Every instruction is spoken aloud.

| Game | Turkish | What it teaches |
|---|---|---|
| **How many?** | Kaç tane? | Subitizing and numeral recognition. Snacks appear, the kid taps the matching numeral, then the game counts each item aloud. |
| **Feed me** | Beni doyur | One-to-one correspondence. A number appears; the kid taps exactly that many snacks, each counted aloud as it's eaten. |
| **Which is more?** | Hangisi daha çok? | Quantity comparison, no numerals needed. |

There is no failure state. A wrong tap wiggles and lets them try again.

## Zizzo — ages 5 to 9 (math.html)

The four operations, each paired with the visual model that makes it click:

| Operation | Turkish | Picture |
|---|---|---|
| **+** | Toplama | Two groups of dots pushed together. |
| **−** | Çıkarma | One group with some dots crossed out. |
| **×** | Çarpma | A rectangular array — rows of columns. The model that stops multiplication being pure memorisation. |
| **÷** | Bölme | A total shared out onto equal plates. |
| **½** | Kesirler | Shaded bars divided into equal parts. |

### Fractions (the advanced level)

Three question shapes are mixed through the round:

- **Name it** — a bar with some parts shaded; type the numerator and
  denominator. Typing the top number hops focus to the bottom one
  automatically.
- **Which is bigger** — two bars, tap the larger. No numerals involved, so it
  works before a kid can compute anything.
- **Add them** — same denominator, find the numerator. The denominator stays
  fixed on screen, which is itself the lesson: adding fifths gives you fifths.

Every generated fraction is already in lowest terms, so there is exactly one
right answer and no argument about whether 2/4 should have been 1/2. Sums stay
proper — no answers above 1 — and the two bars in a comparison are never
closer than about a tenth apart, which keeps it readable at a glance.

On the "name" and "which is bigger" questions the picture *is* the question,
so the eye button won't hide it.

Three number ranges and a toggle for whether the picture shows by default.
Answers go in by keypad, not multiple choice, so there is nothing to guess
from.

Get it wrong and the picture appears automatically — the scaffold arrives
when it's needed rather than sitting there permanently. Three wrong tries
reveals the answer and moves on. The results screen lists the specific facts
that were missed, deduplicated, so you know what to drill.

Division always divides exactly; subtraction never goes negative.

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

To pin a specific language, add the parameter before saving:
`.../your-repo-name/?lang=tr`

**Check the ringer switch before handing it to a small child.** iOS mutes
speech synthesis when the phone is on silent, and without the voice Grumbo is
unplayable for a pre-reader.

Safari caches home-screen icons aggressively. If you had an earlier version
installed, delete the shortcut and re-add it.

## Adding a third language

Both games keep every visible string in a `STR` object near the top of their
`<script>` block. Copy the `en` block, translate the values, and add the
language code to the check in the `LANG` detector and to the toggle. For a
language whose number words carry suffixes, the one thing to watch is the
`give` template in count.html — `"Give me {n}!"` assumes the number word drops
in unchanged.

## Tuning

**count.html**

- `var ROUND = 5;` — stars per round. Five is about ninety seconds, roughly a
  three-year-old's attention span.
- `u.rate = opts.rate || 0.82;` — speech speed. Lower is slower.
- The `SNACKS` array holds four inline SVG drawings on a 64x64 grid.

**math.html**

- `var ROUND = 10;` — questions per round.
- `makeQuestion()` holds the number ranges for each tier and operation.
- `fracDenoms()` holds the denominators offered at each tier — currently
  2/3/4, then up to 6, then up to 12.
- `makeFraction()` picks between the three question shapes with equal weight.
  Change the `pick([...])` array to bias it, e.g. repeat `"compare"` to make
  comparisons more common for a younger kid.
- `tooMany(n)` caps how many dots get drawn before the picture falls back to a
  text description. Raise it on tablets.
- Three wrong tries reveals the answer; change the `state.tries === 2` branch
  in `check()` to adjust.

Colours are CSS variables at the top of each file's `<style>` block.

## Notes

- Sound effects are generated with the Web Audio API — no audio files.
- Both games respect `prefers-reduced-motion`.
- math.html accepts physical keyboard input (digits, Backspace, Enter), which
  helps when testing on a laptop.
