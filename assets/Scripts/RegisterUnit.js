let isProcessing=false;
document.getElementById("register_button").addEventListener("click",async (event)=>{
    event.preventDefault();
    const emailInput = document.getElementById("email");
    if (!emailInput.checkValidity()) {
        swal("สมัครสมาชิก ไม่สำเร็จ!", "กรุณากรอกอีเมลที่ถูกต้อง", "error", {
            button:{className:'hyper-btn-notoutline-danger'},
            closeOnClickOutside: false,
        });
        return;
    }
    if (isProcessing) return;
    isProcessing = true;
    var username = $("#username").val();
    var password = $("#password").val();
    var cpassword = $("#password_confirm").val();
    var email = $("#email").val();
    if (!username||!password||!cpassword||!email) {
        swal("สมัครสมาชิก ไม่สำเร็จ!", "กรุณากรอกรายละเอียดให้ครบ", "error", {
            button:{className:'hyper-btn-notoutline-danger'},
            closeOnClickOutside: false,
        });
        isProcessing = false;
        return;
    }
    let salt1 = generateRandomSalt();
    let res = await fetch(API_URL);
    let users = await res.json();
    if (users.some(user => user.username === username || user.email === email)) {
        swal("สมัครสมาชิก ไม่สำเร็จ!", "Username / Email already exists", "error", {
            button:{className:'hyper-btn-notoutline-danger'},
            closeOnClickOutside: false,
        });
        isProcessing = false;
        return;
    }
    if (username.length === 0) {
        swal("สมัครสมาชิก ไม่สำเร็จ!", "Invalid Username", "error", {
            button:{className:'hyper-btn-notoutline-danger'},
            closeOnClickOutside: false,
        });
        isProcessing = false;
        return;
    }
    if (!/^[A-Za-z0-9]{8,}$/.test(password)) {
        swal("สมัครสมาชิก ไม่สำเร็จ!", "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร และห้ามมีอักขระพิเศษ", "error", {
            button:{className:'hyper-btn-notoutline-danger'},
            closeOnClickOutside: false,
        });
        isProcessing = false;
        return;
    }
    if(password!==cpassword){
        swal("สมัครสมาชิก ไม่สำเร็จ!", "Invalid Password Comfirm", "error", {
            button:{className:'hyper-btn-notoutline-danger'},
            closeOnClickOutside: false,
        });
        isProcessing = false;
        return;
    }
    let { encryptedPassword, iv, salt } = await encryptPassword(password, salt1);
    let roleres;
    const registerTime = Date.now();
    const readableTime = new Date(registerTime).toLocaleString();
    if(username==="admin"){
        roleres=779
    }else{
        roleres=1
    }
    $.ajax({
        type: "POST",
        url: API_URL,
        dataType: "json",
        data:{ username, password: encryptedPassword, email, iv,points:0, salt,role:roleres,datecreated:readableTime },
        beforeSend: function() {
          swal("กำลังเพิ่มข้อมูล กรุณารอสักครู่...", { button: false, closeOnClickOutside: false, timer: 1900 });
        },
        success: function(data) {
          setTimeout(function() {
            swal("Successfully !", "สมัครสมาชิกสำเร็จ !", "success", {
              button: { className: 'hyper-btn-notoutline-danger' },
              closeOnClickOutside: false,
            });
            setTimeout(function() { window.location.href="../Pages/Login.html"; }, 2000);
          }, 2000);
        },
        error: function(xhr, status, error) {
          console.log("Error:", error);
          swal("เกิดข้อผิดพลาด !", "สมัครสมาชิกไม่สำเร็จ !", "error", {
            button: { className: 'hyper-btn-notoutline-danger' },
            closeOnClickOutside: false,
          });
          isProcessing = false;
        }
      });
})
setInterval(function(){
    validationtk("./User/index.html")
},1000)
/*
document.getElementById("signup").addEventListener("click",async (event)=>{
    var username = $("#username").val();
    var password = $("#password").val();
    var cpassword = $("#c_password").val();
    var email = $("#email").val();
    let res = await fetch(API_URL);
    let users = await res.json();
    if (users.some(user => user.username === username || user.email === email)) {
        swal("สมัครสมาชิก ไม่สำเร็จ!", "Username / Email already exists", "error", {
            button:{className:'hyper-btn-notoutline-danger'},
            closeOnClickOutside: false,
        });
        return;
    }
    if (!username || !password || !email) {
        swal("สมัครสมาชิก ไม่สำเร็จ!", "กรุณากรอกรายละเอียดให้ครบ", "error", {
            button:{className:'hyper-btn-notoutline-danger'},
            closeOnClickOutside: false,
        });
        return;
    }
    if (username.length === 0) {
        swal("สมัครสมาชิก ไม่สำเร็จ!", "Invalid Username", "error", {
            button:{className:'hyper-btn-notoutline-danger'},
            closeOnClickOutside: false,
        });
        return;
    }
    if(password!==cpassword){
        swal("สมัครสมาชิก ไม่สำเร็จ!", "Invalid Password Comfirm", "error", {
            button:{className:'hyper-btn-notoutline-danger'},
            closeOnClickOutside: false,
        });
        return;
    }
    swal("กำลังบันทึกข้อมูล กรุณารอสักครู่...", {
        button: false,
        closeOnClickOutside: false,
        timer: 1900,
    });
    let response = await fetch(API_URL,{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({username,password,email})
    });
    if (response.ok) {
        swal("สมัครสมาชิก สำเร็จ!", "ระบบกำลังพาท่านไป...", "success", {
            button: false,
            closeOnClickOutside: false,
        });
        setTimeout(function(){
            window.location.href=""
        },2000)
    } else {
        swal("สมัครสมาชิก ไม่สำเร็จ!", "ระบบกำลังพาท่านไป...", "error", {
            button:{className:'hyper-btn-notoutline-danger'},
            closeOnClickOutside: false,
        });
    }
})
*/