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
    .directive('firstDirective', ['$log', 'FigureService', '$filter', function ($log, FigureService, $filter) {
        return {
            restrict: 'E',
            scope: {
                directiveMain: '=main',
                filterName: '=filterName'
            },
            controller: 'Main',
            template: '<ul>' +
                      '    <li ng-bind="directiveMain.triangle + \':三角形\'"></li>' +
                      '    <li ng-bind="directiveMain.circle + \':円\'"></li>' +
                      '    <li ng-bind="directiveMain.trapezoid + \':台形\'"></li>' +
                      '    <li><input type="text" ng-model="directiveMain.trapezoid" ng-blur="myBlur()" ng-model-options="{updateOn: \'blur\'}"></li>' +
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
                scope.directiveMain.trapezoid = $filter(scope.filterName)(FigureService.trapezoid(1320, 5, 3));

                scope.myBlur = function() {
                    console.log($filter(scope.filterName)(scope.directiveMain.trapezoid));
                };
            }
            /*
            compile: function(element, attrs) {
                // 初回だけ呼ばれる
                // また、linkと併用できないっぽい
            }*/
        };
    }])
    .directive('secondDirective', ['$filter', function($filter) {
        var setup = function (scope, attrs) {
            scope.min = attrs.min || 0;
            scope.max = attrs.max || 0;
            scope.display = 0;
        };

        return {
            restrict: 'E',
            scope: {
                ngModel: '='
            },
            controller: 'Main',
            template: '<div>' +
                      '     <input type="range" ng-model="ngModel" min="{{min}}" max="{{max}}" ng-change="myRangeChange()">' +
                      '     <input type="text" ng-model="display" ng-blur="myBlur()">' +
                      '</div>',
            link: function(scope, element, attrs, controller) {
                setup(scope, attrs);

                scope.myBlur = function() {
                    var _v = parseFloat(scope.display.replace(/[^0-9\.]/, ''));
                    var min = parseFloat(scope.min);
                    var max = parseFloat(scope.max);

                    // 最小値より低いなら、最小値を突っ込む
                    if (_v < min) {
                        console.log('min: model:' + scope.ngModel + ', display:' + scope.display + ', change:' + min);
                        scope.ngModel = min;
                        scope.display = $filter('number')(min);
                        return;
                    }

                    // 最大値より大きいなら、最大値を突っ込む
                    if (max < _v) {
                        console.log('max: model:' + scope.ngModel + ', display:' + scope.display + ', change:' + max);
                        scope.ngModel = max;
                        scope.display = $filter('number')(max);
                        return;
                    }
                    console.log('model:' + scope.ngModel + ', display:' + scope.display + ', change:' + _v);
                    scope.ngModel = _v;
                    scope.display = $filter('number')(_v);
                };

                scope.myRangeChange = function() {
                    console.log(scope.ngModel);
                    scope.display = $filter('number')(scope.ngModel);
                };
            }
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

            this.myTestValue = {
                a: 0,
                b: 0,
                c: 0
            };
        }]);