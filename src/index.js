"use strict";

const getAllSection = document.querySelector("#getAllSection");
const nameOutputSection = document.querySelector("#nameOutputSection");
const nameInput = document.querySelector("#nameInput");
const getButton = document.querySelector("#getButton");
const toastBody = document.querySelector("#createToast > div.toast-body");
const formNameUpdate = document.querySelector("#plantNameUpdate");
const potSizeUpdate = document.querySelector("#potSizeUpdate");
const leafColourUpdate = document.querySelector("#leafColourUpdate");
const leafColourUpdateOption1 = document.querySelector(
  "#leafColourUpdate > option:nth-child(1)"
);
const leafColourUpdateOption2 = document.querySelector(
  "#leafColourUpdate > option:nth-child(2)"
);
const imgUrlUpdate = document.querySelector("#imageUrlUpdate");
const isSucculentUpdate = document.querySelector("#isSucculentUpdate");

function deletePlant(id) {
  axios
    .delete(`http://localhost:8080/deletePlant/${id}`)
    .then((response) => {
      getAllPlants();
    })
    .catch((error) => console.log(error));
}

function updatePlant(plant) {
  console.log(plant.leafColour);
  formNameUpdate.setAttribute("value", plant.name);
  potSizeUpdate.setAttribute("value", plant.potSize);
  if (plant.leafColour === "Green") {
    leafColourUpdateOption1.setAttribute("selected", true);
  } else {
    leafColourUpdateOption2.setAttribute("selected", true);
  }
  leafColourUpdate.setAttribute("value", plant.leafColour);
  imgUrlUpdate.setAttribute("value", plant.imgUrl);
  if (plant.isSucculent === true) {
    isSucculentUpdate.setAttribute("checked", true);
  } else {
    isSucculentUpdate.removeAttribute("checked");
  }

  document
    .querySelector("#myModal > div > div > div.modal-body > form")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      const form = e.target;

      const updateData = {
        name: form.name.value,
        potSize: form.potSize.value,
        leafColour: form.leafColour.value,
        isSucculent: form.isSucculent.checked,
        imgUrl: form.imageUrl.value,
      };

      axios
        .put(`http://localhost:8080/updatePlant/${plant.id}`, updateData)
        .then((response) => {
          getAllPlants();
        })
        .catch((error) => console.log(error));
    });
}

function setupPlant(plant) {
  let newPlant = document.createElement("div");
  newPlant.className = "card";
  newPlant.setAttribute("style", `min-width: 300px`);
  let buttonDiv = document.createElement("div");
  buttonDiv.className = "buttons";
  let updateButton = document.createElement("button");
  updateButton.className = "updateButton";
  updateButton.setAttribute("data-bs-toggle", `modal`);
  updateButton.setAttribute("data-bs-target", `#myModal`);
  updateButton.innerHTML = `<i class="far fa-edit"></i>`;
  updateButton.addEventListener("click", () => updatePlant(plant));
  buttonDiv.appendChild(updateButton);
  let deleteButton = document.createElement("button");
  deleteButton.className = "deleteButton";
  deleteButton.innerHTML = `<i class="far fa-trash-alt"></i>`;
  deleteButton.addEventListener("click", () => deletePlant(plant.id));
  buttonDiv.appendChild(deleteButton);
  newPlant.appendChild(buttonDiv);
  let nameElement = document.createElement("h3");
  nameElement.classList.add("plantName", "card-title");
  nameElement.textContent = `${plant.name}`;
  newPlant.appendChild(nameElement);
  let imageElement = document.createElement("img");
  imageElement.setAttribute("src", `${plant.imgUrl}`);
  imageElement.setAttribute("alt", `No image provided`);
  newPlant.appendChild(imageElement);
  let potSizeElement = document.createElement("p");
  potSizeElement.textContent = `Pot Size: ${plant.potSize}cm`;
  newPlant.appendChild(potSizeElement);
  let leafColourElement = document.createElement("p");
  leafColourElement.textContent = `Leaf Colour: ${plant.leafColour}`;
  newPlant.appendChild(leafColourElement);
  if (plant.isSucculent === true) {
    let isSucculentElement = document.createElement("div");
    isSucculentElement.className = "tags";
    isSucculentElement.textContent = `Succulent`;
    newPlant.appendChild(isSucculentElement);
  } else {
    let isSucculentElement = document.createElement("div");
    isSucculentElement.className = "noTags";
    newPlant.appendChild(isSucculentElement);
  }

  return newPlant;
}

