angular.module('genreServices', ['ngResource']).
    factory('Genres', function ($resource) {
        return {
            Data: $resource(BRM.WebApi + 'GlobalData/Genres', {}, {
                Get: { method: 'GET', params: {}, isArray: true }
            }),
            GetGenreId: function (id) {
                return id > 0 ? id : null
            }
        };
    });

BRM.AddAngularRequirement('books', 'genreServices');
