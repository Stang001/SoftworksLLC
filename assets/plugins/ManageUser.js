const apiUrl = "https://6795a936aad755a134ec74bd.mockapi.io/KruArmFinalProject/users";

function fetchUsers() {
    $.get(apiUrl, function (users) {
        let rows = "";
        users.forEach(user => {
            rows += `
                <tr class="user-row" data-name="${user.username.toLowerCase()}">
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.points}</td>
                    <td>${user.role == 779 ? '<span class="text-danger">ผู้ดูแลระบบ</span>' : 'ผู้ใช้งาน'}</td>
                    <td>
                        <button class="btn btn-success btn-sm" type="button" data-toggle="modal" data-target="#editusermodal${user.id}">แก้ไข</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id},'${user.username}')">ลบ</button>
                                                <div class="modal fade" id="editusermodal${user.id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-hidden="true" style="display: none;">
                          <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content border-0 radius-border-2 hyper-bg-white">
                              <div class="modal-header hyper-bg-dark">
                                <h6 class="modal-title"><i class="fal fa-plus-square mr-1"></i> อัพเดทข้อมูล</h6>
                              </div>
                              <div class="modal-body text-center">
          
                                <form method="POST" enctype="multipart/form-data">
          
                                  <img src="../../assets/img/Honjou Nia Icons.jpeg" width="99px" class="img-fluid rounded-circle ml-auto mr-auto mb-2"><br>
                                  <font class="text-muted">Username</font>
                                  <h5><b>${user.username}</b></h5>
          
                                  <div class="input-group input-group-sm mb-3 mt-4">
                                    <div class="input-group-prepend">
                                      <span class="input-group-text hyper-bg-dark border-dark">E-mail</span>
                                    </div>
                                    <input id="email${user.id}" value="${user.email}" type="email" class="form-control form-control-sm hyper-form-control" placeholder="E-mail" required="">
                                  </div>
          
                                  <div class="input-group input-group-sm mb-3">
                                    <div class="input-group-prepend">
                                      <span class="input-group-text hyper-bg-dark border-dark">Point</span>
                                    </div>
                                    <input id="point${user.id}" value="${user.points}" type="number" class="form-control form-control-sm hyper-form-control" placeholder="Point" required="">
                                  </div>
          
                                  <div class="input-group input-group-sm">
                                    <div class="input-group-prepend">
                                      <label class="input-group-text hyper-bg-dark border-dark" for="inputGroupSelect01">ระดับผู้ใช้งาน</label>
                                    </div>
                                    <select id="role${user.id}" class="custom-select hyper-form-control">
                                      <option value="1" ${user.role === "1" ? "selected" : ""}>ผู้ใช้งาน</option>
                                      <option value="779" ${user.role === "779" ? "selected" : ""}>ผู้ดูแลระบบ</option>
                                    </select>
                                  </div>
          
                                  <button type="submit" id="updatedata${user.id}" class="d-none"></button>
                                </form>
          
                              </div>
                              <div class="modal-footer p-2 border-0">
                                <button type="button" onclick="updatedata(${user.id})" class="btn hyper-btn-notoutline-success"><i class="fal fa-plus-square mr-1"></i>อัพเดทข้อมูล</button>
                                <button type="button" class="btn hyper-btn-notoutline-danger" data-dismiss="modal"><i class="fad fa-times-circle mr-1"></i>ยกเลิก</button>
                              </div>
                            </div>
                          </div>
                        </div>
                    </td>
                </tr>`;
        });
        $("#userlistbody").html(rows);
    });
}

const filterStudents = () => {
    const query = document.getElementById("SearchUser").value.toLowerCase()
    const rows = document.querySelectorAll(".user-row")
    rows.forEach(row => {
        const name = row.dataset.name;
        row.style.display = name.includes(query) ? "" : "none";
    });
}

function deleteUser(id, param) {
    const token = localStorage.getItem("token");
    const result = verifyJWT(token, "mysecret");
    
    swal({
        title: `ต้องการลบผู้ใช้งานที่ ${id}?`,
        text: "ถ้าลบแล้วจะไม่สามารถกู้คืนได้",
        icon: "warning",
        buttons: ["ยกเลิก", "ลบผู้ใช้งาน"],
        dangerMode: true,
    }).then((confirm) => {
        if (confirm) {
            $.ajax({
                url: `${apiUrl}/${id}`,
                type: "DELETE",
                success: function () {
                    swal("ลบสำเร็จ", "ผู้ใช้ถูกลบแล้ว", "success");
                    fetchUsers();
                }
            });
            if (param === result.payload.username) {
                localStorage.removeItem("token");
                chktoken()
            }
        }
    });
}

function updatedata(id) {
  $.ajax({
    url: `${apiUrl}/${id}`,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify({
        email:document.getElementById(`email${id}`).value,
        points:document.getElementById(`point${id}`).value,
        role:document.getElementById(`role${id}`).value
    }),
    success: function () {
      swal("Successfully!", "อัพเดตข้อมูลผู้ใช้สำเร็จ!", "success", {
        button: { className: 'hyper-btn-notoutline-danger' },
        closeOnClickOutside: false,
        timer:2000,
      }).then(async()=>{
        window.location.reload()
      })
    }
});
}

$(document).ready(function () {
    fetchUsers();
});
