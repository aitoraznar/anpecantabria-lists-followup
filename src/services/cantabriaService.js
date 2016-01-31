var properties = require('../../properties');
var cheerio = require('cheerio');
var fs = require('fs');

function getFollowUpList() {
	return fs.readFileSync('test/fixtures/maestros-list-response.html', 'utf-8');
}

function extractInfo(html, type) {
	var info = {};

    var $ = cheerio.load(html);
    $('table tr', '#post-3650').each(function(i, elem) {

    	var currentType = $($('td', elem)[0]).text();
    	if (type.keyName === currentType) {
			info = {
				'vacantes_tiempo_completo': $($('td', elem)[1]).text(),
				'vacantes_tiempo_parcial': $($('td', elem)[2]).text(),
				'vacantes_bilingues_tiempo_completo': $($('td', elem)[3]).text(),
				'vacantes_bilingues_tiempo_parcial': $($('td', elem)[4]).text(),
				'sustituciones_tiempo_completo': $($('td', elem)[5]).text(),
				'sustituciones_tiempo_parcial': $($('td', elem)[6]).text(),
				'sustituciones_bilingues_tiempo_completo': $($('td', elem)[7]).text(),
				'sustituciones_bilingues_tiempo_parcial': $($('td', elem)[8]).text(),
				'lastUpdated': $($('td', elem)[9]).text()
			};
		}

	});
	
	return info;
}

module.exports = {
	getFollowUpList: getFollowUpList,
	extractInfo: extractInfo
};
