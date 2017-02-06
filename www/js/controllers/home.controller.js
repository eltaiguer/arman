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

    // this is the complete list of currently supported params you can pass to the plugin (all optional)


    var onSuccess = function(result) {
      console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    };

    var onError = function(msg) {
      console.log("Sharing failed with message: " + msg);
    };

    $scope.share = function(pos){
     navigator.vibrate(50);
      var options = {
        message: '', // not supported on some apps (Facebook, Instagram)
        subject: '', // fi. for email
        files: [], // an array of filenames either locally or remotely,
        url: '',
        chooserTitle: 'Compartir via' // Android only, you can override the default share sheet title
      };

      options.files.push('www/data/' + $scope.audios[pos].path);
      console.log(options.files);
      window.plugins.socialsharing.shareViaWhatsApp('', 'www/data/' + $scope.audios[pos].path, '', onSuccess, onError);
    };
  }
]);
