
var exGSP = angular.module("ExGSP", ["ngRoute", "dx", "ui.bootstrap", "signature"]);
// Application Main Controller

exGSP.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "Dashboard/Dashboard1.html",
        controller: 'CtrDashboard'
    })
    .when("/RegType", {
        templateUrl: "Registration/RegType.html"
    })
    .when("/RegForm20A", {
        templateUrl: "Registration/RegForm20A.html",
        controller: 'CtrForm20A'
    })
    .when("/RegForm20B", {
        templateUrl: "Registration/RegForm20B.html",
        controller: 'CtrRegForm20B'
    })
     .when("/RegForm20C", {
         templateUrl: "Registration/RegForm20C.html",
         controller: 'CtrForm20C'
     })
    .when("/RegForm20D", {
        templateUrl: "Registration/RegForm20D.html",
        controller: 'CtrForm20D'
    })
     .when("/RegForm7A", {
         templateUrl: "Registration/RegForm7A.html",
         controller: 'CtrRegForm7A'
     })
    .when("/RegForm7B", {
        templateUrl: "Registration/RegForm7B.html",
        controller: 'CtrRegForm7B'
    })
    .when("/RegForm7C", {
        templateUrl: "Registration/RegForm7C.html",
        controller: 'CtrRegForm7C'
    })
    .when("/RegForm7D", {
        templateUrl: "Registration/RegForm7D.html",
        controller: 'CtrRegForm7D'
    })
    .when("/RegForm1A", {
        templateUrl: "Registration/RegForm1A.html",
        controller: 'RegForm1A'
    })
    .when("/RegForm1B", {
        templateUrl: "Registration/RegForm1B.html",
        controller: 'RegForm1B'
    })
    .when("/RegForm1C", {
        templateUrl: "Registration/RegForm1C.html",
        controller: 'RegForm1C'
    })
    .when("/RegForm1D", {
        templateUrl: "Registration/RegForm1D.html",
        controller: 'RegForm1D'
    })
    .when("/RegForm1E", {
        templateUrl: "Registration/RegForm1E.html",
        controller: 'RegForm1E'
    })
    .when("/RegForm1F", {
        templateUrl: "Registration/RegForm1F.html",
        controller: 'RegForm1F'
    })
    .when("/RegForm1G", {
        templateUrl: "Registration/RegForm1G.html",
        controller: 'RegForm1G'
    }).
    when("/RegForm9A", {
        templateUrl: "Registration/RegForm9A.html",
        controller: 'CtrRegForm9A'
    })
    .when("/RegForm9B", {
        templateUrl: "Registration/RegForm9B.html",
        controller: 'CtrRegForm9B'
    })
    .when("/RegForm9C", {
        templateUrl: "Registration/RegForm9C.html",
        controller: 'CtrRegForm9B'
    })
    .when("/RegForm10A", {
        templateUrl: "Registration/RegForm10A.html",
        controller: 'CtrRegForm10A'
    })
    .when("/RegForm10B", {
        templateUrl: "Registration/RegForm10B.html",
        controller: 'CtrRegForm10B'
    })
    .when("/RegForm10C", {
        templateUrl: "Registration/RegForm10C.html",
        controller: 'CtrRegForm10C'
    })
    .when("/RegForm10D", {
        templateUrl: "Registration/RegForm10D.html",
        controller: 'CtrRegForm10D'
    })
    .when("/GSTR1", {
        templateUrl: "Returns/GSTR1.html",
        controller: 'CtrGSTR1'
    })
    .when("/GSTR2", {
        templateUrl: "Returns/GSTR2.html",
        controller: 'CtrGSTR2'
    })
    .when("/ReturnGSTR1A", {
        templateUrl: "Returns/ReturnGSTR1A.html",
        controller: 'CtrReturnGSTR1A'
    })
    .when("/ReturnGSTR1B", {
        templateUrl: "Returns/ReturnGSTR1B.html",
        controller: 'CtrReturnGSTR1B'
    })
    .when("/ReturnGSTR1C", {
        templateUrl: "Returns/ReturnGSTR1C.html",
        controller: 'CtrReturnGSTR1C'
    })
    .when("/ReturnGSTR1D", {
        templateUrl: "Returns/ReturnGSTR1D.html",
        controller: 'CtrReturnGSTR1D'
    })
     .when("/ReturnGSTR1E", {
         templateUrl: "Returns/ReturnGSTR1E.html",
         controller: 'CtrReturnGSTR1E'
     })
    .when("/AllUser", {
        templateUrl: "Admin/AllUser.html",
        controller: 'CtrAllUser'
    })
    .when("/AllTask", {
        templateUrl: "Admin/AllTask.html",
        controller: 'CtrAllTask'
    })
    .when("/AllRole", {
        templateUrl: "Admin/AllRole.html",
        controller: 'CtrAllRole'
    })
        .when("/Log", {
            templateUrl: "Admin/Log.html",
            controller: 'CtrLog'
        })
        .when("/MyAccount", {
            templateUrl: "Admin/MyAccount.html",
            controller: 'CtrMyAccount'
        })
        .when("/GSTR2Populate", {
            templateUrl: "Admin/GSTR2Populate.html",
            controller: 'CtrGSTR2Populate'
        })
         .when("/UserProfile", {
             templateUrl: "Admin/UserProfile.html",
             controller: 'CtrUserProfile'
         })
    .when("/Dashboard", {
        templateUrl: "Dashboard/Dashboard1.html",
        controller: 'CtrDashboard'
    })
     .when("/GSTRSelect", {
         templateUrl: "Returns/GSTRSelection.html",
         controller: 'CtrGSTRSelection'
     })
    .when("/SystemSchedules", {
        templateUrl: "Admin/SystemSchedules.html",
        controller: 'CtrSystemSchedules'
    })
    .when("/SystemAgent", {
        templateUrl: "Admin/SystemAgent.html",
        controller: 'CtrSystemAgent'
    })
    .when("/AllExportMappings", {
        templateUrl: "Admin/AllExportMappings.html",
        controller: 'CtrAllExportMappings'
    })
     .when("/AgentMonitors", {
         templateUrl: "Admin/AgentMonitors.html",
         controller: 'CtrAgentMonitors'
     });
});

