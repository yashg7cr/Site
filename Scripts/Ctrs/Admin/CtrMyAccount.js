exGSP = window.exGSP || {};

exGSP.controller('CtrMyAccount', function DemoController($scope, $location) {

    var positions = ['one', 'two', 'three'];
    var viewmodel = {
        formData: {},
        colCount: 1,
        labelLocation: "top",
        items: [
            {
                template: "MyAccTemplate",
            }
        ]
    }
    $scope.formOptions = viewmodel;
});
