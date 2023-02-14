// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

let students = [
    { surname: 'Иванов', name: 'Иван', lastname: 'Иванович', faculty: 'экономика', birthDate: '1999-04-20', start: 2020 },
    { surname: 'Смирнова', name: 'Мария', lastname: 'Ивановна', faculty: 'юриспруденция', birthDate: '1999-08-20', start: 2020 },
    { surname: 'Мирзоева', name: 'Анна', lastname: 'Михайловна', faculty: 'экономика', birthDate: '2000-04-09', start: 2015 },
    { surname: 'Сидоров', name: 'Матвей', lastname: 'Сергеевич', faculty: 'реклама', birthDate: '1996-09-20', start: 2020 },
    { surname: 'Башкер', name: 'Ян', lastname: 'Сулейманович', faculty: 'экономика', birthDate: '2002-07-17', start: 2022 },
];

// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

const сonvertingDateOfBirth = (date) => {
    let arr = date.split('-');
    let int = [];
    for (const simbol of arr) {
        int.push(parseInt(simbol));
    }
    let newDate = (new Date(int[0], (int[1] - 1), int[2]));

    return newDate;
}

const getAge = (birthDates) => {
    let date = new Date();
    let age = (date.getFullYear()) - сonvertingDateOfBirth(birthDates).getFullYear();
    if (date.getMonth() < (сonvertingDateOfBirth(birthDates).getMonth() - 1)) {
        age += -1;
    }

    return age;
}

const getDateOfBirthAndAge = (birthDates) => {
    return `${сonvertingDateOfBirth(birthDates).toLocaleDateString("ru-RU")} (${getAge(birthDates)})`;
}

const getCurrentCourse = (year) => {
    const currentDate = new Date();
    let course = currentDate.getFullYear() - year;

    if (currentDate.getMonth() >= 8) {
        course += 1;
    }
    if (course > 4) {
        return '(закончил)';
    }
    return `(${course} курс)`;
}

const graduationYear = (startYear) => {
    return startYear + 4;
}

const getPeriod = (startYear) => {
    return `${startYear}-${graduationYear(startYear)}`;
}

const trainingPeriod = (startYear) => {
    return `${getPeriod(startYear)} ${getCurrentCourse(startYear)}`;
}

function getStudentItem(student) {
    const tr = document.createElement('tr');
    tr.classList.add('students');

    const tdName = document.createElement('td');
    tdName.textContent = `${student.surname} ${student.name} ${student.lastname}`;
    tr.append(tdName);

    const tdFaculty = document.createElement('td');
    tdFaculty.textContent = student.faculty;
    tr.append(tdFaculty);

    const tdBirthDate = document.createElement('td');
    tdBirthDate.textContent = getDateOfBirthAndAge(student.birthDate);
    tr.append(tdBirthDate);

    const tdStartOfTraining = document.createElement('td');
    tdStartOfTraining.classList.add('start-end');
    tdStartOfTraining.textContent = trainingPeriod(student.start);
    tr.append(tdStartOfTraining);

    return tr;
};

// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.
const desctruction = () => {
    document.querySelector('tbody').remove('tbody');
};


function renderStudentsTable(students) {
    let table = document.querySelector('table');
    let tableBody = document.createElement('tbody');
    tableBody.classList.add('table__body');
    table.append(tableBody);
    students.forEach(student => tableBody.append(getStudentItem(student)))
};

renderStudentsTable(students);

// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.


