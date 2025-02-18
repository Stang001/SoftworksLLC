async function fetchdata(){
    const AllUsersRequest = await fetch(API_URL)
    const AllUserjson=await(AllUsersRequest.json())
    const response = await fetch(Game_Type_API);
    const games = await response.json();
    const reqselled=await getselled(1)
    const totaluser=document.getElementById('static_5')
    const totalgames=document.getElementById('static_7')
    const totaldata=document.getElementById("static_9")
    const totalselled=document.getElementById("static_8")
    const GameDataReq=await fetch(Game_Data_API)
    const GameDatajson=await(GameDataReq.json())
    const GamepassReq=await fetch(GamePass_API)
    const Gamepassjson=await(GamepassReq.json())
    var result_totaldata=(Gamepassjson.length+GameDatajson.length)
    const getgamepass = await fetch(GamePass_API)
    const gamepassjson=await(getgamepass.json())
    $('#gamepass_stockremaining').html(`0 หมวดหมู่&nbsp;&nbsp;&nbsp; ${gamepassjson.length} สินค้า`)
    $('#saleids_stockremaining').html(`${games.length} หมวดหมู่&nbsp;&nbsp;&nbsp;${GameDatajson.length} สินค้า`)
    totaluser.textContent=AllUserjson.length
    totalgames.textContent=games.length;
    totaldata.textContent=result_totaldata
    if(reqselled===null){
        totalselled.innerHTML=0
    }else{
        totalselled.innerHTML=reqselled.length
    }
}
fetchdata()