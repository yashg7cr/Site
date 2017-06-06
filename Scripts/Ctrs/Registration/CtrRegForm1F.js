exGSP = window.exGSP ||
{};

exGSP.controller('RegForm1F', function DemoController($scope, $location) {

    //#region DATAMODEL
    var TypeofLicense = [
    {
        "SrNo": 1,
        "Name": "Lincence Owner 1"
    },
    {
        "SrNo": 2,
        "Name": "Lincence Owner 2"
    },
    {
        "SrNo": 3,
        "Name": "Lincence Owner 3"
    }];
    //#endregion

    var viewmodelForm01F = {
        formData:
        {},
        colCount: 2,
        labelLocation: "top",
        items: [
            //#region AUTHORIZED REPRESENTATIVE DETAILS GROUP
            {
                itemType: "group",
                caption: "Details of Authorized Representative",
                colCount: 6,
                items: [

                    {
                        dataField: 'EnrolmentID',
                        colSpan: 6,
                        label:
                        {
                            text: 'Enrolment ID'
                        },
                        editorOptions:
                        {
                            placeholder: 'Enrolment ID',
                        }
                    },
                    {
                        dataField: 'FullName',
                        colSpan: 2,
                        label:
                        {
                            text: 'First Name'
                        },
                        editorOptions:
                        {
                            placeholder: 'First Name',
                        }
                    },
                    {
                        dataField: 'Middle Name',
                        colSpan: 2,
                        label:
                        {
                            text: 'Middle Name'
                        },
                        editorOptions:
                        {
                            placeholder: 'Middle Name',
                        }
                    },
                    {
                        dataField: 'LastName',
                        colSpan: 2,
                        label:
                        {
                            text: 'Last Name'
                        },
                        editorOptions:
                        {
                            placeholder: 'Last Name',
                        }

                    },
                    {
                        dataField: 'Status',
                        colSpan: 6,
                        label:
                        {
                            text: 'Status'
                        },
                        editorOptions:
                        {
                            placeholder: 'Status',
                        }
                    },
                    {
                        dataField: 'MobileNumber',
                        colSpan: 3,
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
                        dataField: 'EmailID',
                        colSpan: 3,
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
                        dataField: 'TelephoneNumber',
                        colSpan: 3,
                        label:
                        {
                            text: 'Telephone Number'
                        },
                        editorOptions:
                        {
                            placeholder: 'Telephone Number',
                        },
                        helpText: "With STD Code"
                    },
                    {
                        dataField: 'TelephoneNumber',
                        colSpan: 3,
                        label:
                        {
                            text: 'Telephone Number'
                        },
                        editorOptions:
                        {
                            placeholder: 'Telephone Number',
                        },
                        helpText: "With STD Code"
                    },


                ]
            },
            //#endregion

            //#region STATE SPECIFIC INFORMATION GROUP
            {
                itemType: "group",
                caption: "State Specific Information",
                colCount: 4,
                items: [

                    {
                        dataField: 'ProfessionalTaxEmployeeCode',
                        colSpan: 2,
                        label:
                        {
                            text: 'Professional Tax Employee Code'
                        },
                        editorOptions:
                        {
                            placeholder: 'Professional Tax Employee Code',
                        },

                    },
                    {
                        dataField: 'ProfessionalTaxRegistrationCertificate',
                        colSpan: 2,
                        label:
                        {
                            text: 'Professional Tax Registration Certificate Number'
                        },
                        editorOptions:
                        {
                            placeholder: 'Professional Tax Registration Certificate Number',
                        }
                    },
                    {
                        dataField: 'StateExciseLicenseNo.',
                        colSpan: 2,
                        label:
                        {
                            text: 'State Excise License No.'
                        },
                        editorOptions:
                        {
                            placeholder: 'State Excise License No.',
                        },

                    },
                    {
                        itemType: "empty",
                        colSpan: 2
                    },


                    {

                        colSpan: 4,
                        editorType: "dxDataGrid",
                        label:
                        {
                            text: 'License Owner Names'
                        },
                        editorOptions:
                        {
                            dataSource: TypeofLicense,
                            columns: [
                                {
                                    dataField: 'SrNo',
                                    width: 70
                                },
                                {
                                    dataField: 'Name',
                                    width: 450
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
                        itemType: "empty",
                        colCount: 12,
                        colSpan: 2
                    },

                ]
            },
             //#endregion

            //#region BUTTON GROUP
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

    //#region NAVIGATION BUTTON FUNCTION 
    $scope.goPrev = function (hash) {
        hash = "/RegForm1E";
        $location.path(hash);
    },
    $scope.goNext = function (hash) {
            hash = "/RegForm1G";
            $location.path(hash);
        }
    //#endregion

    $scope.formOptions = viewmodelForm01F;


});