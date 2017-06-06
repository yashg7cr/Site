exGSP = window.exGSP || {};
exGSP.controller('CtrAgentMonitors', function DemoController($scope, $rootScope, $location, ServiceHelper) {
    //#region Declaration
    $rootScope.loadingVisible = true;
    //#endregion
    //#region Classes
    $scope.Classes = {
        AgentHistory: function (oAgentHistory) {
            return {
                AgentId: oAgentHistory.AgentId,
                Message: oAgentHistory.Message,
                Error: oAgentHistory.Error,
                MessageType: oAgentHistory.MessageType,
                StartTime: oAgentHistory.StartTime,
                ExternalCode: oAgentHistory.ExternalCode,
                LegacyCode: oAgentHistory.LegacyCode,
                NoOfRecords: oAgentHistory.NoOfRecords,
                BatchId: oAgentHistory.BatchId,
                SubscriptionId: oAgentHistory.SubscriptionId,
                CreatedBy: oAgentHistory.CreatedBy,
                CreatedDateTime: oAgentHistory.CreatedDateTime,
                ModifiedBy: oAgentHistory.ModifiedBy,
                ModifiedDateTime: oAgentHistory.ModifiedDateTime,
            }
        }
    };
    //#endregion
    //#region DataModel
    $scope.AgentHistoryModel = [];
    $scope.AgentHistoryDataModal = [];
    //#endregion
    //#region Data Load Service Call
    $scope.GetResource = function () {
        var rData = new AppCommon.Class.EntityQueryRequest();
        rData.EntityType = AppCommon.EntityType.AgentHistory;
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
        $scope.AgentHistoryModal(response.Entitities);
        $scope.Init();
        $rootScope.loadingVisible = false;
    }
    $scope.AgentHistoryModal = function (dataHistory) {
        $.each(dataHistory, function (i, item) {
            var oData = new $scope.Classes.AgentHistory(item.Data.AgentHistory[0]);
            $scope.AgentHistoryModel.push(oData);
        });
    }
    //#endregion
    //#region Grid Designer
    $scope.CreateAllAgentMonitorsGrid = function () {
        var store = new DevExpress.data.ArrayStore(
        {
            data: $scope.AgentHistoryModel,
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
                dataField: 'Agent',
                caption: 'Agent'
            },
            {
                dataField: 'Message',
                caption: 'Message'
            },
            {
                dataField: 'Error',
                caption: 'Error'
            },
            {
                dataField: 'StartTime',
                caption: 'Start Date Time'
            }, ],
            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            rowAlternationEnabled: true,
        };
    }
    //#endregion
    //#region Intialization Function
    $scope.Init = function () {
        $scope.CreateAllAgentMonitorsGrid();
    }
    //#endregion
    //#region Call Data Loading and Other Function
    $scope.GetResource();
    //#endregion
});