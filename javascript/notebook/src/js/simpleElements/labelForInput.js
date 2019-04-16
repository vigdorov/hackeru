/*
Функция принимает:
1. text       - текст label'а
2. required   - элемент, к которому будет привязан label,
                обязательный для заполнения или нет (true, false)
3. parent     - объект, в которой нужно положить элемент
4. forElement - id элемента, к которому будет привязан label

Функция возвращает ссылку на вновь созданный label
 */

;(function() {
  let labelForInput = function(text, required, parent, forElementId) {
    let label = createDOMElement('label', parent, {
      htmlFor: forElementId || '',
      textContent: text,
    });
    if (required) {
      let span = createDOMElement('span', label, {
        className: 'text-danger',
        textContent: ' *',
      })
    }
    return label;
  };

  window.labelForInput = labelForInput;
})();