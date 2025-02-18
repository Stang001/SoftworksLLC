/* Encode File name script.mn1w9ok.js */

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
    $("#imggamelogo"+id).click();
  }

  function submitdata(id) {
    $("#submitdata"+id).click();
  }

/* Additem script */
$("#addnewgame").submit(function(additem){
additem.preventDefault();

$.ajax({

    type: "POST",
    url: "plugin/add_new_game.php",
    data: new FormData(this),
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,

    beforeSend: function() {
    swal("กำลังเพิ่มเกม กรุณารอสักครู่...",{button:false,closeOnClickOutside:false,timer:1900,});

    },

    success : function(data){
    setTimeout(function() {
        if (data.code == "200"){
        swal("เพิ่มเกม สำเร็จ!", "ระบบกำลังบันทึกข้อมูล...", "success",{button:false,closeOnClickOutside:false,});
        setTimeout(function(){ window.location.reload();}, 2000);
        } else {
        swal(data.msg ,"" ,"error",{button:{className:'hyper-btn-notoutline-danger',},closeOnClickOutside:false,});
        }
    }, 2000);
    }

});

});

/** Delete Game */
function DelGame(id){
    var  id = id.value;
    swal({
    title: 'ต้องการลบเกมที่ ' + id,
    text: "ถ้าลบแล้วจำไม่สามารถกู้กลับมาได้ \n ข้อมูลของเกมนี้จะถูกลบทั้งหมด",
    icon: "warning",
    buttons: {
        confirm : {text:'ลบเกม',className:'hyper-btn-notoutline-danger'},
        cancel : 'ยกเลิก'
    },
    closeOnClickOutside:false,
    })
    .then((willDelete) => {
    if (willDelete) {
        $.ajax({

        type: "POST",
        url: "plugin/del_game.php",
        dataType: "json",
        data: {id:id},

        beforeSend: function() {
        swal("กำลังลบข้อมูล กรุณารอสักครู่...",{button:false,closeOnClickOutside:false,timer:1900,});

        },

        success : function(data){
        setTimeout(function() {
            if (data.code == "200"){
                swal("ลบเกม สำเร็จ!", "ระบบกำลังพาท่านไป...", "success",{button:false,closeOnClickOutside:false,});
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

/** Update Game */
function updatedata(id) {

    $("#updatedata" + id).submit();

    $("#updatedata" + id).submit(function(updategame){
    updategame.preventDefault();

    swal({
    title: 'ต้องการอัพเดทเกมที่ ' + id,
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
        var gid = id;
        var imagefile = $('#imggamelogo'+id)[0].files[0];
        var namegame = $('#nametxtgame'+id).val();
        updatedata.append('gid',gid);
        updatedata.append('img',imagefile);
        updatedata.append('name',namegame);

        $.ajax({

        type: "POST",
        url: "plugin/edit_game.php",
        dataType: "json",
        data: updatedata,
        cache: false,
        contentType: false,
        processData: false,

        beforeSend: function() {
            swal("กำลังอัพเดทเกม กรุณารอสักครู่...",{button:false,closeOnClickOutside:false,timer:1900,});

        },

        success : function(data){
            setTimeout(function() {
            if (data.code == "200"){
                swal("อัพเดทเกม สำเร็จ!", "ระบบกำลังบันทึกข้อมูล...", "success",{button:false,closeOnClickOutside:false,});
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