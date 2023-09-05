$(document).ready(function(){
    
    var currentPage = 1;
    var texto = "m";
    var cont = 1;
    var uno = 1;
    function checkMail() {
        //event.preventDefault();
        console.log("consultando correo");
        var dirn = "http://127.0.0.1:9000/api/usuarios/mail/";
        var mailt = $('#mailC').val();
        var url = dirn;
        url += mailt;
        console.log(url);
        $.get(url, function(data){
            data.forEach(function(user) {
                texto = user._id;
            });
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log("error al consultar");
            });
        console.log(">",texto);
        tercera();
    }
    function tercera(){
        //event.preventDefault();
        uno = texto.length;
        console.log(texto);
        console.log("ejecutando tercera funcion...", uno);
        if(uno > 1){
            window.location.href = "http://127.0.0.1:9000/principal.html";
        }
    }
   
            
    function regNU(){
        var username = $('#usernameC').val();
        var mailt = $('#mailC').val();
        var passI = $('#passCI').val();
        var type = 0;
        var datauno = {
            name: username,
            op: type,
            email: mailt,
            passw: passI
          };
          $.ajax({
            url: 'http://127.0.0.1:9000/api/usuarios', 
            type: 'POST',
            data: JSON.stringify(datauno),
            contentType: 'application/json',
            success: function(response) {
              console.log("POST exitoso");
              
              window.location.href = 'http://127.0.0.1:9000/login.html';
            },
            error: function(error) {
              console.log('POST Error: ', error.responseText);
            }
          });
          alert("registrado exitosamente.");
    }
    function checkPass(){
        event.preventDefault();
        var mm = $('#mailC').val();
        if(mm == ""){
            alert("revisa bien");
        }
        if(mm != ""){
            valPas();
        }
        
        
    }
    function valPas(){
        var passI = $('#passCI').val();
        var passII = $('#passCII').val();
        var mm = $('#mailC').val();
        if(mm == ""){
            alert("revisa bien");
        }else{
            if(passI == passII){
                checkMail();
            }else{
                alert("no coinciden las contrasenas");
            }
        }
        
    }
    $('#signCk').on("click", function(){
        event.preventDefault();
        cont++;
        checkPass();
        if(cont > 2){
            console.log(cont);
            if(uno === 1){
                regNU();

            }
            if(uno > 1){
                alert("ya existe cuenta con este correo");
                window.location.href = window.location.href;
            }
            cont = 1;
        }
    }); 
});