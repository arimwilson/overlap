export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      boards: {
        Row: {
          id: string;
          code: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          created_at?: string;
        };
      };
      board_users: {
        Row: {
          id: string;
          board_id: string;
          name: string;
          timezone: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          board_id: string;
          name: string;
          timezone: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          board_id?: string;
          name?: string;
          timezone?: string;
          created_at?: string;
        };
      };
      availability: {
        Row: {
          board_id: string;
          user_id: string;
          day_of_week: number;
          slot_index: number;
        };
        Insert: {
          board_id: string;
          user_id: string;
          day_of_week: number;
          slot_index: number;
        };
        Update: {
          board_id?: string;
          user_id?: string;
          day_of_week?: number;
          slot_index?: number;
        };
      };
    };
    Views: {};
    Functions: {};
  };
}