exGSP.factory('uiHelpers', function () {
    return {

        // Handles page loader functionality
        uiLoader: function (mode) {
            var lBody = jQuery('body');
            var lpageLoader = jQuery('#page-loader');

            if (mode === 'show') {
                if (lpageLoader.length) {
                    lpageLoader.fadeIn(250);
                } else {
                    lBody.prepend('<div id="page-loader"></div>');
                }
            } else if (mode === 'hide') {
                if (lpageLoader.length) {
                    lpageLoader.fadeOut(250);
                }
            }
        },
        uiHandleHeader: function () {
            var lPage = jQuery('#page-container');

            if (lPage.hasClass('header-navbar-fixed') && lPage.hasClass('header-navbar-transparent')) {
                jQuery(window).on('scroll', function () {
                    if (jQuery(this).scrollTop() > 20) {
                        lPage.addClass('header-navbar-scroll');
                    } else {
                        lPage.removeClass('header-navbar-scroll');
                    }
                });
            }
        },
        uiHandleScroll: function (mode) {
            var windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var lPage = jQuery('#page-container');
            var lSidebar = jQuery('#sidebar');
            var lSidebarScroll = jQuery('#sidebar-scroll');
            var lSideOverlay = jQuery('#side-overlay');
            var lSideOverlayScroll = jQuery('#side-overlay-scroll');

            // Init scrolling
            if (mode === 'init') {
                // Init scrolling only if required the first time
                uiHandleScroll();
            } else {
                // If screen width is greater than 991 pixels and .side-scroll is added to #page-container
                if (windowW > 991 && lPage.hasClass('side-scroll') && (lSidebar.length || lSideOverlay.length)) {
                    // If sidebar exists
                    if (lSidebar.length) {
                        // Turn sidebar's scroll lock off (slimScroll will take care of it)
                        jQuery(lSidebar).scrollLock('disable');

                        // If sidebar scrolling does not exist init it..
                        if (lSidebarScroll.length && (!lSidebarScroll.parent('.slimScrollDiv').length)) {
                            lSidebarScroll.slimScroll({
                                height: lSidebar.outerHeight(),
                                color: '#fff',
                                size: '5px',
                                opacity: .35,
                                wheelStep: 15,
                                distance: '2px',
                                railVisible: false,
                                railOpacity: 1
                            });
                        }
                        else { // ..else resize scrolling height
                            lSidebarScroll
                                .add(lSidebarScroll.parent())
                                .css('height', lSidebar.outerHeight());
                        }
                    }

                    // If side overlay exists
                    if (lSideOverlay.length) {
                        // Turn side overlay's scroll lock off (slimScroll will take care of it)
                        jQuery(lSideOverlay).scrollLock('disable');

                        // If side overlay scrolling does not exist init it..
                        if (lSideOverlayScroll.length && (!lSideOverlayScroll.parent('.slimScrollDiv').length)) {
                            lSideOverlayScroll.slimScroll({
                                height: lSideOverlay.outerHeight(),
                                color: '#000',
                                size: '5px',
                                opacity: .35,
                                wheelStep: 15,
                                distance: '2px',
                                railVisible: false,
                                railOpacity: 1
                            });
                        }
                        else { // ..else resize scrolling height
                            lSideOverlayScroll
                                .add(lSideOverlayScroll.parent())
                                .css('height', lSideOverlay.outerHeight());
                        }
                    }
                } else {
                    // If sidebar exists
                    if (lSidebar.length) {
                        // If sidebar scrolling exists destroy it..
                        if (lSidebarScroll.length && lSidebarScroll.parent('.slimScrollDiv').length) {
                            lSidebarScroll
                                .slimScroll({ destroy: true });
                            lSidebarScroll
                                .attr('style', '');
                        }

                        // Turn sidebars's scroll lock on
                        jQuery(lSidebar).scrollLock('enable');
                    }

                    // If side overlay exists
                    if (lSideOverlay.length) {
                        // If side overlay scrolling exists destroy it..
                        if (lSideOverlayScroll.length && lSideOverlayScroll.parent('.slimScrollDiv').length) {
                            lSideOverlayScroll
                                .slimScroll({ destroy: true });
                            lSideOverlayScroll
                                .attr('style', '');
                        }

                        // Turn side overlay's scroll lock on
                        jQuery(lSideOverlay).scrollLock('enable');
                    }
                }
            }
        }
    };
});

