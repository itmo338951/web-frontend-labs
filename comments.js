(function () {
    const postListElement = document.querySelector(".advertisements");
    const postTemplateElement = document.getElementById("post-template");

    function addPost(post) {
        const fragment = postTemplateElement.content.cloneNode(true);
        const element = fragment.querySelector(".advertisements-item");
        const titleElement = element.querySelector(".advertisements-item-title");
        const contentElement = element.querySelector(".advertisements-item-content");
        titleElement.innerText = post.title;
        contentElement.innerText = post.body;
        postListElement.appendChild(fragment);
    }

    window.addEventListener("load", async function () {
        try {
            const pseudoUserId = 1 + Math.floor(10 * Math.random());
            const response = await fetch("https://jsonplaceholder.typicode.com/posts?userId=" + pseudoUserId);
            if (response.status !== 200) {
                throw Error("wrong status code: " + response.statusText);
            }
            const content = await response.json();
            for (const post of content) {
                addPost(post);
            }
            const loadingElement = postListElement.querySelector(".advertisements-loading");
            if (loadingElement) {
                postListElement.removeChild(loadingElement);
            }
        } catch (e) {
            addPost({title: "Здесь был пост...", body: "Но его нет, ведь сервер, к сожалению, недоступен :("})
        }
    });
})();