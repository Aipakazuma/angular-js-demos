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
    .service('FigureService', ['$log', function ($log) {
        this.triangle = function (base, height) {
            $log.info(' [triangle 底辺:' + base);
            $log.info(' [triangle 高さ:' + height);
            return base * height / 2;
        };

        this.circle = function (radius) {
            $log.info(' [circle] 半径:' + radius);
            return radius * radius * Math.PI;
        };

        this.trapezoid = function (upper, lower, height) {
            $log.info(' [trapezoid 上辺:' + upper);
            $log.info(' [trapezoid 下辺:' + lower);
            $log.info(' [trapezoid 高さ:' + height);
            return (upper + lower) * height / 2;
        };
    }])
    .controller('Main', [
        '$scope',
        '$window',
        'HatenaBookmarkHash',
        'FigureService',
        function ($scope, $window, HatenaBookmarkHash, FigureService) {
            $scope.hatenaList = HatenaBookmarkHash;
            $scope.triangle = FigureService.triangle(4, 3);
            $scope.circle = FigureService.circle(5);
            $scope.trapezoid = FigureService.trapezoid(5, 10, 3);
        }]);