angular.module('genreServices', ['ngResource']).
    factory('Genres', function ($resource) {
        return $resource(BRM.WebApi + 'GlobalData/Genres', {}, {
            query: { method: 'GET', params: {}, isArray: true }
        });
    });

angular.module('books', ['genreServices']);