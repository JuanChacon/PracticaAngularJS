angular.module("FinalApp")
    .controller('MainController', function($scope, $resource, postResource) {
        User = $resource('https://jsonplaceholder.typicode.com/users/:id', {
            id: '@id'
        });

        $scope.posts = postResource.query(); // metodo de resource
        $scope.users = User.query();
        //query () -> GET/posts -> Un arreglo de posts -> isArray: true

        $scope.remove = function(post) {
            /*  postResource.delete({ id: post.id }, function(data) { //esto funciona para apis reales, delete - metodo de resource
                  console.log(data);
                  $scope.posts = Post.query(); 
                  //si el api de datos fuera real y no de pruebas, esto funciona para traer los post, quitando el que se elimino
              });
              */
            $scope.posts = $scope.posts.filter(function(element) {
                return element.id !== post.id; //post que es parametro de la funcion,
                //the filter can only be used on arrays, and it returns an array containing only the matching items.
            });
        }



    })
    .controller('PostController', function($scope, postResource, $routeParams, $location) {
        /* Post = $resource('https://jsonplaceholder.typicode.com/posts/:id', {
             id: '@id'
                 // el @, es un "atributo" del objeto que se esta obteniendo, si no se le pone @, solo tomaria el nombre, en este caso pondria id.
         });*/
        //get(), metodo resfull que tiene resource
        $scope.title = "Editar Post";
        $scope.post = postResource.get({ id: $routeParams.id }); ///post/:id", de ahi sale el id, debe ser igual que en el del router
        // get - metodo de resource 

        $scope.savePost = function() {
            postResource.update({ id: $scope.post.id }, { // save - metodo de resource
                data: $scope.post
                    // parametros: crear un objeto de nombre data, con el atributo post

            }, function(data) {
                console.log(data);
                $location.path('/');
            });
        }
    })
    .controller('NewPostController', function($scope, postResource, $location) {
        /* Post = $resource('https://jsonplaceholder.typicode.com/posts/:id', {
             id: '@id'
         });
         */
        $scope.post = {};
        $scope.title = "Crear Post"
        $scope.savePost = function() {
            postResource.save({ // save - metodo de resource
                data: $scope.post // parametros: crear un objeto de nombre data, con el atributo post

            }, function(data) {
                console.log(data);
                $location.path('/');

            });
        }

    });