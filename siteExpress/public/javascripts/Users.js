'use strict';

/**
 * Статический класс, группирующий функциональность "Работа со списком пользователей".
 */
class Users {
    static getTable() {
        return document.querySelector('table.users');
    }

    /**
     * Выполняет действие "Загрузка списка пользователей"
     */
    static doLoadList() {
        Mask.show('Загрузка списка пользователей...');
        Users.doAjaxLoadList((isSuccess, json) => {
            Mask.hide();
            if (isSuccess){
                Users.renderTable(json);
            } else {
                alert(json.message);
            }
        });
    }

    /**
     * Выполняет AJAX "Загрузка списка пользователей"
     * @param callback
     * @param scope
     */
    static doAjaxLoadList(callback, scope) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/users/list');
        xhr.send();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status != 200){
                return callback.call(scope || this, false, {
                    success : false,
                    message : 'Не удалось получить список пользователей. Код ' + xhr.status
                });
            }
            let json = JSON.parse(xhr.responseText);
            callback.call(scope || this, true, json);
        });
    }

    /**
     * Выполняет действие "Сгенерировать таблицу пользователей на основании JSON".
     * @param json
     */
    static renderTable(json) {
        let table = Users.getTable(),
            tBody = table.querySelector('tbody');
        tBody.innerHTML = '';
        console.log('renderTable', json);
        json.forEach((row) => {
            let newRow = Users.createRow(row);
            tBody.appendChild(newRow);
        });
    }

    /**
     * Создает DOM-элемент "Строка" таблицы "Список пользователей".
     * @param data
     * @returns {HTMLElement}
     */
    static createRow(data) {
        if (!('id' in data)) {
            throw new Error('Id обязательно должен быть');
        }
        let tr = document.createElement('tr');
        var td;

        td = document.createElement('td');
        td.innerHTML = data.id;
        td.classList.add('user-id');
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = data.login;
        td.classList.add('user-login');
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = data.name || '';
        td.classList.add('user-name');
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = data.email || '';
        td.classList.add('user-email');
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = data.phone || '';
        tr.appendChild(td);

        td = document.createElement('td');
        (function (tdEl) {
            var tmpEl;

            tmpEl = document.createElement('div');
            tmpEl.classList.add('actions-item', 'action-edit');
            tmpEl.innerHTML = 'Редактировать';
            tdEl.appendChild(tmpEl);

            tmpEl = document.createElement('div');
            tmpEl.classList.add('actions-item', 'action-remove');
            tmpEl.innerHTML = 'Удалить';
            tdEl.appendChild(tmpEl);
        })(td);
        tr.appendChild(td);

        return tr;
    }

    static doAdd() {
        User.showWindowAdd()
    }

    static onClickEdit(domEl) {
        let userId = domEl.closest('tr').querySelector('.user-id').textContent;
        User.showWindowEdit(userId);
    }

    static onClickRemove(domElButtonRemove) {
        let id = domElButtonRemove.closest('tr').querySelector('.user-id').textContent;
        console.log('remove', id);
        Mask.show('Удаление пользователя...');
        User.doAjaxRemoveUser({
            id: id
        }, (isSuccess, json) => {
            Mask.hide();
            if (!json.success) {
                alert(json.message)
            }
            Users.doLoadList();
        });
    }
}
