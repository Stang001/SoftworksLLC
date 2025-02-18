async function FetchNavbarData(){
    if(!localStorage.getItem('token')){return}
    const result = verifyJWT(localStorage.getItem("token"), "mysecret");
    const UserRequest = await(fetch(`${API_URL}/${(await result).payload.id}`))
    const LocalUser=await(UserRequest.json())
    document.getElementById("Pointshow").innerHTML=`<i class="fa-duotone fa-solid fa-wallet"></i>&nbsp;&nbsp;คงเหลือ : ${LocalUser.points}฿`
    $('#Usernameshow').text(LocalUser.username);
    $('#Emailshow').text(LocalUser.email);
}
$(document).ready(function(){
    FetchNavbarData()
})