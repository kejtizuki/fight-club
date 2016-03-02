var seeFightersListApp = angular.module('seeFightersListApp', ['menu', 'fightClubDev']);

seeFightersListApp.controller('seeFightersListController', ['$scope', '$http', 
function($scope, $http) {
    $scope.getFighters = function() {
        $http({
            method: 'GET', 
            url: 'http://localhost:8000/api/fighters'
        })
        .success(function(data) {
            $scope.fighters = data;
        })
        .error(function(data) {
            
        })
    }
}]);