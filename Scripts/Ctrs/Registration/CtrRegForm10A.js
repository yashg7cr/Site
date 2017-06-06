exGSP = window.exGSP ||
{};

exGSP.controller('CtrRegForm10A', function DemoController($scope, $location) {

    //#region DATAMODEL
    var positions = ['one', 'two', 'three'];
    //#endregion

    var viewmodel = {
        formData:
        {},
        colCount: 2,
        labelLocation: "top",
        items: [
            //#region Tax Payer Details GROUP
            {
                itemType: 'group',
                caption: 'Tax Payer Details',
                colCount: 4,
                items: [
                    {
                        dataField: 'LegalName',
                        colSpan: 2,
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
                        colSpan: 2,
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
                        dataField: 'NameofAuthoriteSignatory',
                        colSpan: 2,
                        label:
                        {
                            text: 'Name of Authorised Signatory'
                        },
                        editorOptions:
                        {
                            placeholder: 'Name of Authorised Signatory',
                        },
                        helpText: "As per PAN/Passport"

                    },
                    {
                        dataField: 'PassportNumberPAN',
                        colSpan: 2,
                        label:
                        {
                            text: 'Passport Number PAN'
                        },
                        editorOptions:
                        {
                            placeholder: 'Passport Number PAN',
                        },
                        helpText: "PAN if business/Passport No. if proprietor"

                    },
                    {
                        dataField: 'EmailID',
                        colSpan: 2,
                        label:
                        {
                            text: 'Email ID'
                        },
                        editorOptions:
                        {
                            placeholder: 'Email ID',
                        }
                    },
                    {
                        dataField: 'MobileNumber',
                        colSpan: 2,
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
            //#endregion

            //#region EMPTY GROUP
            {
                itemType: 'empty'
            },
            //#endregion

            //#region BUTTON GROUP
            {
                itemType: 'group',
                caption: '',
                colSpan: 1,
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
                    },
                ]
            },
           //#endregion
        ]
    };

    //#region NAVIGATION BUTTON FUNCTION
    $scope.goNext = function (hash) {
        hash = "/RegForm10B";
        $location.path(hash);
    }
    //#endregion

    $scope.formOptions = viewmodel;
});