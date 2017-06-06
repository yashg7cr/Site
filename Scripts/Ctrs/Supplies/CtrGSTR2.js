exGSP = window.exGSP ||
{};

exGSP.controller('CtrGSTR2', function DemoController($scope, $rootScope, $location, ServiceHelper, $timeout) {
    $rootScope.loadingVisible = true;
    $rootScope.$emit("CallStatusMethod", { show: true, fileName: "GSTRStatusInward.html" });
    $scope.CurrentEntity = null;
    $scope.IstoReload = false;
    $scope.currentRow = null;
    $scope.existingRowEditingMode = false;
    $scope.formInstance = null;
    $scope.Classes = {
        B2B: function (oHB2B, oB2B) {
            return {
                HeaderID: oHB2B.Id,
                ID: oB2B.Id,
                FormType: oB2B.FormTypeName,
                SectionType: oB2B.SectionType,
                CounterPartyGSTIN: oB2B.CounterPartyGSTIN,
                ReverseCharge: oB2B.ReverseCharge,
                InvoiceNo: oB2B.InvoiceNo,
                InvoiceDate: oB2B.InvoiceDate,
                InvoiceValue: oB2B.InvoiceValue,
                GoodsService: oB2B.GoodsService,
                HSNSACCode: oB2B.HSNSACCode,
                TaxableValue: oB2B.TaxableValue,
                IGST_Rate: oB2B.IGST_Rate,
                IGST_Amount: oB2B.IGST_Amount,
                CGST_Rate: oB2B.CGST_Rate,
                CGST_Amount: oB2B.CGST_Amount,
                SGST_Rate: oB2B.SGST_Rate,
                SGST_Amount: oB2B.SGST_Amount,
                POS: oB2B.POS,
                ITCEligibility: oB2B.ITCEligibility,
                TotalITCIGST_Amount: oB2B.TotalITCIGST_Amount,
                TotalITCCGST_Amount: oB2B.TotalITCCGST_Amount,
                TotalITCSGST_Amount: oB2B.TotalITCSGST_Amount,
                MonthITCIGST_Amount: oB2B.MonthITCIGST_Amount,
                MonthITCCGST_Amount: oB2B.MonthITCCGST_Amount,
                MonthITCSGST_Amount: oB2B.MonthITCSGST_Amount,
                TotalITCAdmissible: oB2B.TotalITCAdmissible,
                MonthITCAdmissible: oB2B.MonthITCAdmissible,
                SourceIdentifier: oB2B.SourceIdentifier,
                Status: oB2B.Status,
                StatusName: oB2B.StatusName,
                Filed: false,
                LineType: "",
            }
        },
        CNDN: function (oHCNDN, oCNDN, oCNDNA) {
            return {
                HeaderID: oHCNDN.Id,
                ID: oCNDN.Id,
                FormType: oCNDN.FormTypeName,
                SectionType: oCNDN.SectionType,
                CounterPartyGSTINOrUIN: oCNDN.CounterPartyGSTINOrUIN,
                CDNType: oCNDN.CDNType,
                CDNNo: oCNDN.CDNNo,
                CDNDate: oCNDN.CDNDate,
                OriginalInvoiceNo: oCNDN.OriginalInvoiceNo,
                InvoiceDate: oCNDN.InvoiceDate,
                DifferentialValue: oCNDN.DifferentialValue,
                IGST_Rate: oCNDN.IGST_Rate,
                IGST_Amount: oCNDN.IGST_Amount,
                CGST_Rate: oCNDN.CGST_Rate,
                CGST_Amount: oCNDN.CGST_Amount,
                SGST_Rate: oCNDN.SGST_Rate,
                SGST_Amount: oCNDN.SGST_Amount,
                TotalITCIGST_Amount: oCNDN.TotalITCIGST_Amount,
                TotalITCCGST_Amount: oCNDN.TotalITCCGST_Amount,
                TotalITCSGST_Amount: oCNDN.TotalITCSGST_Amount,
                MonthITCIGST_Amount: oCNDN.MonthITCIGST_Amount,
                MonthITCCGST_Amount: oCNDN.MonthITCCGST_Amount,
                MonthITCSGST_Amount: oCNDN.MonthITCSGST_Amount,
                SourceIdentifier: oCNDN.SourceIdentifier,
                Filed: false,
                LineType: "",
            }
        },
        NilOrExempted: function (oHUTP, oUTP) {
            return {
                HeaderID: oHUTP.Id,
                ID: oUTP.Id,
                FormType: oUTP.FormTypeName,
                SectionType: oUTP.SectionType,
                HSNSACCode: oUTP.HSNSACCode,
                CmpdDealerSuppliesValue: oUTP.CmpdDealerSuppliesValue,
                URDealerSuppliesValue: oUTP.URDealerSuppliesValue,
                ExemptedSuppliesValue: oUTP.ExemptedSuppliesValue,
                NilRatedSuppliesValue: oUTP.NilRatedSuppliesValue,
                NonGSTSuppliesValue: oUTP.NonGSTSuppliesValue,
                SourceIdentifier: oUTP.SourceIdentifier,
                SupplyType: oUTP.SupplyType,
                Filed: false,
                LineType: "",
            }
        },
        ISD: function (oHISD, oISD) {
            return {
                HeaderID: oHISD.Id,
                ID: oISD.Id,
                FormType: oISD.FormTypeName,
                SectionType: oISD.SectionType,
                CGST_Amount: oISD.CGST_Amount,
                InvoiceNo: oISD.InvoiceNo,
                InvoiceDate: oISD.InvoiceDate,
                SGST_Amount: oISD.SGST_Amount,
                IGST_Amount: oISD.IGST_Amount,
                SAC: oISD.SAC,
                GSTIN_ISD: oISD.GSTIN_ISD,
                SourceIdentifier: oISD.SourceIdentifier,
                Filed: false,
                LineType: "",

            }
        },
        TDS: function (oHTDS, oTDS) {
            return {
                HeaderID: oHTDS.Id,
                ID: oTDS.Id,
                FormType: oTDS.FormTypeName,
                SectionType: oTDS.SectionType,
                DeducteeGSTIN: oTDS.DeducteeGSTIN,
                InvoiceNo: oTDS.InvoiceNo,
                InvoiceDate: oTDS.InvoiceDate,
                InvoiceValue: oTDS.InvoiceValue,
                PaymentDateToDeductee: oTDS.PaymentDateToDeductee,
                TDS_ApplicableValue: oTDS.TDS_ApplicableValue,
                IGST_Rate: oTDS.IGST_Rate,
                IGST_Amount: oTDS.IGST_Amount,
                CGST_Rate: oTDS.CGST_Rate,
                CGST_Amount: oTDS.CGST_Amount,
                SGST_Rate: oTDS.SGST_Rate,
                SGST_Amount: oTDS.SGST_Amount,
                InvoiceCheckSumValue: oTDS.InvoiceCheckSumValue,
                SourceIdentifier: oTDS.SourceIdentifier,
                Filed: false,
                LineType: "",
            }
        },
        TCS: function (oHTCS, oTCS) {
            return {
                HeaderID: oHTCS.Id,
                ID: oTCS.Id,
                FormType: oTCS.FormTypeName,
                SectionType: oTCS.SectionType,
                EcommerceOperatorGSTIN: oTCS.EcommerceOperatorGSTIN,
                IssuedEcommerceMerchantId: oTCS.IssuedEcommerceMerchantId,
                GrossSuppliesValue: oTCS.GrossSuppliesValue,
                TaxableTCSValue: oTCS.TaxableTCSValue,
                IGST_Rate: oTCS.IGST_Rate,
                IGST_Amount: oTCS.IGST_Amount,
                CGST_Rate: oTCS.CGST_Rate,
                CGST_Amount: oTCS.CGST_Amount,
                SGST_Rate: oTCS.SGST_Rate,
                SGST_Amount: oTCS.SGST_Amount,
                SourceIdentifier: oTCS.SourceIdentifier,
                Filed: false,
                LineType: "",
            }
        },
        ICT: function (oHICT, oICT) {
            return {
                HeaderID: oHICT.Id,
                ID: oICT.Id,
                FormType: oICT.FormTypeName,
                SectionType: oICT.SectionType,
                OriginalInvoiceNo: oICT.OriginalInvoiceNo,
                OriginalInvoiceDate: oICT.OriginalInvoiceDate,
                EarlierIGST_Value: oICT.EarlierIGST_Value,
                CurrentIGST_Value: oICT.CurrentIGST_Value,
                EarlierCGST_Value: oICT.EarlierCGST_Value,
                CurrentCGST_Value: oICT.CurrentCGST_Value,
                EarlierSGST_Value: oICT.EarlierSGST_Value,
                CurrentSGST_Value: oICT.CurrentSGST_Value,
                SourceIdentifier: oICT.SourceIdentifier,
                Filed: false,
                LineType: "",
            }
        },
        TaxPaid: function (oHTaxPaid, oTaxPaid) {
            return {
                HeaderID: oHTaxPaid.Id,
                ID: oTaxPaid.Id,
                FormType: oTaxPaid.FormTypeName,
                SectionType: oTaxPaid.SectionType,
                SupplierInvoiceNo: oTaxPaid.SupplierInvoiceNo,
                SupplierInvoiceDate: oTaxPaid.SupplierInvoiceDate,
                TransactionID: oTaxPaid.TransactionID,
                IGST_Rate: oTaxPaid.IGST_Rate,
                IGST_Tax: oTaxPaid.IGST_Tax,
                CGST_Rate: oTaxPaid.CGST_Rate,
                CGST_Tax: oTaxPaid.CGST_Tax,
                SGST_Rate: oTaxPaid.SGST_Rate,
                SGST_Tax: oTaxPaid.SGST_Tax,
                SourceIdentifier: oTaxPaid.SourceIdentifier,
                Filed: false,
                LineType: "",
            }
        },
        ITCRev: function (oHITCRev, oITCRev, oITCRevA) {
            return {
                HeaderID: oHITCRev.Id,
                ID: oITCRev.Id,
                FormType: oITCRev.FormTypeName,
                SectionType: oITCRev.SectionType,
                SerialNo: oITCRev.SerialNo,
                Description: oITCRev.Description,
                IGST_Amount: oITCRev.IGST_Amount,
                CGST_Amount: oITCRev.CGST_Amount,
                SGST_Amount: oITCRev.SGST_Amount,
                IGST_Interest: oITCRev.IGST_Interest,
                CGST_Interest: oITCRev.CGST_Interest,
                SGST_Interest: oITCRev.SGST_Interest,
                GSTISReturnId: oITCRev.GSTISReturnId,
                SourceIdentifier: oITCRev.SourceIdentifier,
                Filed: false,
                LineType: "",
                //TaxPeriod: oITCRevA.TaxPeriod,
            }
        },

        B2BHistory: function (oB2B) {
            return {
                ID: oB2B.Id,
                FormType: oB2B.FormTypeName,
                SectionType: oB2B.SectionType,
                CounterPartyGSTIN: oB2B.CounterPartyGSTIN,
                ReverseCharge: oB2B.ReverseCharge,
                InvoiceNo: oB2B.InvoiceNo,
                InvoiceDate: oB2B.InvoiceDate,
                InvoiceValue: oB2B.InvoiceValue,
                GoodsService: oB2B.GoodsService,
                HSNSACCode: oB2B.HSNSACCode,
                TaxableValue: oB2B.TaxableValue,
                IGST_Rate: oB2B.IGST_Rate,
                IGST_Amount: oB2B.IGST_Amount,
                CGST_Rate: oB2B.CGST_Rate,
                CGST_Amount: oB2B.CGST_Amount,
                SGST_Rate: oB2B.SGST_Rate,
                SGST_Amount: oB2B.SGST_Amount,
                POS: oB2B.POS,
                ITCEligibility: oB2B.ITCEligibility,
                TotalITCIGST_Amount: oB2B.TotalITCIGST_Amount,
                TotalITCCGST_Amount: oB2B.TotalITCCGST_Amount,
                TotalITCSGST_Amount: oB2B.TotalITCSGST_Amount,
                MonthITCIGST_Amount: oB2B.MonthITCIGST_Amount,
                MonthITCCGST_Amount: oB2B.MonthITCCGST_Amount,
                MonthITCSGST_Amount: oB2B.MonthITCSGST_Amount,
                TotalITCAdmissible: oB2B.TotalITCAdmissible,
                MonthITCAdmissible: oB2B.MonthITCAdmissible,
                SourceIdentifier: oB2B.SourceIdentifier,
                Status: oB2B.Status,
                StatusName: oB2B.StatusName,
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
                CDNDate: oCNDN.CDNDate,
                OriginalInvoiceNo: oCNDN.OriginalInvoiceNo,
                InvoiceDate: oCNDN.InvoiceDate,
                DifferentialValue: oCNDN.DifferentialValue,
                IGST_Rate: oCNDN.IGST_Rate,
                IGST_Amount: oCNDN.IGST_Amount,
                CGST_Rate: oCNDN.CGST_Rate,
                CGST_Amount: oCNDN.CGST_Amount,
                SGST_Rate: oCNDN.SGST_Rate,
                SGST_Amount: oCNDN.SGST_Amount,
            }
        },
        NilOrExemptedHistory: function (oUTP) {
            return {

                ID: oUTP.Id,
                FormType: oUTP.FormTypeName,
                SectionType: oUTP.SectionType,
                HSNSACCode: oUTP.HSNSACCode,
                CmpdDealerSuppliesValue: oUTP.CmpdDealerSuppliesValue,
                URDealerSuppliesValue: oUTP.URDealerSuppliesValue,
                ExemptedSuppliesValue: oUTP.ExemptedSuppliesValue,
                NilRatedSuppliesValue: oUTP.NilRatedSuppliesValue,
                NonGSTSuppliesValue: oUTP.NonGSTSuppliesValue,
            }
        },
        ISDHistory: function (oISD) {
            return {
                ID: oISD.Id,
                FormType: oISD.FormTypeName,
                SectionType: oISD.SectionType,
                CGST_Amount: oISD.CGST_Amount,
                InvoiceNo: oISD.InvoiceNo,
                InvoiceDate: oISD.InvoiceDate,
                SGST_Amount: oISD.SGST_Amount,
                IGST_Amount: oISD.IGST_Amount,
                SAC: oISD.SAC,
                GSTIN_ISD: oISD.GSTIN_ISD,
            }
        },
        TDSHistory: function (oTDS) {
            return {
                ID: oTDS.Id,
                FormType: oTDS.FormTypeName,
                SectionType: oTDS.SectionType,
                DeducteeGSTIN: oTDS.DeducteeGSTIN,
                InvoiceNo: oTDS.InvoiceNo,
                InvoiceDate: oTDS.InvoiceDate,
                InvoiceValue: oTDS.InvoiceValue,
                PaymentDateToDeductee: oTDS.PaymentDateToDeductee,
                TDS_ApplicableValue: oTDS.TDS_ApplicableValue,
                IGST_Rate: oTDS.IGST_Rate,
                IGST_Amount: oTDS.IGST_Amount,
                CGST_Rate: oTDS.CGST_Rate,
                CGST_Amount: oTDS.CGST_Amount,
                SGST_Rate: oTDS.SGST_Rate,
                SGST_Amount: oTDS.SGST_Amount,
                InvoiceCheckSumValue: oTDS.InvoiceCheckSumValue,
            }
        },
        TCSHistory: function (oTCS) {
            return {
                ID: oTCS.Id,
                FormType: oTCS.FormTypeName,
                SectionType: oTCS.SectionType,
                EcommerceOperatorGSTIN: oTCS.EcommerceOperatorGSTIN,
                IssuedEcommerceMerchantId: oTCS.IssuedEcommerceMerchantId,
                GrossSuppliesValue: oTCS.GrossSuppliesValue,
                TaxableTCSValue: oTCS.TaxableTCSValue,
                IGST_Rate: oTCS.IGST_Rate,
                IGST_Amount: oTCS.IGST_Amount,
                CGST_Rate: oTCS.CGST_Rate,
                CGST_Amount: oTCS.CGST_Amount,
                SGST_Rate: oTCS.SGST_Rate,
                SGST_Amount: oTCS.SGST_Amount,
            }
        },
        ICTHistory: function (oICT) {
            return {
                ID: oICT.Id,
                FormType: oICT.FormTypeName,
                SectionType: oICT.SectionType,
                OriginalInvoiceNo: oICT.OriginalInvoiceNo,
                OriginalInvoiceDate: oICT.OriginalInvoiceDate,
                EarlierIGST_Value: oICT.EarlierIGST_Value,
                CurrentIGST_Value: oICT.CurrentIGST_Value,
                EarlierCGST_Value: oICT.EarlierCGST_Value,
                CurrentCGST_Value: oICT.CurrentCGST_Value,
                EarlierSGST_Value: oICT.EarlierSGST_Value,
                CurrentSGST_Value: oICT.CurrentSGST_Value,
            }
        },
        TaxPaidHistory: function (oTaxPaid) {
            return {
                ID: oTaxPaid.Id,
                FormType: oTaxPaid.FormTypeName,
                SectionType: oTaxPaid.SectionType,
                SupplierInvoiceNo: oTaxPaid.SupplierInvoiceNo,
                SupplierInvoiceDate: oTaxPaid.SupplierInvoiceDate,
                TransactionID: oTaxPaid.TransactionID,
                IGST_Rate: oTaxPaid.IGST_Rate,
                IGST_Tax: oTaxPaid.IGST_Tax,
                CGST_Rate: oTaxPaid.CGST_Rate,
                CGST_Tax: oTaxPaid.CGST_Tax,
                SGST_Rate: oTaxPaid.SGST_Rate,
                SGST_Tax: oTaxPaid.SGST_Tax,
            }
        },
        ITCRevHistory: function (oITCRev) {
            return {
                ID: oITCRev.Id,
                FormType: oITCRev.FormTypeName,
                SectionType: oITCRev.SectionType,
                SerialNo: oITCRev.SerialNo,
                Description: oITCRev.Description,
                IGST_Amount: oITCRev.IGST_Amount,
                CGST_Amount: oITCRev.CGST_Amount,
                SGST_Amount: oITCRev.SGST_Amount,
                IGST_Interest: oITCRev.IGST_Interest,
                CGST_Interest: oITCRev.CGST_Interest,
                SGST_Interest: oITCRev.SGST_Interest,
                GSTISReturnId: oITCRev.GSTISReturnId,
            }
        },

        GSTR2Summary: function (oGSTR2) {
            return {
                gstin: oGSTR2.gstin,
                ret_pd: oGSTR2.ret_pd,
                checksum: oGSTR2.checksum,
                ttl_inv: oGSTR2.ttl_inv,
                ttl_tax: oGSTR2.ttl_tax,
                ttl_igst: oGSTR2.ttl_igst,
                ttl_cgst: oGSTR2.ttl_cgst,
                ttl_sgst: oGSTR2.ttl_sgst,
            }
        },
        GSTR2SummaryDetails: function (oGSTR) {
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
        }
    };

    //#region Model
    $scope.B2BModel = [];
    $scope.CNDNModel = [];
    $scope.UTPModel = [];
    $scope.ISDModel = [];
    $scope.TDSModel = [];
    $scope.TCSModel = [];
    $scope.ICTModel = [];
    $scope.TaxPaidModel = [];
    $scope.ITCRevModel = [];

    $scope.B2BHistoryModel = [];
    $scope.CNDNHistoryModel = [];
    $scope.UTPHistoryModel = [];
    $scope.ISDHistoryModel = [];
    $scope.TDSHistoryModel = [];
    $scope.TCSHistoryModel = [];
    $scope.ICTHistoryModel = [];
    $scope.TaxPaidHistoryModel = [];
    $scope.ITCRevHistoryModel = [];

    $scope.GSTRSummaryModel = [];
    $scope.SummaryDetailsModel = [];
    $scope.CounterPartyModel = [];

    $scope.B2BDataModel = [];
    $scope.CNDDataModel = [];
    $scope.UTPDataModel = [];
    $scope.ISDDataModel = [];
    $scope.TDSDataModel = [];
    $scope.TCSDataModel = [];
    $scope.ICTDataModel = [];
    $scope.TaxPaidDataModel = [];
    $scope.ITCDataRevModel = [];

    var B2BSectionTypeModel = ['4', '4A', '5', '5A', '6', '6A', '12', '12A', ];
    var ISDSectionTypeModel = ['9'];
    var CNDNSectionTypeModel = ['7', '7A', ];
    var ITCSectionTypeModel = ['8'];
    var TDSCreditSectionTypeModel = ['10(1)', ];
    var TCSCreditSectionTypeModel = ['10(2)', ];
    var ITCReceivedSectionTypeModel = ['11', ];
    var PrePaidInvoicesSectionTypeModel = ['13', ];
    var ITCReversalSectionTypeModel = ['14', '14A'];
    var GoodServicesModel = ['G', 'S'];
    var TaxRateModel = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

    //#endregion

    $scope.GetResource = function () {
        var CurrentPage = $location.search();
        $scope.CurrentMonth = CurrentPage.val;
        var rData = new AppCommon.Class.EntityQueryRequest();
        rData.EntityType = AppCommon.EntityType.GST_IS_Header;
        rData.FileterConditions[0].PropertyName = "id",
        rData.FileterConditions[0].PropertyValue = CurrentPage.Current,
        rData.FileterConditions[0].PropertyDataType = "5",
        ServiceHelper.QueryEntity(rData,
            function (response) {
                if (response.Entitities != null) {
                    $scope.SuccessDataCall(response.Entitities[0]);
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
        $scope.CurrentEntity = response;
        $scope.CreateB2BModal(response.Data.GST_IS_Header, response.Data.GST_IS_B2B_Lines || {}, response.Data.GST_IS_B2BA_Lines || {});
        $scope.CreateCNDNModal(response.Data.GST_IS_Header, response.Data.GST_IS_CDN || {}, response.Data.GST_IS_CDNA || {});
        $scope.CreateUTPModal(response.Data.GST_IS_Header, response.Data.GST_IS_NilOrExempted || {});
        $scope.CreateISDModal(response.Data.GST_IS_Header, response.Data.GST_IS_ISDReturn || {});
        $scope.CreateTDSModal(response.Data.GST_IS_Header, response.Data.GST_IS_TDSReturn || {});
        $scope.CreateTCSModal(response.Data.GST_IS_Header, response.Data.GST_IS_TCSReturn || {});
        $scope.CreateICTModal(response.Data.GST_IS_Header, response.Data.GST_IS_ITCAvailed || {});
        $scope.CreateTaxPaidModal(response.Data.GST_IS_Header, response.Data.GST_IS_TaxPaid || {});
        $scope.CreateITCRevModal(response.Data.GST_IS_Header, response.Data.GST_IS_ITCReversal || {}, response.Data.GST_IS_ITCReversalA || {});
        $scope.Init();
        $rootScope.loadingVisible = false;
    }

    $scope.GetHistoryResource = function (CurrentID, visiblepopup, options) {
        $scope.CurrentOpenHistory = { LineType: options.LineType, Id: options.ID };
        $scope.DisableAcceptReject = options.Status == AppCommon.Constant.Mismatched || options.Status == AppCommon.Constant.Additional ? false : true;
        var rData = new AppCommon.Class.EntityQueryRequest();
        rData.EntityType = AppCommon.EntityType.GST_EntityReturnHistory;
        rData.FileterConditions[0].PropertyName = "EntityId";
        rData.FileterConditions[0].PropertyValue = CurrentID;
        rData.FileterConditions[0].PropertyDataType = "5";
        ServiceHelper.QueryEntity(rData,
            function (response) {
                if (response.Entitities != null) {
                    if (response.Entitities.length > 0) {
                        $scope.SuccessHistoryDataCall(response.Entitities, visiblepopup);
                    }
                    if (visiblepopup == 'B2B')
                        $scope.visiblePopupBtoBGrid = true;
                    else if (visiblepopup == 'ITCNA')
                        $scope.visibleUnregistredTaxpayerGrid = true;
                    else if (visiblepopup == 'CNDN')
                        $scope.visiblePopupCNDNGrid = true;
                    else if (visiblepopup == 'ISD')
                        $scope.visiblePopupISDCReditGrid = true;
                    else if (visiblepopup == 'TDS')
                        $scope.visiblepopupTDSCreditGrid = true;
                    else if (visiblepopup == 'TCS')
                        $scope.visiblepopupTCSCreditGrid = true;
                    else if (visiblepopup == 'ICT')
                        $scope.visiblepopupICTGrid = true;
                    else if (visiblepopup == 'PPI')
                        $scope.visiblepopupTaxPaidOnInvoiceGrid = true;
                    else if (visiblepopup == 'ITCRV')
                        $scope.visiblepopupITCReversalGrid = true;
                    //}
                    //else {
                    //    DevExpress.ui.dialog.alert('History data not found', 'Info');
                    //}
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

    $scope.SuccessHistoryDataCall = function (response, HistoryType) {
        if (HistoryType == 'B2B')
            $scope.CreateB2BHistoryModal(response[0].Data);
        else if (HistoryType == 'UTP')
            $scope.CreateUTPHistoryModal(response[0].Data);
        else if (HistoryType == 'CNDN')
            $scope.CreateCNDNHistoryModal(response[0].Data);
        else if (HistoryType == 'ISD')
            $scope.CreateISDHistoryModal(response[0].Data);
        else if (HistoryType == 'TDS')
            $scope.CreateTDSHistoryModal(response[0].Data);
        else if (HistoryType == 'TCS')
            $scope.CreateTCSHistoryModal(response[0].Data);
        else if (HistoryType == 'ICT')
            $scope.CreateICTHistoryModal(response[0].Data);
        else if (HistoryType == 'TAXPAID')
            $scope.CreateTaxPaidHistoryModal(response[0].Data);
        else if (HistoryType == 'ITC')
            $scope.CreateITCRevHistoryModal(response[0].Data);
        $rootScope.loadingVisible = false;
    }

    $scope.CreateB2BModal = function (dataHeader, dataB2B, dataB2BA) {
        $.each(dataB2B, function (i, item) {
            var oData = new $scope.Classes.B2B(dataHeader[0], item);
            oData.LineType = "GST_IS_B2B_Lines";
            $scope.B2BModel.push(oData);
        });
        $.each(dataB2BA, function (i, item) {
            var oData = new $scope.Classes.B2B(dataHeader[0], item);
            oData.LineType = "GST_IS_B2BA_Lines";
            $scope.B2BModel.push(oData);
        });
    }
    $scope.CreateCNDNModal = function (dataHeader, dataCDN, dataCDNA) {
        $.each(dataCDN, function (i, item) {
            var oData = new $scope.Classes.CNDN(dataHeader[0], item);
            oData.LineType = "GST_IS_CDN";
            $scope.CNDNModel.push(oData);
        });
        $.each(dataCDNA, function (i, item) {
            var oData = new $scope.Classes.CNDN(dataHeader[0], item);
            oData.LineType = "GST_IS_CDNA";
            $scope.CNDNModel.push(oData);
        });
    }
    $scope.CreateUTPModal = function (dataHeader, dataUTP) {
        $.each(dataUTP, function (i, item) {
            var oData = new $scope.Classes.NilOrExempted(dataHeader[0], item);
            oData.LineType = "GST_IS_NilOrExempted";
            $scope.UTPModel.push(oData);
        });

    }
    $scope.CreateISDModal = function (dataHeader, dataISD) {
        $.each(dataISD, function (i, item) {
            var oData = new $scope.Classes.ISD(dataHeader[0], item);
            oData.LineType = "GST_IS_ISDReturn";
            $scope.ISDModel.push(oData);
        });

    }
    $scope.CreateTDSModal = function (dataHeader, dataTDS) {
        $.each(dataTDS, function (i, item) {
            var oData = new $scope.Classes.TDS(dataHeader[0], item);
            oData.LineType = "GST_IS_TDSReturn";
            $scope.TDSModel.push(oData);
        });

    }
    $scope.CreateTCSModal = function (dataHeader, dataTCS) {
        $.each(dataTCS, function (i, item) {
            var oData = new $scope.Classes.TCS(dataHeader[0], item);
            oData.LineType = "GST_IS_TCSReturn";
            $scope.TCSModel.push(oData);
        });

    }
    $scope.CreateICTModal = function (dataHeader, dataICT) {
        $.each(dataICT, function (i, item) {
            var oData = new $scope.Classes.ICT(dataHeader[0], item);
            oData.LineType = "GST_IS_ITCAvailed";
            $scope.ICTModel.push(oData);
        });

    }
    $scope.CreateTaxPaidModal = function (dataHeader, dataTaxpaid) {
        $.each(dataTaxpaid, function (i, item) {
            var oData = new $scope.Classes.TaxPaid(dataHeader[0], item);
            oData.LineType = "GST_IS_TaxPaid";
            $scope.TaxPaidModel.push(oData);
        });

    }
    $scope.CreateITCRevModal = function (dataHeader, dataITCRev, dataITCRevA) {
        $.each(dataITCRev, function (i, item) {
            var oData = new $scope.Classes.ITCRev(dataHeader[0], item);
            oData.LineType = "GST_IS_ITCReversal";
            $scope.ITCRevModel.push(oData);
        });
        $.each(dataITCRevA, function (i, item) {
            var oData = new $scope.Classes.ITCRev(dataHeader[0], item);
            oData.LineType = "GST_IS_ITCReversalA";
            $scope.ITCRevModel.push(oData);
        });

    }

    $scope.CreateB2BHistoryModal = function (dataHeader) {
        $.each(dataHeader, function (i, item) {
            var oData = new $scope.Classes.B2BHistory(dataHeader[0]);
            $scope.B2BHistoryModel.push(oData);
        });

    }
    $scope.CreateCNDNHistoryModal = function (dataHeader) {
        $.each(dataHeader, function (i, item) {
            var oData = new $scope.Classes.CNDNHistory(dataHeader[0]);
            $scope.CNDNHistoryModel.push(oData);
        });

    }
    $scope.CreateUTPHistoryModal = function (dataHeader) {
        $.each(dataHeader, function (i, item) {
            var oData = new $scope.Classes.NilOrExemptedHistory(dataHeader[0]);
            $scope.UTPHistoryModel.push(oData);
        });

    }
    $scope.CreateISDHistoryModal = function (dataHeader) {
        $.each(dataHeader, function (i, item) {
            var oData = new $scope.Classes.ISDHistory(dataHeader[0]);
            $scope.ISDHistoryModel.push(oData);
        });

    }
    $scope.CreateTDSHistoryModal = function (dataHeader) {
        $.each(dataHeader, function (i, item) {
            var oData = new $scope.Classes.TDSHistory(dataHeader[0]);
            $scope.TDSModel.push(oData);
        });

    }
    $scope.CreateTCSHistoryModal = function (dataHeader) {
        $.each(dataHeader, function (i, item) {
            var oData = new $scope.Classes.TCSHistory(dataHeader[0]);
            $scope.TCSHistoryModel.push(oData);
        });

    }
    $scope.CreateICTHistoryModal = function (dataHeader) {
        $.each(dataHeader, function (i, item) {
            var oData = new $scope.Classes.ICTHistory(dataHeader[0]);
            $scope.ICTHistoryModel.push(oData);
        });

    }
    $scope.CreateTaxPaidHistoryModal = function (dataHeader) {
        $.each(dataHeader, function (i, item) {
            var oData = new $scope.Classes.TaxPaidHistory(dataHeader[0]);
            $scope.TaxPaidHistoryModel.push(oData);
        });

    }
    $scope.CreateITCRevHistoryModal = function (dataHeader) {
        $.each(dataHeader, function (i, item) {
            var oData = new $scope.Classes.ITCRevHistory(dataHeader[0]);
            $scope.ITCRevHistoryModel.push(oData);
        });
    }

    //#region Model Data
    var ViewReportModel = [{
        "ID": 1,
        "Name": "View Submitted Data",
    }, {
        "ID": 2,
        "Name": "View Received Data",
    }, {
        "ID": 3,
        "Name": "View Filed Data Summary",
    }, ];
    var GSTR2SummaryModel = [
       {
           "ID": 1,
           "gstin": "GSTIN1",
           "ret_pd": '032016',
           "checksum": "Y",
           "ttl_inv": 10000,
           "ttl_tax": 10000,
           "ttl_igst": 10000,
           "ttl_cgst": 10000,
           "ttl_sgst": 10000,
       }, {
           "ID": 2,
           "gstin": "GSTIN1",
           "ret_pd": '032016',
           "checksum": "Y",
           "ttl_inv": 10000,
           "ttl_tax": 10000,
           "ttl_igst": 10000,
           "ttl_cgst": 10000,
           "ttl_sgst": 10000,
       }, {
           "ID": 3,
           "gstin": "GSTIN1",
           "ret_pd": '032016',
           "checksum": "Y",
           "ttl_inv": 10000,
           "ttl_tax": 10000,
           "ttl_igst": 10000,
           "ttl_cgst": 10000,
           "ttl_sgst": 10000,
       }, {
           "ID": 3,
           "gstin": "GSTIN1",
           "ret_pd": '032016',
           "checksum": "Y",
           "ttl_inv": 10000,
           "ttl_tax": 10000,
           "ttl_igst": 10000,
           "ttl_cgst": 10000,
           "ttl_sgst": 10000,
       }, {
           "ID": 3,
           "gstin": "GSTIN1",
           "ret_pd": '032016',
           "checksum": "Y",
           "ttl_inv": 10000,
           "ttl_tax": 10000,
           "ttl_igst": 10000,
           "ttl_cgst": 10000,
           "ttl_sgst": 10000,
       }, {
           "ID": 3,
           "gstin": "GSTIN1",
           "ret_pd": '032016',
           "checksum": "Y",
           "ttl_inv": 10000,
           "ttl_tax": 10000,
           "ttl_igst": 10000,
           "ttl_cgst": 10000,
           "ttl_sgst": 10000,
       }, {
           "ID": 3,
           "gstin": "GSTIN1",
           "ret_pd": '032016',
           "checksum": "Y",
           "ttl_inv": 10000,
           "ttl_tax": 10000,
           "ttl_igst": 10000,
           "ttl_cgst": 10000,
           "ttl_sgst": 10000,
       }, {
           "ID": 3,
           "gstin": "GSTIN1",
           "ret_pd": '032016',
           "checksum": "Y",
           "ttl_inv": 10000,
           "ttl_tax": 10000,
           "ttl_igst": 10000,
           "ttl_cgst": 10000,
           "ttl_sgst": 10000,
       }, {
           "ID": 3,
           "gstin": "GSTIN1",
           "ret_pd": '032016',
           "checksum": "Y",
           "ttl_inv": 10000,
           "ttl_tax": 10000,
           "ttl_igst": 10000,
           "ttl_cgst": 10000,
           "ttl_sgst": 10000,
       }, {
           "ID": 3,
           "gstin": "GSTIN1",
           "ret_pd": '032016',
           "checksum": "Y",
           "ttl_inv": 10000,
           "ttl_tax": 10000,
           "ttl_igst": 10000,
           "ttl_cgst": 10000,
           "ttl_sgst": 10000,
       }, {
           "ID": 3,
           "gstin": "GSTIN1",
           "ret_pd": '032016',
           "checksum": "Y",
           "ttl_inv": 10000,
           "ttl_tax": 10000,
           "ttl_igst": 10000,
           "ttl_cgst": 10000,
           "ttl_sgst": 10000,
       }, {
           "ID": 3,
           "gstin": "GSTIN1",
           "ret_pd": '032016',
           "checksum": "Y",
           "ttl_inv": 10000,
           "ttl_tax": 10000,
           "ttl_igst": 10000,
           "ttl_cgst": 10000,
           "ttl_sgst": 10000,
       }, {
           "ID": 3,
           "gstin": "GSTIN1",
           "ret_pd": '032016',
           "checksum": "Y",
           "ttl_inv": 10000,
           "ttl_tax": 10000,
           "ttl_igst": 10000,
           "ttl_cgst": 10000,
           "ttl_sgst": 10000,
       }

    ];
    var SectionDetailsModel = [
        {
            "ID": 1,
            "gstin": "GSTIN1",
            "ret_pd": '032016',
            "checksum": "Y",
            "ttl_inv": 10000,
            "ttl_tax": 10000,
            "ttl_igst": 10000,
            "ttl_cgst": 10000,
            "ttl_sgst": 10000,
            "section_name": "Section Raipur",
            "ctin": "TIN00987",
            "state_cd": "MH"
        }, {
            "ID": 2,
            "gstin": "GSTIN1",
            "ret_pd": '032016',
            "checksum": "Y",
            "ttl_inv": 10000,
            "ttl_tax": 10000,
            "ttl_igst": 10000,
            "ttl_cgst": 10000,
            "ttl_sgst": 10000,
            "section_name": "Section Raipur",
            "ctin": "TIN00987",
            "state_cd": "MH"
        }, {
            "ID": 3,
            "gstin": "GSTIN1",
            "ret_pd": '032016',
            "checksum": "Y",
            "ttl_inv": 10000,
            "ttl_tax": 10000,
            "ttl_igst": 10000,
            "ttl_cgst": 10000,
            "ttl_sgst": 10000,
            "section_name": "Section Raipur",
            "ctin": "TIN00987",
            "state_cd": "MH"
        }, {
            "ID": 3,
            "gstin": "GSTIN1",
            "ret_pd": '032016',
            "checksum": "Y",
            "ttl_inv": 10000,
            "ttl_tax": 10000,
            "ttl_igst": 10000,
            "ttl_cgst": 10000,
            "ttl_sgst": 10000,
            "section_name": "Section Raipur",
            "ctin": "TIN00987",
            "state_cd": "MH"
        }, {
            "ID": 3,
            "gstin": "GSTIN1",
            "ret_pd": '032016',
            "checksum": "Y",
            "ttl_inv": 10000,
            "ttl_tax": 10000,
            "ttl_igst": 10000,
            "ttl_cgst": 10000,
            "ttl_sgst": 10000,
            "section_name": "Section Raipur",
            "ctin": "TIN00987",
            "state_cd": "MH"
        }, {
            "ID": 3,
            "gstin": "GSTIN1",
            "ret_pd": '032016',
            "checksum": "Y",
            "ttl_inv": 10000,
            "ttl_tax": 10000,
            "ttl_igst": 10000,
            "ttl_cgst": 10000,
            "ttl_sgst": 10000,
            "section_name": "Section Raipur",
            "ctin": "TIN00987",
            "state_cd": "MH"
        }, {
            "ID": 3,
            "gstin": "GSTIN1",
            "ret_pd": '032016',
            "checksum": "Y",
            "ttl_inv": 10000,
            "ttl_tax": 10000,
            "ttl_igst": 10000,
            "ttl_cgst": 10000,
            "ttl_sgst": 10000,
            "section_name": "Section Raipur",
            "ctin": "TIN00987",
            "state_cd": "MH"
        }, {
            "ID": 3,
            "gstin": "GSTIN1",
            "ret_pd": '032016',
            "checksum": "Y",
            "ttl_inv": 10000,
            "ttl_tax": 10000,
            "ttl_igst": 10000,
            "ttl_cgst": 10000,
            "ttl_sgst": 10000,
            "section_name": "Section Raipur",
            "ctin": "TIN00987",
            "state_cd": "MH"
        }, {
            "ID": 3,
            "gstin": "GSTIN1",
            "ret_pd": '032016',
            "checksum": "Y",
            "ttl_inv": 10000,
            "ttl_tax": 10000,
            "ttl_igst": 10000,
            "ttl_cgst": 10000,
            "ttl_sgst": 10000,
            "section_name": "Section Raipur",
            "ctin": "TIN00987",
            "state_cd": "MH"
        }, {
            "ID": 3,
            "gstin": "GSTIN1",
            "ret_pd": '032016',
            "checksum": "Y",
            "ttl_inv": 10000,
            "ttl_tax": 10000,
            "ttl_igst": 10000,
            "ttl_cgst": 10000,
            "ttl_sgst": 10000,
            "section_name": "Section Raipur",
            "ctin": "TIN00987",
            "state_cd": "MH"
        }, {
            "ID": 3,
            "gstin": "GSTIN1",
            "ret_pd": '032016',
            "checksum": "Y",
            "ttl_inv": 10000,
            "ttl_tax": 10000,
            "ttl_igst": 10000,
            "ttl_cgst": 10000,
            "ttl_sgst": 10000,
            "section_name": "Section Raipur",
            "ctin": "TIN00987",
            "state_cd": "MH"
        }


    ];
    var ITCEligibilityModel = ['Input', 'Capital Goods', 'Input Services', 'None'];
    var ITCAdmissibleModel = ['Input Services', 'None'];
    //#endregion

    //#region Store and DataSource
    var TCSstore = new DevExpress.data.ArrayStore({
        data: $scope.TCSModel,
        key: 'ID'
    });
    var TCSDataSource = new DevExpress.data.DataSource({
        store: TCSstore,
        paginate: false
    });

    var ICTstore = new DevExpress.data.ArrayStore({
        data: $scope.ICTModel,
        key: 'ID'
    });
    var ICTDataSource = new DevExpress.data.DataSource({
        store: ICTstore,
        paginate: false
    });

    var TaxPaidstore = new DevExpress.data.ArrayStore({
        data: $scope.TaxPaidModel,
        key: 'ID'
    });
    var TaxPaidDataSource = new DevExpress.data.DataSource({
        store: TaxPaidstore,
        paginate: false
    });

    var ITCRevstore = new DevExpress.data.ArrayStore({
        data: $scope.ITCRevModel,
        key: 'ID'
    });
    var ITCDataSource = new DevExpress.data.DataSource({
        store: ITCRevstore,
        paginate: false
    });

    var TDSstore = new DevExpress.data.ArrayStore({
        data: $scope.TDSModel,
        key: 'ID'
    });
    var TDSDataSource = new DevExpress.data.DataSource({
        store: TDSstore,
        paginate: false
    });

    var B2Bstore = new DevExpress.data.ArrayStore({
        data: $scope.B2BModel,
        key: 'ID'
    });
    var B2BDataSource = new DevExpress.data.DataSource({
        store: B2Bstore,
        paginate: false
    });

    var CNDNstore = new DevExpress.data.ArrayStore({
        data: $scope.CNDNModel,
        key: 'ID'
    });
    var CNDNDataSource = new DevExpress.data.DataSource({
        store: CNDNstore,
        paginate: false
    });

    var UTPstore = new DevExpress.data.ArrayStore({
        data: $scope.UTPModel,
        key: 'ID'
    });
    var UTPDataSource = new DevExpress.data.DataSource({
        store: UTPstore,
        paginate: false
    });

    var ISDstore = new DevExpress.data.ArrayStore({
        data: $scope.ISDModel,
        key: 'ID'
    });
    var ISDDataSource = new DevExpress.data.DataSource({
        store: ISDstore,
        paginate: false
    });
    //#endregion

    //#region Data Manupulation Function
    $scope.CreateButton = function (info, SelectboxID, ButtonID, DataModel, visiblepopup) {
        var customButton = $('<div id=' + SelectboxID + '>').dxSelectBox({
            dataSource: ViewReportModel,
            displayExpr: "Name",
            valueExpr: "ID",
            width: 120,
            placeholder: 'View Reports'
        });
        var gridcustomButton = $('<div style="margin-top:-48px;margin-left: 211px;width: 10%;" id=' + ButtonID + '>').dxButton({
            text: "Add New",
            height: 35,
            icon: 'plus',
            onClick: function (e) {
                //for (var member in $scope.currentRow)
                //    $scope.currentRow[member] = null;
                var data = jQuery.extend({}, DataModel);
                $scope.currentRow = {
                    key: $scope.gridInstance.getKeyByRowIndex(0),
                    data: {}//data,
                };
                if ($scope.formInstance !== null) {
                    $scope.formInstance.resetValues();
                }

                $scope.existingRowEditingMode = false;

                if (visiblepopup == "CNDN") {
                    $scope.visiblePopupCNDN = true;
                }
                else if (visiblepopup == "B2B") {
                    $scope.visiblePopup = true;
                }
                else if (visiblepopup == "ITCNA") {
                    $scope.visibleUnregistredTaxpayerDetails = true;
                }
                else if (visiblepopup == "ISD") {
                    $scope.visiblePopupISDCReditDetails = true;
                }
                else if (visiblepopup == "TDS") {
                    $scope.visiblepopupTDSCredit = true;
                }
                else if (visiblepopup == "TCS") {
                    $scope.visiblepopupTCSCredit = true;
                }
                else if (visiblepopup == "ITCR") {
                    $scope.visiblepopupICTReceivedDetails = true;
                }
                else if (visiblepopup == "PPI") {
                    $scope.visiblepopupTaxPaidOnInvoiceDetails = true;
                }
                else if (visiblepopup == "ITCRV") {
                    $scope.visiblepopupITCRevasalDetail = true;
                }
            }
        });
        if (document.getElementById(SelectboxID) == null) {
            if (info.element.find('.dx-datagrid-pager.dx-widget').length > 0) {
                info.element.find('.dx-datagrid-pager.dx-widget').append(customButton);
                info.element.find('.dx-datagrid-pager.dx-widget').append(gridcustomButton);
            }
            else {
                info.element.find('.dx-context-menu').append(customButton);
                info.element.find('.dx-context-menu').append(gridcustomButton);
            }
        }
    }

    $scope.AddRecord = function (Data, Store, DataSource) {
        var guid = new DevExpress.data.Guid();
        Data.ID = guid._value;
        Store.insert(Data)
       .done(function (values, key) {
           //'values' contains the inserted item values
           //'key' contains the inserted item key
           DataSource.reload();
           DevExpress.ui.dialog.alert('Data Added succesfully', 'Success');
       })
       .fail(function (error) {
           //handle error
           DevExpress.ui.dialog.alert(error, 'Error');
       });
    }

    $scope.UpdateRecord = function (Key, Data, Store, DataSource) {
        Store.update(Key, Data)
       .done(function () {
           DataSource.reload();
           DevExpress.ui.dialog.alert('Data Updated succesfully', 'Success');
       })
       .fail(function (error) {
           //handle error
           DevExpress.ui.dialog.alert(error, 'Error');
       });
        $scope.existingRowEditingMode = false;
    }

    $scope.SelectRowData = function (info) {
        var data = jQuery.extend({}, info.data);
        $scope.currentRow = {
            key: info.key,//$scope.gridInstance.getKeyByRowIndex(info.rowIndex),
            data: data,
        };
        $scope.existingRowEditingMode = true;
    }

    $scope.GetHistoryData = function (container, options, Visiblepopup, DataModel) {
        var iStatus = options.data.Status == null ? 1 : options.data.Status;
        var nStatus = options.data.StatusName == null ? "Uploaded" : options.data.StatusName;
        $('<a/>').addClass(AppCommon.GetStatusButton[iStatus]).css("width", "102px")//options.data.Status
            .text(nStatus)//options.data.Status
            .on('dxclick', function () {
                $scope.DataModel = [];
                $scope.GetHistoryResource(options.data.ID, Visiblepopup, options.data);
            })
            .appendTo(container);
    }
    //#endregion

    $scope.CreateForm = function () {
      
        $scope.viewmodelGSTR2 = {
            formData:
            {},
            width: '100%',
            //height: 'auto',
            scrollingEnabled: false,
            colCount: 2,
            //colSpan: 2,
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
                                        deferRendering: false
                                    },
                                    tabs: [
                                        //#region B TO B TAB DETAILS
                                        {
                                            title: "B2B",
                                            items: [                                    
                                                {
                                                    colSpan: 2,
                                                    template: 'InvoiceTemplate'

                                                },
                                                $scope.gridOptions = {
                                                    //dataSource: B2BModel,
                                                    dataSource: B2BDataSource,//$scope.B2BModel,
                                                    paging: {
                                                        pageSize: AppSetting.AppConstant.PageSize
                                                    },
                                                    pager: {
                                                        showNavigationButtons: true
                                                    },
                                                    sorting:
                                                    {
                                                        mode: 'single'
                                                    },
                                                    selection: {
                                                        mode: "single"
                                                    },
                                                    hoverStateEnabled: true,
                                                    width: 'auto',
                                                    columns: [
                                                           {
                                                               caption: 'Source',
                                                               allowSorting: true,
                                                               dataField: 'SourceIdentifier'
                                                           },
                                                        {
                                                            width: 110,
                                                            caption: "Reconciliation",
                                                            alignment: 'center',
                                                            cellTemplate: function (container, options) {   
                                                                $scope.GetHistoryData(container, options, 'B2B', $scope.B2BHistoryModel);
                                                            }
                                                        },                                            
                                                        {
                                                            caption: 'Section Type',
                                                            dataField: 'SectionType',
                                                            alignment: 'center',
                                                        },
                                                        {
                                                            caption: 'GSTIN / Name of unregistered supplier',
                                                            dataField: 'CounterPartyGSTIN',
                                                            width: 150
                                                        },
                                                        {
                                                            caption: 'InvoiceNo',
                                                            dataField: 'InvoiceNo'
                                                        },
                                                        {
                                                            caption: 'InvoiceDate',
                                                            dataField: 'InvoiceDate',
                                                            dataType: 'date',
                                                            format: AppSetting.AppConstant.Dateformat
                                                        },
                                                        {
                                                            caption: 'HSN/SAC',
                                                            dataField: 'HSNSACCode',
                                                            sortOrder: "desc"
                                                        },
                                                        {
                                                            caption: 'Taxable Value',
                                                            dataField: 'TaxableValue',
                                                            format: { type: 'fixedPoint', precision: 2 }
                                                        },

                                                        {

                                                            headerCellTemplate: function (container) {
                                                                container.append($("<div style='text-align: right;padding-right: 33%;'>CGST</div>"));
                                                            },
                                                            columns: [
                                                            {
                                                                caption: "Rate",
                                                                dataField: "CGST_Rate",
                                                                format: { type: 'fixedPoint' }

                                                            },
                                                            {
                                                                caption: "Amount",
                                                                dataField: "CGST_Amount",
                                                                format: { type: 'fixedPoint', precision: 2 }

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
                                                                format: { type: 'fixedPoint' }

                                                            },
                                                            {
                                                                caption: "Amount",
                                                                dataField: "SGST_Amount",
                                                                format: { type: 'fixedPoint', precision: 2 }

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
                                                                format: { type: 'fixedPoint' }

                                                            },
                                                            {
                                                                caption: "Amount",
                                                                dataField: "IGST_Amount",
                                                                format: { type: 'fixedPoint', precision: 2 }

                                                            }]
                                                        },

                                                    ],
                                                    columnAutoWidth: true,
                                                    wordWrapEnabled: true,
                                                    showColumnLines: false,
                                                    showRowLines: true,
                                                    showBorders: true,
                                                    rowAlternationEnabled: true,
                                                    onContentReady: function (e) {
                                                        $scope.CreateButton(e, "ViewB2B", "ViewB2Button", $scope.B2BModel, "B2B");
                                                    },
                                                    onInitialized: function (e) {
                                                        $scope.gridInstance = e.component;
                                                    },
                                                    onRowClick: function (info) {
                                                        $scope.SelectRowData(info);
                                                        $scope.CreateButton(info, "ViewB2B", "ViewB2Button", $scope.B2BModel, "B2B");
                                                        $scope.visiblePopup = true;
                                                    },
                                                },  
                                            ]
                                        },
                                        //#endregion
                                        //#region B TO C TAB DETAILS
                                        //{

                                        //    title: "B to C",
                                        //    items: [

                                        //        {
                                        //            colSpan: 2,
                                        //            template: 'InvoiceTemplateBtoC'

                                        //        },
                                        //        $scope.gridOptionsbtoc = {
                                        //            dataSource: B2BModel,
                                        //            columnFixing:
                                        //            {
                                        //                enabled: true
                                        //            },
                                        //            sorting:
                                        //            {
                                        //                mode: 'none'
                                        //            },
                                        //            width: 'auto',
                                        //            //columnAutoWidth: true,
                                        //            //allowColumnReordering: true,
                                        //            //allowColumnResizing: true,
                                        //            //columnChooser: {
                                        //            //    enabled: true
                                        //            //},
                                        //            //columnFixing: {
                                        //            //    enabled: true
                                        //            //},
                                        //            //width: 1040,
                                        //            columns: [
                                        //            {
                                        //                caption: "Status",
                                        //                alignment: 'center',
                                        //                cellTemplate: 'ButtoncommandColumnbtoc',
                                        //                fixed: true,
                                        //                width: 110

                                        //            },
                                        //            {
                                        //                dataField: 'FormType'
                                        //            },
                                        //            {
                                        //                dataField: 'GSTIN/Name of unregistred supplier'
                                        //            },
                                        //            {
                                        //                dataField: 'Bill of Entry/Import/Export(No)',

                                        //            },
                                        //            {
                                        //                dataField: 'Bill of Entry/Import/Export(Date)',

                                        //            },
                                        //            {
                                        //                dataField: 'InvoiceNo'
                                        //            },
                                        //            {
                                        //                dataField: 'InvoiceDate'
                                        //            },
                                        //            {
                                        //                dataField: 'HSN/SAC'
                                        //            },
                                        //            {
                                        //                dataField: 'TaxableValue'
                                        //            },
                                        //            {
                                        //                //caption: "Population",
                                        //                headerCellTemplate: function (container) {
                                        //                    container.append($("<div style='text-align: right;padding-right: 33%;'>IGST</div>"));
                                        //                },
                                        //                columns: [
                                        //                {
                                        //                    caption: "Rate",
                                        //                    dataField: "IGSTRate",
                                        //                   format: { type: 'fixedPoint', precision: 2 } 

                                        //                },
                                        //                {
                                        //                    caption: "Amount",
                                        //                    dataField: "IGSTAmount",
                                        //                   format: { type: 'fixedPoint', precision: 2 } 

                                        //                }]
                                        //            },
                                        //            {
                                        //                caption: "Details",
                                        //                alignment: 'center',
                                        //                cellTemplate: 'commandColumn',
                                        //                fixed: true,
                                        //                width: 50

                                        //            }, ],
                                        //            showColumnLines: true,
                                        //            showRowLines: true,
                                        //            showBorders: true,
                                        //            rowAlternationEnabled: true,
                                        //            editClick: function (rowIndex, row) {
                                        //                var data = jQuery.extend(
                                        //                {}, row);
                                        //                $scope.currentRow = {
                                        //                    key: $scope.gridInstance.getKeyByRowIndex(rowIndex),
                                        //                    data: data,
                                        //                };
                                        //                $scope.visiblePopupBtoC = true;
                                        //            },
                                        //            editMatchedClick: function (rowIndex, row) {
                                        //                var data = jQuery.extend(
                                        //                {}, row);
                                        //                $scope.currentRow = {
                                        //                    key: $scope.gridInstance.getKeyByRowIndex(rowIndex),
                                        //                    data: data,
                                        //                };
                                        //                $scope.visiblePopupBtoCGrid = true;
                                        //            },
                                        //            onInitialized: function (e) {
                                        //                $scope.gridInstance = e.component;
                                        //            }
                                        //        },

                                        //        {
                                        //            itemType: "empty",
                                        //            colCount: 12,
                                        //            colSpan: 2,
                                        //        },
                                        //        {
                                        //            itemType: 'group',
                                        //            caption: '',
                                        //            colCount: 12,
                                        //            colSpan: 2,
                                        //            items: [
                                        //            {
                                        //                itemType: "empty",
                                        //                colSpan: 11
                                        //            },
                                        //            {
                                        //                editorType: "dxButton",
                                        //                editorOptions:
                                        //                {
                                        //                    text: "Send",
                                        //                    onClick: function (e) {
                                        //                        console.log("onClick");
                                        //                        //$scope.showInfo();
                                        //                    }
                                        //                }
                                        //            }]
                                        //        }


                                        //    ]
                                        //},
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
                                                    dataSource:CNDNDataSource, //$scope.CNDNModel,
                                                    //dataSource: B2BModel,
                                                    paging: {
                                                        pageSize: AppSetting.AppConstant.PageSize
                                                    },
                                                    pager: {
                                                        showNavigationButtons: true
                                                    },
                                                    sorting:
                                                    {
                                                        mode: 'single'
                                                    },
                                                    selection: {
                                                        mode: "single"
                                                    },
                                                    hoverStateEnabled: true,
                                                    width: 'auto',
                                                    columns: [
                                                           {
                                                               caption: 'Source',
                                                               allowSorting: true,
                                                               dataField: 'SourceIdentifier'
                                                           },
                                                        {
                                                            width: 110,
                                                            caption: "Reconciliation",
                                                            alignment: 'center',
                                                            cellTemplate: function (container, options) {                                                    
                                                                $scope.GetHistoryData(container, options, 'CNDN', $scope.CNDNHistoryModel);
                                                            }
                                                        },                                           
                                                        {
                                                            caption: 'Section Type',
                                                            dataField: 'SectionType',
                                                            alignment: 'center',
                                                        },
                                                        {
                                                            caption: "GSTIN / Name of unregistered supplier",
                                                            dataField: 'CounterPartyGSTINOrUIN',
                                                            width: 150
                                                        },
                                                        {
                                                            caption: "Type of Note(Debit/Credit)",
                                                            dataField: 'CDNType',

                                                        },
                                                        {
                                                            caption: "Debit/Credit No",
                                                            dataField: 'CDNNo'
                                                        },
                                                        {
                                                            caption: "Debit/Credit Date",
                                                            dataField: 'CDNDate',
                                                            dataType: 'date',
                                                            format: AppSetting.AppConstant.Dateformat
                                                        },
                                                        {
                                                            caption: "InvoiceNo",
                                                            dataField: 'OriginalInvoiceNo'
                                                        },
                                                        {
                                                            caption: "InvoiceDate",
                                                            dataField: 'InvoiceDate',
                                                            dataType: 'date',
                                                            format: AppSetting.AppConstant.Dateformat
                                                        },
                                                        {
                                                            caption: "Differential Value (Plus or minus)",
                                                            dataField: 'DifferentialValue',
                                                            format: { type: 'fixedPoint', precision: 2 },
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
                                                                format: { type: 'fixedPoint' }

                                                            },
                                                            {
                                                                caption: "Amount",
                                                                dataField: "CGST_Amount",
                                                                format: { type: 'fixedPoint', precision: 2 }

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
                                                                format: { type: 'fixedPoint' }

                                                            },
                                                            {
                                                                caption: "Amount",
                                                                dataField: "SGST_Amount",
                                                                format: { type: 'fixedPoint', precision: 2 }

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
                                                                format: { type: 'fixedPoint', }

                                                            },
                                                            {
                                                                caption: "Amount",
                                                                dataField: "IGST_Amount",
                                                                format: { type: 'fixedPoint', precision: 2 }

                                                            }]
                                                        },

                                                    ],
                                                    columnAutoWidth: true,
                                                    wordWrapEnabled: true,
                                                    showColumnLines: false,
                                                    showRowLines: true,
                                                    showBorders: true,
                                                    rowAlternationEnabled: true,
                                                    onContentReady: function (e) {
                                                        $scope.CreateButton(e, "ViewCNDN", "ViewB2Button", $scope.CNDNModel, "CNDN");
                                                    },
                                                    onInitialized: function (e) {
                                                        $scope.gridInstance = e.component;
                                                    },
                                                    onRowClick: function (info) {                                           
                                                        $scope.SelectRowData(info);
                                                        $scope.CreateButton(info, "ViewCNDN", "ViewB2Button", $scope.CNDNModel, "CNDN");
                                                        $scope.visiblePopupCNDN = true;
                                                    },
                                                },
                                            ]
                                        },
                                        //#endregion
                                        //#region ITC NOT AVAILABLE DETAILS
                                        {

                                            title: "ITC Not Available",
                                            items: [                                   
                                                {
                                                    colSpan: 1,
                                                    template: 'UnregistredTaxpayerTemplate'

                                                },
                                                $scope.gridUnregistredTaxpayer = {
                                                    dataSource:UTPDataSource, //$scope.UTPModel,
                                                    paging: {
                                                        pageSize: AppSetting.AppConstant.PageSize
                                                    },
                                                    pager: {
                                                        showNavigationButtons: true
                                                    },
                                                    sorting:
                                                    {
                                                        mode: 'single'
                                                    },
                                                    selection: {
                                                        mode: "single"
                                                    },
                                                    hoverStateEnabled: true,
                                                    width: 'auto',
                                                    columns: [
                                                           {
                                                               caption: 'Source',
                                                               allowSorting: true,
                                                               dataField: 'SourceIdentifier'
                                                           },
                                                      {
                                                          width: 110,
                                                          caption: "Reconciliation",
                                                          alignment: 'center',
                                                          cellTemplate: function (container, options) {                                                  
                                                              $scope.GetHistoryData(container, options, 'ITCNA', $scope.UTPHistoryModel);
                                                          }
                                                      },                                             
                                                        {
                                                            caption: 'Section Type',
                                                            dataField: 'SectionType',
                                                            alignment: 'center',
                                                        },
                                                        {
                                                            caption: "Description",
                                                            dataField: 'SupplyType'
                                                        },
                                                        {
                                                            caption: "HSN/SAC",
                                                            dataField: 'HSNSACCode'
                                                        },
                                                        {
                                                            caption: "Unregistered taxable person not included in table 4 above",
                                                            dataField: 'URDealerSuppliesValue',
                                                            format: { type: 'fixedPoint', precision: 2 },
                                                            width: 200

                                                        },
                                                        {
                                                            caption: "Any exempt supply not included in table 4 above",
                                                            dataField: 'ExemptedSuppliesValue',
                                                            format: { type: 'fixedPoint', precision: 2 },
                                                            width: 200

                                                        },
                                                        {
                                                            caption: "Any nill rated supply not included in table 4 above",
                                                            dataField: 'NilRatedSuppliesValue',
                                                            format: { type: 'fixedPoint', precision: 2 },
                                                            width: 200

                                                        },
                                                        {
                                                            caption: "Non GST supply",
                                                            dataField: 'NonGSTSuppliesValue',
                                                            format: { type: 'fixedPoint', precision: 2 },
                                                        },


                                                    ],
                                                    columnAutoWidth: true,
                                                    wordWrapEnabled: true,
                                                    showColumnLines: false,
                                                    showRowLines: true,
                                                    showBorders: true,
                                                    rowAlternationEnabled: true,
                                                    onContentReady: function (e) {
                                                        $scope.CreateButton(e, "ViewITCNA", "ViewB2Button", $scope.UTPModel, "ITCNA");
                                                    },
                                                    onInitialized: function (e) {
                                                        $scope.gridInstance = e.component;
                                                    },
                                                    onRowClick: function (info) {
                                                        $scope.SelectRowData(info);
                                                        $scope.CreateButton(info, "ViewITCNA", "ViewB2Button", $scope.UTPModel, "ITCNA");
                                                        $scope.visibleUnregistredTaxpayerDetails = true;
                                                    },
                                                },
                                            ]
                                        },
                                        //#endregion
                                        //#region ISD Credit TAB DETAILS
                                        {

                                            title: "ISD Credit",
                                            items: [                                  
                                                {
                                                    colSpan: 1,
                                                    template: 'ISDCreditTemplate'

                                                },
                                                $scope.gridISDCredit = {
                                                    dataSource:ISDDataSource, //$scope.ISDModel,
                                                    paging: {
                                                        pageSize: AppSetting.AppConstant.PageSize
                                                    },
                                                    pager: {
                                                        showNavigationButtons: true
                                                    },
                                                    sorting:
                                                    {
                                                        mode: 'single'
                                                    },
                                                    selection: {
                                                        mode: "single"
                                                    },
                                                    hoverStateEnabled: true,
                                                    width: 'auto',
                                                    columns: [
                                                           {
                                                               caption: 'Source',
                                                               allowSorting: true,
                                                               dataField: 'SourceIdentifier'
                                                           },
                                                       {
                                                           width: 110,
                                                           caption: "Reconciliation",
                                                           alignment: 'center',
                                                           cellTemplate: function (container, options) {                                                   
                                                               $scope.GetHistoryData(container, options, 'ISD', $scope.ISDHistoryModel);
                                                           }
                                                       },                                           
                                                        {
                                                            caption: 'Section Type',
                                                            dataField: 'SectionType',
                                                            alignment: 'center',
                                                        },
                                                        {
                                                            caption: "GSTIN ID",
                                                            dataField: 'GSTIN_ISD'
                                                        },
                                                        {
                                                            caption: "Invoice No",
                                                            dataField: 'InvoiceNo'
                                                        },
                                                        {
                                                            caption: "Invoice Date",
                                                            dataField: 'InvoiceDate',
                                                            dataType: 'date',
                                                            format: AppSetting.AppConstant.Dateformat
                                                        },
                                                        {
                                                            caption: "SAC",
                                                            dataField: 'SAC'
                                                        },

                                                        {
                                                            headerCellTemplate: function (container) {
                                                                container.append($("<div style='text-align: right;padding-right: 33%;'>ISD Credit</div>"));
                                                            },
                                                            columns: [
                                                            {
                                                                caption: "IGST",
                                                                dataField: "IGST_Amount",
                                                                format: { type: 'fixedPoint', precision: 2 }

                                                            },
                                                            {
                                                                caption: "CGST",
                                                                dataField: "CGST_Amount",
                                                                format: { type: 'fixedPoint', precision: 2 }

                                                            },
                                                            {
                                                                caption: "SGST",
                                                                dataField: "SGST_Amount",
                                                                format: { type: 'fixedPoint', precision: 2 }

                                                            }]
                                                        },


                                                    ],
                                                    columnAutoWidth: true,
                                                    wordWrapEnabled: true,
                                                    showColumnLines: false,
                                                    showRowLines: true,
                                                    showBorders: true,
                                                    rowAlternationEnabled: true,
                                                    onContentReady: function (e) {
                                                        $scope.CreateButton(e, "ViewISD", "ViewB2Button", $scope.ISDModel, "ISD");
                                                    },
                                                    onInitialized: function (e) {
                                                        $scope.gridInstance = e.component;
                                                    },
                                                    onRowClick: function (info) {
                                                        $scope.SelectRowData(info);
                                                        $scope.CreateButton(info, "ViewISD", "ViewB2Button", $scope.ISDModel, "ISD");
                                                        $scope.visiblePopupISDCReditDetails = true;
                                                    },
                                                },                                 
                                            ]
                                        },
                                        //#endregion
                                        //#region TDS Credit TAB DETAILS
                                        {
                                            title: "TDS Credit",
                                            items: [                                   
                                                {
                                                    colSpan: 2,
                                                    template: 'TDSCreditTemplate'

                                                },
                                                $scope.gridOptionsTDSCredit = {
                                                    dataSource:TDSDataSource, //$scope.TDSModel,
                                                    paging: {
                                                        pageSize: AppSetting.AppConstant.PageSize
                                                    },
                                                    pager: {
                                                        showNavigationButtons: true
                                                    },
                                                    sorting:
                                                    {
                                                        mode: 'single'
                                                    },
                                                    selection: {
                                                        mode: "single"
                                                    },
                                                    hoverStateEnabled: true,
                                                    width: 'auto',
                                                    columns: [
                                                           {
                                                               caption: 'Source',
                                                               allowSorting: true,
                                                               dataField: 'SourceIdentifier'
                                                           },
                                                       {
                                                           width: 110,
                                                           caption: "Reconciliation",
                                                           alignment: 'center',
                                                           //dataField: 'Status',
                                                           cellTemplate: function (container, options) {                                                  
                                                               $scope.GetHistoryData(container, options, 'TDS', $scope.TDSHistoryModel);
                                                           }
                                                       },                                         
                                                    {
                                                        caption: 'Section Type',
                                                        dataField: 'SectionType',
                                                        alignment: 'center',
                                                    },
                                                    {
                                                        caption: "GSTIN/UIN of deductor",
                                                        dataField: 'DeducteeGSTIN'
                                                    },
                                                    {
                                                        caption: "Invoice/Document No",
                                                        dataField: 'InvoiceNo',

                                                    },
                                                    {
                                                        caption: "Invoice/Document Date",
                                                        dataField: 'InvoiceDate',
                                                        dataType: 'date',
                                                        format: AppSetting.AppConstant.Dateformat
                                                    },
                                                    {
                                                        caption: "Date of payment made to deductee",
                                                        dataField: 'PaymentDateToDeductee',
                                                        dataType: 'date',
                                                        width: 150,
                                                        format: AppSetting.AppConstant.Dateformat
                                                    },
                                                    {
                                                        caption: "Value on which TDS has been deducted",
                                                        dataField: 'TDS_ApplicableValue',
                                                        format: { type: 'fixedPoint', precision: 2 },
                                                        width: 150
                                                    },
                                                    {

                                                        headerCellTemplate: function (container) {
                                                            container.append($("<div style='text-align: right;padding-right: 50%;'>TDS_IGST</div>"));
                                                        },
                                                        columns: [
                                                        {
                                                            caption: "Rate",
                                                            dataField: "CGST_Rate",
                                                            format: { type: 'fixedPoint' }

                                                        },
                                                        {
                                                            caption: "Amount",
                                                            dataField: "CGST_Amount",
                                                            format: { type: 'fixedPoint', precision: 2 }

                                                        }]
                                                    },
                                                    {

                                                        headerCellTemplate: function (container) {
                                                            container.append($("<div style='text-align: right;padding-right: 50%;'>TDS_CGST</div>"));
                                                        },
                                                        columns: [
                                                        {
                                                            caption: "Rate",
                                                            dataField: "SGST_Rate",
                                                            format: { type: 'fixedPoint' }

                                                        },
                                                        {
                                                            caption: "Amount",
                                                            dataField: "SGST_Amount",
                                                            format: { type: 'fixedPoint', precision: 2 }

                                                        }]
                                                    },
                                                    {

                                                        headerCellTemplate: function (container) {
                                                            container.append($("<div style='text-align: right;padding-right: 50%;'>TDS_SGST</div>"));
                                                        },
                                                        columns: [
                                                        {
                                                            caption: "Rate",
                                                            dataField: "IGST_Rate",
                                                            format: { type: 'fixedPoint' }
                                                        },
                                                        {
                                                            caption: "Amount",
                                                            dataField: "IGST_Amount",
                                                            format: { type: 'fixedPoint', precision: 2 }

                                                        }]
                                                    },
                                                    ],
                                                    columnAutoWidth: true,
                                                    wordWrapEnabled: true,
                                                    showColumnLines: false,
                                                    showRowLines: true,
                                                    showBorders: true,
                                                    rowAlternationEnabled: true,
                                                    onContentReady: function (e) {
                                                        $scope.CreateButton(e, "ViewTDS", "ViewB2Button", $scope.TDSModel, "TDS");
                                                    },
                                                    onInitialized: function (e) {
                                                        $scope.gridInstance = e.component;
                                                    },
                                                    onRowClick: function (info) {
                                                        $scope.SelectRowData(info);
                                                        $scope.CreateButton(info, "ViewTDS", "ViewB2Button", $scope.TDSModel, "TDS");
                                                        $scope.visiblepopupTDSCredit = true;
                                                    },
                                                },
                                            ]
                                        },
                                        //#endregion
                                        //#region TCS Credit TAB DETAILS
                                        {

                                            title: "TCS Credit",
                                            items: [                                    
                                                {
                                                    colSpan: 2,
                                                    template: 'TCSCreditTemplate'

                                                },
                                                $scope.gridOptionsTCSCredit = {
                                                    dataSource:TCSDataSource, //$scope.TCSModel,
                                                    paging: {
                                                        pageSize: AppSetting.AppConstant.PageSize
                                                    },
                                                    pager: {
                                                        showNavigationButtons: true
                                                    },
                                                    sorting:
                                                    {
                                                        mode: 'single'
                                                    },
                                                    selection: {
                                                        mode: "single"
                                                    },
                                                    hoverStateEnabled: true,
                                                    width: 'auto',
                                                    columns: [
                                                           {
                                                               caption: 'Source',
                                                               allowSorting: true,
                                                               dataField: 'SourceIdentifier'
                                                           },
                                                       {
                                                           width: 110,
                                                           caption: "Reconciliation",
                                                           alignment: 'center',
                                                           cellTemplate: function (container, options) {                                                 
                                                               $scope.GetHistoryData(container, options, 'TCS', $scope.TCSHistoryModel);
                                                           }
                                                       },                                         
                                                    {
                                                        caption: 'Section Type',
                                                        dataField: 'SectionType',
                                                        alignment: 'center',
                                                    },
                                                    {
                                                        caption: "GSTIN of Ecommerce portal",
                                                        dataField: 'EcommerceOperatorGSTIN'
                                                    },
                                                    {
                                                        caption: "Merchant ID",
                                                        dataField: 'IssuedEcommerceMerchantId'
                                                    },
                                                    {
                                                        caption: "Taxable  Value on which TCS has been deducted",
                                                        dataField: 'TaxableTCSValue',
                                                        format: { type: 'fixedPoint', precision: 2 },
                                                        width: 150
                                                    },
                                                    {
                                                        headerCellTemplate: function (container) {
                                                            container.append($("<div style='text-align: right;padding-right: 25%;'>TCS_IGST</div>"));
                                                        },
                                                        columns: [
                                                        {
                                                            caption: "Rate",
                                                            dataField: "CGST_Rate",
                                                            format: { type: 'fixedPoint' }

                                                        },
                                                        {
                                                            caption: "Amount",
                                                            dataField: "CGST_Amount",
                                                            format: { type: 'fixedPoint', precision: 2 }

                                                        }]
                                                    },
                                                    {
                                                        headerCellTemplate: function (container) {
                                                            container.append($("<div style='text-align: right;padding-right: 25%;'>TCS_CGST</div>"));
                                                        },
                                                        columns: [
                                                        {
                                                            caption: "Rate",
                                                            dataField: "SGST_Rate",
                                                            format: { type: 'fixedPoint' }

                                                        },
                                                        {
                                                            caption: "Amount",
                                                            dataField: "SGST_Amount",
                                                            format: { type: 'fixedPoint', precision: 2 }

                                                        }]
                                                    },
                                                    {
                                                        headerCellTemplate: function (container) {
                                                            container.append($("<div style='text-align: right;padding-right: 25%;'>TCS_SGST</div>"));
                                                        },
                                                        columns: [
                                                        {
                                                            caption: "Rate",
                                                            dataField: "IGST_Rate",
                                                            format: { type: 'fixedPoint' }

                                                        },
                                                        {
                                                            caption: "Amount",
                                                            dataField: "IGST_Amount",
                                                            format: { type: 'fixedPoint', precision: 2 }

                                                        }]
                                                    },
                                                    ],
                                                    columnAutoWidth: true,
                                                    wordWrapEnabled: true,
                                                    showColumnLines: false,
                                                    showRowLines: true,
                                                    showBorders: true,
                                                    rowAlternationEnabled: true,
                                                    onContentReady: function (e) {
                                                        $scope.CreateButton(e, "ViewTCS", "ViewB2Button", $scope.TCSModel, "TCS");
                                                    },
                                                    onInitialized: function (e) {
                                                        $scope.gridInstance = e.component;
                                                    },
                                                    onRowClick: function (info) {
                                                        $scope.SelectRowData(info);
                                                        $scope.CreateButton(info, "ViewTCS", "ViewB2Button", $scope.TCSModel, "TCS");
                                                        $scope.visiblepopupTCSCredit = true;
                                                    },
                                                },                                    
                                            ]
                                        },
                                        //#endregion
                                        //#region ITC Credit TAB DETAILS
                                        {

                                            title: "ITC Received",
                                            items: [                                    
                                                {
                                                    colSpan: 2,
                                                    template: 'ICTTemplate'

                                                },
                                                $scope.gridOptionsICT = {
                                                    dataSource:ICTDataSource, //$scope.ICTModel,
                                                    //dataSource: B2BModel,
                                                    paging: {
                                                        pageSize: AppSetting.AppConstant.PageSize
                                                    },
                                                    pager: {
                                                        showNavigationButtons: true
                                                    },
                                                    sorting:
                                                    {
                                                        mode: 'single'
                                                    },
                                                    selection: {
                                                        mode: "single"
                                                    },
                                                    hoverStateEnabled: true,
                                                    width: 'auto',
                                                    columns: [
                                                           {
                                                               caption: 'Source',
                                                               allowSorting: true,
                                                               dataField: 'SourceIdentifier'
                                                           },
                                                          {
                                                              width: 110,
                                                              caption: "Reconciliation",
                                                              alignment: 'center',
                                                              cellTemplate: function (container, options) {                                                     
                                                                  $scope.GetHistoryData(container, options, 'ICT', $scope.ICTHistoryModel);
                                                              }
                                                          },                                        
                                                    {
                                                        caption: 'Section Type',
                                                        dataField: 'SectionType',
                                                        alignment: 'center',
                                                    },
                                                    {
                                                        caption: "Original Invoice No",
                                                        dataField: 'OriginalInvoiceNo'
                                                    },
                                                    {
                                                        caption: "Original Invoice Date",
                                                        dataField: 'OriginalInvoiceDate',
                                                        dataType: 'date',
                                                        format: AppSetting.AppConstant.Dateformat
                                                    },
                                                    {
                                                        headerCellTemplate: function (container) {
                                                            container.append($("<div style='text-align: right;padding-right: 25%;'>IGST</div>"));
                                                        },
                                                        columns: [
                                                        {
                                                            caption: "Earlier",
                                                            dataField: "EarlierCGST_Value",
                                                            format: { type: 'fixedPoint', precision: 2 }
                                                        },
                                                        {
                                                            caption: "This Month",
                                                            dataField: "CurrentCGST_Value",
                                                            format: { type: 'fixedPoint', precision: 2 }

                                                        }]
                                                    },
                                                    {
                                                        headerCellTemplate: function (container) {
                                                            container.append($("<div style='text-align: right;padding-right: 25%;'>CGST</div>"));
                                                        },
                                                        columns: [
                                                        {
                                                            caption: "Earlier",
                                                            dataField: "EarlierSGST_Value",
                                                            format: { type: 'fixedPoint', precision: 2 }

                                                        },
                                                        {
                                                            caption: "This Month",
                                                            dataField: "CurrentSGST_Value",
                                                            format: { type: 'fixedPoint', precision: 2 }

                                                        }]
                                                    },
                                                    {
                                                        headerCellTemplate: function (container) {
                                                            container.append($("<div style='text-align: right;padding-right: 25%;'>SGST</div>"));
                                                        },
                                                        columns: [
                                                        {
                                                            caption: "Earlier",
                                                            dataField: "EarlierIGST_Value",
                                                            format: { type: 'fixedPoint', precision: 2 }

                                                        },
                                                        {
                                                            caption: "This Month",
                                                            dataField: "EarlierIGST_Value",
                                                            format: { type: 'fixedPoint', precision: 2 }

                                                        }]
                                                    },
                                                    ],
                                                    columnAutoWidth: true,
                                                    wordWrapEnabled: true,
                                                    showColumnLines: false,
                                                    showRowLines: true,
                                                    showBorders: true,
                                                    rowAlternationEnabled: true,
                                                    onContentReady: function (e) {
                                                        $scope.CreateButton(e, "ViewITCReceived", "ViewB2Button", $scope.ICTModel, "ITCR");
                                                    },
                                                    onInitialized: function (e) {
                                                        $scope.gridInstance = e.component;
                                                    },
                                                    onRowClick: function (info) {
                                                        $scope.SelectRowData(info);
                                                        $scope.CreateButton(info, "ViewITCReceived", "ViewB2Button", $scope.ICTModel, "ITCR");
                                                        $scope.visiblepopupICTReceivedDetails = true;
                                                    },
                                                },                                   
                                            ]
                                        },
                                        //#endregion
                                        //#region Pre-Paid Invoices TAB DETAILS
                                        {

                                            title: "Pre-Paid Invoices",
                                            items: [
                                                    {
                                                        colSpan: 2,
                                                        template: 'InvoiceTaxPaidTemplate'

                                                    },
                                                    $scope.gridOptionsInvoiceTaxPaid = {
                                                        dataSource: TaxPaidDataSource, //$scope.TaxPaidModel,
                                                        paging: {
                                                            pageSize: AppSetting.AppConstant.PageSize
                                                        },
                                                        pager: {
                                                            showNavigationButtons: true
                                                        },
                                                        sorting:
                                                        {
                                                            mode: 'single'
                                                        },
                                                        selection: {
                                                            mode: "single"
                                                        },
                                                        hoverStateEnabled: true,
                                                        width: 'auto',
                                                        columns: [
                                                               {
                                                                   caption: 'Source',
                                                                   allowSorting: true,
                                                                   dataField: 'SourceIdentifier'
                                                               },
                                                             {
                                                                 width: 110,
                                                                 caption: "Reconciliation",
                                                                 alignment: 'center',
                                                                 cellTemplate: function (container, options) {
                                                                     $scope.GetHistoryData(container, options, 'PPI', $scope.TaxPaidHistoryModel);
                                                                 }
                                                             },

                                                        {
                                                            caption: 'Section Type',
                                                            dataField: 'SectionType',
                                                            alignment: 'center',
                                                        },
                                                        {
                                                            caption: "Invoice No",
                                                            dataField: 'SupplierInvoiceNo'
                                                        },
                                                        {
                                                            caption: "Invoice Date",
                                                            dataField: 'SupplierInvoiceDate',
                                                            dataType: 'date',
                                                            format: AppSetting.AppConstant.Dateformat
                                                        },
                                                        {
                                                            caption: "Transaction ID",
                                                            dataField: 'TransactionID',
                                                            //width: 200
                                                        },
                                                        {
                                                            headerCellTemplate: function (container) {
                                                                container.append($("<div style='text-align: right;padding-right: 28%;'>IGST</div>"));
                                                            },
                                                            columns: [
                                                            {
                                                                caption: "Rate",
                                                                dataField: "CGST_Rate",
                                                                format: { type: 'fixedPoint', }

                                                            },
                                                            {
                                                                caption: "Tax",
                                                                dataField: "CGST_Tax",
                                                                format: { type: 'fixedPoint', precision: 2 }

                                                            }]
                                                        },
                                                        {
                                                            headerCellTemplate: function (container) {
                                                                container.append($("<div style='text-align: right;padding-right: 28%;'>CGST</div>"));
                                                            },
                                                            columns: [
                                                            {
                                                                caption: "Rate",
                                                                dataField: "SGST_Rate",
                                                                format: { type: 'fixedPoint', }

                                                            },
                                                            {
                                                                caption: "Tax",
                                                                dataField: "SGST_Tax",
                                                                format: { type: 'fixedPoint', precision: 2 }

                                                            }]
                                                        },
                                                        {
                                                            headerCellTemplate: function (container) {
                                                                container.append($("<div style='text-align: right;padding-right: 28%;'>SGST</div>"));
                                                            },
                                                            columns: [
                                                            {
                                                                caption: "Rate",
                                                                dataField: "IGST_Rate",
                                                                format: { type: 'fixedPoint', }

                                                            },
                                                            {
                                                                caption: "Tax",
                                                                dataField: "IGST_Tax",
                                                                format: { type: 'fixedPoint', precision: 2 }

                                                            }]
                                                        },
                                                        ],
                                                        columnAutoWidth: true,
                                                        wordWrapEnabled: true,
                                                        showColumnLines: false,
                                                        showRowLines: true,
                                                        showBorders: true,
                                                        rowAlternationEnabled: true,
                                                        onContentReady: function (e) {
                                                            $scope.CreateButton(e, "ViewPPI", "ViewB2Button", $scope.TaxPaidModel, "PPI");
                                                        },
                                                        onInitialized: function (e) {
                                                            $scope.gridInstance = e.component;
                                                        },
                                                        onRowClick: function (info) {
                                                            $scope.SelectRowData(info);
                                                            $scope.CreateButton(info, "ViewPPI", "ViewB2Button", $scope.TaxPaidModel, "PPI");
                                                            $scope.visiblepopupTaxPaidOnInvoiceDetails = true;
                                                        },
                                                    },
                                            ]
                                        },
                                        //#endregion
                                        //#region ITC Reversal TAB DETAILS
                                    {

                                    title: "ITC Reversal",
                                        items: [                                  
                                            {
                                                colSpan: 2,
                                                template: 'ITCReversalTemplate'

                                            },
                                            $scope.gridOptionsITCReversal = {
                                                dataSource:ITCDataSource, //$scope.ITCRevModel,
                                                paging: {
                                                    pageSize: AppSetting.AppConstant.PageSize
                                                },
                                                pager: {
                                                    showNavigationButtons: true
                                                },
                                                sorting:
                                                {
                                                    mode: 'single'
                                                },
                                                selection: {
                                                    mode: "single"
                                                },
                                                hoverStateEnabled: true,
                                                width: 'auto',
                                                columns: [
                                                       {
                                                           caption: 'Source',
                                                           allowSorting: true,
                                                           dataField: 'SourceIdentifier'
                                                       },
                                                     {
                                                         width: 110,
                                                         caption: "Reconciliation",
                                                         alignment: 'center',
                                                         cellTemplate: function (container, options) {                                                  
                                                             $scope.GetHistoryData(container, options, 'ITCRV', $scope.ITCRevHistoryModel);
                                                         }
                                                     },                                              
                                                {
                                                    caption: 'Section Type',
                                                    dataField: 'SectionType',
                                                    alignment: 'center',
                                                },
                                                {
                                                    caption: "Serial No",
                                                    dataField: 'SerialNo'
                                                },
                                                {
                                                    caption: "Description",
                                                    dataField: 'Description'
                                                },                                               
                                                {
                                                    headerCellTemplate: function (container) {
                                                        container.append($("<div style='text-align: right;padding-right: 20%;'>IGST</div>"));
                                                    },
                                                    columns: [
                                                    {
                                                        caption: "Amount",
                                                        dataField: "IGST_Amount",
                                                        format: { type: 'fixedPoint', precision: 2 }

                                                    },
                                                    {
                                                        caption: "Interest",
                                                        dataField: "IGST_Interest",
                                                        format: { type: 'fixedPoint', precision: 2 }

                                                    }]
                                                },
                                                {
                                                    headerCellTemplate: function (container) {
                                                        container.append($("<div style='text-align: right;padding-right: 20%;'>CGST</div>"));
                                                    },
                                                    columns: [
                                                    {
                                                        caption: "Amount",
                                                        dataField: "CGST_Amount",
                                                        format: { type: 'fixedPoint', precision: 2 }

                                                    },
                                                    {
                                                        caption: "Interest",
                                                        dataField: "CGST_Interest",
                                                        format: { type: 'fixedPoint', precision: 2 }

                                                    }]
                                                },
                                                {
                                                    headerCellTemplate: function (container) {
                                                        container.append($("<div style='text-align: right;padding-right: 20%;'>SGST</div>"));
                                                    },
                                                    columns: [
                                                    {
                                                        caption: "Amount",
                                                        dataField: "SGST_Amount",
                                                        format: { type: 'fixedPoint', precision: 2 }

                                                    },
                                                    {
                                                        caption: "Interest",
                                                        dataField: "SGST_Interest",
                                                        format: { type: 'fixedPoint', precision: 2 }

                                                    }]
                                                },
                                                ],
                                                columnAutoWidth: true,
                                                wordWrapEnabled: true,
                                                showColumnLines: false,
                                                showRowLines: true,
                                                showBorders: true,
                                                rowAlternationEnabled: true,
                                                onContentReady: function (e) {
                                                    $scope.CreateButton(e, "ViewITCRev", "ViewB2Button", $scope.ITCRevModel, "ITCRV");
                                                },
                                                onInitialized: function (e) {
                                                    $scope.gridInstance = e.component;
                                                },
                                                onRowClick: function (info) {
                                                    $scope.SelectRowData(info);
                                                    $scope.CreateButton(info, "ViewITCRev", "ViewB2Button", $scope.ITCRevModel, "ITCRV");
                                                    $scope.visiblepopupITCRevasalDetail = true;
                                                },
                                            },                                            
                                        ]
                                    },
                                    //#endregion
                                    ]
                               }
                         ]

                 },

            ]
       };

    }

    $scope.CreateB2BPopup = function () {
        //#region B TO B POP UP DETAILS
        $scope.popupFormBtoBDetails = {
            //formData: $scope.B2BDataModel,
            bindingOptions: {
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
                            colCount: 2,
                            items: [

                                 {
                                     dataField: 'SectionType',
                                     editorType: 'dxSelectBox',
                                     colSpan: 2,
                                     label:
                                     {
                                         text: 'Section Type'
                                     },
                                     editorOptions:
                                      {
                                          items: B2BSectionTypeModel,
                                          value: $scope.SectionType
                                      },
                                 },

                                {
                                    itemType: 'group',
                                    caption: 'Invoice Details',
                                    colCount: 2,
                                    colSpan: 2,
                                    items: [

                            {
                                itemType: 'group',
                                // caption: 'Original Invoice Details',
                                colCount: 2,
                                items: [

                                    {
                                        dataField: 'CounterPartyGSTIN',
                                        colSpan: 2,
                                        label:
                                        {
                                            text: 'GSTIN/Name(original)'
                                        },
                                        editorOptions:
                                        {
                                            placeholder: 'GSTIN/Name of unregistered supplier'
                                        }

                                    },
                                    {
                                        dataField: 'StateCode',
                                        colSpan: 2,
                                        label:
                                        {
                                            text: 'State Code'
                                        },
                                        editorOptions:
                                        {
                                            placeholder: 'State Code'
                                        }

                                    },

                                    {
                                        dataField: 'InvoiceNo',
                                        colSpan: 2,
                                        label:
                                        {
                                            text: 'Invoice/Document/Bill of Entry No.'
                                        },
                                        editorOptions:
                                        {
                                            placeholder: 'Invoice/Document/Bill of Entry No.'
                                        }
                                    },
                                    {
                                        dataField: 'InvoiceDate',
                                        editorType: 'dxDateBox',
                                        colSpan: 2,
                                        label:
                                        {
                                            text: 'Invoice/Document/Bill of Entry Date'
                                        },
                                        editorOptions:
                                        {
                                            placeholder: 'Invoice/Document/Bill of Entry Date',
                                            width: '100%',
                                            displayFormat: AppSetting.AppConstant.Dateformat,
                                        }
                                    },

                                    {
                                        dataField: 'InvoiceValue',
                                        colSpan: 2,
                                        //editorType: "dxTextArea",
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
                                        dataField: 'HSNSACCode',
                                        colSpan: 2,
                                        //editorType: "dxTextArea",
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
                                        dataField: 'GoodsService',
                                        colSpan: 2,
                                        //editorType: "dxTextArea",
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
                                        dataField: 'TaxableValue',
                                        colSpan: 2,
                                        //editorType: "dxTextArea",
                                        label:
                                        {
                                            text: 'Taxable Value'
                                        },
                                        editorOptions:
                                        {
                                            placeholder: 'Taxable Value'
                                        }
                                    },

                                ]
                            },
                            {
                                itemType: "group",
                                // caption: 'Revised Invoice Details',
                                colCount: 2,
                                items: [
                                    {
                                        dataField: 'RevisedCounterPartyNameOrGSTIN',
                                        colSpan: 2,
                                        label:
                                        {
                                            text: 'GSTIN/Name(Revised)'
                                        },
                                        editorOptions:
                                        {
                                            placeholder: 'GSTIN/Name of unregistered supplier'
                                        }

                                    },

                                    {
                                        dataField: 'StateCode',
                                        colSpan: 2,
                                        label:
                                        {
                                            text: 'State Code'
                                        },
                                        editorOptions:
                                        {
                                            placeholder: 'State Code'
                                        }

                                    },
                                    {
                                        dataField: 'RevisedInvoiceNo',
                                        colSpan: 2,
                                        label:
                                        {
                                            text: 'Invoice/Document/Bill of Entry No'
                                        },
                                        editorOptions:
                                        {
                                            placeholder: 'Invoice/Document/Bill of Entry No'
                                        }
                                    },
                                    {
                                        dataField: 'RevisedInvoiceDate',
                                        editorType: 'dxDateBox',
                                        colSpan: 2,
                                        label:
                                        {
                                            text: 'Invoice/Document/Bill of Entry Date'
                                        },
                                        editorOptions:
                                        {
                                            placeholder: 'Invoice/Document/Bill of Entry Date',
                                            width: '100%',
                                            displayFormat: AppSetting.AppConstant.Dateformat,
                                        }
                                    },

                                    {
                                        dataField: 'InvoiceValue',
                                        colSpan: 2,
                                        //editorType: "dxTextArea",
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
                                        dataField: 'HSNSACCode',
                                        colSpan: 2,
                                        //editorType: "dxTextArea",
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
                                        dataField: 'GoodsService',
                                        colSpan: 2,
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
                                         dataField: 'TaxableValue',
                                         colSpan: 2,
                                         //editorType: "dxTextArea",
                                         label:
                                         {
                                             text: 'Taxable Value'
                                         },
                                         editorOptions:
                                         {
                                             placeholder: 'Taxable Value'
                                         }
                                     },

                                ]
                            },
                                    ]

                                },


                            ]

                        },
                        {
                            itemType: 'group',
                            colCount: 1,
                            items: [
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
                                            dataField: 'CGST_Amount',
                                            colSpan: 1,
                                            //editorType: "dxTextArea",
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
                                            //editorType: "dxTextArea",
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
                                            dataField: 'CGST_Amount',
                                            colSpan: 1,
                                            //editorType: "dxTextArea",
                                            label:
                                            {
                                                text: 'Amount'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'Amount'
                                            }
                                        },
                                    ]
                                },
                                {
                                    itemType: "group",
                                    caption: 'Supply Information',
                                    colCount: 3,
                                    items: [
                                        {
                                            dataField: 'POS',
                                            colSpan: 3,
                                            label:
                                            {
                                                text: 'POS'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'POS'
                                            }
                                        },
                                    ]
                                },

                            {
                                itemType: "group",
                                caption: 'ITC Details',
                                colCount: 2,
                                items: [
                                            {
                                                dataField: 'ITCEligibility',
                                                editorType: 'dxSelectBox',
                                                colSpan: 2,
                                                label:
                                                {
                                                    text: 'Eligibility of ITC'
                                                },
                                                editorOptions:
                                                {
                                                    items: ITCEligibilityModel,
                                                    value: $scope.ITCEligibility
                                                },
                                                //editorOptions: { placeholder: 'Eligibility of ITC' }
                                            },

                                            {
                                                dataField: 'TotalITCIGST_Amount',
                                                colSpan: 1,
                                                label:
                                                {
                                                    text: 'Total IGST available as ITC'
                                                },
                                                editorOptions:
                                                {
                                                    placeholder: 'IGST'
                                                }
                                            },
                                              {
                                                  dataField: 'MonthITCIGST_Amount',
                                                  colSpan: 1,
                                                  label:
                                                  {
                                                      text: 'IGST ITC availed this month'
                                                  },
                                                  editorOptions:
                                                  {
                                                      placeholder: 'IGST'
                                                  }
                                              },
                                            {
                                                dataField: 'TotalITCCGST_Amount',
                                                colSpan: 1,
                                                label:
                                                {
                                                    text: 'Total CGST available as ITC'
                                                },
                                                editorOptions:
                                                {
                                                    placeholder: 'CGST'
                                                }
                                            },
                                            {
                                                dataField: 'MonthITCCGST_Amount',
                                                colSpan: 1,
                                                label:
                                                {
                                                    text: 'CGST ITC availed this month'
                                                },
                                                editorOptions:
                                                {
                                                    placeholder: 'CGST'
                                                }
                                            },
                                            {
                                                dataField: 'TotalITCSGST_Amount',
                                                colSpan: 1,
                                                label:
                                                {
                                                    text: 'Total SGST available as ITC'
                                                },
                                                editorOptions:
                                                {
                                                    placeholder: 'SGST'
                                                }
                                            },

                                            {
                                                dataField: 'MonthITCSGST_Amount',
                                                colSpan: 1,
                                                label:
                                                {
                                                    text: 'SGST ITC availed this month'
                                                },
                                                editorOptions:
                                                {
                                                    placeholder: 'SGST'
                                                }
                                            },
                                             {
                                                 dataField: 'TotalITCAdmissible',
                                                 colSpan: 1,
                                                 label:
                                                 {
                                                     text: 'Total  ITC Admissible '
                                                 },
                                                 editorOptions:
                                                 {
                                                     placeholder: 'Total  ITC Admissible '
                                                 }
                                             },
                                             {
                                                 dataField: 'MonthITCAdmissible',
                                                 colSpan: 1,
                                                 label:
                                                 {
                                                     text: 'ITC admissible this month'
                                                 },
                                                 editorOptions:
                                                 {
                                                     placeholder: 'ITC admissible this month'
                                                 }
                                             },

                                ]
                            },


                            ]
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
                                        $scope.AddRecord($scope.currentRow.data, B2Bstore, B2BDataSource);
                                    }
                                    else {
                                        $scope.UpdateRecord($scope.currentRow.key, $scope.currentRow.data, B2Bstore, B2BDataSource);
                                    }
                                    $scope.showInfo();
                                }
                            }
                        }
                        ]
                    },

                    ]

                },

            ]
        };

        $scope.popupOptions = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "B2B ",
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
        //#endregion
    }

    $scope.CreateB2CPopup = function () {
        //#region B TO C POP UP DETAILS
        $scope.popupFormBtoCDetails = {
            formData:
            {},
            //bindingOptions: {
            //    formData: 'currentRow.data'
            //},
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
                                    //caption: 'Invoice Details',
                                    colCount: 2,
                                    items: [
                                        //{
                                        //    dataField: 'FormType',
                                        //    editorType: 'dxSelectBox',
                                        //    colSpan: 1,
                                        //    label:
                                        //    {
                                        //        text: 'Form Type'
                                        //    },
                                        //    editorOptions:
                                        //    {
                                        //        placeholder: 'Form Type'
                                        //    }
                                        //},
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
                               items: B2BSectionTypeModel,
                               value: $scope.SectionType
                           },
                                         },
                                        {
                                            dataField: 'GSTIN/ Name of unregistered supplier',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'GSTIN/ Name of unregistered supplier'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'GSTIN/ Name of unregistered supplier'
                                            }

                                        },
                                         {
                                             dataField: 'StateCode',
                                             colSpan: 1,
                                             label:
                                             {
                                                 text: 'State Code'
                                             },
                                             editorOptions:
                                             {
                                                 placeholder: 'State Code'
                                             }

                                         },

                                        {
                                            dataField: 'InvoiceNo',
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
                                            dataField: 'HSN',
                                            colSpan: 1,
                                            //editorType: "dxTextArea",
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
                                            dataField: 'GoodandServices',
                                            colSpan: 1,
                                            //editorType: "dxTextArea",
                                            label:
                                            {
                                                text: 'Goods/Services'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'Goods/Services'
                                            }
                                        },

                                    ]
                                },
                                {
                                    itemType: "group",
                                    caption: 'Revised Invoice Details',
                                    colCount: 2,
                                    items: [
                                        {
                                            dataField: 'GSTIN/ Name of unregistered supplier',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'GSTIN/ Name of unregistered supplier'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'GSTIN/ Name of unregistered supplier'
                                            }

                                        },

                                        {
                                            dataField: 'StateCode',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'State Code'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'State Code'
                                            }

                                        },
                                        {
                                            dataField: 'GoodandServices',
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
                                            dataField: 'HSN',
                                            colSpan: 1,
                                            //editorType: "dxTextArea",
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
                                            dataField: 'InvoiceNo',
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
                                            dataField: 'TaxableValue',
                                            colSpan: 1,
                                            //editorType: "dxTextArea",
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
                                            dataField: 'InvoiceValue',
                                            colSpan: 1,
                                            //editorType: "dxTextArea",
                                            label:
                                            {
                                                text: 'Invoice Value'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'Invoice Value'
                                            }
                                        },

                                    ]
                                },

                            ]
                        },
                        {
                            itemType: 'group',
                            colCount: 1,
                            items: [
                                {
                                    itemType: "group",
                                    //caption: 'Tax Details',
                                    colCount: 2,
                                    items: [

                                        {
                                            dataField: 'TaxableValue',
                                            colSpan: 2,
                                            //editorType: "dxTextArea",
                                            label:
                                            {
                                                text: 'Taxable Value'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'Taxable Value'
                                            }
                                        },
                                        //{
                                        //    dataField: 'EligibilityOfITC',
                                        //    editorType: 'dxSelectBox',
                                        //    colSpan: 1,
                                        //    label: { text: 'Eligibility of ITC' },
                                        //    editorOptions: { items: ITCEligibilityModel, value: "" },
                                        //    //editorOptions: { placeholder: 'Eligibility of ITC' }
                                        //},
                                        {
                                            dataField: 'CGST',
                                            editorType: 'dxSelectBox',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'CGST'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'Rate'
                                            }
                                        },
                                        {
                                            dataField: 'Amount',
                                            colSpan: 1,
                                            //editorType: "dxTextArea",
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
                                            dataField: 'SGST',
                                            editorType: 'dxSelectBox',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'SGST'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'Rate'
                                            }
                                        },
                                        {
                                            dataField: 'SGSTAmount',
                                            colSpan: 1,
                                            //editorType: "dxTextArea",
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
                                            dataField: 'IGST',
                                            editorType: 'dxSelectBox',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'IGST'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'Rate'
                                            }
                                        },
                                        {
                                            dataField: 'IGSTAmount',
                                            colSpan: 1,
                                            //editorType: "dxTextArea",
                                            label:
                                            {
                                                text: 'Amount'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'Amount'
                                            }
                                        },
                                    ]
                                },
                                {
                                    itemType: "group",
                                    caption: 'Shipping Details',
                                    colCount: 2,
                                    items: [

                                        {
                                            dataField: 'BillOfExport',
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
                                            dataField: 'BillofExportDate',
                                            editorType: 'dxDateBox',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'Bill of Export (Date)'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'Bill of Export (Date)',
                                                width: '100%',
                                                displayFormat: AppSetting.AppConstant.Dateformat,
                                            }
                                        },


                                    ]
                                },

                                {
                                    itemType: "group",
                                    caption: 'ITC Details',
                                    colCount: 2,
                                    items: [
                                        {
                                            dataField: 'EligibilityOfITC',
                                            editorType: 'dxSelectBox',
                                            colSpan: 2,
                                            label:
                                            {
                                                text: 'Eligibility of ITC'
                                            },
                                            editorOptions:
                                            {
                                                items: ITCEligibilityModel,
                                                value: ""
                                            },
                                            //editorOptions: { placeholder: 'Eligibility of ITC' }
                                        },


                                        {
                                            dataField: 'TotalIGST',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'Total IGST available as ITC'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'IGST'
                                            }
                                        },
                                        {
                                            dataField: 'ITCAvailed',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'ITC availed this month'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'ITC availed this month'
                                            }
                                        },
                                        {
                                            dataField: 'TotalITCAdmissible',
                                            editorType: 'dxSelectBox',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'Total ITC admissible'
                                            },
                                            editorOptions:
                                            {
                                                items: ITCAdmissibleModel,
                                                value: ""
                                            },
                                            //editorOptions: { placeholder: 'Eligibility of ITC' }
                                        },
                                        {
                                            dataField: 'ITCAdmissible',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'ITC admissible this month'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'ITC admissible this month'
                                            }
                                        },


                                    ]
                                },


                            ]
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
                                    $scope.showPopupBtoCInfo();
                                }
                            }
                        }]
                    }, ]

                },

            ]
        };

        $scope.popupBtoCOptions = {
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
                visible: "visiblePopupBtoC",
            },
            contentTemplate: 'BtoCcontent'
        };

        $scope.visiblePopupBtoC = false;

        $scope.showPopupBtoCInfo = function () {
            $scope.visiblePopupBtoC = !$scope.visiblePopupBtoC;
        };
        //#endregion
    }

    $scope.CreateUnregistredTaxpayerPopup = function () {
        //#region POPUP UNREGISTERED TAXPAYER DETAILS
        $scope.popupFormUnregistredTaxpayerDetails = {
            //formData: $scope.UTPDataModel,
            bindingOptions: {
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
                    itemType: 'group',
                    caption: 'Invoice Details',
                    colCount: 2,
                    items: [
                        //{
                        //    dataField: 'FormType',
                        //    editorType: 'dxSelectBox',
                        //    colSpan: 1,
                        //    label:
                        //    {
                        //        text: 'Form Type'
                        //    },
                        //    editorOptions:
                        //    {
                        //        placeholder: 'Form Type'
                        //    }
                        //},
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
                               items: ITCSectionTypeModel,
                               value: $scope.SectionType
                           },
                         },
                        {
                            dataField: 'Description',
                            colSpan: 1,
                            label:
                            {
                                text: 'Description'
                            },
                            editorOptions:
                            {
                                placeholder: 'Description'
                            }

                        },
                        {
                            dataField: 'HSNSACCode',
                            colSpan: 1,
                            //editorType: "dxTextArea",
                            label:
                            {
                                text: 'HSN/SAC'
                            },
                            editorOptions:
                            {
                                placeholder: 'HSN/SAC'
                            }
                        },



                    ]
                },
                {
                    itemType: "group",
                    caption: 'Value of supplies received from',
                    colCount: 2,
                    items: [
                        {
                            dataField: 'URDealerSuppliesValue',
                            colSpan: 1,
                            label:
                            {
                                text: 'Unregistred taxable Person'
                            },
                            editorOptions:
                            {
                                placeholder: 'Unregistred taxable Person'
                            }

                        },
                        {
                            dataField: 'CmpdDealerSuppliesValue',
                            colSpan: 1,
                            label:
                            {
                                text: 'Compounding taxable Person'
                            },
                            editorOptions:
                            {
                                placeholder: 'Compounding taxable Person'
                            }

                        },



                    ]
                },
                {
                    itemType: "group",
                    caption: 'Supply information',
                    colCount: 3,
                    items: [
                        {
                            dataField: 'ExemptedSuppliesValue',
                            colSpan: 1,
                            label:
                            {
                                text: 'Any Exempt Supply'
                            },
                            editorOptions:
                            {
                                placeholder: 'Any Exempt Supply'
                            }

                        },
                        {
                            dataField: 'NilRatedSuppliesValue',
                            colSpan: 1,
                            label:
                            {
                                text: 'Any Nil Rated Supply'
                            },
                            editorOptions:
                            {
                                placeholder: 'Any Nil Rated Supply'
                            }

                        },
                        {
                            dataField: 'NonGSTSuppliesValue',
                            colSpan: 1,
                            label:
                            {
                                text: 'Non GST Supply'
                            },
                            editorOptions:
                            {
                                placeholder: 'Non GST Supply'
                            }

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
                    },
                    {
                        editorType: "dxButton",
                        editorOptions:
                        {
                            text: "Submit",
                            onClick: function (e) {
                                if ($scope.existingRowEditingMode == false) {
                                    $scope.AddRecord($scope.currentRow.data, UTPstore, UTPDataSource);
                                }
                                else {
                                    $scope.UpdateRecord($scope.currentRow.key, $scope.currentRow.data, UTPstore, UTPDataSource);
                                }
                                $scope.showUnregisteredTaxDetailsInfo();
                            }
                        }
                    }]
                },



            ]
        };

        $scope.popupUnregistredTaxpayerDetails = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "ITC Not Available",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visibleUnregistredTaxpayerDetails",
            },
            contentTemplate: 'UnregistredTaxpayerDetailscontent'
        };

        $scope.visibleUnregistredTaxpayerDetails = false;

        $scope.showUnregisteredTaxDetailsInfo = function () {
            $scope.visibleUnregistredTaxpayerDetails = !$scope.visibleUnregistredTaxpayerDetails;
        };

        //#endregion
    }

    $scope.CreateISDCreditPopup = function () {
        //#region POPUP ISD CREDIT DETAILS
        $scope.popupFormISDCreditDetails = {
            //formData: $scope.ISDDataModel,
            bindingOptions: {
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
                    itemType: 'group',
                    caption: 'Invoice Details',
                    colCount: 2,
                    items: [
                        //{
                        //    dataField: 'FormType',
                        //    editorType: 'dxSelectBox',
                        //    colSpan: 1,
                        //    label:
                        //    {
                        //        text: 'Form Type'
                        //    },
                        //    editorOptions:
                        //    {
                        //        placeholder: 'Form Type'
                        //    }
                        //},
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
                              items: ISDSectionTypeModel,
                              value: $scope.SectionType
                          },
                         },
                        {
                            dataField: 'GSTIN_ISD',
                            colSpan: 1,
                            label:
                            {
                                text: 'GSTIN_ISD'
                            },
                            editorOptions:
                            {
                                placeholder: 'GSTIN_ISD'
                            }

                        },
                        {
                            dataField: 'InvoiceNo',
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
                            dataField: 'SAC',
                            colSpan: 1,
                            //editorType: "dxTextArea",
                            label:
                            {
                                text: 'SAC'
                            },
                            editorOptions:
                            {
                                placeholder: 'SAC'
                            }
                        },



                    ]
                },
                {
                    itemType: "group",
                    caption: 'ISD Credit Details',
                    colCount: 3,
                    items: [
                    {
                        dataField: 'IGST_Amount',
                        colSpan: 1,
                        label:
                        {
                            text: 'IGST'
                        },
                        editorOptions:
                        {
                            placeholder: 'IGST'
                        }

                    },
                    {
                        dataField: 'CGST_Amount',
                        colSpan: 1,
                        label:
                        {
                            text: 'CGST'
                        },
                        editorOptions:
                        {
                            placeholder: 'CGST'
                        }

                    },
                    {
                        dataField: 'SGST_Amount',
                        colSpan: 1,
                        label:
                        {
                            text: 'SGST'
                        },
                        editorOptions:
                        {
                            placeholder: 'SGST'
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
                                if ($scope.existingRowEditingMode == false) {
                                    $scope.AddRecord($scope.currentRow.data, ISDstore, ISDDataSource);
                                }
                                else {
                                    $scope.UpdateRecord($scope.currentRow.key, $scope.currentRow.data, ISDstore, ISDDataSource);
                                }
                                $scope.showISDCreditDetailsInfo();
                            }
                        }
                    }]
                },



            ]
        };

        $scope.popupISDCreditDetails = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "ISD Credit",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblePopupISDCReditDetails",
            },
            contentTemplate: 'ISDCreditDetailscontent'
        };

        $scope.visiblePopupISDCReditDetails = false;

        $scope.showISDCreditDetailsInfo = function () {
            $scope.visiblePopupISDCReditDetails = !$scope.visiblePopupISDCReditDetails;
        };

        //#endregion
    }

    $scope.CreateICTReceivedPopup = function () {
        //#region POPUP ICT RECEIVED DETAILS
        $scope.popupFormICTReceivedDetails = {
            //formData: $scope.ICTDataModel,
            bindingOptions: {
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
                    itemType: 'group',
                    caption: 'ITC Availed Details',
                    colCount: 2,
                    items: [
                    //{
                    //    dataField: 'FormType',
                    //    editorType: 'dxSelectBox',
                    //    colSpan: 2,
                    //    label:
                    //    {
                    //        text: 'Form Type'
                    //    },
                    //    editorOptions:
                    //    {
                    //        placeholder: 'Form Type'
                    //    }
                    //},
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
                             items: ITCReceivedSectionTypeModel,
                             value: $scope.SectionType
                         },
                     },
                    {
                        dataField: 'OriginalInvoiceNo',
                        colSpan: 1,
                        label:
                        {
                            text: 'Original Invoice No'
                        },
                        editorOptions:
                        {
                            placeholder: 'OriginalInvoice No'
                        }
                    },
                    {
                        dataField: 'OriginalInvoiceDate',
                        editorType: 'dxDateBox',
                        colSpan: 1,
                        label:
                        {
                            text: 'Original Invoice Date'
                        },
                        editorOptions:
                        {
                            placeholder: 'Original Invoice Date',
                            width: '100%',
                            displayFormat: AppSetting.AppConstant.Dateformat,
                        }
                    }, ]
                },
                {
                    itemType: "group",
                    caption: 'Tax Details',
                    colCount: 2,
                    colSpan: 2,
                    items: [


                        {
                            dataField: 'EarlierIGST_Value',
                            colSpan: 1,
                            label:
                            {
                                text: 'ITC_IGST Availed Earlier'
                            },
                            editorOptions:
                            {
                                placeholder: 'ITC_IGST Availed Earlier'
                            }
                        },
                        {
                            dataField: 'CurrentIGST_Value',
                            colSpan: 1,
                            label:
                            {
                                text: 'ITC_IGST Availed this month'
                            },
                            editorOptions:
                            {
                                placeholder: 'ITC_IGST Availed this month'
                            }
                        },
                        {
                            dataField: 'EarlierCGST_Value',
                            colSpan: 1,
                            label:
                            {
                                text: 'ITC_CGST Availed Earlier'
                            },
                            editorOptions:
                            {
                                placeholder: 'ITC_CGST Availed Earlier'
                            }
                        },
                        {
                            dataField: 'CurrentCGST_Value',
                            colSpan: 1,
                            label:
                            {
                                text: 'ITC_CGST Availed this month'
                            },
                            editorOptions:
                            {
                                placeholder: 'ITC_CGST Availed this month'
                            }
                        },
                        {
                            dataField: 'EarlierSGST_Value',
                            colSpan: 1,
                            label:
                            {
                                text: 'ITC_SGST Availed Earlier'
                            },
                            editorOptions:
                            {
                                placeholder: 'ITC_SGST Availed Earlier'
                            }
                        },
                        {
                            dataField: 'CurrentSGST_Value',
                            colSpan: 1,
                            label:
                            {
                                text: 'ITC_SGST Availed this month'
                            },
                            editorOptions:
                            {
                                placeholder: 'ITC_SGST Availed this month'
                            }
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
                    },
                    {
                        editorType: "dxButton",
                        editorOptions:
                        {
                            text: "Submit",
                            onClick: function (e) {
                                if ($scope.existingRowEditingMode == false) {
                                    $scope.AddRecord($scope.currentRow.data, ICTstore, ICTDataSource);
                                }
                                else {
                                    $scope.UpdateRecord($scope.currentRow.key, $scope.currentRow.data, ICTstore, ICTDataSource);
                                }
                                $scope.showICTReceivedDetailsInfo();
                            }
                        }
                    }]
                },



            ]
        };

        $scope.popupICTReceivedDetails = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "ITC Credit Details",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblepopupICTReceivedDetails",
            },
            contentTemplate: 'ICTReceivedDetailscontent'
        };

        $scope.visiblepopupICTReceivedDetails = false;

        $scope.showICTReceivedDetailsInfo = function () {
            $scope.visiblepopupICTReceivedDetails = !$scope.visiblepopupICTReceivedDetails;
        };

        //#endregion
    }

    $scope.CreateTaxPaidOnInvoicePopup = function () {
        //#region POPUP TAX PAID ON INVOICE DETAILS
        $scope.popupFormTaxPaidOnInvoiceDetails = {
            //formData: $scope.TaxPaidDataModel,
            bindingOptions: {
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
                    itemType: 'group',
                    caption: 'Invoice Details',
                    colCount: 2,
                    items: [
                    //{
                    //    dataField: 'FormType',
                    //    editorType: 'dxSelectBox',
                    //    colSpan: 1,
                    //    label:
                    //    {
                    //        text: 'Form Type'
                    //    },
                    //    editorOptions:
                    //    {
                    //        placeholder: 'Form Type'
                    //    }
                    //},
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
                             items: PrePaidInvoicesSectionTypeModel,
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
                    caption: 'Tax Paid On Time Of Supply',
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
                            dataField: 'CGST_Tax',
                            colSpan: 1,
                            //editorType: "dxTextArea",
                            label:
                            {
                                text: 'Amount'
                            },
                            editorOptions:
                            {
                                placeholder: 'Tax'
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
                            //editorType: "dxTextArea",
                            label:
                            {
                                text: 'Amount'
                            },
                            editorOptions:
                            {
                                placeholder: 'Tax'
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
                            //editorType: "dxTextArea",
                            label:
                            {
                                text: 'Amount'
                            },
                            editorOptions:
                            {
                                placeholder: 'Tax'
                            }
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
                    },
                    {
                        editorType: "dxButton",
                        editorOptions:
                        {
                            text: "Submit",
                            onClick: function (e) {
                                if ($scope.existingRowEditingMode == false) {
                                    $scope.AddRecord($scope.currentRow.data, TaxPaidstore, TaxPaidDataSource);
                                }
                                else {
                                    $scope.UpdateRecord($scope.currentRow.key, $scope.currentRow.data, TaxPaidstore, TaxPaidDataSource);
                                }
                                $scope.showTaxPaidOnInvoiceDetailsInfo();
                            }
                        }
                    }]
                },



            ]
        };

        $scope.popupTaxPaidOnInvoiceDetails = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "Pre-Paid Invoices",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblepopupTaxPaidOnInvoiceDetails",
            },
            contentTemplate: 'TaxPaidOnInvoiceDetailscontent'
        };

        $scope.visiblepopupTaxPaidOnInvoiceDetails = false;

        $scope.showTaxPaidOnInvoiceDetailsInfo = function () {
            $scope.visiblepopupTaxPaidOnInvoiceDetails = !$scope.visiblepopupTaxPaidOnInvoiceDetails;
        };

        //#endregion
    }

    $scope.CreateITCRevasalPopup = function () {
        //#region POPUP ITC REVERSAL DETAILS
        $scope.popupFormITCRevasalDetails = {
            //formData: $scope.ITCDataRevModel,
            bindingOptions: {
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
                    itemType: 'group',
                    caption: 'Basic Details',
                    colCount: 2,
                    items: [                       
                         {
                             dataField: 'SectionType',
                             editorType: 'dxSelectBox',
                             colSpan: 2,
                             label:
                             {
                                 text: 'Section Type'
                             },
                             editorOptions:
                         {
                             items: ITCReversalSectionTypeModel,
                             value: $scope.SectionType
                         }
                         },
                         {
                             dataField: 'Description',
                             editorType: 'dxSelectBox',
                             colSpan: 1,
                             label:
                             {
                                 text: 'Description'
                             },
                             editorOptions:
                             {
                                 placeholder: 'Description'
                             }
                         },

                         {
                             dataField: 'TaxPeriod',
                             editorType: 'dxSelectBox',
                             colSpan: 2,
                             label:
                             {
                                 text: 'Tax Period'
                             },
                             editorOptions:
                             {
                                 placeholder: 'Tax Period'
                             }
                         },
                    ]
                },
                {
                    itemType: "group",
                    caption: 'ITC reversal details',
                    colCount: 2,
                    items: [

                    {
                        dataField: 'IGST_Amount',
                        //editorType: 'dxSelectBox',
                        colSpan: 1,
                        label:
                        {
                            text: 'IGST'
                        },
                        editorOptions:
                        {
                            placeholder: 'Amount'
                        }
                    },
                    {
                        dataField: 'IGST_Interest',
                        colSpan: 1,
                        label:
                        {
                            text: 'Interest'
                        },
                        editorOptions:
                        {
                            placeholder: 'Interest'
                        }

                    },
                    {
                        dataField: 'CGST_Amount',
                        //editorType: 'dxSelectBox',
                        colSpan: 1,
                        label:
                        {
                            text: 'CGST'
                        },
                        editorOptions:
                        {
                            placeholder: 'Amount'
                        }
                    },
                    {
                        dataField: 'CGST_Interest',
                        colSpan: 1,
                        label:
                        {
                            text: 'Interest'
                        },
                        editorOptions:
                        {
                            placeholder: 'Interest'
                        }

                    },
                    {
                        dataField: 'SGST_Amount',
                        //editorType: 'dxSelectBox',
                        colSpan: 1,
                        label:
                        {
                            text: 'SGST'
                        },
                        editorOptions:
                        {
                            placeholder: 'Amount'
                        }
                    },
                    {
                        dataField: 'SGST_Interest',
                        colSpan: 1,
                        label:
                        {
                            text: 'Interest'
                        },
                        editorOptions:
                        {
                            placeholder: 'Interest'
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
                                if ($scope.existingRowEditingMode == false) {
                                    $scope.AddRecord($scope.currentRow.data, ITCRevstore, ITCDataSource);
                                }
                                else {
                                    $scope.UpdateRecord($scope.currentRow.key, $scope.currentRow.data, ITCRevstore, ITCDataSource);
                                }
                                $scope.showITCRevasalDetailsInfo();
                            }
                        }
                    }]
                },



            ]
        };

        $scope.popupITCRevasalDetails = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "ITC Reversal",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblepopupITCRevasalDetail",
            },
            contentTemplate: 'ITCRevasalDetailscontent'
        };

        $scope.visiblepopupITCRevasalDetail = false;

        $scope.showITCRevasalDetailsInfo = function () {
            $scope.visiblepopupITCRevasalDetail = !$scope.visiblepopupITCRevasalDetail;
        };

        //#endregion
    }

    $scope.CreateTaxPaidOnAdvancePopup = function () {
        //#region POPUP TAX PAID ON ADVANCE
        $scope.popupTaxPaidOnAdvance = {
            //formData:
            //{},
            bindingOptions: {
                formData: 'currentRow.data'
            },
            onInitialized: function (e) {
                $scope.formInstance = e.component;
            },
            width: 500,
            height: 'auto',
            scrollingEnabled: true,
            colCount: 1,
            //colSpan: 2,
            labelLocation: "top",
            items: [
                {
                    itemType: "group",
                    colCount: 1,
                    //colSpan: 2,
                    items: [
                        {
                            itemType: 'group',
                            caption: 'Invoice Details',
                            colCount: 2,
                            items: [
                                //{
                                //    dataField: 'FormType',
                                //    editorType: 'dxSelectBox',
                                //    colSpan: 1,
                                //    label:
                                //    {
                                //        text: 'Form Type'
                                //    },
                                //    editorOptions:
                                //    {
                                //        placeholder: 'Form Type'
                                //    }
                                //},
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
                                  items: PrePaidInvoicesSectionTypeModel,
                                  value: $scope.SectionType
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
                                },

                            ]
                        },
                        {
                            itemType: "group",
                            caption: 'Tax Details',
                            colCount: 2,
                            items: [


                                {
                                    dataField: 'CGST',
                                    editorType: 'dxSelectBox',
                                    colSpan: 1,
                                    label:
                                    {
                                        text: 'CGST'
                                    },
                                    editorOptions:
                                    {
                                        placeholder: 'Rate'
                                    }
                                },
                                {
                                    dataField: 'Amount',
                                    colSpan: 1,
                                    //editorType: "dxTextArea",
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
                                    dataField: 'SGST',
                                    editorType: 'dxSelectBox',
                                    colSpan: 1,
                                    label:
                                    {
                                        text: 'SGST'
                                    },
                                    editorOptions:
                                    {
                                        placeholder: 'Rate'
                                    }
                                },
                                {
                                    dataField: 'SGSTAmount',
                                    colSpan: 1,
                                    //editorType: "dxTextArea",
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
                                    dataField: 'IGST',
                                    editorType: 'dxSelectBox',
                                    colSpan: 1,
                                    label:
                                    {
                                        text: 'IGST'
                                    },
                                    editorOptions:
                                    {
                                        placeholder: 'Rate'
                                    }
                                },
                                {
                                    dataField: 'IGSTAmount',
                                    colSpan: 1,
                                    //editorType: "dxTextArea",
                                    label:
                                    {
                                        text: 'Amount'
                                    },
                                    editorOptions:
                                    {
                                        placeholder: 'Amount'
                                    }
                                },
                            ]
                        },
                        //{
                        //    itemType: "group",
                        //    colSpan: 1,
                        //    colCount: 1,
                        //    items: [
                        //         //{
                        //         //    itemType: 'group',
                        //         //    colCount: 1,
                        //         //    items: [


                        //         //    ]
                        //         //},
                        //          //{
                        //          //    itemType: 'group',
                        //          //    colCount: 1,
                        //          //    items: [

                        //          //    ]
                        //          //},
                        //    ],
                        //},
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
                                        //if ($scope.existingRowEditingMode == false) {
                                        //    $scope.AddRecord($scope.currentRow.data, TaxPaidstore, TaxPaidDataSource);
                                        //}
                                        //else {
                                        //    $scope.UpdateRecord($scope.currentRow.key, $scope.currentRow.data, TaxPaidstore, TaxPaidDataSource);
                                        //}
                                        $scope.showTaxPaidOnAdvanceInfo();
                                    }
                                }
                            }]
                        },
                    ]

                },

            ]
        };

        $scope.popupTaxPaidOnAdvanceOption = {
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
                visible: "visiblePopupTaxPaidOnAdvance",
            },
            contentTemplate: 'TaxPaidOnAdvancecontent'
        };

        $scope.visiblePopupTaxPaidOnAdvance = false;

        $scope.showTaxPaidOnAdvanceInfo = function () {
            $scope.visiblePopupTaxPaidOnAdvance = !$scope.visiblePopupTaxPaidOnAdvance;
        };
        //#endregion
    }

    $scope.CreateISDCreditHistoryPopup = function () {
        //#region POPUP ISD CREDIT GRID
        $scope.popupISDCredit = {
            formData:
            {},
            width: 1000,
            height: 'auto',
            //scrollingEnabled: true,
            colCount: 1,
            labelLocation: "top",
            items: [

                {
                    itemType: "group",
                    colCount: 1,
                    items: [
                        {
                            colSpan: 1,
                            template: 'button_acceptrejectUSDCredit'
                        },

                            {
                                itemType: "empty",
                                colCount: 12,
                                colSpan: 2,
                            },
                             {

                                 template: 'ISDCreditGridTemplate'

                             },
                       $scope.ISDCreditgridSettings = {
                           bindingOptions: {
                               dataSource: 'ISDHistoryModel'
                           },
                           sorting:
                           {
                               mode: 'none'
                           },
                           width: 'auto',
                           height: 350,
                           columns: [
                                           //{
                                           //    caption: "Form Type",
                                           //    dataField: 'FormType'
                                           //},

{
    caption: 'Section Type',
    dataField: 'SectionType',
    alignment: 'center',
},
                                           {
                                               caption: "GSTIN ID",
                                               dataField: 'GSTIN_ISD'
                                           },
                                           {
                                               caption: "Invoice No",
                                               dataField: 'InvoiceNo'
                                           },
                                           {
                                               caption: "Invoice Date",
                                               dataField: 'InvoiceDate',
                                               dataType: 'date',
                                               format: AppSetting.AppConstant.Dateformat,
                                           },
                                           {
                                               caption: "SAC",
                                               dataField: 'SAC'
                                           },

                                           {
                                               //caption: "Population",
                                               headerCellTemplate: function (container) {
                                                   container.append($("<div style='text-align: right;padding-right: 33%;'>ISD Credit</div>"));
                                               },
                                               columns: [
                                               {
                                                   caption: "IGST",
                                                   dataField: "IGST_Amount",
                                                   format: { type: 'fixedPoint', precision: 2 }

                                               },
                                               {
                                                   caption: "CGST",
                                                   dataField: "CGST_Amount",
                                                   format: { type: 'fixedPoint', precision: 2 }

                                               },
                                               {
                                                   caption: "SGST",
                                                   dataField: "SGST_Amount",
                                                   format: { type: 'fixedPoint', precision: 2 }

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
                                        console.log("onClick");
                                        $scope.showISDCreditGridInfo();
                                    }
                                }
                            }]
                        },
                    ]

                },

            ]
        };

        $scope.popupISDCreditOption = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "ISD Credit",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblePopupISDCReditGrid",
            },
            contentTemplate: 'ISDCreditcontent'
        };

        $scope.visiblePopupISDCReditGrid = false;

        $scope.showISDCreditGridInfo = function () {
            $scope.visiblePopupISDCReditGrid = !$scope.visiblePopupISDCReditGrid;
        };
        //#endregion
    }

    $scope.CreateTDSCreditPopup = function () {
        //#region POPUP TDS CREDIT
        $scope.popupTDSCredit = {
            //formData:
            //{},
            bindingOptions: {
                formData: 'currentRow.data'
            },
            onInitialized: function (e) {
                $scope.formInstance = e.component;
            },
            width: 600,
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

                        //{
                        //    dataField: 'FormType',
                        //    editorType: 'dxSelectBox',
                        //    colSpan: 1,
                        //    label:
                        //    {
                        //        text: 'Form Type'
                        //    },
                        //    editorOptions:
                        //    {
                        //        placeholder: 'Form Type'
                        //    }
                        //},
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
                                 items: TDSCreditSectionTypeModel,
                                 value: $scope.SectionType
                             }
                         },
                        {
                            dataField: 'DeducteeGSTIN',
                            colSpan: 1,
                            label:
                            {
                                text: 'GSTIN of deductor'
                            },
                            editorOptions:
                            {
                                placeholder: 'GSTIN of deductor'
                            }

                        },

                        {
                            dataField: 'InvoiceNo',
                            colSpan: 1,
                            label:
                            {
                                text: 'Invoice/Document No.'
                            },
                            editorOptions:
                            {
                                placeholder: 'Invoice/Document No.'
                            }
                        },
                        {
                            dataField: 'InvoiceDate',
                            editorType: 'dxDateBox',
                            colSpan: 1,
                            label:
                            {
                                text: 'Invoice/Document Date'
                            },
                            editorOptions:
                            {
                                placeholder: 'Invoice/Document Date',
                                width: '100%',
                                displayFormat: AppSetting.AppConstant.Dateformat,
                            }
                        },
                        {
                            dataField: 'PaymentDateToDeductee',
                            editorType: 'dxDateBox',
                            colSpan: 1,
                            label:
                            {
                                text: 'Date of Payment made to the deductee'
                            },
                            editorOptions:
                            {
                                placeholder: 'Date of Payment made to the deductee',
                                width: '100%',
                                displayFormat: AppSetting.AppConstant.Dateformat,
                            }
                        },
                        {
                            dataField: 'TDS_ApplicableValue',
                            colSpan: 1,
                            label:
                            {
                                text: 'Value on whichTDS has been deducted'
                            },
                            editorOptions:
                            {
                                placeholder: 'Value on whichTDS has been deducted'
                            }
                        },
                        {
                            dataField: 'InvoiceValue',
                            colSpan: 1,
                            label:
                            {
                                text: 'Invoice/Document value'
                            },
                            editorOptions:
                            {
                                placeholder: 'Invoice/Document value'
                            }
                        },
                    ]

                },
                {
                    itemType: "group",
                    caption: 'TDS Credit Details',
                    colCount: 2,
                    colSpan: 2,
                    items: [


                        {
                            dataField: 'CGST_Rate',
                            editorType: 'dxSelectBox',
                            colSpan: 1,
                            label:
                            {
                                text: 'TDS_CGST'
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
                            //editorType: "dxTextArea",
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
                                text: 'TDS_SGST'
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
                            //editorType: "dxTextArea",
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
                                text: 'TDS_IGST'
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
                            //editorType: "dxTextArea",
                            label:
                            {
                                text: 'Amount'
                            },
                            editorOptions:
                            {
                                placeholder: 'Amount'
                            }
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
                    },
                    {
                        editorType: "dxButton",
                        editorOptions:
                        {
                            text: "Submit",
                            onClick: function (e) {
                                if ($scope.existingRowEditingMode == false) {
                                    $scope.AddRecord($scope.currentRow.data, TDSstore, TDSDataSource);
                                }
                                else {
                                    $scope.UpdateRecord($scope.currentRow.key, $scope.currentRow.data, TDSstore, TDSDataSource);
                                }
                                $scope.showTDSCreditInfo();
                            }
                        }
                    }]
                },

            ]
        };

        $scope.popupTDSCreditOption = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "TDS Credit",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblepopupTDSCredit",
            },
            contentTemplate: 'TDSCreditcontent'
        };

        $scope.visiblepopupTDSCredit = false;

        $scope.showTDSCreditInfo = function () {
            $scope.visiblepopupTDSCredit = !$scope.visiblepopupTDSCredit;
        };
        //#endregion
    }

    $scope.CreateTDSCreditHistoryPopup = function () {
        //#region POPUP TDS GRID
        $scope.popupTDSCreditGrid = {
            formData:
            {},
            width: 1000,
            height: 'auto',
            //scrollingEnabled: true,
            colCount: 1,
            labelLocation: "top",
            items: [
                 {
                     colSpan: 1,
                     template: 'button_acceptrejectTDSCredit'
                 },

                            {
                                itemType: "empty",
                                colCount: 12,
                                colSpan: 2,
                            },
                  {

                      template: 'TDSCreditGridTemplate'

                  },
                       $scope.TDSCreditgridSettings = {
                           bindingOptions: {
                               dataSource: 'TDSHistoryModel'
                           },
                         
                           sorting:
                           {
                               mode: 'none'
                           },
                           width: 'auto',
                           height: 350,
                           columns: [
                          //{
                          //    caption: "Form Type",
                          //    dataField: 'FormType',
                          //    width: 100
                          //},
                          {
                              caption: 'Section Type',
                              dataField: 'SectionType',
                              alignment: 'center',
                          },
                                               {
                                                   caption: "GSTIN/UIN of deductor",
                                                   dataField: 'DeducteeGSTIN'
                                               },
                                               {
                                                   caption: "Invoice/Document No",
                                                   dataField: 'InvoiceNo',

                                               },
                                               {
                                                   caption: "Invoice/Document Date",
                                                   dataField: 'InvoiceDate',
                                                   dataType: 'date',
                                                   format: AppSetting.AppConstant.Dateformat,
                                               },
                                               {
                                                   caption: "Date of payment made to deductee",
                                                   dataField: 'PaymentDateToDeductee',
                                                   dataType: 'date',
                                                   width: 150,
                                                   format: AppSetting.AppConstant.Dateformat,

                                               },
                                               {
                                                   caption: "Value on which TDS has been deducted",
                                                   dataField: 'TDS_ApplicableValue',
                                                   width: 150
                                               },
                                               {
                                                   //caption: "Population",
                                                   headerCellTemplate: function (container) {
                                                       container.append($("<div style='text-align: right;padding-right: 33%;'>TDS_IGST</div>"));
                                                   },
                                                   columns: [
                                                   {
                                                       caption: "Rate",
                                                       dataField: "CGST_Rate",
                                                       format: { type: 'fixedPoint' }

                                                   },
                                                   {
                                                       caption: "Amount",
                                                       dataField: "CGST_Amount",
                                                       format: { type: 'fixedPoint', precision: 2 }

                                                   }]
                                               },
                                               {
                                                   //caption: "Population",
                                                   headerCellTemplate: function (container) {
                                                       container.append($("<div style='text-align: right;padding-right: 33%;'>TDS_CGST</div>"));
                                                   },
                                                   columns: [
                                                   {
                                                       caption: "Rate",
                                                       dataField: "SGST_Rate",
                                                       format: { type: 'fixedPoint' }

                                                   },
                                                   {
                                                       caption: "Amount",
                                                       dataField: "SGST_Amount",
                                                       format: { type: 'fixedPoint', precision: 2 }

                                                   }]
                                               },
                                               {
                                                   //caption: "Population",
                                                   headerCellTemplate: function (container) {
                                                       container.append($("<div style='text-align: right;padding-right: 33%;'>TDS_SGST</div>"));
                                                   },
                                                   columns: [
                                                   {
                                                       caption: "Rate",
                                                       dataField: "IGST_Rate",
                                                       format: { type: 'fixedPoint' }
                                                   },
                                                   {
                                                       caption: "Amount",
                                                       dataField: "IGST_Amount",
                                                       format: { type: 'fixedPoint', precision: 2 }

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
                                console.log("onClick");
                                $scope.showTDSCreditGridInfo();
                            }
                        }
                    }]
                },

            ]
        };

        $scope.popupTDSCreditGridOption = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "TDS Credit Details",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblepopupTDSCreditGrid",
            },
            contentTemplate: 'TDSCreditGridcontent'
        };

        $scope.visiblepopupTDSCreditGrid = false;

        $scope.showTDSCreditGridInfo = function () {
            $scope.visiblepopupTDSCreditGrid = !$scope.visiblepopupTDSCreditGrid;
        };
        //#endregion
    }

    $scope.CreateTCSCreditPopup = function () {
        //#region POPUP TCS CREDIT DETAILS
        $scope.popupTCSCredit = {
            //formData: $scope.TCSDataModel,
            bindingOptions: {
                formData: 'currentRow.data'
            },
            onInitialized: function (e) {
                $scope.formInstance = e.component;
            },
            width: 600,
            height: 'auto',
            //scrollingEnabled: true,
            colCount: 2,
            colSpan: 2,
            labelLocation: "top",
            items: [

                {
                    itemType: 'group',
                    caption: 'E-commerce Details',
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
                                 items: TCSCreditSectionTypeModel,
                                 value: $scope.SectionType
                             }
                         },
                        {
                            dataField: 'EcommerceOperatorGSTIN',
                            colSpan: 1,
                            label:
                            {
                                text: 'GSTIN of Ecommerce portal'
                            },
                            editorOptions:
                            {
                                placeholder: 'GSTIN of Ecommerce portal'
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
                                placeholder: 'Merchant ID allocated by e-commerce portal'
                            }
                        },
                        {
                            dataField: 'TaxableTCSValue',
                            colSpan: 1,
                            label:
                            {
                                text: 'Taxable Value'
                            },
                            editorOptions:
                            {
                                placeholder: 'Taxable Value on which TCS has been deducted'
                            }
                        },
                        {
                            dataField: 'GrossSuppliesValue',
                            colSpan: 1,
                            label:
                            {
                                text: 'Gross Value of supplies'
                            },
                            editorOptions:
                            {
                                placeholder: 'Taxable Value on which TCS has been deducted'
                            }
                        },                        
                    ]

                },
                {
                    itemType: "group",
                    caption: 'TCS Credit Details',
                    colCount: 2,
                    colSpan: 2,
                    items: [


                        {
                            dataField: 'CGST_Rate',
                            editorType: 'dxSelectBox',
                            colSpan: 1,
                            label:
                            {
                                text: 'TCS_CGST'
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
                            //editorType: "dxTextArea",
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
                                text: 'TCS_SGST'
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
                            //editorType: "dxTextArea",
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
                                text: 'TCS_IGST'
                            },
                            editorOptions:
                            {
                                items: TaxRateModel,
                                value: $scope.IGST_Rate
                            }
                        },
                        {
                            dataField: 'IGSTAmount',
                            colSpan: 1,
                            //editorType: "dxTextArea",
                            label:
                            {
                                text: 'Amount'
                            },
                            editorOptions:
                            {
                                placeholder: 'Amount'
                            }
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
                    },
                    {
                        editorType: "dxButton",
                        editorOptions:
                        {
                            text: "Submit",
                            onClick: function (e) {
                                if ($scope.existingRowEditingMode == false) {
                                    $scope.AddRecord($scope.currentRow.data, TCSstore, TCSDataSource);
                                }
                                else {
                                    $scope.UpdateRecord($scope.currentRow.key, $scope.currentRow.data, TCSstore, TCSDataSource);
                                }
                                $scope.showTCSCreditInfo();
                            }
                        }
                    }]
                },

            ]
        };

        $scope.popupTCSCreditOption = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "TCS Credit",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblepopupTCSCredit",
            },
            contentTemplate: 'TCSCreditcontent'
        };

        $scope.visiblepopupTCSCredit = false;

        $scope.showTCSCreditInfo = function () {
            $scope.visiblepopupTCSCredit = !$scope.visiblepopupTCSCredit;
        };
        //#endregion
    }

    $scope.CreateTCSCreditHistoryPopup = function () {
        //#region POPUP TCS GRID
        $scope.popupTCSCreditGrid = {
            formData:
            {},
            width: 1000,
            height: 'auto',
            //scrollingEnabled: true,
            colCount: 1,
            labelLocation: "top",
            items: [

                {
                    colSpan: 1,
                    template: 'button_acceptrejectTCSCredit'
                },

                            {
                                itemType: "empty",
                                colCount: 12,
                                colSpan: 2,
                            },
                                 {

                                     template: 'TCSCreditGridTemplate'

                                 },
                       $scope.TCSCreditgridSettings = {
                           bindingOptions: {
                               dataSource: 'TCSHistoryModel'
                           },

                           sorting:
                           {
                               mode: 'none'
                           },
                           width: 'auto',
                           height: 350,
                           columns: [
                           //{
                           //    caption: "Form Type",
                           //    dataField: 'FormType'
                           //},

       {
           caption: 'Section Type',
           dataField: 'SectionType',
           alignment: 'center',
       },
                                               {
                                                   caption: "GSTIN of Ecommerce portal",
                                                   dataField: 'EcommerceOperatorGSTIN',
                                                   width: 150
                                               },
                                               {
                                                   caption: "Merchant ID allocated by e-commerceportal",
                                                   dataField: 'IssuedEcommerceMerchantId',
                                                   width: 150
                                               },
                                               {
                                                   caption: "Taxable  Value on which TCS has been deducted",
                                                   dataField: 'TaxableTCSValue',
                                                   width: 150
                                               },
                                               {
                                                   //caption: "Population",
                                                   headerCellTemplate: function (container) {
                                                       container.append($("<div style='text-align:right;padding-right:25%;'>TCS_IGST</div>"));
                                                   },
                                                   columns: [
                                                   {
                                                       caption: "Rate",
                                                       dataField: "CGST_Rate",
                                                       format: { type: 'fixedPoint' }

                                                   },
                                                   {
                                                       caption: "Amount",
                                                       dataField: "CGST_Amount",
                                                       format: { type: 'fixedPoint', precision: 2 }

                                                   }]
                                               },
                                               {
                                                   //caption: "Population",
                                                   headerCellTemplate: function (container) {
                                                       container.append($("<div style='text-align: right;padding-right: 25%;'>TCS_CGST</div>"));
                                                   },
                                                   columns: [
                                                   {
                                                       caption: "Rate",
                                                       dataField: "SGST_Rate",
                                                       format: { type: 'fixedPoint' }

                                                   },
                                                   {
                                                       caption: "Amount",
                                                       dataField: "SGST_Amount",
                                                       format: { type: 'fixedPoint', precision: 2 }

                                                   }]
                                               },
                                               {
                                                   //caption: "Population",
                                                   headerCellTemplate: function (container) {
                                                       container.append($("<div style='text-align: right;padding-right: 25%;'>TCS_SGST</div>"));
                                                   },
                                                   columns: [
                                                   {
                                                       caption: "Rate",
                                                       dataField: "IGST_Rate",
                                                       format: { type: 'fixedPoint' }

                                                   },
                                                   {
                                                       caption: "Amount",
                                                       dataField: "IGST_Amount",
                                                       format: { type: 'fixedPoint', precision: 2 }

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
                                console.log("onClick");
                                $scope.showTCSCreditGridInfo();
                            }
                        }
                    }]
                },

            ]
        };

        $scope.popupTCSCreditGridOption = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "TCS Credit",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblepopupTCSCreditGrid",
            },
            contentTemplate: 'TCSCreditGridcontent'
        };

        $scope.visiblepopupTCSCreditGrid = false;

        $scope.showTCSCreditGridInfo = function () {
            $scope.visiblepopupTCSCreditGrid = !$scope.visiblepopupTCSCreditGrid;
        };
        //#endregion
    }

    $scope.CreateICTHistoryPopup = function () {
        //#region POPUP ICT GRID
        $scope.popupICTGrid = {
            formData:
            {},
            width: 800,
            height: 'auto',
            //scrollingEnabled: true,
            colCount: 1,
            labelLocation: "top",
            items: [
                {
                    colSpan: 1,
                    template: 'button_acceptrejectICTCredit'
                },

                            {
                                itemType: "empty",
                                colCount: 12,
                                colSpan: 2,
                            },

                                 {

                                     template: 'ICTGridTemplate'

                                 },
                       $scope.ICTgridSettings = {
                           bindingOptions: {
                               dataSource: 'ICTHistoryModel'
                           },

                           sorting:
                           {
                               mode: 'none'
                           },
                           width: 'auto',
                           height: 350,
                           columns: [
                            //{
                            //    caption: "Form Type",
                            //    dataField: 'FormType'
                            //},

       {
           caption: 'Section Type',
           dataField: 'SectionType',
           alignment: 'center',
       },
                                               {
                                                   caption: "Original Invoice No",
                                                   dataField: 'OriginalInvoiceNo'
                                               },
                                               {
                                                   caption: "Original Invoice Date",
                                                   dataField: 'OriginalInvoiceDate',
                                                   dataType: 'date',
                                                   format: AppSetting.AppConstant.Dateformat,
                                               },
                                               {
                                                   //caption: "Population",
                                                   headerCellTemplate: function (container) {
                                                       container.append($("<div style='text-align: right;padding-right: 33%;'>IGST</div>"));
                                                   },
                                                   columns: [
                                                   {
                                                       caption: "Earlier",
                                                       dataField: "EarlierCGST_Value",
                                                       format: { type: 'fixedPoint', precision: 2 }

                                                   },
                                                   {
                                                       caption: "This Month",
                                                       dataField: "CurrentCGST_Value",
                                                       format: { type: 'fixedPoint', precision: 2 }

                                                   }]
                                               },
                                               {
                                                   //caption: "Population",
                                                   headerCellTemplate: function (container) {
                                                       container.append($("<div style='text-align: right;padding-right: 33%;'>CGST</div>"));
                                                   },
                                                   columns: [
                                                   {
                                                       caption: "Earlier",
                                                       dataField: "EarlierSGST_Value",
                                                       format: { type: 'fixedPoint', precision: 2 }

                                                   },
                                                   {
                                                       caption: "This Month",
                                                       dataField: "CurrentSGST_Value",
                                                       format: { type: 'fixedPoint', precision: 2 }

                                                   }]
                                               },
                                               {
                                                   //caption: "Population",
                                                   headerCellTemplate: function (container) {
                                                       container.append($("<div style='text-align: right;padding-right: 33%;'>SGST</div>"));
                                                   },
                                                   columns: [
                                                   {
                                                       caption: "Earlier",
                                                       dataField: "EarlierIGST_Value",
                                                       format: { type: 'fixedPoint', precision: 2 }

                                                   },
                                                   {
                                                       caption: "This Month",
                                                       dataField: "EarlierIGST_Value",
                                                       format: { type: 'fixedPoint', precision: 2 }

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
                                console.log("onClick");
                                $scope.showICTGridInfo();
                            }
                        }
                    }]
                },

            ]
        };

        $scope.popupICTGridOption = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "ICT Received Details",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblepopupICTGrid",
            },
            contentTemplate: 'ICTGridcontent'
        };

        $scope.visiblepopupICTGrid = false;

        $scope.showICTGridInfo = function () {
            $scope.visiblepopupICTGrid = !$scope.visiblepopupICTGrid;
        };
        //#endregion
    }

    $scope.CreateCNDNPopup = function () {
        //#region popup CNDN
        $scope.popupFormCNDN = {
            //formData: $scope.CNDDataModel,
            bindingOptions: {
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
                            colCount: 2,
                            items: [
                                 //{
                                 //    dataField: 'FormType',
                                 //    editorType: 'dxSelectBox',
                                 //    colSpan: 2,
                                 //    label:
                                 //    {
                                 //        text: 'Form Type'
                                 //    },
                                 //    editorOptions:
                                 //    {
                                 //        placeholder: 'Form Type'
                                 //    }
                                 //},
                                  {
                                      dataField: 'SectionType',
                                      editorType: 'dxSelectBox',
                                      colSpan: 2,
                                      label:
                                      {
                                          text: 'Section Type'
                                      },
                                      editorOptions:
                             {
                                 items: CNDNSectionTypeModel,
                                 value: $scope.SectionType
                             }
                                  },

                                {
                                    itemType: 'group',
                                    caption: 'Credit Note/Debit Note Details',
                                    colCount: 2,
                                    colSpan: 2,
                                    items: [

                                {
                                    itemType: 'group',
                                    //caption: 'Original Invoice Details',
                                    colCount: 1,
                                    items: [


                                        {
                                            dataField: 'OriginalCounterPartyGSTINOrUIN',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'GSTIN/Name(original)'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'GSTIN/Name of unregistered supplier'
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
                                                placeholder: 'Debit/Credit No'
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
                                            dataField: 'CDNType',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'Type of Note'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'Type of Note'
                                            }

                                        },




                                    ]
                                },

                                {
                                    itemType: "group",
                                    //caption: 'Revised Invoice Details',
                                    colCount: 1,
                                    items: [
                                        {
                                            dataField: 'CounterPartyGSTINOrUIN',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'GSTIN/Name(Revised)'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'GSTIN/Name of unregistered supplier'
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
                                                placeholder: 'Debit/Credit No'
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
                                                width: '100%'
                                            }
                                        },
                                        {
                                            dataField: 'CDNType',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'Type of Note'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'Type of Note'
                                            }

                                        },

                                    ]
                                },


                                    ]
                                },

                               {
                                   itemType: 'group',
                                   caption: 'Invoice Details',
                                   colCount: 2,
                                   colSpan: 2,
                                   items: [

                                         {
                                             dataField: 'OriginalInvoiceNo',
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
                                           colSpan: 1,
                                           //editorType: "dxTextArea",
                                           label:
                                           {
                                               text: 'Differential Value(plus or minus)'
                                           },
                                           editorOptions:
                                           {
                                               placeholder: 'Differential Value(plus or minus)'
                                           }
                                       },

                                   ]
                               },



                            ]
                        },

                        {
                            itemType: 'group',
                            colCount: 1,
                            items: [
                                {
                                    itemType: "group",
                                    caption: 'Differential Tax Details',
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
                                            //editorType: "dxTextArea",
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
                                            //editorType: "dxTextArea",
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
                                            //editorType: "dxTextArea",
                                            label:
                                            {
                                                text: 'Amount'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'Amount'
                                            }
                                        },
                                    ]
                                },
                                {
                                    itemType: "group",
                                    caption: 'ITC Details',
                                    colCount: 2,
                                    items: [
                                        {
                                            dataField: 'ITCEligibility',
                                            editorType: 'dxSelectBox',
                                            colSpan: 2,
                                            label:
                                            {
                                                text: 'Eligibility of ITC'
                                            },
                                            editorOptions:
                                            {
                                                items: ITCEligibilityModel,
                                                value: ""
                                            },
                                            //editorOptions: { placeholder: 'Eligibility of ITC' }
                                        },


                                        {
                                            dataField: 'TotalITCIGST_Amount',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'Total IGST available as ITC'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'IGST'
                                            }
                                        },
                                        {
                                            dataField: 'MonthITCIGST_Amount',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'IGST ITC availed this month'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'IGST'
                                            }
                                        },
                                        {
                                            dataField: 'TotalITCCGST_Amount',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'Total CGST available as ITC'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'CGST'
                                            }
                                        },
                                         {
                                             dataField: 'MonthITCCGST_Amount',
                                             colSpan: 1,
                                             label:
                                             {
                                                 text: 'CGST ITC availed this month'
                                             },
                                             editorOptions:
                                             {
                                                 placeholder: 'CGST'
                                             }
                                         },

                                        {
                                            dataField: 'TotalITCSGST_Amoun',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'Total SGST available as ITC'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'SGST'
                                            }
                                        },


                                        {
                                            dataField: 'MonthITCSGST_Amount',
                                            colSpan: 1,
                                            label:
                                            {
                                                text: 'SGST ITC availed this month'
                                            },
                                            editorOptions:
                                            {
                                                placeholder: 'SGST'
                                            }
                                        },


                                    ]
                                },

                            ]
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
                                        $scope.AddRecord($scope.currentRow.data, CNDNstore, CNDNDataSource);
                                    }
                                    else {
                                        $scope.UpdateRecord($scope.currentRow.key, $scope.currentRow.data, CNDNstore, CNDNDataSource);
                                    }
                                    $scope.showCNDNInfo();
                                }
                            }
                        }]
                    }, ]

                },

            ]
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

        //#endregion
    }

    $scope.CreateBtoBHistoryPopup = function () {
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
                            template: 'button_acceptrejectB2B'
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
                           bindingOptions: {
                               dataSource: 'B2BHistoryModel'
                           },
                           sorting:
                           {
                               mode: 'none'
                           },
                           width: 'auto',
                           height: 350,
                           columns: [
                                           //{
                                           //    caption: 'Form Type',
                                           //    dataField: 'FormType'
                                           //},

{
    caption: 'Section Type',
    dataField: 'SectionType',
    alignment: 'center',
},
                                           {
                                               caption: 'GSTIN/Name of unregistered supplier',
                                               dataField: 'CounterPartyGSTIN',
                                               width: 150
                                           },
                                           {
                                               caption: 'InvoiceNo',
                                               dataField: 'InvoiceNo'
                                           },
                                           {
                                               caption: 'InvoiceDate',
                                               dataField: 'InvoiceDate',
                                               dataType: 'date'
                                           },
                                           {
                                               caption: 'HSN/SAC',
                                               dataField: 'HSNSACCode'
                                           },
                                           {
                                               caption: 'TaxableValue',
                                               dataField: 'TaxableValue'
                                           },
                                           //{ dataField: 'Shipping Bill/Bill of Export(No)', width: 100 },
                                           //{ dataField: 'Shipping Bill/Bill of Export(Date)', width: 100 },
                                           {
                                               //caption: "Population",
                                               headerCellTemplate: function (container) {
                                                   container.append($("<div style='text-align: right;padding-right: 33%;'>CGST</div>"));
                                               },
                                               columns: [
                                               {
                                                   caption: "Rate",
                                                   dataField: "CGST_Rate",
                                                   format: { type: 'fixedPoint' }

                                               },
                                               {
                                                   caption: "Amount",
                                                   dataField: "CGST_Amount",
                                                   format: { type: 'fixedPoint', precision: 2 }

                                               }]
                                           },
                                           {
                                               //caption: "Population",
                                               headerCellTemplate: function (container) {
                                                   container.append($("<div style='text-align: right;padding-right: 33%;'>SGST</div>"));
                                               },
                                               columns: [
                                               {
                                                   caption: "Rate",
                                                   dataField: "SGST_Rate",
                                                   format: { type: 'fixedPoint' }

                                               },
                                               {
                                                   caption: "Amount",
                                                   dataField: "SGST_Amount",
                                                   format: { type: 'fixedPoint', precision: 2 }

                                               }]
                                           },
                                           {
                                               //caption: "Population",
                                               headerCellTemplate: function (container) {
                                                   container.append($("<div style='text-align: right;padding-right: 33%;'>IGST</div>"));
                                               },
                                               columns: [
                                               {
                                                   caption: "Rate",
                                                   dataField: "IGST_Rate",
                                                   format: { type: 'fixedPoint' }

                                               },
                                               {
                                                   caption: "Amount",
                                                   dataField: "IGST_Amount",
                                                   format: { type: 'fixedPoint', precision: 2 }

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
                                        console.log("onClick");
                                        $scope.showBtoBGridInfo();
                                    }
                                }
                            }]
                        },
                    ]

                },

            ]
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
            //if ($scope.IstoReload)
            //{ $scope.GetResource(); $scope.IstoReload = false;}

        };

        $scope.ShowB2BHistoryLoadingPanal = function () {
            $scope.closeOnOutsideClick = false;
            $scope.showIndicator = true;
            $scope.showPane = false;
            $scope.shading = false;
            $scope.acceptloadOptions = {
                shadingColor: "rgba(0,0,0,0.4)",
                message: "loading...",
                width: 500,
                bindingOptions: {
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
        //#endregion
    }

    $scope.CreateBtoCHistoryPopup = function () {
        //#region GRID POPUP START B to C GRID
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
                            editorType: "dxDataGrid",
                            editorOptions:
                            {
                                dataSource: {},
                                sorting:
                                {
                                    mode: 'none'
                                },
                                width: 'auto',
                                height: 350,
                                columns: [
                                    //{
                                    //    dataField: 'FormType'
                                    //},

    {
        caption: 'Section Type',
        dataField: 'SectionType',
        alignment: 'center',
    },
                                    {
                                        dataField: 'GSTIN/Name of unregistred supplier'
                                    },
                                    {
                                        dataField: 'Bill of Entry/Import/Export(No)',

                                    },
                                    {
                                        dataField: 'Bill of Entry/Import/Export(Date)',

                                    },
                                    {
                                        dataField: 'InvoiceNo'
                                    },
                                    {
                                        dataField: 'InvoiceDate',
                                        dataType: 'date'
                                    },
                                    {
                                        dataField: 'HSN/SAC'
                                    },
                                    {
                                        dataField: 'TaxableValue'
                                    },
                                    //{
                                    //    //caption: "Population",
                                    //    headerCellTemplate: function (container) {
                                    //        container.append($("<div style='text-align: right;padding-right: 33%;'>CGST</div>"));
                                    //    },
                                    //    columns: [{
                                    //        caption: "Rate",
                                    //        dataField: "CGSTRate",
                                    //       format: { type: 'fixedPoint', precision: 2 } 
                                    //        width: 50
                                    //    }, {
                                    //        caption: "Amount",
                                    //        dataField: "CGSTAmount",
                                    //       format: { type: 'fixedPoint', precision: 2 } 
                                    //        width: 75
                                    //    }]
                                    //},
                                    // {
                                    //     //caption: "Population",
                                    //     headerCellTemplate: function (container) {
                                    //         container.append($("<div style='text-align: right;padding-right: 33%;'>SGST</div>"));
                                    //     },
                                    //     columns: [{
                                    //         caption: "Rate",
                                    //         dataField: "SGSTRate",
                                    //        format: { type: 'fixedPoint', precision: 2 } 
                                    //         width: 50
                                    //     }, {
                                    //         caption: "Amount",
                                    //         dataField: "SGSTAmount",
                                    //        format: { type: 'fixedPoint', precision: 2 } 
                                    //         width: 75
                                    //     }]
                                    // },
                                    {
                                        //caption: "Population",
                                        headerCellTemplate: function (container) {
                                            container.append($("<div style='text-align: right;padding-right: 33%;'>IGST</div>"));
                                        },
                                        columns: [
                                        {
                                            caption: "Rate",
                                            dataField: "IGSTRate",
                                            format: { type: 'fixedPoint' }

                                        },
                                        {
                                            caption: "Amount",
                                            dataField: "IGSTAmount",
                                            format: { type: 'fixedPoint' }

                                        }]
                                    },
                                ],
                                showColumnLines: true,
                                showRowLines: true,
                                showBorders: true,
                                rowAlternationEnabled: true,

                            },


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
                                        console.log("onClick");
                                        $scope.showBtoCGridInfo();
                                    }
                                }
                            }]
                        },
                    ]

                },

            ]
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
        //#endregion
    }

    $scope.CreateCNDNHistoryPopup = function () {
        //#region GRID POPUP START CNDN GRID
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
                           bindingOptions: {
                               dataSource: 'CNDNHistoryModel'
                           },
                           sorting:
                           {
                               mode: 'none'
                           },
                           width: 'auto',
                           height: 350,
                           columns: [
                                //{
                                //    caption: "FormType",
                                //    dataField: 'FormType'
                                //},

{
    caption: 'Section Type',
    dataField: 'SectionType',
    alignment: 'center',
},
                                           {
                                               caption: "GSTIN/Name of unregistered supplier",
                                               dataField: 'CounterPartyGSTINOrUIN',
                                               width: 150
                                           },
                                           {
                                               caption: "Type of Note(Debit/Credit)",
                                               dataField: 'CDNType',

                                           },
                                           {
                                               caption: "Debit/Credit No",
                                               dataField: 'CDNNo'
                                           },
                                           {
                                               caption: "Debit/Credit Date",
                                               dataField: 'CDNDate',
                                               dataType: 'date',
                                               format: AppSetting.AppConstant.Dateformat,
                                           },
                                           {
                                               caption: "InvoiceNo",
                                               dataField: 'OriginalInvoiceNo'
                                           },
                                           {
                                               caption: "InvoiceDate",
                                               dataField: 'InvoiceDate',
                                               dataType: 'date',
                                               format: AppSetting.AppConstant.Dateformat,
                                           },
                                           {
                                               caption: "Differential Value(Plus or minus)",
                                               dataField: 'DifferentialValue',
                                               width: 150

                                           },
                                           //{ dataField: 'HSN/SAC' },
                                           //{ dataField: 'TaxableValue' },
                                           //{ dataField: 'Shipping Bill/Bill of Export(No)', width: 100 },
                                           //{ dataField: 'Shipping Bill/Bill of Export(Date)', width: 100 },
                                           {
                                               //caption: "Population",
                                               headerCellTemplate: function (container) {
                                                   container.append($("<div style='text-align: right;padding-right: 33%;'>CGST</div>"));
                                               },
                                               columns: [
                                               {
                                                   caption: "Rate",
                                                   dataField: "CGST_Rate",
                                                   format: { type: 'fixedPoint' }

                                               },
                                               {
                                                   caption: "Amount",
                                                   dataField: "CGST_Amount",
                                                   format: { type: 'fixedPoint', precision: 2 }

                                               }]
                                           },
                                           {
                                               //caption: "Population",
                                               headerCellTemplate: function (container) {
                                                   container.append($("<div style='text-align: right;padding-right: 33%;'>SGST</div>"));
                                               },
                                               columns: [
                                               {
                                                   caption: "Rate",
                                                   dataField: "SGST_Rate",
                                                   format: { type: 'fixedPoint' }

                                               },
                                               {
                                                   caption: "Amount",
                                                   dataField: "SGST_Amount",
                                                   format: { type: 'fixedPoint', precision: 2 }

                                               }]
                                           },
                                           {
                                               //caption: "Population",
                                               headerCellTemplate: function (container) {
                                                   container.append($("<div style='text-align: right;padding-right: 33%;'>IGST</div>"));
                                               },
                                               columns: [
                                               {
                                                   caption: "Rate",
                                                   dataField: "IGST_Rate",
                                                   format: { type: 'fixedPoint' }

                                               },
                                               {
                                                   caption: "Amount",
                                                   dataField: "IGST_Amount",
                                                   format: { type: 'fixedPoint', precision: 2 }

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
                                        console.log("onClick");
                                        $scope.showCNDNGridInfo();
                                    }
                                }
                            }]
                        },
                    ]

                },

            ]
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
        //#endregion
    }

    $scope.CreateUnregisteredTaxPayerHistoryPopup = function () {
        //#region GRID POPUP START UNREGISTERED TAXPAYER GRID
        $scope.popupFormUnregisteredTaxgrid = {
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
                            template: 'button_acceptrejectITCNot'
                        },

                            {
                                itemType: "empty",
                                colCount: 12,
                                colSpan: 2,
                            },
                                   {

                                       template: 'UnregistredTaxpayerGridTemplate'

                                   },
                       $scope.UnregistredTaxpayergridSettings = {
                           bindingOptions: {
                               dataSource: 'UTPHistoryModel'
                           },

                        
                           sorting:
                           {
                               mode: 'none'
                           },
                           width: 'auto',
                           height: 350,
                           columns: [
                           //{
                           //    caption: "Form Type",
                           //    dataField: 'FormType'
                           //},

{
    caption: 'Section Type',
    dataField: 'SectionType',
    alignment: 'center',
},
                                           {
                                               caption: "Description",
                                               dataField: 'Description'
                                           },
                                           {
                                               caption: "HSN/SAC",
                                               dataField: 'HSNSACCode'
                                           },
                                           {
                                               caption: "Unregistered Taxable person not included in table 4 above",
                                               dataField: 'URDealerSuppliesValue',
                                               width: 150

                                           },
                                           {
                                               caption: "Any exempt supply not included in table 4 above",
                                               dataField: 'ExemptedSuppliesValue',
                                               width: 150

                                           },
                                           {
                                               caption: "Any nil rated supply not included in table 4 above",
                                               dataField: 'NilRatedSuppliesValue',
                                               width: 150

                                           },
                                           {
                                               caption: "Non GST supply",
                                               dataField: 'NonGSTSuppliesValue'
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
                                        console.log("onClick");
                                        $scope.showUnregisteredTaxGridInfo();
                                    }
                                }
                            }]
                        },
                    ]

                },

            ]
        };

        $scope.popupUnregisteredTaxGridOption = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "ITC Not Available",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visibleUnregistredTaxpayerGrid",
            },
            contentTemplate: 'GridcontentUnregistredTaxpayer'
        };

        $scope.visibleUnregistredTaxpayerGrid = false;

        $scope.showUnregisteredTaxGridInfo = function () {
            $scope.visibleUnregistredTaxpayerGrid = !$scope.visibleUnregistredTaxpayerGrid;
        };

        //#endregion
    }

    $scope.CreateITCReversalHistoryPopup = function () {
        //#region GRID POPUP START ITCReversal GRID
        $scope.popupITCReversalGrid = {
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
                            template: 'button_acceptrejectITCReversal'
                        },

                            {
                                itemType: "empty",
                                colCount: 12,
                                colSpan: 2,
                            },
                                                    {

                                                        template: 'ITCReversalGridTemplate'

                                                    },
                       $scope.ITCReversalgridSettings = {
                           bindingOptions: {
                               dataSource: 'ITCRevHistoryModel'
                           },
                           dataSource: $scope.ITCRevHistoryModel,
                           sorting:
                           {
                               mode: 'none'
                           },
                           width: 'auto',
                           height: 350,
                           columns: [
                          //{
                          //    caption: "Form Type",
                          //    dataField: 'FormType'
                          //},

{
    caption: 'Section Type',
    dataField: 'SectionType',
    alignment: 'center',
},
                                       {
                                           caption: "Serial No",
                                           dataField: 'SerialNo'
                                       },
                                       {
                                           caption: "Description",
                                           dataField: 'Description'
                                       },
                                       {
                                           caption: "Transaction ID",
                                           dataField: 'GSTISReturnId',
                                           width: 250
                                       },
                                       {
                                           //caption: "Population",
                                           headerCellTemplate: function (container) {
                                               container.append($("<div style='text-align: right;padding-right: 20%;'>IGST</div>"));
                                           },
                                           columns: [
                                           {
                                               caption: "Rate",
                                               dataField: "IGST_Amount",
                                               format: { type: 'fixedPoint' }

                                           },
                                           {
                                               caption: "Tax",
                                               dataField: "IGST_Interest",
                                               format: { type: 'fixedPoint', precision: 2 }

                                           }]
                                       },
                                       {
                                           //caption: "Population",
                                           headerCellTemplate: function (container) {
                                               container.append($("<div style='text-align: right;padding-right: 20%;'>CGST</div>"));
                                           },
                                           columns: [
                                           {
                                               caption: "Rate",
                                               dataField: "CGST_Amount",
                                               format: { type: 'fixedPoint' }

                                           },
                                           {
                                               caption: "Tax",
                                               dataField: "CGST_Interest",
                                               format: { type: 'fixedPoint', precision: 2 }

                                           }]
                                       },
                                       {
                                           //caption: "Population",
                                           headerCellTemplate: function (container) {
                                               container.append($("<div style='text-align: right;padding-right: 20%;'>SGST</div>"));
                                           },
                                           columns: [
                                           {
                                               caption: "Rate",
                                               dataField: "SGST_Amount",
                                               format: { type: 'fixedPoint' }

                                           },
                                           {
                                               caption: "Tax",
                                               dataField: "SGST_Interest",
                                               format: { type: 'fixedPoint', precision: 2 }

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
                                        console.log("onClick");
                                        $scope.showITCReversalGridInfo();
                                    }
                                }
                            }]
                        },
                    ]

                },

            ]
        };

        $scope.popupITCReversalGridOption = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "ITC Reversal",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblepopupITCReversalGrid",
            },
            contentTemplate: 'ITCReversalGridcontent'
        };

        $scope.visiblepopupITCReversalGrid = false;

        $scope.showITCReversalGridInfo = function () {
            $scope.visiblepopupITCReversalGrid = !$scope.visiblepopupITCReversalGrid;
        };
        //#endregion
    }

    $scope.CreateInvoiceTaxPaidHistoryPopup = function () {
        //#region GRID POPUP START Pra Pad INVOICES GRID
        $scope.popupInvoiceTaxPaidGrid = {
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
                            template: 'button_acceptrejectTaxPaid'
                        },

                        {
                            itemType: "empty",
                            colCount: 12,
                            colSpan: 2,
                        },
                        {
                        
                            template: 'InvoiceTaxPaidGridTemplate'
                        
                        },
                       $scope.InvoiceTaxPaidgridSettings = {
                           bindingOptions: {
                               dataSource: 'TaxPaidHistoryModel'
                           },
                           sorting:
                           {
                               mode: 'none'
                           },
                           width: 'auto',
                           height: 350,
                           columns: [
                            //{
                            //    caption: "Form Type",
                            //    dataField: 'FormType'
                            //},

{
    caption: 'Section Type',
    dataField: 'SectionType',
    alignment: 'center',
},
                                   {
                                       caption: "Invoice No",
                                       dataField: 'SupplierInvoiceNo'
                                   },
                                   {
                                       caption: "Invoice Date",
                                       dataField: 'SupplierInvoiceDate',
                                       dataType: 'date',
                                       format: AppSetting.AppConstant.Dateformat,
                                   },
                                   {
                                       caption: "Transaction ID",
                                       dataField: 'TransactionID',
                                   },
                                   {
                                       //caption: "Population",
                                       headerCellTemplate: function (container) {
                                           container.append($("<div style='text-align: right;padding-right: 25%;'>IGST</div>"));
                                       },
                                       columns: [
                                       {
                                           caption: "Rate",
                                           dataField: "CGST_Rate",
                                           format: { type: 'fixedPoint' }

                                       },
                                       {
                                           caption: "Tax",
                                           dataField: "CGST_Tax",
                                           format: { type: 'fixedPoint', precision: 2 }

                                       }]
                                   },
                                   {
                                       //caption: "Population",
                                       headerCellTemplate: function (container) {
                                           container.append($("<div style='text-align: right;padding-right: 25%;'>CGST</div>"));
                                       },
                                       columns: [
                                       {
                                           caption: "Rate",
                                           dataField: "SGST_Rate",
                                           format: { type: 'fixedPoint' }

                                       },
                                       {
                                           caption: "Tax",
                                           dataField: "SGST_Tax",
                                           format: { type: 'fixedPoint', precision: 2 }

                                       }]
                                   },
                                   {
                                       //caption: "Population",
                                       headerCellTemplate: function (container) {
                                           container.append($("<div style='text-align: right;padding-right: 25%;'>SGST</div>"));
                                       },
                                       columns: [
                                       {
                                           caption: "Rate",
                                           dataField: "IGST_Rate",
                                           format: { type: 'fixedPoint' }

                                       },
                                       {
                                           caption: "Tax",
                                           dataField: "IGST_Tax",
                                           format: { type: 'fixedPoint', precision: 2 }

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
                                        console.log("onClick");
                                        $scope.showTaxPaidOnInvoiceGridInfo();
                                    }
                                }
                            }]
                        },
                    ]

                },

            ]
        };

        $scope.popupInvoiceTaxPaidGridOption = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "Invoice details for which tax already paid in earlier tax period under reverse charge",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblepopupTaxPaidOnInvoiceGrid",
            },
            contentTemplate: 'InvoiceTaxPaidGridcontent'
        };

        $scope.visiblepopupTaxPaidOnInvoiceGrid = false;

        $scope.showTaxPaidOnInvoiceGridInfo = function () {
            $scope.visiblepopupTaxPaidOnInvoiceGrid = !$scope.visiblepopupTaxPaidOnInvoiceGrid;
        };
        //#endregion
    }

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
                                $scope.RefreshGridData();
                            });
                        }
                        else
                            DevExpress.ui.dialog.alert(response.ErrorMessage, 'Alert');
                    },
                    function (response) {
                        $scope.loadingDataImportVisible = false;
                        DevExpress.ui.dialog.alert(response, 'Alert');
                    });
        }
        $scope.RefreshGridData = function () {
            $scope.visibleImportPopup = false;
            $scope.GetResource();
        }
        $scope.UploadInterfaceFile = function () {
            var file = $scope.FileInterface;
            ServiceHelper.UploadFile(file,
                    function (response) {
                        if (response.IsRequestSuccessful == true)
                            DevExpress.ui.dialog.alert("File uploaded successfully", 'Alert');
                        else
                            DevExpress.ui.dialog.alert(response.ErrorMessage, 'Alert');
                    },
                    function (response) {
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
        $scope.PopUpImportData = function () {
            $scope.visibleImportPopup = !$scope.visibleImportPopup;

        };
        $scope.ShowDataImportLoadingPanal = function () {
            $scope.closeOnOutsideClick = false;
            $scope.showIndicator = true;
            $scope.showPane = false;
            $scope.shading = false;
            $scope.dataImportloadOptions = {
                shadingColor: "rgba(0,0,0,0.4)",
                message: "loading...",
                width: 500,
                bindingOptions: {
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
            bindingOptions: {
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
                bindingOptions: {
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
            bindingOptions: {
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
                bindingOptions: {
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

    $scope.CreateGSTR2SummaryPopUp = function () {
        //#region POPUP GSTR1 SUMMARY
        $scope.popupFormGSTR2Summary = {
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

            //    {
            //    dataField: 'gstin',
            //    colSpan: 1,
            //    editorOptions: {
            //        disabled: true
            //    },
            //    label:
            //    {
            //        text: 'GSTIN of the taxpayer'
            //    },
            //},
            //{
            //    dataField: 'ret_pd',
            //    colSpan: 1,
            //    label:
            //   {
            //       text: 'Return Period'
            //   },
            //    editorOptions: {
            //        disabled: true
            //    },
            //},
            //{
            //    dataField: 'checksum',
            //    colSpan: 1,
            //    label:
            //  {
            //      text: 'Invoice Check sum value'
            //  },
            //    editorOptions: {
            //        disabled: true
            //    },
            //},
            //{
            //    dataField: 'ttl_inv',
            //    colSpan: 1,
            //    label:
            // {
            //     text: 'Total invoice value'
            // },
            //    editorOptions: {
            //        disabled: true
            //    },
            //},
            //{
            //    dataField: 'ttl_tax',
            //    colSpan: 1,
            //    label:
            //   {
            //       text: 'Total Taxible Value'
            //   },
            //    editorOptions: {
            //        disabled: true
            //    },
            //},
            //{
            //    dataField: 'ttl_igst',
            //    colSpan: 1,
            //    label:
            //  {
            //      text: 'Total IGST'
            //  },
            //    editorOptions: {
            //        disabled: true
            //    },

            //},
            //{
            //    dataField: 'ttl_sgst',
            //    colSpan: 1,
            //    label:
            //  {
            //      text: 'Total CGST'
            //  },
            //    editorOptions: {
            //        disabled: true
            //    },
            //},
            //{
            //    dataField: 'ttl_cgst',
            //    colSpan: 1,
            //    label:
            // {
            //     text: 'Total SGST'
            // },
            //    editorOptions: {
            //        disabled: true
            //    },
            //},
            {
                itemType: "group",
                caption: "GSTR2 Summary",
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
                                                height: 250,
                                                //width: 270,
                                                dataSource: $scope.SummaryDetailsModel,
                                                columns: [
                                                    { dataField: 'section_name', caption: 'Return Section' },
                                                    { dataField: 'checksum', caption: 'Invoice Check sum value' },
                                                    { dataField: 'ttl_inv', caption: 'Total invoice value' },
                                                    { dataField: 'ttl_tax', caption: 'Total Taxible Value' },
                                                    { dataField: 'ttl_igst', caption: 'Total IGST' },
                                                    { dataField: 'ttl_cgst', caption: 'Total CGST' },
                                                    { dataField: 'ttl_sgst', caption: 'Total SGST' },
                                                ],
                                                //columnAutoWidth: true,
                                                wordWrapEnabled: true,
                                                showColumnLines: false,
                                                showRowLines: true,
                                                showBorders: true,
                                                rowAlternationEnabled: true,

                                            },


                                        },

                            ],
                        },


                ]

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
                                                height: 250,
                                                //width: 270,
                                                dataSource: $scope.CounterPartyModel,
                                                columns: [
                                                    { dataField: 'ctin', caption: 'TIN of Supplier' },
                                                    { dataField: 'checksum', caption: 'Invoice Check sum value' },
                                                    { dataField: 'ttl_inv', caption: 'Total invoice value' },
                                                    { dataField: 'ttl_tax', caption: 'Total Taxible Value' },
                                                    { dataField: 'ttl_igst', caption: 'Total IGST' },
                                                    { dataField: 'ttl_cgst', caption: 'Total CGST' },
                                                    { dataField: 'ttl_sgst', caption: 'Total SGST' },
                                                ],
                                                //columnAutoWidth: true,
                                                wordWrapEnabled: true,
                                                showColumnLines: false,
                                                showRowLines: true,
                                                showBorders: true,
                                                rowAlternationEnabled: true,

                                            },


                                        },

                            ],
                        },


                ]

            },
            {
                colSpan: 4,
                template: 'ESign'
            }

            ]
        };

        $scope.popupGSTR2Summary = {
            width: 'auto',
            height: 'auto',
            contentTemplate: "info",
            scrollingEnabled: true,
            showTitle: true,
            title: "GSTR2 Summary",
            dragEnabled: true,
            closeOnOutsideClick: false,
            bindingOptions:
            {
                visible: "visiblePopupGSTR2Summary",
            },
            contentTemplate: 'GSTR2SummaryContent'
        };

        $scope.visiblePopupGSTR2Summary = false;

        $scope.showGSTR2SummaryInfo = function () {
            //console.log($scope.visiblePopupGSTR2Summary);
            $scope.visiblePopupGSTR2Summary = !$scope.visiblePopupGSTR2Summary;
        };
        //#endregion 
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

    //#region Create Init start
    $scope.Init = function () {
        $scope.CreateForm();
        $scope.CreateB2BPopup();
        $scope.CreateB2CPopup();
        $scope.CreateUnregistredTaxpayerPopup();
        $scope.CreateISDCreditPopup();
        $scope.CreateICTReceivedPopup();
        $scope.CreateTaxPaidOnInvoicePopup();
        $scope.CreateITCRevasalPopup();
        $scope.CreateTaxPaidOnAdvancePopup();
        $scope.CreateISDCreditHistoryPopup();
        $scope.CreateTDSCreditPopup();
        $scope.CreateTDSCreditHistoryPopup();
        $scope.CreateTCSCreditPopup();
        $scope.CreateTCSCreditHistoryPopup();
        $scope.CreateICTHistoryPopup();
        $scope.CreateCNDNPopup();
        $scope.CreateBtoBHistoryPopup();
        $scope.CreateBtoCHistoryPopup();
        $scope.CreateCNDNHistoryPopup();
        $scope.CreateUnregisteredTaxPayerHistoryPopup();
        $scope.CreateITCReversalHistoryPopup();
        $scope.CreateInvoiceTaxPaidHistoryPopup();
        $scope.CreateImportPopup();
        $scope.CreateGSTR2SummaryPopUp();
        $scope.CreateSubmitGSTNPopup();
        $scope.CreateReceiveFromGSTNPopup();
        $scope.CreateESigningPopup();
        $scope.formOptions = $scope.viewmodelGSTR2;
        $timeout($scope.SetToolTip, 1000);
    }
    //#endregion

    $scope.GetResource();
    $scope.SetToolTip = function () {
        var divs = $('div[role="tablist"]')[0].childNodes[0];
        $.each(divs.childNodes, function (i, item) {
            $scope.SetToolTipValues(i, item);
        });
    }
    $scope.SetToolTipValues = function (i, Control) {
        var tip = $("#tooltip" + i);
        if (tip != null) {
            var tooltipSimple = $(tip).dxTooltip({
                target: Control,
                position: "top",
                contentTemplate: function (data) {
                    data.html(AppCommon.GSTR2TabTip[i]);
                }
            }).dxTooltip("instance");
            $(Control).unbind().hover(function () {
                tooltipSimple.show()
            }, function () {
                tooltipSimple.hide()
            });
        }
    }

    //Functional working start here
    $scope.SubmitDataToGSTN = function () {
        $scope.loadingSubmitGSTNVisible = !$scope.loadingSubmitGSTNVisible;
        var uData = new AppCommon.Class.EntityUpdateRequest();
        uData.EntityType = AppCommon.EntityType.GST_IS_Header;
        uData.EntityId = $scope.CurrentEntity.EntityId;
        uData.PerformAction = "RETSAVE";
        ServiceHelper.UpdateEntity(uData,
            function (response) {
                if (response.IsUpdateSuccessful) {
                    $scope.ShowSubmitGSTRMsg = true;
                    //DevExpress.ui.notify("Successfull", "success", 3000);
                } else {
                    //$scope.ShowSubmitGSTRMsg = true;
                    DevExpress.ui.notify(response.ErrorMessage, "error", 3000);
                }
                $scope.loadingSubmitGSTNVisible = false;
                $scope.SubmitToGSTNButtonDisable = true;
            },
            function (response) {
                DevExpress.ui.notify("Canceled", "error", 3000);
                $scope.loadingSubmitGSTNVisible = false;
            });
    };
    $scope.ReturnFileToGSTN = function () {
        $scope.visiblePopupGSTR2Summary = true;
        //var uData = new AppCommon.Class.EntityUpdateRequest();
        //uData.EntityType = AppCommon.EntityType.GST_IS_Header;
        //uData.EntityId = $scope.CurrentEntity.EntityId;
        //uData.PerformAction = "RETSUM";
        //ServiceHelper.UpdateEntity(uData,
        //    function (response) {
        //        if (response.IsUpdateSuccessful) {
        //            $scope.CreateReturnFileModle(response.Entity.ActionResponse);
        //            $scope.CreateGSTR2SummaryPopUp();
        //            $scope.visiblePopupGSTR2Summary = true;
        //        } else {
        //            DevExpress.ui.notify(response.ErrorMessage, "error", 3000);
        //        }
        //    },
        //    function (response) {
        //        DevExpress.ui.notify("Canceled", "error", 3000);
        //    });

    }
    $scope.CreateReturnFileModle = function (response) {
        var Sum_TotalInvValue = 0, Sum_TotalTaxValue = 0, Sum_CGSTTotal = 0, Sum_SGSTTotal = 0, Sum_IGSTTotal = 0, Sum_GSTIN = '', Sum_ReturnPeriod = '';
        var oData = new $scope.Classes.GSTR2Summary(response.gstr1summary[0]);
        $scope.Sum_TotalInvValue = oData.ttl_inv;
        $scope.Sum_TotalTaxValue = oData.ttl_tax;
        $scope.Sum_CGSTTotal = oData.ttl_cgst;
        $scope.Sum_SGSTTotal = oData.ttl_sgst;
        $scope.Sum_IGSTTotal = oData.ttl_igst;
        $scope.Sum_GSTIN = oData.gstin;
        $scope.Sum_ReturnPeriod = oData.ret_pd;
        $scope.GSTRSummaryModel = oData;
        var oData1 = new $scope.Classes.GSTR2SummaryDetails(response.gstr1summary[0].section_Summary[0]);
        $scope.SummaryDetailsModel.push(oData1);
        var oData2 = new $scope.Classes.CounterParty(response.gstr1summary[0].section_Summary[0].counter_party_summary[0]);
        $scope.CounterPartyModel.push(oData2);
    }
    $scope.SubmitFileToGSTN = function () {
        var uData = new AppCommon.Class.EntityUpdateRequest();
        uData.EntityType = AppCommon.EntityType.GST_IS_Header;
        uData.EntityId = $scope.CurrentEntity.EntityId;
        uData.PerformAction = "RETSUBMIT";
        var FileData = {
            fileData: [{
                gstr1summary: $scope.ReturnFileGSTNData.gstr1summary,
                signatureType: "DSC", signature: "abcde", signatureId: "AJP4W321"
            }]
        };
        uData.Data = FileData;
        ServiceHelper.UpdateEntity(uData,
            function (response) {
                if (response.IsUpdateSuccessful) {
                    DevExpress.ui.notify("Save Successfully , Acknowledgement no = " + response.Entity.ActionResponse.ack_num, "success", 3000);
                } else {
                    DevExpress.ui.notify(response.ErrorMessage, "error", 3000);
                }
            },
            function (response) {
                DevExpress.ui.notify(response, "error", 3000);
            });
    }
    $scope.RecivedDataFromGSTN = function () {
        $scope.loadingReceivedFromGSTNVisible = !$scope.loadingReceivedFromGSTNVisible;
        var uData = new AppCommon.Class.EntityUpdateRequest();
        uData.EntityType = AppCommon.EntityType.GST_IS_Header;
        uData.EntityId = $scope.CurrentEntity.EntityId;
        uData.PerformAction = "RETGSTR2";
        ServiceHelper.UpdateEntity(uData,
            function (response) {
                if (response.IsUpdateSuccessful) {
                    $scope.ShowReceivFromGSTRMsg = true;
                    //DevExpress.ui.notify("Successfull", "success", 3000);
                } else {
                    DevExpress.ui.notify("Error", "error", 3000);
                }
                $scope.loadingReceivedFromGSTNVisible = false;
                $scope.ReceiveFromGSTNButtonDisable = true;
            },
            function (response) {
                DevExpress.ui.notify("Error", "error", 3000);
                $scope.loadingReceivedFromGSTNVisible = false;
            });
    };
    //Functional End
    $scope.RejectClick = function () {
        $scope.loadingB2BHistoryVisible = true;
        var uData = new AppCommon.Class.EntityUpdateRequest();
        uData.EntityType = AppCommon.EntityType.GST_IS_Header;
        uData.EntityId = $scope.CurrentEntity.EntityId;
        uData.PerformAction = "REJECTED";
        var data = {
            EntityRow: [{
                Id: $scope.CurrentOpenHistory.Id,
                EntityTypeName: $scope.CurrentOpenHistory.LineType
            }]
        };
        uData.Data = data;
        ServiceHelper.UpdateEntity(uData,
            function (response) {
                $scope.loadingB2BHistoryVisible = false;
                if (response.IsUpdateSuccessful) {
                    $scope.DisableAcceptReject = true;
                    $scope.IstoReload = true;
                }
            },
            function (response) {
                $scope.loadingB2BHistoryVisible = false;
                DevExpress.ui.dialog.alert(response);
            });
    }

    $scope.AcceptClick = function () {
        $scope.loadingB2BHistoryVisible = true;
        var uData = new AppCommon.Class.EntityUpdateRequest();
        uData.EntityType = AppCommon.EntityType.GST_IS_Header;
        uData.EntityId = $scope.CurrentEntity.EntityId;
        uData.PerformAction = "ACCEPTED";
        var data = {
            EntityRow: [{
                Id: $scope.CurrentOpenHistory.Id,
                EntityTypeName: $scope.CurrentOpenHistory.LineType
            }]
        };
        uData.Data = data;
        ServiceHelper.UpdateEntity(uData,
            function (response) {
                $scope.loadingB2BHistoryVisible = false;
                if (response.IsUpdateSuccessful) {
                    $scope.DisableAcceptReject = true;
                    $scope.IstoReload = true;
                }
            },
            function (response) {
                $scope.loadingB2BHistoryVisible = false;
                DevExpress.ui.dialog.alert(response);
            });
    }
});

exGSP.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.SelectedInterfaceFileName = scope.SelectedImportFileName = '';
                if (element[0].id == "Interface")
                    scope.SelectedInterfaceFileName = element[0].files[0].name;
                else
                    scope.SelectedImportFileName = element[0].files[0].name;
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);