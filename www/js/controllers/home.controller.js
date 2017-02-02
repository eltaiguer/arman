angular.module('arman')
.controller('HomeCtrl', ['$scope', '$http', '$log',
  function($scope, $http, $log) {
    var src = 'data/audios.json';
    var media;
    var path = "data/";

    if (ionic.Platform.isAndroid()){
      path = "/android_asset/www/" + path;
    }

    $http.get(src).then(
      function success(response){
        $scope.audios = response.data.audios;
        $log.info(audios);
      },
      function error(){
        $log.error("fah, que pintó?");
      }
    );

    $scope.playAudio = function(pos){
      if (!angular.isUndefined(media)){
        media.release();
      }
      media = new Media(path + $scope.audios[pos].path,
        function(){console.log("seee");},
        function(err){ console.log(err.code);}
      );
      media.play();
    };
  }
]);
