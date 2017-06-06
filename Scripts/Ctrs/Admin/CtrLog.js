exGSP = window.exGSP || {};

exGSP.controller('CtrLog', function DemoController($scope,$rootScope, $location, $window, ServiceHelper) {
    $rootScope.loadingVisible = true;
    $scope.Classes = {
        LogMaster: function (oLog) {
            return {
                HeaderID: oLog.Id,
                Action: oLog.Action,
                TimeStamp: oLog.TimeStamp,
                LogTime: oLog.TimeStamp.substring(11, 19),
                //Status: oLog.Status,
                Status: AppCommon.GetLogStatus[oLog.Status],
                RequestData: oLog.RequestData,
                ResponseData:oLog.ResponseData,
                SubscriptionId:oLog.SubscriptionId
            }
        }
    };

    $scope.LogModel = [];

    $scope.GetResource = function () {
        var rData = new AppCommon.Class.EntityQueryRequest();
        rData.EntityType = AppCommon.EntityType.GST_LOG;
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

    $scope.LogMaterModal = function (dataLog) {
        $.each(dataLog, function (i, item) {
            var oData = new $scope.Classes.LogMaster(item.Data.InterfaceRequestLog[0]);
            $scope.LogModel.push(oData);
        });
    }

    $scope.SuccessDataCall = function (response) {
        $scope.LogMaterModal(response.Entitities);
        $scope.Init();
        $rootScope.loadingVisible = false;
    }
    
    $scope.CreateLogGrid = function () {
       
        $scope.viewmodelLog = {
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
                                    editorType: "dxDataGrid",
                                    colSpan: 12,
                                    editorOptions:
                                    {
                                        dataSource: $scope.LogModel,//LogDataModel,//$scope.LogModel,
                                        paging: {
                                            pageSize: AppSetting.AppConstant.PageSize,

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
                                            {
                                                dataField: 'Action',
                                                
                                              
                                            },
                                            {
                                                caption: 'Date',
                                                dataField: 'TimeStamp',
                                                dataType: 'date', format: AppSetting.AppConstant.Dateformat,
                                                sortOrder: "desc"
                                                
                                            },
                                            {
                                                caption:'Time',
                                                dataField: 'LogTime',
                                                //dataType: 'date',
                                                //format: AppSetting.AppConstant.Timeformat,
                                                sortOrder: "desc"

                                            },
                                            {
                                                dataField: 'Status',
                                                
                                               
                                            },
                                             {
                                                 dataField: 'SubscriptionId',
                                                

                                             },
                                            {
                                                width: 100,
                                                caption: "Details",
                                                alignment: 'center',
                                                //dataField: 'Status',
                                                cellTemplate: function (container, options) {
                                                    $('<a/>').addClass('btn btn-info')
                                                        .text('Details')
                                                        .on('dxclick', function () {
                                                            $scope.visiblePopupLog = true;
                                                            $scope.LogData = options.data.RequestData;
                                                            $scope.ResponseData = options.data.ResponseData;
                                                           
                                                        })
                                                        .appendTo(container);
                                                }
                                            },
                                        ],
                                        columnAutoWidth: true,
                                        wordWrapEnabled: true,
                                        showColumnLines: false,
                                        showRowLines: true,
                                        showBorders: true,
                                        rowAlternationEnabled: true,
                                        onInitialized: function (e) {
                                            $scope.gridInstance = e.component;
                                        }
                                       
                                    },

                                },
                     ]

                 }
            ]
        };
    }

    $scope.CreateLogPopup = function () {
        $scope.popupFormLogDetails = {
            formData: {},
            width: 'auto',
            height:'auto',
            scrollingEnabled: true,
            colCount: 1,
            labelLocation: "top",
            items: [

            {
                itemType: 'group',
                //caption: "Log Information",
                colCount: 1,
                items: [

                    {
                        label: { text: 'Request Details' },
                        template: 'LogDetails'
                    },
                    {
                        label: { text: 'Response Details' },
                        template: 'ResponseDetails'
                    },
                    $scope.editableTextArea = {
                            height: 180,
                            bindingOptions: {
                            value: "LogData",
                                    }
                    },

                    $scope.ResponseTextArea = {
                        height: 180,
        bindingOptions: {
            value: "ResponseData",
            }
    }
                    //{
                    //    dataField: 'LogDetails',                     
                    //    editorType: "dxTextArea",
                    //    editorOptions:
                    //   {
                    //       height: 300,
                    //       value: $scope.RequestData,
                    //   },                                       
                    //},
                   
                ]
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
                                         text: "Cancel",
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

        $scope.popupLogOptions = {
            width: 800,
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "Log Details",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
                            {
                                visible: "visiblePopupLog",
                            },
            contentTemplate: 'Logcontent'
        };

        $scope.visiblePopupLog = false;
    }

    $scope.showInfo = function () {
        $scope.visiblePopupLog = !$scope.visiblePopupLog;
    };

    $scope.Init = function () {
        $scope.CreateLogGrid();
        $scope.CreateLogPopup();
        $scope.formOptions = $scope.viewmodelLog;
       
    };

    $scope.GetResource();
});



