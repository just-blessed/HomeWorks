window.onload = function () {
    let title = document.querySelector('h1');
    let mainText = document.getElementById('main-text')
    let fullName = document.getElementById('fullName');
    let userName = document.getElementById('userName');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let repeatPassword = document.getElementById('repeatPassword');
    let policy = document.getElementById('policy');
    let signUp = document.getElementById('button');
    let haveAcc = document.getElementById('haveAcc');
    let btnPopUp = document.getElementById('btn-popUp');
    let popUp = document.getElementById('popup');
    let form = document.getElementById('form');

    signUp.addEventListener('click', registration);

    function close() {
        popUp.style.display = 'none'
    }

    if (popUp) {
        btnPopUp.addEventListener('click', close);
    }
    if (haveAcc) {
        haveAcc.addEventListener('click', goToLogin);
    }

    //Функция для отображения ошибок
    function showErrorMessage(field, message) {
        field.nextElementSibling.style.display = "block";
        field.nextElementSibling.innerText = message;
        field.style.borderColor = 'red';
    }

    //Функция для скрытия ошибок
    function hideErrorMessage(field) {
        field.nextElementSibling.style.display = "none";
        field.style.borderColor = '#A1A19EFF';
    }

    let clients = JSON.parse(localStorage.getItem('clients')) || [];

    function registration() {
        let fullNameRegex = /^[А-Яа-яa-zA-Z]+\s*$/;
        let userNameRegex = /^[а-яА-Яa-zA-Z0-9_]+$/;
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/;

        if (!fullName.value) {
            showErrorMessage(fullName, 'Заполните поле Full Name');
            return;
        } else if (!fullNameRegex.test(fullName.value)) {
            showErrorMessage(fullName, 'Full Name может содержать только буквы и пробел');
            return;
        } else {
            hideErrorMessage(fullName);
        }

        if (!userName.value) {
            showErrorMessage(userName, 'Заполните поле Your username');
            return;
        } else if (!userNameRegex.test(userName.value)) {
            showErrorMessage(userName, 'Your username может содержать только буквы, цифры, символ подчеркивания');
            return;
        } else {
            hideErrorMessage(userName);
        }

        if (!email.value) {
            showErrorMessage(email, 'Заполните поле E-mail');
            return;
        } else if (!emailRegex.test(email.value)) {
            showErrorMessage(email, 'Некорректный адрес электронной почты.');
            return;
        } else {
            hideErrorMessage(email);
        }

        if (!password.value) {
            showErrorMessage(password, 'Заполните поле Password');
            return;
        } else if (!passwordRegex.test(password.value)) {
            showErrorMessage(password, 'Поле пароля должно содержать минимум 8 символов');
            alert('Поле пароля должно содержать минимум 8 символов, среди которых есть:\n' +
                '- хотя бы одна буква в верхнем регистре\n' +
                '- хотя бы одна цифра\n' +
                '- хотя бы один спецсимвол')
            return;
        } else {
            hideErrorMessage(password);
        }

        if (!repeatPassword.value) {
            showErrorMessage(repeatPassword, 'Заполните поле Repeat Password');
            return;
        } else if (password.value !== repeatPassword.value) {
            showErrorMessage(repeatPassword, 'Password и Repeat Password должны совпадать');
            return;
        } else {
            hideErrorMessage(repeatPassword);
        }

        if (!policy.checked) {
            showErrorMessage(policy, 'Нажмите пожалуйста на галочку');
            return;
        } else {
            hideErrorMessage(policy);
        }

        alert('Регистрация успешно завершена');

        const foundUser = clients.find(client => client.userName === form.userName.value);

        if (!foundUser) {
            const user = {
                name: form.fullName.value,
                userName: form.userName.value,
                email: form.email.value,
                password: form.password.value
            }
            clients.push(user);
            localStorage.setItem('clients', JSON.stringify(clients));


            popUp.style.display = "block"
            goToLogin();
        }
        alert('Такой пользователь уже зарегистрирован')
    }

    function viewClients() {
        console.log(clients);
    }

    viewClients();

    function login() {
        let userNameValue = userName.value.trim();
        let passwordValue = password.value.trim();

        if (!userNameValue) {
            showErrorMessage(userName, 'Заполните поле Username');
            return;
        }
        if (!passwordValue) {
            showErrorMessage(password, 'Заполните поле Password');
            return;
        }

        let clients = JSON.parse(localStorage.getItem('clients'));
        let foundUser = clients.find(client => client.userName === userNameValue);

        if (!foundUser) {
            console.log('Такой пользователь не зарегистрирован');
            alert('Такой пользователь не зарегистрирован')
            showErrorMessage(userName, 'Такой пользователь не зарегистрирован');
        } else {
            if (foundUser.password === passwordValue) {
                form.reset();
                hideErrorMessage(userName);
                hideErrorMessage(password);
                title.innerText = 'Welcome ' + foundUser.name;
                mainText.remove();
                userName.parentElement.remove();
                password.parentElement.remove();
                signUp.innerText = 'Exit';
                signUp.removeEventListener('click', login)
                signUp.addEventListener('click', function () {
                    location.reload();
                });
                haveAcc.parentElement.remove();
            } else {
                console.log('Неверный пароль');
                showErrorMessage(password, 'Неверный пароль');
            }
        }
    }

    function goToLogin() {
        hideErrorMessage(userName);
        hideErrorMessage(password);
        userName.value = '';
        password.value = '';
        fullName.parentElement.remove();
        email.parentElement.remove();
        repeatPassword.parentElement.remove();
        policy.parentElement.remove();
        title.innerText = 'Log in to the system';
        signUp.innerText = 'Sign In'
        haveAcc.innerText = 'Registration'
        haveAcc.style.paddingLeft = '188px'
        signUp.removeEventListener('click', registration);
        signUp.addEventListener('click', login);
        haveAcc.removeEventListener('click', goToLogin);
        haveAcc.addEventListener('click', function () {
            location.reload();
        })
    }


}

