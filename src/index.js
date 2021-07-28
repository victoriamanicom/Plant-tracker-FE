"use strict";

const getAllSection = document.querySelector("#getAllSection");

function deletePlant(id) {
  axios
    .delete(`http://localhost:8080/deletePlant/${id}`)
    .then((response) => {
      getAllPlants();
    })
    .catch((error) => console.log(error));
}

function setupPlant(plant) {
  let newPlant = document.createElement("div");
  newPlant.className = "card";
  newPlant.setAttribute("style", `min-width: 300px`);
  let buttonDiv = document.createElement("div");
  buttonDiv.className = "buttons";
  let updateButton = document.createElement("button");
  updateButton.className = "updateButton";
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
  nameElement.setAttribute("class", `plant-name`);
  nameElement.textContent = `${plant.name}`;
  newPlant.appendChild(nameElement);
  let imageElement = document.createElement("img");
  imageElement.setAttribute("src", `${plant.imgUrl}`);
  newPlant.appendChild(imageElement);
  let potSizeElement = document.createElement("p");
  potSizeElement.textContent = `Pot Size: ${plant.potSize}cm`;
  newPlant.appendChild(potSizeElement);
  let leafColourElement = document.createElement("p");
  leafColourElement.textContent = `Leaf Colour: ${plant.leafColour}`;
  newPlant.appendChild(leafColourElement);
  let isSucculentElement = document.createElement("p");
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

getAllPlants();
