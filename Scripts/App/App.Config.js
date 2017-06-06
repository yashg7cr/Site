
var AppSetting = AppSetting || {};

AppSetting.LoginConfig = {
    //Deployed
    BaseUrl: "http://gsptst.centralindia.cloudapp.azure.com/",

    //Debug
    //BaseUrl: "http://localhost:54444/",
    //

    LoginAutomatically: false,
    LoginIdentityUniqueName: "shatrusingh",
    LoginIdentityPassword:"1234",

    validateName: function (name) {
       
    }
};
AppSetting.ServiceConfig = {
    WEB_API_MEDIA_TYPE : "application/json",
    WEB_API_LOGIN_URL: "api/authentication/Login",
    WEB_API_CREATEENTITY_URL: "api/entity/create",
    WEB_API_RETEREIVEENTITY_URL: "api/entity/retreive",
    WEB_API_UPDATEENTITY_URL: "api/entity/update",
    WEB_API_QUERYENTITY_URL: "api/entity/query",
    WEB_API_ATTACHED_URL: "api/BulkEntity/attach",
    WEB_API_ESIGN_URL: "/api/Esign/UploadDocument",

    validateName: function (name) {

    }
};
AppSetting.RootServiceConfig = {
    WEB_API_BULKENTITY_CHECK: "api/BulkEntity/Check",

    validateName: function (name) {

    }
};
AppSetting.AppConstant = {
    PageSize: 10,
    Dateformat: 'dd/MM/yyyy',
    Timeformat: 'longTime'
};

