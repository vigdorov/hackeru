let drawCalendar = function(calendar, settings) {

  settings.parent.innerHTML = '';

  let days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  let nameMonths = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  calendar.month.textContent = nameMonths[settings.month];
  calendar.year.textContent = settings.year;

  let start = settings.startWeekday;
  let check = 0;
  for (let i = 0; i < 7; i++) {
    let tr = createDOMElement('tr', settings.parent);
    for (let j = 0; j < 7; j++) {
      let cell = 'td';
      let content = '';
      let isNumber = false;
      if (i === 0) {
        content = days[j];
        cell = 'th';
      } else {
        if (check >= start && check - start + 1 <= settings.daysMonth) {
          content = check - start + 1;
          isNumber = true;
        }
        check++;
      }
      let td = createDOMElement({
        tagName: cell,
        parent: tr,
        property: {
          className: 'text-center alert',
          textContent: content,
        },
      });

      if (isNumber) {
        let inputDateValue = document.getElementById('task-date').value;
        let date = calendar.dateToArray(inputDateValue);
        if (inputDateValue === '') {
          date = calendar.dateToArray(new Date);
        }
        if (date[1] - 1 === settings.month) {
          if (Number(date[0]) === content) {
            td.classList.add('alert-primary');
          }
        }

        td.addEventListener('mouseover', function() {
          td.classList.add('alert-success');
          td.addEventListener('mouseout', function() {
            td.classList.remove('alert-success');
          });
        });
        td.style.cursor = 'pointer';
        td.addEventListener('click', function() {
          let year = settings.year;
          let month = settings.month;
          calendar.currentDay = new Date(year, month, content);
          calendar.input.value = calendar.arrayToString(
            calendar.dateToArray(calendar.currentDay)
          );
          calendar.card.style.display = 'none';
        });
      }
    }
  }
};

module.exports = drawCalendar;