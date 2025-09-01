export interface Service {
  id: number;
  category: "home_care" | "personal_care" | "reminders" | "medical_services";
  description: string;
}
