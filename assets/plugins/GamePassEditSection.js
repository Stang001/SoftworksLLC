function submitdata(id) {
  $("#submitdata" + id).click();
}
async function loadGamepassEditData(param) {
  try {
      const response = await fetch('../../assets/JSON/Gamepass.json');
      const data = await response.json();
      const dropdown = document.getElementById('card' + param);
      data.forEach(item => {
          let option = document.createElement('option');
          option.value = item.image;
          option.textContent = item.name;
          dropdown.appendChild(option);
      });
      dropdown.addEventListener('change', function() {
          const selectedImage = this.value;
          const imgElement = document.getElementById('gamepassEditImage'+param);
          imgElement.src = selectedImage ? `../../assets/img/gamepass/${selectedImage}` : ''; // ใส่ path ของโฟลเดอร์ภาพ
      });

  } catch (error) {
      console.error('โหลด JSON ไม่ได้:', error);
  }
}
async function fetchGameData() {
  try {
      const users = await $.get(GamePass_API);
      let rows = "";
      for (const user of users) {
          let cardtitle = "";
          rows += `
<tr id="Datarow" role="row" data-name="${user.name}" class="odd">
<td class="sorting_1">${user.id}</td>
<td>${user.name}</td>
<td>${user.price}</td> 
<td>${user.image}</td> 
<td>${user.remaining}</td> 
<td>
    <button class="btn btn-sm hyper-btn-notoutline-success" type="button" data-toggle="modal" data-target="#editdatamodal${user.id}">
        <i class="fal fa-edit mr-1"></i> แก้ไข
    </button>
    <button onclick="DelData(${user.id})" value="${user.id}" class="btn btn-sm hyper-btn-notoutline-danger my-1 my-sm-0" type="button">
        <i class="fal fa-trash-alt mr-1"></i> ลบ
    </button>

    <!-- Edit Game Data Modal -->
    <div class="modal fade" id="editdatamodal${user.id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-hidden="true">
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
                                <span class="input-group-text hyper-bg-dark border-dark">ชื่อ</span>
                            </div>
                            <input id="gamepassname${user.id}" type="text" value="${user.name}" class="form-control form-control-sm hyper-form-control" placeholder="ชื่อ" required="" autocomplete="off">
                        </div>

                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text hyper-bg-dark border-dark">ราคา</span>
                            </div>
                            <input id="gamepassprice${user.id}" type="number" value="${user.price}" class="form-control form-control-sm hyper-form-control" placeholder="ราคา" required="" autocomplete="off">
                        </div>

                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text hyper-bg-dark border-dark" for="inputGroupSelect01">เลือกการ์ด</label>
                            </div>
                            <select class="custom-select hyper-form-control" onchange="loadGamepassEditData(${user.id})" id="card${user.id}">
                                <option selected="" value="${user.image}">${user.image}</option>
                            </select>
                        </div>
                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text hyper-bg-dark border-dark">คงเหลือ</span>
                            </div>
                            <input id="remaining${user.id}" type="number" value="${user.remaining}" class="form-control form-control-sm hyper-form-control" placeholder="คงเหลือ" required="" autocomplete="off">
                        </div>

                        <div class="input-group input-group-sm">
                            <div class="input-group-prepend">
                                <span class="input-group-text hyper-bg-dark border-dark">รายละเอียด</span>
                            </div>
                            <textarea id="detail${user.id}" class="form-control form-control-sm hyper-form-control" style="height: 100px;min-height: 100px;max-height: 100px;">${user.details}</textarea>
                        </div>
                         <div id="EditimageContainer">
                                      <img id="gamepassEditImage${user.id}" src="../../assets/img/gamepass/${user.image}" alt="เลือก Gamepass" style="max-width: 200px; margin-top: 10px;">
                                  </div>                         
                        <input type="hidden" id="gameid${user.id}" value="${user.id}">

                      
                    </form>
                </div>
                <div class="modal-footer p-2 border-0">
                    <button type="button" id="updatedata${user.id}" onclick="updatedata(${user.id})" class="btn hyper-btn-notoutline-success">
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
loadGamepassEditData(user.id)
      }
      $("#GameDataList").html(rows);

  } catch (error) {
      console.error("Error:", error);
  }
}

$(document).ready(async () => {
  fetchGameData();
})

$("#addDatanew").submit(async (adddata) => {
  adddata.preventDefault();
  let gamepassname = document.getElementById("gamepassname").value.trim();
  let gamepassprice = document.getElementById("price").value.trim();
  let remaining = document.getElementById("remaining").value.trim();
  let cardId = document.getElementById("cardnew").value;
  let detail = document.getElementById("detailnew").value.trim() || "";
  if (!gamepassname) {
      swal("ใส่ gamepassname", "", "warning", {
          button: {
              className: 'hyper-btn-notoutline-danger'
          },
          closeOnClickOutside: false,
      });
      return;
  }
  if (!gamepassprice) {
      swal("ใส่ชื่อเกมพาส", "", "warning", {
          button: {
              className: 'hyper-btn-notoutline-danger'
          },
          closeOnClickOutside: false,
      });
      return;
  }
  if (!cardId || cardId === "0") {
      swal("เลือกการ์ด", "", "warning", {
          button: {
              className: 'hyper-btn-notoutline-danger'
          },
          closeOnClickOutside: false,
      });
      return;
  }
  let data = {
      name: gamepassname,
      price: gamepassprice,
      image: cardId,
      remaining: remaining,
      details: detail,
      selled:0
  };
  try {
      $.ajax({
          type: "POST",
          url: GamePass_API,
          dataType: "json",
          data: data,
          beforeSend: function() {
              swal("กำลังเพิ่มข้อมูล กรุณารอสักครู่...", {
                  button: false,
                  closeOnClickOutside: false,
                  timer: 1900
              });
          },
          success: function(data) {
              setTimeout(function() {
                  swal("Successfully !", "เพิ่มข้อมูลสำเร็จ !", "success", {
                      button: {
                          className: 'hyper-btn-notoutline-danger'
                      },
                      closeOnClickOutside: false,
                  });
                  setTimeout(function() {
                      window.location.reload();
                  }, 2000);
              }, 2000);
          },
          error: function(xhr, status, error) {
              console.log("Error:", error);
              swal("เพิ่มข้อมูลไม่สำเร็จ", "", "error", {
                  button: {
                      className: 'hyper-btn-notoutline-danger'
                  },
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

function DelData(id) {
  swal({
          title: 'ต้องการลบข้อมูลที่ ' + id,
          text: "ถ้าลบแล้วจำไม่สามารถกู้กลับมาได้",
          icon: "warning",
          buttons: {
              confirm: {
                  text: 'ลบข้อมูล',
                  className: 'hyper-btn-notoutline-danger'
              },
              cancel: 'ยกเลิก'
          },
          closeOnClickOutside: false,
      })
      .then((willDelete) => {
          if (willDelete) {
              $.ajax({
                  type: "DELETE",
                  url: `${GamePass_API}/${id}`,
                  dataType: "json",
                  beforeSend: function() {
                      swal("กำลังลบข้อมูล กรุณารอสักครู่...", {
                          button: false,
                          closeOnClickOutside: false,
                          timer: 1900
                      });
                  },
                  success: function(data) {
                      setTimeout(function() {
                          swal("Successfully !", "ลบข้อมูลสำเร็จ !", "success", {
                              button: {
                                  className: 'hyper-btn-notoutline-danger'
                              },
                              closeOnClickOutside: false,
                          });
                          setTimeout(function() {
                              window.location.reload();
                          }, 2000);
                      }, 2000);
                  },
                  error: function(xhr, status, error) {
                      console.log("Error:", error);
                      swal("ลบข้อมูลไม่สำเร็จ", "", "error", {
                          button: {
                              className: 'hyper-btn-notoutline-danger'
                          },
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
              confirm: {
                  text: 'อัพเดท',
                  className: 'hyper-btn-notoutline-success'
              },
              cancel: 'ยกเลิก'
          },
          closeOnClickOutside: false,
      })
      .then((willUpdate) => {
          if (willUpdate) {
              var gamepassname = $('#gamepassname' + id).val().trim();
              var gamepassprice = $('#gamepassprice' + id).val().trim();
              var cid = $('#card' + id).val();
              var remaining = $("#remaining" + id).val();
              var detail = $('#detail' + id).val().trim();
              console.log(gamepassname,gamepassprice,cid,remaining,detail)
              if (!gamepassname || !gamepassprice || !cid || cid === "0" || !remaining) {
                  swal("กรุณากรอกข้อมูลให้ครบ", "", "warning", {
                      button: {
                          className: 'hyper-btn-notoutline-danger'
                      },
                      closeOnClickOutside: false,
                  });
                  return;
              }
              var updatedData = {
                  name: gamepassname,
                  price: gamepassprice,
                  image: cid,
                  remaining: remaining,
                  details: detail
              };

              $.ajax({
                  type: "PUT",
                  url: `${GamePass_API}/${id}`,
                  dataType: "json",
                  contentType: "application/json",
                  data: JSON.stringify(updatedData),
                  beforeSend: function() {
                      swal("กำลังอัพเดทข้อมูล กรุณารอสักครู่...", {
                          button: false,
                          closeOnClickOutside: false,
                          timer: 1900
                      });
                  },
                  success: function(data) {
                      setTimeout(function() {
                          swal("อัพเดทข้อมูล สำเร็จ!", "ข้อมูลได้รับการบันทึกเรียบร้อย", "success", {
                              button: false,
                              closeOnClickOutside: false,
                          });
                          setTimeout(function() {
                              window.location.reload();
                          }, 2000);
                      }, 2000);
                  },
                  error: function(xhr, status, error) {
                      console.log("Error:", error);
                      swal("อัพเดทข้อมูลไม่สำเร็จ !", "", "error", {
                          button: {
                              className: 'hyper-btn-notoutline-danger'
                          },
                          closeOnClickOutside: false,
                      });
                  }
              });
          }
      });
}