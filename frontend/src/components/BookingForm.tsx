"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBooking, BookingFormData } from "@/lib/api";
import {
  Calendar,
  Clock,
  Group,
  Mail,
  MessageCircle,
  Phone,
  User,
  User2Icon,
  Users,
  Users2,
} from "lucide-react";

interface FormErrors {
  [key: string]: string;
}

export default function BookingForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string>("");

  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    numberOfGuests: 1,
    notes: "",
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.date) {
      newErrors.date = "Booking date is required";
    }

    if (!formData.time) {
      newErrors.time = "Booking time is required";
    }

    if (formData.numberOfGuests < 1 || formData.numberOfGuests > 100) {
      newErrors.numberOfGuests = "Guests must be between 1 and 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createBooking(formData);
      router.push("/");
      router.refresh();
    } catch (error: any) {
      if (error.errors) {
        const apiErrors: FormErrors = {};
        error.errors.forEach((err: { field: string; message: string }) => {
          apiErrors[err.field] = err.message;
        });
        setErrors(apiErrors);
      } else {
        setServerError(
          error.error?.message || "Failed to create booking. Please try again.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {serverError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-2xl flex items-center gap-3 animate-shake">
          <svg
            className="w-5 h-5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-semibold">{serverError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="label text-gray-900 font-bold ml-1">
            Full Name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <User2Icon className="text-black" />
              </div>
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`input-field pl-16 h-14 ${errors.name ? "border-rose-300 ring-4 ring-rose-500/10" : ""}`}
            />
          </div>
          {errors.name && (
            <p className="error-text font-bold text-xs ml-1 uppercase tracking-wider">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="label text-gray-900 font-bold ml-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <Mail className="text-black" />
              </div>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`input-field pl-16 h-14 ${errors.email ? "border-rose-300 ring-4 ring-rose-500/10" : ""}`}
            />
          </div>
          {errors.email && (
            <p className="error-text font-bold text-xs ml-1 uppercase tracking-wider">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="phone" className="label text-gray-900 font-bold ml-1">
            Phone Number
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center t ransition-all duration-300">
                <Phone className="text-black" />
              </div>
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 890"
              className={`input-field pl-16 h-14 ${errors.phone ? "border-rose-300 ring-4 ring-rose-500/10" : ""}`}
            />
          </div>
          {errors.phone && (
            <p className="error-text font-bold text-xs ml-1 uppercase tracking-wider">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Number of Guests */}
        <div className="space-y-2">
          <label
            htmlFor="numberOfGuests"
            className="label text-gray-900 font-bold ml-1"
          >
            Number of Guests
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <Users2 className="text-black" />
              </div>
            </div>
            <input
              type="number"
              id="numberOfGuests"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
              min="1"
              max="100"
              className={`input-field pl-16 h-14 ${errors.numberOfGuests ? "border-rose-300 ring-4 ring-rose-500/10" : ""}`}
            />
          </div>
          {errors.numberOfGuests && (
            <p className="error-text font-bold text-xs ml-1 uppercase tracking-wider">
              {errors.numberOfGuests}
            </p>
          )}
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label htmlFor="date" className="label text-gray-900 font-bold ml-1">
            Booking Date
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <Calendar />
              </div>
            </div>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className={`input-field pl-16 h-14 ${errors.date ? "border-rose-300 ring-4 ring-rose-500/10" : ""}`}
            />
          </div>
          {errors.date && (
            <p className="error-text font-bold text-xs ml-1 uppercase tracking-wider">
              {errors.date}
            </p>
          )}
        </div>

        {/* Time */}
        <div className="space-y-2">
          <label htmlFor="time" className="label text-gray-900 font-bold ml-1">
            Booking Time
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <Clock />
              </div>
            </div>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`input-field pl-16 h-14 ${errors.time ? "border-rose-300 ring-4 ring-rose-500/10" : ""}`}
            />
          </div>
          {errors.time && (
            <p className="error-text font-bold text-xs ml-1 uppercase tracking-wider">
              {errors.time}
            </p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label htmlFor="notes" className="label text-gray-900 font-bold ml-1">
          Additional Notes
        </label>
        <div className="relative group">
          <div className="absolute top-4 left-0 pl-3 flex items-start pointer-events-none">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <MessageCircle />
            </div>
          </div>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Any special requests or notes..."
            className="input-field pl-16 pt-4 resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex-1 disabled:opacity-70 disabled:cursor-not-allowed h-14"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span className="font-bold tracking-wide uppercase text-sm">
                Securing Booking...
              </span>
            </span>
          ) : (
            <span className="font-bold tracking-wide uppercase text-sm">
              Confirm My Booking
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="btn-secondary h-14 px-10"
        >
          <span className="font-bold tracking-wide uppercase text-sm">
            Cancel
          </span>
        </button>
      </div>
    </form>
  );
}
