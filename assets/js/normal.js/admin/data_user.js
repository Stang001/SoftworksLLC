/* Encode File name script.nj9o5th.js */

/** Delete Data */
function DelUser(id){
    var  id = id.value;
    swal({
      title: 'ต้องการลบผู้ใช้งานที่ ' + id,
      text: "ถ้าลบแล้วจำไม่สามารถกู้กลับมาได้",
      icon: "warning",
      buttons: {
        confirm : {text:'ลบผู้ใช้งาน',className:'hyper-btn-notoutline-danger'},
        cancel : 'ยกเลิก'
      },
      closeOnClickOutside:false,
    })
    .then((willDelete) => {
      if (willDelete) {
        $.ajax({

          type: "POST",
          url: "plugin/del_user.php",
          dataType: "json",
          data: {id:id},

          beforeSend: function() {
          swal("กำลังลบข้อมูล กรุณารอสักครู่...",{button:false,closeOnClickOutside:false,timer:1900,});

          },

          success : function(data){
          setTimeout(function() {
              if (data.code == "200"){
                  swal("ลบผู้ใช้งาน สำเร็จ!", "ระบบกำลังพาท่านไป...", "success",{button:false,closeOnClickOutside:false,});
                  setTimeout(function(){ window.location.reload();}, 2000);
              } else {
                  swal(data.msg ,"" ,"error",{button:{className:'hyper-btn-notoutline-danger',},closeOnClickOutside:false,});
              }
          }, 2000);
          }

        });
      }
    });
}



/** Update Data */
function updatedata(id) {

$("#updatedata" + id).submit();

$("#updatedata" + id).submit(function(updateData){
updateData.preventDefault();

swal({
title: 'ต้องการอัพเดทผู้ใช้งาน',
text: "คุณต้องการอัพเดทผู้ใช้งานใช่หรือไม่",
icon: "info",
buttons: {
  confirm : {text:'อัพเดท',className:'hyper-btn-notoutline-success'},
  cancel : 'ยกเลิก'
},
closeOnClickOutside:false,
})
.then((willDelete) => {
  if (willDelete) {

    var updatedata = new FormData();
    var uid = id;
    var point = $('#point'+id).val();
    var email = $('#email'+id).val();
    var role = $('#role'+id).val();

    updatedata.append('user_id',uid);
    updatedata.append('point',point);
    updatedata.append('email',email);
    updatedata.append('role',role);

    $.ajax({

    type: "POST",
    url: "plugin/edit_user.php",
    dataType: "json",
    data: updatedata,
    cache: false,
    contentType: false,
    processData: false,

    beforeSend: function() {
      swal("กำลังอัพเดทข้อมูล กรุณารอสักครู่...",{button:false,closeOnClickOutside:false,timer:1900,});

    },

    success : function(data){
      setTimeout(function() {
        if (data.code == "200"){
          swal("อัพเดทผู้ใช้งาน สำเร็จ!", "ระบบกำลังบันทึกข้อมูล...", "success",{button:false,closeOnClickOutside:false,});
          setTimeout(function(){ window.location.reload();}, 2000);
        } else {
          swal(data.msg ,"" ,"error",{button:{className:'hyper-btn-notoutline-danger',},closeOnClickOutside:false,});
        }
      }, 2000);
    }

    });

  }
});

});
}