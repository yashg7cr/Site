exGSP = window.exGSP ||
{};

exGSP.controller('CtrRegForm10C', function DemoController($scope, $location) {

    //#region DATAMODEL
    var CityDistrictModel = ['Nagpur', 'Amaravati'];
    var StateModel = ['Maharashtra', 'Madhyapradesh'];
    var CountryModel = ['India', 'Canada', 'UK'];
    var CenterJurisdictionModel = ['Baner', 'Cothrood', 'Shivaji Nagar'];
    var TypeofAccountModel = ['Saving', 'Current', 'Joint'];
    //#endregion

    var viewmodel = {
        formData:
        {},
        colCount: 2,
        labelLocation: "top",
        items: [

           //#region TAXPAYER ADDRESS IN COUNTRY OF ORIGIN GROUP
            {
                itemType: 'group',
                caption: 'Taxpayer Address in Country of Origin',
                colCount: 4,
                items: [
                    {
                        dataField: 'AddressLine1',
                        colSpan: 2,
                        label:
                        {
                            text: 'Address Line1'
                        },

                        editorOptions:
                        {
                            placeholder: 'Address Line1',
                        }
                    },
                    {
                        dataField: 'AddressLine2',
                        colSpan: 2,
                        label:
                        {
                            text: 'Address Line2'
                        },

                        editorOptions:
                        {
                            placeholder: 'Address Line2',
                        }
                    },
                    {
                        dataField: 'Country',
                        editorType: "dxSelectBox",
                        editorOptions:
                        {
                            items: CountryModel,
                            value: ""
                        },
                        colSpan: 2,
                        label:
                        {
                            text: 'Country'
                        },

                    },
                    {
                        dataField: 'ZipCode',
                        colSpan: 2,
                        label:
                        {
                            text: 'Zip Code'
                        },
                        editorOptions:
                        {
                            placeholder: 'Zip Code',
                        },
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
                        },
                    },
                    {
                        dataField: 'TelephoneNumber',
                        colSpan: 2,
                        label:
                        {
                            text: 'Telephone Number'
                        },
                        editorOptions:
                        {
                            placeholder: 'Telephone Number',
                        },
                    },



                ]
            },
           //#endregion

           //#region ADDRESS OF PRINCIPAL PLACE OF BUSINESS

            {
                itemType: "group",
                caption: "Address of Principal Place of Business",
                colCount: 4,
                items: [

                    {
                        dataField: 'BuildingFlat',
                        colSpan: 2,
                        label:
                        {
                            text: 'Building No. / Flat No.'
                        },
                        editorOptions:
                        {
                            placeholder: 'Building No. / Flat No.',
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
                            items: CityDistrictModel,
                            value: "",
                            layout: "horizontal"
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
                            items: StateModel,
                            value: "",
                            layout: "horizontal"
                        },
                        colSpan: 2,
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
                        dataField: 'PhoneNumber',
                        colSpan: 2,
                        label:
                        {
                            text: 'Phone Number'
                        },
                        editorOptions:
                        {
                            placeholder: 'Phone Number with STD code',
                        },
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
                        dataField: 'FaxNumber',
                        colSpan: 2,
                        label:
                        {
                            text: 'Fax Number'
                        },
                        editorOptions:
                        {
                            placeholder: 'Fax Number with STD code',
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
                        itemType: "group",
                        caption: "Jurisdiction",
                        colSpan: 4,
                        colCount: 4,
                        items: [
                            {
                                dataField: 'CenterCircleWard',
                                colSpan: 2,
                                label:
                                {
                                    text: 'Center/Circle/Ward'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Center/Circle/Ward',

                                }
                            },
                            {
                                dataField: 'CenterJurisdiction',
                                editorType: "dxSelectBox",
                                editorOptions:
                                {
                                    items: CenterJurisdictionModel,
                                    value: "",

                                },
                                colSpan: 2,
                                label:
                                {
                                    text: 'Center Jurisdiction'

                                },


                            }

                        ]
                    },

                ]
            },
           //#endregion

           //#region BANK ACCOUNT DETAILS GROUP
            {
                itemType: 'group',
                caption: 'Bank Account Details',
                colCount: 4,
                items: [
                    {
                        dataField: 'AccountNumber',
                        colSpan: 2,
                        label:
                        {
                            text: 'Account Number'
                        },

                        editorOptions:
                        {
                            placeholder: 'Account Number',
                        }
                    },

                    {
                        dataField: 'TypeofAccount',
                        editorType: "dxSelectBox",
                        editorOptions:
                        {
                            items: TypeofAccountModel,
                            value: "",

                        },
                        colSpan: 2,
                        label:
                        {
                            text: 'Type of Account'
                        }
                    },
                    {
                        dataField: 'IFSCode',
                        colSpan: 2,
                        label:
                        {
                            text: 'IFS Code'
                        },

                        editorOptions:
                        {
                            placeholder: 'IFS Code',
                        }
                    },
                    {
                        dataField: 'BankName',
                        colSpan: 2,
                        label:
                        {
                            text: 'Bank Name'
                        },

                        editorOptions:
                        {
                            placeholder: 'Bank Name',
                        }
                    },
                    {
                        dataField: 'Address',
                        editorType: "dxTextArea",
                        colSpan: 4,
                        label:
                        {
                            text: 'Address'
                        },

                        editorOptions:
                        {
                            placeholder: 'Address',
                            height: 70,
                        }
                    },

                ]
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
                    },
                ]
            },
        //#endregion
        ]
    };

    //#region NAVIGATION BUTTON FUNCTION
    $scope.goPrev = function (hash) {
        hash = "/RegForm10B";
        $location.path(hash);
    },
    $scope.goNext = function (hash) {
            hash = "/RegForm10D";
            $location.path(hash);
        }
    //#endregion

    $scope.formOptions = viewmodel;
});