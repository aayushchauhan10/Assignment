"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import BookingCard from "@/components/BookingCard";
import { fetchBookings, Booking } from "@/lib/api";

export default function HomePage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchBookings();
      setBookings(data);
      setError(null);
    } catch (e) {
      setError(
        "Unable to fetch bookings. Please make sure the backend server is running.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const handleStatusUpdate = useCallback((updatedBooking: Booking) => {
    setBookings((prevBookings) =>
      prevBookings.map((b) =>
        b._id === updatedBooking._id ? updatedBooking : b,
      ),
    );
  }, []);

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    pending: bookings.filter((b) => b.status === "pending").length,
  };

  return (
    <div className="animate-fade-in text-gray-800 pb-20">
      {/* Hero Section */}
      <div className="text-center mb-20 pt-10">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Manage Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
            Bookings
          </span>
          <br />
          with Elegance.
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
          The simple, intuitive, and premium way to handle your appointments.
          Everything you need in one beautiful dashboard.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 px-4">
        {[
          {
            label: "Total Bookings",
            value: stats.total,
            color: "text-blue-600",
            bg: "bg-blue-50",
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            ),
          },
          {
            label: "Confirmed",
            value: stats.confirmed,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            ),
          },
          {
            label: "Pending",
            value: stats.pending,
            color: "text-amber-600",
            bg: "bg-amber-50",
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            ),
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="card group relative overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700 opacity-50`}
            />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className={`text-5xl font-black ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-500 font-bold uppercase tracking-wider text-xs">
                  {stat.label}
                </div>
              </div>
              <div
                className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500`}
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {stat.icon}
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        {/* Error Message */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-700 px-8 py-6 rounded-[2rem] mb-12 text-center shadow-lg shadow-rose-500/5">
            <p className="font-bold text-lg mb-2">{error}</p>
            <p className="text-sm font-medium opacity-80">
              Please ensure your backend services are active.
              <code className="bg-rose-100/50 px-3 py-1 rounded-lg ml-2 font-mono">
                npm run dev
              </code>
            </p>
          </div>
        )}

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 px-4">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Recent Activity
            </h2>
            <p className="text-gray-400 font-medium">
              Keep track of your latest reservations
            </p>
          </div>
          <Link
            href="/create"
            className="btn-primary w-full sm:w-auto text-center flex items-center justify-center gap-2 group"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create New Booking
          </Link>
        </div>

        {/* Bookings List */}
        <div className="px-4">
          {isLoading && bookings.length === 0 && !error ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500/20 border-t-blue-500"></div>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                Synchronizing Data
              </p>
            </div>
          ) : !isLoading && bookings.length === 0 && !error ? (
            <div className="card text-center py-20 bg-white/40 border-dashed border-2 border-gray-200 shadow-none hover:shadow-none">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <svg
                  className="w-12 h-12 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-400 mb-2">
                No Reservations Found
              </h3>
              <p className="text-gray-400 mb-10 max-w-sm mx-auto font-medium">
                Your booking list is currently empty. Start by creating a new
                reservation.
              </p>
              <Link
                href="/create"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Begin Now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
