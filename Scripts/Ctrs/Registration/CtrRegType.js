
exGSP = window.exGSP || {};

exGSP.controller('CtrRegType', function DemoController($scope, $location) {
    $scope.currentOption = -1;
    $scope.currentSelectedOption = function (val) {
        $scope.currentOption = val;
    }
    $scope.popUpSettings = function () {
        $scope.visiblePopupF1 = false;
        $scope.popupOptionsF1 = {
            width: 600,
            height: 'auto',
            contentTemplate: "info",
            showTitle: true,
            title: "Regular Tax Payer (Form Reg-01)",
            dragEnabled: false,
            closeOnOutsideClick: true,
            bindingOptions: {
                visible: "visiblePopupF1",
            }
        };
        $scope.visiblePopupF7 = false;
        $scope.popupOptionsF7 = {
            width: 600,
            height: 'auto',
            contentTemplate: "info",
            showTitle: true,
            title: "Taxpayer liable for TDS and TCS (Form Reg-07)",
            dragEnabled: false,
            closeOnOutsideClick: true,
            bindingOptions: {
            visible: "visiblePopupF7",
            }
        };
        $scope.visiblePopupF20 = false;
        $scope.popupOptionsF20= {
            width: 600,
            height: 'auto',
            contentTemplate: "info",
            showTitle: true,
            title: "Existing Business registered under (Form Reg-20)",
            dragEnabled: false,
            closeOnOutsideClick: true,
            bindingOptions: {
                visible: "visiblePopupF20",
            }
        };


        $scope.visiblePopupF9 = false;
        $scope.popupOptionsF9 = {
            width: 600,
            height: 'auto',
            contentTemplate: "info",
            showTitle: true,
            title: "Taxpayer with UIN (Form Reg-09)",
            dragEnabled: false,
            closeOnOutsideClick: true,
            bindingOptions: {
                visible: "visiblePopupF9",
            }
        };

        $scope.visiblePopupF10 = false;
        $scope.popupOptionsF10 = {
            width: 600,
            height: 'auto',
            contentTemplate: "info",
            showTitle: true,
            title: "Non Resident Taxpayer/ Casual Taxpayer (Form REG-10)",
            dragEnabled: false,
            closeOnOutsideClick: true,
            bindingOptions: {
                visible: "visiblePopupF10",
            }
        };




    }
    $scope.showInfo = function (val) {
        switch (val) {
            case "1":
                $scope.visiblePopupF1 = true;
                break;
            case "7":
                $scope.visiblePopupF7 = true;
                break;
            case "9":
                $scope.visiblePopupF9 = true;
                break;
            case "10":
                $scope.visiblePopupF10 = true;
                break;
            case "20":
                $scope.visiblePopupF20 = true;
                break;
        }
        // $scope.currentEmployee = data.model.employee;
        $scope.visiblePopup = true;
    }
    $scope.goToSelected = function () {
        var hash = "";
        switch ($scope.currentOption) {
            case "1":
                hash = "/RegForm1A"
                break;
            case "7":
                hash = "/RegForm7A"
                break;
            case "9":
                hash = "/RegForm9A"
                break;
            case "10":
                hash = "/RegForm10A"
                break;
            case "20":
                hash = "/RegForm20A"
                break;
            default:
                alert("Please select applicant type.");

        }
        if (hash.length > 1)
            $location.path(hash);
    }
    $scope.popUpSettings();
});
