export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author?: string;
  image?: string;
  featured?: boolean;
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "uganda-music-industry-record-2026",
    title: "Uganda's Music Industry Revenue Hits Record High in 2026",
    excerpt:
      "The Ugandan music industry has seen unprecedented growth, with streaming revenues and live performances driving a 45% increase year-over-year.",
    content:
      "The Ugandan music industry has experienced its strongest year on record in 2026, with total revenue surging 45% compared to 2025. Streaming platforms, live concerts and brand partnerships have all contributed to the boom, cementing Uganda's place as one of East Africa's most exciting music markets.\n\nFace TV has played a central role in amplifying this growth, providing artists with daily airtime, promotional support and exclusive interviews. Industry analysts credit channels like Face TV with helping new acts break through to mainstream audiences both at home and across the diaspora.\n\nLooking ahead, stakeholders are optimistic that continued investment in production quality, distribution infrastructure and intellectual property protection will sustain the upward trend well into 2027.",
    category: "Industry",
    date: "Apr 4, 2026",
    author: "Face TV Newsroom",
    featured: true,
  },
  {
    slug: "startimes-expands-east-africa",
    title: "StarTimes Expands Digital Coverage Across East Africa",
    excerpt:
      "StarTimes has announced expanded digital TV coverage reaching 5 million more households across Uganda, Kenya, and Tanzania.",
    content:
      "StarTimes has unveiled an ambitious expansion plan that will bring affordable digital TV to an additional 5 million households across East Africa. The rollout includes new transmission infrastructure, localised content packages and discounted decoders for low-income families.\n\nFace TV, which broadcasts on StarTimes CH 223 and ST 199, will be a featured channel across the expanded footprint, giving Ugandan artists unprecedented regional reach.",
    category: "Broadcasting",
    date: "Apr 3, 2026",
    author: "Face TV Newsroom",
  },
  {
    slug: "face-tv-awards-2026-nominations",
    title: "Face TV Awards 2026 Nominations Announced",
    excerpt:
      "The annual Face TV Awards celebrating Uganda's best musical talent has released its nomination list featuring 50 artists across 12 categories.",
    content:
      "The Face TV Awards 2026 nominations are out, recognising 50 artists across 12 categories ranging from Best New Artist to Video of the Year. Voting opens to the public next week and the winners will be announced at a televised gala in Kampala.",
    category: "Entertainment",
    date: "Apr 2, 2026",
    author: "Face TV Newsroom",
  },
  {
    slug: "tourism-board-music-partnership",
    title: "Uganda Tourism Board Partners With Music Industry",
    excerpt:
      "A new partnership aims to use Ugandan music videos to promote tourism destinations, featuring iconic locations in music videos aired on Face TV.",
    content:
      "The Uganda Tourism Board has signed a memorandum of understanding with leading music labels and Face TV to showcase the country's most iconic destinations through music videos. Productions filmed at qualifying locations will receive promotional support and tax incentives.",
    category: "Partnership",
    date: "Apr 1, 2026",
    author: "Face TV Newsroom",
  },
  {
    slug: "ugandan-artists-international",
    title: "New Ugandan Artists Breaking International Markets",
    excerpt:
      "Several Ugandan artists featured on Face TV have secured international distribution deals, marking a new era for Ugandan music on the global stage.",
    content:
      "A wave of Ugandan artists is breaking into international markets, signing distribution and publishing deals with global majors. Many credit early exposure on Face TV with helping them build the audience that attracted international attention.",
    category: "Music",
    date: "Mar 30, 2026",
    author: "Face TV Newsroom",
  },
  {
    slug: "tv-advertising-grows-uganda",
    title: "Digital Advertising on TV Platforms Grows 60% in Uganda",
    excerpt:
      "Television advertising in Uganda has seen massive growth as brands recognize the power of channels like Face TV to reach young demographics.",
    content:
      "Television advertising in Uganda grew 60% year-over-year as brands re-discover the power of premium video to reach engaged, young audiences. Face TV remains a top destination for advertisers targeting Uganda's music-loving 18–34 demographic.",
    category: "Advertising",
    date: "Mar 28, 2026",
    author: "Face TV Newsroom",
  },
  {
    slug: "kampala-music-festival-2026",
    title: "Kampala Music Festival Returns With Face TV as Media Partner",
    excerpt:
      "The biggest music festival in East Africa is back, with Face TV providing live coverage and exclusive behind-the-scenes content.",
    content:
      "The Kampala Music Festival returns this summer with Face TV as the official media partner. Viewers can expect live broadcasts, backstage interviews and curated highlights across all Face TV platforms.",
    category: "Events",
    date: "Mar 26, 2026",
    author: "Face TV Newsroom",
  },
  {
    slug: "creative-economy-initiative",
    title: "Government Launches Creative Economy Initiative",
    excerpt:
      "Uganda's Ministry of ICT has launched a new initiative to support the creative economy, with Face TV among the key industry partners.",
    content:
      "Uganda's Ministry of ICT has launched a creative economy initiative aimed at supporting artists, producers and broadcasters. Face TV has been named among the founding industry partners and will help shape training and distribution programmes.",
    category: "Policy",
    date: "Mar 24, 2026",
    author: "Face TV Newsroom",
  },
];

export const getArticleBySlug = (slug: string) =>
  newsArticles.find((a) => a.slug === slug);
