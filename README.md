# Tailwind CSS Hero Patterns

A simple tailwind plugin to display [Hero Patterns](http://www.heropatterns.com/) by [@steveschoger](https://twitter.com/steveschoger).

[DEMO AVAILABLE HERE](https://svengau.github.io/tailwindcss-hero-patterns/)

## Installation

`yarn add tailwindcss-hero-patterns`

or

`npm i tailwindcss-hero-patterns`

## Usage

### Simple

Just include the plugin:

```
  plugins: [
    require('tailwindcss-hero-patterns'),
  ],
```

And start using it:

```html
<div class="flex m-2 relative w-40 h-40 sm:pb-0 sm:w-48 sm:h-48 bg-red-500">
  <div
    class="bg-repeat w-full h-full text-primary-100 heropattern-jigsaw-red-100"
  >
    <div class="text-sm inline">heropattern-jigsaw-red-500</div>
  </div>
</div>
```

Here is the list of the available templates:

`jigsaw`, `overcast`, `formalinvitation`, `topography`, `texture`, `jupiter`, `architect`, `cutout`, `hideout`, `graphpaper`, `yyy`, `squares`, `fallingtriangles`, `pianoman`, `piefactory`, `dominos`, `hexagons`, `charliebrown`, `autumn`, `temple`, `stampcollection`, `deathstar`, `churchonsunday`, `ilikefood`, `overlappinghexagons`, `fourpointstars`, `bamboo`, `bathroomfloor`, `corkscrew`, `happyintersection`, `kiwi`, `lips`, `lisbon`, `randomshapes`, `steelbeams`, `tinycheckers`, `xequals`, `anchorsaway`, `bevelcircle`, `brickwall`, `fancyrectangles`, `heavyrain`, `overlappingcircles`, `plus`, `roundedplusconnected`, `volcanolamp`, `wiggle`, `bubbles`, `cage`, `connections`, `current`, `diagonalstripes`, `flippeddiamonds`, `floatingcogs`, `glamorous`, `houndstooth`, `leaf`, `linesinmotion`, `moroccan`, `morphingdiamonds`, `rails`, `rain`, `skulls`, `squaresinsquares`, `stripes`, `tictactoe`, `zigzag`, `aztec`, `banknote`, `boxes`, `circlessquares`, `circuitboard`, `curtain`, `diagonallines`, `endlessclouds`, `eyes`, `floortile`, `groovy`, `intersectingcircles`, `melt`, `overlappingdiamonds`, `parkayfloor`, `pixeldots`, `polkadots`, `signal`, `slantedstars`, `wallpaper`

### Advanced Usage

#### Select only some templates

[Hero Patterns](http://www.heropatterns.com/) contains more than 80 patterns, so the generated CSS could be really heavy (at least 24Mo).

3 solutions to reduce the CSS size during development:

1. only import the desired patterns:

```
const heropatterns = require("tailwindcss-hero-patterns/src/patterns");

module.exports = {
  theme: {
    heroPatterns: {
      architect: heropatterns.architect,
    },
    extend: {
        ...
    },
  },
};
```

1. only import the desired colors and/or shades:

```

module.exports = {
  theme: {
    heroPatternsShades: ["100", "500"],
    heroPatternsColors: ["blue", "red"],
  },
};
```

And of course, don't forget to purce your CSS before going to PROD.

#### Add your own template

Prefined patterns comes from [Hero Patterns](http://www.heropatterns.com/), but you can add your own:

```
module.exports = {
  theme: {
    extend: {
      heroPatterns: {
        circles: `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cpattern id='pattern-circles' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='20' cy='20' r='20'%3E%3C/circle%3E%3C/pattern%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='url(%23pattern-circles)'%3E%3C/rect%3E%3C/svg%3E");`,
      },
    },
  },
};
```

## Credits

Thanks [@steveschoger](https://twitter.com/steveschoger) for all those nice patterns :-)
