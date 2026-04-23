import { supabase } from "@/lib/supabase";

export async function getUserRole(): Promise<"worker" | "employer" | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return (user.user_metadata?.role as "worker" | "employer") || null;
}

export function getRoleRedirectPath(
  role: "worker" | "employer" | null
): string {
  if (role === "worker") return "/worker/dashboard";
  if (role === "employer") return "/employer/dashboard";
  return "/";
}
