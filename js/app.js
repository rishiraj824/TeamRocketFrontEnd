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
   for (var i = 1991; i <= 2021 ; i++) {
    $scope.labels[i-1991] = i.toString();
    $scope.data[i-1991] = x["001"][i].toString();
  }
  $("#repeatSelect").on("change",function(){
    for (var i = 1991; i <= 2021 ; i++) {
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
        width: '900',
        height: '700',
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
        width: '900',
        height: '700',
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


  app.controller("HorizontalBarCtrl",  function ($scope,$http) {
    $http({
  method:'GET',
  url : 'http://myffcs.in:6090/census/scrape'
}).then(function successCallback(response) {
  var x =   response.data;
  states = [];
  $scope.labels =[];
  $scope.data = [];
  i = 0;
  for (var key in x){
    states[i++] = {id: key, name: key}
  }
  $scope.select = {
    model: 'Andaman and Nicobar Islands',
    availableOptions: states
   };
   
    $scope.labels = ['2001', '2011'];
    $scope.series = ['Male', 'Female'];
    $scope.data = [
      [parseInt(response.data["Andaman and Nicobar Islands"]["details"]["MaleLiterate"]["2001"].replace(",","")),parseInt(response.data["Andaman and Nicobar Islands"]["details"]["MaleLiterate"]["2011"].replace(",",""))],
      [parseInt(response.data["Andaman and Nicobar Islands"]["details"]["FemaleLiterate"]["2001"].replace(",","")),parseInt(response.data["Andaman and Nicobar Islands"]["details"]["FemaleLiterate"]["2011"].replace(",",""))]
    ];
    $("#repeatSelect2").on("change", function(){
      
      $scope.data = [
      [parseInt(x[$(this).val()]["details"]["MaleLiterate"]["2001"].replace(",","")),parseInt(x[$(this).val()]["details"]["MaleLiterate"]["2011"].replace(",",""))],
      [parseInt(x[$(this).val()]["details"]["FemaleLiterate"]["2001"].replace(",","")),parseInt(x[$(this).val()]["details"]["FemaleLiterate"]["2011"].replace(",",""))]
    ];
    });
});
});


   
