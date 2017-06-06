exGSP = window.exGSP ||
{};

exGSP.controller('CtrForm20A', function DemoController($scope, $location) {
    //#region DataModel
    var constitutionModel = [
        'Proprietorship', 'Partnership', 'Hindu Undivided	Family', 'Private Limited Company', 'Public Limited Company', 'Society/Club/Trust/Association of Persons',
        'Government Department', 'Public Sector Undertaking', 'Unlimited Company', 'Limited Liability Partnership', 'Local Authority', 'Statutory Body', 'Foreign	Limited	Liability Partnership',
        'Foreign Company Registered(in India)', 'Others (Please Specify)'
    ];
    var stateModel = [
        'Maharashtra', 'Madhyapradesh', 'Bihar'
    ];
    var jurisdictionModel = [
        'Ambazari', 'Dhantoli', 'Kalmana'
    ];
    var regTypeModel = [
        'VAT', 'CST', 'Service Tax', 'Central Excise Registration', 'IEC No(Importer Exporter Code)'
    ];
    var liabilityRegionModel = ['Registration under earlier law'];
    //#endregion

    var viewModel =
        {
            formData:
            {},
            colCount: 1,
            width: 500,
            labelLocation: "top",
            items: [
                        //#region Tax Payer Details group
                        {
                            itemType: 'group',
                            caption: 'Tax Payer Details',
                            colCount: 3,
                            items: [
                                {
                                    dataField: 'ProvisionalID',
                                    colSpan: 3,
                                    label:
                                    {
                                        text: 'Provisional ID'
                                    },
                                    editorOptions:
                                    {
                                        placeholder: 'PROV123JC54',
                                    }
                                },
                                {
                                    dataField: 'PanName',
                                    colSpan: 1,
                                    label:
                                    {
                                        text: 'Name'
                                    },
                                    editorOptions:
                                    {
                                        placeholder: 'Excellon Software Pvt',
                                    },
                                    helpText: 'As	per	PAN'
                                },
                                {
                                    dataField: 'StateName',
                                    colSpan: 1,
                                    label:
                                    {
                                        text: 'Name'
                                    },
                                    editorOptions:
                                    {
                                        placeholder: 'Excellon Software Pvt',
                                    },
                                    helpText: 'As	per	State/Center'
                                },
                                {
                                    dataField: 'TradeName',
                                    colSpan: 1,
                                    label:
                                    {
                                        text: 'Name'
                                    },
                                    editorOptions:
                                    {
                                        placeholder: 'Excellon Software Pvt',
                                    },
                                    helpText: 'Trade Name'
                                },
                                {
                                    dataField: 'PanNumber',
                                    colSpan: 1,
                                    label:
                                    {
                                        text: 'PAN'
                                    },
                                    editorOptions:
                                    {
                                        placeholder: 'AJP34WXY123',
                                    }
                                },
                                {
                                    dataField: 'FirstName',
                                    editorType: "dxSelectBox",
                                    editorOptions:
                                    {
                                        items: constitutionModel,
                                        value: ""
                                    },
                                    colSpan: 2,
                                    label:
                                    {
                                        text: 'Constitution'
                                    },
                                }

                            ]
                        },
                        //#endregion
                        //#region Jurisdiction group
                        {
                            itemType: "group",
                            caption: "Jurisdiction",
                            colCount: 3,
                            items: [

                                {
                                    dataField: 'State',
                                    editorType: "dxSelectBox",
                                    editorOptions:
                                    {
                                        items: stateModel,
                                        value: ""
                                    },
                                    colSpan: 1,
                                    label:
                                    {
                                        text: 'State'
                                    },
                                },
                                {
                                    dataField: 'Ward',
                                    colSpan: 1,
                                    label:
                                    {
                                        text: 'Center/Circle/Ward'
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
                                    colSpan: 1,
                                    label:
                                    {
                                        text: 'Center Jurisdiction'
                                    },
                                },

                                {
                                    dataField: 'LiabilityReason',
                                    editorType: "dxSelectBox",
                                    editorOptions:
                                    {
                                        items: liabilityRegionModel,
                                        value: ""
                                    },
                                    colSpan: 3,
                                    label:
                                    {
                                        text: 'Reason of Liability'
                                    },
                                }
                            ]
                        }
                        //#endregion
                   ]
       };

    $scope.records =
        [
            {
                name: 'VAT',
                value: 'Reg19302j89 <br/> 12-10-2016'
            },
            {
                name: 'CST',
                value: 'Reg19302j89 <br/> 12-10-2016'
            },
            {
                name: 'Service TAX',
                value: 'Reg19302j89 <br/> 12-10-2016'
            },
            {
                name: 'Central Excise Registration',
                value: 'Reg19302j89 <br/> 12-10-2016'
            },
            {
                name: 'IEC No.<br/>(Importer Exporter Code)',
                value: 'Reg19302j89 <br/> 12-10-2016'
            }
        ];

    //#region REGISTRATION FORM
    $scope.popupForm = {
        formData:
        {},
        width: 400,
        colCount: 1,
        labelLocation: "top",
        items: [
        {
            dataField: 'RegistrationType',
            editorType: "dxSelectBox",
            colSpan: 2,
            editorOptions:
            {
                items: regTypeModel,
                value: ""
            },
            label:
            {
                text: 'Registration Type'
            },
        },
        {
            dataField: 'RegistrationNumber',
            colSpan: 2
        },
        {
            dataField: "RegistrationDate",
            editorType: "dxDateBox",
            colSpan: 2,
            editorOptions:
            {
                value: null,
                width: 400
            },
            label:
            {
                text: 'Registration Date'
            },
        },
        {
            itemType: "empty",
            colCount: 12,
        },
        {
            itemType: 'group',
            caption: '',
            colCount: 12,
            colSpan: 2,
            items: [
            {
                itemType: "empty",
                colSpan: 11
            },
            {
                editorType: "dxButton",
                colSpan: 11,
                editorOptions:
                {
                    text: "Submit",
                    onClick: function (e) {
                        console.log("onClick");
                        $scope.showInfo();
                    }
                }
            }]
        }]
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
        //contentTemplate: function (content) {
        //    content.append(form);
        //}
        contentTemplate: 'content'
    };

    $scope.visiblePopup = false;

    $scope.showInfo = function () {
        $scope.visiblePopup = !$scope.visiblePopup;
    };
    //#endregion
    //#region BUTTON NAVIGATION
    $scope.goPrev = function (hash) {
        hash = "/";
        $location.path(hash);
    },
        $scope.goNext = function (hash) {
            hash = "/RegForm20B";
            $location.path(hash);
        }
    //#endregion
    $scope.formOptions = viewModel;
});