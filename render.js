// Shared post-rendering used by the home, posts and archive pages.
// filter:   optional test deciding which posts appear (null = all)
// limit:    optional maximum number of posts to show
// showTags: when true, tags appear to the left of the title
function renderPosts(list, filter, limit, showTags) {
  let shown = 0;
  for (const post of POSTS) {
    if (filter && !filter(post)) continue;
    if (limit && shown >= limit) break;
    shown++;

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

    if (showTags && post.tags && post.tags.length) {
      const tags = document.createElement("span");
      tags.className = "tag";
      tags.textContent = post.tags.join(" ");
      headingRow.appendChild(tags);
    }

    headingRow.appendChild(heading);

    const body = document.createElement("div");
    body.className = "post-body";
    body.hidden = true;

    const render = (text) => {
      body.textContent = "";
      for (const paragraph of text.trim().split(/\n\s*\n/)) {
        const p = document.createElement("p");
        // A single line break inside a paragraph stays a line break
        paragraph.split("\n").forEach((line, index) => {
          if (index > 0) p.appendChild(document.createElement("br"));
          p.appendChild(document.createTextNode(line));
        });
        body.appendChild(p);
      }
    };
    render(post.body);

    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      body.hidden = !body.hidden;
      toggle.classList.toggle("open", !body.hidden);
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
        toggle.classList.add("open");
      });
      headingRow.appendChild(translateButton);
    }

    article.appendChild(headingRow);
    article.appendChild(body);
    list.appendChild(article);
  }
}
