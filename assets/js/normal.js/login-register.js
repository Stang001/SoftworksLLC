/* Encode File name script.kl9i2ky.js */

/* Sign-In script */
$('#signin').click(function(signin){
signin.preventDefault();

var username = $("#username").val();
var password = $("#password").val();
$.ajax({

        type: "POST",
        url: "plugin/login.php",
        dataType: "json",
        data: {username:username,password:password},

        beforeSend: function() {
        swal("กำลังตรวจสอบข้อมูล กรุณารอสักครู่...",{button:false,closeOnClickOutside:false,timer:1900,});

        },

        success : function(data){
        setTimeout(function() {
            if (data.code == "200"){
                swal("เข้าสู่ระบบ สำเร็จ!", "ระบบกำลังพาท่านไป...", "success",{button:false,closeOnClickOutside:false,});
                setTimeout(function(){ window.location.reload();}, 2000);
            } else {
                swal(data.msg ,"" ,"error",{button:{className:'hyper-btn-notoutline-danger',},closeOnClickOutside:false,});
            }
        }, 2000);
        }

});

});


/* Sign-Up script */
$('#signup').click(function(signup){
signup.preventDefault();

var username = $("#username").val();
var password = $("#password").val();
var cpassword = $("#c_password").val();
var email = $("#email").val();

$.ajax({

        type: "POST",
        url: "plugin/register.php",
        dataType: "json",
        data: {username:username,password:password,cpassword:cpassword,email:email},

        beforeSend: function() {
        swal("กำลังบันทึกข้อมูล กรุณารอสักครู่...",{button:false,closeOnClickOutside:false,timer:1900,});

        },

        success : function(data){
        setTimeout(function() {
            if (data.code == "200"){
                swal("สมัครสมาชิก สำเร็จ!", "ระบบกำลังพาท่านไป...", "success",{button:false,closeOnClickOutside:false,});
                setTimeout(function(){ window.location.href="login";}, 2000);
            } else {
                swal(data.msg ,"" ,"error",{button:{className:'hyper-btn-notoutline-danger',},closeOnClickOutside:false,});
            }
        }, 2000);
        }

});

});