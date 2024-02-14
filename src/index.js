let currentPet = {}

const getAllDogs = () => {
  fetch('http://localhost:3000/dogs')
  .then(res => res.json())
  .then(dogs => {
    dogsList = dogs
    dogs.forEach(dog => putDogToTable(dog))
  })
}

const putDogToTable = pet => {
  const dogForm = document.querySelector('form#dog-form')
  const tr = document.createElement('tr')
  tr.id = pet.id
  tr.innerHTML = `
    <td>${pet.name}</td>
    <td>${pet.breed}</td>
    <td>${pet.sex}</td>
    <td><button>Edit Dog</button></td>
  `
  tr.querySelector('button').addEventListener('click', () => {
    currentPet = pet
    dogForm.name.value = pet.name
    dogForm.breed.value = pet.breed
    dogForm.sex.value = pet.sex
  })
  document.querySelector('#table-body').appendChild(tr)
}

const handleSubmit = () => {
  document.querySelector('form#dog-form').addEventListener('submit', e => {
    e.preventDefault()
    currentPet.name = e.target.name.value
    currentPet.breed = e.target.breed.value
    currentPet.sex = e.target.sex.value

    fetch(`http://localhost:3000/dogs/${currentPet.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(currentPet)
    }).then(res => res.json())
    .then(dog => editTableData(dog))
  })    
}

const editTableData = (pet) => {
  const dogTable = document.querySelector('#table-body').children
  for(let i = 0; i < dogTable.length; i++) {
    if(dogTable[i].id === pet.id) {
      dogTable[i].innerHTML = `
      <td>${pet.name}</td>
      <td>${pet.breed}</td>
      <td>${pet.sex}</td>
      <td><button>Edit Dog</button></td>
      `
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getAllDogs()
  handleSubmit()
})
