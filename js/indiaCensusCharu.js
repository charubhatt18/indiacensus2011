let log4js = require('log4js');
let logger = log4js.getLogger();

module.exports = function convert(startYear)
{
	if(isNaN(startYear)) {
		throw new Error('Not a number');
	}
	else{
		const readline = require('readline');
		const fs = require('fs');

		let i = 0;
		let data = [];
		let a = [];
		let stateName;
		let literatePer;
		let ageGr;
		const rl = readline.createInterface({
			input: fs.createReadStream('../inputdata/final.csv')
		});

		rl.on('line', (line)=>{
			if(i === 0) {
				let cleanedLine = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
				cleanedLine = line.split(',');
				data = cleanedLine;
				ageGr = data.indexOf('Age-group');
				literatePer = data.indexOf('Literate - Persons');
				stateName = data.indexOf('Area Name');
				i = i + 1;
			}
			else{
				data = line.split(',');
				a.push({ageGroup: data[ageGr], literatePersons: data[literatePer],
					areaName: data[stateName]});
				let record = JSON.stringify(a);
				fs.writeFile('../outputdata/indiaCensusCharu.json', record);
				logger.debug(record);
			}
		});

		rl.on('close', ()=>{
			logger.debug('file closed');
		});
	return 'JSON written successfully';
	}
};
