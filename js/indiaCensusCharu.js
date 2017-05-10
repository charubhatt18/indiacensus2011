// importing log4js module
let log4js = require('log4js');
let logger = log4js.getLogger();

module.exports = function convert(startYear) {
	if(isNaN(startYear)) {
		// throwing exception when startYear is not a number
		throw new Error('Not a number');
	}
	else {
		// importing readLine module
		const readline = require('readline');
		// importing fs module
		const fs = require('fs');
		let i = 0;
		let data = [];
		let a = [];
		let stateName;
		let literatePer;
		let ageGr;

		const rl = readline.createInterface({
			// csv file which is to convert to json given as input
			input: fs.createReadStream('../inputdata/final.csv')
		});

		// line event of readLine module-it reads file line by line
		rl.on('line', (line)=>{
			if(i === 0) {
				// cleaning junk data from csv file
				let cleanedLine = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
				cleanedLine = line.split(',');
				data = cleanedLine;
				ageGr = data.indexOf('Age-group');
				literatePer = data.indexOf('Literate - Persons');
				stateName = data.indexOf('Area Name');
				i = i + 1;
			}
			else {
				// splitting line by commas
				data = line.split(',');
				// pushing object to array 'a' in key:value pair
				a.push({ageGroup: data[ageGr], literatePersons: data[literatePer],
					areaName: data[stateName]});
				// converting js object 'a' to json string 'record'
				let record = JSON.stringify(a);
				// resulted json file
				fs.writeFile('../outputdata/outputIndiaCensus2011CharuBhatt.json', record);
				logger.debug(record);
			}
		});

		// close event of readLine module which is triggered when there is no data to read
		rl.on('close', ()=>{
			logger.debug('file closed');
		});

		return 'JSON written successfully';
	}
};
