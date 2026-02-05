import BookingForm from "@/components/BookingForm";

export default function CreateBookingPage() {
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Create New Booking
        </h1>
        <p className="text-gray-600">
          Fill in the details below to create a new booking.
        </p>
      </div>

      {/* Form Card */}
      <div className="card">
        <BookingForm />
      </div>
    </div>
  );
}
