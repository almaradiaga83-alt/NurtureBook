# Supabase Database Setup Guide

This guide will help you set up the Supabase database for the NurtureBook app.

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: NurtureBook
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

## 2. Database Schema

Run the following SQL commands in the Supabase SQL Editor:

### Create Tables

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create mood enum
CREATE TYPE mood_type AS ENUM ('calm', 'happy', 'tired', 'sad', 'excited');

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  profile_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Children table
CREATE TABLE children (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age > 0 AND age <= 18),
  profile_image TEXT,
  total_points INTEGER DEFAULT 0,
  parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Journal entries table
CREATE TABLE journal_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  mood mood_type NOT NULL,
  date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chores table
CREATE TABLE chores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  points INTEGER NOT NULL CHECK (points > 0),
  assigned_to UUID REFERENCES children(id) ON DELETE CASCADE NOT NULL,
  due_date TIMESTAMPTZ,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Create Indexes

```sql
-- Indexes for better performance
CREATE INDEX idx_children_parent_id ON children(parent_id);
CREATE INDEX idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX idx_journal_entries_date ON journal_entries(date);
CREATE INDEX idx_chores_created_by ON chores(created_by);
CREATE INDEX idx_chores_assigned_to ON chores(assigned_to);
CREATE INDEX idx_chores_completed ON chores(completed);
```

### Create Functions and Triggers

```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON children FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_journal_entries_updated_at BEFORE UPDATE ON journal_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chores_updated_at BEFORE UPDATE ON chores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 3. Row Level Security (RLS)

Enable RLS and create policies:

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE chores ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Children policies
CREATE POLICY "Parents can view own children" ON children FOR SELECT USING (auth.uid() = parent_id);
CREATE POLICY "Parents can insert own children" ON children FOR INSERT WITH CHECK (auth.uid() = parent_id);
CREATE POLICY "Parents can update own children" ON children FOR UPDATE USING (auth.uid() = parent_id);
CREATE POLICY "Parents can delete own children" ON children FOR DELETE USING (auth.uid() = parent_id);

-- Journal entries policies
CREATE POLICY "Users can view own journal entries" ON journal_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own journal entries" ON journal_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own journal entries" ON journal_entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own journal entries" ON journal_entries FOR DELETE USING (auth.uid() = user_id);

-- Chores policies
CREATE POLICY "Parents can view own chores" ON chores FOR SELECT USING (auth.uid() = created_by);
CREATE POLICY "Parents can insert own chores" ON chores FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Parents can update own chores" ON chores FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Parents can delete own chores" ON chores FOR DELETE USING (auth.uid() = created_by);
```

## 4. Environment Variables

1. In your Supabase project dashboard, go to **Settings > API**
2. Copy the following values:
   - **Project URL**
   - **anon public key**

3. Create a `.env` file in your project root:

```env
EXPO_PUBLIC_SUPABASE_URL=your_project_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 5. Test the Setup

1. Start your app: `npm run expo`
2. Try signing up with a new account
3. The profile should be created automatically
4. Try adding children and chores
5. Test journal entries

## 6. Optional: Sample Data

If you want to add some sample data for testing:

```sql
-- Insert sample data (replace with actual user ID after signup)
INSERT INTO children (name, age, parent_id) VALUES 
  ('Alex', 8, 'your-user-id-here'),
  ('Sarah', 6, 'your-user-id-here');

-- You can add sample chores and journal entries similarly
```

## Troubleshooting

### Common Issues:

1. **RLS Policies**: Make sure all RLS policies are correctly set up
2. **Environment Variables**: Ensure `.env` file is in the correct location
3. **User ID**: Check that the user ID matches in the database
4. **Network**: Ensure your app can reach Supabase (check firewall/network settings)

### Debugging:

1. Check Supabase logs in the dashboard
2. Use browser developer tools to see network requests
3. Check the app console for error messages

## Next Steps

Once the database is set up:
1. Test all app functionality
2. Set up real-time subscriptions (already implemented in the code)
3. Consider adding more advanced features like file uploads for profile images
4. Set up backup and monitoring in production

---

**Need Help?** Check the [Supabase Documentation](https://supabase.com/docs) or reach out for support.