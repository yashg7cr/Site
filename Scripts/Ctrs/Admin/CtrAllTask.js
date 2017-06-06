exGSP = window.exGSP || {};

exGSP.controller('CtrAllTask', function DemoController($scope, $location) {

    var AllTaskModelData = [{
        ID: 1,
        Code: "UPINV",
        Name: "Upload Invoice",
        Profile: "GST",
        WinType: "External",
        Description: "GST",
    }, {
        ID: 2,
        Code: "UPINV",
        Name: "Upload Invoice",
        Profile: "GST",
        WinType: "External",
        Description: "GST",
    },
    {
        ID: 3,
        Code: "UPINV",
        Name: "Upload Invoice",
        Profile: "GST",
        WinType: "External",
        Description: "GST",
    }, ];


    // var EntityModel = [{
    //     ID: 1,
    //     "EntityID": "1",
    //     "Entity View": "Upload Invoice",
    //     "PermissionType": "GST",
    //     "Hide": false,

    // }, {
    //     ID: 2,
    //     "EntityID": "1",
    //     "Entity View": "Upload Invoice",
    //     "PermissionType": "GST",
    //     "Hide": false,
    // },
    //];

    var TypeofEntity = [{
        "ID": 1,
        "Entity": "Purchase"
    }, {
        "ID": 2,
        "Entity": "Sale"
    }];
    var ProfileModel = [
    'GST', 'IGST', 'SGST'
    ];
    var WintypeModel = [
    'Tablet', 'Desktop', 'Mobile'
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

    var store = new DevExpress.data.ArrayStore({
        data: AllTaskModelData,
        key: 'ID'
    });

    var viewmodelAllTask = {
        formData: {},
        colCount: 1,
        labelLocation: "top",
        items: [
             {
                 itemType: "group",
                // caption: "All Tasks",
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

    $scope.gridInstance = null;
    $scope.gridConfig = {
        dataSource: store,
        columns: [
                        { dataField: 'Code' },
                        { dataField: 'Name' },
                        { dataField: 'Profile' },
                        { dataField: 'WinType' },
                        { dataField: 'Description' },
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
    };

    //popup Role
    $scope.popupFormRole = {
        formData: {},
        width: 'auto',
        height: 'auto',
        scrollingEnabled: true,
        colCount: 1,
        labelLocation: "top",
        items: [

        {
            itemType: 'group',
            caption: "Basic Information",
            colCount: 3,
            items: [

                {
                    dataField: 'Code',
                    colSpan: 4,
                    placeholder: 'Code',
                    label: { text: 'Code' },
                    editorOptions: { placeholder: 'Code' }
                },
                {
                    dataField: 'Name',
                    colSpan: 4,
                    placeholder: 'Name',
                    label: { text: 'Name' },
                    editorOptions: { placeholder: 'Name' }

                },


                {
                    dataField: 'Description',
                    colSpan: 4,
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
                    colSpan: 4,
                    placeholder: 'Profile',
                    label: { text: 'Profile' },

                },
                {
                    dataField: 'WinType',
                    editorType: "dxSelectBox",
                    editorOptions: {
                        items: WintypeModel,
                        value: ""
                    },
                    colSpan: 4,
                    placeholder: 'WinType',
                    label: { text: 'Win Type' },

                },
            ]
        },

        {
            itemType: "group",
            caption: "Permission",
            colCount: 1,
            items: [
                         {
                             editorType: "dxDataGrid",
                             colspan: 2,
                             editorOptions: {
                                 dataSource: {},
                                 columns: [

                                             {
                                                 dataField: "EntityID",
                                                 caption: "Entity",
                                                 width: 100,
                                                 lookup: {
                                                     dataSource: TypeofEntity,
                                                     displayExpr: "Entity",
                                                     valueExpr: "ID"
                                                 },
                                             },
                                             { dataField: 'Entity View'},
                                             { dataField: 'PermissionType', width: 150 },
                                             { dataField: 'Hide', dataType: "boolean",width:50 },

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
        title: "Task Details",
        dragEnabled: true,
        closeOnOutsideClick: false,
        bindingOptions:
                        {
                            visible: "visiblePopup",
                        },
        contentTemplate: 'Rolecontent'
    };

    $scope.visiblePopup = false;

    $scope.showInfo = function () {
        $scope.visiblePopup = !$scope.visiblePopup;
    };

    //popup end

    $scope.formOptions = viewmodelAllTask;
});

