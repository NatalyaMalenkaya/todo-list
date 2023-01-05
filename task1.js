/**
 * Задание 1
 *
 * 1. Реализуем приложение Список дел с возможностью добавить новый элемент в список из инпута по нажатию кнопки "Добавить";
 * 2. При нажатии на галочку текст итема становится зачеркнутым, при отжатии снова обычным.
 * 3. Реализовать удаление элемента по нажатию крестика;
 * 4. Реализовать возможность редактирования элемента:
 * - При нажатии на текст элемента он отображается в инпуте, название кнопки меняется на "Обновить";
 * - После изменения названия и нажатия на "Обновить" текст элемента изменяется в списке, инпут сбрасывается, кнопка переименовывается обратно в "Добавить".;
 * - Предусмотреть возможность отменить редактирование (крестик в конце инпута), при нажатии на который редактирование прекращается: инпут очищается, кнопка вновь имеет заголовок "Добавить".
 * - Редактируемый элемент подсвечивается как активный.
 * 5*. Сохрание текущего состояния (local storage).
 */

const btnAddEl = document.querySelector('.js-btn-add');
const inputEl = document.querySelector('.js-input');
let buffer1 = null;

if (localStorage.getItem("Arr") === null) {
    localStorage.setItem('Arr', '[{"id":1,"name":"text"}]');
}

let toDoList = JSON.parse(localStorage.Arr);

function generateList(){
    toDoList.forEach(function(item, index, array) {
        let t = createLiEl(item.name);
        document.querySelector('.js-group').append(t);
    });
}
generateList();



btnAddEl.addEventListener('click', () => {
    if (buffer1 === null)  {
        /* добавление данных */
        const newLiEl = createLiEl(inputEl.value || 'Пустая задача');
        document.querySelector('.js-group').append(newLiEl);

        let a = {
            id: toDoList[toDoList.length-1].id + 1,
            name : inputEl.value,
        }
        toDoList.push(a);
        inputEl.value = '';

        localStorage.Arr = JSON.stringify(toDoList);
        
    } else {
        /* редактирование данных */
        let resultat = toDoList.findIndex(item => item.name === buffer1.textContent);

        toDoList[resultat].name = inputEl.value;
        localStorage.Arr = JSON.stringify(toDoList);

        buffer1.textContent = inputEl.value;
        inputEl.value = '';
        buffer1.classList.remove('red');
        btnAddEl.textContent = "добавить";
        buffer1 = null;
        const esc = btnAddEl.parentNode.querySelector('.esc');
        btnAddEl.parentNode.removeChild(esc);

    }
    

});

function createLiEl(text) {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');
    liEl.classList.add('js-item');

    const formGroupEl = document.createElement('div');
    formGroupEl.classList.add('form-group');

    const checkboxEl = document.createElement('input');
    checkboxEl.classList.add('form-check-input');
    checkboxEl.classList.add('js-checkbox');
    checkboxEl.setAttribute('type', 'checkbox');

    const spanEl = document.createElement('span');
    spanEl.classList.add('js-item-value');
    spanEl.textContent = text;

    const removeEl = document.createElement('div');
    removeEl.classList.add('remove', 'js-remove');
    removeEl.textContent = 'X';

    formGroupEl.append(checkboxEl);
    formGroupEl.append(spanEl);

    liEl.append(formGroupEl);
    liEl.append(removeEl);

    // // для новых элементов
    // checkboxEl.addEventListener('click', event => {
    //     const parent = checkboxEl.parentNode;
    //     parent.querySelector('.js-item-value').classList.toggle('done');
    // });

    return liEl;

}

// const checkboxEl = document.querySelector('.js-checkbox');
//
// checkboxEl.addEventListener('click', event => {
//     const parent = checkboxEl.parentNode;
//     parent.querySelector('.js-item-value').classList.toggle('done');
// });

// для существующих элементов списка на момент загруки стр
// const checkboxList = document.querySelectorAll('.js-checkbox');
//
// for (let i = 0; i < checkboxList.length; i++) {
//     const checkboxItem = checkboxList.item(i);
//     checkboxItem.addEventListener('click', event => {
//         const parent = checkboxItem.parentNode;
//         parent.querySelector('.js-item-value').classList.toggle('done');
//     });
// }

document.querySelector('.js-group').addEventListener('click', event => {
    // 2. При нажатии на галочку текст итема становится зачеркнутым, при отжатии снова обычным.
    if (event.target.classList.contains('js-checkbox')) {
        const parentNode = event.target.parentNode;
        parentNode.querySelector('.js-item-value').classList.toggle('done');
    }
    // 3. Реализовать удаление элемента по нажатию крестика;
    if (event.target.classList.contains('js-remove')) {
        const parent = event.target.parentNode;
        


        let txt = event.target.parentNode.querySelector('span').textContent;
        let resultat = toDoList.findIndex(item => item.name === txt);
        toDoList.splice(resultat,1);
        localStorage.Arr = JSON.stringify(toDoList);

        parent.remove();

    }
    // 4
    if (event.target.classList.contains('js-item-value')) {

        const text = event.target.textContent;
        inputEl.value = text;
        event.target.classList.add('red');
        btnAddEl.textContent = "обновить";
        if (buffer1 !== null) {
            buffer1.classList.remove('red');
        }
        addEscToInput();
        buffer1 = event.target;
        
        

        /*
        const jsItemInput = document.createElement('input');
        jsItemInput.classList.add('js-item-input');
        jsItemInput.value = text;
        event.target.parentNode.append(jsItemInput);
        */

        
    }
});

function addEscToInput(){
    if (buffer1 === null) {
        const jsInputEsc = document.createElement('div');
        jsInputEsc.classList.add('esc');
        jsInputEsc.textContent = 'X';

        jsInputEsc.addEventListener('click', (event) => {
            inputEl.value = '';
            buffer1.classList.remove('red');
            btnAddEl.textContent = "добавить";
            buffer1 = null;
        })

        inputEl.parentNode.append(jsInputEsc);
    }
}

