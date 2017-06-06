exGSP = window.exGSP ||
{};

exGSP.controller('RegForm1A', function DemoController($scope, $location) {
    var viewmodelForm01A = {

        formData:
        {},
        colCount: 1,
        width: 500,
        labelLocation: "top",
        items: [
            {
                itemType: 'group',
                caption: 'Tax Payer Details',
                colCount: 4,
                items: [
                    {
                        dataField: 'LegalName',
                        colSpan: 4,
                        label:
                        {
                            text: 'Legal Name'
                        },
                        editorOptions:
                        {
                            placeholder: 'Legal Name',
                        }
                    },
                    {
                        dataField: 'PAN',
                        colSpan: 4,
                        label:
                        {
                            text: 'PAN'
                        },
                        editorOptions:
                        {
                            placeholder: 'PAN',
                        }
                    },
                    {
                        dataField: 'Email',
                        colSpan: 4,
                        label:
                        {
                            text: 'Email'
                        },
                        editorOptions:
                        {
                            placeholder: 'Email',
                        }

                    },
                    {
                        dataField: 'MobileNumber',
                        colSpan: 4,
                        label:
                        {
                            text: 'Mobile Number'
                        },
                        editorOptions:
                        {
                            placeholder: 'Mobile Number',
                        }
                    },


                ]
            },

            {
                itemType: 'group',
                caption: '',
                colCount: 12,
                items: [
                    {
                        itemType: "empty",
                        colSpan: 11
                    },
                    {
                        editorType: "dxButton",
                        editorOptions:
                        {
                            text: "Next>>",
                            onClick: function (e) {
                                $scope.goNext();
                            }
                        }
                    }
                ]
            }
        ]
    };

    $scope.formOptions = viewmodelForm01A;

    $scope.goNext = function (hash) {
        hash = "/RegForm1B";
        $location.path(hash);
    }
});