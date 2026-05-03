$(document).ready(function (){

    let user = JSON.parse(localStorage.getItem("loggedUser"));

    if(!user){
        window.location.href = "login.html";
    }

    $("#logoutBtn").click(function (){

        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, logout'
        }).then((result) => {

            if(result.isConfirmed){

                localStorage.removeItem("loggedUser");

                sessionStorage.clear();

                window.location.href = "login.html";
            }
        });
    });

    $('#customer-content').hide();
    $('#item-content').hide();
    $('#order-content').hide();
    $('#history-content').hide();

    $('#dashboardBtn').click(function () {
        $('section').hide();
        $('#dashboard-content').show();
    });

    $('#customerBtn').click(function () {
        $('section').hide();
        $('#customer-content').show();
    });

    $('#itemBtn').click(function () {
        $('section').hide();
        $('#item-content').show();
    });

    $('#orderBtn').click(function () {
        $('section').hide();
        $('#order-content').show();
    });

    $('#orderBtn').click(function () {
        $('section').hide();
        $('#order-content').show();
    });
});