document.querySelector('.btn').addEventListener('click', (e) => {
    e.preventDefault();

    let isValid = true;

    const form = document.querySelector('.form');
    const surname = form.querySelector('.surname');
    isValid = validate(surname);

    const name = form.querySelector('.name');
    isValid = validate(name);

    const lastname = form.querySelector('.lastname');
    isValid = validate(lastname);

    const faculty = form.querySelector('.faculty');
    isValid = validate(faculty);

    const birthDate = form.querySelector('.birthDate');
    isValid = validateBirthDate(birthDate);
    isValid = validate(birthDate);

    const start = form.querySelector('.start');
    isValid = validateStart(start);
    isValid = validate(start);

    const parent = document.querySelector('.error');

    if (isValid) {
    const student = {
        surname: surname.value,
        name: name.value,
        lastname: lastname.value,
        faculty: faculty.value,
        birthDate: birthDate.value,
        start: parseInt(start.value),
    };

    parent.textContent = "";
    birthDate.value = "";
    faculty.value = "";
    lastname.value = "";
    faculty.value = "";
    surname.value = "";
    start.value = "";
    name.value = "";

    let tableBody = document.querySelector('.table__body');
    tableBody.append(getStudentItem(student));

    return;
    }
})

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

    validate(start);
    if (start.value === '' || start.value < 2000) {
        parent.textContent = 'Год начала обучения должен быть не позже 2000 года';
        return false;
    }

    return true;
}

// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

const sortingStudentsByName = (students) => {
    return students.sort((a, b) => {
        a = `${a.surname} ${a.name} ${a.lastname}`;
        b = `${b.surname} ${b.name} ${b.lastname}`;
        if (a < b) return -1;
    });
};

const sortingName = document.querySelector('.head-name');
sortingName.addEventListener('click', (e) => {
    students = sortingStudentsByName(students);
    desctruction();
    renderStudentsTable(students);
});

const sortingStudentsByFaculty = (students) => {
    return students.sort((a, b) => {
        if (a['faculty'] < b['faculty']) return -1;
    });
}

const sortingFaculty = document.querySelector('.head-faculty');
sortingFaculty.addEventListener('click', (e) => {
    students = sortingStudentsByFaculty(students);
    console.log(students);
    desctruction();
    renderStudentsTable(students);
});

const sortingStudentsByBirthDate = (students) => {

    return students.sort((a, b) => {
        if (a.birthDate > b.birthDate) return -1;
    });
}

const sortingBirthDate = document.querySelector('.head-datebirth');
sortingBirthDate.addEventListener('click', (e) => {
    students = sortingStudentsByBirthDate(students);
    desctruction();
    renderStudentsTable(students);
});

const sortingStudentsByStart = (students) => {

    return students.sort((a, b) => {
        if (parseInt(a.start) < parseInt(b.start)) return -1;
    });
}

const sortingStart = document.querySelector('.head-start');
sortingStart.addEventListener('click', (e) => {
    students = sortingStudentsByStart(students);
    desctruction();
    renderStudentsTable(students);
});

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.

const filterStudentsFullName = (students, value) => {
    return students.filter(student => {
        let fullName = `${student.surname} ${student.name} ${student.lastname}`;
        return fullName.includes(value);
    });
}

const filterFaculty = (students, value) => {
    return students.filter(student => {
        return student.faculty.includes(value);
    });
};

const filterStart = (students, value) => {
    return students.filter(student => {
        let a = `${student.start}-${student.start + 4}`.substr(0, 4);
        return a.includes((value));
    });
};

const filterEnd = (students, value) => {
    return students.filter(student => {
        let a = `${student.start}-${student.start + 4}`.substr(5, 10);
        return a.includes((value));
    });
};



const filterBtn = document.querySelector('.filter-btn');
filterBtn.addEventListener('click', (e) => {
    const name = document.querySelector('.filter-name');
    const faculty = document.querySelector('.filter-faculty');
    const start = document.querySelector('.filter-start');
    const end = document.querySelector('.filter-end');
    desctruction();
    let filterStudents = students;
    filterStudents = filterStudentsFullName(filterStudents, name.value);
    filterStudents = filterFaculty(filterStudents, faculty.value);
    filterStudents = filterStart(filterStudents, start.value);
    filterStudents = filterEnd(filterStudents, end.value);


    renderStudentsTable(filterStudents);
})
