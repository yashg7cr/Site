exGSP = window.exGSP || {};

exGSP.controller('CtrRegForm7B', function DemoController($scope, $location) {
    var positions = ['one', 'two', 'three'];
    var RegistrationTypeModel = ['Owned','Leased','Rental'];
    var GovernmentTypeModel = ['State','Central'];
    var CityDistrictModel = ['Nagpur','Amaravati'];
    var StateModel = ['Maharashtra', 'Madhyapradesh'];
    var PossessionTypeModel = ['Owned','Leased','Rental','Concent','Shared'];
    var yesnoModel = ['Yes','No'];

    var viewmodel = {
        formData: {},
        colCount: 2,
        labelLocation: "top",
        items: [
            {
                itemType: 'group',
                caption: 'Additional Tax Deductor Details',
                colCount: 4,
                items: [
                    {
                        dataField: 'TradeName', colSpan: 2,
                        label: {
                            text: 'TradeName'
                        },

                        editorOptions: {
                            placeholder: 'Trade Name',
                        }
                    },
                    {
                        dataField: 'Constitution', editorType: "dxSelectBox", editorOptions: {
                            items: positions,
                            value: ""
                        }, colSpan: 2,
                        label: {
                            text: 'Constitution'
                        }
                    },

                    {
                        dataField: 'State', editorType: "dxSelectBox", editorOptions: {
                            items: StateModel,
                            value: ""
                        }, colSpan: 2,
                        label: {
                            text: 'State'
                        }
                    },
                    {
                        dataField: 'District', editorType: "dxSelectBox", editorOptions: {
                            items: CityDistrictModel,
                            value: ""
                        }, colSpan: 2,
                        label: {
                            text: 'District'
                        }
                    },
                    {
                        dataField: 'Sector/Circle/Ward', editorType: "dxSelectBox", editorOptions: {
                            items: positions,
                            value: ""
                        }, colSpan: 2,
                        label: {
                            text: 'Sector/Circle/Ward'
                        }
                    },
                    {
                        dataField: 'CenterJurisdiction', editorType: "dxSelectBox", editorOptions: {
                            items: positions,
                            value: ""
                        }, colSpan: 2,
                        label: {
                            text: 'Center Jurisdiction'
                        }
                    },
                    {
                        dataField: 'RegistrationType', editorType: "dxRadioGroup", editorOptions: {
                            items: RegistrationTypeModel,
                            value: "",
                            layout: "horizontal"
                        }, colSpan:2,
                        label: {
                            text: 'Registration Type'
                        }
                    },
                    {
                        dataField: 'GovernmentType', editorType: "dxRadioGroup", editorOptions: {
                            items: GovernmentTypeModel,
                            value: "",
                            layout: "horizontal"
                        }, colSpan: 2,
                        label: {
                            text: 'Government Type'
                        },
                        helpText:"Only for Government Departments"
                        
                    },

                ]
            },
        {
            itemType: "group",
            caption: "Principal place of Business",
            colCount: 4,
            items: [

                {
                    dataField: 'BuildingFlat', colSpan: 2,
                    label: {
                        text: 'Building No. / Flat No.'
                    },
                    editorOptions: {
                        placeholder: 'Building No. / Flat No.',
                    }
                },
                     {
                         dataField: 'FloorNo', colSpan: 2,
                         label: {
                             text: 'Floor No.'
                         },
                         editorOptions: {
                             placeholder: 'Floor No.',
                         }
                     },
                     {
                         dataField: 'BuildingName', colSpan: 2,
                         label: {
                             text: 'Building Name'
                         },
                         editorOptions: {
                             placeholder: 'Building Name',
                         }
                     },
                     {
                         dataField: 'RoadStreet', colSpan: 2, 
                         label: {
                             text: 'Road/Street'
                         },
                         editorOptions: {
                             placeholder: 'Road/Street',
                         }
                         
                     },
                     {
                         dataField: 'LocalityVillage', colSpan: 2, 
                         label: {
                             text: 'Locality/Village'
                         },
                         editorOptions: {
                             placeholder: 'Locality/Village',
                         }
                     },
                     {
                         dataField: 'State1',editorType: "dxSelectBox", editorOptions: {
                             items: StateModel,
                             value: "",
                             layout: "horizontal"
                         }, colSpan: 2,
                         label: {
                             text: 'State'
                         },

                     },
                     {
                         dataField: 'CityDistrict', editorType: "dxSelectBox", editorOptions: {
                             items: CityDistrictModel,
                             value: "",
                             layout: "horizontal"
                         }, colSpan: 2,
                         label: {
                             text: 'City/District'
                         },
                         
                     },
                      {
                          dataField: 'PinCode', colSpan: 2,
                          label: {
                              text: 'PinCode'
                          },
                          editorOptions: {
                              placeholder: 'PinCode',
                          }

                      },

                ]
        },
        {
            itemType: "group",
            caption: "Contact Information",
            colCount: 8,
            colSpan:2,
            items: [
                {
                    dataField: 'OfficePhoneNumber', colSpan: 2,
                    label: {
                        text: 'Office Phone Number'
                    },
                    editorOptions: {
                        placeholder: 'Office Phone Number with STD code',
                    },
                   
                },
                     {
                         dataField: 'OfficeEmailID', colSpan: 2,
                         label: {
                             text: 'Office Email ID'
                         },
                         editorOptions: {
                             placeholder: 'Office Email ID',
                         }
                     },
                     {
                         dataField: 'OfficeFaxNumber', colSpan: 2,
                         label: {
                             text: 'Office Fax Number'
                         },
                         editorOptions: {
                             placeholder: 'Office Fax Number with STD code',
                         },
                        
                     },
                     {
                         dataField: 'MobileNumber', colSpan: 2,
                         label: {
                             text: 'Mobile Number'
                         },
                         editorOptions: {
                             placeholder: 'Mobile Number',
                         }

                     },
                     {
                         dataField: 'PossessionNature', editorType: "dxRadioGroup", editorOptions: {
                             items: PossessionTypeModel,
                             value: "",
                             layout: "horizontal"
                         }, colSpan: 4,
                         label: {
                             text: 'Nature of Premises Possession'
                         }
                     },

                      {
                          dataField: 'GSTinotherstate', editorType: "dxRadioGroup", editorOptions: {
                              items: yesnoModel,
                              value: "",
                              layout: "horizontal"
                          }, colSpan: 3,
                          label: {
                              text: 'Have you obtained any other registrations under GST in the same state?'
                          }
                      },
                      {
                          dataField: 'GSTIN', colSpan: 3,
                          label: {
                              text: 'GSTIN'
                          },
                          editorOptions: {
                              placeholder: 'GSTIN',
                          },
                          helpText: "mention if yes"
                      },
                      {
                          dataField: 'IECCode', colSpan: 4,
                          label: {
                              text: 'IEC(Importer Exporter Code)'
                          },
                          editorOptions: {
                              placeholder: 'Importer Exporter Code (If applicable)',
                          },
                         
                      },

            ]
        },
       
        {
            itemType: 'group',
            caption: '',
            colSpan: 2,
            colCount: 12,
            items: [
                {
                    editorType: "dxButton", editorOptions: {
                        text: "<<Previous",
                        onClick: function (e) {
                            $scope.goPrev();
                        }
                    }
                },
              {
                  itemType: "empty", colSpan: 10
              },
             {
                 editorType: "dxButton", editorOptions: {
                     text: "Next>>",
                     onClick: function (e) {
                         $scope.goNext();
                     }
                 }
             },
            ]
        },
            
        ]
    };
    $scope.goNext = function (hash) {
        hash = "/RegForm7C";
        $location.path(hash);
    },
    $scope.goPrev = function (hash) {
        hash = "/RegForm7A";
        $location.path(hash);
    }

    $scope.formOptions = viewmodel;
});


