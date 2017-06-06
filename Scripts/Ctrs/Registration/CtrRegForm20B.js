exGSP = window.exGSP ||
{};
exGSP.controller('CtrRegForm20B', function DemoController($scope, $location) {
    //#region DATAMODEL

    var AccountTypeModel = ['Saving Account', 'Current Account'];

    var stateModel = [
        'Maharashtra', 'Madhyapradesh', 'Bihar'
    ];

    var BusinessActivityModel = [
        'Factory / Manufacturing', 'Wholesale Business', 'Retail Business', 'Warehouse/Deport', 'Bonded Warehouse', 'Service Provision', 'Office/Sale Office', 'Leasing Business', 'Service Recipient', 'EOU/ STP/ EHTP', 'SEZ', 'Input Service Distributor (ISD)', 'Works Contract'
    ];
    
    var PossionsionModel = [
        'Own', 'Leased', 'Rented', 'Consent', 'Shared'
    ];

    //#endregion

    //#region ACCOUNT DETAIL POPUP 

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

    $scope.popupAccountOptions = {
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
        //contentTemplate: function (content) {
        //    content.append(frmAccount);
        //}
        contentTemplate: 'Accountcontent'
    };

    $scope.visibleAccountPopup = false;

    $scope.showAccountInfo = function () {
        $scope.visibleAccountPopup = !$scope.visibleAccountPopup;
    };

    //#endregion

    //#region ADDRESS DETAIL POPUP 

    $scope.popupFormAddress = {
        formData:
        {},
        width: 1000,
        colCount: 2,
        labelLocation: "top",
        items: [
            {
                itemType: 'group',

                colCount: 4,
                items: [
                    {
                        dataField: 'FlatNo',
                        colSpan: 2,
                        label:
                        {
                            text: 'Flat No'
                        },
                        editorOptions:
                        {
                            placeholder: 'No 29',
                        }
                    },
                    {
                        dataField: 'FloorNo',
                        colSpan: 2,
                        label:
                        {
                            text: 'Floor No'
                        },
                        editorOptions:
                        {
                            placeholder: 'No 4',
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
                            placeholder: 'Light House',
                        }
                    },
                    {
                        dataField: 'Road',
                        colSpan: 2,
                        label:
                        {
                            text: 'Road/Street'
                        },
                        editorOptions:
                        {
                            placeholder: 'IT Park road',
                        }
                    },
                    {
                        dataField: 'Locality',
                        colSpan: 2,
                        label:
                        {
                            text: 'Locality/Vilage'
                        },
                        editorOptions:
                        {
                            placeholder: 'IT Park Nagpur',
                        }
                    },
                    {
                        dataField: 'PinCode',
                        colSpan: 2,
                        label:
                        {
                            text: 'Pin Code'
                        },
                        editorOptions:
                        {
                            placeholder: '440017',
                        }
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
                        }
                    },
                    {
                        dataField: 'City',
                        colSpan: 2,
                        label:
                        {
                            text: 'City/District '
                        },
                        editorOptions:
                        {
                            placeholder: 'Nagpur',
                        }
                    }, ]
            },
            {
                itemType: 'group',

                colCount: 4,
                items: [
                    {
                        dataField: 'Location',
                        editorType: "dxMap",
                        editorOptions:
                        {
                            provider: 'bing',
                            type: 'roadmap',
                            zoom: 10,
                            center: '18.5204303, 73.85674369999992',
                            height: '170',
                            width: '400'
                        },
                        colSpan: 4,
                        label:
                        {
                            text: 'Location'
                        }
                    },
                    {
                        dataField: 'Latitude',
                        colSpan: 2,
                        label:
                        {
                            text: 'Latitude'
                        },
                        editorOptions:
                        {
                            placeholder: '81.98754',
                        }
                    },
                    {
                        dataField: 'Longitude',
                        colSpan: 2,
                        label:
                        {
                            text: 'Longitude'
                        },
                        editorOptions:
                        {
                            placeholder: '27.36987',
                        }
                    }]
            },
            {
                itemType: 'group',
                caption: 'Contact Information',
                colCount: 4,
                items: [
                    {
                        dataField: 'OfficePhone',
                        colSpan: 2,
                        label:
                        {
                            text: 'Office Phone No'
                        },
                        editorOptions:
                        {
                            placeholder: '+91876556789',
                        }
                    },
                    {
                        dataField: 'OfficeEmail',
                        colSpan: 2,
                        label:
                        {
                            text: 'Office Email Id'
                        },
                        editorOptions:
                        {
                            placeholder: 'abc@excellonsoft.com',
                        }
                    },
                    {
                        dataField: 'OfficeFax',
                        colSpan: 2,
                        label:
                        {
                            text: 'Office Fax No'
                        },
                        editorOptions:
                        {
                            placeholder: '21226556789',
                        }
                    },
                    {
                        dataField: 'MobileNo',
                        colSpan: 2,
                        label:
                        {
                            text: 'Mobile No'
                        },
                        editorOptions:
                        {
                            placeholder: '+91876556789',
                        }
                    }

                ]
            },

            {
                itemType: 'group',
                caption: 'Nature Of Business Activities and Premises Possession',
                colCount: 4,
                items: [
                    {
                        dataField: 'possession',
                        editorType: "dxSelectBox",
                        editorOptions:
                        {
                            items: PossionsionModel,
                            value: "",
                            layout: "horizontal"
                        },
                        colSpan: 4,
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
                        colSpan: 4,
                        label:
                        {
                            text: 'Nature of Business Activity'
                        },

                    }, ]
            },
            {
                itemType: 'group',
                caption: '',
                colCount: 12,
                colSpan: 2,
                items: [
                    {
                        itemType: 'empty',
                        colSpan: 11
                    },
                    {
                        editorType: "dxButton",
                        editorOptions:
                        {
                            text: "Submit",

                            onClick: function (e) {
                                console.log("onClick");
                                $scope.showAddressInfo();
                            }
                        },
                    }]
            }
        ]
    };

    $scope.popupAddressOptions = {
        width: 'auto',
        height: 'auto',
        contentTemplate: "info",
        showTitle: true,
        title: "Place of Business",
        dragEnabled: true,
        closeOnOutsideClick: false,
        bindingOptions:
        {
            visible: "visibleAddressPopup",
        },
        contentTemplate: 'Addresscontent'
    };

    $scope.visibleAddressPopup = false;

    $scope.showAddressInfo = function () {
        $scope.visibleAddressPopup = !$scope.visibleAddressPopup;
    };

    //#endregion

    //#region BUTTON NAVIGATION

    $scope.goPrev = function (hash) {
        hash = "/RegForm20A";
        $location.path(hash);
    },
    $scope.goNext = function (hash) {
            hash = "/RegForm20C";
            $location.path(hash);
    }

    //#endregion
});