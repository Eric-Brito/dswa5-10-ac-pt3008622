angular.module('ifsp').controller('CursosController',
    function($resource, $scope, $http) {
        $scope.cursos = [
            {"_id": 1, "curso": "Engenharia da Produção", "coordenador": "fabio.teixeira@ifsp.edu.br"},
	    {"_id": 2, "curso": "Tecnologia em Análise e Desenvolvimento de Sistemas","coordenador": "fabiano.teixeira@ifsp.edu.br"},
            {"_id": 3, "curso": "Licenciatura em Letras Português/Inglês","coordenador": "melissa.teixeira@ifsp.edu.br"},
            {"_id": 3, "curso": "Tecnologia em Gestão Pública","coordenador": "melissa.teixeira@ifsp.edu.br"}           
        ];
        $scope.filtro = '';
        var Cursos = $resource('/cursos');
		var contatos = $http.get('/cursos');
		var promise = $http.get('/cursos');
        function buscaCursos() {
            Cursos.query(
                function(cursos) {
                    $scope.cursos = cursos;
                },
                function(erro) {
                    console.log('Não foi possível obter a lista de cursos.');
                    console.log(erro);
                }
            );
        }

        promise
            .then(exibeCursos)
            .then(modificaCursos)
            .then(AtualizaCursos)
            .then(function(cursos) {
                 $scope.mensagem = {texto: 'Cursos atualizados com sucesso'};
            })
            .catch(function(erro) {
                console.log(erro.status);
                console.log(erro.statusText);
            });

        buscaCursos();
    });
