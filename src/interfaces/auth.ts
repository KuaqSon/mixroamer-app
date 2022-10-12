export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IAuthContext {
  isLoaded: boolean;
  user: IUser | null;
  isAuthenticated: boolean;
  signOut: Function;
}