exGSP.run(function ($rootScope, uiHelpers) {
    // Access uiHelpers easily from all controllers
    $rootScope.helpers = uiHelpers;
    $rootScope.loadingVisible = false;
    $rootScope.CurrentUserName = '';
    $rootScope.CurrentSubscriptionId = '';

});

exGSP.controller('AppCtrl', ['$scope', '$window',
    function ($scope, $window) {
        // Template Settings
        $scope.oneui = {
            version: '3.0', // Template version
            localStorage: false, // Enable/Disable local storage
            settings: {
                activeColorTheme: false, // Set a color theme of your choice, available: 'amethyst', 'city, 'flat', 'modern' and 'smooth'
                sidebarLeft: true, // true: Left Sidebar and right Side Overlay, false: Right Sidebar and left Side Overlay
                sidebarOpen: true, // Visible Sidebar by default (> 991px)
                sidebarOpenXs: false, // Visible Sidebar by default (< 992px)
                sidebarMini: false, // Mini hoverable Sidebar (> 991px)
                sideOverlayOpen: false, // Visible Side Overlay by default (> 991px)
                sideOverlayHover: false, // Hoverable Side Overlay (> 991px)
                sideScroll: true, // Enables custom scrolling on Sidebar and Side Overlay instead of native scrolling (> 991px)
                headerFixed: true // Enables fixed header
            }
        };

        // Watch for sideScroll variable update
        $scope.$watch('oneui.settings.sideScroll', function () {
            // Handle Scrolling
            //setTimeout(function () {
            //    $scope.helpers.uiHandleScroll();
            //}, 150);
        }, true);

        // When view content is loaded
        $scope.$on('$viewContentLoaded', function () {
            // Hide page loader
            $scope.helpers.uiLoader('hide');
        });
        $scope.ShowLoadingPanal = function () {
            $scope.closeOnOutsideClick = false;
            $scope.showIndicator = true;
            $scope.showPane = true;
            $scope.shading = true;
            $scope.LodingOptions = {
                shadingColor: "rgba(0,0,0,0.4)",
                bindingOptions: {
                    visible: "loadingVisible",
                    showIndicator: "showIndicator",
                    showPane: "showPane",
                    shading: "shading",
                    closeOnOutsideClick: "closeOnOutsideClick"
                }
            };
        }
        $scope.ShowLoadingPanal();
    }
]);


// Side Overlay Controller
exGSP.controller('SideOverlayCtrl', ['$scope', '$window',
    function ($scope, $window) {
        // When view content is loaded
        $scope.$on('$includeContentLoaded', function () {
            // Handle Scrolling
            $scope.helpers.uiHandleScroll();
        });
    }
]);

// Header Controller
exGSP.controller('HeaderCtrl', ['$scope', '$window',
    function ($scope, $window) {
        $scope.CurrentUserName = '';
        $scope.CurrentSubscriptionId = '';
        // When view content is loaded
        $scope.$on('$includeContentLoaded', function () {
            // Transparent header functionality
            $scope.helpers.uiHandleHeader();
        });
        $scope.Subscriptions = angular.fromJson(AppCommon.Common.GetStorage('Subscriptions'));
        $scope.rangeSelectorOptions = {
            size: {
                height: 75,
                width: 300,
                color: 'white',
            },
            selectedRangeColor: "white",
            behavior: {
                allowSlidersSwap: false
            }, shutter: {
                color: 'white'
            },
            scale: {
                startValue: 0,
                endValue: 20000,
                minorTickInterval: 500,
                tickInterval: 10000,
                minorTick: {
                    visible: false,
                },

            },
            sliderMarker: {
                format: {
                    type: 'fixedPoint',
                    precision: 2
                },
                color: '#00b2f2',
                padding: 4
            },
            sliderHandle: {
                color: 'white',
                width: 3,
                opacity: 1,
            },
            selectedRange: {
                startValue: 0,
                endValue: 10000,
                color: 'white'
            },
            background: {
                color: 'white'
            },

        };


    }
]);

exGSP.directive('jsTabs', function () {
    return {
        link: function (scope, element) {
            jQuery('a', element).on('click', function (e) {
                e.preventDefault();
                jQuery(this).tab('show');
            });
        }
    };
});

