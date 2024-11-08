export type Role = "ADMIN" | "MEMBER";

export interface UserGroupsResponse {
  teamId: string;
  updatedAt: Date;
  createdAt: Date;
  image: string;
  name: string;
  id: number;
}

export interface UserMembershipsResponse {
  group: UserGroupsResponse;
  role: Role;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

export interface UserResponse {
  teamId: string;
  image: string;
  nickname: string;
  updatedAt: Date;
  createdAt: Date;
  email: string;
  id: number;
  memberships: UserMembershipsResponse[];
}

export interface PatchUserRequestBody {
  nickname?: string;
  image?: string;
}
