document.querySelector('.btn').addEventListener('click', (e) => {
    e.preventDefault();
    let isValid = true;

    const form = document.querySelector('.form');
    const surname = form.querySelector('.surname');
    const name = form.querySelector('.name');
    const lastname = form.querySelector('.lastname');
    const faculty = form.querySelector('.faculty');
    const birthDate = form.querySelector('.birthDate');
    isValid = validateBirthDate(birthDate);
    const start = form.querySelector('.start');
    const parent = document.querySelector('.error');

    isValid = validate(surname);
    isValid = validate(name);
    isValid = validate(lastname);
    isValid = validate(faculty);
    isValid = validate(birthDate);
    isValid = validateStart(start);
    isValid = validate(start);


    if (isValid) {
        const student = {
            surname: surname.value,
            name: name.value,
            lastname: lastname.value,
            faculty: faculty.value,
            birthDate: birthDate.value,
            start: parseInt(start.value),
        };
        console.log('Успех');
        birthDate.value = "";
        faculty.value = "";
        lastname.value = "";
        faculty.value = "";
        surname.value = "";
        start.value = "";
        name.value = "";

        parent.textContent = '';
        return;
    }
    console.log('Не успех');
});

const validate = (input) => {
    const parent = input.parentNode.querySelector('.error');
    if (input.value === '') {
        parent.textContent = 'Заполните поле ввода';
        return false;
    }
    return true;
}

const validateBirthDate = (date) => {
    const parent = date.parentNode.querySelector('.error');

    const startDate = new Date('1900-01-01');
    const currentDate = new Date(date.value);

    if (startDate > currentDate) {
        parent.textContent = 'не верный формат';
    }
    return true;
}

const validateStart = (start) => {
    const parent = start.parentNode.querySelector('.error');

    if (start.value === '' || start < 2000) {
        parent.textContent = 'Год начала обучения должен быть не позже 2000 года';
        return false;
    }

    return true;
}
