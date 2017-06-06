exGSP = window.exGSP ||
{};

exGSP.controller('RegForm1G', function DemoController($scope, $location) {

    var viewmodelForm01G = {
        formData:
        {},
        width:'100%',
        labelLocation: "top",
        items: [

            //#region DIGITALSIGNATURE TEMPLATE GROUP
            {
                template: 'DigitalSignature'
            },
            //#endregion

            //#region NAVIGATION BUTTON GROUP
            {
                itemType: 'group',
                caption: '',
                colCount: 12,
                items: [
                    {
                        editorType: "dxButton",
                        colSpan: 1,
                        editorOptions:
                        {
                            text: "<<Previous",
                            onClick: function (e) {
                                $scope.goPrev();
                            }
                        }
                    },

                    {
                        itemType: "empty",
                        colSpan: 10
                    },
                    {
                        editorType: "dxButton",
                        colSpan: 1,
                        editorOptions:
                        {
                            text: "Submit",
                            onClick: function (e) {
                                $scope.goNext();
                            }
                        }
                    }
                ]
            }
           //#endregion
        ]
    };

    //#region FILE UPLOAD POPUP
    $scope.popupFormUploadFile = {
        formData:
        {},
        width: 400,
        colCount: 2,
        labelLocation: "top",
        items: [
            {
                dataField: 'DocumentName',
                colSpan: 2
            },
            {
                //template: 'PopupDigitalSignature'
                editorType: "dxFileUploader",
                editorOptions:
                {
                    buttonText: 'Select file',
                    labelText: 'Drop file here',
                    multiple: true,
                    accept: 'image/*'
                }
            },
            {
                itemType: 'empty',
                colSpan: 2
            },
            {
                itemType: 'group',
                caption: '',
                colCount: 12,
                colSpan: 2,
                items: [

                    {
                        itemType: 'empty',
                        colSpan: 11
                    },
                    {
                        editorType: "dxButton",
                        editorOptions:
                        {
                            text: "Submit",
                            onClick: function (e) {
                                console.log("onClick");
                                $scope.showInfo();
                            }
                        },
                    }
                ]
            }
        ]
    };

    $scope.popupOptions = {
        width: 'auto',
        height: 'auto',
        contentTemplate: "info",
        showTitle: true,
        title: "Information",
        dragEnabled: true,
        closeOnOutsideClick: false,
        bindingOptions:
        {
            visible: "visiblePopup",
        },
        contentTemplate: 'UploadFileContent'
    };

    $scope.visiblePopup = false;

    $scope.showInfo = function () {
        $scope.visiblePopup = !$scope.visiblePopup;
    };
    //#endregion

    //#region NAVIGATION FUNCTION
    $scope.goPrev = function (hash) {
        hash = "/RegForm1F";
        $location.path(hash);
    }
    //#endregion

    $scope.formOptions = viewmodelForm01G;
});