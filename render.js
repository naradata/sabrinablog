// Draws the posts and the month list in the sidebar.
// Visiting /#2026-11 shows only that month's posts.
const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

function parseDate(text) {
  const [day, time = "00:00"] = text.trim().split(/\s+/);
  const [y, m, d] = day.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);
  return { y, m, d, h, min, key: `${y}-${String(m).padStart(2, "0")}` };
}

// "November 03 10:15 PM", like an old blog's timestamp
function formatDate(p) {
  const hour12 = p.h % 12 || 12;
  const ampm = p.h < 12 ? "AM" : "PM";
  return `${MONTHS[p.m - 1]} ${String(p.d).padStart(2, "0")} ` +
    `${String(hour12).padStart(2, "0")}:${String(p.min).padStart(2, "0")} ${ampm}`;
}

function renderPosts() {
  const list = document.getElementById("posts");
  const monthNav = document.getElementById("months");
  const selected = location.hash.slice(1);
  list.textContent = "";
  monthNav.textContent = "";

  const posts = POSTS.map((post) => ({ ...post, when: parseDate(post.date) }));

  // sidebar: one link per month that has posts, newest first
  const seen = new Set();
  for (const post of posts) {
    if (seen.has(post.when.key)) continue;
    seen.add(post.when.key);
    const a = document.createElement("a");
    a.href = "#" + post.when.key;
    a.textContent = `${MONTHS[post.when.m - 1]} ${post.when.y}`;
    if (post.when.key === selected) a.className = "current";
    monthNav.appendChild(a);
  }

  const shown = selected ? posts.filter((post) => post.when.key === selected) : posts;

  if (!shown.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Nothing here yet.";
    list.appendChild(empty);
    return;
  }

  for (const post of shown) {
    const article = document.createElement("article");
    article.className = "post";

    const title = document.createElement("h2");
    title.textContent = post.title;
    article.appendChild(title);

    for (const paragraph of post.body.trim().split(/\n\s*\n/)) {
      const p = document.createElement("p");
      // a single line break inside a paragraph stays a line break
      paragraph.split("\n").forEach((line, index) => {
        if (index > 0) p.appendChild(document.createElement("br"));
        p.appendChild(document.createTextNode(line));
      });
      article.appendChild(p);
    }

    const meta = document.createElement("p");
    meta.className = "meta";
    meta.textContent = formatDate(post.when);
    article.appendChild(meta);

    list.appendChild(article);
  }
}

renderPosts();
window.addEventListener("hashchange", renderPosts);
