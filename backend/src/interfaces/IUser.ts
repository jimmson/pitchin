export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: {
    admin: boolean;
    online: boolean;
    registered: boolean;
    archived: boolean;
  };
  credentials: {
    password: string;
    resetToken: string;
  };
}
