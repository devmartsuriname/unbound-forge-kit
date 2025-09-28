# Entity Relationship Diagram

## Database Schema Overview

This document describes the database schema for the PingPe Jungle Resort platform, implemented with Supabase PostgreSQL.

### Core Tables

#### 1. contact_submissions
Stores contact form submissions from website visitors.

**Columns:**
- `id` (UUID, PRIMARY KEY) - Unique identifier
- `user_name` (TEXT, NOT NULL) - Name of the person contacting
- `user_email` (TEXT, NOT NULL) - Email address
- `web` (TEXT, NULLABLE) - Optional website URL
- `message` (TEXT, NOT NULL) - Contact message content
- `status` (TEXT, DEFAULT 'new') - Submission status (new, in_progress, resolved)
- `created_at` (TIMESTAMP, DEFAULT now()) - When submitted
- `updated_at` (TIMESTAMP, DEFAULT now()) - Last updated

**RLS Policies:**
- Anyone can create contact submissions (INSERT)
- Admins can view and update all submissions (SELECT, UPDATE)

#### 2. tours
Stores tour information with multilingual content.

**Columns:**
- `id` (UUID, PRIMARY KEY)
- `title` (TEXT, NOT NULL) - English title
- `title_nl` (TEXT, NOT NULL) - Dutch title
- `description` (TEXT, NOT NULL) - English description
- `description_nl` (TEXT, NOT NULL) - Dutch description
- `duration` (TEXT, NOT NULL) - Duration in English
- `duration_nl` (TEXT, NOT NULL) - Duration in Dutch
- `price` (NUMERIC, NOT NULL) - Tour price
- `max_participants` (INTEGER, DEFAULT 8)
- `difficulty` (TEXT, NOT NULL) - Difficulty level
- `slug` (TEXT, UNIQUE, NOT NULL) - URL slug
- `is_active` (BOOLEAN, DEFAULT true)
- `sort_order` (INTEGER, DEFAULT 0)
- `itinerary` (JSONB) - English itinerary items
- `itinerary_nl` (JSONB) - Dutch itinerary items
- `includes` (JSONB) - What's included (English)
- `includes_nl` (JSONB) - What's included (Dutch)
- `gallery` (JSONB) - Gallery image URLs
- `featured_image` (TEXT) - Main tour image
- `created_at` (TIMESTAMP, DEFAULT now())
- `updated_at` (TIMESTAMP, DEFAULT now())

**RLS Policies:**
- Public can view active tours (SELECT)
- Admins can manage all tours (ALL)

#### 3. team_members
Stores team member profiles with multilingual content.

**Columns:**
- `id` (UUID, PRIMARY KEY)
- `name` (TEXT, NOT NULL)
- `role` (TEXT, NOT NULL) - English role
- `role_nl` (TEXT, NOT NULL) - Dutch role
- `bio` (TEXT, NOT NULL) - English biography
- `bio_nl` (TEXT, NOT NULL) - Dutch biography
- `photo_url` (TEXT) - Profile photo URL
- `specialties` (JSONB) - English specialties array
- `specialties_nl` (JSONB) - Dutch specialties array
- `languages` (JSONB) - Languages spoken
- `certifications` (JSONB) - English certifications
- `certifications_nl` (JSONB) - Dutch certifications
- `is_active` (BOOLEAN, DEFAULT true)
- `sort_order` (INTEGER, DEFAULT 0)
- `created_at` (TIMESTAMP, DEFAULT now())
- `updated_at` (TIMESTAMP, DEFAULT now())

**RLS Policies:**
- Public can view active team members (SELECT)
- Admins can manage all team members (ALL)

#### 4. faqs
Frequently asked questions with multilingual content.

**Columns:**
- `id` (UUID, PRIMARY KEY)
- `question` (TEXT, NOT NULL) - English question
- `question_nl` (TEXT, NOT NULL) - Dutch question
- `answer` (TEXT, NOT NULL) - English answer
- `answer_nl` (TEXT, NOT NULL) - Dutch answer
- `category` (TEXT, NOT NULL) - FAQ category
- `is_active` (BOOLEAN, DEFAULT true)
- `sort_order` (INTEGER, DEFAULT 0)
- `created_at` (TIMESTAMP, DEFAULT now())
- `updated_at` (TIMESTAMP, DEFAULT now())

**RLS Policies:**
- Public can view active FAQs (SELECT)
- Admins can manage all FAQs (ALL)

#### 5. profiles
Extended user profile information linked to Supabase auth.

**Columns:**
- `id` (UUID, PRIMARY KEY, REFERENCES auth.users)
- `first_name` (TEXT)
- `last_name` (TEXT)
- `avatar_url` (TEXT)
- `theme_preference` (TEXT, DEFAULT 'system')
- `language_preference` (TEXT, DEFAULT 'en')
- `created_at` (TIMESTAMP, DEFAULT now())
- `updated_at` (TIMESTAMP, DEFAULT now())

**RLS Policies:**
- Users can view/update their own profile (SELECT, UPDATE, INSERT)

#### 6. user_roles
Role-based access control mapping.

**Columns:**
- `id` (UUID, PRIMARY KEY)
- `user_id` (UUID, REFERENCES auth.users, NOT NULL)
- `role` (app_role ENUM, NOT NULL) - admin, moderator, or user
- `created_at` (TIMESTAMP, DEFAULT now())

**RLS Policies:**
- Admins can manage all user roles (ALL)

### Storage Buckets

#### 1. team-photos (Public)
- Profile photos for team members
- Public read access, admin write access

#### 2. tour-gallery (Public)
- Tour images and galleries
- Public read access, admin write access

#### 3. content-media (Public)
- General content media files
- Public read access, admin write access

### Security Functions

#### fn_is_admin(user_uuid)
Security definer function to check if a user has admin role.

#### fn_current_role()
Security definer function to get current user's role.

#### has_role(user_id, role)
Security definer function to check if user has specific role.

### Triggers

#### update_updated_at_column()
Automatic trigger function to update `updated_at` timestamp on row modifications.

#### handle_new_user()
Trigger to automatically create profile when new user signs up.

### Data Flow

```
Frontend → Supabase Client → RLS Policies → Database
                          ↓
                    Edge Functions (for email notifications)
                          ↓
                       Resend API
```

### Security Considerations

1. **Row Level Security (RLS)**: Enabled on all tables with appropriate policies
2. **Role-based Access**: Admin/moderator roles for content management
3. **Input Validation**: Zod schemas on frontend and database constraints
4. **API Rate Limiting**: Implemented in Edge Functions
5. **Storage Security**: Bucket policies control file access

This schema provides a solid foundation for the PingPe Jungle Resort platform with proper multilingual support, content management, and security controls.