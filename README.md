# Generative Video Engine
A generative engine, using HashLips Art Engine as a basis, that takes several layers in a video format, combines them and converts into a single mov file).
Much of the README.md is also a direct port from his repository, since many of the explanations are perfectly acceptable :)

# Installation
If you are cloning the project then run this first, otherwise you can download the source code on the release page and skip this step.

```sh
git clone https://github.com/HashLips/hashlips_art_engine.git
```

Go to the root of your folder and run this command if you have yarn installed.

```sh
yarn install
```

Alternatively you can run this command if you have node installed.

```sh
npm install
```
# Usage

## Important Notes:
  - I haven't tested this engine for anything other than **movs** for now, I will be updating this as I test for more formats.
  - The length of the videos **must be the exact same** in order for this to work properly.
  - The dimensions of the videos used must be the exact same.

Create your different layers as folder in the 'layers' directory, and add all the layer assets in these directories. You can name the assets anything as long as it has a rarity weight attachd in the file name like so: `example element#70.png`. You can optionally change the delimiter to anything you'd like in the variable `rarityDelimiter`in the `src/config.js` file.

Once you have all your layers, go into `src/config.js` and update the `layerConfigurations` objects `layersOrder` array to be your layer folders name in order of the back layer to the front layer.

_Example:_ If you were creating a portrait design, you might have a background, then a head, a mouth, eyes, eyewear, and then headwear, so your `layersOrder` would look something like this:

```js
const layerConfigurations = [
  {
    growEditionSizeTo: 100,
    layersOrder: [
      { name: "Head" },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Eyeswear" },
      { name: "Headwear" },
    ],
  },
];
```

The `name` of each layer object represents the name of the folder (in `/layers/`) that the images reside in.

Optionally you can add multiple different `layerConfigurations` to your collection. Each configuration can be unique and have different layer orders, use the same layers or introduce new ones. This gives the artist flexibility when it comes to fine tuning their collections to their needs.

_Example:_ If you were creating a portrait design, you might have a background, then a head, a mouth, eyes, eyewear, and then headwear and you want to create a new race or just simple re-order the layers or even introduce new layers, then you're `layerConfigurations` and `layersOrder` would look something like this:

```js
const layerConfigurations = [
  {
    // Creates up to 50 artworks
    growEditionSizeTo: 50,
    layersOrder: [
      { name: "Background" },
      { name: "Head" },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Eyeswear" },
      { name: "Headwear" },
    ],
  },
  {
    // Creates an additional 100 artworks
    growEditionSizeTo: 150,
    layersOrder: [
      { name: "Background" },
      { name: "Head" },
      { name: "Eyes" },
      { name: "Mouth" },
      { name: "Eyeswear" },
      { name: "Headwear" },
      { name: "AlienHeadwear" },
    ],
  },
];
```

A **very important** new configuration option, characteristic specifically to this variation of HashlipsArtEngine is `outputFormat`
This is crucial to generating your metadata correctly, although you might render your layers and generate them in a video format like we're doing here, you might (and probably should) later convert them to **gifs** to use as your actual collection. For that, you must change this setting (or keep it as it is).

```js
const outputFormat = {
	format: ".gif",
	formatType: "image/gif",
	category: "image"
}
```

