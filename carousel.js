const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const description = document.getElementById('carousel-text');

const descriptions = [
  "Головне меню застосунку. За допомогою нього користувач може переходити до інших вікон програми.",
  "Вікно «Продаж» створено спеціально для обслуговування покупців продавцем. У цьому вікні ми бачимо таблицю з товарами. В даній таблиці знаходяться всі найменування товарів наявних в магазині, а точніше, їх номер, категорія, назва, ціна та кількість товарів, яка наразі в кошику. Для того, щоб додати товар до кошика потрібно обрати категорію із випадаючого меню, потім ввести назву товару, обрати кількість та натиснути «У кошик». Таким самим процесом товар видаляється із кошика при відміні. По закінченню сканування, програма виводить суму, яку винен покупець. Після оплати для завершення операції потрібно натиснути кнопку «Завершити операцію». Також для того, щоб побачити тільки ті товари, які наявні в кошику покупця, можна використати CheckBox.",
  "Вікно «Склад» розроблене для контролю кількості товарів на складі та формування запиту для відповідальної за закупку людини. У вікні присутня таблиця з номером, категорією, назвою та залишком товарів. Для формування запиту потрібно обрати категорію товару, ввести назву, обрати кількість і натиснути «Додати до запиту». Видалення товару із запиту – кнопка «Видалити». Також є функція «Додати товари, яких мало» — автоматичне додавання товарів, яких менше 5 штук. Формування файлу – кнопка «Сформувати файл запиту». CheckBox вмикає «Прев’ю» товарів.",
  "Вікно «Надходження» створено для обліку та прийняття нового товару на склад. Таблиця аналогічна до тієї, що у вікні «Склад». Щоб додати товар — обрати категорію, ввести назву, кількість, ціну закупки і відсоток націнки. Програма автоматично прорахує ціну реалізації.",
  "Вікно редагування дозволяє додавати, редагувати та видаляти товари і категорії. Це окремий інтерфейс для внесення нових позицій у разі масштабування бізнесу. Винесено в окреме вікно, щоб не перевантажувати інші частини системи.",
  "Вікно «Каса» дозволяє відкривати та закривати касу. Тут фіксується дохід і визначається вклад кожного продавця. Це дозволяє зручно розраховувати відсоток від виручки для формування зарплатні."
];

let currentIndex = 0;

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  description.textContent = descriptions[currentIndex];
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

let startX = 0;
track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const delta = startX - endX;

  if (Math.abs(delta) > 50) {
    if (delta > 0 && currentIndex < slides.length - 1) {
      currentIndex++;
    } else if (delta < 0 && currentIndex > 0) {
      currentIndex--;
    }
    updateCarousel();
  }
});


window.addEventListener('load', updateCarousel);
window.addEventListener('resize', updateCarousel);
