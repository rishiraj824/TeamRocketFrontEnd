var app = angular.module("app", ["chart.js"]);
app.controller("LineCtrl", function ($scope,$http) {
  // Simple GET request example:
  $http({
    method: 'GET',
    url: 'http://myffcs.in:8888/'
  }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
  var x =   response.data;
  states = [];
  $scope.labels =[];
  $scope.data = [];
  for (var i = 1; i < 36; i++) {
    states[i-1] = {id: '0'+('0'+i).slice(-2), name: x['0'+('0'+i).slice(-2)]['state']}
  }
  $scope.select = {
    model: '001',
    availableOptions: states
   };
   for (var i = 1991; i <= 2001 ; i++) {
    $scope.labels[i-1991] = i.toString();
    $scope.data[i-1991] = x["001"][i].toString();
  }
  $("#repeatSelect").on("change",function(){
    for (var i = 1991; i <= 2001 ; i++) {
    $scope.labels[i-1991] = i.toString();
    $scope.data[i-1991] = x[$(this).val()][i].toString();
  }
  });
  
    FusionCharts.ready(function() {
      stateData = [];
     for(var i = 1; i< 36; i ++ ){
      stateData[i-1] = {id: '0'+('0'+i).slice(-2), value: x['0'+('0'+i).slice(-2)]['1991']}
     } 

    var populationMap = new FusionCharts({
        type: 'maps/india',
        renderAt: 'chart-container',
        width: '600',
        height: '400',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "India Population",
                "theme": "fint",
                "formatNumberScale": "0",
                "includeNameInLabels": "1",
                "useSNameInLabels": "0"
            },
            "colorrange": {
                "color": [{
                    "minvalue": 0,
                    "maxvalue": 10000000,
                    "code": "#E0F0E0",
                    "displayValue": "Below 10M"
                }, {
                    "minvalue": 10000001,
                    "maxvalue":  50000000,
                    "code": "#D0DFA3",
                    "displayValue": "10-50M"
                }, {
                    "minvalue": 50000001,
                    "maxvalue": 100000000,
                    "code": "#B0BF92",
                    "displayValue": "50-100M"
                }, {
                    "minvalue": 100000001,
                    "maxvalue": 2000000000,
                    "code": "#91AF64",
                    "displayValue": "Above 100M"
                }]
            },
            "data": stateData
        }
    }).render();
       $("#Map").on("change",function() {
    /* Act on the event */
     stateData = [];
     console.log($(this).val());
     for(var i = 1; i< 36; i ++ ){
      stateData[i-1] = {id: '0'+('0'+i).slice(-2), value: x['0'+('0'+i).slice(-2)][$(this).val()]}
     } 

    var populationMap = new FusionCharts({
        type: 'maps/india',
        renderAt: 'chart-container',
        width: '600',
        height: '400',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "India Population",
                "theme": "fint",
                "formatNumberScale": "0",
                "includeNameInLabels": "1",
                "useSNameInLabels": "0"
            },
            "colorrange": {
                "color": [{
                    "minvalue": 0,
                    "maxvalue": 10000000,
                    "code": "#E0F0E0",
                    "displayValue": "Below 10M"
                }, {
                    "minvalue": 10000001,
                    "maxvalue":  50000000,
                    "code": "#D0DFA3",
                    "displayValue": "10-50M"
                }, {
                    "minvalue": 50000001,
                    "maxvalue": 100000000,
                    "code": "#B0BF92",
                    "displayValue": "50-100M"
                }, {
                    "minvalue": 100000001,
                    "maxvalue": 2000000000,
                    "code": "#91AF64",
                    "displayValue": "Above 100M"
                }]
            },
            "data": stateData
        }
    }).render();
});
  });
  

  
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

});
app.controller("BarCtrl", function ($scope) {
  $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
});
