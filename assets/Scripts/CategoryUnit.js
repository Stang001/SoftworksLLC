async function fetchcategorydata(){
    const GameTypereq = await fetch(Game_Type_API);
    const games = await GameTypereq.json();
    const getgamepass = await fetch(GamePass_API)
    const gamepassjson=await(getgamepass.json())
    const getgameda=await(fetch(Game_Data_API))
    const GameDatajson=await(getgameda.json())
    $('#gamepass_stockremaining').html(`0 หมวดหมู่&nbsp;&nbsp;&nbsp; ${gamepassjson.length} สินค้า`)
    $('#saleids_stockremaining').html(`${games.length} หมวดหมู่&nbsp;&nbsp;&nbsp;${GameDatajson.length} สินค้า`)
}
$(document).ready(function(){
    fetchcategorydata()
    setInterval(chktoken,2000)
})