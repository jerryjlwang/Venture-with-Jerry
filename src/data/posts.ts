
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
}

export const posts: Post[] = [
  {
    id: "getting-started",
    title: "Getting Started with My Personal Blog",
    excerpt: "Welcome to my personal blog! Here's what you can expect and how I plan to share my thoughts and experiences.",
    content: `# Getting Started with My Personal Blog

Welcome to my personal blog! I'm excited to share this space with you where I'll be documenting my thoughts, experiences, and insights.

## What You Can Expect

This blog will be a mix of:
- Technical tutorials and insights
- Personal reflections and experiences
- Industry trends and analysis
- Creative projects and experiments

## Why I Started This Blog

I believe in the power of sharing knowledge and experiences. This blog serves as:
- A platform to document my learning journey
- A way to connect with like-minded individuals
- A space for creative expression
- A repository of useful information and tutorials

## Stay Connected

I'll be posting regularly, so make sure to check back often for new content. Feel free to reach out if you have any questions or suggestions for topics you'd like me to cover.

Thank you for being here, and I hope you find value in what I share!`,
    date: "2024-01-15",
    readTime: "3 min read"
  },
  {
    id: "web-development-tips",
    title: "Essential Web Development Tips for Beginners",
    excerpt: "A collection of practical tips and best practices for those starting their journey in web development.",
    content: `# Essential Web Development Tips for Beginners

Starting your journey in web development can be overwhelming. Here are some essential tips to help you navigate the learning process effectively.

## 1. Master the Fundamentals

Before diving into frameworks and libraries, ensure you have a solid understanding of:
- HTML5 semantic elements
- CSS3 properties and layouts
- JavaScript ES6+ features
- Responsive design principles

## 2. Practice Consistently

- Build projects regularly
- Code every day, even if it's just for 30 minutes
- Contribute to open-source projects
- Join coding challenges and hackathons

## 3. Learn Version Control

Git is essential for any developer:
- Learn basic Git commands
- Understand branching and merging
- Use GitHub or GitLab for your projects
- Practice collaborative workflows

## 4. Focus on Problem-Solving

- Break down complex problems into smaller parts
- Use debugging tools effectively
- Learn to read documentation
- Don't be afraid to ask for help

## 5. Stay Updated

The web development landscape evolves rapidly:
- Follow industry blogs and newsletters
- Attend webinars and conferences
- Join developer communities
- Experiment with new technologies

Remember, becoming a proficient developer is a marathon, not a sprint. Be patient with yourself and enjoy the learning process!`,
    date: "2024-01-20",
    readTime: "5 min read"
  },
  {
    id: "productivity-hacks",
    title: "Productivity Hacks That Changed My Life",
    excerpt: "Discover the simple yet effective productivity techniques that have helped me achieve more while maintaining work-life balance.",
    content: `# Productivity Hacks That Changed My Life

Over the years, I've experimented with various productivity techniques. Here are the ones that have made the biggest impact on my daily life and work.

## The Pomodoro Technique

This time management method has been a game-changer:
- Work for 25 minutes
- Take a 5-minute break
- Repeat 4 times, then take a longer break
- Helps maintain focus and prevents burnout

## Time Blocking

Instead of keeping a traditional to-do list:
- Block specific times for different activities
- Include buffer time between tasks
- Protect your most productive hours
- Batch similar activities together

## The Two-Minute Rule

If a task takes less than two minutes, do it immediately:
- Prevents small tasks from accumulating
- Reduces mental overhead
- Creates momentum for larger tasks
- Keeps your workspace organized

## Digital Minimalism

Reducing digital distractions has been crucial:
- Turn off non-essential notifications
- Use website blockers during focused work
- Keep your phone in another room when working
- Practice regular digital detoxes

## Weekly Reviews

Every Sunday, I spend 30 minutes:
- Reviewing the previous week's accomplishments
- Planning the upcoming week's priorities
- Adjusting goals and strategies
- Celebrating wins and learning from setbacks

These techniques aren't magic bullets, but when combined and practiced consistently, they can significantly improve your productivity and overall well-being.`,
    date: "2024-02-01",
    readTime: "4 min read"
  }
];
