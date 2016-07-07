angular.module('FirstApp', [])
  .value('HatenaBookmarkHash', [
    {
      author: '山田太郎',
      updated: new Date(2016, 7, 7)
    },
    {
      author: '山田花子',
      updated: new Date(2016, 7, 6)
    }
  ])
  .controller('Main', ['$scope', '$window', 'HatenaBookmarkHash', function($scope, $window, HatenaBookmarkHash) {
    $scope.hatenaList = HatenaBookmarkHash;
  }]);