exGSP = window.exGSP ||
{};

exGSP.controller('CtrForm20D', function DemoController($scope, $location) {


    var viewmodelForm20D = {
        formData:
        {},
        //width: 800,
        labelLocation: "top",
        items: [

         //#region DIGITAL SIGNATURE TEMPLATE

            {
                template: 'DigitalSignature'
            },

         //#endregion

         //#region BUTTON NAVIGATION FUNCTION

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

                            }
                        }
                    }
                ]
            }

         //#endregion
        ]
    };

    //#region BUTTON CLICK FUNCTION

    $scope.goPrev = function (hash) {
        hash = "/RegForm20C";
        $location.path(hash);
    }

    //#endregion

    $scope.formOptions = viewmodelForm20D;



});