
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  imageUrl?: string;
}

export const posts: Post[] = [
  {
    id: "getting-started",
    title: "Getting Started with My Personal Blog",
    excerpt: "Welcome to my personal blog! Here's what you can expect and how I plan to share my thoughts and experiences.",
    content: `# Getting Started with My Personal Blog

Welcome to my personal blog! I'm excited to share this space with you where I'll be documenting my VC interviews.

## What You Can Expect

This blog will: 
- summarize my interviews with VC professionals
- show my own insights
- give recommendations on pursuing VC as a path

## Why I Started This Blog

I believe in the power of sharing knowledge and experiences. This blog serves as:
- A platform to document my journey to VC (in high school)
- A way to connect with like-minded individuals
- A space for others to learn finance and venture capitalism

## Stay Connected

I'll be posting regularly, so make sure to check back often for new content. Feel free to reach out if you have any questions or suggestions for firms that I should interview.

Thank you for being here, and I hope you find value in what I share!`,
    date: "2025-05-05",
    readTime: "2 min read",
    imageUrl: "/lovable-uploads/b7f4222c-402c-4621-9437-54726053d142.png"
  },
  {
    id: "Kyle Lui-Bling Capital",
    title: "Fintech's a pretty big industry",
    excerpt: "See Kyle Lui's thoughts on fintech and how it's broken down into consumer, prosumer, and enterprise.",
    content: `Fintech's a field that has no right or wrong solution.

Sometimes you break out by doing something wildly different, like how Robinhood democratized trading for the common investor. No huge fees. No friction.

Other times you build deep technical moats that prevent competitors from catching up quickly.

I had a conversation with Kyle Lui, General Partner at Bling Capital, about how fintech and other verticals are evaluated at Bling and how fintech can be seen as different industries.

First, I want to point out that Bling has a very consistent framework for evaluating all startups. In fact, they publicly post this startup guide on their company blog. Even for a vertical like fintech which differs greatly from the others, the "hair on fire" method and Bling's other tools can conduct deep diligence and excel in early stage validation.

Now, onto fintech.

Consumer fintech is public facing and usually gains traction from ease of use. It's more so a consumer product than a financial service. For an early stage investor to find conviction, the startup must have a strong marketing scheme and deliver a product that scales with the average joe and not just experienced users. There's a little less focus on regulatory, as these startups are able to borrow things—such as banking licenses—and work around some of those regulatory considerations with partner integrations. They just need to meet the bare minimum of regulation, and focus most of their efforts of engagement and acquisition.

Enterprise fintech, on the other hand, should be rooted in security and compliance. It needs to be a product that disrupts a current mode of utility. And to do that, they must be careful in either creating proprietary products that need to be compliant or finding new integrations that are so high friction for later startups that it is well protected. This large emphasis on security and compliance can actually be a USP for enterprise fintech, whereas for consumer tech it's just a hurdle.

Then, there's the middle ground, Fintech that serves the prosumer and SMB's. There are a lot of tools that are typically used for enterprise use and fall in the hands of skilled individuals. For example, angel investors who utilize PitchBook services. This is an interesting domain because a lot of the time a financial service isn't created to target prosumers, but many individuals find so much utility in a tool that it makes sense to buy it for themselves. For small businesses, no matter how many employees work there, financial services like Quickbooks can work extremely well. So, anything outside of consumer and enterprise falls into this sort of range, where a large market still exists, but the usage is much more dependent on other factors.

Those are my biggest learnings from my interview with Kyle, thanks for reading until the end and make sure to check out my blog for more interviews like this.`,
    date: "2025-08-05",
    readTime: "3 min read",
    imageUrl: "https://www.svod.org/wp-content/uploads/2015/04/Kyle-Lui.jpg"
  },
  {
    id: "Geoff Entress-Pioneer Square Labs",
    title: "What's a venture studio?",
    excerpt: "Learn about Geoff Entress's take on operating a startup studio and how to successfully validate venture concepts",
    content: `Venture studios are an amazing way for early startup ideas to be validated.

Today, I had a great conversation with Geoff Entress, co-founder of Pioneer Square Labs, about their venture studio and their investment methodology.

The venture studio acts as a space where internal and external venture ideas are pursued and evaluated with customer validation and traction building. Historically, it's been a 50/50 split for PSL where half the ideas come from solopreneurs or small founding teams and the other half coming from their own ideation. Really, the most important step in committing to a studio concept is the customer interest. It's really common for consumers to display interest but be unwilling to pay the cost, and it's even more common for there to be no interest at all. That's why PSL frequently finds success in bridging ideas such that concepts which have been validated well previously can be applied to new verticals. In current times, this means applying AI to new use cases, with repeatable frameworks that appeal greatly to consumers.

The building scheme is an intense, iterative process in which designs are drawn up for the MVP, an engineering team is brought on, and a potential CEO is scouted out. The product, if validated, will then be built and the company gets spun out with its own CEO. Where it differs from the traditional investing process is that instead of taking a smaller operator role on the board of the portfolio company, PSL will fully engage in building the company from the ground up. The studio serves its own LP base and so funds are raised to incubate these ventures. When the company is finally built, PSL retains some equity while the company is left to scale itself. 

To date, PSL has successfully spun out 41 ventures (out of over 400 ideas), one of which being Boundless Immigration. The idea was incubated internally, when they realized that immigration was faulty and unnecessarily complicated. It was a real problem, and the alternative of getting an immigration lawyer was costly and time consuming. There were many regulatory pressures that they faced especially due to the legality of it all, but the market was great and they found a CEO who had lived experience.

This building process greatly parallels unbacked startup construction, and I think it's a great model to follow for aspiring startups. Early-stage validation is everything, and while you may not have to work with a venture studio to achieve this, it sure is a nice path to consider.`,
    date: "2025-07-29",
    readTime: "3 min read",
    imageUrl: "https://cdn.prod.website-files.com/5d3152346d95065922960b3a/5db8926210ff3a24201739ff_Geoff.jpg"
  },
  {
    id: "Erik Benson-Voyager Capital",
    title: "Is agriculture the future?",
    excerpt: "Learn about Erik Benson and his insights on agtech and how a trillion dollar industry is changing.",
    content: `Write on your Linkedin that you're building something. 

Maybe a VC will reach out. Maybe you'll see Erik Benson (Managing Director at Voyager Capital) in your inbox if you get really lucky.

But how much does luck really factor into creating a major startup?

Probably a lot, and that's why VC's will take chances on founders with aspirations to scale their companies 1000x within just a few years.

If you're a founder with 5% revenue growth every year, forget about being VC-backed. Try your luck out. Have goals to scale as much as humanly possible and maybe you'll catch the interest of some partners.

This desire for massive growth is one reason 80% of Erik's attention is on agtech (besides growing up on a crop farm in Skagit Valley). Around 8 years ago, the industry started to see major exits with companies like The Climate Corporation which led Voyager Capital to consider it seriously. Erik identifies that one reason it took off is because older farm owners were beginning to pass their land off to their middle-aged tech educated kids. As a result, more and more farms were becoming receptive to implementing modern technologies.

Adoption of agtech skyrocketed. Farmers were now using tech to kill weeds, test land fertility, and much more to boost supply and quality. The way the world is set up right now, building hardware and software for use cases in agriculture can be so effective. There are so many new technologies being developed daily that can solve tangible problems on the farm with precision and scale.

Take Carbon Robotics—one of the earliest agtech companies in the fund's portfolio. They created a revolutionary tool that removes weeds with precision lasers. With a neural network and some NVIDIA GPU's, they were able to turn a laborious task that either required hours of manual work or potentially hazardous chemicals into an automated, cost-effective system. And now, they're valued at $375 million, with institutional investors wanting to take them public, calling them the Tesla of agtech.

Agriculture is the staple of any functioning country. It's a vertical that can constantly see demand for new technologies, and there's no doubt that AI will revolutionize it. It represents an astounding market of over $20 billion, and is expected to more than DOUBLE within 5 years.

That wraps up my learnings from my interview with Erik. A huge thank you to him for chatting with me. Also make sure to attend his AMA webinar on the 17th to learn more about the amazing industry of agtech!`,
    date: "2025-07-08",
    readTime: "3 min read",
    imageUrl: "https://s3.amazonaws.com/hoth.bizango/images/985412/008.jpg"
  },
  {
    id: "Aviel Ginzburg-Founders\' Co-op",
    title: "Build, Build, Build",
    excerpt: "Learn about Aviel's opinion on making it to the VC space and operating several funds.",
    content: `Just build.

That's the biggest piece of advice that I received from Aviel Ginzburg, General Partner at Founders Co-op. The world as it is right now could not be any better for building from scratch. Data is so accessible that tools can quickly become useful and scale just presents itself. If you really want to go into VC the finance route is becoming less and less appealing. It's arduous and doesn't promise the same industry experience that startups can offer.

It also allows you to spread yourself out. Aviel is an incredibly fast-paced individual, starting new projects and researching into new fields constantly. It's something that VC can offer that staying at a company doesn't—flexibility in pursuing whatever seems interesting. And, there's no requirement to become experts in every technical domain. You can remain at the high level, and still be incredibly effective.

I also learned that VC plays a bigger role in startups than what I originally thought. Aviel described to me what it was like being funded by Founders' Co-op in his startup. It was enough to get him to not go to YC, but the capital wasn't the only motivator. Having VC's invest in your startup is an incredible confidence boost that your product is worth it to pursue. I can imagine it too. Getting backed by previous industry leaders, it's a sign that you have the ability to do whatever it takes to make your product work. VC's aren't just there to make returns for their LP's, they can actively advance technological innovation by pushing founders to success.

One key VC topic that I learned through this interview is how funds actually run. Traditionally, they've always been 2-year, 3-year, or 4-year cycles; this is when capital is invested into new companies to build the fund's portfolio. This also means that funds are deployed concurrently, but new companies are only added through the latest fund. The other funds sustain another ~3-7 years of fund life, where capital is further invested into companies already part of that fund. This means reserving capital for follow-on in later funding stages and bridge rounds. Aviel actively invests out of 4 funds currently, which is just insane to think about.

That's all I have to share for today. Thanks for reading until now and make sure to check out my other interviews too!

If you're a generous VC professional with advice for me I'd love to set up an interview please reach out. 

Thanks to Aviel Ginzburg and Founders Co-op for supporting my VC journey!`,
    date: "2025-07-03",
    readTime: "3 min read",
    imageUrl: "https://www.founderscoop.com/wp-content/themes/founderscoop/images/team/aviel-ginzburg.jpg"
  },
  {
    id: "Hope Cochran-Madrona",
    title: "Where's the Parking in Seattle?",
    excerpt: "Discover Hope's insights on VC and how her CFO backgrounds has put her in the position she has today.",
    content: `What's the best way to find parking in Seattle? 

I don't have an answer, and neither does Hope Cochran from Madrona.

However, we can both agree that that's not the hardest part of VC (it might be a close second). Besides complaining about Seattle traffic, we also had a great conversation about VC and how her path brought her to the Managing Director position.

Hope has always been an entrepreneurial person, and at a very young age already knew she wanted to pursue finance, just like me. After finding success as a founder, she jumped into two CFO positions (one at the developer of Candy Crush!), in which she helped lead both IPO's. This path again reiterates that VC is not a normal first job, or even a second. It requires tons of industry expertise, something that Hope has learned on the job operating at the C-suite level.

What also sets her apart is her initiative. She leads Madrona's OnBoarding Women Program, a free yet rigorous bootcamp that prepares women for board positions at top companies (and it's already placed 100+ women on boards!). Unique programs like these are so beneficial to the entrepreneurial space, creating accessibility for those who may be overwhelmed by the current market. Having instruction and mentorship at this level is so crucial to succeeding in this space, and there are so many other programs out there that can immensely boost people's careers.

She also spoke about how VC can be broken down into three lanes. 

The first is the investing side. They concern themselves with doing the diligence, writing the investment memo, putting together the construct of a deal, and really just working in the field to make investments happen.

The second lane is comprised of building the company. Directors will sit on boards, but Hope says it's really just a silly title for working side by side with the CEO to actually build the company.

The third lane is the most technical. This is where a firm will craft its investment thesis with hours and hours of research. Directors will hone in on their own knowledge by learning about the newest industry developments, implementing that into their methodology to keep track of innovative ideas and ask complicated questions. Hope tells me about how Madrona works in this lane, having literal meetings on what's new in the world and how the portfolio companies may benefit from the big headlines.

It's an important lesson for founders too. Keeping up with the latest news is incredibly important for maintaining relevant businesses, especially when trying to get help from VC's. I know what I'm adding to my morning routine.

That wraps up today's interview with Hope. Let me know if there's anything VC related that you'd like me to cover in these interviews, and I'll be happy to ask.
    
Until the next one!`,
    date: "2025-06-24",
    readTime: "3 min read",
    imageUrl: "https://www.madrona.com/wp-content/uploads/2014/11/HopeCochran-Full.jpg"
  },
  {
    id: "Paul Goodrich-Madrona",
    title: "Why are all venture capitals trees?",
    excerpt: "Learn about Paul's unorthodox journey to venture capital and how he helped build the biggest VC in Washington.",
    content: `Why are all venture capitals named after trees?

Just kidding, that wasn’t really the topic when I interviewed Paul Goodrich, co-founder of and managing director at Madrona (a tree). Though, I do still wonder why that is. 

Madrona is the biggest venture capital in Washington, and they’ve invested in some of the biggest tech companies to come out of here.

Their biggest deal came from Snowflake, with a record $3.4 billion raised from their IPO under Madrona’s management. Paul told me this was an example of the general rule in venture capital in which really only one successful company is needed to make the whole fund. It’s easy for fund managers to get discouraged when almost all of their investments go bankrupt, but that’s the thing with venture capital. Investing with limited liability creates a fixed downside for the companies that do fail, and a huge potential upside with star companies like Snowflake.

How does Madrona find these companies?

Paul travels day and night networking and consulting with founders to find potential deals. Stimulating deal flow is the most important aspect of venture capital, and knowing who to talk to greatly expedites that process. He values long term relationships with the founders he meets and a lot of time, he builds connections with people that aren’t even founders yet. Leaving a positive impression on likely entrepreneurs is crucial in venture capital because establishing these connections before the founder spikes gives a competitive advantage for early funding.

He also reiterates that venture capital is a long haul. Coming from a law background, he didn’t have much experience with venture capital, but he was taught to be analytical and view things from different perspectives. These are both valuable skills in being a successful partner, but Paul doesn’t advise going that route.

He suggested either follow the traditional route of grinding through college, working through wall street, and getting an MBA; or, jumping into startups early, attaining soft and technical skills, and then entering VC. Both routes are very viable, yet he still prefers the startup method because of how it prepares you for diligence and business evaluation. Founders see clear as day how an early stage company startup works and whether it’s on the path to success. Understanding these “success factors” makes VC a lot easier, and empathizing and relating to founders is a great way to ensure workability.

That wraps up my learnings from this interview with Paul. Make sure to check him out on linkedin or on Ascend VC's website. If you want to learn more my contacts are in the about section.
    
Until the next one!`,
    date: "2025-06-08",
    readTime: "4 min read",
    imageUrl: "https://www.madrona.com/wp-content/uploads/2014/11/Goodrich_20A0303full.jpg"
  },
  {
    id: "Jake Nibley-Tola Capital",
    title: "Getting into VC early",
    excerpt: "Learn how Jake got into VC so early in his career.",
    content: `I recently got the chance to connect with Jake Nibley from Tola Capital, and his path into venture capital is a story worth sharing. Jake jumped into the startup world early on, picking up real operating experience before most people even think about VC. That early exposure gave him a unique perspective, and now at Tola he’s helping identify and back the next wave of enterprise software founders.

One of the most interesting parts of our conversation was around dilution in funding rounds. Jake explained how it’s one of the most overlooked parts of fundraising. Founders often just want to get a deal done, but don’t always think about the ripple effects a few years down the line.

At the seed stage, giving up 10–15% might feel small. But by the time a company hits Series B or C, the cumulative dilution can leave founders with a lot less ownership—and in some cases, less control—than they expected. Jake stressed that smart founders think several rounds ahead. How much equity do you want to hold when you’re at scale? What’s the trade-off between raising more capital today vs. preserving flexibility for the future?

He also shared how investors pay close attention to this. It’s not just about the product or the market—cap table management is a signal of how thoughtful and strategic a founder is. The ones who can balance raising enough to grow while still protecting ownership show the kind of foresight investors love to see.

I walked away really impressed by Jake—not just because he’s carved out a space in VC at such a young age, but because of how clearly he’s able to break down complex topics like dilution into actionable lessons for founders. Definitely grateful for the chance to learn from him.`,
    date: "2025-05-15",
    readTime: "3 min read",
    imageUrl: "https://tolacapital.com/wp-content/uploads/2023/06/jake-nibley.webp"
  },
  {
    id: "Anthony Bontrager-West River Group",
    title: "The path to VC",
    excerpt: "See how Anthony made his way to VC and how he navigates diligence.",
    content: `Today I had an amazing conversation with Anthony Bontrager, managing director at West River Group. They manage a staggering $2 billion in total assets in their portfolios, and Anthony has helped lead their investments for years.
    
    We discussed the diligence process, and how he works through deal flow. As a large fund, they cycle through tons of pitches every single day. Whether they're looking for pre-seed, seed, or even some series investments, the team will take a meticulous look at the team and their product offering. Sometimes, diligence can even take MONTHS, although that is more relatable for larger growth stage companies early in their funding level.
    
    With reference to their early stage validation, Anthony talked about how WestRiver Group does both founder-focused probing in addition to extensive internal research. Analysts will spend hours and hours conducting competitor analyses, customer validation, and realistic evaluations which are all assessed when determining if an investment is reliable.
    
    This process is tough and arduous, so I was curious as to what happens at the end of a long diligence period if there's no fit. Anthony told me that since West River Group is a generous fund, they make sure to help out founders as much as possible even if they aren't ultimately purchasing equity. This comes in the form of introducing them to new investors, presenting them to some big contracts, and even connecting them with their portfolio companies.
    
    That wraps up my learnings for today, I'm very grateful for Anthony's time and how generous he was with handing out free advice.`,
    date: "2025-05-09",
    readTime: "3 min read",
    imageUrl: "https://media.licdn.com/dms/image/v2/D4D03AQHJvaFx1KSfdg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1697129347380?e=2147483647&v=beta&t=MQHkIpgS3hMLGvDqB_7uw7yDplMgBGlEe3Z8WA2KlJg"
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
    readTime: "2 min read",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSihBj705kxu4eM5TbGBxxE8_nHkU-Ka3yB7Q&s"
  },
  {
    id: "Pablo Casillimas-OneSixOne Ventures",
    title: "Starting a VC right out of college",
    excerpt: "Learn about Pablo's path from college to VC and how backyard meetups turned into full scale dealflow events.",
    content: `Recently I got the chance to interview Pablo Casillimas, Managing Director at OneSixOne Ventures, for a school career exploration project. I met him at my internship the previous summer, so I knew he was a great person to reach out to. What we discussed was how he got into the VC space and what sort of things young, ambitious builders should be doing now to get a head start.
    
    Firstly, Pablo recalled his experience at the University of Florida, where he was was an engineering student. He found that engineering really wasn't that engaging so he started hosting backyard meetups that featured speakers and founders from all over Gainsville. Slowly but surely, these events started to make money, and Pablo went all in on creating a community-first venture capital. As of now, they've raised 4 million for their fund I and have several amazing portfolio companies in their belt.
    
    What OneSixOne excels at is making connections. In all the major tech hubs in the US--Seattle, San Francisco, and New York--they've built strong ties with prominent VC's and founders. In addition, they have an optimistic outlook on the future of tech in Florida. Thousands of capable migrants are flooding Florida cities every year and have the ability to massively contribute to wealth creation. OnesixOne is firm on staying ahead of this trend, so they've headquartered in Miami and have representative investments from there as well.
    
    Another thing that came across our conversation was how young builders should be thinking about their paths. The best thing, in Pablo's opinion, is identifying your strengths and your weaknesses. This way you can find people people that suppllement your strengths and complement your weaknesses. A key reseource that he unveiled as having helped him understand his strengths the most is the strengthsfinder 2.0 test. It helps assess your personality based on your responses to certain situations, and gives you your top traits that can make you successful. I highly recommend everyone try the test out as maybe it could change your perspective on everything.
    
    That's about it for our conversation, I'm super happy to have had Pablo as my first connection opportunity in the professional field and I hope it's just the start!`,
    date: "2025-01-06",
    readTime: "2 min read",
    imageUrl: "https://emergeamericas.com/wp-content/uploads/2025/03/77a8-400o400o1-PV9L5rZTUqhWFzTVnUeTwb.png"
  },
];
