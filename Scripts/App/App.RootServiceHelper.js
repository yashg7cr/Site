exGSP = window.exGSP || {};

exGSP.factory('RootServiceHelper', ['$http', function ($http) {
    var rootService = {};
    rootService.CheckBulkEntityStatus = function (requestData, successCallBack, failCallBack) {
        var WEB_API_CURRENT_URL = AppSetting.RootServiceConfig.WEB_API_BULKENTITY_CHECK;
        return rootClass.ServiceCallAsync(requestData, successCallBack, failCallBack, WEB_API_CURRENT_URL, true);
    },
    rootClass = {
        ServiceCallAsync : function (requestData, successCallBack, failCallBack, WEB_API_CURRENT_URL, isLogin) {

            request = rootClass.BeginRequest(requestData);
            request.url += WEB_API_CURRENT_URL;
            $http(request)
            .success(successCallBack)
            .error(failCallBack);
        },
        BeginRequest: function (rdata) {
            //you can use $localStorage.$reset(); it will delete all your data from localStorage
            rdata.SubscriptionId = AppCommon.Common.GetStorage('SubscriptionId');
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
    }
    return rootService;
}]);