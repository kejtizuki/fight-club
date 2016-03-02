var fightApp = angular.module('fightApp', ['menu', 'fightClubDev']);

fightApp.controller('FightController', ['$scope', '$http', '$window', '$location',
function($scope, $http, $window, $location) {
    
    $scope.proceedToGame = function() {
        $scope.rulesCompleeted = true;
    }
    
    $scope.getFighters = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:8000/api/fighters'
        })
        .success(function (data) {
            $scope.fighters = {availableFighters : data};
        })
        .error(function() {
        })
    }
    
    $scope.endSelectingFirst = false;
    $scope.endSelectingSecond = false;
    var firstFightersButtonsArr = new Array();
    var secondFightersButtonsArr = new Array();
    
    $scope.chooseFirstFighterButtons = function(event) {
        var id = event.target.id;
        firstFightersButtonsArr.push(id);
        
        if (firstFightersButtonsArr.length === 3) {
            var heading = document.createElement("h4");
            heading.innerHTML = "You've chosen: ";
            
            var selected = document.createElement("p");
            var firstButton = firstFightersButtonsArr[0].split("B");
            selected.innerHTML = firstButton[0] + " ";
            selected.className = "selectedColours";
            var secondButton = firstFightersButtonsArr[1].split("B");
            selected.innerHTML += secondButton[0] + " ";
            var thirdButton = firstFightersButtonsArr[2].split("B");
            selected.innerHTML += thirdButton[0] + " ";
            document.getElementById("putSelectedButtonsHere1").appendChild(heading);
            document.getElementById("putSelectedButtonsHere1").appendChild(selected);
            $scope.endSelectingFirst = true;
            firstFightersButtonsArr = new Array(firstButton[0], secondButton[0], thirdButton[0]);
//            console.log(firstFightersButtonsArr);
        }
    }
    
    $scope.chooseSecondFighterButtons = function(event) {
        var id = event.target.id
        secondFightersButtonsArr.push(id);
        
        if (secondFightersButtonsArr.length === 3) {
            var heading = document.createElement("h4");
            heading.innerHTML = "You've chosen: ";
            var selected = document.createElement("p");
            var firstButton = secondFightersButtonsArr[0].split("B");
            selected.innerHTML = firstButton[0] + " ";
            selected.className = "selectedColours";
            var secondButton = secondFightersButtonsArr[1].split("B");
            selected.innerHTML += secondButton[0] + " ";
            var thirdButton = secondFightersButtonsArr[2].split("B");
            selected.innerHTML += thirdButton[0] + " ";
            document.getElementById("putSelectedButtonsHere2").appendChild(heading);
            document.getElementById("putSelectedButtonsHere2").appendChild(selected);
            $scope.endSelectingSecond = true;
            secondFightersButtonsArr = new Array(firstButton[0], secondButton[0], thirdButton[0]);
        }  
    }
    
    var chosenColours = new Array();
    var howManyColours = 3;
    $scope.disable = false;
    
    $scope.startGame = function() {    
        var colours = new Array('yellow', 'blue', 'green', 'black', 'red', 'pink', 'purple', 'orange', 'white');
        var alreadyThere = false;
        
        for (var i = 0; i < colours.length; i++) {
            var rnd = Math.floor(Math.random() * colours.length);
            var tmp = colours[i];
            colours[i] = colours[rnd];
            colours[rnd] = tmp;
            for (var j = 0; j < howManyColours; j++) {
                chosenColours[j] = colours[j];
            }
        }
        
        var firstColour = document.createElement("p");
        firstColour.className = "randomColours";
        firstColour.innerHTML = chosenColours[0];
        document.getElementById("addColours").appendChild(firstColour);
        var secondColour = document.createElement("p");
        secondColour.className = "randomColours";
        secondColour.innerHTML = chosenColours[1];
        document.getElementById("addColours").appendChild(secondColour);
        var thirdColour = document.createElement("p");
        thirdColour.className = "randomColours";
        thirdColour.innerHTML = chosenColours[2];
        document.getElementById("addColours").appendChild(thirdColour);
        
        var theSameForFirstFighter = chosenColours.filter(function(item) {
            return firstFightersButtonsArr.indexOf(item) > -1
        });
        
        var theSameForSecondFighter = chosenColours.filter(function(item) {
            return secondFightersButtonsArr.indexOf(item) > -1
        });
        
        $scope.firstFighterPoints = theSameForFirstFighter.length;
        $scope.secondFighterPoints = theSameForSecondFighter.length;
        $scope.show = true;
        if ($scope.firstFighterPoints === 1) {
            $scope.p1 = 'point';
        }
        else {
            $scope.p1 = 'points';
        }
        if ($scope.secondFighterPoints === 1) {
            $scope.p2 = 'point';
        }
        else {
            $scope.p2 = 'points';
        }
        
        if ($scope.firstFighterPoints > $scope.secondFighterPoints) {
            $scope.firstFighterWon = true;
        }
        else if ($scope.firstFighterPoints === $scope.secondFighterPoints) {
            $scope.draw = true;
        }
        else {
            $scope.secondFighterWon = true;
        }
        $scope.disable = true;   
    }

    $scope.restartGame = function() {
        $window.location.reload();
    }
    
    
  
}]);