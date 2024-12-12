window.addEventListener("load", function () {
    for (const imageElement of document.querySelectorAll("img[data-full-src]")) {
        new Viewer(imageElement, {
            navbar: false,
            toolbar: false,
            movable: false,
            title: imageElement.alt,
            url: function (image) {
                return image.dataset.fullSrc;
            }
        });
    }
});