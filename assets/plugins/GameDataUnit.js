function submitdata(id) {
    $("#submitdata"+id).click();
}
async function fetchGameData() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("gameid") || 0;

    try {
        const users = await $.get(`${Game_Data_API}?game_id=${gameId}`); // รอผลลัพธ์จาก API ของผู้ใช้

        let rows = "";

        for (const user of users) {
            let cardtitle = "";

            rows += `
                <tr id="Datarow" role="row" data-name="${user.username}" class="odd">
                    <td class="sorting_1">${user.data_id}</td>
                    <td>${user.username}</td>
                    <td>${user.imageurl}</td>
                    <td>
                        <button class="btn btn-sm hyper-btn-notoutline-success" type="button" data-toggle="modal" data-target="#editdatamodal${user.data_id}">
                            <i class="fal fa-edit mr-1"></i> แก้ไข
                        </button>
                        <button onclick="DelData(${user.data_id})" value="${user.data_id}" class="btn btn-sm hyper-btn-notoutline-danger my-1 my-sm-0" type="button">
                            <i class="fal fa-trash-alt mr-1"></i> ลบ
                        </button>

                        <!-- Edit Game Data Modal -->
                        <div class="modal fade" id="editdatamodal${user.data_id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content border-0 radius-border-2 hyper-bg-white">
                                    <div class="modal-header hyper-bg-dark">
                                        <h6 class="modal-title">
                                            <i class="fal fa-plus-square mr-1"></i> แก้ไขข้อมูล
                                        </h6>
                                    </div>
                                    <div class="modal-body text-center">
                                        <form method="POST" enctype="multipart/form-data">
                                            <div class="input-group input-group-sm mb-3 mt-4">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text hyper-bg-dark border-dark">ชื่อผู้ใช้งาน</span>
                                                </div>
                                                <input id="username${user.data_id}" type="text" value="${user.username}" class="form-control form-control-sm hyper-form-control" placeholder="ชื่อผู้ใช้งาน" required="" autocomplete="off">
                                            </div>

                                            <div class="input-group input-group-sm mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text hyper-bg-dark border-dark">รหัสผ่าน</span>
                                                </div>
                                                <input id="password${user.data_id}" type="text" value="${atob(user.password)}" class="form-control form-control-sm hyper-form-control" placeholder="รหัสผ่าน" required="" autocomplete="off">
                                            </div>

                                            <div class="input-group input-group-sm mb-3">
                                                <div class="input-group-prepend">
                                                    <label class="input-group-text hyper-bg-dark border-dark" for="inputGroupSelect01">ลิ้งรูป</label>
                                                </div>
                                                <input id="imageurl${user.data_id}" type="text" value="${user.imageurl}" class="form-control form-control-sm hyper-form-control" placeholder="รหัสผ่าน" required="" autocomplete="off">
                                            </div>

                                            <div class="input-group input-group-sm">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text hyper-bg-dark border-dark">รายละเอียด</span>
                                                </div>
                                                <textarea id="detail${user.data_id}" class="form-control form-control-sm hyper-form-control" style="height: 100px;min-height: 100px;max-height: 100px;">${user.detail}</textarea>
                                            </div>

                                            <input type="hidden" id="gameid${user.data_id}" value="${user.game_id}">

                                          
                                        </form>
                                    </div>
                                    <div class="modal-footer p-2 border-0">
                                        <button type="button" id="updatedata${user.data_id}" onclick="updatedata(${user.data_id})" class="btn hyper-btn-notoutline-success">
                                            <i class="fal fa-plus-square mr-1"></i>อัพเดทข้อมูล
                                        </button>
                                        <button type="button" class="btn hyper-btn-notoutline-danger" data-dismiss="modal">
                                            <i class="fad fa-times-circle mr-1"></i>ยกเลิก
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>`;
        }

        // อัปเดต HTML หลังจากสร้างแถวทั้งหมดแล้ว
        $("#GameDataList").html(rows);
    } catch (error) {
        console.error("Error:", error); // ถ้ามีข้อผิดพลาด
    }
}

