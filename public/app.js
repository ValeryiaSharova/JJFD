document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const title = event.target.closest("li").querySelector("span").innerText;
    event.target.closest("li").innerHTML = `
      <input name="title" value="${title}" id="update" type="text" class="form-control" style="width: fit-content" required />
      <div>
      <button class="btn btn-success m-1" data-type="save" data-id="${id}">Save</button>
      <button class="btn btn-danger" data-type="cancel" data-id="${id}">Cancel</button>
      </div>
    `;
  }
});

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "save") {
    const id = event.target.dataset.id;
    const newTitle = document.querySelector("#update").value;
    edit(id, newTitle).then(() => {
      event.target.closest("li").innerHTML = `
      <span>${newTitle}</span>
      <div>
        <button
          class="btn btn-primary"
          data-type="edit"
          data-id="${id}"
        >
          Update
        </button>
        <button
          class="btn btn-danger"
          data-type="remove"
          data-id="${id}"
        >
          &times;
        </button>
      </div>
      `;
    });
  }
});

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "cancel") {
    const id = event.target.dataset.id;
    const newTitle = document.querySelector("#update").value;
    event.target.closest("li").innerHTML = `
      ${newTitle}
      <div>
        <button
          class="btn btn-primary"
          data-type="edit"
          data-id="${id}"
        >
          Update
        </button>
        <button
          class="btn btn-danger"
          data-type="remove"
          data-id="${id}"
        >
          &times;
        </button>
      </div>
      `;
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, updatedTitle) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: updatedTitle }),
  });
}
