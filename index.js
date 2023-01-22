const fs = require('fs')
const csv = require('csv-parser')

function deleteFileIfNecessary(filename) {
	fs.existsSync(filename) ? fs.unlinkSync(filename) : console.log(`${filename} doesn't exist`)
}

function filterAndWriteToFile(filename, filterString) {
	const readStream =fs.createReadStream('input_countries.csv', 'utf-8')
	const writeStream = fs.createWriteStream(filename)
	
	const csvHeaders = 'country,year,population'
	writeStream.write(`${csvHeaders}\n`)
	
	readStream
		.pipe(csv())
		.on('data', (row) => {
			if (row.country.includes(filterString)) {
				writeStream.write(`${row.country.toLowerCase()},${row.year},${row.population}\n`, 'utf-8')
			}
		})
		.on('end', () => {
			writeStream.end()
			console.log(`${filename} file successfully processed`);
		})
}

deleteFileIfNecessary('canada.txt')
deleteFileIfNecessary('usa.txt')
filterAndWriteToFile('canada.txt', 'Canada')
filterAndWriteToFile('usa.txt', 'United States')