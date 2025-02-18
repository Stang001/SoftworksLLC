async function fetchproductdata(){
    const urlParams = new URLSearchParams(window.location.search);
    const gamepassId = urlParams.get("gamepassid") || 0;
    const gamepassrequest = await fetch(`${GamePass_API}?id=${gamepassId}`)
    const gamepassjson=await(gamepassrequest.json())
    console.log(gamepassjson.name)
    $('#currentgamepasspage').html(`<i class="fa-duotone fa-solid fa-bag-shopping"></i>&nbsp;&nbsp;${gamepassjson[0].name}`)
    $('#gamepassname').text(gamepassjson[0].name)
    $('#gamepassimage').attr('src',`../../assets/img/gamepass/${gamepassjson[0].image}`)
    $('#price').text(gamepassjson[0].price+'฿')
    $('#gamepassremaining').text(`มีสินค้าทั้งหมด ${gamepassjson[0].remaining} ชิ้น`)
    $('#gamepassdetails').text(gamepassjson[0].details)
    const ftdt="footerdata_"
    $('#'+ftdt+'productname').html(`ชื่อสินค้า :&nbsp;${gamepassjson[0].name}`)
    $('#'+ftdt+'remaining').html(`จำนวนคงเหลือ :&nbsp;${gamepassjson[0].remaining} ชิ้น`)
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