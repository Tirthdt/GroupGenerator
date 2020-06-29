const names = [];
const groupA = [];
const groupB = [];
document.querySelector("button").addEventListener("click", (e) => {
  const name = document.querySelector("#first_name").value;
  if (name === "") {
    alert("Please enter name");
  } else {
    if (names.length < 8) {
      document.querySelector("#first_name").value = "";
      names.push(name);
      document.querySelector("#names").innerHTML += `
        <tr><td style='text-align: center'>${name}</td><td><button id='${name}' class="btn red" onclick='deleteName(event)'>Delete</button></td></tr>
      `;
    }
    if (names.length == 8) {
      generateGroup();
      document.querySelector("form").style.display = "none";
      document.querySelector("table").style.display = "none";
      let htmlA = ``;
      groupA.forEach((player) => {
        htmlA += `<p style='text-align: center'>${player}</p>`;
      });
      let htmlB = ``;
      groupB.forEach((player) => {
        htmlB += `<p style='text-align: center'>${player}</p>`;
      });
      document.querySelector(".groupA").innerHTML += htmlA;
      document.querySelector(".groupB").innerHTML += htmlB;
      document.querySelector(".res").style.display = "block";
    }
  }
  e.preventDefault();
});

function generateGroup() {
  while (groupA.length != 4 || groupB.length != 4) {
    const groupNo = Number(Math.floor(Math.random() * 2));
    if (groupNo == 0) {
      const PlayerNo = Math.floor(Math.random() * names.length);
      groupA.push(names[PlayerNo]);
      names.splice(PlayerNo, 1);
      if (groupA.length == 4) {
        names.forEach((name) => {
          groupB.push(name);
        });
      }
    } else {
      const PlayerNo = Math.floor(Math.random() * names.length);
      groupB.push(names[PlayerNo]);
      names.splice(PlayerNo, 1);
      if (groupB.length == 4) {
        names.forEach((name) => {
          groupA.push(name);
        });
      }
    }
  }
}

function deleteName(ev) {
  const id = ev.target.id;
  const NameIndex = names.indexOf(id);
  names.splice(NameIndex, 1);
  ev.target.parentElement.parentElement.remove();
  ev.preventDefault();
}
