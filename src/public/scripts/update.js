$(document).ready(function() {
    console.log("funcion -> document");
    var currentPage = 1;
    var usersPerPage = 20;
    var totalUsers = 0;
    var totalPages = 0;
    var inputa = document.getElementById("usernameF");
    var inputb = document.getElementById("op");
    var inputc = document.getElementById("correo");
    var inputd = document.getElementById("passw");
    function getUsers(page) {
        console.log("funcion -> getUsers");
        var skip = (page - 1) * usersPerPage;
        var url = "http://127.0.0.1:9000/api/usuarios";
        console.log(url);
        $.get(url, { page: page, limit: usersPerPage }, function(data) {
            totalUsers = data.totalCount;
            totalPages = Math.ceil(totalUsers / usersPerPage);
            updatePaginationButtons();
            var tableBody = $("#users-table tbody");
            tableBody.empty();
            data.usuario.forEach(function(usuario) {
                var row = $("<tr></tr>");
                $("<td></td>").text(usuario.name).appendTo(row);
                $("<td></td>").text(usuario.op).appendTo(row);
                $("<td></td>").text(usuario.email).appendTo(row);
                $("<td></td>").text(usuario.passw).appendTo(row);
                $("<td></td>").text(usuario._id).appendTo(row);
                tableBody.append(row);
            });
        });
    }
    function getUsersName() {
        var dirn = "http://127.0.0.1:9000/api/usuarios/n/";
        var username = $('#username').val();
        hideTable();
        showTable();
        var url = dirn;
        url += username;
        console.log(url);
        updatePaginationButtons();
        $.get(url, function(data) {
            var tableBody = $("#myTable tbody");
            tableBody.empty();
    
            data.forEach(function(user) {
                var row = $("<tr></tr>");
                $("<td></td>").text(user.name).appendTo(row);
                $("<td></td>").text(user.op).appendTo(row);
                $("<td></td>").text(user.email).appendTo(row);
                $("<td></td>").text(user.passw).appendTo(row);
                $("<td></td>").text(user._id).appendTo(row);
                tableBody.append(row);
            });
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log("error > getUserName > update");
            });
    }
    function getUsersID() {
        event.preventDefault();
        //var username = "Brian";
        var dirn = "http://127.0.0.1:9000/api/usuarios/id/";
        var user_id = $('#userid').val();
        //var url = `http://192.168.0.13:9000/api/users/${username}`;
        //var url = "http://192.168.0.13:9000/api/users/n/" + " " + username;
        hideTable();
        showTable();
                
        var url = dirn;
        url += user_id;
        console.log(url);
        updatePaginationButtons();
        $.get(url, function(data) {
            var tableBody = $("#myTable tbody");
            tableBody.empty();
    
            data.forEach(function(user) {
                var row = $("<tr></tr>");
                $("<td></td>").text(user.name).appendTo(row);
                var texta = user.name;
                inputa.value = texta;
                $("<td></td>").text(user.op).appendTo(row);
                var textb = user.op;
                inputb.value = textb;
                $("<td></td>").text(user.email).appendTo(row);
                var textc = user.email;
                inputc.value = textc;
                $("<td></td>").text(user.passw).appendTo(row);
                var textd = user.passw;
                inputd.value = textd;
                $("<td></td>").text(user._id).appendTo(row);
                tableBody.append(row);
            });
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log("error > getUserName > update");
            });
    }
    function seText(){
        event.preventDefault();
        var dirn = "http://127.0.0.1:9000/api/usuarios/";
        var user_id = $('#userid').val();
        var url = dirn;
        url += user_id;
        var name = $('#usernameF').val();
        var op = $('#op').val();
        var email = $('#correo').val();
        var passw = $('#passw').val();
        var userData = {
            name: name,
            op: op,
            email: email,
            passw: passw
          };
        var datSend= JSON.stringify(userData);
        //contentType= 'application/json';
        hideTable();
        showTable();
        var url = dirn;
        url += user_id;
        console.log(url);
        updatePaginationButtons();
        const updateUser = (user_id, datSend) => {
            fetch(url, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
              console.log('Usuario actualizado:', data);
              var tableBody = $("#myTable tbody");
              tableBody.empty();
              // acciones despues de actualizar usuario
                var row = $("<tr></tr>");
                $("<td></td>").text(userData.name).appendTo(row);
                $("<td></td>").text(userData.op).appendTo(row);
                $("<td></td>").text(userData.email).appendTo(row);
                $("<td></td>").text(userData.passw).appendTo(row);
                $("<td></td>").text(user_id).appendTo(row);
                tableBody.append(row);
                
                inputa.value = "";
                inputb.value = "";
                inputc.value = "";
                inputd.value = "";
            })
            .catch(error => {
              console.error('Error al actualizar usuario:', error);
            });
          };
          updateUser(user_id, userData);
    }
    // opcion 2, si op1 no funciona. No implementado
    function updateUser(){
        var dirn = "http://127.0.0.1:9000/api/usuarios/";
        var user_id = $('#userid').val();
        //var url = `http://192.168.0.13:9000/api/users/${username}`;
        //var url = "http://192.168.0.13:9000/api/users/n/" + " " + username;
        var name = $('#username').val();
        var op = $('#age').val();
        var email = $('#correo').val();
        var passw =$('#correo').val();
        var userData = {
            name: name,
            op: op,
            email: email,
            passw: passw
          };
        hideTable();
        showTable();
        tableBody.empty();
        var url = dirn;
        url += user_id;
        console.log(url);
        updatePaginationButtons();
        $.ajax({
            url,
            type: 'PUT',
            data: JSON.stringify(userData),
            contentType: 'application/json',
            success: function(response) {
              console.log('actualizacion exitosa');
              
                $("<td></td>").text(datauno.name).appendTo(row);
                tableBody.append(row);
                $("<td></td>").text(datauno.age).appendTo(row);
                tableBody.append(row);
                $("<td></td>").text(datauno.email).appendTo(row);
                tableBody.append(row);
                //$("<td></td>").text("64a5b1146636765d103b5017").appendTo(row);
                //tableBody.append(row);
                row = $("<tr></tr>");
              //window.location.href = 'http://192.168.0.13:9000/principal.html';
            },
            error: function(error) {
              console.log('Error al actualizar: ', error.responseText);
            }
          });
    }
    function hideTable(){
        var table = document.getElementById("users-table");
        table.style.display = "none";
    }
    function showTable(){
        var table = document.getElementById("myTable");
        table.style.display = "table";
    }
    function updatePaginationButtons() {
        $("#current-page").text(currentPage);

        if (currentPage === 1) {
            $("#prev-button").prop("disabled", true);
        } else {
            $("#prev-button").prop("disabled", false);
        }

        if (currentPage === totalPages) {
            $("#next-button").prop("disabled", true);
        } else {
            $("#next-button").prop("disabled", false);
        }
    }
    $("#prev-button").on("click", function() {
        if (currentPage > 1) {
            currentPage--;
            getUsers(currentPage);
        }
    });
    $("#next-button").on("click", function() {
        if (currentPage < totalPages) {
            currentPage++;
            getUsers(currentPage);
        }
    });
    $('#search').on("click", function(){
        event.preventDefault();
        getUsersName();
    });
    $('#upd').on("click", function(){
        event.preventDefault();
        getUsersID();
    });
    $('#upd2').on("click", function(){
        event.preventDefault();
        seText();
    });
    getUsers(currentPage);
});