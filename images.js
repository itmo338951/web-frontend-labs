window.addEventListener("load", function () {
    for (const imageElement of document.querySelectorAll("img[data-full-src]")) {
        /*
         imageElement: элемент для которого будет создано окно просмотрщика
         options: аргумент с объектом с настройками, доступно больше, задаем основные
         - navbar: показывать панель навигации (поскольку мы используем просмотрщик для просмотра одной картинки, нам не нужна навигация)
         - toolbar: панель инструментов (аналогично, выключаем)
         - movable: можно ли двигать картинку (выключаем, поскольку это скорее портит UX, нежели имеет смысл)
         - title: заголовок картинки (используем alt-описание в качестве него)
         - url: функция для получения адреса качественного изображения (достаем из data-тега data-full-src)
         */
        new Viewer(imageElement, {
            navbar: true,
            toolbar: false,
            movable: false,
            title: imageElement.alt,
            url: function (image) {
                return image.dataset.fullSrc;
            }
        });
    }
});