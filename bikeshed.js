const bikeList = [];

function validate(bike) {
  if(bike.name.length === 0) {
    return 'Cyklen skal have et navn!';
  }
  for(let i = 0; i < bikeList.length; i++) {
    const entry = bikeList[i];
    if(entry.name === bike.name) {
      return 'Cykel findes allerede i listen!'
    }
  }
  return '';
}

function createErrorMessage(message) {
  document.getElementById('fejl');
  fejl.innerHTML = message;
}

function removeBike(bikeName) {
  for(let i = 0; i < bikeList.length; i++) {
    const entry = bikeList[i];
    if(entry.name === bikeName) {
      bikeList.splice(i, 1);
      updateBikes();
      return;
    }
  }
}

function createDeleteLink(bike) {
  const deleteLink = document.createElement('a');
  const deleteText = document.createTextNode('X ');
  deleteLink.appendChild(deleteText);
  deleteLink.addEventListener('click', () => {
    removeBike(bike.name);
  });
  return deleteLink;
}

function createBikeElement(bike) {
  const listItem = document.createElement('li');
  const bikeText = document.createTextNode(bike.name + '  - ' + bike.gears + ' gears');
  listItem.appendChild(createDeleteLink(bike));
  listItem.appendChild(bikeText);
  return listItem;
}

function updateBikes() {
  const listContainer = document.getElementById('cykelListe');
  listContainer.innerHTML = '';
  bikeList.forEach(entry => {
    const bikeElement = createBikeElement(entry);
    listContainer.appendChild(bikeElement);
  });
}


function addBike(event) {
  event.preventDefault();
  const nameField = document.getElementById('navn');
  const gearField = document.getElementById('gear');
  const name = nameField.value;
  const gears = gearField.value;
  const bike = {
    name: name,
    gears: gears
  };
  const validationMessage = validate(bike);
  createErrorMessage(validationMessage);
  if(validationMessage) {
    return;
  }
  bikeList.push(bike);
  updateBikes();
  
  nameField.value = '';
  gearField.value = '1'
  nameField.focus();
}