//---------------------------Add Logout function--------------------------------
$(document).ready(function (){

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
});