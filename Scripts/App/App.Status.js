exGSP = window.exGSP || {};

exGSP.controller('StatusCtrl', ['$scope', '$window', '$rootScope', '$timeout', 'RootServiceHelper',
    function ($scope, $window, $rootScope, $timeout, rootService) {
        $rootScope.$on("CallStatusMethod", function (inner, parm) {
            if (parm.show)
                $scope.ShowStatus(parm);
            else
                $scope.HideStatus(parm)
        });
        $scope.ShowStatus = function (parm) {
            $scope.pathForHeaderStatus = "partials/" + parm.fileName;
        }
        $scope.HideStatus = function (parm) {
            $scope.pathForHeaderStatus = "";
        }
        // When view content is loaded
        //GSTR1 Upload status.
        $rootScope.$on("GSTR1UploadStatus", function (inner, parm) {
            $("#msgProgess").html("<p>Data is loading in backgroud...</p>");
            $('#imgProgess').show();
            $("#panelProgress").toggleClass("highlightRemove");
            $scope.StartCheckGSTR1ImportStatus();
        });
        $scope.StartCheckGSTR1ImportStatus = function () {
            $scope.CallCount = 0;
            $timeout($scope.CheckGSTR1ImportStatus, 2000);
        }
        $scope.CheckGSTR1ImportStatus = function () {
            var rData = new AppCommon.Class.CheckStatusRequest();
            rData.EntityType = AppCommon.EntityType.GST_OS_Header;
            rData.ReferenceToken = '111';
            rootService.CheckBulkEntityStatus(rData,
                function (response) {
                    $scope.CallCount++;
                    if ($scope.CallCount < 10)
                        $timeout($scope.CheckGSTR1ImportStatus, 2000);
                    else {
                        $("#msgProgess").html("<p>Data loaded successfully.</p>");
                        $('#imgProgess').hide();
                        $("#panelProgress").toggleClass("highlightRemove");
                    }
                },
                function (response) {
                    DevExpress.ui.dialog.alert(response.ErrorMessage, 'Alert');
                });

        }

    }
]);