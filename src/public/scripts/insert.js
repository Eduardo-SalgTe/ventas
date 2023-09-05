$(document).ready(function() {
    var tableBody = $("#insert-table tbody");
    var row = $("<tr></tr>");
  $('#loginForm').submit(function(e) {
    e.preventDefault(); 
    
    // valores del formulario
    var username = $('#username').val();
    var op = $('#op').val();
    var correo = $('#correo').val();
    var passw = $('#passw').val();
    var inputa = document.getElementById("username");
    var inputb = document.getElementById("op");
    var inputc = document.getElementById("correo");
    var inputd = document.getElementById("passw");
    var texto = "";

    // objeto de datos a enviar
    var datauno = {
      name: username,
      op: op,
      email: correo,
      passw: passw
      
    };
//,mania: {nombre: username, contrasena: op}

    $.ajax({
      url: 'http://127.0.0.1:9000/api/usuarios', 
      type: 'POST',
      data: JSON.stringify(datauno),
      contentType: 'application/json',
      success: function(response) {
        console.log("POST exitoso");
        //tableBody.empty();
          $("<td></td>").text(datauno.name).appendTo(row);
          tableBody.append(row);
          $("<td></td>").text(datauno.op).appendTo(row);
          tableBody.append(row);
          $("<td></td>").text(datauno.email).appendTo(row);
          tableBody.append(row);
          $("<td></td>").text(datauno.passw).appendTo(row);
          tableBody.append(row);
          //$("<td></td>").text("64a5b1146636765d103b5017").appendTo(row);
          //tableBody.append(row);
          row = $("<tr></tr>");
          inputa.value = texto;
          inputb.value = texto;
          inputc.value = texto;
          inputd.value = texto;
        //window.location.href = 'http://192.168.0.13:9000/principal.html';
      },
      error: function(error) {
        console.log('POST Error: ', error.responseText);
      }
    });
  });
});