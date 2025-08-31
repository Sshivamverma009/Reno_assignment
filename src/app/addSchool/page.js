"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmissionStatus(null);

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "image") {
        if (data.image[0]) {
          formData.append(key, data.image[0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    });

    // This is where you'll send the data to your API endpoint.
    // We will create the API route in the next step.
    console.log("Form data to be sent:", Object.fromEntries(formData));

    // Simulating API call
    try {
      // Replace with your actual API call, e.g.,
      const response = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      });
      // if (!response.ok) throw new Error('Submission failed');
      const result = await response.json();
      console.log(result);

      setSubmissionStatus({
        success: true,
        message: "School added successfully! (API simulation)",
      });
      reset(); // Reset form fields after successful submission
    } catch (error) {
      setSubmissionStatus({
        success: false,
        message: "Failed to add school. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Add New School
        </h1>

        {submissionStatus && (
          <div
            className={`p-4 mb-4 text-sm rounded-lg ${
              submissionStatus.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {submissionStatus.message}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              School Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "School name is required." })}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              {...register("address", { required: "Address is required." })}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                {...register("city", { required: "City is required." })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <input
                id="state"
                type="text"
                {...register("state", { required: "State is required." })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              id="contact"
              type="tel"
              {...register("contact", {
                required: "Contact number is required.",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit contact number.",
                },
              })}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.contact && (
              <p className="mt-1 text-sm text-red-600">
                {errors.contact.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email_id"
              className="block text-sm font-medium text-gray-700"
            >
              Email ID
            </label>
            <input
              id="email_id"
              type="email"
              {...register("email_id", {
                required: "Email is required.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Entered value does not match email format.",
                },
              })}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email_id && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email_id.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              School Image
            </label>
            <input
              id="image"
              type="file"
              {...register("image", { required: "School image is required." })}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">
                {errors.image.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {isSubmitting ? "Submitting..." : "Add School"}
          </button>
        </form>
      </div>
    </main>
  );
}
