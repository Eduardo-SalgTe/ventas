$(document).ready(function() {
    console.log("funcion -> document");
    var currentPage = 1;
    var usersPerPage = 20;
    var totalUsers = 0;
    var totalPages = 0;
    function getUsers(page) {
        console.log("funcion -> getUsers");
        var skip = (page - 1) * usersPerPage;
        var url = "http://127.0.0.1:9000/api/sales/Denver";
        console.log(url);
        $.get(url, { page: page, limit: usersPerPage }, function(data) {
            totalUsers = data.totalCount;
            totalPages = Math.ceil(totalUsers / usersPerPage);
            updatePaginationButtons();

            var tableBody = $("#users-table tbody");
            tableBody.empty();
            
            data.vent.forEach(function(datos){
                var row = $("<tr></tr>");
                $("<td></td>").text(datos.saleDate).appendTo(row);

                var selectElement = $("<select></select>");
                var options = ""; // Cadena de opciones
                if (datos.items && Array.isArray(datos.items)) {
                    datos.items.forEach(function(item) {
                    //$("<option></option>").text(item.name).appendTo(selectElement);
                    options += "<option>" + item.name + " - " + item.price + " - " + item.quantity + "</option>";
                    
                });
                }
                selectElement.html(options); // agregar las opciones al elemento select

                $("<td></td>").append(selectElement).appendTo(row);
               
                $("<td></td>").text(datos.storeLocation).appendTo(row);
                
                var selectElementCustomer = $("<select></select>");
                var optionText = datos.customer.gender;
                var optionTextz = datos.customer.age;
                var optionTextd = datos.customer.email;
                var optionTexts = datos.customer.satisfaction;
                
                $("<option></option>").text(optionText).appendTo(selectElementCustomer);
                $("<option></option>").text(optionTextz).appendTo(selectElementCustomer);
                $("<option></option>").text(optionTextd).appendTo(selectElementCustomer);
                $("<option></option>").text(optionTexts).appendTo(selectElementCustomer);

                $("<td></td>").append(selectElementCustomer).appendTo(row);
                $("<td></td>").text(datos.couponUsed).appendTo(row);
                $("<td></td>").text(datos.purchaseMethod).appendTo(row);
                $("<td></td>").text(datos._id).appendTo(row);
                tableBody.append(row);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos de ventas:', error);
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