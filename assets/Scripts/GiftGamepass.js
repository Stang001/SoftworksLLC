async function fetchGamePass() {
    const response = await fetch(GamePass_API);
    const games = await response.json();
    const gameContainer = document.getElementById("list-product");
    gameContainer.innerHTML = "";
    games.forEach(game => {
        gameContainer.innerHTML += `
            <a id="gamepassrow" gamepassname=${game.name} class="product-item-md product-filter" href="./GiftGamepass_product.html?gamepassid=${game.id}" style="text-decoration: none; ">
                <div class="product-v1 bg-light">
                    <img class="product-img " src="../../assets/img/gamepass/${game.image}">
                    <div class="view-label d-flex justify-content-center align-items-center p-2 px-4">
                        <h6 class="m-0">ดูรายละเอียด</h6>
                    </div>
                    <div class="px-2 m-0">
                        <h5 class="product-name text-theme text-left m-0 ">${game.name}</h5>
                        <p class="product-price text-main text-center m-0 mb-1 ">
                            ${game.price}฿ </p>
                        <div class="btn btn-main text-center w-100" style="border-radius: 10px;">
                            สั่งซื้อ&nbsp;&nbsp;<i class="fa-duotone fa-solid fa-cart-shopping"></i>
                        </div>
                        <p class="text-theme text-center m-0 mt-1" style="font-size: 12px;">
                            <i class="fa-duotone fa-solid fa-box-circle-check"></i>&nbsp;&nbsp;คงเหลือ ${game.remaining} ชิ้น
                        </p>
                    </div>
                </div>
            </a>
        `;
    });
}
function Search_Product() {
    const query = document.getElementById("search-bar-product").value.trim().toLowerCase().replace(/\s+/g, " ");
    const rows = document.querySelectorAll("#gamepassrow");

    rows.forEach(row => {
        const name = row.getAttribute("gamepassname")?.trim().toLowerCase().replace(/\s+/g, " ") || "";
        const regex = new RegExp(query.split(" ").join(".*"), "i");
        row.style.display = regex.test(name) ? "" : "none";
    });
}

$(document).ready(function() {
    fetchGamePass();
    setInterval(chktoken,2000)
});