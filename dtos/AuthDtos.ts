export interface SignInRequestBody {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    updatedAt: string;
    createdAt: string;
    image: string;
    teamId: string;
  };
}

export interface SignUpRequestBody extends SignInRequestBody {
  nickname: string;
  passwordConfirmation: string;
}
