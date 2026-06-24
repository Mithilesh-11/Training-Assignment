interface UserCardProps {
  name: string;
  email: string;
  phone?: string;
}

function UserCard({ name, email, phone } : UserCardProps) {
  return (
    <div className="user-card">
      <div className="user-card__avatar">
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="user-card__info">
        <h3 className="user-card__name">{name}</h3>
        <p className="user-card__email">{email}</p>
        {phone && <p className="user-card__phone" data-testid="user-phone">{phone}</p>}
      </div>
    </div>
  );
};

export default UserCard;
