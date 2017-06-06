exGSP = window.exGSP ||
{};

exGSP.controller('RegForm1D', function DemoController($scope, $location) {

    //#region DATAMODEL
    var stateModel = [
       'Maharashtra', 'Madhyapradesh', 'Bihar'
    ];

    var AccountTypeModel = [
      'Saving', 'Current'
    ];

    var CityModel = [
      'Nagpur', 'Delhi', 'Mumbai'
    ];

    var BusinessActivityModel = [
      'Factory / Manufacturing', 'Wholesale Business', 'Retail Business', 'Warehouse/Deport', 'Bonded Warehouse', 'Service Provision', 'Office/Sale Office', 'Leasing Business', 'Service Recipient', 'EOU/ STP/ EHTP', 'SEZ', 'Input Service Distributor (ISD)', 'Works Contract'
    ];

    var PossionsionModel = [
      'Own', 'Leased', 'Rented', 'Consent', 'Shared'
    ];

    var TypeofGoods = [
        {
            "SrNo": 1,
            "Description": "Automobile Dealer",
            "HSNCode": "100001"


        },
        {
            "SrNo": 2,
            "Description": "Automobile",
            "HSNCode": "100002"

        },
        {
            "SrNo": 3,
            "Description": "Food Products",
            "HSNCode": "100003"

        }];

    var TypeofServices = [
        {
            "SrNo": 1,
            "Description": "Service 1",
            "ServiceAccountingCode": "100001"


        },
        {
            "SrNo": 2,
            "Description": "Service 2",
            "ServiceAccountingCode": "100002"

        },
        {
            "SrNo": 3,
            "Description": "Service 3",
            "ServiceAccountingCode": "100003"
        }];
    //#endregion

    var viewmodelForm01D = {
        formData:
        {},
        colCount: 2,

        labelLocation: "top",
        items: [
             //#region ADDRESS DETAILS GROUP
            {
                itemType: "group",
                caption: "Address Details",
                colCount: 6,
                items: [

                    {
                        dataField: 'BuildingFlat',
                        colSpan: 2,
                        label:
                        {
                            text: 'Flat No.'
                        },
                        editorOptions:
                        {
                            placeholder: 'Flat No.',
                        }
                    },
                    {
                        dataField: 'FloorNo',
                        colSpan: 2,
                        label:
                        {
                            text: 'Floor No.'
                        },
                        editorOptions:
                        {
                            placeholder: 'Floor No.',
                        }
                    },
                    {
                        dataField: 'BuildingName',
                        colSpan: 2,
                        label:
                        {
                            text: 'Building Name'
                        },
                        editorOptions:
                        {
                            placeholder: 'Building Name',
                        }
                    },
                    {
                        dataField: 'RoadStreet',
                        colSpan: 2,
                        label:
                        {
                            text: 'Road/Street'
                        },
                        editorOptions:
                        {
                            placeholder: 'Road/Street',
                        }

                    },
                    {
                        dataField: 'LocalityVillage',
                        colSpan: 2,
                        label:
                        {
                            text: 'Locality/Village'
                        },
                        editorOptions:
                        {
                            placeholder: 'Locality/Village',
                        }
                    },
                    {
                        dataField: 'PinCode',
                        colSpan: 2,
                        label:
                        {
                            text: 'PinCode'
                        },
                        editorOptions:
                        {
                            placeholder: 'PinCode',
                        }

                    },
                    {
                        dataField: 'CityDistrict',
                        editorType: "dxSelectBox",
                        editorOptions:
                        {
                            items: CityModel,
                            value: "",
                            layout: "horizontal"
                        },
                        colSpan: 3,
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
                            value: "",
                            layout: "horizontal"
                        },
                        colSpan: 3,
                        label:
                        {
                            text: 'State'
                        },

                    },

                ]
            },
             //#endregion

             //#region CONTACT INFORMATION GROUP
            {
                itemType: "group",
                caption: "Contact Information",
                colCount: 4,
                items: [

                    {
                        dataField: 'OfficePhoneNumber',
                        colSpan: 2,
                        label:
                        {
                            text: 'Office Phone Number'
                        },
                        editorOptions:
                        {
                            placeholder: 'Office Phone Number',
                        },

                    },
                    {
                        dataField: 'OfficeEmailID',
                        colSpan: 2,
                        label:
                        {
                            text: 'Office Email ID'
                        },
                        editorOptions:
                        {
                            placeholder: 'Office Email ID',
                        }
                    },
                    {
                        dataField: 'OfficeFaxNumber',
                        colSpan: 2,
                        label:
                        {
                            text: 'Office Fax Number'
                        },
                        editorOptions:
                        {
                            placeholder: 'Office Fax Number',
                        },

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
                    {
                        dataField: 'possession',
                        editorType: "dxSelectBox",
                        editorOptions:
                        {
                            items: PossionsionModel,
                            value: "",
                            layout: "horizontal"
                        },
                        colSpan: 2,
                        label:
                        {
                            text: 'Nature of Premises Possession'
                        },

                    },
                    {
                        dataField: 'BusinessActivity',
                        editorType: "dxSelectBox",
                        editorOptions:
                        {
                            items: BusinessActivityModel,
                            value: "",
                            layout: "horizontal"
                        },
                        colSpan: 2,
                        label:
                        {
                            text: 'Nature of Business Activity'
                        },

                    },

                ]
            },
              //#endregion

             //#region REGISTRATION DETAILS GROUP
            {
                itemType: 'group',
                caption: 'Registration Details',
                colCount: 8,
                colSpan: 2,
                items: [

                    {

                        colSpan: 4,
                        editorType: "dxDataGrid",
                        label:
                        {
                            text: 'Details of the Goods supplied by the Business'
                        },
                        editorOptions:
                        {
                            dataSource: TypeofGoods,
                            columns: [
                                {
                                    dataField: 'SrNo',
                                    width: 70
                                },
                                {
                                    dataField: 'Description',
                                    width: 250
                                },
                                {
                                    dataField: 'HSNCode',
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
                        helpText: "Mention Top 5 Goods"

                    },

                    {

                        colSpan: 4,
                        editorType: "dxDataGrid",
                        label:
                        {
                            text: 'Details of the Services supplied by the Business'
                        },
                        editorOptions:
                        {
                            dataSource: TypeofServices,
                            columns: [
                                {
                                    dataField: 'SrNo',
                                    width: 70
                                },
                                {
                                    dataField: 'Description',
                                    width: 250
                                },
                                {
                                    dataField: 'ServiceAccountingCode',
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
                            helpText: "Mention Top 5 Services"

                        }
                    }


                ]
            },
              //#endregion

             //#region BANKACCOUNTTEMPLATE GROUP
            {
                colCount: 8,
                colSpan: 2,
                template: 'BankAccountTemplate'

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

    //#region ACCOUNT POPUP 
    $scope.popupFormAccount = {
        formData:
        {},
        width: 400,
        colCount: 2,
        labelLocation: "top",
        items: [


            {

                dataField: 'AccountNumber',
                colSpan: 1
            },
            {
                dataField: 'AccountType',
                editorType: "dxSelectBox",
                colSpan: 1,
                editorOptions:
                {
                    items: AccountTypeModel,
                    value: ""
                },
                label:
                {
                    text: 'Account Type'
                },
            },

            {
                dataField: 'IFSCCode',
                colSpan: 1,
                label:
                {
                    text: 'IFSC Code'
                },
            },
            {
                dataField: 'BankName',
                colSpan: 1
            },
            {
                dataField: 'BankAddress',
                editorType: "dxTextArea",
                colSpan: 2,
                height: 400
            },
            {
                itemType: "empty",
                colCount: 12,
                colSpan: 2,
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
                        editorOptions:
                        {
                            text: "Submit",
                            onClick: function (e) {
                                console.log("onClick");
                                $scope.showAccountInfo();
                            }
                        }
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
        title: "Bank Account Details",
        dragEnabled: true,
        closeOnOutsideClick: false,
        bindingOptions:
        {
            visible: "visibleAccountPopup",
        },
        contentTemplate: 'Accountcontent'
    };

    $scope.visibleAccountPopup = false;

    $scope.showAccountInfo = function () {
        $scope.visibleAccountPopup = !$scope.visibleAccountPopup;
    };
    //#endregion

    //#region NAVIGATION BUTTON FUNCTION
    $scope.goPrev = function (hash) {
        hash = "/RegForm1C";
        $location.path(hash);
    },
    $scope.goNext = function (hash) {
            hash = "/RegForm1E";
            $location.path(hash);
        }
    //#endregion

    $scope.formOptions = viewmodelForm01D;
});