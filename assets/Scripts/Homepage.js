async function fetchHomepageData(){
    const AllUsersRequest = await fetch(API_URL)
    const AllUserjson=await(AllUsersRequest.json())
    const GameTypereq = await fetch(Game_Type_API);
    const games = await GameTypereq.json();
    const result = verifyJWT(localStorage.getItem("token"), "mysecret");
    const UserRequest = await(fetch(`${API_URL}/${(await result).payload.id}`))
    const LocalUser=await(UserRequest.json())
    document.getElementById("Pointshow").innerHTML=`<i class="fa-duotone fa-solid fa-wallet"></i>&nbsp;&nbsp;คงเหลือ : ${LocalUser.points}฿`
    $('#Usernameshow').text(LocalUser.username);
    $('#Emailshow').text(LocalUser.email);
    const GameDataReq=await fetch(Game_Data_API)
    const GameDatajson=await(GameDataReq.json())
    const GamepassReq=await fetch(GamePass_API)
    const Gamepassjson=await(GamepassReq.json())
    var result_totaldata=(Gamepassjson.length+GameDatajson.length)
    const reqselled=await getselled(1)
    const totaluser=document.getElementById('static_5')
    const totalgames=document.getElementById('static_7')
    const totaldata=document.getElementById("static_9")
    const totalselled=document.getElementById("static_8")
    const getgamepass = await fetch(GamePass_API)
    const gamepassjson=await(getgamepass.json())
    $('#gamepass_stockremaining').html(`0 หมวดหมู่&nbsp;&nbsp;&nbsp; ${gamepassjson.length} สินค้า`)
    $('#saleids_stockremaining').html(`${games.length} หมวดหมู่&nbsp;&nbsp;&nbsp;${GameDatajson.length} สินค้า`)
    totaluser.textContent=AllUserjson.length
    totalgames.textContent=games.length;
    totaldata.textContent=result_totaldata
    if(reqselled===null){
        totalselled.textContent="0"
    }else{
        totalselled.textContent=reqselled.length
    }

}
$(document).ready(function(){
    fetchHomepageData()
    setInterval(chktoken,2000)
})