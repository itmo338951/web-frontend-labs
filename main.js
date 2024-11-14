const loadStart = Date.now();

window.addEventListener("load", function () {
    const loadStatElement = document.getElementById("js-loading-time");
    loadStatElement.innerText = String(Date.now() - loadStart);

    for (const element of document.querySelectorAll(".header-navbar-item > a")) {
        const href = element.dataset["ref"];
        if (href && location.pathname === href) {
            element.classList.add("header-navbar-item-active");
        }
    }
});