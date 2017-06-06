exGSP = window.exGSP || {};

exGSP.controller('CtrRegForm7D', function DemoController($scope, $location) {


    var viewmodelForm20D = {
        formData: {},
        labelLocation: "top",
        items: [
            {
                
                template: 'DigitalSignature'

            },
            {
                itemType: 'group',
                caption: '',
                colCount: 12,
                colSpan: 12,
                items: [
                           {
                               editorType: "dxButton", editorOptions: {
                                   text: "<<Previous",
                                   onClick: function (e) {
                                       $scope.goPrev();
                                   }
                               }
                           },

                          {
                              itemType: "empty", colSpan: 10
                          },
                         {
                             editorType: "dxButton", editorOptions: {
                                 text: "Submit",
                                 onClick: function (e) {
                                     $scope.goNext();
                                 }
                             }
                         }
                ]
            }
             
        ]
    };
    $scope.goPrev = function (hash) {
        hash = "/RegForm7C";
        $location.path(hash);
    }
    $scope.formOptions = viewmodelForm20D;
});