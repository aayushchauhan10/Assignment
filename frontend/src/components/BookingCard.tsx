"use client";

import { useEffect, useState } from "react";
import { Booking, updateBookingStatus } from "@/lib/api";

interface BookingCardProps {
  booking: Booking;
  onStatusUpdate?: (updatedBooking: Booking) => void;
}

export default function BookingCard({
  booking,
  onStatusUpdate,
}: BookingCardProps) {
  const [currentStatus, setCurrentStatus] = useState(booking.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200/50";
      case "cancelled":
        return "bg-rose-100 text-rose-700 border-rose-200/50";
      default:
        return "bg-amber-100 text-amber-700 border-amber-200/50";
    }
  };

  // Auto-confirm pending bookings
  useEffect(() => {
    if (currentStatus === "pending") {
      const confirmBooking = async () => {
        setIsUpdating(true);
        try {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          const result = await updateBookingStatus(booking._id, "confirmed");
          if (result.success && result.data) {
            setCurrentStatus("confirmed");
            onStatusUpdate?.(result.data);
          }
        } catch (error) {
          console.error("Failed to confirm booking:", error);
        } finally {
          setIsUpdating(false);
        }
      };

      confirmBooking();
    }
  }, [booking._id, currentStatus, onStatusUpdate]);

  return (
    <div className="card group overflow-hidden">
      {/* Visual Accent */}
      <div
        className={`absolute top-0 left-0 w-1.5 h-full ${
          currentStatus === "confirmed"
            ? "bg-emerald-500"
            : currentStatus === "cancelled"
              ? "bg-rose-500"
              : "bg-amber-500"
        }`}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {booking.name}
          </h3>
          <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5 mt-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {booking.email}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border ${getStatusStyles(currentStatus)}`}
          >
            {currentStatus}
          </span>
          {isUpdating && (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 rounded-lg">
              <svg
                className="animate-spin h-3 w-3 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-[10px] text-blue-600 font-bold uppercase tracking-tight">
                Processing
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-3 mb-6">
        <div className="flex items-center gap-3 text-gray-800 bg-emerald-50/40 p-3 rounded-[1.25rem] border border-emerald-100/50 group/item hover:bg-emerald-50 transition-all duration-300">
          <div className="p-2.5 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/30 text-white transform group-hover/item:scale-110 transition-transform">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-tight">
            {formatDate(booking.date)}
          </span>
        </div>
        <div className="flex items-center gap-3 text-gray-800 bg-orange-50/40 p-3 rounded-[1.25rem] border border-orange-100/50 group/item hover:bg-orange-50 transition-all duration-300">
          <div className="p-2.5 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/30 text-white transform group-hover/item:scale-110 transition-transform">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-tight">
            {booking.time}
          </span>
        </div>
        <div className="flex items-center gap-3 text-gray-800 bg-violet-50/40 p-3 rounded-[1.25rem] border border-violet-100/50 group/item hover:bg-violet-50 transition-all duration-300">
          <div className="p-2.5 bg-violet-500 rounded-xl shadow-lg shadow-violet-500/30 text-white transform group-hover/item:scale-110 transition-transform">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-tight">
            {booking.numberOfGuests} Guests
          </span>
        </div>
        <div className="flex items-center gap-3 text-gray-800 bg-blue-50/40 p-3 rounded-[1.25rem] border border-blue-100/50 group/item hover:bg-blue-50 transition-all duration-300">
          <div className="p-2.5 bg-blue-500 rounded-xl shadow-lg shadow-blue-500/30 text-white transform group-hover/item:scale-110 transition-transform">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
            {booking.phone}
          </span>
        </div>
      </div>

      {/* Notes */}
      {booking.notes && (
        <div className="pt-5 border-t border-gray-100/50">
          <div className="flex gap-2 items-start">
            <svg
              className="w-4 h-4 text-gray-400 mt-0.5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <p className="text-sm text-gray-500 italic leading-relaxed">
              {booking.notes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
