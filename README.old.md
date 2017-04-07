# winesweeper
Hey fun, it's Minesweeper but instead of bombs, you spill wine glasses. Messy! But not as messy as explosions.

## How to run this project:

### Easy
Navigate to winesweeper.github.io

### Build locally
What why would you do this.

Well ok, make sure you have npm, yarn, node installed, in reverse order.

Clone this repo, and run: yarn update. Then yarn run.

Pretty easy, after all.


##### Decisions log
- [ ] Based on `create-react-app` to get infrastructure set up quickly, painlessly.
- [ ] Browsers targeted: ie11, edge, chrome, safari, firefox, iOS Safari, Chrome for Android, firefox for android
  - [ ] browsers NOT targeted, and NOT supported, ie8 - 10, Samsung mobile browser, Android browser, Opera pre-blink, Firefox for iOS
- [ ] a project as small as this, while there's some interesting CSS going on here, doesn't require
      a production-quality CSS processing pipeline. Some sensible defaults from normalize.css will more than suffice. It's probably overkill, frankly.
- [ ] lodash or ramda? Hey fun! Ramda. Probably lodash in production, fwiw.
- [ ] quick and dirty implementation of classnames in Ramda so I can just specify a list of potential classes, without worrying about a bunch of things
- [ ]


