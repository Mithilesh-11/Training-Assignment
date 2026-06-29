import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserCard from "../components/UserCard";

describe("UserCard", () => {
  it("renders user information", () => {
    render(
      <UserCard
        name="John Doe"
        email="john@example.com"
        phone="555-1234"
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("555-1234")).toBeInTheDocument();
  });


  it("does not render phone when not provided", () => {
    render(<UserCard name="Bob Jones" email="bob@example.com" />);
    const phoneEl = screen.queryByTestId("user-phone");
    expect(phoneEl).not.toBeInTheDocument();
  });
});
