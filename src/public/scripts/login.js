$(document).ready(function() {
    console.log("funcion -> document");
    var currentPage = 1;
    var usrM = "";
    var usrP = "";

    function userCK() {
        var dirn = "http://127.0.0.1:9000/api/usuarios/mail/";
        var correo = $('#email').val();
        var inputd = document.getElementById("password");
        var url = dirn + correo;

        console.log(url);

        $.get(url, function(data) {
            data.forEach(function(user) {
                var textoa = user.name;
                var textob = user.op;
                usrM = user.email;
                usrP = user.passw;
                var textoe = user._id;
                console.log(usrP);

                changingV(inputd, usrP);
            });
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log("error > getUserName > script_tabla");
        });
    }

    function changingV(contraI, contraII){
        if( contraI.value == contraII){
            window.location.href = 'http://127.0.0.1:9000/principal.html';
        }
    }
    
    $('#CK').on("click", function(){
        event.preventDefault();
        userCK();
    }); 
    $('#SU').on("click", function(){
        //event.preventDefault();
        window.location.href = 'http://127.0.0.1:9000/signup.html';
    });
});