const basePath = process.cwd();
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "ExampleNFT";
const description = "Very cool looking description, of this very cool looking animated NFT :)";
const baseUri = "ipfs://NewUriToReplace";

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.example.com",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
	{
    growEditionSizeTo: 100,
    layersOrder: [
      { name: "Background" },
      { name: "Shadow" },
      { name: "Back Arm" },
      { name: "Shoes" },
      { name: "Body" },
      { name: "Bags Currencies" },
      { name: "Front Arm" },
    ],
	}
];

/**
 * You might want to generate your images
 * as movs (example) within the generator but
 * convert them to gifs outside the generator. 
 * To generate the metadata with the correct final format 
 * change this parameter.
 * 
 * In this case we assume posterior conversion to gif.
*/ 
const outputFormat = {
	format: ".gif",
	formatType: "image/gif",
	category: "image"
}

// Very important, when converting to gif using the Util 
// convert_to_gif.js 
// Input the necessary dimensions, such as number of frames 
// And the target width of the gif.
const gifConversion = {
	numberFrames: 34,
	dimensions: 1080
}

const shuffleLayerConfigurations = false;

const debugLogs = false;

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

module.exports = {
	outputFormat,
  baseUri,
  description,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  namePrefix,
  network,
  solanaMetadata,
	gifConversion
};
