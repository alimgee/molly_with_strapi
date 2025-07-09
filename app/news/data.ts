// Article data - sample articles for now, will be replaced with Strapi data
export const Articles = [
  {
    id: "1",
    name: "Childhood Cancer Awareness Month",
    content: "September is Childhood Cancer Awareness Month. Learn about the signs and symptoms to watch for.",
    link: "https://example.com/childhood-cancer-awareness",
    date: "2024-09-01",
    provider: "Sample News"
  },
  {
    id: "2", 
    name: "Supporting Families Through Cancer Treatment",
    content: "How families can access support services during a childhood cancer diagnosis.",
    link: "https://example.com/supporting-families",
    date: "2024-08-15",
    provider: "Health News"
  }
];

export interface Article {
  id: string;
  name: string;
  content: string;
  link: string;
  date: string;
  provider: string;
}