function setUpSearchReturn(plant) {
  let newPlant = document.createElement("div");
  newPlant.className = "card row g-0";
  newPlant.setAttribute("style", `min-width: 300px`);
  let cardBreak1 = document.createElement("div");
  cardBreak1.className = "col-md-6";
  let nameElement = document.createElement("h3");
  nameElement.classList.add("plantName", "card-title");
  nameElement.textContent = `${plant.name}`;
  cardBreak1.appendChild(nameElement);
  let imageElement = document.createElement("img");
  imageElement.setAttribute("src", `${plant.imgUrl}`);
  imageElement.setAttribute("alt", `No image provided`);
  cardBreak1.appendChild(imageElement);
  newPlant.appendChild(cardBreak1);
  let cardBreak = document.createElement("div");
  cardBreak.className = "col-md-6";
  let potSizeElement = document.createElement("p");
  potSizeElement.textContent = `Pot Size: ${plant.potSize}cm`;
  cardBreak.appendChild(potSizeElement);
  let leafColourElement = document.createElement("p");
  leafColourElement.textContent = `Leaf Colour: ${plant.leafColour}`;
  cardBreak.appendChild(leafColourElement);
  if (plant.isSucculent === true) {
    let isSucculentElement = document.createElement("div");
    isSucculentElement.className = "tags";
    isSucculentElement.textContent = `Succulent`;
    cardBreak.appendChild(isSucculentElement);
  } else {
    let isSucculentElement = document.createElement("div");
    isSucculentElement.className = "noTags";
    cardBreak.appendChild(isSucculentElement);
  }
  newPlant.appendChild(cardBreak);
  let buttonDiv = document.createElement("div");
  buttonDiv.className = "buttons";
  let updateButton = document.createElement("button");
  updateButton.className = "updateButton";
  updateButton.setAttribute("data-bs-toggle", `modal`);
  updateButton.setAttribute("data-bs-target", `#myModal`);
  updateButton.innerHTML = `<i class="far fa-edit"></i>`;
  updateButton.addEventListener("click", () => updatePlant(plant));
  buttonDiv.appendChild(updateButton);
  let deleteButton = document.createElement("button");
  deleteButton.className = "deleteButton";
  deleteButton.innerHTML = `<i class="far fa-trash-alt"></i>`;
  deleteButton.addEventListener("click", () => deletePlant(plant.id));
  buttonDiv.appendChild(deleteButton);
  newPlant.appendChild(buttonDiv);

  return newPlant;
}

function getByName() {
  axios
    .get(`http://localhost:8080/getByName/${nameInput.value}`)
    .then((response) => {
      console.log(response);
      const plant = response.data;
      nameOutputSection.innerHTML = "";
      nameOutputSection.appendChild(setUpSearchReturn(plant));
    })
    .catch((error) => console.log(error));
}

function createToast() {
  const toastHTMLElement = document.getElementById("createToast");
  const toastElement = new bootstrap.Toast(toastHTMLElement);
  toastElement.show();
}

//Get Plant by name on click of button
getButton.addEventListener("click", getByName);

const getAllPlants = () => {
  axios
    .get("http://localhost:8080/getPlants")
    .then((response) => {
      getAllSection.innerHTML = "";
      const plants = response.data;
      plants.forEach((plant) => {
        getAllSection.appendChild(setupPlant(plant));
      });
    })
    .catch((error) => console.log(error));
};

document
  .querySelector("#createPlantSection > form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
      name: form.name.value,
      potSize: form.potSize.value,
      leafColour: form.leafColour.value,
      isSucculent: form.isSucculent.checked,
      imgUrl: form.imageUrl.value,
    };

    axios
      .post("http://localhost:8080/createPlant", data)
      .then((response) => {
        getAllSection.appendChild(setupPlant(response.data));
        toastBody.innerText = `${response.data.name} created!`;
        createToast();
        form.reset();
        form.name.focus();
      })
      .catch((error) => {
        console.log(error);
        alert("This plant already exists");
      });
  });

getAllPlants();
