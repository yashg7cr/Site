exGSP = window.exGSP || {};
exGSP.controller('CtrSystemAgent', function DemoController($scope, $rootScope, $location, ServiceHelper) {
    //#region Declaration
    $rootScope.loadingVisible = true;
    var AgentParameters = [
{
    ID: 1,
    ParameterName: 'FEEDRAY',
    ParameterValue: '3rd day feedback agent',
    Discription: '3rd day feedback agent not satisfied'
},
{
    ID: 2,
    ParameterName: 'FEEDRAY',
    ParameterValue: '3rd day feedback agent',
    Discription: '3rd day feedback agent not satisfied'
},
{
    ID: 3,
    ParameterName: 'FEEDRAY',
    ParameterValue: '3rd day feedback agent',
    Discription: '3rd day feedback agent not satisfied'
}];
    //#endregion
    //#region Classes
    $scope.Classes = {
        AgentMaster: function (oAgent) {
            return {
                Code: oAgent.Code,
                Name: oAgent.Name,
                Type: oAgent.Type,
                HistoryDays: oAgent.HistoryDays,
                CompanyId: oAgent.CompanyId,
                ExternalCode: oAgent.ExternalCode,
                LegacyCode: oAgent.LegacyCode,
                CreatedBy: oAgent.CreatedBy,
                CreatedDateTime: oAgent.CreatedDateTime,
                ModifiedBy: oAgent.ModifiedBy,
                ModifiedDateTime: oAgent.ModifiedDateTime,
            }
        }
    };
    //#endregion
    //#region DataModel
    $scope.AgentMasterModel = [];
    $scope.AgentMasterDataModal = [];
    //#endregion
    //#region Data Load Service Call
    $scope.GetResource = function () {
        var rData = new AppCommon.Class.EntityQueryRequest();
        rData.EntityType = AppCommon.EntityType.AgentMaster;
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
        $scope.AgentMasterModal(response.Entitities);
        $scope.Init();
        $rootScope.loadingVisible = false;
    }
    $scope.AgentMasterModal = function (dataAgent) {
        $.each(dataAgent, function (i, item) {
            var oData = new $scope.Classes.AgentMaster(item.Data.AgentMaster[0]);
            $scope.AgentMasterModel.push(oData);
        });
    }
    //#endregion
    //#region Grid Designer Code
    $scope.CreateSystemAgentGrid = function () {
        var store = new DevExpress.data.ArrayStore(
        {
            data: $scope.AgentMasterModel,
            key: 'ID'
        });
        $scope.gridConfig = {
            dataSource: store,
            scrolling: {
                mode: "infinite"
            },
            groupPanel:
            {
                visible: true
            },
            height: 550,
            columns: [
            {
                dataField: 'Code',
                caption: 'Code'
            },
            {
                dataField: 'Name',
                caption: 'Name'
            },
            {
                dataField: 'HistoryDays',
                caption: 'History Days'
            },
            {
                dataField: 'Profile',
                caption: 'Profile'
            },
            {
                dataField: 'Description',
                caption: 'Description'
            },
            {
                dataField: 'Company',
                caption: 'Company'
            }, ],
            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            rowAlternationEnabled: true,
            onRowClick: function (info) {
                $scope.visiblePopup = true;
            },
        };
    }
    //#endregion
    //#region Agent Master PopUp Designer Code
    $scope.CreateSystemAgentPopup = function () {
        //popup Additional Authorized Signatory
        $scope.popupFormSystemAgents = {
            formData:
            {},
            width: 900,
            height: 630,
            scrollingEnabled: true,
            colCount: 2,
            colSpan: 2,
            labelLocation: "top",
            items: [
            {
                itemType: "group",
                colSpan: 2,
                colCount: 1,
                items: [
                {
                    itemType: 'group',
                    colCount: 1,
                    items: [
                    {
                        itemType: 'group',
                        caption: 'Basic Item Information',
                        colCount: 2,
                        items: [
                        {
                            dataField: 'DisplayName',
                            colSpan: 1,
                            label:
                            {
                                text: 'Code'
                            },
                            editorOptions:
                            {
                                placeholder: 'FEEDRAY'
                            }
                        },
                        {
                            dataField: 'Name',
                            colSpan: 1,
                            label:
                            {
                                text: 'Name'
                            },
                            editorOptions:
                            {
                                placeholder: '3rd day feedback agent'
                            }
                        },
                        {
                            dataField: 'Type',
                            colSpan: 1,
                            editorType: "dxSelectBox",
                            label:
                            {
                                text: 'Type'
                            },
                            editorOptions:
                            {
                                placeholder: 'Type'
                            }
                        },
                        {
                            dataField: 'Company',
                            colSpan: 1,
                            editorType: "dxSelectBox",
                            label:
                            {
                                text: 'Company'
                            },
                            editorOptions:
                            {
                                placeholder: 'Company'
                            }
                        },
                        {
                            dataField: 'Profile',
                            colSpan: 1,
                            editorType: "dxSelectBox",
                            label:
                            {
                                text: 'Profile'
                            },
                            editorOptions:
                            {
                                placeholder: 'Exe'
                            }
                        },
                        {
                            dataField: 'Discription',
                            colSpan: 1,
                            editorType: "dxTextArea",
                            label:
                            {
                                text: 'Discription'
                            },
                            editorOptions:
                            {
                                placeholder: '3rd day feedback agent not satisfied',
                            }
                        },
                        {
                            dataField: 'Hostory Days',
                            colSpan: 1,
                            label:
                            {
                                text: 'Hostory Days'
                            },
                            editorOptions:
                            {
                                placeholder: '5',
                                width: '100%'
                            }
                        },
                        {
                            itemType: "empty",
                            colSpan: 11
                        },
                        {
                            editorType: "dxButton",
                            editorOptions:
                            {
                                text: "Execute",
                                onClick: function (e) {
                                    console.log("onClick");
                                }
                            }
                        }]
                    }, ]
                }, ],
            },
            {
                itemType: "group",
                caption: "Agent Parameters ",
                colCount: 1,
                colSpan: 2,
                items: [
                {
                    editorType: "dxDataGrid",
                    colSpan: 2,
                    editorOptions:
                    {
                        dataSource: AgentParameters,
                        columns: [
                        {
                            dataField: 'ParameterName',
                            caption: 'Parameter Name',
                        },
                        {
                            dataField: 'ParameterValue',
                            caption: 'Parameter Value',
                        },
                        {
                            dataField: 'Discription',
                            caption: 'Discription',
                        }, ],
                        showColumnLines: true,
                        showRowLines: true,
                        showBorders: true,
                        rowAlternationEnabled: true,
                        editing:
                        {
                            mode: "row",
                            allowUpdating: true,
                            //allowDeleting: true,
                            //allowAdding: true
                        },
                    },
                }, ]
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
                    itemType: "empty",
                    colSpan: 11
                },
                {
                    editorType: "dxButton",
                    editorOptions:
                    {
                        text: "Submit",
                        onClick: function (e) {
                            console.log("onClick");
                            var oData = $scope.UserMasterDataModal;
                            $scope.SaveUser(oData);
                        }
                    }
                }]
            }]
        };
        $scope.popupOptions = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "System Agents",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblePopup",
            },
            contentTemplate: 'SystemAgentsContent'
        };
        $scope.visiblePopup = false;
    }
    //#endregion
    //#region Intialization Function
    $scope.Init = function () {
        $scope.CreateSystemAgentPopup();
        $scope.CreateSystemAgentGrid();
    }
    //#endregion
    //#region Call Data Loading and Other Function
    $scope.GetResource();
    //#endregion
});