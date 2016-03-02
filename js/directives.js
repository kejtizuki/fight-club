(function() {
    var app = angular.module('menu', []);
    
    app.directive('navbar', function() {
        return {
           restrict: 'EA',
           templateUrl: 'navbar.html'
        } 
    });

    app.directive('buttons1', function() {
        return {
           restrict: 'EA',
           templateUrl: 'firstFighterButtons.html'
        } 
    });
    
    app.directive('buttons2', function() {
        return {
           restrict: 'EA',
           templateUrl: 'secondFighterButtons.html'
        } 
    });
    
})();