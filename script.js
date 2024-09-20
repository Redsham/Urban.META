const modal = document.getElementById("modal");
const modalBody = document.getElementById('modalBody');

document.querySelectorAll('.gear-card').forEach(card => {
    
    // Пропуск оборудования без доп информации
    if (card.dataset.file === undefined)
        return;

    card.style.cursor = "pointer"; // Делаем курсор указателем при наведении на карточку

    // Добавляем подсказку
    var hint = document.createElement('p');
    hint.innerHTML = "Нажмите для подробной информации";
    hint.classList.add('hint');
    card.appendChild(hint);

    // Открытие окна
    card.addEventListener('click', function() {
        const gearFile = this.dataset.file; // Получаем имя файла из data-атрибута

        modal.classList.add("modal-show");
        document.body.style.overflow = "hidden";

        fetch(gearFile)
            .then(response => response.text())
            .then(data => {
                modalBody.innerHTML = data;
                modal.style.display = "block"; // Показываем модальное окно
            });
    });
});

// Закрытие модального окна
document.querySelector('.close').onclick = close;

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    if (event.target != modal)
        return;
    
    close();
}

window.ontouchstart = function(event) {
    if (event.target != modal)
        return;

    close();
}

function close() {
    modal.classList.remove("modal-show");
    document.body.style.overflow = "auto";

    setTimeout(() => {
        modal.style.display = "none";
    }, 250);
}

window.addEventListener('scroll', function() {
    const section = document.getElementById('intro');
    const scrollPosition = window.scrollY;
    
    // Изменение прозрачности в зависимости от прокрутки
    section.style.opacity = 1 - scrollPosition / 500;
});