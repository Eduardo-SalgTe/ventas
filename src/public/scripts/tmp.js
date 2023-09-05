function getUsers(page) {
        console.log("funcion -> getUsers");
        var skip = (page - 1) * usersPerPage;
        var url = "http://127.0.0.1:9000/api/sales/twty/";
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

                datos.items.forEach(function(item) {
                    options += "<option>" + item.name + " - " + item.price + " - " + item.quantity + "</option>";
                });

                selectElement.html(options); // agregar las opciones al elemento select

                $("<td></td>").append(selectElement).appendTo(row);
                $("<td></td>").text(datos.storeLocation).appendTo(row); 
                tableBody.append(row);
            }); 
        })
        .catch(error => {
            console.error('Error al obtener los datos de ventas:', error);
        }); 
    }
