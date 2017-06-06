exGSP = window.exGSP || {};

exGSP.controller('CtrRegForm7C', function DemoController($scope, $location) {
   
    var GenderTypeModel = ['Male','Female','Other'];
    var citizenynModel = ['Yes','no'];
    var CityDistrictModel = ['Nagpur', 'Amaravati'];
    var StateModel = ['Maharashtra', 'Madhyapradesh'];
    var PinCodeModel = ['440013','440014'];

    var viewmodel = {
        formData: {},
        colCount: 2,
        labelLocation: "top",
        items: [
            {
                itemType: 'group',
                caption: 'Detail of DDO (drawing and Disbursing Officer)/ Tax Deductor',
                colCount: 3,
                items: [
                    {
                        dataField: 'FullName', colSpan: 1,
                        label: {
                            text: 'Full Name'
                        },

                        editorOptions: {
                            placeholder: 'First',
                        }
                    },
                      {
                          dataField: 'Middle', colSpan: 1,
                          label: {
                              text: 'Middle'
                          },

                          editorOptions: {
                              placeholder: 'Middle',
                          }
                      },
                        {
                            dataField: 'Last', colSpan: 1,
                            label: {
                                text: 'Last'
                            },

                            editorOptions: {
                                placeholder: 'Last',
                            }
                        },


                        {
                            dataField: 'FullNameoffatheranhusband', colSpan: 1,
                            label: {
                                text: 'Full Name of Father & Husband'
                            },

                            editorOptions: {
                                placeholder: 'First',
                            }
                        },
                      {
                          dataField: 'Middle', colSpan: 1,
                          label: {
                              text: 'Middle'
                          },

                          editorOptions: {
                              placeholder: 'Middle',
                          }
                      },
                        {
                            dataField: 'Last', colSpan: 1,
                            label: {
                                text: 'Last'
                            },

                            editorOptions: {
                                placeholder: 'Last',
                            }
                        },
                         {
                             dataField: 'MobileNumber', colSpan: 1,
                             label: {
                                 text: 'Mobile Number'
                             },

                             editorOptions: {
                                 placeholder: 'Mobile Number',
                             }
                         },
                         {
                             dataField: 'TelephoneNumber', colSpan: 1,
                             label: {
                                 text: 'Telephone Number'
                             },

                             editorOptions: {
                                 placeholder: 'Telephone Number with STD',
                             },
                         },
                         {
                             dataField: 'EmailAddress', colSpan: 1,
                             label: {
                                 text: 'Email Address'
                             },

                             editorOptions: {
                                 placeholder: 'Email Address',
                             }
                         },
                         {
                             dataField: 'Dateofbirth', editorType: "dxDateBox", colSpan: 1,
                             label: {
                                 text: 'Date of birth'
                             },

                             editorOptions: {
                                 placeholder: 'Date of birth',
                                 value: 'null',
                                 width:100,
                             }
                         },
     
                    {
                        dataField: 'GenderType', editorType: "dxRadioGroup", editorOptions: {
                            items: GenderTypeModel,
                            value: "",
                            layout: "horizontal"
                        }, colSpan: 2,
                        label: {
                            text: 'Gender'
                        }
                    },
                                       

                ]
            },


{
    itemType: 'group',
    caption: 'Identity Information',
    colCount: 4,
    items: [
        {
            dataField: 'Designation', colSpan: 2,
            label: {
                text: 'Designation'
            },

            editorOptions: {
                placeholder: 'Designation',
            }
        },
          {
              dataField: 'Director Identification Number', colSpan: 2,
              label: {
                  text: 'Director Identification Number'
              },

              editorOptions: {
                  placeholder: 'Director Identification Number',
              }
          },
            {
                dataField: 'PAN Number', colSpan: 2,
                label: {
                    text: 'PAN Number'
                },

                editorOptions: {
                    placeholder: 'PAN Number',
                }
            },


            {
                dataField: 'AADHAR Number', colSpan: 2,
                label: {
                    text: 'AADHAR Number'
                },

                editorOptions: {
                    placeholder: 'AADHAR Number',
                }
            },
            

        {
            dataField: 'CitizenType', editorType: "dxRadioGroup", editorOptions: {
                items: citizenynModel,
                value: "",
                layout: "horizontal"
            }, colSpan: 2,
            label: {
                text: 'Are you a citizen of India?'
            }
        },
        {
            dataField: 'PassportNumber', colSpan: 2,
            label: {
                text: 'PassportNumber'
            },

            editorOptions: {
                placeholder: 'Passport Number',
            },
            helpText:'In case of foreigners'
        },

    ]
},


{
    itemType: 'group',
    caption: 'Residential Address',
    colCount: 8,
    colSpan:2,
    items: [
        {
            dataField: 'FlatNumber', colSpan: 2,
            label: {
                text: 'Flat Number'
            },

            editorOptions: {
                placeholder: 'Flat Number',
            }
        },
          {
              dataField: 'FloorNumber', colSpan: 2,
              label: {
                  text: 'Floor Number'
              },

              editorOptions: {
                  placeholder: 'Floor Number',
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
                dataField: 'PinCode', editorType: "dxSelectBox", colSpan: 2,
                items: PinCodeModel,
                label: {
                    text: 'Pin Code'
                },

                editorOptions: {
                    placeholder: 'Pin Code',
                }
            },
            {
                dataField: 'State', editorType: "dxSelectBox", editorOptions: {
                    items: StateModel,
                    value: "",
                    layout: "horizontal"
                }, colSpan: 2,
                label: {
                    text: ''
                }
            },
            {
                dataField: 'CityDistrict', editorType: "dxSelectBox", editorOptions: {
                    items: CityDistrictModel,
                    value: "",
                    layout: "horizontal"
                }, colSpan: 2,
                label: {
                    text: ''
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
        hash = "/RegForm7D";
        $location.path(hash);
    },
    $scope.goPrev = function (hash) {
        hash = "/RegForm7B";
        $location.path(hash);
    }

    $scope.formOptions = viewmodel;
});