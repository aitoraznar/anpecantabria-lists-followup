process.env.NODE_ENV = 'production';
var fs = require('fs');
var properties = require('../../../properties');

describe('Cantabria Service' , function() {
    var baseSrc = '../../../src/';
    var cantabriaService = require(baseSrc + 'services/cantabriaService.js');
    var currentListPosition = 10;
    var resultHtml;
    
    beforeEach(function() {
        cantabriaService.getFollowUpList = function(callback) {
            var fixture = fs.readFileSync('test/fixtures/maestros-list-response.html', 'utf-8');
            callback(null, fixture);
        };
    });
   
    describe('With the FollowUp List', function() {
        beforeEach(function(done) {
            cantabriaService.getFollowUpList(function(err, result) {
                resultHtml = result;
                done();
            });
        });
        
        it('Must exist a response', function() {
            expect(resultHtml).not.toBeUndefined();
        });

        describe('Can extract "maestros" info', function() {
            var maestrosInfo;

            beforeEach(function() {
                maestrosInfo = cantabriaService.extractInfo(resultHtml, properties.cantabria['list-folloup'].types.maestros);
            });
            
            it('Must exist a response', function() {
                expect(maestrosInfo['vacantes_tiempo_completo']).toBe('246');
                expect(maestrosInfo['vacantes_tiempo_parcial']).toBe('303');
                expect(maestrosInfo['vacantes_bilingues_tiempo_completo']).toBe('0');
                expect(maestrosInfo['vacantes_bilingues_tiempo_parcial']).toBe('0');
                expect(maestrosInfo['sustituciones_tiempo_completo']).toBe('314');
                expect(maestrosInfo['sustituciones_tiempo_parcial']).toBe('299');
                expect(maestrosInfo['sustituciones_bilingues_tiempo_completo']).toBe('0');
                expect(maestrosInfo['sustituciones_bilingues_tiempo_parcial']).toBe('0');
                expect(maestrosInfo['lastUpdated']).toBe('2016-01-26');
            });

        });
    });

    describe('Alarm & Warning system', function() {
        var alertFixture;
        var noAlarmFixture;
        var warningFixture;
        var alertAndWarningFixture;

        beforeEach(function() {
            alertFixture = require('../../fixtures/alert.json');
            noAlarmFixture = require('../../fixtures/no-alarm.json');
            warningFixture = require('../../fixtures/warning.json');
            alertAndWarningFixture = require('../../fixtures/alertAndWarning.json');
        });

        it('Should NOT detect an Alarm', function() {
           var alarm = cantabriaService.checkAlarm(noAlarmFixture, currentListPosition);

           expect(alarm.isAlert).toBeFalsy();
           expect(alarm.isWarning).toBeFalsy();
        });
        
        it('Should detect an Alert', function() {
           var alarm = cantabriaService.checkAlarm(alertFixture, currentListPosition);

           expect(alarm.isAlert).toBeTruthy();
           expect(alarm.isWarning).toBeFalsy();
        });

        it('Should detect a Warning', function() {
           var alarm = cantabriaService.checkAlarm(warningFixture, currentListPosition);

           expect(alarm.isAlert).toBeFalsy();
           expect(alarm.isWarning).toBeTruthy();
        });

        it('Should detect an Alert and Warning', function() {
           var alarm = cantabriaService.checkAlarm(alertAndWarningFixture, currentListPosition);

           expect(alarm.isAlert).toBeTruthy();
           expect(alarm.isWarning).toBeTruthy();
        });

    });
    

});
