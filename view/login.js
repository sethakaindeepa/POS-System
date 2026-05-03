//-----------------------------Add toggle password----------------------
$("#togglePassword").click(function (){
       let input = $("#password");

       if (input.attr("type") === "password"){
           input.attr("type","text");
           $(this).removeClass("fa-eye").addClass("fa-eye-slash");
       }else{
           input.attr("type","password");
           $(this).removeClass("fa-eye-slash").addClass("fa-eye");
       }
});