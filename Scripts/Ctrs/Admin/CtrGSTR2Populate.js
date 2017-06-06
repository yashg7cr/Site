exGSP = window.exGSP || {};

exGSP.controller('CtrGSTR2Populate', function DemoController($scope, $rootScope, $location,$http) {
    //$rootScope.loadingVisible = true
    var viewmodelpopGSTR2 = {
        formData: {},
        colCount: 1,
        labelLocation: "top",
        items: [
             {
                 template: 'UploadDetails'
             },

         

        {
        itemType: 'group',
        caption: '',
        colCount: 12,
        colSpan: 2,
        items: [

                  {
                      itemType: "empty", colSpan: 11
                  },
                 {
                     editorType: "dxButton", editorOptions: {
                         text: "Submit",
                         onClick: function (e) {
                             console.log($scope.UploadData);
                             $scope.SubmitToQueue();
                         }
                     }
                 }
        ]
    }
        ]
    }
    $scope.SetProperyt = function () {
        $scope.editableTextArea = {
            height: 380,
            bindingOptions: {
                value: 'QueueData'
            },
                       
        }
        $scope.QueueData = "herel";
    }

    $scope.SubmitToQueue = function () {
        var obj = { QueueLabel: '', DataLevel: '', Entity: '' };
        obj.Entity = $scope.QueueData;
        obj.QueueLabel = $scope.txtQueueLevel;
        obj.DataLabel = $scope.txtDataLevel;
        request = {
            method: 'POST',
            url: AppSetting.LoginConfig.BaseUrl + "api/BulkEntity/Create",
            data: angular.toJson(obj),
            headers: {
                'AuthenticationToken': AppCommon.Common.GetStorage('AuthenticationToken'),
                'Content-Type': AppSetting.ServiceConfig.WEB_API_MEDIA_TYPE,
            }
        }
        $http(request)
       .success(function (response) {
           if (response.IsRequestSuccessful == true)
               DevExpress.ui.dialog.alert("Data uploaded successfully", 'Alert');
           else
               DevExpress.ui.dialog.alert(response.ErrorMessage, 'Alert');
       })
       .error(function (response) {
           DevExpress.ui.dialog.alert(response, 'Alert');
       });

    }

    //$scope.SetProperyt();
   // $scope.formOptions = viewmodelpopGSTR2;
});
