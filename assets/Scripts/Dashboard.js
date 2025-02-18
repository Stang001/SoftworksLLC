async function fetchdata(){
    const gametypereq = await fetch(Game_Type_API);
    const games = await gametypereq.json();
    const allusersreq=await fetch(API_URL);
    const userss=await allusersreq.json()
    const notsellreq=await(fetch(`${Game_Data_API}`))
    const notselljson=await(notsellreq.json())
    const selledreq=await(fetch(`${Game_Data_API}?selled=1`))
    const selledjson=await(selledreq.json())
    document.getElementById("allgametype").textContent = games.length;
    document.getElementById("allusers").textContent=userss.length;
    document.getElementById("IdsReadytosell").textContent=notselljson.length
    document.getElementById("IdSelled").textContent=selledjson.length
}

setInterval(fetchdata,1000)