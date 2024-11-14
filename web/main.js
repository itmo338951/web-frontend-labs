const loadStart = Date.now();

window.addEventListener("load", function () {
    const loadStatElement = document.getElementById("js-loading-time");
    loadStatElement.innerText = String(Date.now() - loadStart);

    for (const element of document.querySelectorAll(".header-navbar-item")) {
        const href = element.dataset["ref"];
        if (href) {
            element.addEventListener("click", function () {
                location.href = href;
            });
            if (location.href.endsWith(href)) {
                element.classList.add("header-navbar-item-active");
            }
        }
    }
});

function gotoIndex() {
    location.href = "index.html";
}