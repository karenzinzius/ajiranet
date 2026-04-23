export type JobAd = {
  id: string;
  title: string;
  employer: string;
  location: string;
  wage: string;
  schedule: string;
  description: string;
  skills: string[];
  postedAgo: string;
  status: "Open" | "Urgent" | "Filled";
};

export const sampleJobs: JobAd[] = [
  {
    id: "house-cleaning-mikocheni",
    title: "House cleaning and laundry support",
    employer: "Mama Amina",
    location: "Mikocheni, Dar es Salaam",
    wage: "TSh 35,000 / day",
    schedule: "Weekdays, 8am–2pm",
    description:
      "Reliable cleaner needed for daily home support. Tasks include sweeping, mopping, washing clothes, and light kitchen help.",
    skills: ["Cleaning", "Laundry", "Household management"],
    postedAgo: "2 hours ago",
    status: "Open",
  },
  {
    id: "childcare-kibamba",
    title: "Childcare support for two toddlers",
    employer: "Family of 4",
    location: "Kibamba, Dar es Salaam",
    wage: "TSh 45,000 / day",
    schedule: "Monday–Friday, 9am–4pm",
    description:
      "Looking for a warm and trustworthy childcare helper to look after two toddlers, prepare meals, and tidy the play area.",
    skills: ["Childcare", "Cooking", "Organizing"],
    postedAgo: "5 hours ago",
    status: "Urgent",
  },
  {
    id: "gardening-masaki",
    title: "Garden care and errands assistant",
    employer: "Mr. Juma",
    location: "Masaki, Dar es Salaam",
    wage: "TSh 30,000 / day",
    schedule: "3 days per week",
    description:
      "Need a reliable helper for garden watering, weeding, and small errands such as buying groceries.",
    skills: ["Gardening", "Errands", "Outdoor care"],
    postedAgo: "1 day ago",
    status: "Open",
  },
];
