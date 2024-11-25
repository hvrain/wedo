import { TaskList } from "./TaskLists";

export type GenerateInviteTokenResponse = string;

export interface AcceptInvitationResponse {
  groupId: number;
}

export interface Member {
  role: "ADMIN" | "MEMBER";
  userImage: string | null;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

export interface GetTeamResponse {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
  members: Member[];
  taskLists: TaskList[];
}

export interface AddTeamResponse {
  name: string;
  image: string;
  updatedAt: string;
  createdAt: string;
  id: number;
}

export interface EditTeamResponse extends AddTeamResponse {
  teamId: string;
}

export type GetTeamMemberResponse = Member;
