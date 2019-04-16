/*
Элемент создания иконок с сайта FontAwesome.com или других привязанных к классу

Функция принимает:
1. parent  - объект, в которой нужно положить элемент

Функция возвращает ссылку на вновь созданный i
 */

;(function() {
  let icon = function(iconName, color, parent, events) {
    let i = createDOMElement('i', parent, {
      className: iconName,
      style: {
        color: color,
      },
    });

    if (events) {
      for (let key in events) {
        i.addEventListener(key, events[key]);
      }
    }

    return i;
  };

  window.icon = icon;
})();