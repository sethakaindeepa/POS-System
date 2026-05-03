// ------------------------------Login Handler------------------------

$(document).ready(function (e){
$("#loginForm").submit(function (e){
    e.preventDefault();

    let username = $("#username").val().trim();
    let password = $("#password").val().trim();

    let cashierUser = {
        username: "cashier",
        password: "cashier@2026",
        role: "cashier"
    };

    if(username === "" || password === ""){
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Please fill all fields!'
        });
        return;
    }

    if(username === cashierUser.username && password === cashierUser.password){

        localStorage.setItem("loggedUser", JSON.stringify(cashierUser));

        Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'Welcome Cashier 👋',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.href = "system.html";
        });

    }else{
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid username or password'
        });
    }

});

});