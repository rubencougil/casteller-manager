(function() {
  var app = angular.module('castellersMap', ['castellersServices']);

    app.directive("castellerSelection", function() {
        return {
            restrict: 'E',
            templateUrl: "partials/casteller-selection.html",
            controller: ['Casteller', function(Casteller){

                this.selectedCasteller = "Select";
                this.active = false;
                this.castellersList = [];
            
                this.showCastellers = function(){
                    this.active = !this.active;
                    if (this.active)
                        this.castellersList = Casteller.query();
                };

                this.selectCasteller = function(casteller){
                    this.selectedCasteller = casteller.nickname;
                    this.active = false;
                };
            }],
            controllerAs: 'map',
            scope: {
            }
        };
    });

    app.directive("allCastellers", function() {
        return {
            restrict: 'E',
            templateUrl: "partials/listing.html",
            controller: ['Casteller', function(Casteller){
                this.castellersList = Casteller.query();

                this.deleteCasteller = function(id){
                    Casteller.delete({id:id});
                    console.log(this.castellersList);
                };
            }],
            controllerAs: 'listing',
        };
    });

    app.controller('CreateCastellerController', ['Casteller','$cacheFactory', function(Casteller, $cacheFactory){
        this.casteller = {};
        this.manual_nickname = false;
        this.duplicated = false;

        this.cache = $cacheFactory.get('$http');

        this.addCasteller = function(listing){
            Casteller.save(this.casteller);

            listing.castellersList.push(this.casteller);
            this.casteller = {};
            this.duplicated = false;
            this.cache.removeAll();

//            this.duplicated = true;
        };

        this.nicknameDuplicated = function (){
            return this.duplicated === true;
        };

        this.calculateNickName = function(){
            return this.casteller.nickname = this.casteller.full_name.split(' ')[0];
        };
    }]);
})();