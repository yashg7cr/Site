/// <reference path="../../dxLib/dx.all.js" />
/// <reference path="../../Lib/angular.min.js" />
/// <reference path="../../App/App.ServiceHelper.js" />
exGSP = window.exGSP || {};
//#region Controller
exGSP.controller('CtrGSTR1', function DemoController($scope, $rootScope, $location, ServiceHelper, $timeout) {
    //#region Declaration
    $rootScope.loadingVisible = true;
    gridInstance = null;
    $rootScope.$emit("CallStatusMethod",
    {
        show: true,
        fileName: "GSTRStatus.html"
    });
    $scope.CurrentEntity = null;
    $scope.CurrentOpenHistory = null;
    $scope.currentRow = null;
    $scope.existingRowEditingMode = false;
    $scope.formInstance = null;
    //$scope.selectedvalue = 1;
    //#endregion

    //#region Classes 
    $scope.Classes = {
        B2B: function (oHB2B, oB2B) {
            return {
                HeaderID: oHB2B.Id,
                ID: oB2B.Id,
                FormType: oB2B.FormTypeName,
                SectionType: oB2B.SectionType,
                TaxPayerName: oHB2B.TaxPayerName,
                SupplierInvoiceNo: oB2B.SupplierInvoiceNo,
                SupplierInvoiceDate: oB2B.SupplierInvoiceDate,
                HSNSACCode: oB2B.HSNSACCode,
                TaxableValue: oB2B.TaxableValue,
                IGST_Rate: oB2B.IGST_Rate,
                IGST_Amount: oB2B.IGST_Amount,
                CGST_Rate: oB2B.CGST_Rate,
                CGST_Amount: oB2B.CGST_Amount,
                SGST_Rate: oB2B.SGST_Rate,
                SGST_Amount: oB2B.SGST_Amount,
                POS: oB2B.POS,
                CounterPartyGSTINOrUIN: oB2B.CounterPartyGSTINOrUIN,
                EcommerceOperatorGSTIN: oB2B.EcommerceOperatorGSTIN,
                IssuedEcommerceMerchantId: oB2B.IssuedEcommerceMerchantId,
                GrossSuppliesValue: oB2B.GrossSuppliesValue,
                ReverseCharge: oB2B.ReverseCharge,
                ProvisionalAssessment: oB2B.ProvisionalAssessment,
                GoodsService: oB2B.GoodsService,
                Status: oB2B.Status,
                StatusName: oB2B.StatusName,
                SourceIdentifier: oB2B.SourceIdentifier,
                Filed: false,
                LineType: "",
            }
        },
        B2BHistory: function (oB2BH) {
            return {
                ID: oB2BH.Id,
                FormType: oB2BH.FormTypeName,
                SectionType: oB2BH.SectionType,
                SupplierInvoiceNo: oB2BH.SupplierInvoiceNo,
                SupplierInvoiceDate: oB2BH.SupplierInvoiceDate,
                CounterPartyGSTINOrUIN: oB2BH.CounterPartyGSTINOrUIN,
                HSNSACCode: oB2BH.HSNSACCode,
                TaxableValue: oB2BH.TaxableValue,
                IGST_Rate: oB2BH.IGST_Rate,
                IGST_Amount: oB2BH.IGST_Amount,
                CGST_Rate: oB2BH.CGST_Rate,
                CGST_Amount: oB2BH.CGST_Amount,
                SGST_Rate: oB2BH.SGST_Rate,
                SGST_Amount: oB2BH.SGST_Amount,
            }
        },
        B2C: function (oHB2C, oB2C) {
            return {
                HeaderID: oHB2C.Id,
                ID: oB2C.Id,
                FormType: oB2C.FormTypeName,
                SectionType: oB2C.SectionType,
                TaxPayerName: oHB2C.TaxPayerName,
                SupplierInvoiceNo: oB2C.SupplierInvoiceNo,
                SupplierInvoiceDate: oB2C.SupplierInvoiceDate,
                HSNSACCode: oB2C.HSNSACCode,
                TaxableValue: oB2C.TaxableValue,
                ShippingBillDate: oB2C.ShippingBillDate,
                ShippingBillNo: oB2C.ShippingBillNo,
                IGST_Rate: oB2C.IGST_Rate,
                IGST_Amount: oB2C.IGST_Amount,
                CGST_Rate: oB2C.CGST_Rate,
                CGST_Amount: oB2C.CGST_Amount,
                SGST_Rate: oB2C.SGST_Rate,
                SGST_Amount: oB2C.SGST_Amount,
                POS: oB2C.POS,
                SupplierInvoiceValue: oB2C.SupplierInvoiceValue,
                RecipientStateCode: oB2C.RecipientStateCode,
                EcommerceOperatorGSTIN: oB2C.EcommerceOperatorGSTIN,
                IssuedEcommerceMerchantId: oB2C.IssuedEcommerceMerchantId,
                GrossSuppliesValue: oB2C.GrossSuppliesValue,
                ReverseCharge: oB2C.ReverseCharge,
                ProvisionalAssessment: oB2C.ProvisionalAssessment,
                GoodsService: oB2C.GoodsService,
                Status: oB2C.Status,
                StatusName: oB2C.StatusName,
                //OriginalInvoiceNo: oB2CA.OriginalInvoiceNo,
                //OriginalInvoiceDate: oB2CA.OriginalInvoiceDate,
                //OriginalGoodsService: oB2CA.OriginalGoodsService,
                //OriginalHSNSACCode: oB2CA.OriginalHSNSACCode,
                //SupplierInvoiceValue: oB2CA.SupplierInvoiceValue,
                //TaxableValue: oB2CA.TaxableValue
                //Status: AppCommon.GetStatusIdentifier[oB2C.Status],
                SourceIdentifier: oB2C.SourceIdentifier,
                Filed: false,
                LineType: "",
            }
        },
        B2CHistory: function (oB2CH) {
            return {
                ID: oB2CH.Id,
                FormType: oB2CH.FormTypeName,
                SectionType: oB2CH.SectionType,
                SupplierInvoiceNo: oB2CH.SupplierInvoiceNo,
                SupplierInvoiceDate: oB2CH.SupplierInvoiceDate,
                HSNSACCode: oB2CH.HSNSACCode,
                TaxableValue: oB2CH.TaxableValue,
                ShippingBillDate: oB2CH.ShippingBillDate,
                ShippingBillNo: oB2CH.ShippingBillNo,
                IGST_Rate: oB2CH.IGST_Rate,
                IGST_Amount: oB2CH.IGST_Amount,
                CGST_Rate: oB2CH.CGST_Rate,
                CGST_Amount: oB2CH.CGST_Amount,
                SGST_Rate: oB2CH.SGST_Rate,
                SGST_Amount: oB2CH.SGST_Amount,
                EcommerceOperatorGSTIN: oB2CH.EcommerceOperatorGSTIN,
            }
        },
        CNDN: function (oHCNDN, oCNDN) {
            return {
                HeaderID: oHCNDN.Id,
                ID: oCNDN.Id,
                FormType: oCNDN.FormTypeName,
                SectionType: oCNDN.SectionType,
                CounterPartyGSTINOrUIN: oCNDN.CounterPartyGSTINOrUIN,
                CDNType: oCNDN.CDNType,
                CDNNo: oCNDN.CDNNo,
                CDNDate: oCNDN.CDNDate,
                InvoiceDate: oCNDN.InvoiceDate,
                OriginalInvoiceNo: oCNDN.OriginalInvoiceNo,
                DifferentialValue: oCNDN.DifferentialValue,
                CGST_Rate: oCNDN.CGST_Rate,
                CGST_Amount: oCNDN.CGST_Amount,
                SGST_Amount: oCNDN.SGST_Amount,
                SGST_Rate: oCNDN.SGST_Rate,
                IGST_Amount: oCNDN.IGST_Amount,
                IGST_Rate: oCNDN.IGST_Rate,
                Status: oCNDN.Status,
                StatusName: oCNDN.StatusName,
                //OriginalCDNDate: oCNDNA.OriginalCDNDate,
                //OriginalCDNNo: oCNDNA.OriginalCDNNo
                //"Status": AppCommon.GetStatusIdentifier[oCNDN.Status],
                SourceIdentifier: oCNDN.SourceIdentifier,
                Description: 'Reverse charge',
                Filed: false,
                LineType: "",
            }
        },
        CNDNHistory: function (oCNDN) {
            return {
                ID: oCNDN.Id,
                FormType: oCNDN.FormTypeName,
                SectionType: oCNDN.SectionType,
                CounterPartyGSTINOrUIN: oCNDN.CounterPartyGSTINOrUIN,
                CDNType: oCNDN.CDNType,
                CDNNo: oCNDN.CDNNo,
                InvoiceDate: oCNDN.InvoiceDate,
                OriginalInvoiceNo: oCNDN.OriginalInvoiceNo,
                DifferentialValue: oCNDN.DifferentialValue,
                CGST_Rate: oCNDN.CGST_Rate,
                CGST_Amount: oCNDN.CGST_Amount,
                SGST_Amount: oCNDN.SGST_Amount,
                SGST_Rate: oCNDN.SGST_Rate,
                IGST_Amount: oCNDN.IGST_Amount,
                IGST_Rate: oCNDN.IGST_Rate,
                Description: 'Reverse charge'
            }
        },
        TaxPaid: function (oHTaxPaid, oTaxPaid) {
            return {
                HeaderID: oHTaxPaid.Id,
                ID: oTaxPaid.Id,
                FormType: oTaxPaid.FormTypeName,
                SectionType: oTaxPaid.SectionType,
                SupplierInvoiceNo: oTaxPaid.SupplierInvoiceNo,
                TransactionID: oTaxPaid.TransactionID,
                CGST_Rate: oTaxPaid.CGST_Rate,
                CGST_Tax: oTaxPaid.CGST_Tax,
                SGST_Tax: oTaxPaid.SGST_Tax,
                SGST_Rate: oTaxPaid.SGST_Rate,
                IGST_Tax: oTaxPaid.IGST_Tax,
                IGST_Rate: oTaxPaid.IGST_Rate,
                Status: oTaxPaid.Status,
                StatusName: oTaxPaid.StatusName,
                //"Status": AppCommon.GetStatusIdentifier[oTaxPaid.Status],
                SourceIdentifier: oTaxPaid.SourceIdentifier,
                Filed: false,
                LineType: "",
            }
        },
        TaxPaidHistory: function (oTaxPaid) {
            return {
                ID: oTaxPaid.Id,
                FormType: oTaxPaid.FormTypeName,
                SectionType: oTaxPaid.SectionType,
                SupplierInvoiceNo: oTaxPaid.SupplierInvoiceNo,
                TransactionID: oTaxPaid.TransactionID,
                CGST_Rate: oTaxPaid.CGST_Rate,
                CGST_Tax: oTaxPaid.CGST_Tax,
                SGST_Tax: oTaxPaid.SGST_Tax,
                SGST_Rate: oTaxPaid.SGST_Rate,
                IGST_Tax: oTaxPaid.IGST_Tax,
                IGST_Rate: oTaxPaid.IGST_Rate,
            }
        },
        InvSum: function (oHInvSum, oInvSum) {
            return {
                HeaderID: oHInvSum.Id,
                ID: oInvSum.Id,
                FormType: oInvSum.FormTypeName,
                SectionType: oInvSum.SectionType,
                SeriesNoOfInvoice: oInvSum.SeriesNoOfInvoice,
                From: oInvSum.From,
                To: oInvSum.To,
                TotalInvoiceNumber: oInvSum.TotalInvoiceNumber,
                NumberofCancelledInvoice: oInvSum.NumberofCancelledInvoice,
                NetNumberIssuedInvoice: oInvSum.NetNumberIssuedInvoice,
                SourceIdentifier: oInvSum.SourceIdentifier,
                Filed: true,
                LineType: "",
            }
        },
        Other: function (oHOther, oOther) {
            return {
                HeaderID: oHOther.Id,
                ID: oOther.Id,
                FormType: oOther.FormTypeName,
                SectionType: oOther.SectionType,
                NilRatedSuppliesValue: oOther.NilRatedSuppliesValue,
                ExemptedSuppliesValue: oOther.ExemptedSuppliesValue,
                GoodsService: oOther.GoodsService,
                NonGSTSuppliesValue: oOther.NonGSTSuppliesValue,
                SourceIdentifier: oOther.SourceIdentifier,
                Status: oOther.Status,
                StatusName: oOther.StatusName,
                SupplyType: oOther.SupplyType,
                Filed: true,
                LineType: "",
            }
        },
        OtherHistory: function (oOther) {
            return {
                ID: oOther.Id,
                FormType: oOther.FormTypeName,
                SectionType: oOther.SectionType,
                NilRatedSuppliesValue: oOther.NilRatedSuppliesValue,
                ExemptedSuppliesValue: oOther.ExemptedSuppliesValue,
                GoodsService: oOther.GoodsService,
                SupplyType: oOther.SupplyType,
                NonGSTSuppliesValue: oOther.NonGSTSuppliesValue,
            }
        },
        GSTR1Summary: function (oGSTR1) {
            return {
                gstin: oGSTR1.gstin,
                ret_pd: oGSTR1.ret_pd,
                checksum: oGSTR1.checksum,
                ttl_inv: oGSTR1.ttl_inv,
                ttl_tax: oGSTR1.ttl_tax,
                ttl_igst: oGSTR1.ttl_igst,
                ttl_cgst: oGSTR1.ttl_cgst,
                ttl_sgst: oGSTR1.ttl_sgst,
            }
        },
        GSTR1SummaryDetails: function (oGSTR) {
            return {
                checksum: oGSTR.checksum,
                ttl_inv: oGSTR.ttl_inv,
                ttl_tax: oGSTR.ttl_tax,
                ttl_igst: oGSTR.ttl_igst,
                ttl_cgst: oGSTR.ttl_cgst,
                ttl_sgst: oGSTR.ttl_sgst,
                section_name: oGSTR.Section_name,
            }
        },
        CounterParty: function (oGSTR) {
            return {
                checksum: oGSTR.checksum,
                ctin: oGSTR.ctin,
                ttl_cgst: oGSTR.ttl_cgst,
                ttl_igst: oGSTR.ttl_igst,
                ttl_inv: oGSTR.ttl_inv,
                ttl_sgst: oGSTR.ttl_sgst,
                ttl_tax: oGSTR.ttl_tax
            }
        },
    };
    //#endregion

    //#region Data Model
    $scope.B2BModel = [];
    $scope.B2BHistoryModel = [];
    $scope.B2CModel = [];
    $scope.B2CHistoryModel = [];
    $scope.CNDNModel = [];
    $scope.CNDNHistoryModel = [];
    $scope.TaxPaidModel = [];
    $scope.TaxPaidHistoryModel = [];
    $scope.InvSumModel = [];
    $scope.OtherHistoryModel = [];
    $scope.OtherModel = [];
    $scope.GSTRSummaryModel = [];
    $scope.SummaryDetailsModel = [];
    $scope.CounterPartyModel = [];
    $scope.B2BDataModel = [];
    $scope.B2CDataModel = [];
    $scope.CNDNDataModel = [];
    $scope.TaxOnAdvanceDataModel = [];
    $scope.OtherDataModel = [];
    $scope.InvoiceSummaryDataModel = [];
    //#region Need To Remove
    var DescriptionModel = [
    {
        "ID": 1,
        "Name": "Other than reverse charge",
    },
    {
        "ID": 2,
        "Name": "Reverse charge",
    }];
    var SupplyTypeModel = ['Interstate supplies to registered person', 'Intrastate supplies to registered person', 'Interstate supplies to consumer', 'Intrastate supplies to consumer'];
    var B2CSectionTypeModel = ['6', '6A', '7', '7A', '10', '10A', '13.2', '13.2A', ];
    var CNDNSectionTypeModel = ['8', '8A'];
    var OthersSectionTypeModel = ['9'];
    var TaxOnAdvSectionTypeModel = ['12'];
    var InvSumSectionTypeModel = ['14'];
    var GoodServicesModel = ['G', 'S'];
    var TaxRateModel = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    //#endregion
    //#endregion

    //#region Selectbox DataSource Model
    //#region B2B 
    $scope.B2BSectionTypeModel = [];
    $scope.GoodServicesModel = [];
    $scope.CGSTRateModel = [];
    $scope.IGSTRateModel = [];
    $scope.SGSTRateModel = [];
    //#endregion
    //#region B2C 
    $scope.B2CSectionTypeModel = [];
    //#endregion
    //#region CDN 
    $scope.CDNSectionTypeModel = [];
    $scope.CDNDescriptionModel = [];
    //#endregion
    //#region Tax On Advance 
    $scope.TaxOnAdvanceSectionTypeModel = [];
    //#endregion
    //#region Other 
    $scope.OtherSectionTypeModel = [];
    $scope.OtherSupplyTypeModel = [];
    //#endregion
    //#region Invoice Summary 
    $scope.InvSumSectionTypeModel = [];
    //#endregion
    //#endregion

    //#region DataSource and Store
    $scope.CreateStore = function (array) {
        return new DevExpress.data.ArrayStore(
        {
            data: array,
            key: 'ID'
        });
    }
    $scope.CreateDataSource = function (arrryStore) {
        return new DevExpress.data.DataSource(
        {
            store: arrryStore,
            key: 'ID',
            paginate: false
        });
    }
    //#endregion

    //#region B2B Form
    $scope.CreateB2BModal = function (dataHeader, dataB2B, dataB2BA) {
        $scope.B2BModel.length = 0;
        $.each(dataB2B, function (i, item) {
            var oData = new $scope.Classes.B2B(dataHeader[0], item);
            oData.LineType = "GST_OS_B2B_Lines";
            $scope.B2BModel.push(oData);
        });
        $.each(dataB2BA, function (i, item) {
            var oData = new $scope.Classes.B2B(dataHeader[0], item);
            oData.LineType = "GST_OS_B2BA_Lines";
            $scope.B2BModel.push(oData);
        });
        $scope.B2BModelDataSource = $scope.CreateDataSource($scope.CreateStore($scope.B2BModel));
    }
    $scope.CreateB2BHistoryModal = function (dataHeader) {
        $.each(dataHeader, function (i, item) {
            var oData = new $scope.Classes.B2BHistory(dataHeader[i]);
            $scope.B2BHistoryModel.push(oData);
        });
    }
    $scope.CreateB2BPopup = function () {
        $scope.popupFormBtoBDetails = {
            bindingOptions:
            {
                formData: 'currentRow.data',
            },
            onInitialized: function (e) {
                $scope.formInstance = e.component;
            },
            width: 1000,
            height: 'auto',
            scrollingEnabled: true,
            colCount: 4,
            colSpan: 4,
            labelLocation: "top",
            items: [
            {
                dataField: 'SectionType',
                editorType: 'dxSelectBox',
                colSpan: 1,
                label:
                {
                    text: 'Section Type'
                },
                editorOptions:
                {
                    items: $scope.B2BSectionTypeModel,
                    value: $scope.SectionType,
                    //onValueChanged: function (e) {
                    //    $scope.clickHandler(e);                      
                    //   },
                },
            },
            {
                itemType: "empty",
                colCount: 1,
                colSpan: 1,
            },
            {
                dataField: 'CounterPartyGSTINOrUIN',
                colSpan: 2,
                label:
                {
                    text: 'GSTIN/UIN/Name of recipient'
                },
            },
            {
                itemType: 'group',
                colCount: 2,
                colSpan: 2,
                items: [
                {
                    itemType: 'group',
                    caption: 'Invoice Details',
                    colCount: 2,
                    colSpan: 2,
                    items: [
                    {
                        dataField: 'SupplierInvoiceNo',
                        colSpan: 1,
                        label:
                        {
                            text: 'Invoice Number (Original)'
                        },
                        editorOptions:
                        {
                            placeholder: 'Invoice Number',
                            //disabled: 'disabledValue'
                        },
                    },
                    {
                        dataField: 'OriginalInvoiceNo',
                        colSpan: 1,
                        label:
                        {
                            text: 'Invoice Number(Revised)'
                        },
                        editorOptions:
                        {
                            placeholder: 'Invoice Number'
                        }
                    },
                    {
                        dataField: 'SupplierInvoiceDate',
                        editorType: 'dxDateBox',
                        colSpan: 1,
                        label:
                        {
                            text: 'Invoice Date'
                        },
                        editorOptions:
                        {
                            placeholder: 'Invoice Date',
                            width: '100%',
                            displayFormat: AppSetting.AppConstant.Dateformat,
                        }
                    },
                    {
                        dataField: 'OriginalInvoiceDate',
                        editorType: 'dxDateBox',
                        colSpan: 1,
                        label:
                        {
                            text: 'Invoice Date'
                        },
                        editorOptions:
                        {
                            placeholder: 'Invoice Date',
                            width: '100%',
                            displayFormat: AppSetting.AppConstant.Dateformat,
                        }
                    },
                    {
                        dataField: 'SupplierInvoiceValue',
                        colSpan: 1,
                        label:
                        {
                            text: 'Invoice Value'
                        },
                        editorOptions:
                        {
                            placeholder: 'Invoice Value'
                        }
                    },
                    {
                        dataField: 'SupplierInvoiceValue',
                        colSpan: 1,
                        label:
                        {
                            text: 'Invoice Value'
                        },
                        editorOptions:
                        {
                            placeholder: 'Invoice Value'
                        }
                    },
                    {
                        dataField: 'GoodsService',
                        editorType: 'dxSelectBox',
                        colSpan: 1,
                        label:
                        {
                            text: 'Goods/Services'
                        },
                        editorOptions:
                        {
                            items: $scope.GoodServicesModel,
                            value: $scope.GoodsService
                        }
                    },
                    {
                        dataField: 'GoodsService',
                        editorType: 'dxSelectBox',
                        colSpan: 1,
                        label:
                        {
                            text: 'Goods/Services'
                        },
                        editorOptions:
                        {
                            items: $scope.GoodServicesModel,
                            value: $scope.GoodsService
                        }
                    },
                    {
                        dataField: 'HSNSACCode',
                        colSpan: 1,
                        label:
                        {
                            text: 'HSN/SAC'
                        },
                    },
                    {
                        dataField: 'HSNSACCode',
                        colSpan: 1,
                        label:
                        {
                            text: 'HSN/SAC'
                        },
                    },
                    {
                        dataField: 'TaxableValue',
                        colSpan: 1,
                        label:
                        {
                            text: 'Taxable Value'
                        },
                    },
                    {
                        dataField: 'TaxableValue',
                        colSpan: 1,
                        label:
                        {
                            text: 'Taxable Value'
                        },
                    }]
                },
                {
                    itemType: 'group',
                    caption: 'E-commerce Information',
                    colCount: 2,
                    colSpan: 2,
                    items: [
                    {
                        dataField: 'EcommerceOperatorGSTIN',
                        colSpan: 1,
                        label:
                        {
                            text: 'GSTIN'
                        },
                    },
                    {
                        dataField: 'IssuedEcommerceMerchantId',
                        colSpan: 1,
                        label:
                        {
                            text: 'Merchant ID'
                        },
                    }]
                }]
            },
            {
                itemType: 'group',
                colCount: 2,
                colSpan: 2,
                items: [
                {
                    itemType: 'group',
                    caption: 'Tax Details ',
                    colCount: 2,
                    colSpan: 2,
                    items: [
                    {
                        dataField: 'CGST_Rate',
                        editorType: 'dxSelectBox',
                        colSpan: 1,
                        label:
                        {
                            text: 'CGST'
                        },
                        editorOptions:
                        {
                            items: TaxRateModel,
                            value: $scope.CGST_Rate
                        }
                    },
                    {
                        dataField: 'CGST_Amount',
                        colSpan: 1,
                        label:
                        {
                            text: 'Amount'
                        },
                        editorOptions:
                        {
                            placeholder: 'Amount'
                        }
                    },
                    {
                        dataField: 'SGST_Rate',
                        editorType: 'dxSelectBox',
                        colSpan: 1,
                        label:
                        {
                            text: 'SGST'
                        },
                        editorOptions:
                        {
                            items: TaxRateModel,
                            value: $scope.SGST_Rate
                        }
                    },
                    {
                        dataField: 'SGST_Amount',
                        colSpan: 1,
                        label:
                        {
                            text: 'Amount'
                        },
                        editorOptions:
                        {
                            placeholder: 'Amount'
                        }
                    },
                    {
                        dataField: 'IGST_Rate',
                        editorType: 'dxSelectBox',
                        colSpan: 1,
                        label:
                        {
                            text: 'IGST'
                        },
                        editorOptions:
                        {
                            items: TaxRateModel,
                            value: $scope.IGST_Rate
                        }
                    },
                    {
                        dataField: 'IGST_Amount',
                        colSpan: 1,
                        label:
                        {
                            text: 'Amount'
                        },
                        editorOptions:
                        {
                            placeholder: 'Amount'
                        }
                    }, ]
                },
                {
                    itemType: 'group',
                    caption: 'Other Details',
                    colCount: 2,
                    colSpan: 2,
                    items: [
                    {
                        dataField: 'POS',
                        colSpan: 2,
                        label:
                        {
                            text: 'POS'
                        },
                    },
                    {
                        dataField: 'GrossSuppliesValue',
                        colSpan: 2,
                        label:
                        {
                            text: 'Gross value of supplies'
                        }
                    },
                    {
                        colSpan: 2,
                        datafield: 'ReverseCharge',
                        editorType: "dxCheckBox",
                        editorOptions:
                        {
                            text: "Indicate if supply attract reverse charge",
                            value: $scope.ReverseCharge
                        }
                    },
                    {
                        colSpan: 2,
                        datafield: 'ProvisionalAssessment',
                        editorType: "dxCheckBox",
                        editorOptions:
                        {
                            text: "Tax on this supply is paid under provisional assessment",
                            value: $scope.ProvisionalAssessment
                        }
                    }]
                }]
            },
            {
                itemType: "empty",
                colCount: 12,
                colSpan: 4,
            },
            {
                itemType: 'group',
                caption: '',
                colCount: 12,
                colSpan: 4,
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
                            if ($scope.existingRowEditingMode == false) {
                                $scope.SaveEntity($scope.currentRow.data, $scope.B2BModelDataSource._store, $scope.B2BModelDataSource, AppCommon.EntityType.GST_OS_Header, $scope.SetB2BLine($scope.currentRow.data, "Insert"));
                            }
                            else {
                                $scope.UpdateEntity($scope.currentRow.key, $scope.currentRow.data, $scope.B2BModelDataSource._store, $scope.B2BModelDataSource, AppCommon.EntityType.GST_OS_Header, $scope.SetB2BLine($scope.currentRow.data, "Update"));
                            }
                            $scope.showInfo();
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
            title: "B2B",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblePopup",
            },
            contentTemplate: 'Moredetailcontent'
        };
        $scope.visiblePopup = false;
        $scope.showInfo = function () {
            $scope.visiblePopup = !$scope.visiblePopup;
        };
    }
    $scope.CreateB2BHistoryPopup = function () {
        //#region GRID POPUP START B to B GRID
        $scope.popupFormBtoBGrid = {
            formData:
            {},
            width: 1000,
            height: 'auto',
            scrollingEnabled: true,
            colCount: 1,
            colSpan: 1,
            labelLocation: "top",
            items: [
            {
                itemType: "group",
                colSpan: 1,
                items: [
                    {
                        colSpan: 1,
                        template: 'button_acceptreject'
                    },
                    {
                        itemType: "empty",
                        colCount: 12,
                        colSpan: 2,
                    },
                    {
                        template: 'BtoBGridTemplate'
                    },
                    $scope.BtoBgridSettings = {
                        bindingOptions:
                        {
                            dataSource: 'B2BHistoryModel'
                        },
                        sorting:
                        {
                            mode: 'none'
                        },
                        paging:
                        {
                            pageSize: AppSetting.AppConstant.PageSize,
                        },
                        pager:
                        {
                            showNavigationButtons: true
                        },
                        width: 'auto',
                        height: 350,
                        columns: [
                            {
                                caption: 'Section Type',
                                dataField: 'SectionType'
                            },
                            {
                                caption: 'GSTIN/UIN of Recipient',
                                dataField: 'CounterPartyGSTINOrUIN'
                            },
                            {
                                caption: 'Invoice No',
                                dataField: 'SupplierInvoiceNo'
                            },
                            {
                                caption: 'Invoice Date',
                                dataField: 'SupplierInvoiceDate',
                                dataType: 'date',
                                format: AppSetting.AppConstant.Dateformat
                            },
                            {
                                caption: 'HSN/SAC',
                                dataField: 'HSNSACCode'
                            },
                            {
                                caption: 'Taxable Value',
                                dataField: 'TaxableValue'
                            },
                            {
                                headerCellTemplate: function (container) {
                                    container.append($("<div style='text-align: right;padding-right: 33%;'>CGST</div>"));
                                },
                                columns: [
                                {
                                    caption: "Rate",
                                    dataField: "CGST_Rate",
                                    format:
                                    {
                                        type: 'fixedPoint'
                                    },
                                },
                                {
                                    caption: "Amount",
                                    dataField: "CGST_Amount",
                                    format:
                                    {
                                        type: 'fixedPoint',
                                        precision: 2
                                    },
                                }]
                            },
                            {
                                headerCellTemplate: function (container) {
                                    container.append($("<div style='text-align: right;padding-right: 33%;'>SGST</div>"));
                                },
                                columns: [
                                {
                                    caption: "Rate",
                                    dataField: "SGST_Rate",
                                    format:
                                    {
                                        type: 'fixedPoint'
                                    },
                                },
                                {
                                    caption: "Amount",
                                    dataField: "SGST_Amount",
                                    format:
                                    {
                                        type: 'fixedPoint',
                                        precision: 2
                                    },
                                }]
                            },
                            {
                                headerCellTemplate: function (container) {
                                    container.append($("<div style='text-align: right;padding-right: 33%;'>IGST</div>"));
                                },
                                columns: [
                                {
                                    caption: "Rate",
                                    dataField: "IGST_Rate",
                                    format:
                                    {
                                        type: 'fixedPoint'
                                    },
                                },
                                {
                                    caption: "Amount",
                                    dataField: "IGST_Amount",
                                    format:
                                    {
                                        type: 'fixedPoint',
                                        precision: 2
                                    },
                                }]
                            },
                        ],
                        columnAutoWidth: true,
                        wordWrapEnabled: true,
                        showColumnLines: false,
                        showRowLines: true,
                        showBorders: true,
                        rowAlternationEnabled: true,
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
                                text: "Close",
                                onClick: function (e) {
                                    $scope.showBtoBGridInfo();
                                }
                            }
                        }]
                    },
                ]
            }, ]
        };
        $scope.popupBtoBGrid = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "Invoice Details",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblePopupBtoBGrid",
            },
            contentTemplate: 'GridcontentBtoB'
        };
        $scope.visiblePopupBtoBGrid = false;
        $scope.showBtoBGridInfo = function () {
            $scope.visiblePopupBtoBGrid = !$scope.visiblePopupBtoBGrid;
        };
        //#endregion 
        $scope.ShowB2BHistoryLoadingPanal = function () {
            $scope.closeOnOutsideClick = false;
            $scope.showIndicator = true;
            $scope.showPane = false;
            $scope.shading = false;
            $scope.d2bHistoryloadOptions = {
                shadingColor: "rgba(0,0,0,0.4)",
                message: "loading...",
                width: 500,
                bindingOptions:
                {
                    visible: "loadingB2BHistoryVisible",
                    showIndicator: "showIndicator",
                    showPane: "showPane",
                    shading: "shading",
                    closeOnOutsideClick: "closeOnOutsideClick"
                }
            };
        }
        $scope.loadingB2BHistoryVisible = false;
        $scope.ShowB2BHistoryLoadingPanal();
    }
    //#region SelectBox DataSource Modal
    $scope.B2BSectionTypeModal = function (dataLog) {
        $.each(dataLog, function (i, item) {
            $scope.B2BSectionTypeModel.push(item.ValueName);
        });
    }
    $scope.GoodsServicesModal = function (dataLog) {
        $.each(dataLog, function (i, item) {
            $scope.GoodServicesModel.push(item.ValueName);
        });
    }
    $scope.CGSTRateModal = function (dataLog) {
        $.each(dataLog, function (i, item) {
            $scope.CGSTRateModel.push(item.ValueName);
        });
    }
    $scope.IGSTRateModal = function (dataLog) {
        $.each(dataLog, function (i, item) {
            $scope.IGSTRateModel.push(item.ValueName);
        });
    }
    $scope.SGSTRateModal = function (dataLog) {
        $.each(dataLog, function (i, item) {
            $scope.SGSTRateModel.push(item.ValueName);
        });
    }
    //#endregion
    //#endregion

    //#region B2C Form
    $scope.CreateB2CModal = function (dataHeader, dataB2C, dataB2CA) {
        $scope.B2CModel.length = 0;
        $.each(dataB2C, function (i, item) {
            var oData = new $scope.Classes.B2C(dataHeader[0], item);
            oData.LineType = "GST_OS_B2C_Lines";
            $scope.B2CModel.push(oData);
        });
        $.each(dataB2CA, function (i, item) {
            var oData = new $scope.Classes.B2C(dataHeader[0], item);
            oData.LineType = "GST_OS_B2CA_Lines";
            $scope.B2CModel.push(oData);
        });
        $scope.B2CModelDataSource = $scope.CreateDataSource($scope.CreateStore($scope.B2CModel));
    }
    $scope.CreateB2CHistoryModal = function (dataHeader) {
        $.each(dataHeader, function (i, item) {
            var oData = new $scope.Classes.B2CHistory(dataHeader[i]);
            $scope.B2CHistoryModel.push(oData);
        });
    }
    $scope.CreateB2CPopup = function () {
        $scope.popupFormBtoCDetails = {
            bindingOptions:
            {
                formData: 'currentRow.data'
            },
            onInitialized: function (e) {
                $scope.formInstance = e.component;
            },
            width: 1000,
            height: 'auto',
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
                    itemType: "group",
                    colSpan: 2,
                    colCount: 2,
                    items: [
                    {
                        itemType: 'group',
                        colCount: 1,
                        items: [
                        {
                            itemType: 'group',
                            colCount: 2,
                            items: [
                            {
                                dataField: 'SectionType',
                                editorType: 'dxSelectBox',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Section Type'
                                },
                                editorOptions:
                                {
                                    items: B2CSectionTypeModel,
                                    value: $scope.SectionType
                                },
                            },
                            {
                                dataField: 'TaxPayerName',
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
                                dataField: 'SupplierInvoiceNo',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Invoice No'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Invoice No'
                                }
                            },
                            {
                                dataField: 'SupplierInvoiceDate',
                                editorType: 'dxDateBox',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Invoice Date'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Invoice Date',
                                    width: '100%',
                                    displayFormat: AppSetting.AppConstant.Dateformat,
                                }
                            },
                            {
                                dataField: 'HSNSACCode',
                                colSpan: 1,
                                label:
                                {
                                    text: 'HSN/SAC'
                                },
                                editorOptions:
                                {
                                    placeholder: 'HSN/SAC'
                                }
                            }, ]
                        },
                        {
                            itemType: "group",
                            caption: 'Revised Invoice Details',
                            colCount: 2,
                            items: [
                            {
                                dataField: 'SupplierInvoiceValue',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Value'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Value'
                                }
                            },
                            {
                                dataField: 'GoodandServices',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Good/Services'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Good/Services'
                                }
                            },
                            {
                                dataField: 'OriginalInvoiceNo',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Number'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Number'
                                }
                            },
                            {
                                dataField: 'OriginalInvoiceDate',
                                editorType: 'dxDateBox',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Date'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Date',
                                    width: '100%',
                                    displayFormat: AppSetting.AppConstant.Dateformat,
                                }
                            },
                            {
                                dataField: 'HSNSACCode',
                                colSpan: 1,
                                label:
                                {
                                    text: 'HSN/SAC'
                                },
                                editorOptions:
                                {
                                    placeholder: 'HSN/SAC'
                                }
                            },
                            {
                                dataField: 'TaxableValue',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Taxable Value'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Taxable Value'
                                }
                            }, ]
                        },
                        {
                            itemType: "group",
                            caption: 'Shipping Details',
                            colCount: 2,
                            items: [
                            {
                                dataField: 'ShippingBillNo',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Bill of Export(No)'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Bill of Export(No)'
                                }
                            },
                            {
                                dataField: 'ShippingBillDate',
                                editorType: 'dxDateBox',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Bill of Export(Date)'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Bill of Export(Date)',
                                    width: '100%',
                                    displayFormat: AppSetting.AppConstant.Dateformat,
                                }
                            }, ]
                        }, ]
                    },
                    {
                        itemType: 'group',
                        colCount: 1,
                        items: [
                        {
                            itemType: "group",
                            colCount: 2,
                            items: [
                            {
                                dataField: 'TaxableValue',
                                colSpan: 2,
                                label:
                                {
                                    text: 'Taxable Value'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Taxable Value'
                                }
                            },
                            {
                                dataField: 'CGST_Rate',
                                editorType: 'dxSelectBox',
                                colSpan: 1,
                                label:
                                {
                                    text: 'CGST'
                                },
                                editorOptions:
                                {
                                    items: TaxRateModel,
                                    value: $scope.CGST_Rate
                                }
                            },
                            {
                                dataField: 'CGST_Amount',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Amount'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Amount'
                                }
                            },
                            {
                                dataField: 'SGST_Rate',
                                editorType: 'dxSelectBox',
                                colSpan: 1,
                                label:
                                {
                                    text: 'SGST'
                                },
                                editorOptions:
                                {
                                    items: TaxRateModel,
                                    value: $scope.CGST_Rate
                                }
                            },
                            {
                                dataField: 'SGST_Amount',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Amount'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Amount'
                                }
                            },
                            {
                                dataField: 'IGST_Rate',
                                editorType: 'dxSelectBox',
                                colSpan: 1,
                                label:
                                {
                                    text: 'IGST'
                                },
                                editorOptions:
                                {
                                    items: TaxRateModel,
                                    value: $scope.CGST_Rate
                                }
                            },
                            {
                                dataField: 'IGST_Amount',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Amount'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Amount'
                                }
                            }, ]
                        },
                        {
                            itemType: "group",
                            caption: 'Supply Information',
                            colCount: 2,
                            items: [
                            {
                                dataField: 'POS',
                                colSpan: 1,
                                label:
                                {
                                    text: 'POS'
                                },
                                editorOptions:
                                {
                                    placeholder: 'POS'
                                }
                            },
                            {
                                dataField: 'GrossSuppliesValue',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Gross Value of Supplies'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Gross Value of Supplies'
                                }
                            },
                            {
                                colSpan: 2,
                                datafield: 'ProvisionalAssessment',
                                editorType: "dxCheckBox",
                                editorOptions:
                                {
                                    text: "Tax on this supply is paid under provisional assessment",
                                }
                            }, ]
                        },
                        {
                            itemType: "group",
                            caption: 'E-Commerce Information',
                            colCount: 2,
                            items: [
                            {
                                dataField: 'EcommerceOperatorGSTIN',
                                colSpan: 1,
                                label:
                                {
                                    text: 'GSTIN'
                                },
                                editorOptions:
                                {
                                    placeholder: 'GSTIN'
                                }
                            },
                            {
                                dataField: 'IssuedEcommerceMerchantId',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Merchant ID'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Merchant ID'
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
                                if ($scope.existingRowEditingMode == false) {
                                    $scope.SaveEntity($scope.currentRow.data, $scope.B2CModelDataSource._store, $scope.B2CModelDataSource, AppCommon.EntityType.GST_OS_Header, $scope.SetB2CLine($scope.currentRow.data, "Insert"));
                                }
                                else {
                                    $scope.UpdateRecord($scope.currentRow.key, $scope.currentRow.data, $scope.B2CModelDataSource._store, $scope.B2CModelDataSource);
                                }
                                $scope.showBtoCDetailsInfo();
                            }
                        }
                    }]
                }, ]
            }, ]
        };
        $scope.popupBtoCOptions = {
            width: 'auto',
            height: 'auto',
            scrollingEnabled: true,
            showTitle: true,
            title: "B2C",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visibleBtoCPopup",
            },
            contentTemplate: 'BtoCDetailscontent'
        };
        $scope.visibleBtoCPopup = false;
        $scope.showBtoCDetailsInfo = function () {
            $scope.visibleBtoCPopup = !$scope.visibleBtoCPopup;
        };
    }
    $scope.CreateB2CHistoryPopup = function () {
        $scope.popupFormgridBtoC = {
            formData:
            {},
            width: 1000,
            height: 'auto',
            scrollingEnabled: true,
            colCount: 1,
            colSpan: 1,
            labelLocation: "top",
            items: [
            {
                itemType: "group",
                colSpan: 1,
                items: [
                    {
                        colSpan: 1,
                        template: 'button_acceptrejectB2C'
                    },
                    {
                        itemType: "empty",
                        colCount: 12,
                        colSpan: 2,
                    },
                    {
                        template: 'BtoCGridTemplate'
                    },
                    $scope.BtoCgridSettings = {
                        bindingOptions:
                        {
                            dataSource: 'B2CHistoryModel'
                        },
                        sorting:
                        {
                            mode: 'none'
                        },
                        paging:
                        {
                            pageSize: AppSetting.AppConstant.PageSize,
                        },
                        pager:
                        {
                            showNavigationButtons: true
                        },
                        width: 'auto',
                        height: 350,
                        columns: [
                        {
                            caption: 'SectionType',
                            dataField: 'Section Type'
                        },
                        {
                            caption: 'GSTIN/UIN of Recipient',
                            dataField: 'EcommerceOperatorGSTIN',
                            width: 150
                        },
                        {
                            caption: 'Invoice No',
                            dataField: 'SupplierInvoiceNo'
                        },
                        {
                            caption: 'Invoice Date',
                            dataField: 'SupplierInvoiceDate',
                            dataType: 'date',
                            format: AppSetting.AppConstant.Dateformat
                        },
                        {
                            caption: 'HSN/SAC',
                            dataField: 'HSNSACCode'
                        },
                        {
                            caption: 'Taxable Value',
                            dataField: 'TaxableValue'
                        },
                        {
                            caption: 'Shipping Bill / Bill of Export(No)',
                            dataField: 'ShippingBillNo',
                            width: 150
                        },
                        {
                            caption: 'Shipping Bill / Bill of Export(Date)',
                            dataField: 'ShippingBillDate',
                            dataType: 'date',
                            format: AppSetting.AppConstant.Dateformat,
                            width: 150
                        },
                        {
                            headerCellTemplate: function (container) {
                                container.append($("<div style='text-align: right;padding-right: 33%;'>CGST</div>"));
                            },
                            columns: [
                            {
                                caption: "Rate",
                                dataField: "CGST_Rate",
                                format:
                                {
                                    type: 'fixedPoint'
                                },
                            },
                            {
                                caption: "Amount",
                                dataField: "CGST_Amount",
                                format:
                                {
                                    type: 'fixedPoint',
                                    precision: 2
                                },
                            }]
                        },
                        {
                            headerCellTemplate: function (container) {
                                container.append($("<div style='text-align: right;padding-right: 33%;'>SGST</div>"));
                            },
                            columns: [
                            {
                                caption: "Rate",
                                dataField: "SGST_Rate",
                                format:
                                {
                                    type: 'fixedPoint'
                                },
                            },
                            {
                                caption: "Amount",
                                dataField: "SGST_Amount",
                                format:
                                {
                                    type: 'fixedPoint',
                                    precision: 2
                                },
                            }]
                        },
                        {
                            headerCellTemplate: function (container) {
                                container.append($("<div style='text-align: right;padding-right: 33%;'>IGST</div>"));
                            },
                            columns: [
                            {
                                caption: "Rate",
                                dataField: "IGST_Rate",
                                format:
                                {
                                    type: 'fixedPoint'
                                },
                            },
                            {
                                caption: "Amount",
                                dataField: "IGST_Amount",
                                format:
                                {
                                    type: 'fixedPoint',
                                    precision: 2
                                },
                            }]
                        }, ],
                        columnAutoWidth: true,
                        wordWrapEnabled: true,
                        showColumnLines: false,
                        showRowLines: true,
                        showBorders: true,
                        rowAlternationEnabled: true,
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
                                text: "Close",
                                onClick: function (e) {
                                    $scope.showBtoCGridInfo();
                                }
                            }
                        }]
                    },
                ]
            }, ]
        };
        $scope.popupBtoCGrid = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "Invoice Details",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblePopupBtoCGrid",
            },
            contentTemplate: 'GridcontentBtoC'
        };
        $scope.visiblePopupBtoCGrid = false;
        $scope.showBtoCGridInfo = function () {
            $scope.visiblePopupBtoCGrid = !$scope.visiblePopupBtoCGrid;
        };
    }
    //#region Selectbox DataSource Modal
    $scope.B2CSectionTypeModal = function (sData) {
        $.each(sData, function (i, item) {
            $scope.B2CSectionTypeModel.push(item.ValueName);
        });
    }
    //#endregion
    //#endregion

    //#region CNDN Form
    $scope.CreateCNDNModal = function (dataHeader, dataCDN, dataCDNA) {
        $scope.CNDNModel.length = 0;
        $.each(dataCDN, function (i, item) {
            var oData = new $scope.Classes.CNDN(dataHeader[0], item);
            oData.LineType = "GST_OS_CDN";
            $scope.CNDNModel.push(oData);
        });
        $.each(dataCDNA, function (i, item) {
            var oData = new $scope.Classes.CNDN(dataHeader[0], item);
            oData.LineType = "GST_OS_CDNA";
            $scope.CNDNModel.push(oData);
        });
        $scope.CNDNModelDataSource = $scope.CreateDataSource($scope.CreateStore($scope.CNDNModel));
    }
    $scope.CreateCNDNHistoryModal = function (dataHeader) {
        $.each(dataHeader, function (i, item) {
            var oData = new $scope.Classes.CNDNHistory(dataHeader[i]);
            $scope.CNDNHistoryModel.push(oData);
        });
    }
    $scope.CreateCNDNPopup = function () {
        $scope.popupFormCNDN = {
            bindingOptions:
            {
                formData: 'currentRow.data'
            },
            onInitialized: function (e) {
                $scope.formInstance = e.component;
            },
            width: 1000,
            height: 'auto',
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
                    itemType: "group",
                    colSpan: 2,
                    colCount: 2,
                    items: [
                    {
                        itemType: 'group',
                        colCount: 1,
                        items: [
                        {
                            itemType: 'group',
                            colCount: 3,
                            items: [
                            {
                                dataField: 'SectionType',
                                editorType: 'dxSelectBox',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Section Type'
                                },
                                editorOptions:
                                {
                                    items: CNDNSectionTypeModel,
                                    value: $scope.SectionType
                                },
                            },
                            {
                                dataField: 'CDNIssueReason',
                                editorType: 'dxSelectBox',
                                colSpan: 2,
                                label:
                                {
                                    text: 'Description'
                                },
                                editorOptions:
                                {
                                    dataSource: DescriptionModel,
                                    displayExpr: "Name",
                                    valueExpr: "ID",
                                    placeholder: 'Description'
                                }
                            },
                            {
                                dataField: 'CounterPartyGSTINOrUIN',
                                colSpan: 3,
                                label:
                                {
                                    text: 'GSTIN/UIN of Recipient'
                                },
                                editorOptions:
                                {
                                    placeholder: 'GSTIN/UIN of Recipient'
                                }
                            },
                            {
                                dataField: 'CDNType',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Debit/Credit Details'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Type of Note'
                                }
                            },
                            {
                                dataField: 'CDNNo',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Debit/Credit No'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Name'
                                }
                            },
                            {
                                dataField: 'CDNDate',
                                editorType: 'dxDateBox',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Debit/Credit Date'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Debit/Credit Date',
                                    width: '100%',
                                    displayFormat: AppSetting.AppConstant.Dateformat,
                                }
                            },
                            {
                                dataField: 'OriginalInvoiceNo',
                                colSpan: 2,
                                label:
                                {
                                    text: 'Invoice No'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Invoice No'
                                }
                            },
                            {
                                dataField: 'InvoiceDate',
                                editorType: 'dxDateBox',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Invoice Date'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Invoice Date',
                                    width: '100%',
                                    displayFormat: AppSetting.AppConstant.Dateformat,
                                }
                            },
                            {
                                dataField: 'DifferentialValue',
                                colSpan: 2,
                                label:
                                {
                                    text: 'Differential Value(plus or minus)'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Differential Value(plus or minus)'
                                }
                            }, ]
                        }, ]
                    },
                    {
                        itemType: 'group',
                        colCount: 1,
                        items: [
                        {
                            itemType: "group",
                            colCount: 2,
                            items: [
                            {
                                dataField: 'CGST_Rate',
                                editorType: 'dxSelectBox',
                                colSpan: 1,
                                label:
                                {
                                    text: 'CGST'
                                },
                                editorOptions:
                                {
                                    items: TaxRateModel,
                                    value: $scope.CGST_Rate
                                }
                            },
                            {
                                dataField: 'CGST_Amount',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Amount'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Amount'
                                }
                            },
                            {
                                dataField: 'SGST_Rate',
                                editorType: 'dxSelectBox',
                                colSpan: 1,
                                label:
                                {
                                    text: 'SGST'
                                },
                                editorOptions:
                                {
                                    items: TaxRateModel,
                                    value: $scope.CGST_Rate
                                }
                            },
                            {
                                dataField: 'SGST_Amount',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Amount'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Amount'
                                }
                            },
                            {
                                dataField: 'IGST_Rate',
                                editorType: 'dxSelectBox',
                                colSpan: 1,
                                label:
                                {
                                    text: 'IGST'
                                },
                                editorOptions:
                                {
                                    items: TaxRateModel,
                                    value: $scope.CGST_Rate
                                }
                            },
                            {
                                dataField: 'IGST_Amount',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Amount'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Amount'
                                }
                            }, ]
                        },
                        {
                            itemType: "group",
                            caption: 'Credit Debit Revised Details',
                            colCount: 2,
                            items: [
                            {
                                dataField: 'OriginalCDNNo',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Note Number'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Note Number'
                                }
                            },
                            {
                                dataField: 'OriginalCDNDate',
                                editorType: 'dxDateBox',
                                colSpan: 1,
                                label:
                                {
                                    text: 'Debit/Credit Date'
                                },
                                editorOptions:
                                {
                                    placeholder: 'Debit/Credit Date',
                                    width: '100%',
                                    displayFormat: AppSetting.AppConstant.Dateformat,
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
                                if ($scope.existingRowEditingMode == false) {
                                    $scope.SaveEntity($scope.currentRow.data, $scope.CNDNModelDataSource._store, $scope.CNDNModelDataSource, AppCommon.EntityType.GST_OS_Header, $scope.SetCDNLine($scope.currentRow.data, "Insert"));
                                }
                                else {
                                    $scope.UpdateRecord($scope.currentRow.key, $scope.currentRow.data, $scope.CNDNModelDataSource._store, $scope.CNDNModelDataSource);
                                }
                                $scope.showCNDNInfo();
                            }
                        }
                    }]
                }, ]
            }, ]
        };
        $scope.popupCNDN = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "CNDN Details",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblePopupCNDN",
            },
            contentTemplate: 'CNDNcontent'
        };
        $scope.visiblePopupCNDN = false;
        $scope.showCNDNInfo = function () {
            $scope.visiblePopupCNDN = !$scope.visiblePopupCNDN;
        };
    }
    $scope.CreateCNDNHistoryPopup = function () {
        $scope.popupFormCNDNgrid = {
            formData:
            {},
            width: 1000,
            height: 'auto',
            scrollingEnabled: true,
            colCount: 1,
            colSpan: 1,
            labelLocation: "top",
            items: [
            {
                itemType: "group",
                colSpan: 1,
                items: [
                    {
                        colSpan: 1,
                        template: 'button_acceptrejectCNDN'
                    },
                    {
                        itemType: "empty",
                        colCount: 12,
                        colSpan: 2,
                    },
                    {
                        template: 'CNDNGridTemplate'
                    },
                    $scope.CNDNgridSettings = {
                        bindingOptions:
                        {
                            dataSource: 'CNDNHistoryModel'
                        },
                        sorting:
                        {
                            mode: 'none'
                        },
                        paging:
                        {
                            pageSize: AppSetting.AppConstant.PageSize,
                        },
                        pager:
                        {
                            showNavigationButtons: true
                        },
                        width: 'auto',
                        height: 350,
                        columns: [
                        {
                            caption: 'SectionType',
                            dataField: 'Section Type'
                        },
                        {
                            caption: "Description",
                            dataField: 'Description'
                        },
                        {
                            caption: "GSTIN/UIN of Recipient",
                            dataField: 'CounterPartyGSTINOrUIN',
                            width: 150
                        },
                        {
                            caption: "Type of Note(Debit/Credit)",
                            dataField: 'CDNType'
                        },
                        {
                            caption: "Debit/Credit No",
                            dataField: 'CDNNo'
                        },
                        {
                            caption: "Invoice No",
                            dataField: 'OriginalInvoiceNo'
                        },
                        {
                            caption: "Invoice Date",
                            dataField: 'InvoiceDate',
                            format: AppSetting.AppConstant.Dateformat,
                            dataType: 'date'
                        },
                        {
                            caption: "Differential Value(Plus or minus)",
                            dataField: 'DifferentialValue',
                            width: 150
                        },
                        {
                            headerCellTemplate: function (container) {
                                container.append($("<div style='text-align: right;padding-right: 33%;'>CGST</div>"));
                            },
                            columns: [
                            {
                                caption: "Rate",
                                dataField: "CGST_Rate",
                                format:
                                {
                                    type: 'fixedPoint'
                                },
                            },
                            {
                                caption: "Amount",
                                dataField: "CGST_Amount",
                                format:
                                {
                                    type: 'fixedPoint',
                                    precision: 2
                                },
                            }]
                        },
                        {
                            headerCellTemplate: function (container) {
                                container.append($("<div style='text-align: right;padding-right: 33%;'>SGST</div>"));
                            },
                            columns: [
                            {
                                caption: "Rate",
                                dataField: "SGST_Rate",
                                format:
                                {
                                    type: 'fixedPoint'
                                },
                            },
                            {
                                caption: "Amount",
                                dataField: "SGST_Amount",
                                format:
                                {
                                    type: 'fixedPoint',
                                    precision: 2
                                },
                            }]
                        },
                        {
                            headerCellTemplate: function (container) {
                                container.append($("<div style='text-align: right;padding-right: 33%;'>IGST</div>"));
                            },
                            columns: [
                            {
                                caption: "Rate",
                                dataField: "IGST_Rate",
                                format:
                                {
                                    type: 'fixedPoint'
                                },
                            },
                            {
                                caption: "Amount",
                                dataField: "IGST_Amt",
                                format:
                                {
                                    type: 'fixedPoint',
                                    precision: 2
                                },
                            }]
                        }, ],
                        columnAutoWidth: true,
                        wordWrapEnabled: true,
                        showColumnLines: false,
                        showRowLines: true,
                        showBorders: true,
                        rowAlternationEnabled: true,
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
                                text: "Close",
                                onClick: function (e) {
                                    $scope.showCNDNGridInfo();
                                }
                            }
                        }]
                    },
                ]
            }, ]
        };
        $scope.popupCNDNGrid = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "Invoice Details",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblePopupCNDNGrid",
            },
            contentTemplate: 'GridcontentCNDN'
        };
        $scope.visiblePopupCNDNGrid = false;
        $scope.showCNDNGridInfo = function () {
            $scope.visiblePopupCNDNGrid = !$scope.visiblePopupCNDNGrid;
        };
    }
    //#region SelectBox DataSource Modal
    $scope.CDNSectionTypeModal = function (sData) {
        $.each(sData, function (i, item) {
            $scope.CDNSectionTypeModel.push(item.ValueName);
        });
    }
    $scope.CDNDescriptionModal = function (sData) {
        $.each(sData, function (i, item) {
            $scope.CDNSectionTypeModel.push(item.ValueName);
        });
    }
    //#endregion
    //#endregion

    //#region Tax On Advance Form
    $scope.CreateTaxPaidModal = function (dataHeader, dataTaxPaid) {
        $scope.TaxPaidModel.length = 0;
        $.each(dataTaxPaid, function (i, item) {
            var oData = new $scope.Classes.TaxPaid(dataHeader[0], item);
            oData.LineType = "GST_OS_TaxPaid";
            $scope.TaxPaidModel.push(oData);
        });
        $scope.TaxData = $scope.CreateDataSource($scope.CreateStore($scope.TaxPaidModel));
    }
    $scope.CreateTaxPaidHistoryModal = function (dataHeader) {
        $.each(dataHeader, function (i, item) {
            var oData = new $scope.Classes.TaxPaidHistory(dataHeader[i]);
            $scope.TaxPaidHistoryModel.push(oData);
        });
    }
    $scope.CreateAdvanceTaxPopup = function () {
        $scope.popupTaxPaidOnAdvance = {
            bindingOptions:
            {
                formData: 'currentRow.data'
            },
            onInitialized: function (e) {
                $scope.formInstance = e.component;
            },
            width: 500,
            height: 'auto',
            scrollingEnabled: true,
            colCount: 1,
            labelLocation: "top",
            items: [
            {
                itemType: "group",
                colCount: 1,
                items: [
                {
                    itemType: 'group',
                    caption: 'Invoice Details',
                    colCount: 2,
                    items: [
                    {
                        dataField: 'SectionType',
                        editorType: 'dxSelectBox',
                        colSpan: 1,
                        label:
                        {
                            text: 'Section Type'
                        },
                        editorOptions:
                        {
                            items: TaxOnAdvSectionTypeModel,
                            value: $scope.SectionType
                        },
                    },
                    {
                        dataField: 'SupplierInvoiceNo',
                        colSpan: 1,
                        label:
                        {
                            text: 'Invoice No'
                        },
                        editorOptions:
                        {
                            placeholder: 'Invoice No'
                        }
                    },
                    {
                        dataField: 'TransactionID',
                        colSpan: 1,
                        label:
                        {
                            text: 'Transaction ID'
                        },
                        editorOptions:
                        {
                            placeholder: 'Transaction ID'
                        }
                    }, ]
                },
                {
                    itemType: "group",
                    caption: 'Tax Details',
                    colCount: 2,
                    items: [
                    {
                        dataField: 'CGST_Rate',
                        editorType: 'dxSelectBox',
                        colSpan: 1,
                        label:
                        {
                            text: 'CGST'
                        },
                        editorOptions:
                        {
                            items: TaxRateModel,
                            value: $scope.CGST_Rate
                        }
                    },
                    {
                        dataField: 'CGST_Tax',
                        colSpan: 1,
                        label:
                        {
                            text: 'Amount'
                        },
                        editorOptions:
                        {
                            placeholder: 'Amount'
                        }
                    },
                    {
                        dataField: 'SGST_Rate',
                        editorType: 'dxSelectBox',
                        colSpan: 1,
                        label:
                        {
                            text: 'SGST'
                        },
                        editorOptions:
                        {
                            items: TaxRateModel,
                            value: $scope.SGST_Rate
                        }
                    },
                    {
                        dataField: 'SGST_Tax',
                        colSpan: 1,
                        label:
                        {
                            text: 'Amount'
                        },
                        editorOptions:
                        {
                            placeholder: 'Amount'
                        }
                    },
                    {
                        dataField: 'IGST_Rate',
                        editorType: 'dxSelectBox',
                        colSpan: 1,
                        label:
                        {
                            text: 'IGST'
                        },
                        editorOptions:
                        {
                            items: TaxRateModel,
                            value: $scope.IGST_Rate
                        }
                    },
                    {
                        dataField: 'IGST_Tax',
                        colSpan: 1,
                        label:
                        {
                            text: 'Amount'
                        },
                        editorOptions:
                        {
                            placeholder: 'Amount'
                        }
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
                                if ($scope.existingRowEditingMode == false) {;
                                    $scope.SaveEntity($scope.currentRow.data, $scope.TaxData._store, $scope.TaxData, AppCommon.EntityType.GST_OS_Header, $scope.SetGSTRTaxPaidLine($scope.currentRow.data, "Insert"));
                                }
                                else {
                                    $scope.UpdateRecord($scope.currentRow.key, $scope.currentRow.data, $scope.TaxData._store, $scope.TaxData);
                                }
                                $scope.showTaxPaidOnAdvanceInfo();
                            }
                        }
                    }]
                }, ]
            }, ]
        };
        $scope.popupTaxPaidOnAdvanceOption = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "Tax On Advance",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblePopupTaxPaidOnAdvance",
            },
            contentTemplate: 'TaxPaidOnAdvancecontent'
        };
        $scope.visiblePopupTaxPaidOnAdvance = false;
        $scope.showTaxPaidOnAdvanceInfo = function () {
            $scope.visiblePopupTaxPaidOnAdvance = !$scope.visiblePopupTaxPaidOnAdvance;
        };
    }
    $scope.CreateAdvanceTaxHistoryPopup = function () {
        $scope.popupFormTaxOnAdvancegrid = {
            formData:
            {},
            width: 1000,
            height: 'auto',
            scrollingEnabled: true,
            colCount: 1,
            colSpan: 1,
            labelLocation: "top",
            items: [
            {
                itemType: "group",
                colSpan: 1,
                items: [
                    {
                        colSpan: 1,
                        template: 'button_acceptrejectTaxOnAdvance'
                    },
                    {
                        itemType: "empty",
                        colCount: 12,
                        colSpan: 2,
                    },
                    {
                        template: 'TaxOnAdvanceGridTemplate'
                    },
                    $scope.TaxOnAdvancegridSettings = {
                        bindingOptions:
                        {
                            dataSource: 'TaxPaidHistoryModel'
                        },
                        sorting:
                        {
                            mode: 'none'
                        },
                        paging:
                        {
                            pageSize: AppSetting.AppConstant.PageSize,
                        },
                        pager:
                        {
                            showNavigationButtons: true
                        },
                        width: 'auto',
                        height: 350,
                        columns: [
                        {
                            caption: 'SectionType',
                            dataField: 'Section Type'
                        },
                        {
                            caption: 'Invoice No',
                            dataField: 'SupplierInvoiceNo'
                        },
                        {
                            caption: 'Transaction ID',
                            dataField: 'TransactionID'
                        },
                        {
                            headerCellTemplate: function (container) {
                                container.append($("<div style='text-align: right;padding-right: 33%;'>CGST</div>"));
                            },
                            columns: [
                            {
                                caption: "Rate",
                                dataField: "CGST_Rate",
                                format:
                                {
                                    type: 'fixedPoint',
                                },
                            },
                            {
                                caption: "Amount",
                                dataField: "CGST_Tax",
                                format:
                                {
                                    type: 'fixedPoint',
                                    precision: 2
                                },
                            }]
                        },
                        {
                            headerCellTemplate: function (container) {
                                container.append($("<div style='text-align: right;padding-right: 33%;'>SGST</div>"));
                            },
                            columns: [
                            {
                                caption: "Rate",
                                dataField: "SGST_Rate",
                                format:
                                {
                                    type: 'fixedPoint',
                                },
                            },
                            {
                                caption: "Amount",
                                dataField: "SGST_Tax",
                                format:
                                {
                                    type: 'fixedPoint',
                                    precision: 2
                                },
                            }]
                        },
                        {
                            headerCellTemplate: function (container) {
                                container.append($("<div style='text-align: right;padding-right: 33%;'>IGST</div>"));
                            },
                            columns: [
                            {
                                caption: "Rate",
                                dataField: "IGST_Rate",
                                format:
                                {
                                    type: 'fixedPoint',
                                },
                            },
                            {
                                caption: "Amount",
                                dataField: "IGST_Tax",
                                format:
                                {
                                    type: 'fixedPoint',
                                    precision: 2
                                },
                            }]
                        }, ],
                        columnAutoWidth: true,
                        wordWrapEnabled: true,
                        showColumnLines: false,
                        showRowLines: true,
                        showBorders: true,
                        rowAlternationEnabled: true,
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
                                text: "Close",
                                onClick: function (e) {
                                    $scope.showTaxOnAdvanceGridGridInfo();
                                }
                            }
                        }]
                    },
                ]
            }, ]
        };
        $scope.popupTaxOnAdvanceGridOption = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "Import Data",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblePopupTaxOnAdvanceGrid",
            },
            contentTemplate: 'GridcontentTaxOnAdvance'
        };
        $scope.visiblePopupTaxOnAdvanceGrid = false;
        $scope.showTaxOnAdvanceGridGridInfo = function () {
            $scope.visiblePopupTaxOnAdvanceGrid = !$scope.visiblePopupTaxOnAdvanceGrid;
        };
    }
    //#region SelectBox DataSource Modal
    $scope.TaxOnAdvanceSectionTypeModal = function (sData) {
        $.each(sData, function (i, item) {
            $scope.TaxOnAdvanceSectionTypeModel.push(item.ValueName);
        });
    }
    //#endregion
    //#endregion

    //#region Other Form
    $scope.CreateOtherModal = function (dataHeader, dataOther) {
        $scope.OtherModel.length = 0;
        $.each(dataOther, function (i, item) {
            var oData = new $scope.Classes.Other(dataHeader[0], item);
            oData.LineType = "GST_OS_NilOrExempted";
            $scope.OtherModel.push(oData);
        });
        $scope.OtherModelDataSource = $scope.CreateDataSource($scope.CreateStore($scope.OtherModel));
    }
    $scope.CreateOtherHistoryModal = function (dataHeader) {
        $.each(dataHeader, function (i, item) {
            var oData = new $scope.Classes.OtherHistory(dataHeader[i], item);
            $scope.OtherHistoryModel.push(oData);
        });
    }
    $scope.CreateOthersPopup = function () {
        $scope.popupother = {
            bindingOptions:
            {
                formData: 'currentRow.data'
            },
            onInitialized: function (e) {
                $scope.formInstance = e.component;
            },
            width: 600,
            height: 'auto',
            colCount: 2,
            colSpan: 2,
            labelLocation: "top",
            items: [
            {
                itemType: 'group',
                caption: 'Other Details',
                colCount: 2,
                colSpan: 2,
                items: [
                {
                    dataField: 'SectionType',
                    editorType: 'dxSelectBox',
                    colSpan: 1,
                    label:
                    {
                        text: 'Section Type'
                    },
                    editorOptions:
                    {
                        items: OthersSectionTypeModel,
                        value: $scope.SectionType
                    },
                },
                {
                    dataField: 'SupplyType',
                    editorType: 'dxSelectBox',
                    colSpan: 1,
                    label:
                    {
                        text: 'Supply Type'
                    },
                    editorOptions:
                    {
                        items: SupplyTypeModel,
                        value: ""
                    },
                },
                {
                    dataField: 'GoodsService',
                    colSpan: 1,
                    label:
                    {
                        text: 'Goods/Services'
                    },
                    editorOptions:
                    {
                        placeholder: 'Goods/Services'
                    }
                },
                {
                    dataField: 'NilRatedSuppliesValue',
                    colSpan: 1,
                    label:
                    {
                        text: 'Nil Rated (Amount)'
                    },
                    editorOptions:
                    {
                        placeholder: 'Nil Rated (Amount)'
                    }
                },
                {
                    dataField: 'ExemptedSuppliesValue',
                    colSpan: 1,
                    label:
                    {
                        text: 'Exempted (Amount)'
                    },
                    editorOptions:
                    {
                        placeholder: 'Exempted (Amount)'
                    }
                },
                {
                    dataField: 'NonGSTSuppliesValue',
                    colSpan: 1,
                    label:
                    {
                        text: 'Non GST Supplies (Amount)'
                    },
                    editorOptions:
                    {
                        placeholder: 'Non GST Supplies (Amount)'
                    }
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
                                if ($scope.existingRowEditingMode == false) {
                                    $scope.SaveEntity($scope.currentRow.data, $scope.OtherModelDataSource._store, $scope.OtherModelDataSource, AppCommon.EntityType.GST_OS_Header, $scope.SetGSTROSNilExemptedLine($scope.currentRow.data, "Insert"));
                                }
                                else {
                                    $scope.UpdateRecord($scope.currentRow.key, $scope.currentRow.data, $scope.OtherModelDataSource._store, OtherModelDataSource);
                                }
                                $scope.showotherInfo();
                            }
                        }
                    }]
                }, ]
            }, ]
        };
        $scope.popupOtherOption = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "Others",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblepopupOtherOption",
            },
            contentTemplate: 'Othercontent'
        };
        $scope.visiblepopupOtherOption = false;
        $scope.showotherInfo = function () {
            $scope.visiblepopupOtherOption = !$scope.visiblepopupOtherOption;
        };
    }
    $scope.CreateOtherHistoryPopup = function () {
        $scope.popupFormgridOther = {
            formData:
            {},
            width: 1000,
            height: 'auto',
            scrollingEnabled: true,
            colCount: 1,
            colSpan: 1,
            labelLocation: "top",
            items: [
            {
                itemType: "group",
                colSpan: 1,
                items: [
                    {
                        colSpan: 1,
                        template: 'button_acceptrejectOther'
                    },
                    {
                        itemType: "empty",
                        colCount: 12,
                        colSpan: 2,
                    },
                    {
                        template: 'OtherGridTemplate'
                    },
                    $scope.OthergridSettings = {
                        bindingOptions:
                        {
                            dataSource: 'OtherHistoryModel'
                        },
                        sorting:
                        {
                            mode: 'none'
                        },
                        paging:
                        {
                            pageSize: AppSetting.AppConstant.PageSize,
                        },
                        pager:
                        {
                            showNavigationButtons: true
                        },
                        width: 'auto',
                        height: 350,
                        columns: [
                        {
                            caption: 'SectionType',
                            dataField: 'Section Type'
                        },
                        {
                            caption: 'Supply Type',
                            dataField: 'SupplyType'
                        },
                        {
                            caption: "Goods/Services",
                            dataField: 'GoodsService'
                        },
                        {
                            caption: "Nil Rated (Amount)",
                            dataField: 'NilRatedSuppliesValue'
                        },
                        {
                            caption: "Exempted (Amount)",
                            dataField: 'ExemptedSuppliesValue'
                        },
                        {
                            caption: "Non GST Supplies(Amount)",
                            dataField: 'NonGSTSuppliesValue'
                        }, ],
                        columnAutoWidth: true,
                        wordWrapEnabled: true,
                        showColumnLines: false,
                        showRowLines: true,
                        showBorders: true,
                        rowAlternationEnabled: true,
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
                                text: "Close",
                                onClick: function (e) {
                                    $scope.showOtherGridInfo();
                                }
                            }
                        }]
                    },
                ]
            }, ]
        };
        $scope.popupOtherGrid = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "Other Invoice Details",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblePopupOtherGrid",
            },
            contentTemplate: 'GridcontentOther'
        };
        $scope.visiblePopupOtherGrid = false;
        $scope.showOtherGridInfo = function () {
            $scope.visiblePopupOtherGrid = !$scope.visiblePopupOtherGrid;
        };
    }
    //#region SelectBox DataSource Modal
    $scope.OtherSectionTypeModal = function (sData) {
        $.each(sData, function (i, item) {
            $scope.OtherSectionTypeModel.push(item.ValueName);
        });
    }
    $scope.OtherSupplyTypeModal = function (sData) {
        $.each(sData, function (i, item) {
            $scope.OtherSupplyTypeModel.push(item.ValueName);
        });
    }
    //#endregion
    //#endregion

    //#region Invoice Summary Form  
    $scope.CreateInvSumModal = function (dataHeader, dataInvSum) {
        $scope.InvSumModel.length = 0;
        $.each(dataInvSum, function (i, item) {
            var oData = new $scope.Classes.InvSum(dataHeader[0], item);
            oData.LineType = "GST_IS_ReverseCharge";
            $scope.InvSumModel.push(oData);
        });
        $scope.InvSumModelDataSource = $scope.CreateDataSource($scope.CreateStore($scope.InvSumModel));
    }
    $scope.CreateInvoiceSummaryPopup = function () {
        $scope.popupInvoiceSummary = {
            bindingOptions:
            {
                formData: 'currentRow.data'
            },
            onInitialized: function (e) {
                $scope.formInstance = e.component;
            },
            width: 500,
            height: 'auto',
            //scrollingEnabled: true,
            colCount: 2,
            colSpan: 2,
            labelLocation: "top",
            items: [
            {
                itemType: 'group',
                caption: 'Invoice Details',
                colCount: 2,
                colSpan: 2,
                items: [
                {
                    dataField: 'SectionType',
                    editorType: 'dxSelectBox',
                    colSpan: 1,
                    label:
                    {
                        text: 'Section Type'
                    },
                    editorOptions:
                    {
                        items: InvSumSectionTypeModel,
                        value: $scope.SectionType
                    },
                },
                {
                    dataField: 'SeriesNoOfInvoice',
                    colSpan: 1,
                    label:
                    {
                        text: 'Series number of invoices'
                    },
                    editorOptions:
                    {
                        placeholder: 'Series number of invoices'
                    }
                },
                {
                    dataField: 'From',
                    colSpan: 1,
                    label:
                    {
                        text: 'From'
                    },
                    editorOptions:
                    {
                        placeholder: 'From'
                    }
                },
                {
                    dataField: 'To',
                    colSpan: 1,
                    label:
                    {
                        text: 'To'
                    },
                    editorOptions:
                    {
                        placeholder: 'To'
                    }
                },
                {
                    dataField: 'TotalInvoiceNumber',
                    colSpan: 1,
                    label:
                    {
                        text: 'Total number of invoices'
                    },
                    editorOptions:
                    {
                        placeholder: 'Total number of invoices'
                    }
                },
                {
                    dataField: 'NumberofCancelledInvoice',
                    colSpan: 1,
                    label:
                    {
                        text: 'Number of cancelled invoices'
                    },
                    editorOptions:
                    {
                        placeholder: 'Number of cancelled invoices'
                    }
                },
                {
                    dataField: 'NetNumberIssuedInvoice',
                    colSpan: 1,
                    label:
                    {
                        text: 'Net number of invoices issued'
                    },
                    editorOptions:
                    {
                        placeholder: 'Net number of invoices issued'
                    }
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
                                if ($scope.existingRowEditingMode == false) {
                                    $scope.SaveEntity($scope.currentRow.data, $scope.InvSumModelDataSource._store, $scope.InvSumModelDataSource, AppCommon.EntityType.GST_OS_Header, $scope.SetGSTRISReverseChargeLine($scope.currentRow.data, "Insert"));
                                }
                                else {
                                    $scope.UpdateRecord($scope.currentRow.key, $scope.currentRow.data, $scope.InvSumModelDataSource._store, $scope.InvSumModelDataSource);
                                }
                                $scope.showInvoiceSummaryInfo();
                            }
                        }
                    }]
                }, ]
            }, ]
        };
        $scope.popupInvoiceSummaryOption = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "Invoice Summary",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblePopupInvoiceSummary",
            },
            contentTemplate: 'InvoiceSummarycontent'
        };
        $scope.visiblePopupInvoiceSummary = false;
        $scope.showInvoiceSummaryInfo = function () {
            $scope.visiblePopupInvoiceSummary = !$scope.visiblePopupInvoiceSummary;
        };
    }
    //#region SelectBox DataSource Modal
    $scope.InvSumSectionTypeModal = function (sData) {
        $.each(sData, function (i, item) {
            $scope.InvSumSectionTypeModel.push(item.ValueName);
        });
    }
    //#endregion
    //#endregion

    //#region SelectBox DataSource Loading Function
    $scope.LoadDatasource = function (GSTREntityType, PropertyName, PropertyValue) {
        var rData = new AppCommon.Class.EntityQueryRequest();
        rData.EntityType = GSTREntityType;
        rData.FileterConditions[0].PropertyName = PropertyName;
        rData.FileterConditions[0].PropertyValue = PropertyValue;
        rData.FileterConditions[0].PropertyDataType = "5";
        ServiceHelper.QueryEntity(rData, function (response) {
            if (response.Entitities != null) {
                $scope.LoadDataSourceSuccessCall(response.Entitities[0], PropertyValue);
            }
            else {
                DevExpress.ui.dialog.alert(response.ErrorMessage, 'Alert');
                $rootScope.loadingVisible = false;
            }
        }, function (response) {
            DevExpress.ui.dialog.alert(response, 'Alert');
            $rootScope.loadingVisible = false;
        });
    }
    $scope.LoadDataSourceSuccessCall = function (response, LoadModalType) {
        if (LoadModalType == "B2BSectionType") {
            $scope.B2BSectionTypeModal(response.Data.PickListValues);
        }
        else if (LoadModalType == "GoodsServices") {
            $scope.GoodsServicesModal(response.Data.PickListValues);
        }
        else if (LoadModalType == "CGSTRate") {
            $scope.CGSTRateModal(response.Data.PickListValues);
        }
        else if (LoadModalType == "IGSTRate") {
            $scope.IGSTRateModal(response.Data.PickListValues);
        }
        else if (LoadModalType == "SGSTRate") {
            $scope.SGSTRateModal(response.Data.PickListValues);
        }
        else if (LoadModalType == "B2CSectionType") {
            $scope.B2CSectionTypeModal(response.Data.PickListValues);
        }
        else if (LoadModalType == "CDNSectionType") {
            $scope.CDNSectionTypeModal(response.Data.PickListValues);
        }
        else if (LoadModalType == "CDNDescriptionType") {
            $scope.CDNDescriptionModal(response.Data.PickListValues);
        }
        else if (LoadModalType == "TaxOnAdvanceSectionType") {
            $scope.TaxOnAdvanceSectionTypeModal(response.Data.PickListValues);
        }
        else if (LoadModalType == "OtherSectionType") {
            $scope.OtherSectionTypeModal(response.Data.PickListValues);
        }
        else if (LoadModalType == "OtherSupplyType") {
            $scope.OtherSupplyTypeModal(response.Data.PickListValues);
        }
        else if (LoadModalType == "InvoiceSummarySectionType") {
            $scope.InvSumSectionTypeModal(response.Data.PickListValues);
        }
        $rootScope.loadingVisible = false;
    }
    //#endregion

    //#region Set Form Property
    $scope.SetB2BHeader = function () {
        var B2BHeader = {
            CompanyId: null,
            FormType: 0,
            TaxPayerGSTIN: "04AABFN9870CMZT",
            TaxPayerName: "",
            TaxPayerAddress: null,
            GrossTurnOverPreviousYear: 0,
            FinancialPeriod: 112016,
            TaxPeriodMonthId: 11,
            TaxPeriodYear: 2016,
            SubscriptionId: $scope.CurrentEntity.SubscriptionId,
            Place: null,
            SignDate: null,
            IsSubmitted: null,
            TotalTaxableAmount: 0,
            TotalInvoiceAmount: 0,
            TotalIGST: 0,
            TotalCGST: 0,
            TotalSGST: 0,
        }
        return B2BHeader;
    }
    $scope.SetB2BLine = function (oData, oType) {
        var B2BHeaderID = {
            ID: oData.HeaderID
        }
        var B2BLine = {
            CounterPartyGSTINOrUIN: oData.CounterPartyGSTINOrUIN,
            SupplierInvoiceNo: oData.SupplierInvoiceNo,
            SupplierInvoiceDate: oData.SupplierInvoiceDate,
            SupplierInvoiceValue: oData.SupplierInvoiceValue,
            GoodsService: oData.GoodsService,
            HSNSACCode: oData.HSNSACCode,
            TaxableValue: oData.TaxableValue,
            IGST_Rate: oData.IGST_Rate,
            IGST_Amount: oData.IGST_Amount,
            CGST_Rate: oData.CGST_Rate,
            CGST_Amount: oData.CGST_Amount,
            SGST_Rate: oData.SGST_Rate,
            SGST_Amount: oData.SGST_Amount,
            POS: oData.POS,
            GrossSuppliesValue: oData.GrossSuppliesValue,
            EcommerceOperatorGSTIN: oData.EcommerceOperatorGSTIN,
            IssuedEcommerceMerchantId: oData.IssuedEcommerceMerchantId,
            SubscriptionId: $scope.CurrentEntity.SubscriptionId,
            SectionType: oData.SectionType,
            ReverseCharge: $scope.CurrentEntity.ReverseCharge,
            ProvisionalAssessment: $scope.CurrentEntity.ProvisionalAssessment,
        }
        if (oType == "Insert") {
            var Property = {
                GST_OS_Header: [$scope.SetB2BHeader()],
                GST_OS_B2B_Lines: [B2BLine],
            };
        }
        else if (oType == "Update") {
            var Property = {
                GST_OS_Header: [B2BHeaderID],
                GST_OS_B2B_Lines: [B2BLine],
            };
        }
        return Property;
    }
    $scope.SetB2CLine = function (oData) {
        var B2CLine = {
            SupplierInvoiceNo: oData.SupplierInvoiceNo,
            SupplierInvoiceDate: oData.SupplierInvoiceDate,
            SupplierInvoiceValue: oData.SupplierInvoiceValue,
            GoodsService: oData.GoodsService,
            HSNSACCode: oData.HSNSACCode,
            TaxableValue: oData.TaxableValue,
            ShippingBillNo: oData.ShippingBillNo,
            ShippingBillDate: oData.ShippingBillDate,
            IGST_Rate: oData.IGST_Rate,
            IGST_Amount: oData.IGST_Amount,
            CGST_Rate: oData.CGST_Rate,
            CGST_Amount: oData.CGST_Amount,
            SGST_Rate: oData.SGST_Rate,
            SGST_Amount: oData.SGST_Amount,
            POS: oData.POS,
            ProvisionalAssessment: oData.ProvisionalAssessment,
            SerialNo: oData.SerialNo,
            EcommerceOperatorGSTIN: oData.EcommerceOperatorGSTIN,
            IssuedEcommerceMerchantId: oData.IssuedEcommerceMerchantId,
            SubscriptionId: $scope.CurrentEntity.SubscriptionId,
            SectionType: oData.SectionType,
        }
        var Property = {
            GST_OS_Header: [$scope.SetB2BHeader()],
            GST_OS_B2C_Lines: [B2CLine],
        };
        return Property;
    }
    $scope.SetCDNLine = function (oData) {
        var GSTRCDN = {
            SectionType: oData.SectionType,
            CounterPartyGSTINOrUIN: oData.CounterPartyGSTINOrUIN,
            CDNType: oData.CDNType,
            CDNNo: oData.CDNNo,
            CDNDate: oData.CDNDate,
            CDNIssueReason: oData.CDNIssueReason,
            OriginalInvoiceNo: oData.OriginalInvoiceNo,
            InvoiceDate: oData.InvoiceDate,
            DifferentialValue: oData.DifferentialValue,
            IGST_Rate: oData.IGST_Rate,
            IGST_Amount: oData.IGST_Amount,
            CGST_Rate: oData.CGST_Rate,
            CGST_Amount: oData.CGST_Amount,
            SGST_Rate: oData.SGST_Rate,
            SGST_Amount: oData.SGST_Amount,
        }
        var Property = {
            GST_OS_Header: [$scope.SetB2BHeader()],
            GST_OS_CDN: [GSTRCDN],
        };
        return Property;
    }
    $scope.SetGSTRTaxPaidLine = function (oData) {
        var GSTRTaxPaid = {
            SupplierInvoiceNo: oData.SupplierInvoiceNo,
            TransactionID: oData.TransactionID,
            IGST_Rate: oData.IGST_Rate,
            IGST_Tax: oData.IGST_Tax,
            CGST_Rate: oData.CGST_Rate,
            CGST_Tax: oData.CGST_Tax,
            SGST_Rate: oData.SGST_Rate,
            SGST_Tax: oData.SGST_Tax,
        }
        var Property = {
            GST_OS_Header: [$scope.SetB2BHeader()],
            GST_OS_TaxPaid: [GSTRTaxPaid],
        };
        return Property;
    }
    $scope.SetGSTROSNilExemptedLine = function (oData) {
        var GSTROSNilExempted = {
            SupplyType: oData.SupplyType,
            GoodsService: oData.GoodsService,
            ExemptedSuppliesValue: oData.ExemptedSuppliesValue,
            NilRatedSuppliesValue: oData.NilRatedSuppliesValue,
            NonGSTSuppliesValue: oData.NonGSTSuppliesValue,
            SectionType: oData.SectionType,
        }
        var Property = {
            GST_OS_Header: [$scope.SetB2BHeader()],
            GST_OS_NilOrExempted: [GSTROSNilExempted],
        };
        return Property;
    }
    $scope.SetGSTRISReverseChargeLine = function (oData) {
        var GSTRISReverseCharge = {
            SeriesNoOfInvoice: oData.SeriesNoOfInvoice,
            From: oData.From,
            To: oData.To,
            TotalInvoiceNumber: oData.TotalInvoiceNumber,
            NumberofCancelledInvoice: oData.NumberofCancelledInvoice,
            NetNumberIssuedInvoice: oData.NetNumberIssuedInvoice,
            SectionType: oData.SectionType,
        }
        var Property = {
            GST_OS_Header: [$scope.SetB2BHeader()],
            GST_IS_ReverseCharge: [GSTRISReverseCharge],
        };
        return Property;
    }
    //#endregion

    //#region Data Fetching and Manupulation Function
    $scope.ClearFormData = function () {
        var data = {
            SectionType: null,
            CDNIssueReason: null,
            CounterPartyGSTINOrUIN: null,
            CDNType: null,
            CDNNo: null,
            CDNDate: null,
            OriginalInvoiceNo: null,
            InvoiceDate: null,
            DifferentialValue: null,
            CGST_Rate: null,
            CGST_Amount: null,
            SGST_Rate: null,
            SGST_Amount: null,
            IGST_Rate: null,
            IGST_Amount: null,
            OriginalCDNNo: null,
            OriginalCDNDate: null,
            SupplierInvoiceNo: null,
            TransactionID: null,
            CGST_Tax: null,
            SGST_Tax: null,
            IGST_Tax: null,
            SupplyType: null,
            GoodsService: null,
            NilRatedSuppliesValue: null,
            ExemptedSuppliesValue: null,
            NonGSTSuppliesValue: null,
            SeriesNoOfInvoice: null,
            From: null,
            To: null,
            TotalInvoiceNumber: null,
            NumberofCancelledInvoice: null,
            NetNumberIssuedInvoice: null,
            SupplierInvoiceDate: null,
            OriginalInvoiceDate: null,
            SupplierInvoiceValue: null,
            HSNSACCode: null,
            TaxableValue: null,
            EcommerceOperatorGSTIN: null,
            IssuedEcommerceMerchantId: null,
            POS: null,
            GrossSuppliesValue: null,
            ReverseCharge: null,
            ProvisionalAssessment: null,
            TaxPayerName: null,
            GoodandServices: null,
            ShippingBillNo: null,
            ShippingBillDate: null,
        }
        return data
    }
    //#region Not Required Need To Remove
    $scope.SetSelectBoxDefaultValue = function (Tabtype) {
        if (Tabtype == "B2B") {
            $("#ViewB2B").dxSelectBox('option', 'value', 1)
        }
        else if (Tabtype == "B2C") {
            $("#ViewB2C").dxSelectBox('option', 'value', 1)
        }
        else if (Tabtype == "Credit/Debit Note") {
            $("#ViewCNDN").dxSelectBox('option', 'value', 1)
        }
        else if (Tabtype == "Tax On Advance") {
            $("#ViewTax").dxSelectBox('option', 'value', 1)
        }
        else if (Tabtype == "Others") {
            $("#ViewOther").dxSelectBox('option', 'value', 1)
        }
        else if (Tabtype == "Invoice Summary") {
            $("#ViewIS").dxSelectBox('option', 'value', 1)
        }
    }
    $scope.FilterDataSource = function (data) {
        if (data.value == 1) {
            if ($("#" + $scope.GetDatagridinstance(data.element.context.id)).dxDataGrid("instance")._options.dataSource != undefined) {
                $("#" + $scope.GetDatagridinstance(data.element.context.id)).dxDataGrid("instance").clearFilter();
                $scope.selectedvalue = data.value;
            }
        }
        else {
            if ($("#" + $scope.GetDatagridinstance(data.element.context.id)).dxDataGrid("instance")._options.dataSource != undefined) {
                $("#" + $scope.GetDatagridinstance(data.element.context.id)).dxDataGrid("instance").filter(["Status", "=", data.value]);
                $scope.selectedvalue = data.value;
            }
        }
    }
    $scope.ShowPopUp = function (visiblepopup) {
        if (visiblepopup == "CNDN") {
            $scope.visiblePopupCNDN = true;
        }
        else if (visiblepopup == "B2B") {
            $scope.visiblePopup = true;
        }
        else if (visiblepopup == "B2C") {
            $scope.visibleBtoCPopup = true;
        }
        else if (visiblepopup == "ADVTAXPAID") {
            $scope.visiblePopupTaxPaidOnAdvance = true;
        }
        else if (visiblepopup == "OTHER") {
            $scope.visiblepopupOtherOption = true;
        }
        else if (visiblepopup == "INVSUM") {
            $scope.visiblePopupInvoiceSummary = true;
        }
    }
    //#endregion
    $scope.LoadGridData = function (Tabtype) {
        if (Tabtype == "B2B") {
            $scope.GetResource("GSTROSB2BLine", Tabtype);
        }
        else if (Tabtype == "B2C") {
            $scope.GetResource("GSTROSB2CLine", Tabtype);
        }
        else if (Tabtype == "Credit/Debit Note") {
            $scope.GetResource("GSTRCDN", Tabtype);
        }
        else if (Tabtype == "Tax On Advance") {
            $scope.GetResource("GSTRTaxPaid", Tabtype);
        }
        else if (Tabtype == "Others") {
            $scope.GetResource("GSTROSNilExempted", Tabtype);
        }
        else if (Tabtype == "Invoice Summary") {
            $scope.GetResource("GSTRISReverseCharge", Tabtype);
        }
    }
    $scope.GetResource = function (RelationName, Tabtype) {
        var CurrentPage = $location.search();
        $scope.CurrentMonth = CurrentPage.val;
        var rData = new AppCommon.Class.EntityQueryRequest();
        rData.EntityType = AppCommon.EntityType.GST_OS_Header;
        rData.LoadAllRelations = "false";
        rData.FileterConditions[0].PropertyName = "id";
        rData.FileterConditions[0].PropertyValue = CurrentPage.Current;
        rData.FileterConditions[0].PropertyDataType = "5";
        rData.LoadRelations[0].RelationName = RelationName;
        ServiceHelper.QueryEntity(rData, function (response) {
            if (response.Entitities != null) {
                $scope.SuccessDataCall(response.Entitities[0], Tabtype);
            }
            else {
                DevExpress.ui.dialog.alert(response.ErrorMessage, 'Alert');
                $rootScope.loadingVisible = false;
            }
        }, function (response) {
            DevExpress.ui.dialog.alert(response, 'Alert');
            $rootScope.loadingVisible = false;
        });
    }
    $scope.GetHistoryResource = function (CurrentID, visiblepopup, options) {
        var rData = new AppCommon.Class.EntityQueryRequest();
        $scope.CurrentOpenHistory = {
            LineType: options.LineType,
            Id: options.ID
        };
        $scope.DisableAcceptReject = options.Status == AppCommon.Constant.Mismatched || options.Status == AppCommon.Constant.Additional ? false : true;
        rData.EntityType = AppCommon.EntityType.GST_EntityReturnHistory;
        rData.FileterConditions[0].PropertyName = "EntityId";
        rData.FileterConditions[0].PropertyValue = CurrentID;
        rData.FileterConditions[0].PropertyDataType = "5";
        ServiceHelper.QueryEntity(rData, function (response) {
            if (response.Entitities != null) {
                if (response.Entitities.length > 0) {
                    $scope.SuccessHistoryDataCall(response.Entitities, visiblepopup);
                }
                if (visiblepopup == 'B2B') {
                    $scope.visiblePopupBtoBGrid = true;
                }
                else if (visiblepopup == 'B2C') {
                    $scope.visiblePopupBtoCGrid = true;
                }
                else if (visiblepopup == 'CNDN') {
                    $scope.visiblePopupCNDNGrid = true;
                }
                else if (visiblepopup == 'TAXPAID') {
                    $scope.visiblePopupTaxOnAdvanceGrid = true;
                }
                else if (visiblepopup == 'OTHER') {
                    $scope.visiblePopupOtherGrid = true;
                }
            }
            else {
                DevExpress.ui.dialog.alert(response.ErrorMessage, 'Alert');
                $rootScope.loadingVisible = false;
            }
        }, function (response) {
            DevExpress.ui.dialog.alert(response, 'Alert');
            $rootScope.loadingVisible = false;
        });
    }
    $scope.SuccessDataCall = function (response, Tabtype) {
        $scope.CurrentEntity = response;
        if (Tabtype == "" || Tabtype == "B2B") {
            $scope.CreateB2BModal(response.Data.GST_OS_Header, response.Data.GST_OS_B2B_Lines ||
            {}, response.Data.GST_OS_B2BA_Lines ||
            {});
            if (Tabtype != "") {
                $("#" + $scope.GetDatagridinstance(Tabtype)).dxDataGrid("instance").option("dataSource", $scope.B2BModelDataSource);
            }
        }
        else if (Tabtype == "B2C") {
            $scope.CreateB2CModal(response.Data.GST_OS_Header, response.Data.GST_OS_B2C_Lines ||
            {}, response.Data.GST_OS_B2CA_Lines ||
            {});
            if (Tabtype != "") {
                $("#" + $scope.GetDatagridinstance(Tabtype)).dxDataGrid("instance").option("dataSource", $scope.B2CModelDataSource);
            }
        }
        else if (Tabtype == "Credit/Debit Note") {
            $scope.CreateCNDNModal(response.Data.GST_OS_Header, response.Data.GST_OS_CDN ||
            {}, response.Data.GST_OS_CDNA ||
            {});
            if (Tabtype != "") {
                $("#" + $scope.GetDatagridinstance(Tabtype)).dxDataGrid("instance").option("dataSource", $scope.CNDNModelDataSource);
            }
        }
        else if (Tabtype == "Tax On Advance") {
            $scope.CreateTaxPaidModal(response.Data.GST_OS_Header, response.Data.GST_OS_TaxPaid ||
            {});
            if (Tabtype != "") {
                $("#" + $scope.GetDatagridinstance(Tabtype)).dxDataGrid("instance").option("dataSource", $scope.TaxData);
            }
        }
        else if (Tabtype == "Invoice Summary") {
            $scope.CreateInvSumModal(response.Data.GST_OS_Header, response.Data.GST_IS_ReverseCharge ||
            {});
            if (Tabtype != "") {
                $("#" + $scope.GetDatagridinstance(Tabtype)).dxDataGrid("instance").option("dataSource", $scope.InvSumModelDataSource);
            }
        }
        else if (Tabtype == "Others") {
            $scope.CreateOtherModal(response.Data.GST_OS_Header, response.Data.GST_OS_NilOrExempted ||
            {});
            if (Tabtype != "") {
                $("#" + $scope.GetDatagridinstance(Tabtype)).dxDataGrid("instance").option("dataSource", $scope.OtherModelDataSource);
            }
        }
        if (Tabtype == "") {
            $scope.Init();
        }
        $rootScope.loadingVisible = false;
    }
    $scope.SuccessHistoryDataCall = function (response, HistoryType) {
        if (HistoryType == 'B2B') {
            $scope.CreateB2BHistoryModal(response[0].Data);
        }
        else if (HistoryType == 'B2C') {
            $scope.CreateB2CHistoryModal(response[0].Data);
        }
        else if (HistoryType == 'CNDN') {
            $scope.CreateCNDNHistoryModal(response[0].Data);
        }
        else if (HistoryType == 'TAXPAID') {
            $scope.CreateCNDNHistoryModal(response[0].Data);
        }
        else if (HistoryType == 'OTHER') {
            $scope.CreateCNDNHistoryModal(response[0].Data);
        }
        $rootScope.loadingVisible = false;
    }
    //#region Not Required Need To Remove
    $scope.CreateButton = function (info, SelectboxID, ButtonID, DataModel, visiblepopup, GSTREntityType, PropertyName, PropertyValue) {
        var customButton = $('<div id=' + SelectboxID + '>').dxSelectBox(
        {
            dataSource: ViewReportModel,
            displayExpr: "Name",
            valueExpr: "ID",
            value: ViewReportModel[0],
            width: 120,
            placeholder: 'View Reports',
            onValueChanged: function (data) {
                $scope.FilterDataSource(data);
            },
        });
        var gridcustomButton = $('<div style="margin-top:-48px;margin-left: 211px;width: 10%;" id=' + ButtonID + '>').dxButton(
        {
            text: "Add New",
            height: 35,
            icon: 'plus',
            onClick: function (e) {
                var data = jQuery.extend({}, DataModel);
                $scope.currentRow = {
                    key: $scope.gridInstance.getKeyByRowIndex(0),
                    data: $scope.ClearFormData()
                };
                if ($scope.formInstance !== null) {
                    $scope.formInstance.resetValues();
                }
                $scope.existingRowEditingMode = false;
                $scope.ShowPopUp(visiblepopup);
            }
        });
        if (document.getElementById(SelectboxID) == null) {
            if (info.element.find('.dx-datagrid-pager.dx-widget').length > 0) {
                info.element.find('.dx-datagrid-pager.dx-widget').append(customButton);
                info.element.find('.dx-datagrid-pager.dx-widget').append(gridcustomButton);
                $("#" + SelectboxID).dxSelectBox('option', 'value', $scope.selectedvalue);
            }
            else {
                info.element.find('.dx-context-menu').append(customButton);
                info.element.find('.dx-context-menu').append(gridcustomButton);
                $("#" + SelectboxID).dxSelectBox('option', 'value', $scope.selectedvalue);
            }
        }
    }
    //#endregion
    $scope.AddRecord = function (Data, Store, DataSource) {
        var guid = new DevExpress.data.Guid();
        Data.ID = guid._value;
        Store.insert(Data).done(function (values, key) {
            //'values' contains the inserted item values
            //'key' contains the inserted item key
            DataSource.reload();
            DevExpress.ui.notify('Entity Saved succesfully');
        }).fail(function (error) {
            //handle error
            DevExpress.ui.dialog.alert(error, 'Error');
        });
    }
    $scope.UpdateRecord = function (Key, Data, Store, DataSource) {
        Store.update(Key, Data).done(function () {
            DataSource.reload();
            DevExpress.ui.notify('Entity Updated succesfully');
        }).fail(function (error) {
            //handle error
            DevExpress.ui.dialog.alert(error, 'Error');
        });
        $scope.existingRowEditingMode = false;
    }
    $scope.SelectRowData = function (info) {
        var data = jQuery.extend(
        {}, info.data);
        $scope.currentRow = {
            key: info.key,
            data: data,
        };
        $scope.existingRowEditingMode = true;
    }
    $scope.GetHistoryData = function (container, options, Visiblepopup, DataModel) {
        var iStatus = options.data.Status == null ? 1 : options.data.Status;
        var nStatus = options.data.StatusName == null ? "Uploaded" : options.data.StatusName;
        $('<a/>').addClass(AppCommon.GetStatusButton[iStatus]).css("width", "102px").text(nStatus).on('dxclick', function () {
            DataModel.length = 0;
            $scope.GetHistoryResource(options.data.ID, Visiblepopup, options.data);
        }).appendTo(container);
    }
    $scope.SaveEntity = function (oData, Store, DataSource, GSTREntityType, PropertyValue) {
        var GSTR_Entity = new AppCommon.Class.EntityCreateRequest();
        GSTR_Entity.EntityType = GSTREntityType;
        GSTR_Entity.Data = PropertyValue;
        $rootScope.loadingVisible = true;
        ServiceHelper.CreateEntity(GSTR_Entity, function (response) {
            if (response.IsCreatSuccessful) {
                $scope.AddRecord(oData, Store, DataSource);
            }
            else {
                DevExpress.ui.dialog.alert(response.ErrorMessage, 'Alert');
            }
            $rootScope.loadingVisible = false;
        }, function (response) {
            DevExpress.ui.dialog.alert(response, 'Alert');
            $rootScope.loadingVisible = false;
        });
    }
    $scope.UpdateEntity = function (Key, oData, Store, DataSource, GSTREntityType, SubscriptionId, PropertyValue) {
        var GSTR_Entity = new AppCommon.Class.EntityUpdateRequest();
        GSTR_Entity.EntityType = GSTREntityType;
        GSTR_Entity.EntityId = Key;
        GSTR_Entity.SubscriptionId = SubscriptionId;
        GSTR_Entity.Data = PropertyValue;
        $rootScope.loadingVisible = true;
        ServiceHelper.UpdateEntity(GSTR_Entity, function (response) {
            if (response.IsUpdateSuccessful) {
                $scope.UpdateRecord(Key, oData, Store, DataSource);
            }
            else {
                DevExpress.ui.dialog.alert(response.ErrorMessage, 'Alert');
            }
            $rootScope.loadingVisible = false;
        }, function (response) {
            DevExpress.ui.dialog.alert(response, 'Alert');
            $rootScope.loadingVisible = false;
        });
    }
    $scope.clickHandler = function (e) {
        //DevExpress.ui.dialog.alert('Previous value: <b>' + e.previousValue + '</b></br>' + 'New value: <b>' + e.value + '</b>', 'Info');
        //if ($scope.formInstance !== null) {
        //    $scope.textBoxSupplierInvoiceNo = true;           
        //    $scope.formInstance.repaint();
        //}
        //$("#dx_5b18947a-268d-328b-7e18-d4b094fdd24d_SupplierInvoiceNo").dxTextBox('option', 'disabled', true);
    };
    $scope.GetDatagridinstance = function (DatagridID) {
        var data = "";
        if (DatagridID == "ViewB2B" || DatagridID == "B2B") {
            data = "dxDataGridB2B"
        }
        else if (DatagridID == "ViewB2C" || DatagridID == "B2C") {
            data = "dxDataGridB2C"
        }
        else if (DatagridID == "ViewCNDN" || DatagridID == "Credit/Debit Note") {
            data = "dxDataGridCNDN"
        }
        else if (DatagridID == "ViewTax" || DatagridID == "Tax On Advance") {
            data = "dxDataGridTaxPaid"
        }
        else if (DatagridID == "ViewOther" || DatagridID == "Others") {
            data = "dxDataGridOther"
        }
        else if (DatagridID == "ViewIS" || DatagridID == "Invoice Summary") {
            data = "dxDataGridInvSummary"
        }
        return data;
    };
    //#endregion

    //#region Common Function
    $scope.GetResource("GSTROSB2BLine", "");
    $scope.SetToolTip = function () {
        var divs = $('div[role="tablist"]')[0].childNodes[0];
        $.each(divs.childNodes, function (i, item) {
            $scope.SetToolTipValues(i, item);
        });
    }
    $scope.SetToolTipValues = function (i, Control) {
        var tip = $("#tooltip" + i);
        if (tip != null) {
            var tooltipSimple = $(tip).dxTooltip(
            {
                target: Control,
                position: "top",
                contentTemplate: function (data) {
                    data.html(AppCommon.GSTR1TabTip[i]);
                }
            }).dxTooltip("instance");
            $(Control).unbind().hover(function () {
                tooltipSimple.show()
            }, function () {
                tooltipSimple.hide()
            });
        }
    }
    $scope.RejectClick = function () {
        $scope.loadingB2BHistoryVisible = true;
        var uData = new AppCommon.Class.EntityUpdateRequest();
        uData.EntityType = AppCommon.EntityType.GST_OS_Header;
        uData.EntityId = $scope.CurrentEntity.EntityId;
        uData.PerformAction = "REJECTED";
        var data = {
            EntityRow: [
            {
                Id: $scope.CurrentOpenHistory.Id,
                EntityTypeName: $scope.CurrentOpenHistory.LineType
            }]
        };
        uData.Data = data;
        ServiceHelper.UpdateEntity(uData, function (response) {
            $scope.loadingB2BHistoryVisible = true;
            if (response.IsUpdateSuccessful) {
                $scope.DisableAcceptReject = true;
            }
        }, function (response) {
            $scope.loadingB2BHistoryVisible = true;
            DevExpress.ui.dialog.alert(response);
        });
    }
    $scope.AcceptClick = function () {
        $scope.loadingB2BHistoryVisible = true;
        var uData = new AppCommon.Class.EntityUpdateRequest();
        uData.EntityType = AppCommon.EntityType.GST_OS_Header;
        uData.EntityId = $scope.CurrentEntity.EntityId;
        uData.PerformAction = "ACCEPTED";
        var data = {
            EntityRow: [
            {
                Id: $scope.CurrentOpenHistory.Id,
                EntityTypeName: $scope.CurrentOpenHistory.LineType
            }]
        };
        uData.Data = data;
        ServiceHelper.UpdateEntity(uData, function (response) {
            $scope.loadingB2BHistoryVisible = false;
            if (response.IsUpdateSuccessful) {
                $scope.DisableAcceptReject = true;
            }
        }, function (response) {
            $scope.loadingB2BHistoryVisible = true;
            DevExpress.ui.dialog.alert(response);
        });
    }
    //#endregion

    //#region Load DataSources Function

    //#region B2B
    $scope.LoadDatasource(AppCommon.EntityType.PickListValues, "DisplayName", "B2BSectionType");
    $scope.LoadDatasource(AppCommon.EntityType.PickListValues, "DisplayName", "GoodsServices");
    //$scope.LoadDatasource(AppCommon.EntityType.PickListValues, "DisplayName", "CGSTRate");
    //$scope.LoadDatasource(AppCommon.EntityType.PickListValues, "DisplayName", "IGSTRate");
    //$scope.LoadDatasource(AppCommon.EntityType.PickListValues, "DisplayName", "SGSTRate");
    //#endregion
    //#region B2C
    //$scope.LoadDatasource(AppCommon.EntityType.PickListValues, "DisplayName", "B2CSectionType");
    //#endregion
    //#region CDN
    //$scope.LoadDatasource(AppCommon.EntityType.PickListValues, "DisplayName", "CDNSectionType");
    //$scope.LoadDatasource(AppCommon.EntityType.PickListValues, "DisplayName", "CDNDescriptionType");
    //#endregion
    //#region Tax On Advance
    //$scope.LoadDatasource(AppCommon.EntityType.PickListValues, "DisplayName", "TaxOnAdvanceSectionType");
    //#endregion
    //#region Other
    //$scope.LoadDatasource(AppCommon.EntityType.PickListValues, "DisplayName", "OtherSectionType");
    //$scope.LoadDatasource(AppCommon.EntityType.PickListValues, "DisplayName", "OtherSupplyType");
    //#endregion
    //#region Invoice Summary
    //$scope.LoadDatasource(AppCommon.EntityType.PickListValues, "DisplayName", "InvoiceSummarySectionType"); 
    //#endregion
    //#endregion

    //#region Grid Filter Setting
    $scope.filterRow = {
        visible: true,
        applyFilter: "auto"
    },
    $scope.headerFilter = {
        visible: true
    },
    //#endregion

    //#region Outward Grid Designer 
    $scope.CreateForm = function () {
        $scope.viewmodelGSTR2 = {
            formData:
            {},
            width: '100%',
            //height: 'auto',
            scrollingEnabled: false,
            colCount: 2,
            labelLocation: "top",
            items: [
            {
                itemType: "group",
                colSpan: 2,
                items: [
                {
                    itemType: "tabbed",
                    width: 'auto',
                    tabPanelOptions:
                    {
                        deferRendering: false,
                        onSelectionChanged: function (e) {
                            $scope.LoadGridData(e.addedItems[0].title);
                            //$scope.SetSelectBoxDefaultValue(e.addedItems[0].title);
                        },
                    },
                    tabs: [
                        //#region B TO B TAB DETAILS
                        {
                            title: "B2B",
                            scrollingEnabled: false,
                            items: [
                                {
                                    colSpan: 2,
                                    template: 'InvoiceTemplate'
                                },
                                $scope.gridOptions = {
                                    dataSource: $scope.B2BModelDataSource,
                                    bindingOptions: {
                                        filterRow: "filterRow",
                                        headerFilter: "headerFilter"
                                    },
                                    searchPanel: {
                                        visible: true,
                                        width: 500,
                                        placeholder: "Search..."
                                    },
                                    scrolling: {
                                        mode: "infinite"
                                    },
                                    //groupPanel: {
                                    //    visible: true
                                    //},
                                    sorting:
                                    {
                                        mode: "none"
                                    },
                                    selection:
                                    {
                                        mode: "single"
                                    },
                                    hoverStateEnabled: true,
                                    width: 'auto',
                                    height: 550,
                                    columns: [
                                    {
                                        width: 90,
                                        caption: 'Source',
                                        //allowSorting: true,
                                        dataField: 'SourceIdentifier'
                                    },
                                    {
                                        width: 100,
                                        caption: "Reconciliation",
                                        alignment: 'center',
                                        allowFiltering: true,
                                        cellTemplate: function (container, options) {
                                            $scope.GetHistoryData(container, options, 'B2B', $scope.B2BHistoryModel);
                                        }
                                    },
                                    {
                                        width: 90,
                                        caption: 'Section Type',
                                        dataField: 'SectionType',
                                        alignment: 'center',
                                    },
                                    {
                                        width: 150,
                                        caption: 'GSTIN/UIN/Name of Recipient',
                                        dataField: 'CounterPartyGSTINOrUIN'
                                    },
                                    {
                                        width: 150,
                                        caption: 'Invoice No',
                                        dataField: 'SupplierInvoiceNo'
                                    },
                                    {
                                        width: 90,
                                        caption: 'Invoice Date',
                                        dataField: 'SupplierInvoiceDate',
                                        dataType: 'date',
                                        format: AppSetting.AppConstant.Dateformat,
                                    },
                                    {
                                        width: 120,
                                        caption: 'HSN/SAC',
                                        dataField: 'HSNSACCode',
                                        sortOrder: "desc"
                                    },
                                    {
                                        width: 100,
                                        caption: 'Taxable Value',
                                        dataField: 'TaxableValue',
                                        format:
                                        {
                                            type: 'fixedPoint',
                                            precision: 2
                                        },
                                    },
                                    {
                                        headerCellTemplate: function (container) {
                                            container.append($("<div style='text-align: right;padding-right: 33%;'>CGST</div>"));
                                        },
                                        columns: [
                                        {
                                            width: 118,
                                            caption: "Rate",
                                            dataField: "CGST_Rate",
                                            format:
                                            {
                                                type: 'fixedPoint'
                                            },
                                        },
                                        {
                                            width: 118,
                                            caption: "Amount",
                                            dataField: "CGST_Amount",
                                            format:
                                            {
                                                type: 'fixedPoint',
                                                precision: 2
                                            },
                                        }]
                                    },
                                    {
                                        headerCellTemplate: function (container) {
                                            container.append($("<div style='text-align: right;padding-right: 33%;'>SGST</div>"));
                                        },
                                        columns: [
                                        {
                                            width: 118,
                                            caption: "Rate",
                                            dataField: "SGST_Rate",
                                            format:
                                            {
                                                type: 'fixedPoint'
                                            },
                                        },
                                        {
                                            width: 118,
                                            caption: "Amount",
                                            dataField: "SGST_Amount",
                                            format:
                                            {
                                                type: 'fixedPoint',
                                                precision: 2
                                            },
                                        }]
                                    },
                                    {
                                        headerCellTemplate: function (container) {
                                            container.append($("<div style='text-align: right;padding-right: 33%;'>IGST</div>"));
                                        },
                                        columns: [
                                        {
                                            width: 118,
                                            caption: "Rate",
                                            dataField: "IGST_Rate",
                                            format:
                                            {
                                                type: 'fixedPoint'
                                            },
                                        },
                                        {
                                            width: 118,
                                            caption: "Amount",
                                            dataField: "IGST_Amount",
                                            format:
                                            {
                                                type: 'fixedPoint',
                                                precision: 2
                                            },
                                        }]
                                    }, ],
                                    columnAutoWidth: true,
                                    wordWrapEnabled: true,
                                    showColumnLines: false,
                                    showRowLines: true,
                                    showBorders: true,
                                    rowAlternationEnabled: true,
                                    onContentReady: function (e) {
                                        //$scope.CreateButton(e, "ViewB2B", "ViewB2Button", $scope.B2BModel, "B2B");
                                    },
                                    onInitialized: function (e) {
                                        $scope.gridInstance = e.component;
                                    },
                                    onRowClick: function (info) {
                                        $scope.SelectRowData(info);
                                        //$scope.CreateButton(info, "ViewB2B", "ViewB2Button", $scope.B2BModel, "B2B");
                                        $scope.visiblePopup = true;
                                    },
                                },
                            ]
                        },
                        //#endregion
                        //#region B TO C TAB DETAILS
                        {
                            title: "B2C",
                            items: [
                                {
                                    colSpan: 2,
                                    template: 'InvoiceTemplateBtoC'
                                },
                                $scope.gridOptionsbtoc = {
                                    dataSource: $scope.B2CModelDataSource,
                                    bindingOptions: {
                                        filterRow: "filterRow",
                                        headerFilter: "headerFilter",
                                    },
                                    searchPanel: {
                                        visible: true,
                                        width: 500,
                                        placeholder: "Search..."
                                    },
                                    scrolling: {
                                        mode: "infinite"
                                    },
                                    //groupPanel: {
                                    //    visible: true
                                    //},                                 
                                    sorting:
                                    {
                                        mode: "none"
                                    },
                                    selection:
                                    {
                                        mode: "single"
                                    },
                                    hoverStateEnabled: true,
                                    width: 'auto',
                                    height: 550,
                                    columns: [
                                    {
                                        width: 90,
                                        caption: 'Source',
                                        //allowSorting: true,
                                        dataField: 'SourceIdentifier'
                                    },
                                    {
                                        width: 100,
                                        caption: "Reconciliation",
                                        alignment: 'center',
                                        allowFiltering: true,
                                        cellTemplate: function (container, options) {
                                            $scope.GetHistoryData(container, options, 'B2C', $scope.B2CHistoryModel);
                                        }
                                    },
                                    {
                                        width: 90,
                                        caption: 'Section Type',
                                        dataField: 'SectionType',
                                        alignment: 'center',
                                    },
                                    {
                                        width: 150,
                                        caption: 'Invoice No',
                                        dataField: 'SupplierInvoiceNo'
                                    },
                                    {
                                        width: 90,
                                        caption: 'Invoice Date',
                                        dataField: 'SupplierInvoiceDate',
                                        dataType: 'date',
                                        format: AppSetting.AppConstant.Dateformat,
                                    },
                                    {
                                        width: 120,
                                        caption: 'HSN/SAC',
                                        dataField: 'HSNSACCode',
                                        sortOrder: "desc"
                                    },
                                    {
                                        caption: 'Shipping Bill / Bill of Export(No)',
                                        dataField: 'ShippingBillNo',
                                        width: 120
                                    },
                                    {
                                        caption: 'Shipping Bill / Bill of Export(Date)',
                                        dataField: 'ShippingBillDate',
                                        dataType: 'date',
                                        format: AppSetting.AppConstant.Dateformat,
                                        width: 90
                                    },
                                    {
                                        width: 100,
                                        caption: 'Taxable Value',
                                        dataField: 'TaxableValue',
                                        format:
                                        {
                                            type: 'fixedPoint',
                                            precision: 2
                                        },
                                    },
                                    {
                                        headerCellTemplate: function (container) {
                                            container.append($("<div style='text-align: right;padding-right: 33%;'>CGST</div>"));
                                        },
                                        columns: [
                                        {
                                            width: 118,
                                            caption: "Rate",
                                            dataField: "CGST_Rate",
                                            format:
                                            {
                                                type: 'fixedPoint'
                                            },
                                        },
                                        {
                                            width: 118,
                                            caption: "Amount",
                                            dataField: "CGST_Amount",
                                            format:
                                            {
                                                type: 'fixedPoint',
                                                precision: 2
                                            },
                                        }]
                                    },
                                    {
                                        headerCellTemplate: function (container) {
                                            container.append($("<div style='text-align: right;padding-right: 33%;'>SGST</div>"));
                                        },
                                        columns: [
                                        {
                                            width: 118,
                                            caption: "Rate",
                                            dataField: "SGST_Rate",
                                            format:
                                            {
                                                type: 'fixedPoint'
                                            },
                                        },
                                        {
                                            width: 118,
                                            caption: "Amount",
                                            dataField: "SGST_Amount",
                                            format:
                                            {
                                                type: 'fixedPoint',
                                                precision: 2
                                            },
                                        }]
                                    },
                                    {
                                        headerCellTemplate: function (container) {
                                            container.append($("<div style='text-align: right;padding-right: 33%;'>IGST</div>"));
                                        },
                                        columns: [
                                        {
                                            width: 118,
                                            caption: "Rate",
                                            dataField: "IGST_Rate",
                                            format:
                                            {
                                                type: 'fixedPoint'
                                            },
                                        },
                                        {
                                            width: 118,
                                            caption: "Amount",
                                            dataField: "IGST_Amount",
                                            format:
                                            {
                                                type: 'fixedPoint',
                                                precision: 2
                                            },
                                        }]
                                    }, ],
                                    showColumnLines: false,
                                    columnAutoWidth: true,
                                    wordWrapEnabled: true,
                                    showRowLines: true,
                                    showBorders: true,
                                    rowAlternationEnabled: true,
                                    onContentReady: function (e) {
                                        //$scope.CreateButton(e, "ViewB2C", "ViewB2Button", $scope.B2CModel, "B2C");
                                    },
                                    onInitialized: function (e) {
                                        $scope.gridInstance = e.component;
                                    },
                                    onRowClick: function (info) {
                                        $scope.SelectRowData(info);
                                        //$scope.CreateButton(info, "ViewB2C", "ViewB2Button", $scope.B2CModel, "B2C");
                                        $scope.visibleBtoCPopup = true;
                                    },
                                },
                            ]
                        },
                        //#endregion
                        //#region CNDN TAB DETAILS
                        {
                            title: "Credit/Debit Note",
                            items: [
                                {
                                    colSpan: 2,
                                    template: 'InvoiceTemplateCNDN'
                                },
                                $scope.gridOptionsCNDN = {
                                    dataSource: $scope.CNDNModelDataSource,
                                    bindingOptions: {
                                        filterRow: "filterRow",
                                        headerFilter: "headerFilter"
                                    },
                                    searchPanel: {
                                        visible: true,
                                        width: 500,
                                        placeholder: "Search...",

                                    },
                                    scrolling: {
                                        mode: "infinite"
                                    },
                                    //groupPanel: {
                                    //    visible: true
                                    //},                                   
                                    sorting:
                                    {
                                        mode: "none"
                                    },
                                    selection:
                                    {
                                        mode: "single"
                                    },
                                    hoverStateEnabled: true,
                                    width: 'auto',
                                    height: 550,
                                    columns: [
                                    {
                                        width: 90,
                                        caption: 'Source',
                                        //allowSorting: true,
                                        dataField: 'SourceIdentifier'
                                    },
                                    {
                                        width: 100,
                                        caption: "Reconciliation",
                                        alignment: 'center',
                                        allowFiltering: true,
                                        cellTemplate: function (container, options) {
                                            $scope.GetHistoryData(container, options, 'CNDN', $scope.CNDNHistoryModel);
                                        }
                                    },
                                    {
                                        width: 90,
                                        caption: 'Section Type',
                                        dataField: 'SectionType',
                                        alignment: 'center',
                                    },
                                    {
                                        width: 120,
                                        caption: "Description",
                                        dataField: 'Description'
                                    },
                                    {
                                        width: 120,
                                        caption: "GSTIN/UIN of Recipient",
                                        dataField: 'CounterPartyGSTINOrUIN'
                                    },
                                    {
                                        width: 90,
                                        caption: "Type of Note(Debit/Credit)",
                                        dataField: 'CDNType'
                                    },
                                    {
                                        width: 150,
                                        caption: "Debit/Credit No",
                                        dataField: 'CDNNo'
                                    },
                                    {
                                        width: 150,
                                        caption: "Invoice No",
                                        dataField: 'OriginalInvoiceNo'
                                    },
                                    {
                                        width: 90,
                                        caption: "Invoice Date",
                                        dataField: 'InvoiceDate',
                                        dataType: 'date',
                                        format: AppSetting.AppConstant.Dateformat,
                                    },
                                    {
                                        width: 100,
                                        caption: "Differential Value (Plus or minus)",
                                        dataField: 'DifferentialValue',
                                        format:
                                        {
                                            type: 'fixedPoint',
                                            precision: 2
                                        },
                                        width: 150
                                    },
                                    {
                                        headerCellTemplate: function (container) {
                                            container.append($("<div style='text-align: right;padding-right: 33%;'>CGST</div>"));
                                        },
                                        columns: [
                                        {
                                            width: 118,
                                            caption: "Rate",
                                            dataField: "CGST_Rate",
                                            format:
                                            {
                                                type: 'fixedPoint'
                                            },
                                        },
                                        {
                                            width: 118,
                                            caption: "Amount",
                                            dataField: "CGST_Amount",
                                            format:
                                            {
                                                type: 'fixedPoint',
                                                precision: 2
                                            },
                                        }]
                                    },
                                    {
                                        headerCellTemplate: function (container) {
                                            container.append($("<div style='text-align: right;padding-right: 33%;'>SGST</div>"));
                                        },
                                        columns: [
                                        {
                                            width: 118,
                                            caption: "Rate",
                                            dataField: "SGST_Rate",
                                            format:
                                            {
                                                type: 'fixedPoint'
                                            },
                                        },
                                        {
                                            width: 118,
                                            caption: "Amount",
                                            dataField: "SGST_Amount",
                                            format:
                                            {
                                                type: 'fixedPoint',
                                                precision: 2
                                            },
                                        }]
                                    },
                                    {
                                        headerCellTemplate: function (container) {
                                            container.append($("<div style='text-align: right;padding-right: 33%;'>IGST</div>"));
                                        },
                                        columns: [
                                        {
                                            width: 118,
                                            caption: "Rate",
                                            dataField: "IGST_Rate",
                                            format:
                                            {
                                                type: 'fixedPoint'
                                            },
                                        },
                                        {
                                            width: 118,
                                            caption: "Amount",
                                            dataField: "IGST_Amount",
                                            format:
                                            {
                                                type: 'fixedPoint',
                                                precision: 2
                                            },
                                        }]
                                    }, ],
                                    columnAutoWidth: true,
                                    wordWrapEnabled: true,
                                    showColumnLines: false,
                                    showRowLines: true,
                                    showBorders: true,
                                    rowAlternationEnabled: true,
                                    onContentReady: function (e) {
                                        //$scope.CreateButton(e, "ViewCNDN", "ViewB2Button", $scope.CNDNModel, "CNDN");
                                    },
                                    onInitialized: function (e) {
                                        $scope.gridInstance = e.component;
                                    },
                                    onRowClick: function (info) {
                                        $scope.SelectRowData(info);
                                        //$scope.CreateButton(info, "ViewCNDN", "ViewB2Button", $scope.CNDNModel, "CNDN");
                                        $scope.visiblePopupCNDN = true;
                                    },
                                },
                            ]
                        },
                        //#endregion
                        //#region TAX ON ADVANCE TAB DETAILS
                        {
                            title: "Tax On Advance",
                            items: [
                                {
                                    colSpan: 1,
                                    template: 'TaxPaidOnAdvanceTemplate'
                                },
                                $scope.gridTaxPaidOnAdvance = {
                                    dataSource: $scope.TaxData,
                                    bindingOptions: {
                                        filterRow: "filterRow",
                                        headerFilter: "headerFilter"
                                    },
                                    searchPanel: {
                                        visible: true,
                                        width: 500,
                                        placeholder: "Search..."
                                    },
                                    scrolling: {
                                        mode: "infinite"
                                    },
                                    //groupPanel: {
                                    //    visible: true
                                    //},
                                    sorting:
                                    {
                                        mode: "none"
                                    },
                                    selection:
                                    {
                                        mode: "single"
                                    },
                                    hoverStateEnabled: true,
                                    width: 'auto',
                                    height: 550,
                                    columns: [
                                    {
                                        width: 90,
                                        caption: 'Source',
                                        //allowSorting: true,
                                        dataField: 'SourceIdentifier'
                                    },
                                    {
                                        width: 100,
                                        caption: "Reconciliation",
                                        alignment: 'center',
                                        allowFiltering: true,
                                        cellTemplate: function (container, options) {
                                            $scope.GetHistoryData(container, options, 'TAXPAID', $scope.TaxPaidHistoryModel);
                                        }
                                    },
                                    {
                                        width: 90,
                                        caption: 'Section Type',
                                        dataField: 'SectionType',
                                        alignment: 'center',
                                    },
                                    {
                                        width: 150,
                                        caption: 'Invoice No',
                                        dataField: 'SupplierInvoiceNo'
                                    },
                                    {
                                        caption: 'Transaction ID',
                                        dataField: 'TransactionID'
                                    },
                                    {
                                        headerCellTemplate: function (container) {
                                            container.append($("<div style='text-align: right;padding-right: 33%;'>CGST</div>"));
                                        },
                                        columns: [
                                        {
                                            //width: 118,
                                            caption: "Rate",
                                            dataField: "CGST_Rate",
                                            format:
                                            {
                                                type: 'fixedPoint',
                                            },
                                        },
                                        {
                                            //width: 118,
                                            caption: "Amount",
                                            dataField: "CGST_Tax",
                                            format:
                                            {
                                                type: 'fixedPoint',
                                                precision: 2
                                            },
                                        }]
                                    },
                                    {
                                        headerCellTemplate: function (container) {
                                            container.append($("<div style='text-align: right;padding-right: 33%;'>SGST</div>"));
                                        },
                                        columns: [
                                        {
                                            //width: 118,
                                            caption: "Rate",
                                            dataField: "SGST_Rate",
                                            format:
                                            {
                                                type: 'fixedPoint',
                                            },
                                        },
                                        {
                                            //width: 118,
                                            caption: "Amount",
                                            dataField: "SGST_Tax",
                                            format:
                                            {
                                                type: 'fixedPoint',
                                                precision: 2
                                            },
                                        }]
                                    },
                                    {
                                        headerCellTemplate: function (container) {
                                            container.append($("<div style='text-align: right;padding-right: 33%;'>IGST</div>"));
                                        },
                                        columns: [
                                        {
                                            //width: 118,
                                            caption: "Rate",
                                            dataField: "IGST_Rate",
                                            format:
                                            {
                                                type: 'fixedPoint',
                                            },
                                        },
                                        {
                                            //width: 118,
                                            caption: "Amount",
                                            dataField: "IGST_Tax",
                                            format:
                                            {
                                                type: 'fixedPoint',
                                                precision: 2
                                            },
                                        }]
                                    }, ],
                                    columnAutoWidth: true,
                                    wordWrapEnabled: true,
                                    showColumnLines: false,
                                    showRowLines: true,
                                    showBorders: true,
                                    rowAlternationEnabled: true,
                                    onContentReady: function (e) {
                                        //$scope.CreateButton(e, "ViewTax", "ViewB2Button", $scope.TaxPaidModel, "ADVTAXPAID");
                                    },
                                    onInitialized: function (e) {
                                        $scope.gridInstance = e.component;
                                    },
                                    onRowClick: function (info) {
                                        $scope.SelectRowData(info);
                                        //$scope.CreateButton(info, "ViewTax", "ViewB2Button", $scope.TaxPaidModel, "ADVTAXPAID");
                                        $scope.visiblePopupTaxPaidOnAdvance = true;
                                    },
                                },
                            ]
                        },
                        //#endregion
                        //#region OTHER TAB DETAILS
                        {
                            title: "Others",
                            items: [
                            {
                                itemType: "group",
                                colCount: 1,
                                colSpan: 1,
                                items: [
                                    {
                                        colSpan: 1,
                                        template: 'OtherTemplate'
                                    },
                                    $scope.gridOther = {
                                        dataSource: $scope.OtherModelDataSource,
                                        bindingOptions: {
                                            filterRow: "filterRow",
                                            headerFilter: "headerFilter"
                                        },
                                        searchPanel: {
                                            visible: true,
                                            width: 500,
                                            placeholder: "Search..."
                                        },
                                        scrolling: {
                                            mode: "infinite"
                                        },
                                        //groupPanel: {
                                        //    visible: true
                                        //},
                                        sorting:
                                        {
                                            mode: "none"
                                        },
                                        selection:
                                        {
                                            mode: "single"
                                        },
                                        hoverStateEnabled: true,
                                        width: 'auto',
                                        height: 550,
                                        columns: [
                                        {
                                            width: 120,
                                            caption: 'Source',
                                            //allowSorting: true,
                                            dataField: 'SourceIdentifier'
                                        },
                                        {
                                            width: 120,
                                            caption: "Reconciliation",
                                            alignment: 'center',
                                            allowFiltering: true,
                                            cellTemplate: function (container, options) {
                                                $scope.GetHistoryData(container, options, 'OTHER', $scope.OtherHistoryModel);
                                            }
                                        },
                                        {
                                            width: 120,
                                            caption: 'Section Type',
                                            dataField: 'SectionType',
                                            alignment: 'center',
                                        },
                                        {
                                            caption: "Supply Type",
                                            dataField: 'SupplyType'
                                        },
                                        {
                                            width: 120,
                                            caption: "Goods/Services",
                                            dataField: 'GoodsService'
                                        },
                                        {
                                            caption: "Nil Rated (Amount)",
                                            dataField: 'NilRatedSuppliesValue',
                                            format:
                                            {
                                                type: 'fixedPoint',
                                                precision: 2
                                            },
                                        },
                                        {
                                            caption: "Exempted (Amount)",
                                            dataField: 'ExemptedSuppliesValue',
                                            format:
                                            {
                                                type: 'fixedPoint',
                                                precision: 2
                                            },
                                        },
                                        {
                                            caption: "Non GST Supplies(Amount)",
                                            dataField: 'NonGSTSuppliesValue',
                                            format:
                                            {
                                                type: 'fixedPoint',
                                                precision: 2
                                            },
                                        }, ],
                                        columnAutoWidth: true,
                                        wordWrapEnabled: true,
                                        showColumnLines: false,
                                        showRowLines: true,
                                        showBorders: true,
                                        rowAlternationEnabled: true,
                                        onContentReady: function (e) {
                                            //$scope.CreateButton(e, "ViewOther", "ViewB2Button", $scope.OtherModel, "OTHER");
                                        },
                                        onInitialized: function (e) {
                                            $scope.gridInstance = e.component;
                                        },
                                        onRowClick: function (info) {
                                            $scope.SelectRowData(info);
                                            //$scope.CreateButton(info, "ViewOther", "ViewB2Button", $scope.OtherModel, "OTHER");
                                            $scope.visiblepopupOtherOption = true;
                                        },
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
                                    itemType: "empty",
                                    colSpan: 11
                                }, ]
                            }]
                        },
                        //#endregion
                        //#region INVOICE SUMMARY TAB DETAILS
                        {
                            title: "Invoice Summary",
                            items: [
                            {
                                itemType: "group",
                                colCount: 1,
                                colSpan: 1,
                                items: [
                                    {
                                        colSpan: 1,
                                        template: 'InvoiceSummaryTemplate'
                                    },
                                    $scope.gridInvoiceSummary = {
                                        dataSource: $scope.InvSumModelDataSource,
                                        bindingOptions: {
                                            filterRow: "filterRow",
                                            headerFilter: "headerFilter"
                                        },
                                        searchPanel: {
                                            visible: true,
                                            width: 500,
                                            placeholder: "Search..."
                                        },
                                        scrolling: {
                                            mode: "infinite"
                                        },
                                        //groupPanel: {
                                        //    visible: true
                                        //},
                                        sorting:
                                        {
                                            mode: "none"
                                        },
                                        selection:
                                        {
                                            mode: "single"
                                        },
                                        hoverStateEnabled: true,
                                        width: 'auto',
                                        height: 550,
                                        columns: [
                                        {
                                            //width: 'auto',
                                            caption: 'Section Type',
                                            dataField: 'SectionType',
                                            alignment: 'center',
                                        },
                                        {
                                            //width: 'auto',
                                            caption: 'Series number of invoices',
                                            dataField: 'SeriesNoOfInvoice'
                                        },
                                        {
                                            // width: 'auto',
                                            caption: 'From',
                                            dataField: 'From'
                                        },
                                        {
                                            //width: 'auto',
                                            caption: 'To',
                                            dataField: 'To'
                                        },
                                        {
                                            //width: 'auto',
                                            caption: 'Total number of invoices',
                                            dataField: 'TotalInvoiceNumber'
                                        },
                                        {
                                            //width: 'auto',
                                            caption: 'Number of cancelled invoices',
                                            dataField: 'NumberofCancelledInvoice'
                                        },
                                        {
                                            //width: 'auto',
                                            caption: 'Net number of invoices issued',
                                            dataField: 'NetNumberIssuedInvoice'
                                        }, ],
                                        columnAutoWidth: true,
                                        wordWrapEnabled: true,
                                        showColumnLines: false,
                                        showRowLines: true,
                                        showBorders: true,
                                        rowAlternationEnabled: true,
                                        onContentReady: function (e) {
                                            //$scope.CreateButton(e, "ViewIS", "ViewB2Button", $scope.InvSumModel, "INVSUM");
                                        },
                                        onInitialized: function (e) {
                                            $scope.gridInstance = e.component;
                                        },
                                        onRowClick: function (info) {
                                            $scope.SelectRowData(info);
                                            //$scope.CreateButton(info, "ViewIS", "ViewB2Button", $scope.InvSumModel, "INVSUM");
                                            $scope.visiblePopupInvoiceSummary = true;
                                        },
                                    },
                                ]
                            }, ]
                        },
                        //#endregion
                    ]
                }]
            }, ]
        };
    }
    //#endregion

    //#region Import Functionality
    $scope.CreateImportPopup = function () {
        $scope.UploadImportFile = function () {
            $scope.loadingDataImportVisible = true;
            var file = $scope.FileImport;
            ServiceHelper.UploadFile(file,
                    function (response) {
                        $scope.loadingDataImportVisible = false;
                        if (response.IsRequestSuccessful == true) {
                            var result = DevExpress.ui.dialog.alert("File uploaded successfully", 'Alert');
                            result.done(function () {
                                $scope.ShowImportStatus();
                            });
                        }
                        else {
                            DevExpress.ui.dialog.alert(response.ErrorMessage, 'Alert');
                            $scope.ShowImportStatus();
                        }
                    },
                    function (response) {
                        $scope.loadingDataImportVisible = false;
                        DevExpress.ui.dialog.alert(response, 'Alert');
                        $scope.ShowImportStatus();
                    });
        }
        $scope.ShowImportStatus = function () {
            $scope.visibleImportPopup = false;
            $rootScope.$emit("GSTR1UploadStatus", { show: true });
            //$scope.GetResource();
        }
        $scope.UploadInterfaceFile = function () {
            var file = $scope.FileInterface;
            ServiceHelper.UploadFile(file, function (response) {
                if (response.IsRequestSuccessful == true) DevExpress.ui.dialog.alert("File uploaded successfully", 'Alert');
                else DevExpress.ui.dialog.alert(response.ErrorMessage, 'Alert');
            }, function (response) {
                DevExpress.ui.dialog.alert(response, 'Alert');
            });
        }
        $scope.popupImport = {
            width: 900,
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "Import Data",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visibleImportPopup",
            },
            contentTemplate: 'DataImport'
        };
        $scope.visibleImportPopup = false;
        $scope.ShowDataImportLoadingPanal = function () {
            $scope.closeOnOutsideClick = false;
            $scope.showIndicator = true;
            $scope.showPane = false;
            $scope.shading = false;
            $scope.dataImportloadOptions = {
                shadingColor: "rgba(0,0,0,0.4)",
                message: "loading...",
                width: 500,
                bindingOptions:
                {
                    visible: "loadingDataImportVisible",
                    showIndicator: "showIndicator",
                    showPane: "showPane",
                    shading: "shading",
                    closeOnOutsideClick: "closeOnOutsideClick"
                }
            };
        }
        $scope.loadingDataImportVisible = false;
        $scope.ShowDataImportLoadingPanal();
    }
    $scope.ShowDataImportLoadingPanal = function () {
        $scope.closeOnOutsideClick = false;
        $scope.showIndicator = true;
        $scope.showPane = false;
        $scope.shading = false;
        $scope.dataImportloadOptions = {
            shadingColor: "rgba(0,0,0,0.4)",
            message: "loading...",
            width: 500,
            bindingOptions:
            {
                visible: "loadingDataImportVisible",
                showIndicator: "showIndicator",
                showPane: "showPane",
                shading: "shading",
                closeOnOutsideClick: "closeOnOutsideClick"
            }
        };
        $scope.loadingDataImportVisible = false;
    }
    $scope.PopUpImportData = function () {
        $scope.visibleImportPopup = true;
    };
    //#endregion

    //#region Submit To GSTN
    $scope.CreateSubmitGSTNPopup = function () {
        $scope.ShowSubmitGSTRMsg = false;
        $scope.popupSubmitGSTN = {
            width: 700,
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "Submit to GSTN",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visibleSubmitGSTNPopup",
            },
            contentTemplate: 'SubmitGSTN'
        };
        $scope.visibleSubmitGSTNPopup = false;
        $scope.SubmitToGSTNButtonDisable = false;
        $scope.SubmitToGSTNButtonOptions = {
            text: 'Submit',
            bindingOptions:
            {
                disabled: 'SubmitToGSTNButtonDisable'
            },
            onClick: function (e) {
                $scope.SubmitDataToGSTN();
            }
        };
        $scope.ShowSubmitGSTNLoadingPanal = function () {
            $scope.closeOnOutsideClick = false;
            $scope.showIndicator = true;
            $scope.showPane = false;
            $scope.shading = false;
            $scope.submitGSTNloadOptions = {
                shadingColor: "rgba(0,0,0,0.4)",
                message: "GST on outward supplies for the month of " + $scope.CurrentMonth + " is being processed…….",
                width: 500,
                bindingOptions:
                {
                    visible: "loadingSubmitGSTNVisible",
                    showIndicator: "showIndicator",
                    showPane: "showPane",
                    shading: "shading",
                    closeOnOutsideClick: "closeOnOutsideClick"
                }
            };
        }
        $scope.loadingSubmitGSTNVisible = false;
        $scope.ShowSubmitGSTNLoadingPanal();
    }
    $scope.PopUpShowForSubmitToGSTN = function () {
        $scope.visibleSubmitGSTNPopup = !$scope.visibleSubmitGSTNPopup;
        $scope.ShowSubmitGSTRMsg = false;
        $scope.SubmitToGSTNButtonDisable = false;
    };
    $scope.SubmitDataToGSTN = function () {
        $scope.loadingSubmitGSTNVisible = !$scope.loadingSubmitGSTNVisible;
        var uData = new AppCommon.Class.EntityUpdateRequest();
        uData.EntityType = AppCommon.EntityType.GST_OS_Header;
        uData.EntityId = $scope.CurrentEntity.EntityId;
        uData.PerformAction = "RETSAVE";
        ServiceHelper.UpdateEntity(uData, function (response) {
            if (response.IsUpdateSuccessful) {
                $scope.ShowSubmitGSTRMsg = true;
            }
            else {
                DevExpress.ui.dialog.alert(response.ErrorMessage, "error");
            }
            $scope.loadingSubmitGSTNVisible = false;
            $scope.SubmitToGSTNButtonDisable = true;
        }, function (response) {
            DevExpress.ui.dialog.alert(response, "error");
            $scope.loadingSubmitGSTNVisible = false;
        });
    };
    //#endregion

    //#region File Return
    $scope.CreateGSTR1SummaryPopUp = function () {
        //#region POPUP GSTR1 SUMMARY
        $scope.readOnlyValue = true;
        $scope.popupFormGSTR1Summary = {
            formData: $scope.GSTRSummaryModel,
            width: 1200,
            height: 550,
            scrollingEnabled: true,
            colCount: 4,
            colSpan: 4,
            labelLocation: "top",
            items: [
            {
                colSpan: 4,
                template: 'SummaryData'
            },
            {
                itemType: "group",
                caption: "GSTR1 Summary",
                colSpan: 2,
                items: [
                {
                    itemType: "group",
                    colSpan: 2,
                    colCount: 1,
                    items: [
                    {
                        editorType: "dxDataGrid",
                        editorOptions:
                        {
                            height: 230,
                            //width: 270,
                            dataSource: $scope.SummaryDetailsModel,
                            columns: [
                            {
                                dataField: 'section_name',
                                caption: 'Return Section'
                            },
                            {
                                dataField: 'ttl_inv',
                                caption: 'Total Invoice Value'
                            },
                            {
                                dataField: 'ttl_tax',
                                caption: 'Total Taxable Value'
                            },
                            {
                                dataField: 'ttl_igst',
                                caption: 'Total IGST'
                            },
                            {
                                dataField: 'ttl_cgst',
                                caption: 'Total CGST'
                            },
                            {
                                dataField: 'ttl_sgst',
                                caption: 'Total SGST'
                            }, ],
                            wordWrapEnabled: true,
                            showColumnLines: false,
                            showRowLines: true,
                            showBorders: true,
                            rowAlternationEnabled: true,
                        },
                    }, ],
                }, ]
            },
            {
                itemType: "group",
                caption: "Counter Party Summary",
                colSpan: 2,
                items: [
                {
                    itemType: "group",
                    colSpan: 2,
                    colCount: 1,
                    items: [
                    {
                        editorType: "dxDataGrid",
                        editorOptions:
                        {
                            height: 245,
                            //width: 270,
                            dataSource: $scope.CounterPartyModel,
                            columns: [
                            {
                                dataField: 'ctin',
                                caption: 'TIN of Supplier'
                            },
                            {
                                dataField: 'ttl_inv',
                                caption: 'Total Invoice Value'
                            },
                            {
                                dataField: 'ttl_tax',
                                caption: 'Total Taxable Value'
                            },
                            {
                                dataField: 'ttl_igst',
                                caption: 'Total IGST'
                            },
                            {
                                dataField: 'ttl_cgst',
                                caption: 'Total CGST'
                            },
                            {
                                dataField: 'ttl_sgst',
                                caption: 'Total SGST'
                            }, ],
                            columnAutoWidth: true,
                            wordWrapEnabled: true,
                            showColumnLines: false,
                            showRowLines: true,
                            showBorders: true,
                            rowAlternationEnabled: true,
                        },
                    }, ],
                }, ]
            },
            {
                colSpan: 4,
                template: 'ESign'
            }]
        };
        $scope.popupGSTR1Summary = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "GSTR1 Summary",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblePopupGSTR1Summary",
            },
            contentTemplate: 'GSTR1SummaryContent'
        };
        $scope.visiblePopupGSTR1Summary = false;
        $scope.showGSTR1SummaryInfo = function () {
            $scope.visiblePopupGSTR1Summary = !$scope.visiblePopupGSTR1Summary;
        };
        //#endregion 
    }
    $scope.ReturnFileToGSTN = function () {
        $rootScope.loadingVisible = true;
        var uData = new AppCommon.Class.EntityUpdateRequest();
        uData.EntityType = AppCommon.EntityType.GST_OS_Header;
        uData.EntityId = $scope.CurrentEntity.EntityId;
        uData.PerformAction = "RETSUM";
        ServiceHelper.UpdateEntity(uData, function (response) {
            if (response.IsUpdateSuccessful) {
                if (response.Entity.ActionResponse == null) DevExpress.ui.dialog.alert("Cannot read property 'gstr1summary' of null", "Error");
                else {
                    $scope.CreateReturnFileModle(response.Entity.ActionResponse);
                    $scope.CreateGSTR1SummaryPopUp();
                    $scope.visiblePopupGSTR1Summary = true;
                }
            }
            else {
                DevExpress.ui.dialog.alert(response.ErrorMessage, "Error");
            }
            $rootScope.loadingVisible = false;
        }, function (response) {
            DevExpress.ui.notify(response, "error", 3000);
            $rootScope.loadingVisible = false;
        });
    }
    $scope.CreateESigningPopup = function () {
        $scope.popupESigning = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "GSTR1 E-Signing",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblePopupESigning",
            },
            contentTemplate: 'ESigning'
        };
        $scope.visiblePopupESigning = false;
        $scope.showGSTR1ESigning = function () {
            $scope.visiblePopupESigning = !$scope.visiblePopupESigning;
        };
        $scope.doAccept = function () {
            var signature = $scope.accept();
            $scope.ESignData = signature.dataUrl
            $scope.visiblePopupESigning = !$scope.visiblePopupESigning;
        }
    }
    $scope.CreateReturnFileModle = function (response) {
        var Sum_TotalInvValue = 0,
            Sum_TotalTaxValue = 0,
            Sum_CGSTTotal = 0,
            Sum_SGSTTotal = 0,
            Sum_IGSTTotal = 0,
            Sum_GSTIN = '',
            Sum_ReturnPeriod = '';
        $scope.ReturnFileGSTNData = response;
        var oData = new $scope.Classes.GSTR1Summary(response.gstr1summary[0]);
        $scope.Sum_TotalInvValue = oData.ttl_inv;
        $scope.Sum_TotalTaxValue = oData.ttl_tax;
        $scope.Sum_CGSTTotal = oData.ttl_cgst;
        $scope.Sum_SGSTTotal = oData.ttl_sgst;
        $scope.Sum_IGSTTotal = oData.ttl_igst;
        $scope.Sum_GSTIN = oData.gstin;
        $scope.Sum_ReturnPeriod = oData.ret_pd;
        $scope.GSTRSummaryModel = oData;
        var oData1 = new $scope.Classes.GSTR1SummaryDetails(response.gstr1summary[0].section_Summary[0]);
        $scope.SummaryDetailsModel.push(oData1);
        var oData2 = new $scope.Classes.CounterParty(response.gstr1summary[0].section_Summary[0].counter_party_summary[0]);
        $scope.CounterPartyModel.push(oData2);
    }
    $scope.EsignClick = function () {
        $scope.loadingfileGSTNloadVisible = true;
        var FileData = {
            fileData: [
            {
                gstr1summary: $scope.ReturnFileGSTNData.gstr1summary,
                signatureType: "Esign",
                signatureId: "AJP4W321"
            }]
        };
        var endpoint = AppSetting.ServiceConfig.WEB_API_ESIGN_URL
        ServiceHelper.GeneralEntity(FileData, endpoint, function (response) {
            if (response.id != null) {
                $scope.EsignDocumentNo(response.id, response.signing_parties[0].Email);
            }
        }, function (response) {
            DevExpress.ui.notify(response, "error", 3000);
            $rootScope.loadingVisible = false;
        });
    }
    $scope.EsignDocumentNo = function (docId, email) {
        $scope.EsignDocumentId = docId;
        var options = {
            "callback": function (t) {
                $scope.loadingfileGSTNloadVisible = false;
                if (t.hasOwnProperty('error_code')) {
                    DevExpress.ui.dialog.alert(t.message, 'Error');
                }
                else {
                    //document.getElementById("result").innerHTML = "Sign Successful"
                    //success();
                    $scope.EsignSuccess(docId);
                }
            },
            "logo": AppSetting.LoginConfig.BaseUrl + "Content/Images/GST_Logo.png"
        };
        var digio = new Digio(options);
        digio.init();
        if (docId) {
            digio.esign(docId, email);
        }
        else {
            digio.cancel();
        }
    }
    $scope.EsignSuccess = function () {
        DevExpress.ui.dialog.alert("Your document has been successfully signed.Please click on submit to file.");
    }
    $scope.ShowfileGSTNloadOptionsPanal = function () {
        $scope.closeOnOutsideClick = false;
        $scope.showIndicator = true;
        $scope.showPane = false;
        $scope.shading = false;
        $scope.fileGSTNloadOptions = {
            shadingColor: "rgba(0,0,0,0.4)",
            message: "loading...",
            width: 500,
            bindingOptions:
            {
                visible: "loadingfileGSTNloadVisible",
                showIndicator: "showIndicator",
                showPane: "showPane",
                shading: "shading",
                closeOnOutsideClick: "closeOnOutsideClick"
            }
        };
    }
    $scope.loadingfileGSTNloadVisible = false;
    $scope.ShowfileGSTNloadOptionsPanal();
    //#endregion

    //#region Receive From GSTN
    $scope.CreateReceiveFromGSTNPopup = function () {
        $scope.ShowReceivFromGSTRMsg = false;
        $scope.popupReceiveFromGSTN = {
            width: 700,
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "Receive from GSTN",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visibleReceiveFromGSTNPopup",
            },
            contentTemplate: 'ReceiveFromGSTN'
        };
        $scope.visibleReceiveFromGSTNPopup = false;
        $scope.ReceiveFromGSTNButtonDisable = false;
        $scope.ReceiveFromGSTNButtonOptions = {
            text: 'Receive',
            bindingOptions:
            {
                disabled: 'ReceiveFromGSTNButtonDisable'
            },
            onClick: function (e) {
                $scope.RecivedDataFromGSTN();
            }
        };
        $scope.ShowReceivFromGSTNLoadingPanal = function () {
            $scope.closeOnOutsideClick = false;
            $scope.showIndicator = true;
            $scope.showPane = false;
            $scope.shading = false;
            $scope.ReceiveFromGSTNloadOptions = {
                shadingColor: "rgba(0,0,0,0.4)",
                message: "GST data received for the month of " + $scope.CurrentMonth + " is being processed…….",
                width: 500,
                bindingOptions:
                {
                    visible: "loadingReceivedFromGSTNVisible",
                    showIndicator: "showIndicator",
                    showPane: "showPane",
                    shading: "shading",
                    closeOnOutsideClick: "closeOnOutsideClick"
                }
            };
        }
        $scope.loadingReceivedFromGSTNVisible = false;
        $scope.ShowReceivFromGSTNLoadingPanal();
    }
    $scope.PopUpShowForReceiveFromGSTN = function () {
        $scope.visibleReceiveFromGSTNPopup = !$scope.visibleReceiveFromGSTNPopup;
        $scope.ShowReceivFromGSTRMsg = false;
        $scope.ReceiveFromGSTNButtonDisable = false;
    };
    $scope.RecivedDataFromGSTN = function () {
        $scope.loadingReceivedFromGSTNVisible = !$scope.loadingReceivedFromGSTNVisible;
        var uData = new AppCommon.Class.EntityUpdateRequest();
        uData.EntityType = AppCommon.EntityType.GST_OS_Header;
        uData.EntityId = $scope.CurrentEntity.EntityId;
        uData.PerformAction = "RETGSTR1A";
        ServiceHelper.UpdateEntity(uData, function (response) {
            if (response.IsUpdateSuccessful != null) {
                $scope.ShowReceivFromGSTRMsg = true;
            }
            else {
                DevExpress.ui.notify(response.ErrorMessage, "error", 3000);
            }
            $scope.loadingReceivedFromGSTNVisible = false;
            $scope.ReceiveFromGSTNButtonDisable = true;
        }, function (response) {
            DevExpress.ui.notify(response, "error", 3000);
            $scope.loadingReceivedFromGSTNVisible = false;
        });
    };
    //#endregion

    //#region Submit
    $scope.SubmitFileToGSTN = function () {
        $rootScope.loadingVisible = true;
        var uData = new AppCommon.Class.EntityUpdateRequest();
        uData.EntityType = AppCommon.EntityType.GST_OS_Header;
        uData.EntityId = $scope.CurrentEntity.EntityId;
        uData.PerformAction = "RETSUBMIT";
        var FileData = {
            fileData: [
            {
                gstr1summary: $scope.ReturnFileGSTNData.gstr1summary,
                signatureType: "Esign",
                signatureId: "AJP4W321",
                DocumentId: $scope.EsignDocumentId
            }]
        };
        uData.Data = FileData;
        ServiceHelper.UpdateEntity(uData, function (response) {
            if (response.IsUpdateSuccessful) {
                $rootScope.loadingVisible = false;
                DevExpress.ui.notify("Save Successfully , Acknowledgement no = " + response.Entity.ActionResponse.ack_num, "success", 3000);
            }
            else {
                $rootScope.loadingVisible = false;
                DevExpress.ui.notify(response.ErrorMessage, "error", 3000);
            }
        }, function (response) {
            $rootScope.loadingVisible = false;
            DevExpress.ui.notify(response, "error", 3000);
        });
    }
    //#endregion
    //#region Set Help indectors
    $scope.HelpIndicator=function()
    {
        $('[data-toggle="popover"]').popover({
            placement: 'top',
            trigger: 'hover',
            delay: {
                show: 500,
                hide: 500
            },
            html: true
        });
    }
    //#endregion
    //#region Init start
    $scope.Init = function () {
        $scope.CreateForm();
        $scope.CreateB2BPopup();
        $scope.CreateB2CPopup();
        $scope.CreateAdvanceTaxPopup();
        $scope.CreateInvoiceSummaryPopup();
        $scope.CreateOthersPopup();
        $scope.CreateCNDNPopup();
        $scope.CreateB2BHistoryPopup();
        $scope.CreateB2CHistoryPopup();
        $scope.CreateCNDNHistoryPopup();
        $scope.CreateAdvanceTaxHistoryPopup();
        $scope.CreateImportPopup();
        $scope.CreateOtherHistoryPopup();
        $scope.CreateSubmitGSTNPopup();
        $scope.CreateReceiveFromGSTNPopup();
        $scope.CreateESigningPopup();
        $scope.ShowDataImportLoadingPanal();
        $scope.formOptions = $scope.viewmodelGSTR2;
        $scope.HelpIndicator();
        $timeout($scope.SetToolTip, 1000);
    }
    //#endregion
});
//#endregion
//#region Directive
exGSP.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.SelectedInterfaceFileName = scope.SelectedImportFileName = '';
                if (element[0].id == "Interface") scope.SelectedInterfaceFileName = element[0].files[0].name;
                else scope.SelectedImportFileName = element[0].files[0].name;
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
//#endregion