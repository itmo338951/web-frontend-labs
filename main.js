window.addEventListener("load", function () {
    const pageEnd = performance.mark("pageEnd");

    const loadStatElement = document.getElementById("js-loading-time");
    loadStatElement.innerText = String(pageEnd.startTime);

    for (const element of document.querySelectorAll(".header-navbar-item")) {
        const hrefElement = element.querySelector("a");
        if (hrefElement && location.href === hrefElement.href) {
            element.classList.add("header-navbar-item-active");
        }
    }
});