exGSP = window.exGSP ||
{};

exGSP.controller('CtrRegForm10D', function DemoController($scope, $location) {


    var viewmodelForm20D = {
        formData:
        {},
        //width: 800,
        labelLocation: "top",
        items: [

            //#region DIGITALSIGNATURE TEMPALTE GROUP
            {

                template: 'DigitalSignature'

            },
            //#endregion

            //#region NAVIGATION BUTTON GROUP
            {
                itemType: 'group',
                caption: '',
                colCount: 12,
                colSpan: 12,
                items: [
                    {
                        editorType: "dxButton",
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

    //#region NAVIGATION BUTTON FUNCTION
    $scope.goPrev = function (hash) {
        hash = "/RegForm10C";
        $location.path(hash);
    }
    //#endregion

    $scope.formOptions = viewmodelForm20D;
});