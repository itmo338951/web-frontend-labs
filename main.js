const loadStart = Date.now();

window.addEventListener("load", function () {
    const loadStatElement = document.getElementById("js-loading-time");
    loadStatElement.innerText = String(Date.now() - loadStart);

    for (const element of document.querySelectorAll(".header-navbar-item")) {
        const hrefElement = element.querySelector("a");
        if (hrefElement && location.href === hrefElement.href) {
            element.classList.add("header-navbar-item-active");
        }
    }
});