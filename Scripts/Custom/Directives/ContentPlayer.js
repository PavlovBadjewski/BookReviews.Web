//var myModule = angular.module(...); 
//myModule.directive('directiveName', function (injectables) {
angular.module('contentPlayerDirective', [])
  .directive('contentPlayer', function ($http, Global) {
      return {
          restrict: 'A',
          templateUrl: Global.DirectivesTemplates + 'contentPlayer.html',
          scope: {
              contentCount: '=',
              byidRestEndpoint: '=',
              contentRestEndpoint: '=',
              section: '=',
              idField: '=',
              setContent: '='
          },
          link: function (scope, elem, attrs) {
              var next = 1;
              var prev = -1;
              var content = [];
              var index = 0;

              scope.pause = false;

              scope.switch = function () {
                  scope.pause = !scope.pause;
              };

              scope.history = function (direction) {
                  var id = '';

                  scope.pause = true;

                  if (direction === next && index > 0) {
                      index--;
                      id = content[index];
                  } else if (direction === prev && index < (content.length - 1)) {
                      index++;
                      id = content[index];
                  }

                  // note: params should be created outside here
                  // note: should pass Globals service in here to get Web API path!
                  if (id !== '') {
                      var config = {
                          method: 'GET',
                          url: BRM.WebApi + scope.byidRestEndpoint,
                          params: { id: id }
                      };

                      var promise = $http(config)
                          .success(function (data) {
                              //scope.$apply(scope.setContent, data);
                              scope.setContent(data);
                              //scope.$parent.$parent.RandomReview = data;
                              //scope.setContent.apply(this, data);
                          })
                          .error(function (data, status, headers, config) {
                              var s = "";
                              // called asynchronously if an error occurs
                              // or server returns response with an error status.
                          });
                  }
              };

              BRM.InitializeEvent({
                  repeat: function () {
                      if ((!scope.pause && (scope.section && Global.Section === scope.section)) || content.length === 0) {
                          $http.get(BRM.WebApi + scope.contentRestEndpoint)
                              .success(function (data) {

                                  //scope.$apply(scope.setContent, data);
                                  scope.setContent(data);
                                  //scope.$parent.$parent.RandomReview = data;
                                  //scope.setContent.apply(this, data);
                                  content.unshift(data[scope.idField]);
                                  content = content.slice(0, scope.contentCount);
                                  index = 0;
                              })
                              .error(function (data, status, headers, config) {
                                  var s = "";
                                  // called asynchronously if an error occurs
                                  // or server returns response with an error status.
                              });
                      }
                  },
                  frequency: 10000
              });

              //scope.$watch('ratingValue', function (oldVal, newVal) {
              //    if (newVal) {
              //        updateStars();
              //    }
              //});
          }
      }
  });

BRM.AddAngularRequirement('books', 'contentPlayerDirective');