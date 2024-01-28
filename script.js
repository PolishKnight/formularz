let inputWrapper = document.getElementsByClassName('inputWrapper');
let input = document.querySelectorAll('input');
let oczko = document.querySelectorAll('.passwordToggle');
const passwordInput = document.querySelectorAll('input[type="password"]');
const passwordToggle = document.querySelectorAll('.passwordToggle');
let reset = document.querySelector('input[type="reset"]');
let sprawdz = document.querySelector('input[type="button"]');
let com = document.querySelectorAll('.com');
let tab = [true, true, true, true, true, true, true, true];
let bledy = [
    'Podaj imie!',
    'Podaj nazwisko!',
    'Hasło jest zbyt słabe, musi mieć min 10 znaków,<br> wielkie i małe litery, cyfry oraz znaki specjalne',
    'Błędne hasło!',
    'Podaj prawdziwy wiek!',
    'Podaj adres e-mail!',
    'Wzór na adres to: miejscowość, ul. ulica',
    'Wzór na kod pocztowy to: XX-XXX'
];

for(let i = 0; i < inputWrapper.length; i++){
    inputWrapper[i].addEventListener('input', function(){
        if(input[i].value.length == 0){
            input[i].classList.remove('full');
        }else{
            input[i].classList.add('full');
        }
    });
}

reset.addEventListener('click', function(){
    for(let i = 0; i < inputWrapper.length; i++){
        input[i].classList.remove('full');
        com[i].textContent = '';
    }
});

sprawdz.addEventListener('click', SprawdzInfo);

function SprawdzInfo(){
    for(let i = 0; i < inputWrapper.length; i++){
        if(input[i].value.length == 0){
            NieOkej(com[i]);
            com[i].textContent = 'Wypełnij pole!';
            tab[i] = false;
        }else{
            tab[i] = true;
        }
    }

    if(input[2].value != input[3].value && tab[3] == true){
        NieOkej(com[3]);
        com[3].textContent = 'Błędne hasło!';
        tab[3] = false;
    }

    Regex(/^[a-zA-Z-]+$/, 0);
    Regex(/^[a-zA-Z-]+$/, 1);
    Regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/, 2);
    
    if((parseInt(input[4].value) <= 0 || parseInt(input[4].value) >= 100) && tab[4] == true){
        NieOkej(com[4]);
        com[4].textContent = bledy[4];
        tab[4] = false;
    }

    Regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 5);
    Regex(/^[^\d]+, ul\. [^\d]+(\s\d+)?$/, 6);
    Regex(/^\d{2}-\d{3}$/, 7);

    for (let i = 0; i < tab.length; i++) {
        if(tab[i] == true){
            Okej(com[i]);
            com[i].textContent = 'Okej!';
        }
    }

    
}

for (let i = 0; i < oczko.length; i++) {
    oczko[i].addEventListener('click', function(){

        if(passwordInput[i].type == 'password'){
            passwordInput[i].type = 'text';
            passwordToggle[i].innerHTML = '<i class="icon-eye-off"></i>';
        }else{
            passwordInput[i].type = 'password';
            passwordToggle[i].innerHTML = '<i class="icon-eye"></i>';
        }
    });
}

function Okej(el){
    el.classList.add('okej');
    el.classList.remove('nieokej');
}

function NieOkej(el){
    el.classList.remove('okej');
    el.classList.add('nieokej');
}

function Regex(reg, int){
    if(!reg.test(input[int].value) && tab[int] == true){
        NieOkej(com[int]);
        com[int].innerHTML = bledy[int];
        tab[int] = false;
    }
}