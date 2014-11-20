'use strict';

/* Services */

var castellersServices = angular.module('castellersServices', ['ngResource']);

castellersServices.factory('Casteller', ['$resource',
  function($resource){
    return $resource('castellers.json/:id', {}, {
      query: {method:'GET', cache:true, isArray:true},
    });
  }]);