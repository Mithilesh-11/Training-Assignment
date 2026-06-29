import React, { useState } from "react";

interface FormValues {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

function ContactForm () {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (vals: FormValues): FormErrors => {
    const errs: FormErrors = {};

    if (!vals.name.trim()) {
      errs.name = "Name is required";
    }

    if (!vals.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) {
      errs.email = "Enter a valid email address";
    }

    if (!vals.phone.trim()) {
      errs.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(vals.phone.trim())) {
      errs.phone = "Phone number must be exactly 10 digits";
    }

    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitted(true);
    setValues({ name: "", email: "", phone: "" });
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="contact-form contact-form--success">
        <p>Contact added successfully!</p>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => setSubmitted(false)}
        >
          Add Another
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2 className="contact-form__title">Add Contact</h2>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={`contact-form__input ${
            errors.name ? "contact-form__input--error" : ""
          }`}
          value={values.name}
          onChange={handleChange}
          placeholder="Full name"
        />
        {errors.name && (
          <span className="contact-form__error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={`contact-form__input ${
            errors.email ? "contact-form__input--error" : ""
          }`}
          value={values.email}
          onChange={handleChange}
          placeholder="Email address"
        />
        {errors.email && (
          <span className="contact-form__error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className={`contact-form__input ${
            errors.phone ? "contact-form__input--error" : ""
          }`}
          value={values.phone}
          onChange={handleChange}
          placeholder="Phone number"
        />
        {errors.phone && (
          <span className="contact-form__error" role="alert">
            {errors.phone}
          </span>
        )}
      </div>

      <button type="submit" className="btn btn--primary">
        Submit
      </button>
    </form>
  );
}

export default ContactForm;