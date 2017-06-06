exGSP = window.exGSP || {};

exGSP.controller('CtrDashboard', function DemoController($scope, $location, $rootScope) {
    $rootScope.$emit("CallStatusMethod", { show: false });
    
    $scope.CreateSubscriptionPopup = function () {
        var scription = AppCommon.Common.GetStorage('IsSubscriptions');
        if (scription.length>0) return true;
        $scope.SummaryDetailsModel = angular.fromJson(AppCommon.Common.GetStorage('Subscriptions'));
        $scope.popupFormSubscription = {
            formData:
            {},
            colCount: 4,
            colSpan: 4,
            labelLocation: "top",
            items: [
                {
                    editorType: "dxDataGrid",
                    colSpan: 4,
                    editorOptions:
                    {
                        height:300,
                        dataSource: $scope.SummaryDetailsModel,
                        searchPanel: {
                            visible: true,
                            width: 240,
                            placeholder: "Search..."
                        },
                        selection: {
                            mode: "single"
                        },
                        hoverStateEnabled: true,
                        columns: [
                            { dataField: 'DisplayName', caption: 'Subscription' },
                            { dataField: 'StartDate', caption: 'Start Date', dataType: 'date', format: AppSetting.AppConstant.Dateformat},
                            { dataField: 'ValidTillDate', caption: 'Valid Till Date', dataType: 'date', format: AppSetting.AppConstant.Dateformat },                         
                            //{
                            //    caption: "Select", width: 'auto',
                            //    cellTemplate: function (container, options) {
                            //        $('<a/>').addClass('dx-link')
                            //            .text("Select")
                            //            .on('dxclick', function () {
                            //                $scope.showInfo();
                            //            })
                            //            .appendTo(container);
                            //    }
                            //},
                        ],
                        onRowClick: function (info) {
                            AppCommon.Common.SetStorage("SubscriptionId", info.data.SubscriptionId);//
                            $rootScope.CurrentUserName = info.data.DisplayName;
                            $rootScope.CurrentSubscriptionId = info.data.SubscriptionId;
                            $scope.showInfo();
                        },
                        wordWrapEnabled: true,
                        showColumnLines: false,
                        showRowLines: true,
                        showBorders: true,
                       // rowAlternationEnabled: true,
                        
                        
                    },


                }]
        };

        $scope.popupSubscription = {
            width: '700',
            height: '400',
            showTitle: true,
            title: "Please select your subscription",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblePopup",
            },
            contentTemplate: 'SelectSubscription'
        };

        $scope.visiblePopup = true;

        $scope.showInfo = function () {
            $scope.visiblePopup = !$scope.visiblePopup;
            AppCommon.Common.SetStorage("IsSubscriptions", "Set");
        };
    }
    $scope.CreateSubscriptionPopup();
    var langDataSource = [{
        language: "ITC Claimed",
        percent: 20
    }, {
        language: "Matched",
        percent: 60
    }, {
        language: "Mismatched",
        percent: 20
    }];

    //var dataSource = [
    //    { Type: "Matched", TypeValue: 3 },
    //    { Type: "Mismatched", TypeValue: 2 },
    //    { Type: "ITC Claimed", TypeValue: 3 },
    //];

    var dataSource = [
    { type: 'Matched', MatchedValue: 100000},
    { type: 'Unmatched', MismatchedValue: 50000 },
    { type: 'Output Tax Liability declared', ClaimedValue: 120000 },
    ];

    
   var dataSourceSpline = [{
        month: 1997,
        smp: '89%',
    
    }, {
        month: 1998,
        smp: '85%',
   
    }, {
        month: 1999,
        smp: '92%',
    
    }, {
        month: 2000,
        smp: '85%',
    
    }, {
        month: 2001,
        smp:'91%',
    
    }, {
        month: 2002,
        smp: '100%',
   
    }];

    var types = ["spline", "stackedSpline", "fullStackedSpline"];







    var GauagedataSource = [
  { type: 'Matched', MatchedValue: 100000 },
  { type: 'Unmatched', MismatchedValue: 50000 },
 
    ];


    var viewmodelAllUser = {
        formData: {},
        colCount: 1,
        labelLocation: "top",
        items: [
            {
                template: 'Properiter'
            },
            //{

            //    itemType: 'tabbed',
            //    tabs: [
            //        {
            //            title: 'Tab1',
            //            colCount: 2,
            //            items: [
            //                'Position',
            //                'BirthDate',
            //                'HireDate',
            //                'City'
            //            ]
            //        },
            //        {
            //            title: 'Tab2',
            //            items: [
            //                'Phone',
            //                'Email'
            //            ]
            //        },
            //        {
            //            title: 'Tab3',
            //            items: [
            //                'Phone',
            //                'Email'
            //            ]
            //        }
            //    ]
            //}
        ]
    }
    $scope.chartPieOptions = {
        palette: "bright",
        dataSource: langDataSource,
       // title: "Top internet Sales",
        height: 300,
        legend: {
            horizontalAlignment: "center",
            verticalAlignment: "bottom"
        },
        "export": {
            enabled: false
        },
        series: [{
            argumentField: "language",
            valueField: "percent",
            label: {
                visible: true,
                connector: {
                    visible: true,
                    width: 0.5
                },
                format: "fixedPoint",
                customizeText: function (point) {
                    return point.argumentText + ": " + point.valueText + "%";
                }
            },
            smallValuesGrouping: {
                mode: "smallValueThreshold",
                threshold: 4.5
            }
        }]
    };

    $scope.barGaugeOptions = {
        startValue: 0,
        endValue: 100,
        values: [27.27],
        height:400,
        label: {
            indent: 50,
            format: {
                type: "fixedPoint",
                precision: 1
            },
            customizeText: function (arg) {
                return arg.valueText + " %";
            }
        },
        "export": {
            enabled: false
        },
        title: {
           // text: "Series' Ratings",
            font: {
                size: 20
            }
        },
        tooltip: {
            enabled: true,
            format: "currency",
            customizeTooltip: function () {
                return { text: "Tax paid till date <br> " + this.valueText + "B" }
            }
        }
    };
    $scope.chartOptions = {
        dataSource: dataSource,

        commonSeriesSettings: {
            argumentField: 'type',
            type: 'bar'
        },
        //series: [{
        //    argumentField: "Type",
        //    valueField: "TypeValue",
        //    name: "Matched",
        //    type: "bar",
        //    color: '#ffaa66',
        //},
        //{
        //    argumentField: "Type",
        //    valueField: "TypeValue",
        //    name: "Matched",
        //    type: "bar",
        //    color: '#ffaa66',
        //},
        //{
        //    argumentField: "Type",
        //    valueField: "TypeValue",
        //    name: "Matched",
        //    type: "bar",
        //    color: '#ffaa66',
        //},

        //]

        //series: [
        //    { TypeValue: 'TypeValue', Type: 'Matched' },
        //    { TypeValue: 'TypeValue', Type: 'Mismatched' },
        //    { TypeValue: 'TypeValue', Type: 'ITC Claimed' }
        //],

        series: [
            { valueField: 'MatchedValue', name: 'Matched' },
            { valueField: 'MismatchedValue', name: 'Mismatched' },
            { valueField: 'ClaimedValue', name: 'ITC Claimed' }
        ],
        valueAxis: {
            label: { format: 'largeNumber' }
        },

        //series: {
        //argumentField: "Mismatched",
        //valueField: "MismatchedValue",
        //name: "Mismatched",
        //type: "bar",
        //color: '#ffaa67'
        //},
        //series: {
        //    argumentField: "ITCClaimed",
        //    valueField: "ITCClaimedValue",
        //    name: "ITC Claimed",
        //    type: "bar",
        //    color: '#ffaa67'
        //}
    };

    $scope.barGaugeOptions = {
        //dataSource:GauagedataSource,
        startValue: 0,
        endValue: 100,
        values: [50.00],
        label: {
            indent: 30,
            format: {
                type: "fixedPoint",
                precision: 1
            },
            customizeText: function (arg) {
                return arg.valueText + "% Matched";
            }
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Current Tax Period",
            font: {
                size: 28
            }
        }
    };






    $scope.barGaugeOptionsTwo = {
        //dataSource:GauagedataSource,
        startValue: 0,
        endValue: 100,
        values: [30.00],
        label: {
            indent: 30,
            format: {
                type: "fixedPoint",
                precision: 1
            },
            customizeText: function (arg) {
                return arg.valueText + "% Matched";
            }
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Earlier Tax Period",
            font: {
                size: 28
            }
        }
    };





    $scope.chartOptionsSpline = {
        palette: "violet",
        dataSource: dataSourceSpline,
        commonSeriesSettings: {
            argumentField: "month"
        },
        bindingOptions: {
                 
        },
        commonSeriesSettings:
               {
                   type: 'spline'
               },
        commonAxisSettings: {
            grid: {
                visible: false
            }
        },
        margin: {
            bottom: 20
        },
        series: [
            {
                valueField: "smp", name: "SMP"
            },

        ],
        tooltip: {
            enabled: true
        },

        argumentAxis: {
            label: {
                visible: false
            }
        },
        valueAxis: {
            label: {
                visible: false
            }
        },



        legend: {
            verticalAlignment: "top",
            horizontalAlignment: "right",
            visible: false
        },
        "export": {
            enabled: true
        },
        //title: "Architecture Share Over Time (Count)"
    };














    //#region TAB
    $scope.tabs = [
        {
            text: "user", icon: "user",
            content:  "<div dx-data-grid></div>"
        },
        { text: "comment", icon: "comment", content: "'Comment' tab content" },
        { text: "find", icon: "find", content: "'Find' tab content" }
    ];
    $scope.tabContent = function () {
        return $scope.tabs[$scope.selectedTab].content;
    };
    $scope.selectedTab = 0;
    //#endregion

    $scope.formOptions = viewmodelAllUser;
});




