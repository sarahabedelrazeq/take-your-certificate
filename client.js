import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jewkbyhjgbkczfpjvqvp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impld2tieWhqZ2JrY3pmcGp2cXZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3NDkyMzQsImV4cCI6MTk3OTMyNTIzNH0.8fVwlvVTEozjlptLkbzayooTzbQ97Ow3oOGztYTd7e0";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
