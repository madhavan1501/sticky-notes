const addbtn = document.querySelector(".addbtn");
const container = document.querySelector(".container");

addbtn.addEventListener("click", create_new_sticky);

function create_new_sticky() {
  const obj = {
    id: Math.floor(Math.random() * 10000),
    value: "",
  };
  const textelement = create_sticky(obj.value, obj.id);
  const div = document.createElement("div");
  const delbtn = document.createElement("button");
  div.appendChild(delbtn);
  div.appendChild(textelement);
  container.insertBefore(div, addbtn);
  div.classList.add("box");
  delbtn.classList.add("delbtn");
  delbtn.innerText = "x";
  delbtn.addEventListener("click", () => {
    container.removeChild(div);
    remove_sticky(obj.id);
  });
  const new_obj = getobj();
  new_obj.push(obj);
  localStorage.setItem("sticky-notes", JSON.stringify(new_obj)); //creating the key value in the local storage only for the first time
}


function create_sticky(value, id) {
  const sticky_note = document.createElement("textarea");
  sticky_note.classList.add("sticky");
  sticky_note.placeholder = "Add Note!";
  sticky_note.value = value;
  sticky_note.addEventListener("change", () => {
    update_note(sticky_note.value, id);
  });
  return sticky_note;
}


function getobj() {       // Returning array of objects from local storage 
  return JSON.parse(localStorage.getItem("sticky-notes") || "[]");
}

getobj().forEach((element) => {  //displaying the old data

  const textelement = create_sticky(element.value, element.id);
  const div = document.createElement("div");
  const delbtn = document.createElement("button");
  div.appendChild(delbtn);
  div.appendChild(textelement);
  container.insertBefore(div, addbtn);
  div.classList.add("box");
  delbtn.classList.add("delbtn");
  delbtn.innerText = "x";
  delbtn.addEventListener("click", () => {
    container.removeChild(div);
    remove_sticky(element.id);
  });
});


function update_note(value, id) {
  const old_obj = getobj();
  const obj = old_obj.filter((element) => id == element.id)[0];
  obj.value = value;
  localStorage.setItem("sticky-notes", JSON.stringify(old_obj));
}


function remove_sticky(id) {
  const obj = getobj().filter((element) => id != element.id);
  localStorage.setItem("sticky-notes", JSON.stringify(obj));
}

























