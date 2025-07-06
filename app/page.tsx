"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { getFeaturedBlogs } from "@/lib/blog-data";

export default function HomePage() {
  const featuredBlogs = getFeaturedBlogs();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="fade-in-05 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 fadeInUp">
              {"Hi, I'm"}{" "}
              <span className="fade-in-delayed-1 opacity-0 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                EL MEHDI ELFERRY
              </span>
            </h1>
            <p className="fade-in-delayed-2 text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Software Engineer and Full-stack Web Developer passionate about
              creating innovative solutions and contributing to open-source
              projects.
            </p>
            <div className="fade-in-delayed-1 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="group">
                <Link href="/about">
                  Learn More About Me
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <div className="flex gap-4">
                <Button
                  onClick={() =>
                    window.open("https://github.com/ferrymehdi", "_blank")
                  }
                  className="fade-in-delayed-2"
                  variant="outline"
                  size="icon"
                >
                  <Github className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/ferrymehdi",
                      "_blank",
                    )
                  }
                  className="fade-in-delayed-3"
                  variant="outline"
                  size="icon"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() =>
                    window.open("mailto:me@ferrymehdi.xyz", "_blank")
                  }
                  className="fade-in-delayed-4"
                  variant="outline"
                  size="icon"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="fade-in-delayed-1 text-3xl sm:text-4xl font-bold mb-4">
              Featured Blog Posts
            </h2>
            <p className="fade-in-1 text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights, tutorials, and thoughts on web development, technology,
              and software engineering.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredBlogs.map((blog, i) => (
              <Card
                key={blog.id}
                className={`fade-in-delayed-${i + 1} group hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{blog.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {blog.readTime}
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {blog.title}
                  </CardTitle>
                  <CardDescription>{blog.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {blog.date}
                    </span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/blogs/${blog.id}`}>
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="fade-in-delayed-1 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/blogs">View All Blog Posts</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
