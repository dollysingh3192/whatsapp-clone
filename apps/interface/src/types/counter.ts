export interface UserDetails {
  id: string;
  name: string;
  email: string;
}
export interface InitialState {
  data: null | UserDetails;
}

const UserAction: string = "User";

export { UserAction,  };