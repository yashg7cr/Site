exGSP = window.exGSP || {};

exGSP.controller('CtrRegForm9A', function DemoController($scope,$location) {
    var GovernmentTypeModel = ['State', 'Central'];
    var CityDistrictModel = ['Nagpur', 'Amaravati'];
    var StateModel = ['Maharashtra', 'Madhyapradesh'];
    var EntityTypeModel = ['UN Body', 'Embassy', 'Other Person'];
    var yesnoModel = ['Yes', 'No'];
    var CountryModel = ['India', 'Canada', 'UK'];
    var CenterJurisdictionModel = ['Baner','Cothrood','Shivaji Nagar'];

    var viewmodel = {
        formData: {},
        colCount: 2,
        labelLocation: "top",
        items: [
            {
                itemType: 'group',
                caption: 'Entity Details',
                colCount: 4,
                items: [
                     {
                         dataField: 'EntityType', editorType: "dxRadioGroup", editorOptions: {
                             items: EntityTypeModel,
                             value: "",
                             layout: "horizontal",
                         }, colSpan: 3,
                         label: {
                             text: 'Entity Type'
                         }

                     },
                    {
                        colSpan: 2,
                        itemType: "empty",
                    },
                    {
                        dataField: 'EntityName', colSpan: 2,
                        label: {
                            text: 'Entity Name'
                        },

                        editorOptions: {
                            placeholder: 'Entity Name',
                        }
                    },
                   
                    {
                        dataField: 'MEALetterNo', colSpan: 2,
                        label: {
                            text: 'MEA Letter No'
                        },
                        editorOptions: {
                            placeholder: 'MEA Letter No (If applicable)',
                        },
                        
                    },
                     {
                         dataField: 'MEADate', editorType: "dxDateBox", colSpan: 2,
                         label: {
                             text: 'MEA Date'
                         },
                         editorOptions: {
                             placeholder: 'MEA Date (If applicable)',
                             value: null,
                             width:'100%',
                         },
                         
                     },
                      {
                          dataField: 'Country', editorType: "dxSelectBox", editorOptions: {
                              items: CountryModel,
                              value: ""
                          }, colSpan: 2,
                          label: {
                              text: 'Country'
                          },
                                                   
                      },
                    {
                        dataField: 'NotificationNo',  colSpan: 2,
                        label: {
                            text: 'Notification No'
                        },
                        editorOptions: {
                            placeholder: 'Notification No',
                        },
                    },
                    {
                        dataField: 'NotificationDate', editorType: "dxDateBox", colSpan: 2,
                        label: {
                            text: 'Notification Date'
                        },
                        editorOptions: {
                            placeholder: 'Notification Date',
                            value: null,
                            width: '100%',
                        }
                    }

                ]
            },
        {
            itemType: "group",
            caption: "Address Details",
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
                         dataField: 'BuildingName', colSpan:2,
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
                         dataField: 'PinCode', colSpan: 2,
                         label: {
                             text: 'PinCode'
                         },
                         editorOptions: {
                             placeholder: 'PinCode',
                         }

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
                         dataField: 'State', editorType: "dxSelectBox", editorOptions: {
                             items: StateModel,
                             value: "",
                             layout: "horizontal"
                         }, colSpan: 2,
                         label: {
                             text: 'State'
                         },

                     },

            ]
        },
        {
            itemType: "group",
            caption: "Contact Information",
            colCount: 4,
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

            ]
        },
         {
             itemType: "group",
             caption: "Jurisdiction",
             colCount: 4,
             items: [

                 {
                     dataField: 'CenterJurisdiction', editorType: "dxSelectBox", editorOptions: {
                         items: CenterJurisdictionModel,
                         value: "",
                     }, colSpan: 4,
                     label: {
                         text: 'Center Jurisdiction'
                     },
                    

                 },
                      {
                          dataField: 'CenterCircleWard', colSpan: 4,
                          label: {
                              text: 'Center/Circle/Ward'
                          },
                          editorOptions: {
                              placeholder: 'Center/Circle/Ward',
                          }
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
                   itemType: "empty", colSpan: 11
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
        hash = "/RegForm9B";
        $location.path(hash);
    }
    $scope.formOptions = viewmodel;
});


