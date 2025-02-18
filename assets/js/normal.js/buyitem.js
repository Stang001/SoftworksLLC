/* Encode File name script.yt6j3ab.js */

function BuyItem(id){

    var id = id.value;

    swal({
    title: 'ต้องการซื้อสินค้านี้หรือไม่',
    text: 'สินค้า '+$('#title'+id).html()+'\n'+ $('#price'+id).html(),
    icon: "info",
    buttons: {
      confirm : {text:'ซื้อสินค้า',className:'hyper-btn-notoutline-success'},
      cancel : 'ยกเลิก'
    },
    closeOnClickOutside:false,
    })
    .then((willDelete) => {
      if (willDelete) {

        $.ajax({
  
              type: "POST",
              url: "plugin/buyitem.php",
              dataType: "json",
              data: {id:id},

              beforeSend: function() {
              swal("กำลังซื้อสินค้า กรุณารอสักครู่...",{button:false,closeOnClickOutside:false,timer:1900,});

              },

              success : function(data){
              setTimeout(function() {
                  if (data.code == "200"){
                      swal("ซื้อสินค้า สำเร็จ!", "ระบบกำลังพาท่านไป...", "success",{button:false,closeOnClickOutside:false,});
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