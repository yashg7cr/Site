exGSP = window.exGSP || {};

exGSP.controller('CtrAllUser', function DemoController($scope, $rootScope, $location, ServiceHelper) {
    $rootScope.loadingVisible = true;
    $scope.Classes = {
        UserMaster: function (oUser) {
            return {
                HeaderID: oUser.HeaderID,
                Code: oUser.Code,
                DisplayName: oUser.DisplayName,
                Description: oUser.Description,
                UserType: oUser.UserType,
                UserCategory: oUser.UserCategory,
                DisplayLanguageId: oUser.DisplayLanguageId,
                DefaultBranchId: oUser.DefaultBranchId,
                DefaultCompanyId: oUser.DefaultCompanyId,
                ProfileId: oUser.ProfileId,
                ContactId: oUser.ContactId,
                IdentityId: oUser.IdentityId,
                IPAddressFilter: oUser.IPAddressFilter,
                MACAddressFilter: oUser.MACAddressFilter,
                MACAddress: oUser.MACAddress,
                AllowedSmartClient: oUser.AllowedSmartClient,
                AllowedMobileClient: oUser.AllowedMobileClient,
                AllowedTabletClient: oUser.AllowedTabletClient,
                IsActive: "1",//$scope.GetActiveStatus(oUser.IsActive),
                PreferedViewID: oUser.PreferedViewID,
                //CreatedBy: oUser.CreatedBy,
                //CreatedDateTime: oUser.CreatedDateTime,
                //ModifiedBy: oUser.ModifiedBy,
                //ModifiedDateTime: oUser.ModifiedDateTime,
                //SubscriptionId: oUser.SubscriptionId,
                //VersionNo: oUser.VersionNo,
                PasswordValidTillDate: oUser.PasswordValidTillDate,
                ChangePasswordOnLogOn: oUser.ChangePasswordOnLogOn,
                EMail: oUser.EMail,
                Password: oUser.Password,

            }
        }
    };
    $scope.UserMasterModel = [];
    $scope.UserMasterDataModal = [];
    $scope.GetResource = function () {
        var rData = new AppCommon.Class.EntityQueryRequest();
        rData.EntityType = AppCommon.EntityType.UserMaster;
        rData.ViewId = AppCommon.Views.Empty;
        rData.Count = 5;
        ServiceHelper.QueryEntity(rData,
            function (response) {
                if (response.Entitities != null) {
                    $scope.SuccessDataCall(response);
                } else {
                    DevExpress.ui.dialog.alert(response.ErrorMessage, 'Alert');
                    $rootScope.loadingVisible = false;
                }
            },
            function (response) {
                DevExpress.ui.dialog.alert(response, 'Alert');
                $rootScope.loadingVisible = false;
            });
    }
    $scope.SuccessDataCall = function (response) {
        $scope.UserMasterModal(response.Entitities);
        $scope.Init();
        $rootScope.loadingVisible = false;
    }
    $scope.UserMasterModal = function (dataUsers) {
        $.each(dataUsers, function (i, item) {
            var oData = new $scope.Classes.UserMaster(item.Data.UserMaster[0]);
            $scope.UserMasterModel.push(oData);
        });
    }

    var AllUserProfileModel = ['Admin', 'Normal User'];
    var AllUserTypeModel = ['Admin', 'Normal User'];
    var TypeofTax = [{
        "ID": 1,
        "SrNo": 1,
        "TypeOfTax": "Integrated Goods and Service Tax (IGST)",
        "TurnOver": "100000",
        "NetTaxLiability": "10000"

    }, {
        "ID": 2,
        "SrNo": 2,
        "TypeOfTax": "Central Goods and Service Tax (CGST)",
        "TurnOver": "100000",
        "NetTaxLiability": "10000"
    }, {
        "ID": 3,
        "SrNo": 3,
        "TypeOfTax": "State Goods and Service Tax (SGST)",
        "TurnOver": "100000",
        "NetTaxLiability": "10000"
    }];

    $scope.CreateUserAddButton = function () {
        $scope.viewmodelAllUser = {
            formData: {},
            colCount: 1,
            labelLocation: "top",
            items: [
                 {
                     itemType: "group",
                     //  caption: "All Users",
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
                     {
                         itemType: "empty", colSpan: 11
                     },
                     ]
                 },
            ]
        };
    }
    $scope.CreateUserGrid = function () {
        var store = new DevExpress.data.ArrayStore({
            data: $scope.UserMasterModel,
            key: 'ID'
        });
        //$scope.gridInstance = null;
        $scope.gridConfig = {
            dataSource: store,
            paging: {
                pageSize: AppSetting.AppConstant.PageSize,

            },
            pager: {
                showNavigationButtons: true
            },
            columns: [
                            { dataField: 'Code' },
                            { dataField: 'DisplayName' },
                            { dataField: 'UserType', caption: 'User Type' },
                            //{ dataField: 'DefaultBranchId',caption:'Default Branch' },
                            //{ dataField: 'DefaultCompanyId',caption:'Default Company' },
                            //{ dataField: 'ContactId', caption: 'Contact', },
                            { dataField: 'IsActive', caption: 'Active Status', dataType: 'boolean', },
                            { dataField: 'CreatedDateTime', caption: 'Creation Date', dataType: 'date', format: AppSetting.AppConstant.Dateformat },
                            { dataField: 'CreatedDateTime', caption: 'Creation Time', dataType: 'date', format: AppSetting.AppConstant.Timeformat },
                            //{ dataField: 'ProfileId', caption: 'Profile Name' },
                            //{
                            //    cellTemplate: 'commandColumn'
                            //}
                            {
                                width: 110,
                                caption: "Reconciliation",
                                alignment: 'center',
                                cellTemplate: function (container, options) {
                                    $('<a/>').addClass('btn btn-link')//options.data.Status
                                        .text('Edit')//options.data.Status
                                        .on('dxclick', function () {
                                            $scope.UserMasterDataModal = [];
                                            var oData = options.data;
                                            $scope.UserMasterDataModal = oData;
                                            $scope.CreateUserPopup();
                                            $scope.visiblePopup = true;
                                        })
                                        .appendTo(container);
                                }
                            },
            ],
            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            rowAlternationEnabled: true,
            editClick: function (rowIndex, row) {
                //$scope.UTPDataModel = [];
                //var oData = info.data;
                //$scope.UTPDataModel = oData;
                //$scope.CreateUnregistredTaxpayerPopup();
                //$scope.visibleUnregistredTaxpayerDetails = true;
                $scope.visiblePopup = true;
            },

        };
    }

    $scope.GetActiveStatus = function (status) {
        var iStatus = '';
        if (status == false)
            iStatus = "0";
        else if (status == true)
            iStatus = "1";
        else if (status == null)
            iStatus = "0";
        return iStatus
    }

    $scope.CreateUserPopup = function () {
        //popup Additional Authorized Signatory
        $scope.popupFormAllUsers = {
            formData: $scope.UserMasterDataModal,
            width: 650,
            height: 450,
            scrollingEnabled: true,
            colCount: 2,
            colSpan: 2,
            labelLocation: "top",
            items: [{
                itemType: "group",
                colSpan: 2,
                items: [{
                    itemType: "tabbed",
                    tabPanelOptions: {
                        deferRendering: false
                    },
                    tabs: [
                        {
                            title: "General",
                            items: [
                                 {
                                     itemType: "group",
                                     colSpan: 1,
                                     colCount: 1,
                                     items: [
                                          {
                                              itemType: 'group',
                                              colCount: 1,
                                              items: [
                                                          {
                                                              itemType: 'group',
                                                              caption: 'Basic Information',
                                                              colCount: 2,
                                                              items: [{
                                                                  dataField: 'DisplayName',
                                                                  colSpan: 1,
                                                                  label: { text: 'Name' },
                                                                  editorOptions: { placeholder: 'Name' }
                                                              },
                                                                  {
                                                                      dataField: 'EMail',
                                                                      colSpan: 1,
                                                                      label: { text: 'Email' },
                                                                      editorOptions: { placeholder: 'Email' }

                                                                  },

                                                                  {
                                                                      dataField: 'Password',
                                                                      colSpan: 1,
                                                                      label: { text: 'Password' },
                                                                      editorOptions: { placeholder: 'Password' }
                                                                  },
                                                                  {
                                                                      dataField: 'Mobileno',
                                                                      colSpan: 1,
                                                                      label: { text: 'Mobile No.' },
                                                                      editorOptions: { placeholder: 'Mobile No.', width: '100%' }
                                                                  },
                                                                  //{
                                                                  //    dataField: 'UserType',
                                                                  //    colSpan: 1,
                                                                  //    editorType: 'dxSelectBox',
                                                                  //    label: { text: 'User Type' },
                                                                  //    editorOptions: { placeholder: 'User Type', items: AllUserTypeModel, }
                                                                  //},
                                                                  //{
                                                                  //    dataField: 'DisplayLanguage',
                                                                  //    editorType: 'dxSelectBox',
                                                                  //    colSpan: 1,
                                                                  //    label: { text: 'Display Language' },
                                                                  //    editorOptions: { placeholder: 'Display Language' }
                                                                  //},
                                                                  //{
                                                                  //    dataField: 'UserCategory',
                                                                  //    editorType: 'dxSelectBox',
                                                                  //    colSpan: 1,
                                                                  //    label: { text: 'User Category' },
                                                                  //    editorOptions: { placeholder: 'User Category' }
                                                                  //},
                                                                  //{
                                                                  //    dataField: 'Discription',
                                                                  //    colSpan: 2,
                                                                  //    editorType: "dxTextArea",
                                                                  //    label: { text: 'Discription' },
                                                                  //    editorOptions: { placeholder: 'Discription' }
                                                                  //},
                                                              ]
                                                          },
                                                          {
                                                              itemType: "group",
                                                              caption: 'User Settings',
                                                              colCount: 3,
                                                              items: [
                                                                      {
                                                                          colSpan: 1,
                                                                          editorType: "dxCheckBox",

                                                                          editorOptions:
                                                                                 {
                                                                                     text: "Is Active", width: 70,
                                                                                 }
                                                                      },
                                                                      {
                                                                          colSpan: 1,
                                                                          editorType: "dxCheckBox",
                                                                          editorOptions:
                                                                                 {
                                                                                     text: "Account Locked", width: 120,
                                                                                 }
                                                                      },
                                                                      {
                                                                          colSpan: 1,
                                                                          editorType: "dxCheckBox",
                                                                          editorOptions:
                                                                                 {
                                                                                     text: "Force password change on log in", width: 200,
                                                                                 }
                                                                      },
                                                              ]
                                                          },
                                              ]
                                          },
                                     //      {
                                     //          itemType: 'group',
                                     //          colCount: 1,
                                     //          items: [
                                     //              {
                                     //                  itemType: "group",
                                     //                  caption: 'Profile Details',
                                     //                  colCount: 2,
                                     //                  items: [

                                     //                           {
                                     //                               dataField: 'Profile',
                                     //                               editorType: 'dxSelectBox',
                                     //                               editorOptions: { items: AllUserProfileModel },
                                     //                               colSpan: 2,

                                     //                           },

                                     //                  ]
                                     //              },
                                     //{
                                     //    itemType: "group",
                                     //    caption: 'Default Settings',
                                     //    colCount: 2,
                                     //    items: [

                                     //             {
                                     //                 dataField: 'Default Company',
                                     //                 editorType: 'dxSelectBox',
                                     //                 editorOptions: { text: 'Default Company', items: AllUserProfileModel },
                                     //                 colSpan: 1,

                                     //             },
                                     //              {
                                     //                  dataField: 'Default Branch',
                                     //                  editorType: 'dxSelectBox',
                                     //                  label: { text: 'Default Branch' },
                                     //                  editorOptions: { items: AllUserProfileModel },
                                     //                  colSpan: 1,

                                     //              },
                                     //               {
                                     //                   dataField: 'Contact Code',
                                     //                   editorType: 'dxSelectBox',
                                     //                   label: { text: 'Contact Code' },
                                     //                   editorOptions: { items: AllUserProfileModel, },
                                     //                   colSpan: 1,

                                     //               },
                                     //               {
                                     //                   dataField: 'Contact Code',
                                     //                   editorOptions: { items: AllUserProfileModel, },
                                     //                   colSpan: 1,

                                     //               },
                                     //               {
                                     //                   dataField: 'Email',
                                     //                   editorType: 'dxSelectBox',
                                     //                   label: { text: 'Email' },
                                     //                   editorOptions: { items: AllUserProfileModel, },
                                     //                   colSpan: 1,

                                     //               },
                                     //    ]
                                     //},

                                     //          ]
                                     //      },
                                     ],
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
                                             var oData = $scope.UserMasterDataModal;
                                             $scope.SaveUser(oData);
                                             //var rData = new AppCommon.Class.EntityQueryRequest();
                                             //rData.EntityType = AppCommon.EntityType.UserMaster;
                                             //rData.ViewId = AppCommon.Views.Empty;
                                             //rData.Count = 5;
                                             //ServiceHelper.CreateEntity(rData,
                                             //    function (response) {
                                             //        if (response.IsUpdateSuccessful) {
                                             //            DevExpress.ui.notify("Data Saved Successfully", "Success", 3000);
                                             //            $scope.showInfo();
                                             //        } else {
                                             //            DevExpress.ui.notify(response.ErrorMessage, "error", 3000);
                                             //        }
                                             //    },
                                             //       function (response) {
                                             //           DevExpress.ui.alert(response, "error", 3000);
                                             //       });

                                         }
                                     }
                                 }
                        ]
                    }
                            ]
                        },

                    //{
                    //    title: "Other Settings",
                    //    items: [
                    //        {
                    //            itemType: "group",
                    //            caption: 'Other Settings',
                    //            colCount: 2,
                    //            colSpan: 2,
                    //            items: [

                    //                     {
                    //                         dataField: 'FRlevel',
                    //                         editorType: 'dxSelectBox',
                    //                         editorOptions: { text: 'FR level', items: AllUserProfileModel },
                    //                         colSpan: 1,
                    //                     },
                    //                      {
                    //                          dataField: 'RequiredTheme',
                    //                          label: { text: 'Required Theme' },
                    //                          colSpan: 1,

                    //                      },
                    //                       {
                    //                           dataField: 'ExternalCode',
                    //                           label: { text: 'External Code' },
                    //                           colSpan: 1,

                    //                       },
                    //                       {
                    //                           dataField: 'ADPath',
                    //                           editorType: "dxTextArea",
                    //                           label: { text: 'AD Path' },
                    //                           colSpan: 1,

                    //                       },
                    //            ]
                    //        },
                    //        {
                    //            itemType: "group",
                    //            caption: "Discription of Goods Suplied by the Business ",
                    //            colCount: 8,
                    //            colSpan: 2,
                    //            items: [
                    //                    {
                    //                        editorType: "dxDataGrid",
                    //                        colSpan: 8,
                    //                        editorOptions: {
                    //                            dataSource: TypeofTax,
                    //                            columns: [
                    //                                        { dataField: 'Roll', },
                    //                                        { dataField: 'Company', },
                    //                                        { dataField: 'Company Group', },
                    //                                        { dataField: 'Branch', },
                    //                            ],
                    //                            showColumnLines: true,
                    //                            showRowLines: true,
                    //                            showBorders: true,
                    //                            rowAlternationEnabled: true,
                    //                            editing: {
                    //                                mode: "row",
                    //                                allowUpdating: true,
                    //                                allowDeleting: true,
                    //                                allowAdding: true
                    //                            },
                    //                        },

                    //                    },

                    //            ]
                    //        },
                    //        {
                    //            itemType: 'group',
                    //            caption: '',
                    //            colCount: 12,
                    //            colSpan: 2,
                    //            items: [
                    //                      {
                    //                          itemType: "empty", colSpan: 11
                    //                      },
                    //                     {
                    //                         editorType: "dxButton", editorOptions: {
                    //                             text: "Submit",
                    //                             onClick: function (e) {
                    //                                 console.log("onClick");
                    //                                 $scope.showInfo();
                    //                             }
                    //                         }
                    //                     }
                    //            ]
                    //        }
                    //    ]
                    //},

                    {
                        title: "Security Settings",
                        items: [
                            {
                                itemType: "group",
                                colCount: 1,
                                items: [

                                    {
                                        itemType: "group",
                                        colCount: 1,
                                        items: [

                                                 {
                                                     itemType: "group",
                                                     caption: 'Allow Login Client',
                                                     colCount: 3,
                                                     items: [
                                                               {
                                                                   colSpan: 1,
                                                                   editorType: "dxCheckBox",
                                                                   editorOptions: { text: "Smart Client" }
                                                               },
                                                               {
                                                                   colSpan: 1,
                                                                   editorType: "dxCheckBox",
                                                                   editorOptions: { text: "Tablet Client" }
                                                               },
                                                               {
                                                                   colSpan: 1,
                                                                   editorType: "dxCheckBox",
                                                                   editorOptions: { text: "mobile Client" }
                                                               },
                                                     ]
                                                 },
                                                 //{
                                                 //    itemType: "group",
                                                 //    caption: 'Allow MAC Address',
                                                 //    colCount: 1,
                                                 //    items: [
                                                 //              {
                                                 //                  dataField: 'MACAddress',
                                                 //                  label: { text: 'MAC Address' },
                                                 //                  editorOptions: { placeholder: 'MAC Address' },
                                                 //                  colSpan: 1,
                                                 //              },

                                                 //    ]
                                                 //},
                                                 {
                                                     itemType: "group",
                                                     caption: "IP Address Details ",
                                                     colCount: 1,
                                                     colSpan: 2,
                                                     items: [

                                                             {
                                                                 editorType: "dxDataGrid",
                                                                 colSpan: 2,

                                                                 editorOptions: {
                                                                     dataSource: TypeofTax,
                                                                     width: 610,
                                                                     columns: [
                                                                                 { dataField: 'IP Address From', width: 250 },
                                                                                 { dataField: 'IP Address To', width: 250 },
                                                                     ],
                                                                     showColumnLines: true,
                                                                     showRowLines: true,
                                                                     showBorders: true,
                                                                     rowAlternationEnabled: true,
                                                                     editing: {
                                                                         mode: "row",
                                                                         allowUpdating: true,
                                                                         allowDeleting: true,
                                                                         allowAdding: true
                                                                     },
                                                                 },

                                                             },

                                                     ]
                                                 },
                                        ]
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
                    }, ]
                }]

            },

            ]
        };

        $scope.popupOptions = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "All Users",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
                            {
                                visible: "visiblePopup",
                            },
            contentTemplate: 'AllUserscontent'
        };
        $scope.visiblePopup = false;
    }
    $scope.showInfo = function () {
        $scope.visiblePopup = !$scope.visiblePopup;
    };
    $scope.SaveUser = function (oUSer) {
        var user = {
            Code: oUSer.EMail,
            DisplayName: oUSer.DisplayName,
            Description: oUSer.DisplayName,
            IPAddressFilter: "",
            MACAddressFilter: "",
            MACAddress: "",
            Mobileno: oUSer.Mobileno,
            IsActive: true,
            Password: oUSer.Password,
            EMail: oUSer.EMail,
        }
        var uData = new AppCommon.Class.EntityCreateRequest();
        uData.EntityType = AppCommon.EntityType.UserMaster;
        var userProperty = {
            UserMaster: [user]
        };
        uData.Data = userProperty;
        ServiceHelper.CreateEntity(uData,
            function (response) {
                if (response.IsCreatSuccessful) {
                    DevExpress.ui.dialog.alert("User created successfully", 'Alert');
                } else {
                    DevExpress.ui.dialog.alert(response.ErrorMessage, 'Alert');
                }
            },
            function (response) {
                DevExpress.ui.dialog.alert(response, 'Alert');
            });
    }
    $scope.Init = function () {
        $scope.CreateUserAddButton();
        $scope.CreateUserGrid();
        $scope.CreateUserPopup();
        $scope.formOptions = $scope.viewmodelAllUser;
    }
    $scope.GetResource();
});