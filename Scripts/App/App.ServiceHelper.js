exGSP = window.exGSP || {};
//App.factory('ServiceHelper', ['$http', '$localStorage', function ($http, $localStorage) {
exGSP.factory('ServiceHelper', ['$http', function ($http) {
    var factory = {};
    factory.SignIn = function ($scope, successCallBack, failCallBack) {
        requestData = { UniqueName: $scope.Login.UserName, Password: $scope.Login.Password };
        var WEB_API_CURRENT_URL = AppSetting.ServiceConfig.WEB_API_LOGIN_URL;
        return ServiceCallAsync(requestData, successCallBack, failCallBack, WEB_API_CURRENT_URL, true);
    },
   factory.CreateEntity = function (requestData, successCallBack, failCallBack) {
       var WEB_API_CURRENT_URL = AppSetting.ServiceConfig.WEB_API_CREATEENTITY_URL;
       return ServiceCallAsync(requestData, successCallBack, failCallBack, WEB_API_CURRENT_URL);
   },
    factory.RetereiveEntity = function (requestData, successCallBack, failCallBack) {
        var WEB_API_CURRENT_URL = AppSetting.ServiceConfig.WEB_API_RETEREIVEENTITY_URL;
        return ServiceCallAsync(requestData, successCallBack, failCallBack, WEB_API_CURRENT_URL);
    },
    factory.UpdateEntity = function (requestData, successCallBack, failCallBack) {
        var WEB_API_CURRENT_URL = AppSetting.ServiceConfig.WEB_API_UPDATEENTITY_URL;
        return ServiceCallAsync(requestData, successCallBack, failCallBack, WEB_API_CURRENT_URL);
    },
    factory.QueryEntity = function (requestData, successCallBack, failCallBack) {
        var WEB_API_CURRENT_URL = AppSetting.ServiceConfig.WEB_API_QUERYENTITY_URL;
        return ServiceCallAsync(requestData, successCallBack, failCallBack, WEB_API_CURRENT_URL);
    },
    factory.GeneralEntity = function (requestData,endpoint, successCallBack, failCallBack) {
        var WEB_API_CURRENT_URL = endpoint;
        return ServiceCallAsync(requestData, successCallBack, failCallBack, WEB_API_CURRENT_URL);
    },
    factory.UploadFile = function (requestFile, successCallBack, failCallBack) {
        var fd = new FormData();
        fd.append('file', requestFile);
        request = {
            method: 'POST',
            url: AppSetting.LoginConfig.BaseUrl + AppSetting.ServiceConfig.WEB_API_ATTACHED_URL,
            data: fd,
            headers: {
                'AuthenticationToken': AppCommon.Common.GetStorage('AuthenticationToken'),
                'Content-Type': undefined,
            }
        }
        $http(request)
       .success(successCallBack)
       .error(failCallBack);
    },
    factory.ReadFile = function (requestFile, successCallBack, failCallBack) {
        request = {
            method: 'GET',
            url: 'Data/JsonData.txt',
            data: '',
            headers: {
                "Content-Type": "application/json"
            }
        }
        $http(request)
       .success(successCallBack)
       .error(failCallBack);
    },
    ServiceCallAsync = function (requestData, successCallBack, failCallBack, WEB_API_CURRENT_URL, isLogin) {
        isLogin = isLogin || false;
        if (isLogin)
            request = BeginLoginRequest(requestData);
        else
            request = BeginRequest(requestData);
        request.url += WEB_API_CURRENT_URL;
        $http(request)
        .success(successCallBack)
         .error(failCallBack);
    },
   BeginLoginRequest = function (rdata) {
       //you can use $localStorage.$reset(); it will delete all your data from localStorage
       rdata.RequestId = AppCommon.Common.GetGUID();
       rdata.RequestClientDateTime = new Date();
       return request = {
           method: 'POST',
           url: AppSetting.LoginConfig.BaseUrl,
           data: angular.toJson(rdata),
           headers: {
               'Content-Type': AppSetting.ServiceConfig.WEB_API_MEDIA_TYPE
           }
       }
   }
   ,
     BeginRequest = function (rdata) {
         //you can use $localStorage.$reset(); it will delete all your data from localStorage
         rdata.SubscriptionId = AppCommon.Common.GetStorage('SubscriptionId');
         if (typeof(rdata.LoadAllRelations)=="string")
             rdata.LoadAllRelations = false;
         rdata.RequestId = AppCommon.Common.GetGUID();
         rdata.RequestClientDateTime = new Date();
         return request = {
             method: 'POST',
             url: AppSetting.LoginConfig.BaseUrl,
             data: angular.toJson(rdata),
             headers: {
                 'AuthenticationToken': AppCommon.Common.GetStorage('AuthenticationToken'),
                 'Content-Type': AppSetting.ServiceConfig.WEB_API_MEDIA_TYPE
             }
         }
     }
    return factory;
}]);
/*=================Helpers Methods===============*/