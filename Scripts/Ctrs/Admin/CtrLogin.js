var exGSP = angular.module("ExGSP", ["dx"]);

exGSP.controller('CtrLogin', function DemoController($scope, $location, $window, ServiceHelper) {
    var _ENTERKEY = 13;
    $scope.CheckLogOut = function () {
        AppCommon.Common.RemoveStorage("AuthenticationToken");
        AppCommon.Common.RemoveStorage("SubscriptionId");
        AppCommon.Common.RemoveStorage("IsSubscriptions");
    }
    $scope.Defaults = {
        RemeberMeModel: ['Remeber Me']
    };
    $scope.Login = {
        Server: AppSetting.LoginConfig.BaseUrl, 
        UserName: "",
        Password: ""
    };
    $scope.CheckAutoLogin = function () {
        if (AppSetting.LoginConfig.LoginAutomatically) {
            $scope.Login.UserName = AppSetting.LoginConfig.LoginIdentityUniqueName;
            $scope.Login.Password = AppSetting.LoginConfig.LoginIdentityPassword;
        }
    };

    $scope.LoadEnvironment = function (buttonIndicator, button) {
        var result = $("#LoginForm").dxForm("instance").validate();
        if (result.isValid) {
            ServiceHelper.SignIn($scope,
                function (response) {
                    if (response.IsAuthenticated) {
                        AppCommon.Common.SetStorage("AuthenticationToken", response.AuthenticationToken);
                        AppCommon.Common.SetStorage("SubscriptionId", "d9aad1f7-6e7e-4143-8995-ec0d87169375");
                        AppCommon.Common.SetStorage("Subscriptions", angular.toJson(response.AuthorizedSubscriptions));
                        AppCommon.Common.RemoveStorage("MenuId");
                        $window.location.href = 'Views/SiteMaster.html';
                    } else {

                        DevExpress.ui.dialog.alert(response.ErrorMessage, 'Login');
                        buttonIndicator.option("visible", false);
                        button.component.option("text", "Login");
                    }
                },
                function (response) {
                    var sErrorMsg = "";
                    if (response == null) sErrorMsg = "Please check your service connection";
                    else sErrorMsg = response;
                    DevExpress.ui.dialog.alert(sErrorMsg, 'Login');
                    buttonIndicator.option("visible", false);
                    button.component.option("text", "Login");
                });
        } else {
            buttonIndicator.option("visible", false);
            button.component.option("text", "Login");
        }
    };
    $scope.getScreen = function () {
        var width = window.innerWidth;

        if (width < 768)
            return "xs";
        else
            return "lg"
    };
    $scope.CreateForm = function (data) {
        //var RemeberMeModel = ['Remeber Me'];
        $scope.viewModel = {
            bindingOptions: {
                formData: 'Login'
            },
            //bindingOptions: {
            //    'formData.UserName': 'Login.UserName',
            //    'formData.Password': 'Login.Password'
            //},
            //formData: $scope.Login,
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
                             dataField: 'Password', colSpan: 2, placeholder: 'Type password',
                             label: {
                                 text: 'Password'
                             },
                             editorOptions: {
                                 placeholder: 'Password',
                                 mode: 'password',
                                 valueChangeEvent: "keyup",
                                 onValueChanged: function (data) {
                                     if (data.jQueryEvent.charCode == _ENTERKEY)
                                     {
                                         alert('Login');
                                     }
                                     return true;
                                 }
                             }, validationRules: [{
                                 type: 'required',
                                 message: 'Password is required'
                             }]
                         },
                          {

                              editorType: "dxCheckBox",
                              editorOptions:
                                  {
                                      items: $scope.Defaults.RemeberMeModel,
                                      value: "",
                                      layout: "horizontal",
                                      text: "Remember Me"
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
                                text: "Login",
                                id:"xyz",
                                height: 37,
                                width: '100%',
                                background: 'green',
                                template: function (data, container) {
                                    $("<div class='button-indicator'></div><span class='dx-button-text'>" + data.text + "</span>").appendTo(container);
                                    buttonIndicator = container.find(".button-indicator").dxLoadIndicator({
                                        visible: false,
                                        height: 30,
                                    }).dxLoadIndicator("instance");
                                },
                                onClick: function (data) {
                                    data.component.option("text", "");
                                    buttonIndicator.option("visible", true);
                                    $scope.LoadEnvironment(buttonIndicator, data);
                                }
                            },
                        colSpan: 1,
                    }

                ]

            }

            ]
        };
    };
    $scope.CheckLogOut();
    $scope.CheckAutoLogin();
    $scope.CreateForm($scope.Login);
    $scope.formOptions = $scope.viewModel;
});





