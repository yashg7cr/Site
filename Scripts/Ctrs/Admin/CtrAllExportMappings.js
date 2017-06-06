exGSP = window.exGSP ||
{};
exGSP.controller('CtrAllExportMappings', function DemoController($scope, $rootScope, $location, ServiceHelper) {
    //#region Declaration
    $rootScope.loadingVisible = true;
    var MappingDetails = [
{
    ID: 1,
    SourceColumn: 'DocType',
    DestinationColumn: 'DocType',
    DestinationDataType: 'String',
    DestinationSize: ''
},
{
    ID: 2,
    SourceColumn: 'DocName',
    DestinationColumn: 'BookID',
    DestinationDataType: 'String',
    DestinationSize: ''
},
{
    ID: 3,
    SourceColumn: 'CompanyID',
    DestinationColumn: 'KUNNR',
    DestinationDataType: 'String',
    DestinationSize: ''
}];
    //#endregion
    //#region Classes
    $scope.Classes = {
        MappingMaster: function (oMapping) {
            return {
                Id: oMapping.Id,
                Code: oMapping.Code,
                Name: oMapping.Name,
                Description: oMapping.Description,
                MappingType: oMapping.MappingType,
                Rank: oMapping.Rank,
                CompanyId: oMapping.CompanyId,
                CompanyGroupId: oMapping.CompanyGroupId,
                ParentMappingId: oMapping.ParentMappingId,
                RelationName: oMapping.RelationName,
                EntitySchemaID: oMapping.EntitySchemaID,
                ProfileID: oMapping.ProfileID,
                ExternalCode: oMapping.ExternalCode,
                LegacyCode: oMapping.LegacyCode,
                SubscriptionId: oMapping.SubscriptionId,
                CreatedBy: oMapping.CreatedBy,
                CreatedDateTime: oMapping.CreatedDateTime,
                ModifiedBy: oMapping.ModifiedBy,
                ModifiedDateTime: oMapping.ModifiedDateTime,
                KeyColumnName: oMapping.KeyColumnName,
                KeyColumnValue: oMapping.KeyColumnValue,
            }
        }
    };
    //#endregion
    //#region DataModel
    $scope.MappingMasterModel = [];
    $scope.MappingMasterDataModal = [];
    //#endregion
    //#region Data Load Service Call
    $scope.GetResource = function () {
        var rData = new AppCommon.Class.EntityQueryRequest();
        rData.EntityType = AppCommon.EntityType.MappingMaster;
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
        $scope.MappingMasterModal(response.Entitities);
        $scope.Init();
        $rootScope.loadingVisible = false;
    }
    $scope.MappingMasterModal = function (dataMapping) {
        $.each(dataMapping, function (i, item) {
            var oData = new $scope.Classes.MappingMaster(item.Data.MappingMaster[0]);
            $scope.MappingMasterModel.push(oData);
        });
    }
    //#endregion
    //#region Grid Designer
    $scope.CreateExportMappingsGrid = function () {
        var store = new DevExpress.data.ArrayStore(
        {
            data: $scope.MappingMasterModel,
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
                dataField: 'EntityType',
                caption: 'Entity Type'
            },
            {
                dataField: 'ParentMapping',
                caption: 'Parent Mapping'
            },
            {
                dataField: 'Profile',
                caption: 'Profile'
            },
            {
                dataField: 'Description',
                caption: 'Discription'
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
    //#region PopUp Designer
    $scope.CreateExportMappingsPopup = function () {
        //popup Additional Authorized Signatory
        $scope.popupFormExportMappings = {
            formData:
            {},
            width: 900,
            height: 500,
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
                        caption: 'Basic Information',
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
                                placeholder: 'EXP-017'
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
                                placeholder: 'RE cash or credit reciept against spares sales order header  '
                            }
                        },
                        {
                            dataField: 'Entity',
                            colSpan: 1,
                            editorType: "dxSelectBox",
                            label:
                            {
                                text: 'Entity Type'
                            },
                            editorOptions:
                            {
                                placeholder: 'Receipt Document'
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
                            dataField: 'ParentMapping',
                            colSpan: 1,
                            editorType: "dxSelectBox",
                            label:
                            {
                                text: 'Parent Mapping'
                            },
                            editorOptions:
                            {
                                placeholder: 'Parent Mapping'
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
                                placeholder: 'RE warranty claim header export',
                            }
                        }, ]
                    }, ]
                }, ],
            },
            {
                itemType: "group",
                caption: "Mapping Details",
                colCount: 1,
                colSpan: 2,
                items: [
                {
                    editorType: "dxDataGrid",
                    colSpan: 2,
                    editorOptions:
                    {
                        dataSource: MappingDetails,
                        columns: [
                        {
                            dataField: 'SourceColumn',
                            caption: 'Source Column',
                        },
                        {
                            dataField: 'DestinationColumn',
                            caption: 'Destination Column',
                        },
                        {
                            dataField: 'DestinationDataType',
                            caption: 'Destination Data Type',
                        },
                        {
                            dataField: 'DestinationSize',
                            caption: 'Destination Size',
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
            title: "Export Mapping",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblePopup",
            },
            contentTemplate: 'ExportMappingsContent'
        };
        $scope.visiblePopup = false;
    }
    //#endregion
    //#region Intialization Function
    $scope.Init = function () {
        $scope.CreateExportMappingsPopup();
        $scope.CreateExportMappingsGrid();
    }
    //#endregion
    //#region Call Data Loading and Other Function
    $scope.GetResource();
    //#endregion
});