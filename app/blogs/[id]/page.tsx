import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getBlogById } from "@/lib/blog-data";
import { marked } from "marked";
import hljs from "highlight.js";

// Import highlight.js CSS
import "highlight.js/styles/github-dark.css";

const renderer = new marked.Renderer();

renderer.code = function ({ text, lang }: { text: string; lang?: string }) {
  const validLanguage = lang && hljs.getLanguage(lang) ? lang : "plaintext";
  const highlighted = hljs.highlight(text, { language: validLanguage }).value;
  return `<pre><code class="hljs language-${validLanguage}">${highlighted}</code></pre>`;
};

// Configure marked
marked.setOptions({
  renderer: renderer,
  breaks: true,
  gfm: true,
});

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const blog = getBlogById(id);

  if (!blog) {
    notFound();
  }

  // Convert markdown to HTML
  const htmlContent = marked(blog.content);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-8 -ml-4">
          <Link href="/blogs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Link>
        </Button>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{blog.category}</Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{blog.readTime}</span>
            </div>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {blog.excerpt}
          </p>
          <Separator className="mt-8" />
        </header>

        {/* Article Content */}
        <article
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t">
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link href="/blogs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                More Articles
              </Link>
            </Button>
            <div className="text-sm text-muted-foreground">
              Published on {blog.date}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
