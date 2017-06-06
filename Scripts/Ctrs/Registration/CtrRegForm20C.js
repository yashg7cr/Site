exGSP = window.exGSP ||
{};

exGSP.controller('CtrForm20C', function DemoController($scope, $location) {

    //#region DATAMODEL
    var GenderModel = ['Male', 'Female', 'Other'];
    var CitizenModel = ['Yes', 'No'];
    var CityModel = ['Mumbai', 'Pune', 'Nagpur'];
    var StateModel = ['Maharashtra', 'Delhi', 'Rajastan'];
    var BusinessActivityModel = [
   'Factory / Manufacturing', 'Wholesale Business', 'Retail Business', 'Warehouse/Deport', 'Bonded Warehouse', 'Service Provision', 'Office/Sale Office', 'Leasing Business', 'Service Recipient', 'EOU/ STP/ EHTP', 'SEZ', 'Input Service Distributor (ISD)', 'Works Contract'
    ];

    var PossionsionModel = [
      'Own', 'Leased', 'Rented', 'Consent', 'Shared'
    ];

    //#endregion

    var viewmodelForm20C = {
        formData:
        {},
        //width: 800,
        labelLocation: "top",
        items: [
                    //#region TEMPLATE
                        {
                            template: 'Properiter'
                        },
                   //#endregion

                    //#region TEMPLATE
                        {
                            template: 'CardDetailsTemplate'
                        },
                    //#endregion

                    //#region BUTTON NAVIGATION GROUP
                        {
                            itemType: 'group',
                            caption: '',
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

    //#region POPUP ADDITIONAL AUTHORIZED SIGNATORY
    $scope.popupFormAuthorizedSignatory = {
        formData:
        {},
        width: 'auto',
        height: 'auto',
        scrollingEnabled: true,
        colCount: 2,
        labelLocation: "top",
        items: [

            {
                itemType: 'group',
                colCount: 3,
                items: [

                    {
                        dataField: 'FullName',
                        colSpan: 1,
                        placeholder: 'First',
                        label:
                        {
                            text: 'Full Name'
                        },
                        editorOptions:
                        {
                            placeholder: 'First'
                        }
                    },
                    {
                        dataField: 'FullNameOfFather/Husband',
                        colSpan: 1,
                        placeholder: 'First',
                        label:
                        {
                            text: 'Full Name Of Father/Husband'
                        },
                        editorOptions:
                        {
                            placeholder: 'First'
                        }

                    },
                    {
                        dataField: "",
                        template: 'myTemplate'
                    },

                    {
                        dataField: 'Middle',
                        colSpan: 1,
                        placeholder: 'Middle',
                        label:
                        {
                            text: 'Middle'
                        },
                        editorOptions:
                        {
                            placeholder: 'Middle',
                        }
                    },
                    {
                        dataField: 'MiddleF',
                        colSpan: 1,
                        placeholder: 'Middle',
                        label:
                        {
                            text: 'Middle'
                        },
                        editorOptions:
                        {
                            placeholder: 'Middle'
                        }
                    },
                    {
                        itemType: "empty",
                    },

                    {
                        dataField: 'Last',
                        colSpan: 1,
                        placeholder: 'Last',
                        label:
                        {
                            text: 'Last'
                        },
                        editorOptions:
                        {
                            placeholder: 'Last'
                        }
                    },
                    {
                        dataField: 'LastF',
                        colSpan: 1,
                        placeholder: 'Last',
                        label:
                        {
                            text: 'Last'
                        },
                        editorOptions:
                        {
                            placeholder: 'Last'
                        }
                    },
                    {
                        itemType: "empty",
                    },
                    {
                        dataField: 'MobileNumber',
                        colSpan: 1,
                        placeholder: 'MobileNumber',
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
                        dataField: 'PhoneNumber',
                        colSpan: 1,
                        placeholder: 'PhoneNumber',
                        label:
                        {
                            text: 'Phone Number'
                        },
                        editorOptions:
                        {
                            placeholder: 'Phone Number',
                        }
                    },
                    {
                        dataField: 'EmailAddress',
                        colSpan: 1,
                        placeholder: 'EmailAddress',
                        label:
                        {
                            text: 'Email Address'
                        },
                        editorOptions:
                        {
                            placeholder: 'Email Address',
                        }
                    },
                    {
                        dataField: "DateOfBirth",
                        editorType: "dxDateBox",
                        colSpan: 1,
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
                        dataField: 'Gender',
                        editorType: "dxRadioGroup",
                        editorOptions:
                        {
                            items: GenderModel,
                            value: "",
                            layout: "horizontal"
                        },
                        colSpan: 2,
                        label:
                        {
                            text: 'Gender'
                        }
                    },

                ]
            },

            {
                itemType: "group",
                colCount: 2,
                items: [

                    {
                        dataField: 'Designation',
                        colSpan: 1,
                        label:
                        {
                            text: 'Designation'
                        },
                        editorOptions:
                        {
                            placeholder: 'Designation'
                        }

                    },
                    {
                        dataField: 'DirectorIdentitificationNo',
                        colSpan: 1,
                        editorOptions:
                        {
                            placeholder: 'Director Identitification No'
                        },

                        label:
                        {
                            text: 'Director Identitification No'
                        }
                    },
                    {
                        dataField: 'PAN',
                        colSpan: 1,
                        editorOptions:
                        {
                            placeholder: 'PAN'
                        },
                        label:
                        {
                            text: 'PAN'
                        }
                    },
                    {
                        dataField: 'AdharNo',
                        colSpan: 1,
                        editorOptions:
                        {
                            placeholder: 'Adhar No'
                        },
                        label:
                        {
                            text: 'Adhar No'
                        }
                    },
                    {
                        dataField: 'Citizen',
                        editorType: "dxRadioGroup",
                        editorOptions:
                        {
                            items: CitizenModel,
                            value: "",
                            layout: "horizontal"
                        },
                        colSpan: 1,
                        label:
                        {
                            text: 'Are you citizen of India?'
                        }
                    },
                    {
                        dataField: 'PassportNo',
                        colSpan: 1,
                        label:
                        {
                            text: 'Passport No'
                        },
                        editorOptions:
                        {
                            placeholder: 'Passport No'
                        }
                    }
                ]
            },
            {
                itemType: "group",
                caption: "Residential Address",
                colCount: 8,
                colSpan: 2,
                items: [

                    {
                        dataField: 'FlatNo',
                        colSpan: 2,
                        placeholder: 'Flat No',
                        label:
                        {
                            text: 'Flat No'
                        },
                        editorOptions:
                        {
                            placeholder: 'Flat No'
                        }

                    },
                    {
                        dataField: 'FloorNo',
                        colSpan: 2,
                        placeholder: 'Floor No',
                        label:
                        {
                            text: 'Floor No'
                        },
                        editorOptions:
                        {
                            placeholder: 'Floor No'
                        }
                    },
                    {
                        dataField: 'BuildingName',
                        colSpan: 2,
                        placeholder: 'BuildingName',
                        label:
                        {
                            text: 'Building Name'
                        },
                        editorOptions:
                        {
                            placeholder: 'Building Name'
                        }
                    },
                    {
                        dataField: 'Road',
                        colSpan: 2,
                        placeholder: 'Road',
                        label:
                        {
                            text: 'Road/Street'
                        },
                        editorOptions:
                        {
                            placeholder: 'Road/Street'
                        }
                    },
                    {
                        dataField: 'Locality',
                        colSpan: 2,
                        placeholder: 'Locality',
                        label:
                        {
                            text: 'Locality/village'
                        },
                        editorOptions:
                        {
                            placeholder: 'Locality/village'
                        }
                    },
                    {
                        dataField: 'PinCode',
                        colSpan: 2,
                        editorOptions:
                        {
                            placeholder: 'Pin Code'
                        },
                        label:
                        {
                            text: 'Pin Code'
                        },

                    },
                    {
                        dataField: 'City',
                        colSpan: 2,
                        editorType: "dxSelectBox",
                        editorOptions:
                        {
                            items: CityModel,
                            value: ""
                        },
                        label:
                        {
                            text: 'City/District'
                        },
                    },
                    {
                        dataField: 'State',
                        colSpan: 2,
                        editorType: "dxSelectBox",
                        editorOptions:
                        {
                            items: StateModel,
                            value: ""
                        },
                        placeholder: 'State',
                        label:
                        {
                            text: 'State'
                        },

                    },
                ]
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
                                $scope.showInfo();
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
        scrollingEnabled: true,
        showTitle: true,
        title: "Additional Authorized Signatory",
        dragEnabled: true,
        closeOnOutsideClick: false,
        bindingOptions:
        {
            visible: "visiblePopup",
        },
        contentTemplate: 'AuthorizedSignatorycontent'
    };

    $scope.visiblePopup = false;

    $scope.showInfo = function () {
        $scope.visiblePopup = !$scope.visiblePopup;
    };
    //#endregion

    //#region PARTNER/PROPRIETOR DETAILS POPUP
    $scope.popupPartenerOptions = {
        width: 'auto',
        height: 'auto',
        contentTemplate: "info",
        showTitle: true,
        title: "Partner/Proprietor Details",
        dragEnabled: true,
        closeOnOutsideClick: false,
        bindingOptions:
        {
            visible: "visiblePartnerPopup",
        },
        contentTemplate: 'Partenercontent'
    };

    $scope.visiblePartnerPopup = false;

    $scope.showpartnerInfo = function () {
        $scope.visiblePartnerPopup = !$scope.visiblePartnerPopup;
    };

    $scope.popupFormPartener = {
        formData:
        {},
        width: 'auto',
        height: 'auto',
        colCount: 2,
        labelLocation: "top",
        items: [
            {
                itemType: 'group',

                colCount: 3,
                items: [

                    {
                        dataField: 'FullName',
                        colSpan: 1,
                        placeholder: 'First',
                        label:
                        {
                            text: 'Full Name'
                        },
                        editorOptions:
                        {
                            placeholder: 'First'
                        }
                    },
                    {
                        dataField: 'FullNameOfFather/Husband',
                        colSpan: 1,
                        placeholder: 'First',
                        label:
                        {
                            text: 'Full Name Of Father/Husband'
                        },
                        editorOptions:
                        {
                            placeholder: 'First'
                        }

                    },
                    {
                        dataField: "",
                        template: 'myTemplate'
                    },

                    {
                        dataField: 'Middle',
                        colSpan: 1,
                        placeholder: 'Middle',
                        label:
                        {
                            text: 'Middle'
                        },
                        editorOptions:
                        {
                            placeholder: 'Middle',
                        }
                    },
                    {
                        dataField: 'MiddleF',
                        colSpan: 1,
                        placeholder: 'Middle',
                        label:
                        {
                            text: 'Middle'
                        },
                        editorOptions:
                        {
                            placeholder: 'Middle'
                        }
                    },
                    {
                        itemType: "empty",
                    },

                    {
                        dataField: 'Last',
                        colSpan: 1,
                        placeholder: 'Last',
                        label:
                        {
                            text: 'Last'
                        },
                        editorOptions:
                        {
                            placeholder: 'Last'
                        }
                    },
                    {
                        dataField: 'LastF',
                        colSpan: 1,
                        placeholder: 'Last',
                        label:
                        {
                            text: 'Last'
                        },
                        editorOptions:
                        {
                            placeholder: 'Last'
                        }
                    },
                    {
                        itemType: "empty",
                    },
                    {
                        dataField: 'MobileNumber',
                        colSpan: 1,
                        placeholder: 'MobileNumber',
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
                        dataField: 'PhoneNumber',
                        colSpan: 1,
                        placeholder: 'PhoneNumber',
                        label:
                        {
                            text: 'Phone Number'
                        },
                        editorOptions:
                        {
                            placeholder: 'Phone Number',
                        }
                    },
                    {
                        dataField: 'EmailAddress',
                        colSpan: 1,
                        placeholder: 'EmailAddress',
                        label:
                        {
                            text: 'Email Address'
                        },
                        editorOptions:
                        {
                            placeholder: 'Email Address',
                        }
                    },
                    {
                        dataField: "DateOfBirth",
                        editorType: "dxDateBox",
                        colSpan: 1,
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
                        dataField: 'Gender',
                        editorType: "dxRadioGroup",
                        editorOptions:
                        {
                            items: GenderModel,
                            value: "",
                            layout: "horizontal"
                        },
                        colSpan: 2,
                        label:
                        {
                            text: 'Gender'
                        }
                    },

                ]
            },

            {
                itemType: "group",

                colCount: 2,
                items: [

                    {
                        dataField: 'Designation',
                        colSpan: 1,
                        label:
                        {
                            text: 'Designation'
                        },
                        editorOptions:
                        {
                            placeholder: 'Designation'
                        }

                    },
                    {
                        dataField: 'DirectorIdentitificationNo',
                        colSpan: 1,
                        editorOptions:
                        {
                            placeholder: 'Director Identitification No'
                        },

                        label:
                        {
                            text: 'Director Identitification No'
                        }
                    },
                    {
                        dataField: 'PAN',
                        colSpan: 1,
                        editorOptions:
                        {
                            placeholder: 'PAN'
                        },
                        label:
                        {
                            text: 'PAN'
                        }
                    },
                    {
                        dataField: 'AdharNo',
                        colSpan: 1,
                        editorOptions:
                        {
                            placeholder: 'Adhar No'
                        },
                        label:
                        {
                            text: 'Adhar No'
                        }
                    },
                    {
                        dataField: 'Citizen',
                        editorType: "dxRadioGroup",
                        editorOptions:
                        {
                            items: CitizenModel,
                            value: "",
                            layout: "horizontal"
                        },
                        colSpan: 1,
                        label:
                        {
                            text: 'Are you citizen of India?'
                        }
                    },
                    {
                        dataField: 'PassportNo',
                        colSpan: 1,
                        label:
                        {
                            text: 'Passport No'
                        },
                        editorOptions:
                        {
                            placeholder: 'Passport No'
                        }
                    }

                ]
            },

            {
                itemType: "group",
                caption: "Residential Address",
                colCount: 8,
                colSpan: 2,
                items: [

                    {
                        dataField: 'FlatNo',
                        colSpan: 2,
                        placeholder: 'Flat No',
                        label:
                        {
                            text: 'Flat No'
                        },
                        editorOptions:
                        {
                            placeholder: 'Flat No'
                        }

                    },
                    {
                        dataField: 'FloorNo',
                        colSpan: 2,
                        placeholder: 'Floor No',
                        label:
                        {
                            text: 'Floor No'
                        },
                        editorOptions:
                        {
                            placeholder: 'Floor No'
                        }
                    },
                    {
                        dataField: 'BuildingName',
                        colSpan: 2,
                        placeholder: 'BuildingName',
                        label:
                        {
                            text: 'Building Name'
                        },
                        editorOptions:
                        {
                            placeholder: 'Building Name'
                        }
                    },
                    {
                        dataField: 'Road',
                        colSpan: 2,
                        placeholder: 'Road',
                        label:
                        {
                            text: 'Road/Street'
                        },
                        editorOptions:
                        {
                            placeholder: 'Road/Street'
                        }
                    },
                    {
                        dataField: 'Locality',
                        colSpan: 2,
                        placeholder: 'Locality',
                        label:
                        {
                            text: 'Locality/village'
                        },
                        editorOptions:
                        {
                            placeholder: 'Locality/village'
                        }
                    },
                    {
                        dataField: 'PinCode',
                        colSpan: 2,
                        editorOptions:
                        {
                            placeholder: 'Pin Code'
                        },
                        label:
                        {
                            text: 'Pin Code'
                        },

                    },
                    {
                        dataField: 'City',
                        colSpan: 2,
                        editorType: "dxSelectBox",
                        editorOptions:
                        {
                            items: CityModel,
                            value: ""
                        },
                        label:
                        {
                            text: 'City/District'
                        },
                    },
                    {
                        dataField: 'State',
                        colSpan: 2,
                        editorType: "dxSelectBox",
                        editorOptions:
                        {
                            items: StateModel,
                            value: ""
                        },
                        placeholder: 'State',
                        label:
                        {
                            text: 'State'
                        },

                    },
                ]
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
                                $scope.showpartnerInfo();
                            }
                        }
                    }
                ]
            }
        ]
    };

    //#endregion

    $scope.formOptions = viewmodelForm20C;

    //#region BUTTON NAVIGATION
    $scope.goPrev = function (hash) {
        hash = "/RegForm20B";
        $location.path(hash);
    },
        $scope.goNext = function (hash) {
            hash = "/RegForm20D";
            $location.path(hash);
        }
    //#endregion
});