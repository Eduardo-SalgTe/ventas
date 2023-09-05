
$(document).ready(function() {
function getUsersName() {
    var username = $('#username').val();
    var url = `http://192.168.0.13:9000/api/users/n${username}`;
    console.log(url);
    //hideTable();
    //showTable();
    $.get(url, function(data) {
        //totalPages = Math.ceil(totalUsers / usersPerPage);
        var tableBody = $("#myTable tbody");
        tableBody.empty();

        data.users.forEach(function(user) {
            var row = $("<tr></tr>");
            $("<td></td>").text(user.name).appendTo(row);
            $("<td></td>").text(user.age).appendTo(row);
            $("<td></td>").text(user.email).appendTo(row);
            $("<td></td>").text(user._id).appendTo(row);
            tableBody.append(row);
        });
    });
}
$('#search').on("click", function(){
    getUsersName();
});
getUsersName();
});