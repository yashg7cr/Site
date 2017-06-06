exGSP = window.exGSP || {};

exGSP.controller('CtrUserProfile', function DemoController($scope, $location) {

    $scope.Classes = {
        User: function (oB2B) {
            return {
                DisplayName: oB2B.DisplayName,
                IsDefault: oB2B.IsDefault,
                IsSubscriptionActive: 1,//oB2B.IsSubscriptionActive,
                SubscriptionId: '*****',//oB2B.SubscriptionId,
                SupplierInvoiceDate: oB2B.SupplierInvoiceDate,
                UniqueName: oB2B.UniqueName,
                ValidTillDate: oB2B.ValidTillDate,
                StartDate: oB2B.StartDate,

            }
        },

    };

    $scope.UserModel = [];

    $scope.SubscriptionsData = angular.fromJson(AppCommon.Common.GetStorage('Subscriptions'));

    $scope.CreateUserModal = function () {
        for (i = 0; i < $scope.SubscriptionsData.length; i++) {
            var oData = new $scope.Classes.User($scope.SubscriptionsData[i]);
            oData.SubscriptionUsed = i * 2 + "/50";
            $scope.UserModel.push(oData);
        }
    }

    $scope.CreateUserModal();

    var stateModel = ['Active', 'Inactive'];
    var statePubModel = ['Published', 'Unpublished'];
    $scope.SummaryDetailsModel = angular.fromJson(AppCommon.Common.GetStorage('Subscriptions'));

    var YourSubscription = [{
        "ID": 1,
        "SrNo": 1,
        "SubscriptionName": "Starter",
        "ProductName": "Starter",
        "StartDate": "04/04/2016",
        "EndDate": "04/04/2021",
        "SubscriptionKey": "*********",
        "State": "Active",
       

    }, {
        "ID": 2,
        "SrNo": 2,
        "SubscriptionName": "Starter",
        "ProductName": "Starter",
        "StartDate": "04/04/2016",
        "EndDate": "04/04/2021",
        "SubscriptionKey": "*********",
        "State": "Active",
        
    }, {
        "ID": 3,
        "SrNo": 3,
        "SubscriptionName": "Starter",
        "ProductName": "Starter",
        "StartDate":"04/04/2016",
        "EndDate": "04/04/2021",
        "SubscriptionKey": "*********",
        "State":"Active",
        
    }];
    var YourApplications = [{
        "ID": 1,
        "SrNo": 1,
        "Name":"Contoso Calculator",
        "Category":"Finance",  
        "State":"Published", 
    }, {
        "ID": 2,
        "SrNo": 2,
        "Name": "Contoso Calculator",
        "Category": "Finance",
        "State": "Unpublished",
    }, {
        "ID": 3,
        "SrNo": 3,
        "Name": "Contoso Calculator",
        "Category": "Finance",
        "State": "Published",
        
    }];


   var store = new DevExpress.data.ArrayStore({
        data: YourSubscription,
        key: 'ID'
   });


   var storeApplication = new DevExpress.data.ArrayStore({
       data: YourApplications,
       key: 'ID'
   });


    var viewmodel = {
        formData: {},
        colCount: 1,
        labelLocation: "top",
        items: [
            {
                template: "ProfileTemplate",
            },
            {
                itemType: "group",
                caption: "Your Subscription",
                colCount: 12,
                colSpan: 12,
                items: [

                          {
                              itemType: "empty", colSpan: 11
                          },
                         {
                             editorType: "dxButton", editorOptions: {
                                 text: "Add New",
                                 icon: 'plus',
                                 onClick: function (e) {
                                     console.log("onClick");
                                     $scope.showInfo();
                                 }
                             }
                         },
                          //{
                          //    colSpan: 12,
                          //    template: "SubscriptionGridTemplate",
                          //},
        
                ]
            },

             //{
             //    itemType: "group",
             //    caption: "Your Application",
             //    colCount: 12,
             //    colSpan: 12,
             //    items: [

             //              {
             //                  itemType: "empty", colSpan: 11
             //              },
             //             {
             //                 editorType: "dxButton", editorOptions: {
             //                     text: "Add New",
             //                     icon: 'plus',
             //                     onClick: function (e) {
             //                         console.log("onClick");
             //                         $scope.showApplicationInfo();
             //                     }
             //                 }
             //             },
             //             {
             //                 colSpan: 12,
             //                 template: "ApplicationGridTemplate",
             //             },
                         

             //    ]

             //}


            
        ]


    }

    //Grid Subscription
    $scope.gridSubscription = {
        dataSource: $scope.UserModel,
        
        columns: [
                               
                                {
                                    dataField: 'DisplayName',
                                    caption: 'Subscription Name'
                                },
                                {
                                    dataField: 'UniqueName',
                                    caption: 'Product Name'
                                },
                                {
                                    dataField: 'StartDate',
                                    dataType: "date",
                                },
                                {
                                    caption: 'Active',
                                    datafield: 'IsSubscriptionActive',
                                    dataType: 'boolean',
                                   
                                },
                                {
                                    dataField: 'ValidTillDate',
                                    caption:'Valid Till Date',
                                    dataType: "date",
                                },
                                //{
                                //    dataField: "state",
                                //    dataType: 'boolean',
                                //    setCellValue: function (rowData, value) {
                                //        var newValue = value == true ? 1 : 0 ;
                                //        this.defaultSetCellValue(rowData, 1);
                                //    }
                                //},
                                 {
                                     dataField: 'SubscriptionId',
                                     caption: 'Subscription Key',
                                     
                                 },
                                 {
                                     caption: "Subscription Used",
                                     dataField:'SubscriptionUsed'
                                 },
                                 //{
                                 //    width: 200,
                                 //    caption: "Subscription Used",
                                 //    alignment: 'center',
                                 //    //dataField: 'Status',
                                 //    cellTemplate: function (container, options) {
                                 //        $('<a/>').addClass().css("width", "300px")//options.data.Status
                                 //            .text('25/50')//options.data.Status
                                 //            .on('dxclick', function () {
                                 //            })
                                 //            .appendTo(container);
                                 //    }
                                 //},
                                //{ dataField: 'SubscriptionId',format:'******' },
                                //{ dataField: 'State' },
                        {
                            cellTemplate: 'commandColumn'
                        }
        ],
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        rowAlternationEnabled: true,
        editClick: function (rowIndex, row) {
            var data = jQuery.extend({}, row);
            $scope.currentRow = {
                key: $scope.gridInstance.getKeyByRowIndex(rowIndex),
                data: data,
            };
            $scope.visiblePopup = true;
        },
        onInitialized: function (e) {
            $scope.gridInstance = e.component;
        }
    }
    //Grid Subscription End

    //Grid Application

    $scope.gridApplication = {
        dataSource: storeApplication,
        columns: [
                                { dataField: 'SrNo', width: 70 },
                                { dataField: 'Name' },
                                { dataField: 'Category' },
                                { dataField: 'State' },
                        {
                            cellTemplate: 'commandColumn'
                        }
        ],
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        rowAlternationEnabled: true,
        editClick: function (rowIndex, row) {
            var data = jQuery.extend({}, row);
            $scope.currentRow = {
                key: $scope.gridInstance.getKeyByRowIndex(rowIndex),
                data: data,
            };
            $scope.visiblePopupApplication = true;
        },
        onInitialized: function (e) {
            $scope.gridInstance = e.component;
        }
    }
    //Grid Application End


    //popup Subscription
    $scope.popupFormSubscription = {
        formData: {},
        width: 500,
        height: 'auto',
        scrollingEnabled: true,
        colCount: 1,
        labelLocation: "top",
        items: [
            {
                itemType: 'group',
                colCount: 2,
                items: [
                    {
                        dataField: 'SubscriptionName',
                        colSpan: 1,
                        label: { text: 'Subscription Name' },
                        editorOptions: { placeholder: 'Subscription Name' }

                    },

                    {
                        dataField: 'ProductName',
                        colSpan: 1,
                        label: { text: 'Product Name' },
                        editorOptions: { placeholder: 'Product Name' }
                    },
                    {
                        dataField: 'StartDate',
                        editorType: 'dxDateBox',
                        colSpan: 1,
                        label: { text: 'Start Date' },
                        editorOptions: { placeholder: 'Start Date', width: '100%' }
                    },
                     {
                         dataField: 'EndDate',
                         editorType: 'dxDateBox',
                         colSpan: 1,
                         label: { text: 'End Date' },
                         editorOptions: { placeholder: 'End Date', width: '100%' }
                     },
                      {
                          dataField: 'SubscriptionKey',
                          colSpan: 1,
                          label: { text: 'Subscription Key' },
                          editorOptions: { placeholder: 'Subscription Key' }
                      },
                       {
                           dataField: 'State',
                           editorType: 'dxRadioGroup',
                           colSpan: 1,
                           label: { text: 'State' },
                           editorOptions: {
                               placeholder: 'State',
                               items: stateModel,
                               value: "",
                               layout: "horizontal"
                           
                           }
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
                              itemType: "empty", colSpan: 11
                          },
                         {
                             editorType: "dxButton", editorOptions: {
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
        dragEnabled: true,
        showTitle: true,
        title: "Subscription Detail",
        closeOnOutsideClick: false,
        bindingOptions:
                        {
                            visible: "visiblePopup",
                        },
        contentTemplate: 'Subscriptioncontent'
    };

    $scope.visiblePopup = false;

    $scope.showInfo = function () {
        $scope.visiblePopup = !$scope.visiblePopup;
    };

    //END popup Subscription


    

    //popup Application
    $scope.popupFormApplication = {
        formData: {},
        width: 500,
        height: 'auto',
        scrollingEnabled: true,
        colCount: 1,
        labelLocation: "top",
        items: [
            {
                itemType: 'group',                
                colCount: 2,
                items: [
                    {
                        dataField: 'Name',
                        colSpan: 2,
                        label: { text: 'Name' },
                        editorOptions: { placeholder: 'Name' }

                    },

                    {
                        dataField: 'Category',
                        colSpan: 2,
                        label: { text: 'Category' },
                        editorOptions: { placeholder: 'Category' }
                    },
                    {
                        dataField: 'State',
                        editorType: 'dxRadioGroup',
                        colSpan: 2,
                        label: { text: 'State' },
                        editorOptions: {
                            placeholder: 'State',
                            items: statePubModel,
                            value: "",
                            layout: "horizontal"
                        }
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
                              itemType: "empty", colSpan: 11
                          },
                         {
                             editorType: "dxButton", editorOptions: {
                                 text: "Submit",
                                 onClick: function (e) {
                                     console.log("onClick");
                                     $scope.showApplicationInfo();
                                 }
                             }
                         }
                ]
            }

        ]
    };
    $scope.popupOptionsApplication = {
        width: 'auto',
        height: 'auto',
        contentTemplate: "info",
        scrollingEnabled: true,
        dragEnabled: true,
        showTitle: true,
        title: "Application Detail",
        closeOnOutsideClick: false,
        bindingOptions:
                        {
                            visible: "visiblePopupApplication",
                        },
        contentTemplate: 'Applicationcontent'
    };

    $scope.visiblePopupApplication = false;

    $scope.showApplicationInfo = function () {
        $scope.visiblePopupApplication = !$scope.visiblePopupApplication;
    };


    //END popup Application

 

    //popup ChangePopup
    $scope.popupFormChangePassword = {
        formData: {},
        width: 500,
        height: 'auto',
        scrollingEnabled: true,
        colCount: 1,
        labelLocation: "top",
        items: [
            {
                itemType: 'group',
                colCount: 2,
                items: [
                    {
                        dataField: 'OldPassword',
                        colSpan: 2,
                        label: { text: 'Old Password' },
                        editorOptions: { placeholder: 'Old Password' }

                    },

                    {
                        dataField: 'NewPassword',
                        colSpan: 2,
                        label: { text: 'New Password' },
                        editorOptions: { placeholder: 'New Password' }
                    },
                    {
                        dataField: 'ConfirmNewPassword',
                        colSpan: 2,
                        label: { text: 'Confirm New Password' },
                        editorOptions: { placeholder: 'Confirm New Password' }
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
                              itemType: "empty", colSpan: 11
                          },
                         {
                             editorType: "dxButton", editorOptions: {
                                 text: "Submit",
                                 onClick: function (e) {
                                     console.log("onClick");
                                     $scope.showChangePasswordInfo();
                                 }
                             }
                         }
                ]
            }

        ]
    };
    $scope.popupOptionsChangePassword = {
        width: 'auto',
        height: 'auto',
        contentTemplate: "info",
        scrollingEnabled: true,
        dragEnabled: true,
        showTitle: true,
        title: "Change Password",
        closeOnOutsideClick: false,
        bindingOptions:
                        {
                            visible: "visiblePopupChangePassword",
                        },
        contentTemplate: 'ChangePasswordcontent'
    };

    $scope.visibleChangePassword = false;

    $scope.showChangePasswordInfo = function () {
        $scope.visiblePopupChangePassword = !$scope.visiblePopupChangePassword;
    };


    //END ChangePopup


    //popup ChangeAccountInfo
    $scope.popupFormChangeAccountInfo = {
        formData: {},
        width: 500,
        height: 'auto',
        scrollingEnabled: true,
        colCount: 1,
        labelLocation: "top",
        items: [
            {
                itemType: 'group',
                colCount: 2,
                items: [
                    {
                        dataField: 'Name',
                        colSpan: 1,
                        label: { text: 'Name' },
                        editorOptions: { placeholder: 'Name' }

                    },

                    {
                        dataField: 'LastName',
                        colSpan: 1,
                        label: { text: 'Last Name' },
                        editorOptions: { placeholder: 'Last Name' }
                    },
                    {
                        dataField: 'DateofBirth',
                        editorType: 'dxDateBox',
                        colSpan: 1,
                        label: { text: 'Date of Birth' },
                        editorOptions: { placeholder: 'Date of Birth',width: "100%" }
                    },
                    {
                        dataField: 'Address',
                        colSpan: 1,
                        label: { text: 'Address' },
                        editorOptions: { placeholder: 'Address' }
                    },
                    {
                        dataField: 'Languages',
                        colSpan: 1,
                        label: { text: 'Languages' },
                        editorOptions: { placeholder: 'Languages' }
                    },
                    {
                        dataField: 'Phone',
                        colSpan: 1,
                        label: { text: 'Phone' },
                        editorOptions: { placeholder: 'Phone',}
                    },
                    {
                        dataField: 'Website',
                        colSpan: 1,
                        label: { text: 'Website' },
                        editorOptions: { placeholder: 'Website' }
                    },
                    {
                        dataField: 'Email',
                        colSpan: 1,
                        label: { text: 'Email' },
                        editorOptions: { placeholder: 'Email', }
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
                              itemType: "empty", colSpan: 11
                          },
                         {
                             editorType: "dxButton", editorOptions: {
                                 text: "Submit",
                                 onClick: function (e) {
                                     console.log("onClick");
                                     $scope.showChangeAccountInfo();
                                 }
                             }
                         }
                ]
            }

        ]
    };
    $scope.popupOptionsChangeAccountInfo = {
        width: 'auto',
        height: 'auto',
        contentTemplate: "info",
        scrollingEnabled: true,
        dragEnabled: true,
        showTitle: true,
        title: "Change Account Information",
        closeOnOutsideClick: false,
        bindingOptions:
                        {
                            visible: "visiblePopupChangeAccountInfo",
                        },
        contentTemplate: 'ChangeAccountInfocontent'
    };

    $scope.visibleChangeAccountInfo = false;

    $scope.showChangeAccountInfo = function () {
        $scope.visiblePopupChangeAccountInfo = !$scope.visiblePopupChangeAccountInfo;
    };


    //END ChangePopup







   

    $scope.formOptions = viewmodel;
});
