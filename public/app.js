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
    const newTitle = prompt("Enter new title", "").trim();
    if (newTitle !== null && newTitle !== "") {
      const id = event.target.dataset.id;
      edit(id, newTitle).then(() => {
        const old = event.target.closest("li").innerText.split("\n")[0];
        event.target.closest("li").innerHTML = event.target
          .closest("li")
          .innerHTML.replace(old, newTitle);
      });
    }
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
