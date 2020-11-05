const express = require('express');
const exphbs = require('express-handlebars');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, '..', 'assets')));
app.engine('handlebars', exphbs());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
	fs.readdir('./assets/rain', (err, files) => {
		const filesSortedByLatest = files.sort().reverse();

		const lastForecast = moment.unix(filesSortedByLatest[0].match(/814prcp-([0-9]+)\.gif/)[1]);
		const today = moment();
		const forecastDays = [];

		for (let i = 0; i < 12; i++) {
			const forecastDate = today.add(1, 'days');
			const format = i === 0 ? '[Tomorrow]' : 'ddd';
			forecastDays.push({
				moment: forecastDate,
				friendly: forecastDate.format(format),
			});
		}

		const forecasts = [[], [], [], [], [], [], []];

		forecasts.map((row, i) => {
			forecasts[i] = forecastDays.map((day, j) => {
				return filesSortedByLatest[5 + i - j];
			});
		});

		console.log('xxx forecasts', forecasts);

		res.render('home', {
			forecastDays,
			forecasts,
		});
	});
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
