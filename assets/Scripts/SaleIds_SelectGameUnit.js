async function showselectgame() {
    const response = await fetch(Game_Type_API);
    const games = await response.json();
    const gameContainer = document.getElementById("list-product");
    gameContainer.innerHTML = "";
    games.forEach(async(game) => {
        const idremainingreq=await fetch(`${Game_Data_API}?game_id=${game.game_id}`)
        var idremainingjson=await(idremainingreq.json())
        if(idremainingjson==="Not found"){
            idremainingjson=""
        }
        gameContainer.innerHTML += `
            <a id="gametyperows" gamename=${game.game_name} class="product-item-md product-filter" href="./SaleIds_showIds.html?gameid=${game.game_id}" style="text-decoration: none; ">
                <div class="product-v1 bg-light">
                    <img class="product-img " src="${game.game_iconurl}">
                    <div class="view-label d-flex justify-content-center align-items-center p-2 px-4">
                        <h6 class="m-0">ดูรายละเอียด</h6>
                    </div>
                    <div class="px-2 m-0">
                        <h5 class="product-name text-theme text-left m-0 ">${game.game_name}</h5>
                        <p class="text-theme text-center m-0 mt-1" style="font-size: 12px;">
                            <i class="fa-duotone fa-solid fa-box-circle-check"></i>&nbsp;&nbsp;คงเหลือ ${idremainingjson.length} ชิ้น
                        </p>
                    </div>
                </div>
            </a>
        `;
    });
}
function Search_gametype() {
    const query = document.getElementById("search-bar-product").value.trim().toLowerCase().replace(/\s+/g, " ");
    const rows = document.querySelectorAll("#gametyperows");

    rows.forEach(row => {
        const name = row.getAttribute("gamename").trim().toLowerCase().replace(/\s+/g, " ");
        console.log(name)
        const regex = new RegExp(query.split(" ").join(".*"), "i");

        row.style.display = regex.test(name) ? "" : "none";
    });
}


$(document).ready(function() {
    showselectgame();
    setInterval(chktoken,2000)
});