async function showuser() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("gameid") || 0;
    const response = await fetch(`${Game_Data_API}?game_id=${gameId}`);
    const response2 = await fetch(`${Game_Type_API}?game_id=${gameId}`);
    const games = await response.json();
    const gametypejson = await response2.json();
    const gameContainer = document.getElementById("list-product");
    $('#currentgamepage').html(`<i class="fa-duotone fa-solid fa-layer-group"></i>&nbsp;&nbsp;${gametypejson[0].game_name}`)
    gameContainer.innerHTML = "";
    games.forEach(game => {
        gameContainer.innerHTML += `
            <a class="product-item-md product-filter" href="./SaleIds_product.html?dataid=${game.data_id}&gamename=${gametypejson[0].game_name}" style="text-decoration: none; ">
                <div class="product-v1 bg-light">
                    <img class="product-img" src="${game.imageurl}">
                    <div class="view-label d-flex justify-content-center align-items-center p-2 px-4">
                        <h6 class="m-0">ดูรายละเอียด</h6>
                    </div>
                    <div class="px-2 m-0">
                        <h5 class="product-name text-theme text-left m-0 ">${game.username}</h5>
                        <p class="product-price text-main text-center m-0 mb-1 ">
                            ${game.price}฿ </p>
                        <div class="btn btn-main text-center w-100" style="border-radius: 10px;">
                            สั่งซื้อ&nbsp;&nbsp;<i class="fa-duotone fa-solid fa-cart-shopping"></i>
                        </div>
                        <p class="text-theme text-center m-0 mt-1" style="font-size: 12px;">&nbsp;</p>
                    </div>
                </div>
            </a>
        `;
    });
}
$(document).ready(function() {
    showuser();
    setInterval(chktoken,2000)
});