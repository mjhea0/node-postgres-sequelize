'use strict';

confRoomBooking

    .factory('confRoomFactory', function($http, $q){
        return {
            getLocations: function(){
                var deferred = $q.defer();

                $http.get('/api/location')
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(reason){
                        deferred.reject(reason);
                    });

                return deferred.promise;
            },

            getFacilities: function(){
                var deferred = $q.defer();

                $http.get('/api/facility')
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(reason){
                        deferred.reject(reason);
                    });

                return deferred.promise;
            },

            getPurposes: function(){
                var deferred = $q.defer();

                $http.get('/api/purpose')
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(reason){
                        deferred.reject(reason);
                    });

                return deferred.promise;
            },

            searchForRooms: function(formData){
                var deferred = $q.defer();

                $http.get('data/searchResult.json')
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(reason){
                        deferred.reject(reason);
                    });
                /*
                $http.post('/api/search', formData)
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(reason){
                        deferred.reject(reason);
                    });
              */

                return deferred.promise;
            },

            bookRoom: function(roomJson) {
              var deferred = $q.defer();

              $http.post('/api/book-a-room', roomJson)
                  .success(function(data){
                      deferred.resolve(data);
                  })
                  .error(function(reason){
                      deferred.reject(reason);
                  });

              return deferred.promise;
            }

        };
    });
