// Shared post-rendering used by posts.html and archive.html.
// Pass a filter to decide which posts appear on each page.
function renderPosts(list, filter) {
  for (const post of POSTS) {
    if (filter && !filter(post)) continue;
    const article = document.createElement("article");
    article.className = "post-preview";

    const headingRow = document.createElement("div");
    headingRow.className = "post-heading";
    const heading = document.createElement("h2");
    heading.className = "post-title";
    const toggle = document.createElement("a");
    toggle.href = "#";
    toggle.textContent = post.title;
    heading.appendChild(toggle);
    headingRow.appendChild(heading);

    const body = document.createElement("div");
    body.className = "post-body";
    body.hidden = true;

    const render = (text) => {
      body.textContent = "";
      for (const paragraph of text.trim().split(/\n\s*\n/)) {
        const p = document.createElement("p");
        p.textContent = paragraph;
        body.appendChild(p);
      }
    };
    render(post.body);

    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      body.hidden = !body.hidden;
    });

    if (post.translation) {
      const translateButton = document.createElement("button");
      translateButton.type = "button";
      translateButton.className = "translate-btn";
      translateButton.textContent = "Перевести";
      let translated = false;
      translateButton.addEventListener("click", () => {
        translated = !translated;
        render(translated ? post.translation : post.body);
        translateButton.textContent = translated ? "English" : "Перевести";
        body.hidden = false;
      });
      headingRow.appendChild(translateButton);
    }

    article.appendChild(headingRow);
    article.appendChild(body);
    list.appendChild(article);
  }
}
