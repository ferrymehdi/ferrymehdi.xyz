import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Code2,
  Database,
  Globe,
  Monitor,
  Server,
  Smartphone,
} from "lucide-react";

const skills = {
  "Code & Tools": [
    {
      name: "VS Code",
      description:
        "My primary code editor for web development projects. I've customized it extensively with productivity extensions.",
      icon: <Monitor className="h-5 w-5" />,
    },
    {
      name: "Neovim",
      description:
        "I use Neovim for quick edits and when working on servers. My custom configuration boosts my productivity significantly.",
      icon: <Code2 className="h-5 w-5" />,
    },
    {
      name: "IntelliJ IDEA",
      description:
        "My preferred IDE for Java and Kotlin development with powerful refactoring tools and debugging capabilities.",
      icon: <Monitor className="h-5 w-5" />,
    },
    {
      name: "Android Studio",
      description:
        "I use Android Studio for mobile application development, taking advantage of its built-in tools for UI design and performance profiling.",
      icon: <Smartphone className="h-5 w-5" />,
    },
    {
      name: "Git",
      description:
        "Expert in version control with Git including branching strategies, resolving merge conflicts, and maintaining clean commit histories.",
      icon: <Code2 className="h-5 w-5" />,
    },
    {
      name: "Docker",
      description:
        "I leverage Docker for creating consistent development environments and deploying applications in containers.",
      icon: <Server className="h-5 w-5" />,
    },
  ],
  Development: [
    {
      name: "TypeScript",
      description:
        "My primary language for web development. I use TypeScript for all my frontend and Node.js projects to ensure type safety and better developer experience.",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      name: "Java/Kotlin",
      description:
        "Proficient in Java and Kotlin for backend services, Android development, and enterprise applications.",
      icon: <Code2 className="h-5 w-5" />,
    },
    {
      name: "Go",
      description:
        "I use Go for high-performance microservices and CLI tools, appreciating its simplicity and concurrency model.",
      icon: <Server className="h-5 w-5" />,
    },
    {
      name: "C/C++/C#",
      description:
        "Experience with the C family of languages for systems programming, game development, and Windows applications.",
      icon: <Code2 className="h-5 w-5" />,
    },
    {
      name: "React/Next.js",
      description:
        "My go-to frontend framework combination, enabling me to build performant, SEO-friendly web applications.",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      name: "SQL/NoSQL",
      description:
        "Experienced with various database technologies including PostgreSQL, MongoDB, and Redis for different data storage needs.",
      icon: <Database className="h-5 w-5" />,
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="fade-in-1 text-4xl sm:text-5xl font-bold mb-6">
            About Me
          </h1>
          <div className="prose prose-lg mx-auto text-muted-foreground">
            <p className="fade-in-delayed-1">
              I am <strong>EL MEHDI ELFERRY</strong>, but you can call me{" "}
              <strong>Ferry</strong>. I work as a Software Engineer and
              Full-stack Web Developer. When not working, I enjoy exploring new
              technologies and contributing to open-source projects.
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="fade-in-delayed-1 text-3xl font-bold mb-4">
              Skill Set
            </h2>
            <p className="fade-in-delayed-2 text-lg text-muted-foreground">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="fade-in-delayed-3 text-2xl font-semibold mb-6 flex items-center gap-2">
                {category === "Code & Tools" ? (
                  <Monitor className="h-6 w-6 text-primary" />
                ) : (
                  <Code2 className="h-6 w-6 text-primary" />
                )}
                {category}
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {items.map((skill, i) => (
                  <Card
                    key={skill.name}
                    className={`fade-in-delayed-${i + 1} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          {skill.icon}
                        </div>
                        {skill.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {skill.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {category !== "Development" && <Separator className="mt-12" />}
            </div>
          ))}
        </div>

        {/* Technologies */}
        <div className="mt-16 text-center">
          <h3 className="fade-in-delayed-6 text-xl font-semibold mb-6">
            Technologies I Work With
          </h3>
          <div className="fade-in-delayed-7 flex flex-wrap justify-center gap-3">
            {[
              "TypeScript",
              "React",
              "Next.js",
              "Node.js",
              "Java",
              "Kotlin",
              "Go",
              "Python",
              "PostgreSQL",
              "MongoDB",
              "Docker",
              "Git",
              "Tailwind CSS",
              "Spring Boot",
              "Android",
              "Linux",
            ].map((tech) => (
              <Badge key={tech} variant="secondary" className="px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

