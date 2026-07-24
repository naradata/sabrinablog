# Local preview server. Serves the site at http://localhost:8321
# with caching disabled, so a plain refresh always shows your latest edits.
# Run with: python serve.py
import http.server
import os


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def translate_path(self, path):
        # Serve /posts as posts.html, like GitHub Pages does
        full = super().translate_path(path)
        if not os.path.exists(full) and os.path.exists(full + ".html"):
            return full + ".html"
        return full


if __name__ == "__main__":
    print("Serving blog at http://localhost:8321 (Ctrl+C to stop)")
    http.server.ThreadingHTTPServer(("", 8321), NoCacheHandler).serve_forever()
