angular.module('genreServices', ['ngResource']).
    factory('Genres', function ($resource) {
        return $resource('http://api.book.reviews/Api/GlobalData/Genres', {}, {
            query: { method: 'GET', params: {}, isArray: true }
        });
    });

angular.module('books', ['genreServices']);