$(document).ready(async()=>{
    fetchGameData();
})
/* AddData script */
$("#addDatanew").submit(async(adddata)=>{
adddata.preventDefault();
let username = document.getElementById("usernamenew").value.trim();
let password = document.getElementById("passwordnew").value.trim();
let cardId = document.getElementById("imageurlnew").value;
let detail = document.getElementById("detailnew").value.trim() || "";
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get("gameid") || 0;
if (!username) {
    swal("ใส่ username", "", "warning", {
        button: { className: 'hyper-btn-notoutline-danger' },
        closeOnClickOutside: false,
      });
    return;
}
if (!password) {
    swal("ใส่รหัสผ่าน", "", "warning", {
        button: { className: 'hyper-btn-notoutline-danger' },
        closeOnClickOutside: false,
      });
    return;
}
if (!cardId || cardId === "0") {
    swal("เลือกการ์ด", "", "warning", {
        button: { className: 'hyper-btn-notoutline-danger' },
        closeOnClickOutside: false,
      });
    return;
}
let data = {
    game_id: gameId,
    imageurl: cardId,
    username: username,
    password: btoa(password),
    detail: detail
};
try {
    $.ajax({
        type: "POST",
        url: Game_Data_API,
        dataType: "json",
        data:data,
        beforeSend: function() {
          swal("กำลังเพิ่มข้อมูล กรุณารอสักครู่...", { button: false, closeOnClickOutside: false, timer: 1900 });
        },
        success: function(data) {
          setTimeout(function() {
            swal("Successfully !", "เพิ่มข้อมูลสำเร็จ !", "success", {
              button: { className: 'hyper-btn-notoutline-danger' },
              closeOnClickOutside: false,
            });
            setTimeout(function() { window.location.reload(); }, 2000);
          }, 2000);
        },
        error: function(xhr, status, error) {
          console.log("Error:", error);
          swal("เพิ่มข้อมูลไม่สำเร็จ", "", "error", {
            button: { className: 'hyper-btn-notoutline-danger' },
            closeOnClickOutside: false,
          });
        }
      });
} catch (error) {
    console.error("Error:", error);
    alert("ไม่สามารถเพิ่มข้อมูลได้");
}
});

const filterGameData = () => {
    const query = document.getElementById("GameDataSearch").value.toLowerCase()
    const rows = document.querySelectorAll("#Datarow")
    rows.forEach(row => {
        const name = row.dataset.name;
        row.style.display = name.includes(query) ? "" : "none";
    });
}

function DelData(id){
swal({
  title: 'ต้องการลบข้อมูลที่ ' + id,
  text: "ถ้าลบแล้วจำไม่สามารถกู้กลับมาได้",
  icon: "warning",
  buttons: {
    confirm : {text:'ลบข้อมูล',className:'hyper-btn-notoutline-danger'},
    cancel : 'ยกเลิก'
  },
  closeOnClickOutside:false,
})
.then((willDelete) => {
  if (willDelete) {
    $.ajax({
        type: "DELETE",
        url: `${Game_Data_API}/${id}`,
        dataType: "json",
        beforeSend: function() {
          swal("กำลังลบข้อมูล กรุณารอสักครู่...", { button: false, closeOnClickOutside: false, timer: 1900 });
        },
        success: function(data) {
          setTimeout(function() {
            swal("Successfully !", "ลบข้อมูลสำเร็จ !", "success", {
              button: { className: 'hyper-btn-notoutline-danger' },
              closeOnClickOutside: false,
            });
            setTimeout(function() { window.location.reload(); }, 2000);
          }, 2000);
        },
        error: function(xhr, status, error) {
          console.log("Error:", error);
          swal("ลบข้อมูลไม่สำเร็จ", "", "error", {
            button: { className: 'hyper-btn-notoutline-danger' },
            closeOnClickOutside: false,
          });
        }
      });
      
  }
});
}

function updatedata(id) {
    swal({
      title: 'ต้องการอัพเดทข้อมูลที่ ' + id,
      text: "คุณต้องการอัพเดทข้อมูลใช่หรือไม่",
      icon: "info",
      buttons: {
        confirm: { text: 'อัพเดท', className: 'hyper-btn-notoutline-success' },
        cancel: 'ยกเลิก'
      },
      closeOnClickOutside: false,
    })
    .then((willUpdate) => {
      if (willUpdate) {
        var username = $('#username' + id).val().trim();
        var password = $('#password' + id).val().trim();
        var cid = $('#imageurl' + id).val();
        var detail = $('#detail' + id).val().trim();
        var gid = $('#gameid' + id).val();
  
        if (!username || !password || !cid || cid === "0") {
          swal("กรุณากรอกข้อมูลให้ครบ", "", "warning", {
            button: { className: 'hyper-btn-notoutline-danger' },
            closeOnClickOutside: false,
          });
          return;
        }
        var updatedData = {
          data_id: id,
          username: username,
          password: btoa(password),
          imageurl: cid,
          detail: detail,
          gameid: gid
        };

        $.ajax({
          type: "PUT",
          url: `${Game_Data_API}/${id}`,
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(updatedData),
          beforeSend: function() {
            swal("กำลังอัพเดทข้อมูล กรุณารอสักครู่...", { button: false, closeOnClickOutside: false, timer: 1900 });
          },
          success: function(data) {
            setTimeout(function() {
              swal("อัพเดทข้อมูล สำเร็จ!", "ข้อมูลได้รับการบันทึกเรียบร้อย", "success", {
                button: false,
                closeOnClickOutside: false,
              });
              setTimeout(function() { window.location.reload(); }, 2000);
            }, 2000);
          },
          error: function(xhr, status, error) {
            console.log("Error:", error);
            swal("อัพเดทข้อมูลไม่สำเร็จ !", "", "error", {
              button: { className: 'hyper-btn-notoutline-danger' },
              closeOnClickOutside: false,
            });
          }
        });
      }
    });
}
