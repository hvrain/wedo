import { useQuery } from "@tanstack/react-query";

import { getUser, getUserGroups } from "@/apis/user";

export function useUserGroups() {
  return useQuery({
    queryKey: ["user", "group"],
    queryFn: getUserGroups,
  });
}

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
}
