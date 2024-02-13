let form = document.forms.add_student
let container = document.querySelector('.st_container')
let students = []
let num_of_st = 1
let current_year = new Date().getFullYear()

console.log(new Date().getFullYear());

form.onsubmit = (e) => {
    e.preventDefault()

    let student = {
        id: num_of_st++,
        name: new FormData(form).get('name'),
        year: current_year - (+new FormData(form).get('age'))
    }

    if (student.name.trim() !== '' && student.age !== '') {
        students.push(student)
        reload_list(students, container)
    }
}

function reload_list(arr, place) {
    place.innerText = ""

    for (let item of arr) {
        let student_row = document.createElement('div')
        let student_number = document.createElement('span')
        let student_name = document.createElement('span')
        let student_year = document.createElement('span')
        let student_act_box = document.createElement('div')
        let student_change = document.createElement('img')
        let student_delete = document.createElement('img')

        student_row.classList.add('st_row')
        student_number.classList.add('char')
        student_name.classList.add('char')
        student_year.classList.add('char')
        student_act_box.classList.add('act')
        student_change.classList.add('cng_del')
        student_delete.classList.add('cng_del')

        student_number.innerText = item.id
        student_name.innerText = item.name
        student_year.innerText = item.year
        student_change.src = 'img/change.png'
        student_delete.src = 'img/delete.png'

        place.append(student_row)
        student_row.append(student_number, student_name, student_year, student_act_box)
        student_act_box.append(student_change, student_delete)

        student_change.onclick = () => {
            let modal = document.querySelector('.modal')
            let close_modal = document.querySelector('.close_modal')
            let submit_changes = document.querySelector('.submit_changes')
            let name_changer = document.querySelector('#name_changer')
            let age_changer = document.querySelector('#age_changer')

            modal.style.display = 'block'

            submit_changes.onclick = () => {
                item.name = name_changer.value.trim()
                item.year = age_changer.value.trim()

                student_name.innerText = item.name
                student_year.innerText = current_year - item.year
                modal.style.display = 'none'
            }

            close_modal.onclick = () => {
                modal.style.display = 'none'
            }
        }

        student_delete.onclick = () => {
            students = students.filter(el => el.id !== item.id)

            students.forEach((student, idx) => {
                student.id = idx + 1
            })

            student_row.remove()
            reload_list(students, container)
        }
    }
}