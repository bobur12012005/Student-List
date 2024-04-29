let addStudent = document.querySelector('#add-student')
let modal = document.querySelector('#modal')
let editModal = document.querySelector('#editModal')
let studentsContainer = document.querySelector('.students')
let form = document.forms.namedItem('newStudent')
let baseURL = "http://localhost:8080"

addStudent.onclick = () => {
  modal.style.display = 'flex'
}

modal.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none'
  }
}

editModal.onclick = (e) => {
  if (e.target === editModal) {
    editModal.style.display = 'none'
  }
}

export function getData() {
  fetch(baseURL + "/users")
    .then(response => response.json())
    .then(response => reload(response, studentsContainer))
}
getData()


form.onsubmit = (e) => {
  e.preventDefault()

  let student = {
    id: String(Math.random()),
    name: new FormData(form).get('name'),
    surname: new FormData(form).get('surname'),
    age: new FormData(form).get('age')
  }

  if (student.name.length === 0 || student.surname.length === 0 || student.age < 12) return

  fetch(baseURL + "/users", {
    method: "post",
    body: JSON.stringify(student),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.status === 200 || response.status === 201) getData()
    })
}

function reload(arr, place) {
  place.innerHTML = ""
  let numeration = 1

  for (let item of arr) {
    let studentRow = document.createElement('div')
    let studentNumber = document.createElement('span')
    let studentName = document.createElement('span')
    let studentSurname = document.createElement('span')
    let studentAge = document.createElement('span')
    let studentActions = document.createElement('div')
    let studentDelete = document.createElement('button')
    let studentDeleteIcon = document.createElement('img')
    let studentEdit = document.createElement('button')
    let studentEditIcon = document.createElement('img')

    studentRow.classList.add('studentRow')
    studentNumber.classList.add('studentNumber')
    studentName.classList.add('studentName')
    studentSurname.classList.add('studentSurname')
    studentAge.classList.add('studentAge')
    studentActions.classList.add('studentActions')
    studentDelete.classList.add('studentDelete')
    studentEdit.classList.add('studentEdit')

    studentNumber.innerHTML = numeration++
    studentName.innerHTML = item.name
    studentSurname.innerHTML = item.surname
    studentAge.innerHTML = item.age

    studentDeleteIcon.src = '/public/icons/delete.png'
    studentEditIcon.src = '/public/icons/edit.png'

    place.append(studentRow)
    studentRow.append(studentNumber, studentName, studentSurname, studentAge, studentActions)
    studentActions.append(studentDelete, studentEdit)
    studentDelete.append(studentDeleteIcon)
    studentEdit.append(studentEditIcon)

    studentDelete.onclick = () => {
      fetch(baseURL + "/users/" + item.id, {
        method: "delete",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.status === 200 || response.status === 201) getData()
        })
    }

    studentEdit.onclick = () => {
      editModal.style.display = 'flex'
      let nameEditer = document.querySelector('#editedName')
      let surnameEditer = document.querySelector('#editedSurname')
      let ageEditer = document.querySelector('#editedAge')
      let editerAdmit = document.querySelector('#editedAdmit')

      editerAdmit.onclick = () => {
        if (nameEditer.value !== '' && surnameEditer.value !== '' && !ageEditer < 12) {
          let editedStudent = {
            id: item.id,
            name: nameEditer.value,
            surname: surnameEditer.value,
            age: ageEditer.value
          }

          fetch(baseURL + "/users/" + item.id, {
            method: "put",
            body: JSON.stringify(editedStudent),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => {
              if (response.status === 200 || response.status === 201) {
                getData()
                editModal.style.display = 'none'
              }
            })
        }
      }
    }
  }
}