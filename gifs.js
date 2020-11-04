const fs = require('fs');
const { exec } = require("child_process");

fs.readdir('assets/rain', (err, files) => {
	const rainLast7Days = files.sort().reverse().slice(0, 7).reverse().map((name) => `assets/rain/${name}`);
	const rainLast30Days = files.sort().reverse().slice(0, 30).reverse().map((name) => `assets/rain/${name}`);
	exec(`convert -delay 100 -loop 0 ${rainLast7Days.join(' ')} rainLast7days.gif`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`Rain: 7 day SUCCESS ${stdout}`);
	});
	exec(`convert -delay 50 -loop 0 ${rainLast30Days.join(' ')} rainLast30days.gif`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`Rain: 30 day SUCCESS ${stdout}`);
	});
});

fs.readdir('assets/temp', (err, files) => {
	const last7Days = files.sort().reverse().slice(0, 7).reverse().map((name) => `assets/temp/${name}`);
	const last30Days = files.sort().reverse().slice(0, 30).reverse().map((name) => `assets/temp/${name}`);
	exec(`convert -delay 100 -loop 0 ${last7Days.join(' ')} tempLast7days.gif`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`Temp: 7 day SUCCESS ${stdout}`);
	});
	exec(`convert -delay 50 -loop 0 ${last30Days.join(' ')} tempLast30days.gif`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`Temp: 30 day SUCCESS ${stdout}`);
	});
});
