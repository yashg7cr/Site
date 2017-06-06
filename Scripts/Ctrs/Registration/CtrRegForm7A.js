exGSP = window.exGSP || {};

exGSP.controller('CtrRegForm7A', function DemoController($scope, $location) {
    
var positions = ['one', 'two', 'three'];
var viewmodel = {
    formData: {},
    colCount: 2,
    labelLocation: "top",
    items: [
        {
            itemType: 'group',
            caption: 'Tax Deductor Details',
            colCount: 4,
            items: [
                {
                    dataField: 'LegalName', colSpan: 4,
                    label: {
                        text: 'Legal Name'
                    },
                    editorOptions: {
                        placeholder: 'Legal Name',
                    }
                },
                 {
                     dataField: 'PAN', colSpan: 2,
                     label: {
                         text: 'PAN'
                     },
                     editorOptions: {
                         placeholder: 'PAN',
                     }
                 },
                 {
                     dataField: 'TAN', colSpan: 2,
                     label: {
                         text: 'TAN'
                     },
                     editorOptions: {
                         placeholder: 'TAN',
                     }

                 },
                 {
                     dataField: 'Email', colSpan: 2,
                     label: {
                         text: 'Email'
                     },
                     editorOptions: {
                         placeholder: 'Email',
                     }

                 },
                {
                    dataField: 'MobileNumber', colSpan: 2,
                    label: {
                        text: 'Mobile Number'
                    },
                    editorOptions: {
                        placeholder: 'Mobile Number',
                    }
                },
            ]
        },
        { itemType: "empty" },
        {
            itemType: 'group',
            caption: '',
            colSpan:1,
            colCount: 12,
            items: [
              
              {
                  itemType: "empty", colSpan:11
              },
             {
                 editorType: "dxButton", editorOptions: {
                     text: "Next>>",
                     onClick: function (e) {
                         $scope.goNext();
                     }
                 }
             },
            ]
        },
    ]
};
$scope.goNext = function (hash) {
    hash = "/RegForm7B";
    $location.path(hash);
}
$scope.formOptions = viewmodel;
});
