const edit = document.getElementById("edit");
const deleteBtn = document.getElementById("delete");

const getData = () => {
  const data = localStorage.getItem("data");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const setData = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};

$("#exampleModal").on("hidden.bs.modal", function (e) {
    const data = getData();
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let dateFormat = day + "/" + month + "/" + year;
    let bold = $("#bold").css("font-weight");
  
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let time = hours + ":" + minutes + ":" + seconds;
  
    //valores dos inputs
    const title = $("#title").val();
    const subtitle = $("#subtitle").val();
    const conteunt = $("#content").val();
  
    $("#title").val("");
    $("#content").val("");
    $("#subtitle").val("");
  
    if (title === "" || subtitle === "" || content === "") return alert(`Fill in all the fields!`);
  
    data.push({ title, subtitle, content, dateFormat, bold, time });
  
    setData(data);
  
    if (title && subtitle && content) {
      $("#result").append(`
              <div class="card card-dinamic">
                <div class="card-header">
                  <h1 id="title">${title}</h1>
                  <h5 class="card-title" id="subtitle">${subtitle}</h5>
                </div>
                <div class="card-body">
                </div>
                <div class="card-body">
                  <span id="note">${content}</span>
                </div>
                <div class="card-footer flex-footer">
                  <span> <i class="ph-calendar"></i> <span id="date">${dateFormat} at ${time} </span> </span>
                </div>
                <div class="button-group">
                <button id="edit" onclick="editNote()">
              <i class="ph-pencil"></i> Edit
            </button>
  
            <button id="deleteNote"  type="button" class="btn btn-flex"  >
              <i class="ph-trash-simple"></i> Delete
            </button>
          </div>
              </div>
            `);
    }
  });

  const editNote = () => {
    let title = $("#title").text();
    let subtitle = $("#subtitle").text();
    let content = $("#note").text();
  
    $("#title").val(title);
    $("#subtitle").val(subtitle);
    $("#content").val(content);
  
    const modalEdit = document.createElement("div");
    modalEdit.classList.add("modal");
    modalEdit.id = "modalEdit";
    modalEdit.innerHTML = `
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">Edit note</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <div class="mb-3">
                      <label for="title" class="form-label">Title</label>
                      <input type="text" class="form-control" id="title" value="${title}">
                  </div>
                  <div class="mb-3">
                      <label for="subtitle" class="form-label">Subtitle</label>
                      <input type="text" class="form-control" id="subtitle" value="${subtitle}">
                  </div>
                  <div class="mb-3">
                      <label for="content" class="form-label">Content</label>
                      <textarea class="form-control" id="content" rows="3">${content}</textarea>
                  </div>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" id="save">Save</button>
              </div>
          </div>
      </div>
      `;
      document.body.appendChild(modalEdit);
      const modal = new bootstrap.Modal(modalEdit);
      modal.show();
    
      const save = document.getElementById("save");
      salve.addEventListener("click", () => {
        const data = getData();
        date.push({ title, subtitle, content, bold });
        setData(data);
        modal.hide();
      });
    
      modalEdit.addEventListener("hidden.bs.modal", () => {
        modalEdit.remove();
      });
    };
    
    $(document).ready(function () {
      $("#result").on("click", ".card-dinamic", function () {
        $(this).toggleClass("active");
      });
    });
    
    $("#result").on("click", "#deleteNote", function (e) {
      const data = getData();
      const index = $(this).parent().parent().index();
      data.splice(index, 1);
      setData(data);
      $(this).parent().parent().remove();
    });
    
    const modalclose = document.getElementById("modalclose");
    
    modalclose.addEventListener("click", () => {
      $("#exampleModal").modal("hide");
    });
    
    $(document).ready(function () {
      const data = getData();
      data.forEach((item) => {
        $("#result").append(`
                  <div class="card">
                    <div class="card-header">
                      <h1 id="title">${item.title}</h1>
    
                      <h5 class="card-title" id="subtitle">${item.subtitle}</h5>
                    </div>
    
                    <div class="card-body">
                        <span id="note">${item.content}</span>
                    </div>
                    <div class="card-footer flex-footer">
                        <span> <i class="ph-calendar"></i> <span id="date">${item.data} às ${item.time}</span> </span>
                    </div>
                    <div class="button-group">
              <button id="edit" onclick="editNote()">
                <i class="ph-pencil"></i> Edit
              </button>
    
              <button id="deleteNote" " type="button" class="btn btn-flex" >
                <i class="ph-trash-simple"></i> Delete
              </button>
            </div>
                  </div>
                `);
      });
    });
    
    $("#bold").click(function () {
      $("#content").css("font-weight", "bold");
    });
    
    $("#bold").dblclick(function () {
      $("#content").css("font-weight", "normal");
    });
    