process.env.NODE_ENV = 'production';
var fs = require('fs');
var properties = require('../../../properties');

describe('Email Service' , function() {
    var baseSrc = '../../../src/';
    var emailService = require(baseSrc + 'services/emailService.js');
    var fixtureEmailContent = fs.readFileSync('test/fixtures/emailContent.html', 'utf-8');
    var emailContent;
    
    beforeEach(function() {
        emailService.createEmailContent = function() {
            return fixtureEmailContent;
        };
    });
   
    describe('Create email Template', function() {
        beforeEach(function() {
            emailContent = emailService.createEmailContent();
        });
        
        it('Should have content', function() {
            //expect(emailContent).not.toBeUndefined();
            //expect(emailContent).not.toBe('');
        });

        describe('Sending the email', function() {
            beforeEach(function() {
                
            });
            
            it('Should have content', function() {
                //expect(emailContent).not.toBeUndefined();
                //expect(emailContent).not.toBe('');
            });

            

        });

    });
    

});
