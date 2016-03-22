fightClub = angular.module('fightClubDev', ['addFighterApp', 'fightApp', 'ngMockE2E']);

fightClub.run(function($httpBackend){
    $httpBackend.whenGET(/^http\:\/\/localhost:8000\/api\/fightersNames$/, undefined/*headers*/)
        .respond(getFightersNamesRespond);
    $httpBackend.whenPOST(/^http\:\/\/localhost:8000\/api\/fighters$/, undefined/*headers*/)
        .respond(postFightersRespond);
    $httpBackend.whenGET(/^http\:\/\/localhost:8000\/api\/fighters$/, undefined/*headers*/)
        .respond(getFightersRespond);
    $httpBackend.whenGET(/^.+\.html/).passThrough();
    $httpBackend.whenPOST(/^.+\.html/).passThrough();
    
    var fightersNames = [{id: '1', name: 'Chocolate'},
        {id: '2', name: 'M&M'},
        {id: '3', name: 'Cupcake'},
        {id: '4', name: 'Brownie'}];
    
    var fighters = [];
    
    fighters.push({firstName : 'John', lastName : 'Smith', id : 'M&M', description : 'I\'m a happy M&M'},
                  {firstName : 'Kate', lastName : 'Doe', id : 'Cupcake', description : 'I\'m a happy Cupcake'},
                  {firstName : 'Joe', lastName : 'Black', id : 'Chocolate', description : 'I\'m a happy Chocolate'},
                  {firstName : 'Someone', lastName : 'Nice', id : 'Brownie', description : 'I\'m a happy Brownie'});
    
    function getFightersNamesRespond(method, url, data, headers, params) {
        var res = [200, fightersNames];
        return res;
    }
    
    function postFightersRespond(method, url, data, headers, params) {
        var fighter = data;
        return [201, "added a new fighter"];
    }
    
    function getFightersRespond(method, url, data, headers, params) {
        var res = [200, fighters];
        return res;
    }
    
});