/* Encode File name script.lp4r6hz.js */

function gamelogoURL(input,id) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#gamelogoimg'+id).attr('src', e.target.result);
        $('#gamelogoresimg'+id).attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
      
    }
  }

  function txtgamepreview(input,id) {
    if(input.value){
      var text = input.value;
    }else{
      var text = "GAMENAME";
    }
    $("#gamename"+id).html(text);
  }

  function uploadgamelogo(id) {
    $("#logo"+id).click();
  }

  function submitdata(id) {
    $("#submitdata"+id).click();
  }

  function bannerURL(input,id) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#bannerimg'+id).attr('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
    
  }
  } 

  function uploadbanner(id) {
    $("#imgbanner"+id).click();
  }

  /** Delete Card Image */
  function DelImage(id){
    var  id = id.value;
    swal({
      title: 'ต้องการลบรูปภาพนี้',
      text: "ถ้าลบแล้วจำไม่สามารถกู้กลับมาได้",
      icon: "warning",
      buttons: {
        confirm : {text:'ลบรูปภาพ',className:'hyper-btn-notoutline-danger'},
        cancel : 'ยกเลิก'
      },
      closeOnClickOutside:false,
    })
    .then((willDelete) => {
      if (willDelete) {
        $.ajax({

          type: "POST",
          url: "plugin/del_slide_image.php",
          dataType: "json",
          data: {id:id},

          beforeSend: function() {
          swal("กำลังลบข้อมูล กรุณารอสักครู่...",{button:false,closeOnClickOutside:false,timer:1900,});

          },

          success : function(data){
          setTimeout(function() {
              if (data.code == "200"){
                  swal("ลบรูปภาพ สำเร็จ!", "ระบบกำลังพาท่านไป...", "success",{button:false,closeOnClickOutside:false,});
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

  /* Add bannerimg script */
  $("#addbannerimg").submit(function(additem){
  additem.preventDefault();

  $.ajax({

  type: "POST",
  url: "plugin/add_new_slide.php",
  data: new FormData(this),
  dataType: "json",
  cache: false,
  contentType: false,
  processData: false,

  beforeSend: function() {
    swal("กำลังเพิ่มรูปภาพ กรุณารอสักครู่...",{button:false,closeOnClickOutside:false,timer:1900,});

  },

  success : function(data){
    setTimeout(function() {
      if (data.code == "200"){
        swal("เพิ่มรูปภาพ สำเร็จ!", "ระบบกำลังบันทึกข้อมูล...", "success",{button:false,closeOnClickOutside:false,});
        setTimeout(function(){ window.location.reload();}, 2000);
      } else {
        swal(data.msg ,"" ,"error",{button:{className:'hyper-btn-notoutline-danger',},closeOnClickOutside:false,});
      }
    }, 2000);
  }

  });

  });


  /** Update Config */
  function updatedata(id) {

  $("#updatedata" + id).submit();

  $("#updatedata" + id).submit(function(updategame){
    updategame.preventDefault();

    swal({
    title: 'ต้องการอัพเดทเว็บไซต์',
    text: "คุณต้องการอัพเดทข้อมูลใช่หรือไม่",
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
        var imagefile = $('#logo')[0].files[0];
        var name = $('#name').val();
        var facebook = $('#facebook').val();
        var open = $('#open').val();
        var detail = $('#detail').val();

        updatedata.append('img',imagefile);
        updatedata.append('name',name);
        updatedata.append('facebook',facebook);
        updatedata.append('open',open);
        updatedata.append('detail',detail);

        $.ajax({

        type: "POST",
        url: "plugin/edit_web.php",
        dataType: "json",
        data: updatedata,
        cache: false,
        contentType: false,
        processData: false,

        beforeSend: function() {
          swal("กำลังอัพเดทเว็บไซต์ กรุณารอสักครู่...",{button:false,closeOnClickOutside:false,timer:1900,});

        },

        success : function(data){
          setTimeout(function() {
            if (data.code == "200"){
              swal("อัพเดทเว็บไซต์ สำเร็จ!", "ระบบกำลังบันทึกข้อมูล...", "success",{button:false,closeOnClickOutside:false,});
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
