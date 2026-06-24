import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const contactSchema = z.object({
  name: z
    .string().min(1, "Name is required"),

  email: z
    .email("Invalid email address"), 
    
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only numbers"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [formData, setFormData] = useState<ContactFormData | null>(null);

  const onSubmit = (data: ContactFormData) => {
    setFormData(data);
    alert(`Form Submitted Successfully!\n\n${JSON.stringify(data, null, 2)}`);
    reset();
  };

  return (
    <div className="rounded-xl border border-black bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold"> Contact Form </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block font-medium"> Name </label>
          <input
            type="text"
            {...register("name")}
            className="w-full rounded-lg border border-black px-4 py-3 outline-none transition focus:ring-2 focus:ring-black"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-black"> {errors.name.message} </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium"> Email </label>
          <input
            type="email"
            {...register("email")}
            className="w-full rounded-lg border border-black px-4 py-3 outline-none transition focus:ring-2 focus:ring-black"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-black"> {errors.email.message} </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium"> Phone </label>
          <input
            type="text"
            inputMode="numeric" 
            {...register("phone")}
            className="w-full rounded-lg border border-black px-4 py-3 outline-none transition focus:ring-2 focus:ring-black"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-black"> {errors.phone.message} </p>
          )}
        </div>

        <button
          type="submit"
          className="rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:opacity-90"
        >
          Submit
        </button>
      </form>

      {formData && (
        <div className="rounded-xl border border-black bg-gray-50 p-6 shadow-sm m-10">
          <h3 className="mb-4 text-xl font-bold">Submitted Data</h3>
          <div className="space-y-2">
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
          </div>
        </div>
      )}
    </div>
  );
}
