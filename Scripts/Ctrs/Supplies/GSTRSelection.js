exGSP = window.exGSP || {};

exGSP.controller('CtrGSTRSelection', function DemoController($scope,$rootScope, $location, ServiceHelper) {
    $rootScope.loadingVisible = true;
    $rootScope.$emit("CallStatusMethod", {show:false});
    $scope.Classes = {
        GSTR1Header: function (GSTR1Header) {
            var oHeader = GSTR1Header.Data.GST_OS_Header[0];
            //var Totals = $scope.CalculateOutwardSupply(GSTR1Header);
            if (oHeader.TaxPeriodMonthId > 0) {
                return {
                    "ID": oHeader.Id,
                    "Months": AppCommon.GetMonths[oHeader.TaxPeriodMonthId] + " - " + oHeader.TaxPeriodYear,
                    "TotalTaxableAmount": oHeader.TotalTaxableAmount,
                    "OutwardSupply": oHeader.TotalInvoiceAmount,
                    "PaidCGST": oHeader.TotalCGST,
                    "PaidSGST": oHeader.TotalSGST,
                    "PaidIGST": oHeader.TotalIGST,
                    "MonthId": oHeader.TaxPeriodMonthId
                }
            } else {
                return false;
            }
        },
        GSTR2Header: function (GSTR2Header) {
            var oHeader = GSTR2Header.Data.GST_IS_Header[0];
           // var Totals = $scope.CalculateInwardSupply(GSTR2Header);
            if (oHeader.TaxPeriodMonthId > 0) {
                return {
                    "ID": oHeader.Id,
                    "Months": AppCommon.GetMonths[oHeader.TaxPeriodMonthId] + " - " + oHeader.TaxPeriodYear,
                    "TotalTaxableAmount": oHeader.TotalTaxableAmount,
                    "InwardSupply": oHeader.TotalInvoiceAmount,
                    "AvailCGST": oHeader.TotalCGST,
                    "AvailSGST": oHeader.TotalSGST,
                    "AvailIGST": oHeader.TotalIGST,
                    "MonthId": oHeader.TaxPeriodMonthId
                }
            } else {
               return false;
            }
        }
    };
    $scope.CalculateOutwardSupply = function (GSTR1Header) {
        var OutwordSupply = 0, CGSTTotal = 0, SGSTTotal = 0, IGSTTotal = 0;
        $.each(GSTR1Header.Data.GST_OS_B2B_Lines, function (i, item) {
            OutwordSupply += parseFloat(item.SupplierInvoiceValue || 0);
            CGSTTotal += parseFloat(item.CGST_Amount || 0);
            SGSTTotal += parseFloat(item.SGST_Amount || 0);
            IGSTTotal += parseFloat(item.IGST_Amount || 0);
        });
        $.each(GSTR1Header.Data.GST_OS_B2BA_Lines, function (i, item) {
            OutwordSupply += parseFloat(item.SupplierInvoiceValue || 0);
            CGSTTotal += parseFloat(item.CGST_Amount || 0);
            SGSTTotal += parseFloat(item.SGST_Amount || 0);
            IGSTTotal += parseFloat(item.IGST_Amount || 0);
        });
        $.each(GSTR1Header.Data.GST_OS_B2C_Lines, function (i, item) {
            OutwordSupply += parseFloat(item.SupplierInvoiceValue || 0);
            CGSTTotal += parseFloat(item.CGST_Amount || 0);
            SGSTTotal += parseFloat(item.SGST_Amount || 0);
            IGSTTotal += parseFloat(item.IGST_Amount || 0);
        });
        $.each(GSTR1Header.Data.GST_OS_B2CA_Lines, function (i, item) {
            OutwordSupply += parseFloat(item.SupplierInvoiceValue || 0);
            CGSTTotal += parseFloat(item.CGST_Amount || 0);
            SGSTTotal += parseFloat(item.SGST_Amount || 0);
            IGSTTotal += parseFloat(item.IGST_Amount || 0);
        });
        return {
            "OutwordSupply": OutwordSupply,
            "CGSTTotal": CGSTTotal,
            "SGSTTotal": SGSTTotal,
            "IGSTTotal": IGSTTotal,
        };
    }
    $scope.CalculateInwardSupply = function (GSTR2Header) {
        var InwordSupply = 0, CGSTTotal = 0, SGSTTotal = 0, IGSTTotal = 0;
        $.each(GSTR2Header.Data.GST_IS_B2B_Lines, function (i, item) {
            InwordSupply += parseFloat(item.InvoiceValue || 0);
            CGSTTotal += parseFloat(item.CGST_Amount || 0);
            SGSTTotal += parseFloat(item.SGST_Amount || 0);
            IGSTTotal += parseFloat(item.IGST_Amt || 0);
        });
        $.each(GSTR2Header.Data.GST_IS_ISDReturn, function (i, item) {
            InwordSupply += parseFloat(item.InvoiceValue || 0);
            CGSTTotal += parseFloat(item.CGST_Amount || 0);
            SGSTTotal += parseFloat(item.SGST_Amount || 0);
            IGSTTotal += parseFloat(item.IGST_Amount || 0);
        });
        $.each(GSTR2Header.Data.GST_IS_ITCReversal, function (i, item) {
            InwordSupply += parseFloat(item.InvoiceValue || 0);
            CGSTTotal += parseFloat(item.CGST_Amount || 0);
            SGSTTotal += parseFloat(item.SGST_Amount || 0);
            IGSTTotal += parseFloat(item.IGST_Amount || 0);
        });
        $.each(GSTR2Header.Data.GST_IS_ITCReversalA, function (i, item) {
            InwordSupply += parseFloat(item.InvoiceValue || 0);
            CGSTTotal += parseFloat(item.CGST_Amount || 0);
            SGSTTotal += parseFloat(item.SGST_Amount || 0);
            IGSTTotal += parseFloat(item.IGST_Amount || 0);
        });
        $.each(GSTR2Header.Data.GST_IS_B2BA_Lines, function (i, item) {
            InwordSupply += parseFloat(item.InvoiceValue || 0);
            CGSTTotal += parseFloat(item.CGST_Amount || 0);
            SGSTTotal += parseFloat(item.SGST_Amount || 0);
            IGSTTotal += parseFloat(item.IGST_Amt || 0);
        });
        
        return {
            "InwordSupply": InwordSupply,
            "CGSTTotal": CGSTTotal,
            "SGSTTotal": SGSTTotal,
            "IGSTTotal": IGSTTotal,
        };
    }
    $scope.PageHeader = '';
    $scope.GSTR1HeaderModel = [];
    $scope.GSTR2HeaderModel = [];
    $scope.GSTRData = [];
    $scope.ShortArray = function (a, b) {
        return parseInt(b.MonthId, 10) - parseInt(a.MonthId);
    }
    $scope.GetResource = function () {
        var CurrentPage = $location.search();
        var EntityType = '';
        if (CurrentPage.Page == "1") {
            $scope.PageHeader = "GSTR1";
            EntityType = AppCommon.EntityType.GST_OS_Header;
        } else {
            $scope.PageHeader = "GSTR2";
            EntityType = AppCommon.EntityType.GST_IS_Header;
        }
        var rData = new AppCommon.Class.EntityQueryRequest();
        rData.EntityType = EntityType;
        rData.ViewId = AppCommon.Views.Empty;
        rData.LoadAllRelations = false;
        rData.Count = 5;
        ServiceHelper.QueryEntity(rData,
            function (response) {
                if (response.Entitities) {
                    if ($scope.PageHeader == "GSTR1") {
                        $scope.CreateGSTR1HeaderModal(response.Entitities);
                        $scope.GSTR1HeaderModel.sort($scope.ShortArray);
                    } else {
                        $scope.CreateGSTR2HeaderModal(response.Entitities);
                        $scope.GSTR2HeaderModel.sort($scope.ShortArray);
                    }
                    $scope.Init();
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

    $scope.CreateGSTR1HeaderModal = function (dataHeader) {
        $.each(dataHeader, function (i, item) {
            var oData = new $scope.Classes.GSTR1Header(item);
            $scope.GSTR1HeaderModel.push(oData);
        });
    }
    $scope.CreateGSTR2HeaderModal = function (dataHeader) {
        $.each(dataHeader, function (i, item) {
            var oData = new $scope.Classes.GSTR2Header(item);
            $scope.GSTR2HeaderModel.push(oData);
        });
    }
    $scope.GetResource();
    $scope.CreateForm = function () {
        $scope.viewmodel = {
            formData: {},
            //width: 1000,
            //height: 'auto',
            scrollingEnabled: true,
            colCount: 4,
            colSpan: 4,
            labelLocation: "top",
            items: $scope.LayoutJson(),
        };
    }
    $scope.Init = function () {
        $scope.CreateForm();
        $scope.formOptions = $scope.viewmodel;
        $rootScope.loadingVisible = false;
    }
    $scope.LayoutJson = function () {
        if ($scope.PageHeader == "GSTR1") {
            return [{
                itemType: "group",
                colCount: 4,
               // caption: $scope.PageHeader + ' Previous invoices',
                colSpan: 4,
                items:
                    [
                         {
                             editorType: "dxDataGrid",
                             colSpan: 4,
                             columnAutoWidth: true,
                             width: 'auto',
                             editorOptions: {
                                 dataSource: $scope.GSTR1HeaderModel,
                                 sorting: { mode: 'none' },
                                 selection: {
                                     mode: "single"
                                 },
                                 hoverStateEnabled: true,
                                 rowAlternationEnabled: true,
                                 columns: [
                                    //{
                                    //    dataField: 'Months', caption: "Months", width: 'auto',
                                    //    cellTemplate: function (container, options) {
                                    //        $('<a/>').addClass('dx-link')
                                    //            .text(options.displayValue)
                                    //            .on('dxclick', function () {
                                    //                $scope.gotoGSTR1(options.data.ID,options.text);
                                    //            })
                                    //            .appendTo(container);
                                    //    }
                                    //},
                                    { dataField: 'Months', caption: "Filed Months", width: 'auto',},
                                    //{ dataField: 'TaxPayerGSTIN', caption: "Tax Payer GSTIN" },
                                    {
                                        dataField: 'OutwardSupply',
                                        caption: "Total Outward Supply (INR)",
                                        format: { type: 'fixedPoint', precision: 2 },
                                    },
                                    //{ dataField: 'TotalTaxableAmount', caption: "Taxable Amount", format: { type: 'fixedPoint', precision: 2 } },
                                    {
                                        //caption: "Population",
                                        headerCellTemplate: function (container) {
                                            container.append($("<div style='text-align: right;padding-right: 33%;'>Tax Summary (INR)</div>"));
                                        },
                                        columns: [{
                                            caption: "CGST",
                                            dataField: "PaidCGST",
                                            format: { type: 'fixedPoint', precision: 2 } ,
                                        }, {
                                            caption: "SGST",
                                            dataField: "PaidSGST",
                                            format: { type: 'fixedPoint', precision: 2 } ,
                                        }, {
                                            caption: "IGST",
                                            dataField: "PaidIGST",
                                            format: { type: 'fixedPoint', precision: 2 } ,
                                        }]
                                    }
                                 ],
                                 showColumnLines: true,
                                 showRowLines: true,
                                 showBorders: true,
                                 onRowClick: function (info) {
                                     $scope.gotoGSTR1(info.data.ID, info.data.Months);
                                 },

                             },

                         }
                    ]

            }];
        } else {
            return [{
                itemType: "group",
                colCount: 4,
                //caption: $scope.PageHeader + ' Previous invoices',
                colSpan: 4,
                items:
                    [
                         {
                             editorType: "dxDataGrid",
                             colSpan: 4,
                             columnAutoWidth: true,
                             width: 'auto',
                             editorOptions: {
                                 dataSource: $scope.GSTR2HeaderModel,
                                 sorting: { mode: 'none' },
                                 selection: {
                                     mode: "single"
                                 },
                                 hoverStateEnabled: true,
                                 rowAlternationEnabled: true,
                                 columns: [
                                    //{
                                    //    dataField: 'Months', caption: "Months", width: 'auto',
                                    //    cellTemplate: function (container, options) {
                                    //        $('<a/>').addClass('dx-link')
                                    //            .text(options.displayValue)
                                    //            .on('dxclick', function () {
                                    //                $scope.gotoGSTR1(options.data.ID,options.text);
                                    //            })
                                    //            .appendTo(container);
                                    //    }
                                    //},
                                    {
                                        dataField: 'Months', caption: "Filed Months", width: 'auto',
                                    },
                                    //{ dataField: 'TaxPayerName', caption: "Tax Payer" },
                                    //{ dataField: 'TaxPayerGSTIN', caption: "Tax Payer GSTIN" },
                                    {
                                        dataField: 'InwardSupply',
                                        caption: "Total Inward Supply (INR)",
                                        format: { type: 'fixedPoint', precision: 2 },
                                    },
                                     {
                                         //caption: "Population",
                                         headerCellTemplate: function (container) {
                                             container.append($("<div style='text-align: right;padding-right: 33%;'>ITC Claimed (INR)</div>"));
                                         },
                                         columns: [{
                                             caption: "CGST",
                                             dataField: "AvailCGST",
                                             format: { type: 'fixedPoint', precision: 2 } ,
                                         }, {
                                             caption: "SGST",
                                             dataField: "AvailSGST",
                                             format: { type: 'fixedPoint', precision: 2 } ,
                                         }, {
                                             caption: "IGST",
                                             dataField: "AvailIGST",
                                             format: { type: 'fixedPoint', precision: 2 } ,
                                         }]
                                     }
                                 ],
                                 showColumnLines: true,
                                 showRowLines: true,
                                 showBorders: true,
                                 onRowClick: function (info) {
                                     $scope.gotoGSTR1(info.data.ID, info.data.Months);
                                 },

                             },


                         }
                    ]

            }];
        }
    }
    $scope.gotoGSTR1 = function (RowIndex,text) {
        hash = "/" + $scope.PageHeader;
        var param = {
            Current: RowIndex,
            val:text
        }
        $location.path(hash).search(param);
    }
});