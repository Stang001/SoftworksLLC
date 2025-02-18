/* Encode File name script.ty7j9lx.js */


/** Pay */
function Pay() {
    var  ref = $("#ref").val();
    swal({
          title: 'คุณต้องการทำรายการ',
          text: "ลิ้งซองของขวัญ\n"+ref,
          icon: "info",
          buttons: {
          confirm : {text:'ทำรายการ',className:'hyper-btn-notoutline-success'},
          cancel : 'ยกเลิก'
          },
          closeOnClickOutside:false,
    })
    .then((willDelete) => {
          if (willDelete) {
          $.ajax({

          type: "POST",
          url: "plugin/transaction.php",
          dataType: "json",
          data: {ref:ref},

          beforeSend: function() {
          swal("กำลังตรวจสอบรายการ กรุณารอสักครู่...",{button:false,closeOnClickOutside:false,timer:5000,});

          },

          success : function(data){
          setTimeout(function() {
                if (data.code == "200"){
                swal("ทำรายการ สำเร็จ!", "ระบบกำลังพาท่านไป...", "success",{button:false,closeOnClickOutside:false,});
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