async function fetchGamesType() {
    const response = await fetch(Game_Type_API);
    const games = await response.json();
    const gameContainer = document.getElementById("GameTypelist");
    gameContainer.innerHTML = "";
    if (games.length === 0) {
        gameContainer.innerHTML = "<h4 class='text-center w-100 mt-4'>ไม่มีข้อมูลในขณะนี้</h4>";
        return;
    }
    games.forEach(async(game) => {
        const idamoutreq=await(fetch(`${Game_Data_API}?game_id=${game.game_id}`))
        const idamoutjson=await(idamoutreq.json())
        gameContainer.innerHTML += `
                <div class="col-6 col-lg-4 p-2">
                    <a href="./DataUnit.html?gameid=${game.game_id}">
                        <div class="card shadow-dark radius-border-6 hyper-bg-white text-center p-2 h-100 hyper-card">
                            <div class="media">
                                <img src="${game.game_iconurl}" class="align-self-center mr-3 rounded-circle d-none d-md-block" width="70px;">
                                <div class="media-body text-center text-md-left">
                                    <img src="${game.game_iconurl}" class="ml-auto mr-auto rounded-circle d-block d-md-none" width="70px;">
                                    <h4 class="mt-0 mb-1">${game.game_name}</h4>
                                    <font class="text-muted">${idamoutjson.length} ไอดี</font>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
        `;
    });
}
$(document).ready(function() {
    fetchGamesType();
});