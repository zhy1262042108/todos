var todo=angular.module('todo',['ngAnimate']);
todo.controller('m',['$scope','$timeout',function ($scope,$timeout) {
    $scope.name='';
    if (localStorage.__x){
        $scope.todos=JSON.parse(localStorage.__x)
    }else{
        $scope.todos=[];
    }

    $scope.save=function () {
        localStorage.__x=JSON.stringify($scope.todos);
    }

    $scope.add=function (e) {
        if (e.keyCode===13){
            if ($scope.todos.length===0){
                var id=0;
            }else{
                var max=-Infinity;
                for (var i=0;i<$scope.todos.length;i++){
                    var value=$scope.todos[i];
                    if (value.id>max){
                        max=value.id;
                    }
                }
                var id=max+1;
            }
            $scope.todos.push({id:id,name:$scope.name,isDone:false})
            $scope.name='';
        }
        
    }
    /*$scope.delete=function (id) {
        $scope.todos.splice(id,1);
    }*/
    $scope.delete=function (id) {
        var index;
        for (var i=0;i< $scope.todos.length;i++){
            if ($scope.todos[i].id===id){
                index=i;
                
            }
        }
        $scope.todos.splice(index,1);
        $scope.save();
    }
    $scope.focus=function (e) {
        $timeout(function () {
            $(e.currentTarget).find('input').trigger('focus')
        },0)
        // $timeout(fn(),number)
    }

   $scope.clear=function () {
       var arr=[];
       for (var i=0 ;i<$scope.todos.length;i++){
           if (!$scope.todos[i].isDone){
               arr.push($scope.todos[i]);
           }
       }
       $scope.todos=arr;
   }
   $scope.stop=function (e) {
       // e.preventDefault();
       e.stopPropagation();
   }
    /*加时间*/
    $scope.title='';
    setInterval(function () {
        $timeout(function () {
            var date = new Date();
            var h=date.getHours();
            var m=date.getMinutes();
            var s=date.getSeconds();
            s=(s<10)?('0'+s):s;
            $scope.title=h+':'+m+':'+s;
        },0);
    },1000)
}])

