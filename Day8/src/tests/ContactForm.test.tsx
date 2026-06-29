import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactForm from "../components/ContactForm";

describe("ContactForm", () => {


  it("shows validation error when name is empty on submit", async () => {
    render(<ContactForm />);

    fireEvent.click(screen.getByText("Submit"));

    expect( await screen.findByText("Name is required")).toBeInTheDocument();
  });



  it("shows validation error when email is empty on submit", async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByPlaceholderText("Full name"), {
      target: { value: "John Doe" },
    });

    fireEvent.click(screen.getByText("Submit"));

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
  });



  it("shows invalid email format error", async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByPlaceholderText("Full name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email address"), {
      target: { value: "not-an-email" },
    });

    fireEvent.click(screen.getByText("Submit"));

    expect(await screen.findByText("Enter a valid email address")).toBeInTheDocument();
  });




  it("blocks form submission when validation fails", async () => {
    render(<ContactForm />);

       fireEvent.click(screen.getByText("Submit"))
      // Success message should NOT appear
      expect(screen.queryByText("Contact added successfully!")).not.toBeInTheDocument();
  });



  it("submits successfully with valid data", async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByPlaceholderText("Full name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email address"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone number"), {
      target: { value: "555-9999" },
    });

    fireEvent.click(screen.getByText("Submit"));

    expect(await screen.findByText("Contact added successfully!")).toBeInTheDocument();
  });
});
