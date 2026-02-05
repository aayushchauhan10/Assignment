// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Types
export interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  numberOfGuests: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  numberOfGuests: number;
  notes?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  errors?: { field: string; message: string }[];
}

// API Functions
export async function fetchBookings(): Promise<Booking[]> {
  const response = await fetch(`${API_BASE_URL}/api/bookings`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }

  const result: ApiResponse<Booking[]> = await response.json();
  return result.data || [];
}

export async function createBooking(data: BookingFormData): Promise<ApiResponse<Booking>> {
  const response = await fetch(`${API_BASE_URL}/api/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result: ApiResponse<Booking> = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result;
}

export async function updateBookingStatus(
  id: string,
  status: 'pending' | 'confirmed' | 'cancelled'
): Promise<ApiResponse<Booking>> {
  const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  const result: ApiResponse<Booking> = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result;
}
