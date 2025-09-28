export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          created_at: string
          id: string
          message: string
          status: string | null
          updated_at: string
          user_email: string
          user_name: string
          web: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          status?: string | null
          updated_at?: string
          user_email: string
          user_name: string
          web?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          status?: string | null
          updated_at?: string
          user_email?: string
          user_name?: string
          web?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          answer_nl: string
          category: string
          created_at: string
          id: string
          is_active: boolean | null
          question: string
          question_nl: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          answer: string
          answer_nl: string
          category: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          question: string
          question_nl: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          answer?: string
          answer_nl?: string
          category?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          question?: string
          question_nl?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          language_preference: string | null
          last_name: string | null
          theme_preference: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          language_preference?: string | null
          last_name?: string | null
          theme_preference?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          language_preference?: string | null
          last_name?: string | null
          theme_preference?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string
          bio_nl: string
          certifications: Json | null
          certifications_nl: Json | null
          created_at: string
          id: string
          is_active: boolean | null
          languages: Json | null
          name: string
          photo_url: string | null
          role: string
          role_nl: string
          sort_order: number | null
          specialties: Json | null
          specialties_nl: Json | null
          updated_at: string
        }
        Insert: {
          bio: string
          bio_nl: string
          certifications?: Json | null
          certifications_nl?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          languages?: Json | null
          name: string
          photo_url?: string | null
          role: string
          role_nl: string
          sort_order?: number | null
          specialties?: Json | null
          specialties_nl?: Json | null
          updated_at?: string
        }
        Update: {
          bio?: string
          bio_nl?: string
          certifications?: Json | null
          certifications_nl?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          languages?: Json | null
          name?: string
          photo_url?: string | null
          role?: string
          role_nl?: string
          sort_order?: number | null
          specialties?: Json | null
          specialties_nl?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      tours: {
        Row: {
          created_at: string
          description: string
          description_nl: string
          difficulty: string
          duration: string
          duration_nl: string
          featured_image: string | null
          gallery: Json | null
          id: string
          includes: Json | null
          includes_nl: Json | null
          is_active: boolean | null
          itinerary: Json | null
          itinerary_nl: Json | null
          max_participants: number
          price: number
          slug: string
          sort_order: number | null
          title: string
          title_nl: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          description_nl: string
          difficulty: string
          duration: string
          duration_nl: string
          featured_image?: string | null
          gallery?: Json | null
          id?: string
          includes?: Json | null
          includes_nl?: Json | null
          is_active?: boolean | null
          itinerary?: Json | null
          itinerary_nl?: Json | null
          max_participants?: number
          price: number
          slug: string
          sort_order?: number | null
          title: string
          title_nl: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          description_nl?: string
          difficulty?: string
          duration?: string
          duration_nl?: string
          featured_image?: string | null
          gallery?: Json | null
          id?: string
          includes?: Json | null
          includes_nl?: Json | null
          is_active?: boolean | null
          itinerary?: Json | null
          itinerary_nl?: Json | null
          max_participants?: number
          price?: number
          slug?: string
          sort_order?: number | null
          title?: string
          title_nl?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
