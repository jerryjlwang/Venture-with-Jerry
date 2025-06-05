
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
    date: "2025-01-15",
    readTime: "3 min read"
  },
  {
    id: "Kirby Winfield-Ascend",
    title: "Start Ups Galore",
    excerpt: "Learn about Kirby's journey and his tips on breaking into venture capital.",
    content: `I met with Ascend VC's Founding General Partner Kirby Winfield to talk about his outlook on venture capital and how to break into it in the future.
    
    The first thing to understand is that there is no better experience than working at a start-up. In fact, work at as many start-ups as you can while you're young and energetic so that you can understand the business environment and learn as much as possble. Kirby himself has been apart of numerous start-ups since his college years, involving himself in numerous exits that introduced him to the VC world.
    
    But how do you break into start-ups?
    
    Kirby says to make yourself useful to everyone. His first start-up opportunity arose from just being a helpful person, and that is a continuity throughout most start-ups. Don't think about just equipping yourself with certifications or courses. Everyone can do that. Learn applicable skills that have utility and you'll be noticed much quicker than you think.
    
    Another question that arose is the evolution of VC with AI.
    
    I asked him whether he envisioned a declining role with venture capitals firms in funding stages and he was firm on its solidarity. He used quantum AI as an example, stating that VC won't be disappearing anytime soon because technoloy is constantly developing. Even with strong revenue models and distribution strategies, funding from venture capitals is always needed to get ahead in the market, and the value that VC firms are bringing to early-stage start-ups is indispensable.
    
    That wraps up my learnings from this interview with Kirby. Make sure to check him out on linkedin or on Ascend VC's website. If you want to learn more my contacts are in the about section.
    
    Until the next one!`,
    date: "2025-05-06",
    readTime: "2 min read"
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
