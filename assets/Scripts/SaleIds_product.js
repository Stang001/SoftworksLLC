async function fetchproductdata(){
    const urlParams = new URLSearchParams(window.location.search);
    const gamepassId = urlParams.get("dataid") || 0;
    const gamename = urlParams.get('gamename') || "game"
    const gamepassrequest = await fetch(`${Game_Data_API}?data_id=${gamepassId}`)
    const gamepassjson=await(gamepassrequest.json())
    $("#currentgamepage").html(`<i class="fa-duotone fa-solid fa-layer-group"></i>&nbsp;&nbsp;${gamename}&nbsp;<i class="fa-duotone fa-solid fa-angle-right" style="font-size: small;"></i>&nbsp;`)
    $('#currentidpage').html(`<i class="fa-duotone fa-solid fa-bag-shopping"></i>&nbsp;&nbsp;${gamepassjson[0].username}`)
    $('#username').text(gamepassjson[0].username)
    $('#image').attr('src',`${gamepassjson[0].imageurl}`)
    $('#price').text(gamepassjson[0].price+'฿')
    $('#remaining').text(`มีสินค้าทั้งหมด ${gamepassjson.length} ชิ้น`)
    $('#details').text(gamepassjson[0].detail)
    const ftdt="footerdata_"
    $('#'+ftdt+'productname').html(`ชื่อสินค้า :&nbsp;${gamepassjson[0].username}`)
    $('#'+ftdt+'remaining').html(`จำนวนคงเหลือ :&nbsp;${gamepassjson.length} ชิ้น`)
    $('#'+ftdt+'selled').html(`ยอดขาย :&nbsp;${gamepassjson[0].selled} ชิ้น`)
}
$(document).ready(function(){
    fetchproductdata()
    setInterval(chktoken,2000)
})
$('#shop-buy').click(async()=>{
    swal("Purchase system not available", "ขี้เกียจทำระบบ Purchase กับ buyhistory ครับครู", "info", {
        button: {
            className: 'hyper-btn-notoutline-danger'
        },
        closeOnClickOutside: false,
    });
})