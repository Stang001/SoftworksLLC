async function fetchGames() {
    const response = await fetch(Game_Type_API);
    const games = await response.json();
    displayGames(games);
}
function NewgameTXTprev(){
    document.getElementById("gamenamenew").textContent=document.getElementById("nametxtgamenew").value.trim();
}
function txtgamepreview(id) {
    var gameName = document.getElementById(`nametxtgame${id}`).value.trim();
    document.getElementById(`gamename${id}`).textContent = gameName;
}
function imgprev(id){
    var image = document.getElementById(`gamelogoimg${id}`)
    var placeidinput = document.getElementById(`placeIdInput${id}`).value.trim()
    fetchGameIcon(image,placeidinput)
}

function displayGames(games) {
    const gameContainer = document.getElementById("gameList");
    gameContainer.innerHTML = "";
    if (games.length === 0) {
        gameContainer.innerHTML = "<h4 class='text-center w-100 mt-4'>ไม่มีข้อมูลในขณะนี้</h4>";
        return;
    }
    games.forEach(game => {
        gameContainer.innerHTML += `
          <div class="col-6 col-lg-4 p-2">
              <div class="card shadow-dark radius-border-6 hyper-bg-white text-center p-2 h-100 hyper-card">
                  <div class="media mb-2">
                      <img src="${game.game_iconurl}" class="align-self-center mr-3 rounded-circle d-none d-md-block" width="70px;">
                      <div class="media-body text-center text-md-left">
                        <img src="${game.game_iconurl}" class="ml-auto mr-auto rounded-circle d-block d-md-none" width="70px;">
                        <h4 class="mt-0 mb-1">${game.game_name}</h4>
                        <font class="text-muted">0 ไอดี</font>
                      </div>
                  </div>
                    <button class="btn btn-sm hyper-btn-info mt-3" type="button" data-toggle="modal" data-target="#editgamemodal${game.game_id}"><i class="fal fa-edit mr-1"></i> แก้ไข</button>
                    <button class="btn btn-sm hyper-btn-notoutline-danger mt-2" onclick="deleteGame(${game.game_id})" type="button"><i class="fal fa-trash-alt mr-1"></i> ลบ</button>
              </div>
          </div>

          <div class="modal fade" id="editgamemodal${game.game_id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content border-0 radius-border-2 hyper-bg-white">
                <div class="modal-header hyper-bg-dark">
                  <h6 class="modal-title"><i class="fal fa-plus-square mr-1"></i> อัพเดท</h6>
                </div>
                <div class="modal-body text-center">
    
                  <!-- Card Example -->
                  <div class="media m-auto">
                    <img id="gamelogoimg${game.game_id}" src="${game.game_iconurl}" class="align-self-center mr-3 rounded-circle d-none d-md-block" width="70px;">
                    <div class="media-body text-center text-md-left">
                      <img id="gamelogoresimg${game.game_id}" src="${game.game_iconurl}" class="ml-auto mr-auto rounded-circle d-block d-md-none" width="70px;">
                      <h4 class="mt-0 mb-1" id="gamename${game.game_id}">${game.game_name}</h4>
                      <font class="text-muted">แนะนำขนาด 120 x 120 Pixel</font>
                    </div>
                  </div>
                  <!-- End Card Example -->
    
                  <form id="updategame${game.game_id}" method="POST" enctype="multipart/form-data">
    
                    <div class="input-group mb-2 mt-4">
                      <div class="input-group-prepend">
                        <span class="input-group-text hyper-bg-dark border-dark"><i class="fal fa-gamepad-alt"></i></span>
                      </div>
                      <input id="nametxtgame${game.game_id}" onkeyup="txtgamepreview(${game.game_id})" maxlength="32" type="text" value="${game.game_name}" class="form-control form-control-sm hyper-form-control" placeholder="ชื่อเกม" required autocomplete="off">
                    </div>
                  <div class="input-group mb-2 mt-4">
                    <div class="input-group-prepend">
                      <span class="input-group-text hyper-bg-dark border-dark"><i class="fas fa-globe-asia"></i></span>
                    </div>
                    <input id="placeIdInput${game.game_id}" type="text" class="form-control form-control-sm hyper-form-control" placeholder="ใส่ Place ID ของเกม" oninput="imgprev(${game.game_id})" required autocomplete="off">
                  </div>
                    <button type="submit" class="d-none"></button>
                  </form>
    
                </div> 
                <div class="modal-footer p-2 border-0">
                  <button type="button" onclick="editGame('${game.game_id}')" class="btn hyper-btn-notoutline-success"><i class="fal fa-plus-square mr-1"></i>อัพเดท</button>
                  <button type="button" class="btn hyper-btn-notoutline-danger" data-dismiss="modal"><i class="fad fa-times-circle mr-1"></i>ยกเลิก</button>
                </div>
              </div>
            </div>
          </div>
        `;
    });
}

