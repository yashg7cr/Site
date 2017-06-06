exGSP = window.exGSP || {};

exGSP.controller('CtrRegForm9B', function DemoController($scope, $location) {

    var GenderTypeModel = ['Male', 'Female', 'Other'];
    var citizenynModel = ['Yes', 'no'];
    var CityDistrictModel = ['Nagpur', 'Amaravati'];
    var StateModel = ['Maharashtra', 'Madhyapradesh'];
    var PinCodeModel = ['440013', '440014'];
    var TypeofAccountModel = ['Saving','Current','Joint'];

    var viewmodel = {
        formData: {},
        colCount: 2,
        labelLocation: "top",
        items: [
            {
                itemType: 'group',
                caption: 'Authorized Signatory Details',
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
                                text: 'Full Name of Father or Husband'
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
                              dataField: "Dateofbirth",
                              editorType: "dxDateBox",
                              colSpan:1,
                              editorOptions: {
                                  value: null,
                                  width: '100%',
                              },
                              label: {
                                  text: 'Date of birth'
                              },
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
            helpText: 'In case of foreigners'
        },

    ]
},


{
    itemType: 'group',
    caption: 'Residential Address',
    colCount: 4,
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
                dataField: 'RoadStreat', colSpan: 2,
                label: {
                    text: 'Road/Streat'
                },

                editorOptions: {
                    placeholder: 'Road/Streat',
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
                   dataField: 'PinCode', editorType: "dxSelectBox", editorOptions: {
                       items: PinCodeModel,
                       value: "",

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
            

    ]
},

{
    itemType: 'group',
    caption: 'Bank Account Details',
    colCount: 4,
    items: [
        {
            dataField: 'AccountNumber', colSpan: 2,
            label: {
                text: 'Account Number'
            },

            editorOptions: {
                placeholder: 'Account Number',
            }
        },

           {
               dataField: 'TypeofAccount', editorType: "dxSelectBox", editorOptions: {
                   items: TypeofAccountModel,
                   value: "",

               }, colSpan: 2,
               label: {
                   text: 'Type of Account'
               }
           },
          {
              dataField: 'IFSCode', colSpan: 2,
              label: {
                  text: 'IFS Code'
              },

              editorOptions: {
                  placeholder: 'IFS Code',
              }
          },
            {
                dataField: 'BankName', colSpan: 2,
                label: {
                    text: 'Bank Name'
                },

                editorOptions: {
                    placeholder: 'Bank Name',
                }
            },
            {
                dataField: 'Address', editorType: "dxTextArea", colSpan: 4,
                label: {
                    text: 'Address'
                },

                editorOptions: {
                    placeholder: 'Address',
                    height:80,
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
        hash = "/RegForm9C";
        $location.path(hash);
    },
     $scope.goPrev = function (hash) {
         hash = "/RegForm9A";
         $location.path(hash);
    }
    $scope.formOptions = viewmodel;
});