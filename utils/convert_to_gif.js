var fs = require('fs')
var ffmpeg = require('fluent-ffmpeg')
var util = require('util');
var exec = util.promisify(require('child_process').execSync);

const basePath = process.cwd()
const videosPath = `${basePath}/build/videos`
const gifPath = `${basePath}/build/gifs`

const {
	gifConversion
} = require(`${basePath}/src/config.js`)

// deletes the gifs folder if it already exists
// generates a new one
const buildSetup = () => {
	if (fs.existsSync(gifPath)) {
		fs.rmSync(gifPath, { recursive: true })
	}
	fs.mkdirSync(gifPath)
}

async function generateGifs() {
	fs.readdir(videosPath, function (err, files) {
		if (err) {
			console.log("Could not generate gifs:", err);
			process.exit(1);
		}

		files.forEach(function (file, index) {
			let inputPath = videosPath + "/" + file
			let outputPath = gifPath + "/palette.png"
			let gifName = file.split('.')[0] + ".gif"
			console.log("Completed generating " + gifName)
			generatePalette(inputPath, outputPath);
			generateGif(inputPath, gifPath + "/" + gifName)
			fs.rmSync(gifPath + "/palette.png")
		})
	})
}

function generatePalette(inputPath, outputPath) {
	exec(
		`ffmpeg -y -i ${inputPath} -vf fps=${gifConversion.numberFrames},scale=${gifConversion.dimensions}:-1:flags=lanczos,palettegen ${outputPath}`,
		{stdio: 'pipe' }
	)
}

function generateGif(inputPath, outputPath) {
	exec(
		`ffmpeg -i ${inputPath} -i ${gifPath + "/palette.png"} -filter_complex "fps=${gifConversion.numberFrames},scale=${gifConversion.dimensions}:-1:flags=lanczos[x];[x][1:v]paletteuse" ${outputPath}`,
		{stdio: 'pipe'}
	)
}

const main = () => {
	buildSetup()
	generateGifs()
}

main()




