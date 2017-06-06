exGSP = window.exGSP ||
{};

exGSP.controller('CtrRegForm10B', function DemoController($scope, $location) {

    //#region DATAMODEL
    var GenderTypeModel = ['Male', 'Female', 'Other'];
    //#endregion

    var viewmodelForm20D = {
        formData:
        {},
        colCount: 1,
        // width: 1100,
        labelLocation: "top",
        items: [

            //#region DETAILS OF AUTHORIZED SIGNATORY GROUP
            {
                itemType: 'group',
                caption: 'Details Of Authorized Signatory',
                colCount: 4,
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
                        dataField: 'LastName',
                        colSpan: 1,
                        label:
                        {
                            text: 'Last Name'
                        },
                        editorOptions:
                        {
                            placeholder: 'Last Name'
                        }

                    },

                    {
                        dataField: 'Middle',
                        colSpan: 1,
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
                        dataField: "FirstName",
                        template: 'myTemplatepopup'
                    },

                    {
                        dataField: 'MobileNumber',
                        colSpan: 1,
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
                        dataField: 'EmailAddress',
                        colSpan: 1,
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
                        dataField: 'DateOfBirth',
                        editorOptions:
                        {
                            width: '100%',
                        },
                        colSpan: 1,

                        editorType: "dxDateBox",
                        label:
                        {
                            text: 'DateOfBirth'
                        },
                    },
                    {
                        itemType: "empty",
                    },
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
                        dataField: 'Nationality',
                        colSpan: 1,
                        label:
                        {
                            text: 'Nationality'
                        },
                        editorOptions:
                        {
                            placeholder: 'Nationality'
                        }
                    },
                    {
                        dataField: 'AdhaarNumber',
                        colSpan: 1,
                        label:
                        {
                            text: 'Adhaar Number'
                        },
                        editorOptions:
                        {
                            placeholder: 'Adhaar Number'
                        }
                    },
                    {
                        itemType: "empty",
                    },

                    {
                        dataField: 'PassportNumber',
                        colSpan: 1,
                        label:
                        {
                            text: 'Passport Number'
                        },
                        editorOptions:
                        {
                            placeholder: 'Passport Number'
                        }
                    },

                    {
                        dataField: 'NameofCountryIssuingPassport',
                        colSpan: 1,
                        label:
                        {
                            text: 'Name of Country Issuing Passport'
                        },
                        editorOptions:
                        {
                            placeholder: 'Name of Country Issuing Passport'
                        }
                    },
                    {
                        dataField: 'PersonofIndianOrigin',
                        colSpan: 1,
                        label:
                        {
                            text: 'Person of Indian Origin(PIO)'
                        },
                        editorOptions:
                        {
                            placeholder: 'Person of Indian Origin (If Applicable)'
                        },

                    },
                    {
                        dataField: 'GenderType',
                        editorType: "dxRadioGroup",
                        editorOptions:
                        {
                            items: GenderTypeModel,
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
            //#endregion

            //#region ADDITIONAL DETAILS GROUP
            {
                itemType: 'group',
                caption: 'Additional Details',
                colCount: 4,
                items: [

                    {
                        dataField: 'fromDate',
                        editorOptions:
                        {
                            placeholder: 'From Date',
                            width: '100%',
                        },
                        colSpan: 1,

                        editorType: "dxDateBox",
                        label:
                        {
                            text: 'Rgistration Period'
                        },
                    },

                    {
                        dataField: 'toDate',
                        editorOptions:
                        {
                            placeholder: 'To Date',
                            width: '100%',
                        },
                        colSpan: 1,

                        editorType: "dxDateBox",
                        label:
                        {
                            text: 'To Date'
                        },
                    },

                    {
                        dataField: 'EstimatedTurnoverRs',
                        colSpan: 1,
                        label:
                        {
                            text: 'Estimated Turnover Rs.'
                        },
                        editorOptions:
                        {
                            placeholder: 'Estimated Turnover Rs.'
                        }
                    },
                    {
                        itemType: 'empty'

                    },
                    {
                        dataField: 'EstimatedTaxLiabilityNetRs',
                        colSpan: 1,
                        label:
                        {
                            text: 'Estimated Tax Liability (Net)(Rs)'
                        },
                        editorOptions:
                        {
                            placeholder: 'CGST'
                        }

                    },

                    {
                        dataField: 'SGST',
                        colSpan: 1,
                        label:
                        {
                            text: 'SGST'
                        },
                        editorOptions:
                        {
                            placeholder: 'SGST'
                        }
                    },

                    {
                        dataField: 'IGST',
                        colSpan: 1,
                        label:
                        {
                            text: 'IGST'
                        },
                        editorOptions:
                        {
                            placeholder: 'IGST'
                        }
                    },

                    {
                        dataField: 'Total',
                        colSpan: 1,
                        label:
                        {
                            text: 'Total'
                        },
                        editorOptions:
                        {
                            placeholder: 'Total'
                        }
                    },
                ]
            },
            //#endregion

            //#region BUTTON GROUP
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
                    },
                ]
            },
            //#endregion
        ]
    };

    //#region BUTTON NAVIGATION FUNCTION
    $scope.goPrev = function (hash) {
        hash = "/RegForm10A";
        $location.path(hash);
    },
        $scope.goNext = function (hash) {
            hash = "/RegForm10C";
            $location.path(hash);
        }
    //#endregion

    $scope.formOptions = viewmodelForm20D;
});