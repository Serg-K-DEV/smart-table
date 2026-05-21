// @todo: #4.3 — настроить компаратор
export function initFiltering(elements) {
  
  const updateIndexes = (elements, indexes) => {
      // @todo: #4.1 — заполнить выпадающие списки опциями  
      Object.keys(indexes).forEach((elementName) => {
          elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
              const el = document.createElement('option');
              el.textContent = name;
              el.value = name;
              return el;
          }))
      })
    }


  const applyFiltering = (query, state, action) => {
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
      const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) { // ищем поля ввода в фильтре с непустыми данными
                    filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
                }
            }
        })

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query; // если в фильтре что-то добавилось, применим к запросу
    }

    return {
        updateIndexes,
        applyFiltering
    }

}

