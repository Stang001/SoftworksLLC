/* Encode File name script.bj7y8kg.js */



function gamecardURL(input,id) {
if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
    $('#gamecardimg'+id).attr('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
    
}
}

function uploadcardgame(id) {
    $("#imggamecard"+id).click();
}

function submitdata(id) {
    $("#submitdata"+id).click();
}

/* Additem script */
    $("#addgamecard").submit(function(additem){
    additem.preventDefault();

    $.ajax({

    type: "POST",
    url: "plugin/add_new_card.php",
    data: new FormData(this),
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,

    beforeSend: function() {
        swal("กำลังเพิ่มการ์ดแสดงสินค้า กรุณารอสักครู่...",{button:false,closeOnClickOutside:false,timer:1900,});

    },

    success : function(data){
        setTimeout(function() {
        if (data.code == "200"){
            swal("เพิ่มการ์ดแสดงสินค้า สำเร็จ!", "ระบบกำลังบันทึกข้อมูล...", "success",{button:false,closeOnClickOutside:false,});
            setTimeout(function(){ window.location.reload();}, 2000);
        } else {
            swal(data.msg ,"" ,"error",{button:{className:'hyper-btn-notoutline-danger',},closeOnClickOutside:false,});
        }
        }, 2000);
    }

    });

    });



    /** Update Card */
    function updatedata(id) {

    $("#updatedata" + id).submit();

    $("#updatedata" + id).submit(function(updategame){
    updategame.preventDefault();

    swal({
    title: 'ต้องการอัพเดทการ์ดที่ ' + id,
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
        var cid = id;
        var imagefile = $('#imggamecard'+id)[0].files[0];
        var name = $('#title'+id).val();
        var price = $('#price'+id).val();
        var detail = $('#detail'+id).val();
        updatedata.append('cid',cid);
        updatedata.append('img',imagefile);
        updatedata.append('title',name);
        updatedata.append('price',price);
        updatedata.append('detail',detail);

        $.ajax({

        type: "POST",
        url: "plugin/edit_card.php",
        dataType: "json",
        data: updatedata,
        cache: false,
        contentType: false,
        processData: false,

        beforeSend: function() {
            swal("กำลังอัพเดทการ์ดแสดงสินค้า กรุณารอสักครู่...",{button:false,closeOnClickOutside:false,timer:1900,});

        },

        success : function(data){
            setTimeout(function() {
            if (data.code == "200"){
                swal("อัพเดทการ์ดแสดงสินค้า สำเร็จ!", "ระบบกำลังบันทึกข้อมูล...", "success",{button:false,closeOnClickOutside:false,});
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
        url: "plugin/del_card_image.php",
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

    /** Delete Card */
    function DelCard(id){
    var  id = id.value;
    swal({
    title: 'ต้องการลบการ์ดนี้',
    text: "ถ้าลบแล้วจำไม่สามารถกู้กลับมาได้",
    icon: "warning",
    buttons: {
        confirm : {text:'ลบการ์ด',className:'hyper-btn-notoutline-danger'},
        cancel : 'ยกเลิก'
    },
    closeOnClickOutside:false,
    })
    .then((willDelete) => {
    if (willDelete) {
        $.ajax({

        type: "POST",
        url: "plugin/del_card.php",
        dataType: "json",
        data: {id:id},

        beforeSend: function() {
        swal("กำลังลบข้อมูล กรุณารอสักครู่...",{button:false,closeOnClickOutside:false,timer:1900,});

        },

        success : function(data){
        setTimeout(function() {
            if (data.code == "200"){
                swal("ลบการ์ด สำเร็จ!", "ระบบกำลังพาท่านไป...", "success",{button:false,closeOnClickOutside:false,});
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