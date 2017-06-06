var exGSP = angular.module("ExGSP", ["dx"]);

exGSP.controller('CtrRegisterNewAccount', function DemoController($scope, $location, $window, ServiceHelper) {

    $scope.viewNewAccountModel = {
        formData: {},
        colCount: 1,
        labelLocation: "top",
        items: [
            {
                itemType: 'group',
                colCount: 2,
                items: [
                      {
                          dataField: 'UserName', colSpan: 2, placeholder: 'Type password',
                          label: {
                              text: 'User ID'
                          },
                          editorOptions: {
                              placeholder: 'User ID',
                          }, validationRules: [{
                              type: 'required',
                              message: 'User Name is required'
                          }]
                      },
                      {
                          dataField: 'Email', colSpan: 2, placeholder: 'Email',
                          label: {
                              text: 'Email'
                          },
                          editorOptions: {
                              placeholder: 'Email',
                          }, validationRules: [{
                              type: 'required',
                              message: 'Email is required'
                          }]
                      },
                         {
                             dataField: 'Password', colSpan: 2, placeholder: 'Type password',
                             label: {
                                 text: 'Password'
                             },
                             editorOptions: {
                                 placeholder: 'Password',
                                 mode: 'password'
                             }
                         },
                          {
                              dataField: 'ConfirmPassword', colSpan: 2, placeholder: 'Retype password',
                              label: {
                                  text: 'Confirm Password'
                              },
                              editorOptions: {
                                  placeholder: 'Confirm Password',
                                  mode: 'password'
                              }
                          },
                          {

                              editorType: "dxCheckBox",
                              editorOptions:
                                  {
                                      
                                      value: "",
                                      layout: "horizontal",
                                      text: "I agree with terms & conditions"
                                  },
                              colSpan: 2,

                          },
                       
                ]
            },
        {
            itemType: 'group',
            caption: "",
            colCount: 2,
            items: [
                {
                    itemType: "empty",
                    colSpan: 1,
                },
                {

                    editorType: "dxButton",
                    editorOptions:
                        {
                            background: 'green',
                            text: "Sign Up",
                            icon: 'plus',
                            width: '100%',
                            onClick: function (e) {
                                //location.href = "SiteMaster.html";
                                //$scope.LoadEnvironment();
                            }
                        },
                    colSpan: 1,
                }

            ]

        }

        ]
    };

    $scope.formOptions = $scope.viewNewAccountModel;
});