// เพิ่มเกมใหม่
async function addGame(event) {
    event.preventDefault();
    const name = document.getElementById("nametxtgamenew").value.trim(); // รับชื่อเกมที่กรอก
    const game_icon = document.getElementById("gamelogoimgnew").src;
    if (!name) {
        swal("เกิดข้อผิดพลาด !", "กรุณาใส่ชื่อเกม", "error", {
            button:{className:'hyper-btn-notoutline-danger'},
            closeOnClickOutside: false,
        });
        return;
    }
    const response = await fetch(Game_Type_API);
    const games = await response.json();
    const isGameNameExist = games.some(game => game.game_name.toLowerCase() === name.toLowerCase());

    if (isGameNameExist) {
        swal("เกิดข้อผิดพลาด !", "Name Already Exists", "error", {
            button:{className:'hyper-btn-notoutline-danger'},
            closeOnClickOutside: false,
        });
        return;
    }

    const addResponse = await fetch(Game_Type_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game_name: name, game_iconurl: game_icon })
    });
    if (addResponse.ok) {
        swal("เพิ่มเกม สำเร็จ !", "FetchingDisplay . . .", "success", {
            button:{className:'hyper-btn-notoutline-danger'},
            closeOnClickOutside: false,
        })
        setTimeout(function(){ 
            window.location.reload()
        },2000)
        fetchGames();
    }
}


// ลบเกม
async function deleteGame(id) {
    swal({
        title: 'ต้องการลบเกมที่ ' + id,
        text: "ถ้าลบแล้วจำไม่สามารถกู้กลับมาได้ \n ข้อมูลของเกมนี้จะถูกลบทั้งหมด",
        icon: "warning",
        buttons: {
          confirm : {text:'ลบเกม',className:'hyper-btn-notoutline-danger'},
          cancel : 'ยกเลิก'
        },
        closeOnClickOutside:false,
    }).then(async (confirm) => {
        if (confirm) {
            await fetch(`${Game_Type_API}/${id}`, { method: "DELETE" });
            swal("Deleted !", `ลบเกมที่ ${id} สำเร็จ`, "success", {
                button:true,
                closeOnClickOutside: false,
            });
            fetchGames();
        }
    });
}

// อัปเดตเกม
async function editGame(id) {
    var gamename = document.getElementById(`nametxtgame${id}`).value.trim();
    var iconurl = document.getElementById(`gamelogoimg${id}`).src
    if (!gamename||!iconurl) return;
    await fetch(`${Game_Type_API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game_name:gamename, game_iconurl:iconurl })
    });
    
    swal("แก้ไข สำเร็จ !", `แก้ไขข้อมูลเกมที่ ${id} สำเร็จ`, "success", {
        button:true,
        closeOnClickOutside: false,
    });
    setTimeout(function(){ 
        window.location.reload()
    },1000)
    fetchGames();
}

async function fetchGameIcon(element,placeId) {
    if (!placeId) {
        return;
    }

    try {
        // ดึง UniverseId จาก PlaceId
        let universeResponse = await fetch(`https://corsproxy.io/https://apis.roblox.com/universes/v1/places/${placeId}/universe`);

        let universeData = await universeResponse.json();

        let universeId = universeData.universeId;
        let iconResponse = await fetch(`https://corsproxy.io/?https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&size=150x150&format=Png&isCircular=false`);
        if(iconResponse.status==400){
            swal("Bad Response!", "กรุณากรอก PlaceId ที่ถูกต้อง", "error", {
                button:{className:'hyper-btn-notoutline-danger'},
                closeOnClickOutside: false,
            });
            return;
        }
        let iconData = await iconResponse.json();

        if (!iconData.data || iconData.data.length === 0 || !iconData.data[0].imageUrl) {
            return;
        }

        let gameIconUrl = iconData.data[0].imageUrl;
        let gameIconImg = element
        gameIconImg.src = gameIconUrl;
        gameIconImg.style.display = "block";
    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
    }
}
document.getElementById("placeIdInput").addEventListener("input",function(arg){
    var elem1 = document.getElementById("gamelogoimgnew")
    fetchGameIcon(elem1,document.getElementById("placeIdInput").value.trim())
})
document.getElementById("addgamesubmit").addEventListener("click",addGame)
fetchGames()

