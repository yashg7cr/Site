var exGSP = angular.module("ExGSP", ["dx"]);

exGSP.controller('CtrForgotPassword', function DemoController($scope, $location, $window, ServiceHelper) {
    
    $scope.viewForgotPasswordModel = {
            formData: {},
            colCount: 1,
            labelLocation: "top",
            items: [
                {
                    itemType: 'group',
                    colCount: 2,
                    items: [
                        {
                            dataField: 'Email', colSpan: 2, placeholder: 'Email',
                            label: {
                                text: 'Email'
                            },
                            editorOptions: {
                                placeholder: 'Email',
                            }, validationRules: [{
                                type: 'required',
                                message: 'Email is required'
                            }]
                        },                      
                    ]
                },
            {
                itemType: 'group',
                caption: "",
                colCount: 2,
                items: [
                    {
                        itemType: "empty",
                        colSpan: 1,
                    },
                    {

                        editorType: "dxButton",
                        editorOptions:
                            {
                                background: 'green',
                                text: "Send Mail",
                                icon:'email',
                                width: '100%',
                                onClick: function (e) {
                                    //location.href = "SiteMaster.html";
                                    //$scope.LoadEnvironment();
                                }
                            },
                        colSpan: 1,
                    }

                ]

            }

            ]
        };

    $scope.formOptions = $scope.viewForgotPasswordModel;
});



