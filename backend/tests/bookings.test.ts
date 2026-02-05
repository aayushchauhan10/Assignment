import request from 'supertest';
import mongoose from 'mongoose';
import express, { Application } from 'express';
import cors from 'cors';
import bookingRoutes from '../src/routes/bookings';
import { errorHandler, notFoundHandler } from '../src/middleware/errorHandler';
import { Booking } from '../src/models/Booking';

// Create test app
const createTestApp = (): Application => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api/bookings', bookingRoutes);
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
};

const app = createTestApp();

// Test data
const validBooking = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  date: '2024-12-25',
  time: '18:00',
  numberOfGuests: 4,
  notes: 'Birthday celebration',
};

describe('Booking API', () => {
  beforeAll(async () => {
    // Connect to test database
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/booking-manager-test';
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    // Cleanup and disconnect
    await Booking.deleteMany({});
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear bookings before each test
    await Booking.deleteMany({});
  });

  describe('POST /api/bookings', () => {
    it('should create a new booking with valid data', async () => {
      const response = await request(app)
        .post('/api/bookings')
        .send(validBooking)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Booking created successfully');
      expect(response.body.data.name).toBe(validBooking.name);
      expect(response.body.data.email).toBe(validBooking.email);
    });

    it('should return 400 for missing required fields', async () => {
      const response = await request(app)
        .post('/api/bookings')
        .send({ name: 'John' })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });

    it('should return 400 for invalid email', async () => {
      const response = await request(app)
        .post('/api/bookings')
        .send({ ...validBooking, email: 'invalid-email' })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/bookings', () => {
    it('should return empty array when no bookings exist', async () => {
      const response = await request(app)
        .get('/api/bookings')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(0);
      expect(response.body.data).toEqual([]);
    });

    it('should return all bookings', async () => {
      // Create a booking first
      await request(app).post('/api/bookings').send(validBooking);

      const response = await request(app)
        .get('/api/bookings')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(1);
      expect(response.body.data[0].name).toBe(validBooking.name);
    });
  });
});
