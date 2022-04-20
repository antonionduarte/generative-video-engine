# Generative Video Engine
A generative engine, using HashLips Art Engine as a basis, that takes several layers in a video format, combines them in a random manner and converts into a single mov file).
Obvious usage is generating Animated NFT Collections.
Much of this file is also a direct port from his repository, since many of the explanations are perfectly acceptable :)

What this engine provides that HashLip's doesn't:
 - An engine to combine video layers in a random manner in order to obtain a configured amount of new video files.
 - Provides Metadata files complying to the [ERC721A official metadata standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md).
 - Provides a util to convert all the resulting video files (which are in the `.mov` format), to `.gif`, since it's a more desirable standard for an NFT collection.

**Most of the code reused from:** [HashLips Art Engine](https://github.com/HashLips/hashlips_art_engine)  

# Installation
If you are cloning the project then run this first, otherwise you can download the source code on the release page and skip this step.

```sh
git clone https://github.com/HashLips/hashlips_art_engine.git
```

Alternatively you can run this command if you have node installed.

```sh
npm install
```

## Ffmpeg (Important)

This program directly calls a version of `ffmpeg` that is installed in your system, and it's using the package `fluent-ffmpeg` from Node.js.
I tested this on an Arch Based Linux Distro and macOS, `ffmpeg` should be easily installable from the package manager of any Unix based OS (in my case simply `pacman -S ffmpeg`), and the PATH to it should be automatically configured to you, it could be slightly more difficult on Windows.
Either way, if you're having troubles with it you should revert to the **Prerequisites** section of the [fluent-ffmpeg package](https://www.npmjs.com/package/fluent-ffmpeg).

# Usage

## Important Notes (Specific to Video Engine):
  - I haven't tested this engine for anything other than **movs** for now, I will be updating this as I test for more formats.
  - The length of the videos **must be the exact same** in order for this to work properly.
  - The dimensions of the videos used must be the exact same.
  - The layers work exactly as they would in the original image engine, now they're simple movs that are individually animated.
  - I built a new util `convert_to_gif.js` that automatically converts the entire mov collection to gifs, and places them in the `build/gifs` folder, please take a look at how to use it below. 

Create your different layers as folder in the 'layers' directory, and add all the layer assets in these directories. You can name the assets anything as long as it has a rarity weight attachd in the file name like so: `example element#70.mov`. You can optionally change the delimiter to anything you'd like in the variable `rarityDelimiter`in the `src/config.js` file.

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

When you are ready, run the following command and your outputted art will be in the `build/videos` directory and the json in the `build/json` directory:

```sh
npm run build
```

or

```sh
node index.js
```
You can also add extra metadata to each metadata file by adding your extra items, (key: value) pairs to the `extraMetadata` object variable in the `config.js` file.

```js
const extraMetadata = {
  creator: "Daniel Eugene Botha",
};
```

If you don't need extra metadata, simply leave the object empty. It is empty by default.

```js
const extraMetadata = {};
```

That's it, you're done.

## Utils

### Convert the entire collection from movs to gifs

**Important**: This util also requires `ffmpeg`, so please be sure to take a look at the section of this README regarding `ffmpeg`.

To run this, please first configure the part of the configuration `src/config.js` that is specific to this feature, in `numberFrames` you should input the number of frames of your animation (ask your artist), and in dimensions you should input the width:

```js
const gifConversion = {
	numberFrames: 34,
	dimensions: 1080
}
```

Then you just need to run:

```sh
npm run convert_gif
```

It might take a bit to run, but in the end, your gifs will appear in `build/gifs`.

### Updating baseUri for IPFS and description

You might possibly want to update the baseUri and description after you have ran your collection. To update the baseUri and description simply run:

```sh
npm run update_info
```

### Printing rarity data (Experimental feature)

To see the percentages of each attribute across your collection, run:

```sh
npm run rarity
```

The output will look something like this:

```sh
Trait type: Top lid
{
  trait: 'High',
  chance: '30',
  occurrence: '3 in 20 editions (15.00 %)'
}
{
  trait: 'Low',
  chance: '20',
  occurrence: '3 in 20 editions (15.00 %)'
}
{
  trait: 'Middle',
  chance: '50',
  occurrence: '14 in 20 editions (70.00 %)'
}
```
