process.env.NODE_ENV = 'production';
var fs = require('fs');
var properties = require('../../../properties');

describe('Cantabria Service' , function() {
    var baseSrc = '../../../src/';
    var cantabriaService = require(baseSrc + 'services/cantabriaService.js');
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
    

});
