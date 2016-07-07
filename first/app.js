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
    .directive('firstDirective', ['$log', 'FigureService', function ($log, FigureService) {
        return {
            restrict: 'E',
            scope: {
                directiveMain: '=main'
            },
            controller: 'Main',
            template: '<ul>' +
                      '    <li ng-bind="directiveMain.triangle + \':三角形\'"></li>' +
                      '    <li ng-bind="directiveMain.circle + \':円\'"></li>' +
                      '    <li ng-bind="directiveMain.trapezoid + \':台形\'"></li>' +
                      '</ul>',
            link: function(scope, element, attrs, controller) {
                // directiveがインスタンス生成される度に実行される
                $log.info(scope);
                $log.info(element);
                $log.info(attrs);
                $log.info(controller);

                // Serviceを仕様して、directiveのscopeを変更
                // controllerとbindするとmodelがシェアされる
                scope.directiveMain.triangle = FigureService.triangle(10, 5);
                scope.directiveMain.circle = FigureService.circle(10);
                scope.directiveMain.trapezoid = FigureService.trapezoid(10, 5, 3);
            }
            /*
            compile: function(element, attrs) {
                // 初回だけ呼ばれる
                // また、linkと併用できないっぽい
            }*/
        };
    }])
    .controller('Main', [
        '$window',
        'HatenaBookmarkHash',
        'FigureService',
        function ($window, HatenaBookmarkHash, FigureService) {
            this.hatenaList = HatenaBookmarkHash;
            this.myController = {};
            this.myController.triangle = FigureService.triangle(4, 3);
            this.myController.circle = FigureService.circle(5);
            this.myController.trapezoid = FigureService.trapezoid(5, 10, 3);

            this.myDirective = {};
            this.myDirective.triangle = 0;
            this.myDirective.circle = 0;
            this.myDirective.trapezoid = 0;
        }]);