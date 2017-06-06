exGSP = window.exGSP ||
{};

exGSP.controller('RegForm1C', function DemoController($scope, $location) {

    //#region DATAMODEL
    var ReasonForRegistarationModel = [
      'Crossed Threshold', 'Inter-State supply', 'Liability to pay as recipient of services', 'De-merger'
    ];
    var stateModel = [
       'Maharashtra', 'Madhyapradesh', 'Bihar'
    ];
    var CityModel = [
      'Nagpur', 'Delhi', 'Mumbai'
    ];
    var jurisdictionModel = [
       'Ambazari', 'Dhantoli', 'Kalmana'
    ];
    var RegistrationModel = ['Yes', 'No'];
    var TypeofTax = [
        {
            "ID": 1,
            "SrNo": 1,
            "TypeOfTax": "Integrated Goods and Service Tax (IGST)",
            "TurnOver": "100000",
            "NetTaxLiability": "10000"

        },
        {
            "ID": 2,
            "SrNo": 2,
            "TypeOfTax": "Central Goods and Service Tax (CGST)",
            "TurnOver": "100000",
            "NetTaxLiability": "10000"
        },
        {
            "ID": 3,
            "SrNo": 3,
            "TypeOfTax": "State Goods and Service Tax (SGST)",
            "TurnOver": "100000",
            "NetTaxLiability": "10000"
        }];
    //#endregion

    var viewmodelForm01C = {
        formData:
        {},
        colCount: 2,

        labelLocation: "top",
        items: [

            //#region REGISTRATION DETAILS GROUP
            {
                itemType: 'group',
                caption: 'Registration Details',
                colCount: 4,
                items: [
                    {
                        dataField: 'RegistrationDetails',
                        editorType: "dxRadioGroup",
                        editorOptions:
                        {
                            items: RegistrationModel,
                            value: "",
                            layout: "horizontal"
                        },
                        colSpan: 4,
                        label:
                        {
                            text: 'Are you applying for registration as a casual taxable person?'
                        }
                    },
                    {
                        editorType: "dxDataGrid",
                        colSpan: 4,
                        editorOptions:
                        {
                            dataSource: TypeofTax,
                            columns: [
                                {
                                    dataField: 'SrNo',
                                    width: 70
                                },
                                {
                                    dataField: 'TypeOfTax',
                                    width: 250
                                },
                                {
                                    dataField: 'TurnOver',
                                    width: 100
                                },
                                {
                                    dataField: 'NetTaxLiability',
                                    width: 100
                                },
                            ],
                            showColumnLines: true,
                            showRowLines: true,
                            showBorders: true,
                            rowAlternationEnabled: true,
                            editing:
                            {
                                mode: "row",
                                allowUpdating: true,
                                allowDeleting: true,
                                allowAdding: true
                            },
                        },

                    },
                    {
                        dataField: "RegistrationPeriodFrom",
                        editorType: "dxDateBox",
                        colSpan: 2,
                        editorOptions:
                        {
                            value: null,
                            width: 'auto'
                        },
                        label:
                        {
                            text: 'Registration Period From'
                        },
                    },
                    {
                        dataField: "RegistrationPeriodTo",
                        editorType: "dxDateBox",
                        colSpan: 2,
                        editorOptions:
                        {
                            value: null,
                            width: 'auto'
                        },
                        label:
                        {
                            text: ''
                        },
                    },
                    {
                        dataField: 'ReasonToObtainRegistration',
                        editorType: "dxSelectBox",
                        editorOptions:
                        {
                            items: ReasonForRegistarationModel,
                            value: ""
                        },
                        colSpan: 4,
                        label:
                        {
                            text: 'Reason To Obtain Registration'
                        },
                    },
                ]
            },
            //#endregion

            //#region REGISTRATION DETAILS GROUP
            {
                itemType: "group",
                caption: "Registration Details",
                colCount: 4,
                items: [
                    {
                        colSpan: 4,
                        editorType: "dxCheckBox",
                        editorOptions:
                        {
                            text: "Central Excise Registration Number",
                            value: ""
                        },
                    },
                    {
                        colSpan: 4,
                        editorType: "dxCheckBox",
                        editorOptions:
                        {
                            text: "Service Tax Registration Number"
                        }
                    },
                    {
                        colSpan: 4,
                        editorType: "dxCheckBox",
                        editorOptions:
                        {
                            text: "State VAT Registration (TIN)"
                        }
                    },
                    {
                        colSpan: 4,
                        editorType: "dxCheckBox",
                        editorOptions:
                        {
                            text: "Central Sales Tax Registration Number"
                        }
                    },
                    {
                        colSpan: 4,
                        editorType: "dxCheckBox",
                        editorOptions:
                        {
                            text: "IEC No. (Importer Exporter Code)"
                        }
                    },
                    {
                        colSpan: 4,
                        editorType: "dxCheckBox",
                        editorOptions:
                        {
                            text: "Corporate Identity Number (CIN/LLPIN/FLLPIN/FCRN)"
                        }
                    },
                    {
                        colSpan: 4,
                        editorType: "dxCheckBox",
                        editorOptions:
                        {
                            text: "GSTIN"
                        }
                    },
                    {
                        colSpan: 4,
                        editorType: "dxCheckBox",
                        editorOptions:
                        {
                            text: "Temporary Registration ID"
                        }
                    }
                ]
            },
             //#endregion

            //#region EMPTY GROUP
            {
                itemType: "empty",
                colCount: 12,
                colSpan: 2
            },
            //#endregion

            //#region NAVIGATION BUTTON GROUP
            {
                itemType: 'group',
                caption: '',
                colSpan: 2,
                colCount: 12,
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
                            text: "Next>>",
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

    $scope.formOptions = viewmodelForm01C;

    //#region BUSINESS DETAILS GROUP

    $scope.goPrev = function (hash) {
        hash = "/RegForm1B";
        $location.path(hash);
    },
    $scope.goNext = function (hash) {
            hash = "/RegForm1D";
            $location.path(hash);
        }

    //#endregion 
});