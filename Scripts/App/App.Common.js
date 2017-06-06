var AppCommon = AppCommon || {};

AppCommon.Common = {
    GetGUID: function (name) {
        return new DevExpress.data.Guid();
    },

    SetStorage: function (key, value) {
        localStorage.setItem(key, value);
    },

    GetStorage: function (key) {
        return localStorage.getItem(key) || '';
    },

    RemoveStorage: function (key) {
        return localStorage.removeItem(key);
    }
};
AppCommon.StoreData = new Array();
AppCommon.DataStore = {
    SetData: function (key, value) {
        if (typeof (value) != 'undefined') {
            AppCommon.DataStore.RemoveItem(key);
            AppCommon.StoreData[key] = value;
        }
    },

    GetData: function (key) {
        return AppCommon.StoreData[key];
    },
    HasItem: function (key) {
        return typeof (AppCommon.StoreData[key]) != 'undefined';
    },
    RemoveItem: function (key) {
        if (typeof (AppCommon.StoreData[key]) != 'undefined') {
            delete AppCommon.StoreData[key];
        }
    },
    Clear: function () {
        AppCommon.StoreData = new Array();
    }
};


AppCommon.GetMonths = ["", "February", "March", "April", "May", "June ", "July", "August", "September", "October", "November", "December", "January"];

AppCommon.GetSourceIdentifier = ["", "Excel", "Text", "Manual", "Interfaced", "GSTR1A", "GSTR2A "];

AppCommon.GetStatusIdentifier = ["", "Uploaded", "Submitted", "Matched", "Mismatched", "Additional", "Reconciled", "Filed"];

AppCommon.GetLogStatus = ["", "Pending", "Processed", "Error", ];

AppCommon.GetStatusButton = ["", "btn btn-warning", "btn btn-warning", "btn btn-success", "btn btn-danger", "btn btn-danger", "btn btn-success", "btn btn-success", "btn btn-success", "btn btn-success"];

AppCommon.GSTR1TabTip = ["B2B", "B2C", "Credit Note/Debit Note Details", "Details of tax already paid (on advance receipt/ on account of time of supply) of invoices", "Invoice Summary of all the invoices uploaded in B2B/B2C", "Details of Nil Rated/Exempted/Non GST Supplies"];
AppCommon.GSTR2TabTip = ["B2B", "Credit note/Debit Note", "Supplies from composition and Other unregistered taxable person", "ISD Credit Received", "TDS Credit Received", "TCS Credit Received", "ITC Received on an invoice on which partial credit availed earlier", "Invoice details for which tax already paid in earlier tax period under reverse charge", "ITC Reversal"];
AppCommon.EntityType = {
    PickListValues: 1100,
    GST_OS_Header: 4603,
    GST_IS_Header: 4613,
    UserMaster: 801,
    RoleMaster: 802,
    GST_EntityReturnHistory: 1499,
    GST_LOG: 5,
    SystemSchedule: 704,
    AgentMaster: 700,
    AgentHistory: 703,
    MappingMaster: 187
},
AppCommon.Constant = {
    Mismatched: 4,
    Additional: 5
},
AppCommon.Views = {
    Empty: "",
    PickListMasterViewId: "E361346F-FF7C-42F0-B63C-202E85913222",
}
AppCommon.Class = {
    EntityRetreiveRequest: function () {
        return {
            SubscriptionId: '',
            EntityType: '',
            EntityId: ''
        };
    },
    EntityCreateRequest: function () {
        return {
            EntityType: '',
            EntityTypeName: '',
            EntityId: '',
            SubscriptionId: '',
            NewEntityTrackingId: '',
            Data: ''
        };
    },
    EntityQueryRequest: function () {
        return {
            SubscriptionId: "",
            EntityType: "",
            ViewId: "",
            StartIndex: "",
            Count: "",
            LoadAllRelations: "",
            FileterConditions: [{
                PropertyName: "",
                PropertyValue: "",
                PropertyDataType: "",
                Filter: ""
            }],
            LoadRelations: [{
                RelationName: ""
            }]
        };
    },
    EntityUpdateRequest: function () {
        return {
            SubscriptionId: "",
            EntityType: "",
            EntityTypeName: "",
            EntityId: "",
            NewEntityTrackingId: "",
            Data: "",
            PerformAction: ""
        };
    },
    CheckStatusRequest: function () {
        return {
            ReferenceToken: "",
            SubscriptionId: "",
            EntityType: ""
        };

    }
}
