# Gnoke Axioms

A recognition game that teaches subjects as axioms — glance, guess, get corrected.

Look at an icon pair. Pick which principle it's pointing at from three short options. Get it wrong and it just shakes — no penalty, try again. Get it right and the axiom stamps in with a one-line explanation, then you move on. No score to chase, no finish line — just a streak, and another round.

## Why axioms, specifically

This isn't a general trivia engine. Every deck has to compress its subject into **axioms** — principles that correct a common wrong assumption, not just facts. The wrong-but-plausible options in each round exist on purpose: picking the axiom means recognizing the misconception it's correcting, not just recalling a definition.

That's the filter for what's allowed to become a deck here. If a subject can't be reduced to a handful of "here's what people assume, here's what's actually true" statements, it doesn't fit this format.

## Decks

- **Axioms** — the original set, on constraints, tools, scale, and process in engineering
- **Chemistry** — first-principles corrections on heat, phase change, bonding, and reactions
- **AI Literacy** — reading discipline for AI-touched content, starting with "seeing isn't believing"

New decks are just a JSON-shaped array of levels — no engine changes required to add one.

## Stack

Vanilla JS, HTML, CSS. No build step, no framework, no external dependencies. Runs by opening `index.html` in a browser.

## Structure

```
apps/gnoke-axioms/
  gnoke.json       — app manifest
  index.html
  css/style.css
  js/decks.js       — all deck content
  js/app.js         — engine (deck-agnostic)
  assets/icon.svg
```

## Running it

Clone the repo and open `apps/gnoke-axioms/index.html` in a browser. No install, no server required.

## Adding a deck

Add an entry to `js/decks.js` following the existing shape:

```js
{
  title: "Your Subject",
  subtitle: "one-line tagline",
  levels: [
    {
      icons: ["IconName", "IconName"],
      tag: "category",
      options: ["wrong", "wrong", "correct"],
      correct: 2,
      detail: "The one-line insight this axiom corrects."
    }
  ]
}
```

Icon names map to emoji in the `EMOJI` object in `js/app.js` — add one there if your deck needs an icon that isn't listed yet.

## GnokeStation 2

Built to run standalone or as a native [GnokeStation 2](https://github.com/edmundsparrow) app — the `gnoke.json` manifest and file layout follow GS2's app conventions.

## License

MIT for now. May move to GPLv3 later.

---

Built by [Edmund Sparrow](https://dev.to/edmundsparrow) — part of the [Gnoke](https://github.com/edmundsparrow) suite.
