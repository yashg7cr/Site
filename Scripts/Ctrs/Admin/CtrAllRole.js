exGSP = window.exGSP || {};

exGSP.controller('CtrAllRole', function DemoController($scope, $rootScope, $location, ServiceHelper) {
    $rootScope.loadingVisible = true;
    $scope.Classes = {
        RoleMaster: function (oRole) {
            return {
                HeaderID: oRole.Id,
                CreatedDateTime: oRole.CreatedDateTime,
                Description: oRole.Description,
                ProfileId: oRole.ProfileId,
                DisplayName: oRole.DisplayName,
                Code: oRole.Code
            }
        }
    };
    $scope.RoleMasterModel = [];
    $scope.GetResource = function () {
        var rData = new AppCommon.Class.EntityQueryRequest();
        rData.EntityType = AppCommon.EntityType.RoleMaster;
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
        $scope.RoleMaterModal(response.Entitities);
        $scope.Init();
        $rootScope.loadingVisible = false;
    }
    $scope.RoleMaterModal = function (dataRoles) {
        $.each(dataRoles, function (i, item) {
            var oData = new $scope.Classes.RoleMaster(item.Data.RoleMaster[0]);
            $scope.RoleMasterModel.push(oData);
        });
    }
    var TypeofEntity = [{
        "ID": 1,
        "Entity": "Purchase"
    }, {
        "ID": 2,
        "Entity": "Sale"
    }];

    var PermissionModel = [{
        "ID": 1,
        "Permission": "All"
    }, {
        "ID": 2,
        "Permission": "Edit"
    },
    {
        "ID": 3,
        "Permission": "View"
    },
    {
        "ID": 4,
        "Permission": "Add"
    }

    ];



    var TaskModelData = [{

        "SrNo": "1",
        "Task Name": "Upload Invoice",
        "Select": true,

    }, {

        "SrNo": "2",
        "Task Name": "Upload Invoice",
        "Select": true,
    },
   {

       "SrNo": "3",
       "Task Name": "Upload Invoice",
       "Select": true,
   }, ];

    var ProfileModel = [
    'GST', 'IGST', 'SGST'
    ];
    var ModuleModel = [
    'Invoice', 'Tax', 'Purchase'
    ];
    var RoleGroupModel = [
    'Admin', 'User', 'Super User'
    ];

    $scope.CreateAddRollButton = function () {
        $scope.viewmodelAllRole = {
            formData: {},
            colCount: 1,
            labelLocation: "top",
            items: [
                 {
                     itemType: "group",
                    // caption: "All Roles",
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

                 }
            ]
        };
    }

    $scope.CreateRolesGrid = function () {
        //grid configuration start
        $scope.gridInstance = null;
        $scope.gridConfig = {
            dataSource: $scope.RoleMasterModel,
            paging: {
                pageSize: 10
            },
            pager: {
                showNavigationButtons: true
            },
            sorting:
            {
                mode: 'single'
            },
            width: 'auto',
            columns: [
                            { dataField: 'Code' },
                            { dataField: 'DisplayName' },
                            { dataField: 'Description' },
                            //{ dataField: 'ProfileId' },
                            { dataField: 'CreatedDateTime', caption: 'Created Date', dataType: 'date', format: AppSetting.AppConstant.Dateformat },
                            { dataField: 'CreatedDateTime', caption: 'Created Time', dataType: 'date', format: AppSetting.AppConstant.Timeformat },
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
                //$scope.currentRow = {
                //    key: $scope.gridInstance.getKeyByRowIndex(rowIndex),
                //    data: data,
                //};
                $scope.visiblePopup = true;
            },
            onInitialized: function (e) {
                $scope.gridInstance = e.component;
            }
        };
    }

    //grid configuration end
    $scope.CreateRolePopup = function () {
        $scope.popupFormRole = {
            formData: {},
            width: 'auto',
            height: 'auto',
            scrollingEnabled: true,
            colCount: 2,
            labelLocation: "top",
            items: [

            {
                itemType: 'group',
                caption: "Basic Information",
                colCount: 2,
                items: [

                    {
                        dataField: 'Code',
                        colSpan: 1,
                        placeholder: 'Code',
                        label: { text: 'Code' },
                        editorOptions: { placeholder: 'Code' }
                    },
                    {
                        dataField: 'Name',
                        colSpan: 1,
                        placeholder: 'Name',
                        label: { text: 'Name' },
                        editorOptions: { placeholder: 'Name' }

                    },


                    {
                        dataField: 'Description',
                        colSpan: 1,
                        placeholder: 'Description',
                        label: { text: 'Description' },
                        editorOptions: { placeholder: 'Description', }
                    },
                    {
                        dataField: 'Profile',
                        editorType: "dxSelectBox",
                        editorOptions: {
                            items: ProfileModel,
                            value: ""
                        },
                        colSpan: 1,
                        placeholder: 'Profile',
                        label: { text: 'Profile' },

                    },
                ]
            },

            {
                itemType: "group",
                caption: "User Role Information",
                colCount: 2,
                items: [
                          {
                              dataField: 'Module',
                              editorType: "dxSelectBox",
                              editorOptions: {
                                  items: ModuleModel,
                                  value: ""
                              },
                              colSpan: 1,
                              placeholder: 'Module',
                              label: { text: 'Module' },

                          },
                           {
                               dataField: 'RoleGroup',
                               editorType: "dxSelectBox",
                               editorOptions: {
                                   items: RoleGroupModel,
                                   value: ""
                               },
                               colSpan: 1,
                               placeholder: 'RoleGroup',
                               label: { text: 'Role Group' },

                           },
                            //{
                            //    dataField: 'PermissionType',
                            //    editorType: "dxSelectBox",
                            //    editorOptions: {
                            //        items: PermissionModel,
                            //        value: ""
                            //    },
                            //    colSpan: 1,
                            //    placeholder: 'PermissionType',
                            //    label: { text: 'Permission Type' },

                            //},
                ]
            },
             {
                 itemType: "empty",
                 colCount: 12,
                 colSpan: 2,
             },
        {
            itemType: "group",
            colCount: 2,
            colSpan: 2,
            items: [
                //{
                //    editorType: "dxDataGrid",
                //    colspan: 2,
                //    colCount: 1,
                //    editorOptions: {
                //        dataSource: TaskModelData,
                //        columns: [
                //                    { dataField: 'SrNo' },
                //                    { dataField: 'Task Name' },
                //                    { dataField: 'Select', dataType: "boolean" },

                //        ],
                //        showColumnLines: true,
                //        showRowLines: true,
                //        showBorders: true,
                //        rowAlternationEnabled: true,
                //    },

                //},

                {
                    itemType: "group",
                    caption: "Applicable Task",
                    colCount: 1,
                    colSpan: 2,
                    items: [
                          {
                              editorType: "dxDataGrid",
                              //colCount: 1,
                              colspan: 1,
                              editorOptions: {
                                  dataSource: TaskModelData,
                                  columns: [
                                              { dataField: 'SrNo', width: 50 },
                                              {
                                                  dataField: "EntityID",
                                                  caption: "Entity",

                                                  lookup: {
                                                      dataSource: TypeofEntity,
                                                      displayExpr: "Entity",
                                                      valueExpr: "ID"
                                                  },
                                              },
                                              {
                                                  dataField: "EntityID",
                                                  caption: "Entity Views",

                                                  lookup: {
                                                      dataSource: TypeofEntity,
                                                      displayExpr: "Entity",
                                                      valueExpr: "ID"
                                                  },
                                              },
                                              {
                                                  dataField: 'PermissionType',
                                                  dataField: "PermissionID",
                                                  caption: "Permission Type",

                                                  lookup: {
                                                      dataSource: PermissionModel,
                                                      displayExpr: "Permission",
                                                      valueExpr: "ID"
                                                  },
                                              },


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


                          }
                    ]

                }


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
            width: 800,
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "Roles",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
                            {
                                visible: "visiblePopup",
                            },
            contentTemplate: 'Rolecontent'
        };

        $scope.visiblePopup = false;
    }
    //popup Role
    $scope.showInfo = function () {
        $scope.visiblePopup = !$scope.visiblePopup;
    };
    $scope.Init = function () {
        $scope.CreateAddRollButton();
        $scope.CreateRolesGrid();
        $scope.CreateRolePopup();
        $scope.formOptions = $scope.viewmodelAllRole;
    }
    $scope.GetResource();
});

