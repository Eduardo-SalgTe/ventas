$(document).ready(function() {
    console.log("funcion -> document");
    
    var currentPage = 1;
    var usersPerPage = 20;
    var totalUsers = 0;
    var totalPages = 0;
    var dirW = "";
    function getUsers(page) {
        dirW =  $('#username').val();
        console.log("funcion -> getUsers");
        console.log(dirW);
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
        //var username = "Brian";
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
            console.log("error > getUserName > script_tabla");
            });
    }
    function seText(){
        
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
    }); // bien
    $('#search').on("click", function(){
        event.preventDefault();
        getUsersName();
    }); // bien
    $('#upd').on("click", function(){
        event.preventDefault();
        getUsersName();
    }); 
    getUsers(currentPage);
    
});