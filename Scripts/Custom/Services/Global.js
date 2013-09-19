angular.module('globalServices', ['ngResource']).
    factory('Global', function ($resource) {
        return {
            Section: 'about',
            DirectivesTemplates: '/scripts/custom/directives/templates/'
        };
    });

BRM.AddAngularRequirement('books', 'globalServices');