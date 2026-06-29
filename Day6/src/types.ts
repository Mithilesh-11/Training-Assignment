export interface UserCardProps {
  id?: number;
  name: string;
  email: string;
  isActive: boolean;
}

export interface User extends UserCardProps {
  id: number;
}
