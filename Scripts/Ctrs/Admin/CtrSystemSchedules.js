exGSP = window.exGSP ||
{};
exGSP.controller('CtrSystemSchedules', function DemoController($scope, $rootScope, $location, ServiceHelper) {
    //#region Declaration
    $rootScope.loadingVisible = true;
    //#endregion
    //#region Classes
    $scope.Classes = {
        SystemScheduleMaster: function (oSystemSchedule) {
            return {
                Code: oSystemSchedule.Code,
                Name: oSystemSchedule.Name,
                Description: oSystemSchedule.Description,
                Type: oSystemSchedule.Type,
                AgentID: oSystemSchedule.AgentID,
                StartDate: oSystemSchedule.StartDate,
                EndDate: oSystemSchedule.EndDate,
                Status: oSystemSchedule.Status,
                DayNumber: oSystemSchedule.DayNumber,
                Duration: oSystemSchedule.Duration,
                Month: oSystemSchedule.Month,
                OccuranceCount: oSystemSchedule.OccuranceCount,
                ExecutedOccuranceCount: oSystemSchedule.ExecutedOccuranceCount,
                Periodicity: oSystemSchedule.Periodicity,
                RecurrenceStartTime: oSystemSchedule.RecurrenceStartTime,
                RecurrenceEndTime: oSystemSchedule.RecurrenceEndTime,
                RecurrenceRange: oSystemSchedule.RecurrenceRange,
                RecurrenceType: oSystemSchedule.RecurrenceType,
                WeekDay: oSystemSchedule.WeekDay,
                WeekOfMonth: oSystemSchedule.WeekOfMonth,
                Enabled: oSystemSchedule.Enabled,
                ExecutingServer: oSystemSchedule.ExecutingServer,
                LastExecutedTime: oSystemSchedule.LastExecutedTime,
                ExternalCode: oSystemSchedule.ExternalCode,
                LegacyCode: oSystemSchedule.LegacyCode,
                SubscriptionId: oSystemSchedule.SubscriptionId,
                CreatedBy: oSystemSchedule.CreatedBy,
                CreatedDateTime: oSystemSchedule.CreatedDateTime,
                ModifiedBy: oSystemSchedule.ModifiedBy,
                ModifiedDateTime: oSystemSchedule.ModifiedDateTime,
            }
        }
    };
    //#endregion
    //#region DataModel
    $scope.SystemScheduleMasterModel = [];
    $scope.SystemScheduleMasterDataModal = [];
    //#endregion
    //#region Data Load Service Call
    $scope.GetResource = function () {
        var rData = new AppCommon.Class.EntityQueryRequest();
        rData.EntityType = AppCommon.EntityType.SystemSchedule;
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
        $scope.SystemScheduleMasterModal(response.Entitities);
        $scope.Init();
        $rootScope.loadingVisible = false;
    }
    $scope.SystemScheduleMasterModal = function (dataSchedule) {
        $.each(dataSchedule, function (i, item) {
            var oData = new $scope.Classes.SystemScheduleMaster(item.Data.SystemSchedule[0]);
            $scope.SystemScheduleMasterModel.push(oData);
        });
    }
    //#endregion
    //#region Grid Designer Code
    $scope.CreateSystemScheduleGrid = function () {
        var store = new DevExpress.data.ArrayStore(
        {
            data: $scope.SystemScheduleMasterModel,
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
                dataField: 'Type',
                caption: 'Type'
            },
            {
                dataField: 'Agent',
                caption: 'Agent'
            },
            {
                dataField: 'Server',
                caption: 'Server'
            },
            {
                dataField: 'StartDate',
                caption: 'Start Date',
                dataType: 'date',
                format: AppSetting.AppConstant.Dateformat
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
    //#region System Schedule PopUp Designer Code
    $scope.CreateSystemSchedulePopup = function () {
        //popup Additional Authorized Signatory
        $scope.popupFormSystemSchedule = {
            formData:
            {},
            width: 950,
            height: 670,
            scrollingEnabled: true,
            colCount: 2,
            colSpan: 2,
            labelLocation: "top",
            items: [
            {
                itemType: "group",
                colSpan: 2,
                items: [
                {
                    itemType: "tabbed",
                    tabPanelOptions:
                    {
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
                                            placeholder: 'Code'
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
                                            placeholder: 'Name'
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
                                            placeholder: 'Discription',
                                        }
                                    },
                                    {
                                        dataField: 'StartDate',
                                        colSpan: 1,
                                        editorType: "dxDateBox",
                                        label:
                                        {
                                            text: 'Start Date'
                                        },
                                        editorOptions:
                                        {
                                            placeholder: 'Start Date',
                                            width: '100%'
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
                                        dataField: 'Agent',
                                        colSpan: 1,
                                        editorType: "dxSelectBox",
                                        label:
                                        {
                                            text: 'Agent'
                                        },
                                        editorOptions:
                                        {
                                            placeholder: 'Agent'
                                        }
                                    },
                                    {
                                        dataField: 'Server',
                                        colSpan: 1,
                                        label:
                                        {
                                            text: 'Server'
                                        },
                                        editorOptions:
                                        {
                                            placeholder: 'Server'
                                        }
                                    }, ]
                                }, ]
                            }, ],
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
                    },
                    {
                        title: "Recurrence Pattern",
                        items: [
                        {
                            itemType: "group",
                            colCount: 1,
                            items: [
                            {
                                itemType: "group",
                                colCount: 2,
                                items: [
                                {
                                    itemType: "group",
                                    caption: 'Recurrence Pattern',
                                    colCount: 2,
                                    items: [
                                    {
                                        colSpan: 1,
                                        editorType: "dxCheckBox",
                                        editorOptions:
                                        {
                                            text: "Per Second"
                                        }
                                    },
                                    {
                                        colSpan: 1,
                                        editorType: "dxCheckBox",
                                        editorOptions:
                                        {
                                            text: "Minutely"
                                        }
                                    },
                                    {
                                        colSpan: 1,
                                        editorType: "dxNumberBox",
                                        label:
                                        {
                                            text: 'Every mecond(s)'
                                        },
                                        editorOptions:
                                        {
                                            placeholder: 'Every mecond',
                                            width: '100%'
                                        }
                                    },
                                    {
                                        colSpan: 1,
                                        editorType: "dxNumberBox",
                                        label:
                                        {
                                            text: 'Every minute(s)'
                                        },
                                        editorOptions:
                                        {
                                            placeholder: 'Every minute',
                                            width: '100%'
                                        }
                                    },
                                    {
                                        itemType: "empty",
                                        colSpan: 2,
                                    },
                                    {
                                        colSpan: 1,
                                        editorType: "dxCheckBox",
                                        editorOptions:
                                        {
                                            text: "Hourly"
                                        }
                                    },
                                    {
                                        colSpan: 1,
                                        editorType: "dxCheckBox",
                                        editorOptions:
                                        {
                                            text: "Daily"
                                        }
                                    },
                                    {
                                        colSpan: 1,
                                        editorType: "dxNumberBox",
                                        label:
                                        {
                                            text: 'Every hour(s)'
                                        },
                                        editorOptions:
                                        {
                                            placeholder: 'Every hour',
                                            width: '100%'
                                        }
                                    },
                                    {
                                        colSpan: 1,
                                        editorType: "dxNumberBox",
                                        label:
                                        {
                                            text: 'Every day(s)'
                                        },
                                        editorOptions:
                                        {
                                            placeholder: 'Every Minute',
                                            width: '100%'
                                        }
                                    },
                                    {
                                        itemType: "empty",
                                        colSpan: 1,
                                    },
                                    {
                                        colSpan: 1,
                                        editorType: "dxCheckBox",
                                        editorOptions:
                                        {
                                            text: 'Every Week Days',
                                            width: '100%'
                                        }
                                    },
                                    {
                                        itemType: "empty",
                                        colSpan: 2,
                                    }, ]
                                },
                                {
                                    itemType: "group",
                                    colCount: 2,
                                    colSpan: 2,
                                    items: [
                                    {
                                        itemType: "group",
                                        caption: "Recurrence Time ",
                                        colCount: 2,
                                        colSpan: 2,
                                        items: [
                                        {
                                            dataField: 'StartTime',
                                            editorType: "dxDateBox",
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'Start Time'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'Start Time',
                                                width: '100%',
                                                format: AppSetting.AppConstant.Timeformat
                                            }
                                        },
                                        {
                                            dataField: 'EndTime',
                                            editorType: "dxDateBox",
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'End Time'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'End Time',
                                                width: '100%',
                                                format: AppSetting.AppConstant.Timeformat
                                            }
                                        }, ]
                                    },
                                    {
                                        itemType: "group",
                                        caption: "Range of Recurrence ",
                                        colCount: 2,
                                        colSpan: 2,
                                        items: [
                                        {
                                            itemType: "group",
                                            colCount: 2,
                                            colSpan: 2,
                                            items: [
                                            {
                                                dataField: 'End Reccurance by',
                                                editorType: "dxCheckBox",
                                                colSpan: 2,
                                                editorOptions:
                                                {
                                                    text: 'No end date',
                                                    width: '100%',
                                                }
                                            },
                                            {
                                                dataField: '',
                                                editorType: "dxCheckBox",
                                                colSpan: 1,
                                                editorOptions:
                                                {
                                                    text: 'End after',
                                                    width: '100%',
                                                }
                                            },
                                            {
                                                dataField: '',
                                                editorType: "dxDateBox",
                                                colSpan: 1,
                                                editorOptions:
                                                {
                                                    placeholder: 'Occurances',
                                                    width: '100%',
                                                    format: AppSetting.AppConstant.Dateformat
                                                }
                                            },
                                            {
                                                dataField: '',
                                                editorType: "dxCheckBox",
                                                colSpan: 1,
                                                editorOptions:
                                                {
                                                    text: 'End by',
                                                    width: '100%',
                                                }
                                            },
                                            {
                                                editorType: "dxSelectBox",
                                                colSpan: 1,
                                                editorOptions:
                                                {
                                                    placeholder: 'End by',
                                                    width: '100%',
                                                }
                                            }, ]
                                        }, ]
                                    }, ]
                                },
                                {
                                    itemType: "group",
                                    caption: '',
                                    colSpan: 2,
                                    colCount: 4,
                                    items: [
                                    {
                                        colSpan: 1,
                                        editorType: "dxCheckBox",
                                        editorOptions:
                                        {
                                            text: 'Week',
                                            width: '100%'
                                        }
                                    },
                                    {
                                        itemType: "empty",
                                        colSpan: 1,
                                    },
                                    {
                                        itemType: "empty",
                                        colSpan: 1,
                                    },
                                    {
                                        itemType: "empty",
                                        colSpan: 1,
                                    },
                                    {
                                        colSpan: 1,
                                        editorType: "dxNumberBox",
                                        label:
                                        {
                                            text: 'Every Week(s) on'
                                        },
                                        editorOptions:
                                        {
                                            text: 'Every Week(s) on',
                                        }
                                    },
                                    {
                                        itemType: "empty",
                                        colSpan: 1,
                                    },
                                    {
                                        itemType: "empty",
                                        colSpan: 1,
                                    },
                                    {
                                        itemType: "empty",
                                        colSpan: 1,
                                    },
                                    {
                                        colSpan: 1,
                                        editorType: "dxCheckBox",
                                        editorOptions:
                                        {
                                            text: 'Monday',
                                            width: '100%'
                                        }
                                    },
                                    {
                                        colSpan: 1,
                                        editorType: "dxCheckBox",
                                        editorOptions:
                                        {
                                            text: 'Tuesday',
                                            width: '100%'
                                        }
                                    },
                                    {
                                        colSpan: 1,
                                        editorType: "dxCheckBox",
                                        editorOptions:
                                        {
                                            text: 'Wednesday',
                                            width: '100%'
                                        }
                                    },
                                    {
                                        itemType: "empty",
                                        colSpan: 1,
                                    },
                                    {
                                        colSpan: 1,
                                        editorType: "dxCheckBox",
                                        editorOptions:
                                        {
                                            text: 'Thursday',
                                            width: '100%'
                                        }
                                    },
                                    {
                                        colSpan: 1,
                                        editorType: "dxCheckBox",
                                        editorOptions:
                                        {
                                            text: 'Friday',
                                            width: '100%'
                                        }
                                    },
                                    {
                                        colSpan: 1,
                                        editorType: "dxCheckBox",
                                        editorOptions:
                                        {
                                            text: 'Saturday',
                                            width: '100%'
                                        }
                                    },
                                    {
                                        itemType: "empty",
                                        colSpan: 4,
                                    },
                                    {
                                        itemType: "empty",
                                        colSpan: 4,
                                    },
                                    {
                                        colSpan: 2,
                                        editorType: "dxCheckBox",
                                        editorOptions:
                                        {
                                            text: 'Monthly',
                                            width: '100%'
                                        }
                                    },
                                    {
                                        colSpan: 2,
                                        editorType: "dxCheckBox",
                                        editorOptions:
                                        {
                                            text: 'Yearly',
                                            width: '100%'
                                        }
                                    },
                                    {
                                        itemType: "empty",
                                        colSpan: 4,
                                    },
                                    {
                                        itemType: "group",
                                        colSpan: 2,
                                        items: [
                                        {
                                            colSpan: 4,
                                            template: "PatternTemplate",
                                        }, ]
                                    },
                                    {
                                        itemType: "group",
                                        colSpan: 2,
                                        items: [
                                        {
                                            colSpan: 4,
                                            template: "PatternTemplateYear",
                                        }, ]
                                    }, ]
                                }, ]
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
                                        $scope.showInfo();
                                    }
                                }
                            }]
                        }]
                    }, ]
                }]
            }, ]
        };
        $scope.popupOptions = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "System Schedules",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblePopup",
            },
            contentTemplate: 'SystemScheduleContent'
        };
        $scope.visiblePopup = false;
    }
    //#endregion
    //#region Intialization Function
    $scope.Init = function () {
        $scope.CreateSystemSchedulePopup();
        $scope.CreateSystemScheduleGrid();
    }
    //#endregion
    //#region Call Data Loading and Other Function
    $scope.GetResource();
    //#endregion
});