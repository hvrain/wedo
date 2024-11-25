import { useQuery, useMutation } from "@tanstack/react-query";

import {
  acceptInvitation,
  inviteMemberWithEmail,
  getTeam,
  addTeam,
  editTeam,
  delTeam,
  generateInviteToken,
} from "@/apis/group";

export function useGenerateInviteToken(groupId: number) {
  return useQuery({
    queryKey: ["inviteToken", groupId],
    queryFn: () => generateInviteToken(groupId),
  });
}

export function useAcceptInvitation() {
  return useMutation({
    mutationFn: (token: string) => acceptInvitation(token),
  });
}

export function useInviteMemberWithEmail() {
  return useMutation({
    mutationFn: ({ groupId, email }: { groupId: number; email: string }) =>
      inviteMemberWithEmail({ groupId, email }),
  });
}

export function useGetTeam(
  groupId: number,
  refetchOnWindowFocus: boolean | "always" = true,
) {
  return useQuery({
    queryKey: ["team", groupId],
    queryFn: () => getTeam({ groupId }),
    refetchOnWindowFocus,
  });
}

export function useAddTeam() {
  return useMutation({
    mutationFn: ({ image, name }: { image: File; name: string }) =>
      addTeam({ image, name }),
  });
}

export function useEditTeam() {
  return useMutation({
    mutationFn: ({
      groupId,
      image,
      name,
    }: {
      groupId: number;
      image: File | string;
      name: string;
    }) => editTeam({ groupId, image, name }),
  });
}

export function useDelTeam() {
  return useMutation({
    mutationFn: ({ groupId }: { groupId: number }) => delTeam({ groupId }),
  });
}
