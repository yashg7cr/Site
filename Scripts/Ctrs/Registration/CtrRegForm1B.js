exGSP = window.exGSP ||
{};

exGSP.controller('RegForm1B', function DemoController($scope, $location) {

    //#region DATAMODEL

    var constitutionModel = [
      'Proprietorship', 'Partnership', 'Hindu Undivided	Family', 'Private Limited Company', 'Public Limited Company', 'Society/Club/Trust/Association of Persons',
      'Government Department', 'Public Sector Undertaking', 'Unlimited Company', 'Limited Liability Partnership', 'Local Authority', 'Statutory Body', 'Foreign	Limited	Liability Partnership',
      'Foreign Company Registered(in India)', 'Others (Please Specify)'
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
    var CompositionModel = ['Yes', 'No'];

    //#endregion

    var viewmodelForm01B = {
        formData:
        {},
        colCount: 2,
        labelLocation: "top",
        items: [

            //#region BUSINESS DETAILS GROUP
            {
                itemType: 'group',
                caption: 'Business Details',
                colCount: 4,
                items: [
                    {
                        dataField: 'TradeName',
                        colSpan: 4,
                        label:
                        {
                            text: 'Trade Name'
                        },
                        editorOptions:
                        {
                            placeholder: 'Trade Name',
                        }
                    },
                    {
                        dataField: 'ConstitutionofBusiness',
                        editorType: "dxSelectBox",
                        editorOptions:
                        {
                            items: constitutionModel,
                            value: ""
                        },
                        colSpan: 4,
                        label:
                        {
                            text: 'Constitution of Business'
                        },
                    },
                ]
            },
            //#endregion

            //#region ADDRESS DETAILS GROUP
            {
                itemType: "group",
                caption: "Address Details",
                colCount: 4,
                items: [
                    {
                        dataField: 'City',
                        editorType: "dxSelectBox",
                        editorOptions:
                        {
                            items: CityModel,
                            value: ""
                        },
                        colSpan: 2,
                        label:
                        {
                            text: 'City/District'
                        },
                    },
                    {
                        dataField: 'State',
                        editorType: "dxSelectBox",
                        editorOptions:
                        {
                            items: stateModel,
                            value: ""
                        },
                        colSpan: 2,
                        label:
                        {
                            text: 'State'
                        },
                    },
                    {
                        dataField: 'Ward',
                        colSpan: 2,
                        label:
                        {
                            text: 'Sector/Circle/Ward'
                        },
                        editorOptions:
                        {
                            placeholder: 'Word No 9',
                        }
                    },
                    {
                        dataField: 'CenterJurisdiction',
                        editorType: "dxSelectBox",
                        editorOptions:
                        {
                            items: jurisdictionModel,
                            value: ""
                        },
                        colSpan: 2,
                        label:
                        {
                            text: 'Center Jurisdiction'
                        },
                    },

                ]
            },
            //#endregion

            //#region COMPOSITION DECLARATION DETAILS GROUP
            {
                itemType: "group",
                caption: "Composition Declaration Details",
                colSpan: 2,
                colCount: 8,
                items: [
                    {
                        dataField: 'CompositionDeclarationDetails',
                        editorType: "dxRadioGroup",
                        editorOptions:
                        {
                            items: CompositionModel,
                            value: "",
                            layout: "horizontal"
                        },
                        colSpan: 8,
                        label:
                        {
                            text: 'Option For Composition'
                        }
                    },

                    {
                        dataField: "BusinessCommencementdate",
                        editorType: "dxDateBox",
                        colSpan: 2,
                        editorOptions:
                        {
                            value: null,
                            width: 'auto'
                        },
                        label:
                        {
                            text: 'Business Commencement Date'
                        },
                    },
                    {
                        dataField: "TaxLiabilityArisingdate",
                        editorType: "dxDateBox",
                        colSpan: 2,
                        editorOptions:
                        {
                            value: null,
                            width: 'auto'
                        },
                        label:
                        {
                            text: 'Tax Liability Arising Date'
                        },
                    },
                    {
                        itemType: "empty",

                        colSpan: 4,
                    },
                    {
                        dataField: 'CompositionDeclaration',
                        editorType: "dxCheckBox",
                        editorOptions:
                        {
                            text: 'I hereby declare & verify that the likely aggregate turnover of all registered taxable persons having the PAN as specified at Sr.No.1 of Part A will remain below the limit specified for availing composition scheme during the financial year <20 __- __>.'
                        },
                        colSpan: 8,
                        label:
                        {
                            text: 'Composition Declaration'
                        }
                    },

                ]
            },
            //#endregion

            //#region EMPTY GROUP
            {
                itemType: "empty",
                colCount: 12,
                colSpan: 2,
            },
            //#endregion

            //#region NAVIGATION BUTTON GROUP
            {
                itemType: 'group',
                caption: '',
                colCount: 12,
                colSpan: 2,
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

    $scope.formOptions = viewmodelForm01B;

    //#region BUTTON NAVIGATION

    $scope.goPrev = function (hash) {
        hash = "/RegForm1A";
        $location.path(hash);
    },
        $scope.goNext = function (hash) {
            hash = "/RegForm1C";
            $location.path(hash);
        }

    //#endregion
});