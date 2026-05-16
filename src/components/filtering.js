import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                                    // Получаем ключи из объекта
      .forEach((elementName) => {                                           // Перебираем по именам
        elements[elementName].append(                                       // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])                          // формируем массив имён, значений опций
                      .map(name => {                                        // используйте name как значение и текстовое содержимое
                        const elem = document.createElement('option');      // @todo: создать и вернуть тег опции
                        elem.textContent = name;
                        elem.value = name;
                        return elem;
                      })
        )
     })

     return (data, state, action) => {
          // @todo: #4.2 — обработать очистку поля
          if (action && action.name === 'clear') {
              const input = action.parentElement.querySelector('input');  // Найдём поле, связанное с кнопкой очистки (предполагаем, что оно внутри того же родителя)
              const field = action.dataset.field;
              if (input) {
                input.value = '';    // Очистим его
              }
              if (field && state[field] !== undefined) {
                state[field] = '';  // И в состоянии тоже очистим, чтобы фильтрация отработала правильно
              }}

          // @todo: #4.5 — отфильтровать данные используя компаратор
          return data.filter(row => compare(row, state));
          }
  }

