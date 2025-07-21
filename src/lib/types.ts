export interface User {
  id: string;
  name: string;
  timezone: string;
}

// Availability is a map of time slots (e.g., "0-0" for Sun 12:00-12:30 AM UTC) to boolean
export type Availability = Record<string, boolean>;

export interface Board {
  id: string;
  users: User[];
  availability: Record<string, Availability>;
}
