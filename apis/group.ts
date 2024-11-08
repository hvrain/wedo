import {
  GenerateInviteTokenResponse,
  AcceptInvitationResponse,
  GetTeamResponse,
  AddTeamResponse,
  EditTeamResponse,
  GetTeamMemberResponse,
} from "@/dtos/GroupDtos";

import fetchExtended from "./fetchExtended";
import { uploadImage } from "./image";
import { getUser } from "./user";

export async function generateInviteToken(
  groupId: number,
): Promise<GenerateInviteTokenResponse> {
  const res = await fetchExtended(`/groups/${groupId}/invitation`);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}

export async function acceptInvitation(
  token: string,
): Promise<AcceptInvitationResponse> {
  const user = await getUser();

  const res = await fetchExtended("/groups/accept-invitation", {
    method: "POST",
    body: JSON.stringify({ userEmail: user.email, token }),
  });
  const json = await res.json();

  if (!res.ok) {
    // status: 400 / message : "이미 그룹에 소속된 유저입니다." (이미 팀에 있는 email)
    // status: 400 / message : "유효하지 않은 초대입니다." (초대 토큰 이상함)
    // status: 401 / message : "jwt expired" (초대 토큰 만료)
    // status: 404 / message : "유저가 존재하지 않습니다." (email 잘못된 경우)
    throw new Error(json.message);
  }

  return json;
}

export async function inviteMemberWithEmail({
  groupId,
  email,
}: {
  groupId: number;
  email: string;
}) {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    throw new Error("이메일 형식이 올바르지 않습니다.");
  }

  const res = await fetchExtended(`/groups/${groupId}/member`, {
    method: "POST",
    body: JSON.stringify({ userEmail: email }),
  });

  if (res.status === 204) {
    return;
  }

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }
}

export async function getTeam({
  groupId,
}: {
  groupId: number;
}): Promise<GetTeamResponse> {
  const res = await fetchExtended(`/groups/${groupId}`);
  const json = await res.json();
  return json;
}

export async function addTeam({
  image,
  name,
}: {
  image: File;
  name: string;
}): Promise<AddTeamResponse> {
  const { url: imageUrl } = await uploadImage(image);

  const res = await fetchExtended("/groups", {
    method: "POST",
    body: JSON.stringify({ image: imageUrl, name }),
  });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}

export async function editTeam({
  groupId,
  image,
  name,
}: {
  groupId: number;
  image: File | string;
  name: string;
}): Promise<EditTeamResponse> {
  // image를 string으로 받는 경우 기존 이미지를 그대로 사용한다고 생각하고 작성함
  let imageUrl;
  if (typeof image === "string") {
    imageUrl = image;
  } else {
    const { url } = await uploadImage(image);
    imageUrl = url;
  }

  const res = await fetchExtended(`/groups/${groupId}`, {
    method: "PATCH",
    body: JSON.stringify({ image: imageUrl, name }),
  });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}

export async function delTeam({ groupId }: { groupId: number }) {
  const res = await fetchExtended(`/groups/${groupId}`, {
    method: "DELETE",
  });

  if (res.status === 204) {
    return;
  }

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }
}

export async function getTeamMember({
  groupId,
  memberUserId,
}: {
  groupId: number;
  memberUserId: number;
}): Promise<GetTeamMemberResponse> {
  const res = await fetchExtended(`/groups/${groupId}/member/${memberUserId}`);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}
