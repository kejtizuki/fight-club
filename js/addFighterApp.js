var addFighterApp = angular.module('addFighterApp', ['menu', 'fightClubDev']);

addFighterApp.controller('AddFighterController', ['$scope', '$http',
function($scope, $http) {
    $scope.fighter = {};
    $scope.fighters = [];
    $scope.getFighterNames = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:8000/api/fightersNames'
        })
        .success(function (data) {
            $scope.fightersNames = {
                availableNames: data
            };
        })
        .error(function() {
        })
    }
    
    $scope.getFighters = function() {
        $http({
            method: 'GET', 
            url: 'http://localhost:8000/api/fighters'
        })
        .success(function(data) {
            $scope.fighters = data;
            console.log();
            
        })
        .error(function(data) {
            
        })
    }
    
    $scope.submitForm = function() {
        if ($scope.fighter.id === undefined || $scope.fighter.firstName === undefined || $scope.fighter.lastName === undefined) {
            $scope.errorRq = '*';
        }
        else{
            $http({
                method: 'POST',
                url: 'http://localhost:8000/api/fighters',
                data: $scope.fighter
            })
            .success(function(data) {
                $scope.successMsg = 'Cool! The fighter has been added to our database';
                console.log($scope.fighter);
                $scope.fighters.push($scope.fighter);
                $scope.fighter = null;
                return true;
            })
            .error(function() {
                
            })
        }
    }
  
}]);