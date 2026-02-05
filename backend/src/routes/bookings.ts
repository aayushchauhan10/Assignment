import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { Booking } from '../models/Booking';

const router = Router();

// Validation middleware
const bookingValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required'),
  body('date')
    .notEmpty().withMessage('Booking date is required')
    .isISO8601().withMessage('Please enter a valid date'),
  body('time')
    .trim()
    .notEmpty().withMessage('Booking time is required'),
  body('numberOfGuests')
    .notEmpty().withMessage('Number of guests is required')
    .isInt({ min: 1, max: 100 }).withMessage('Guests must be between 1 and 100'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Notes cannot exceed 500 characters'),
];

// Handle validation errors
const handleValidation = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: (err as any).path,
        message: err.msg,
      })),
    });
    return;
  }
  next();
};

//  Fetch all bookings
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await Booking.find()
      .sort({ date: -1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
});

// Create a new booking
router.post(
  '/',
  bookingValidation,
  handleValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, phone, date, time, numberOfGuests, notes } = req.body;

      const booking = new Booking({
        name,
        email,
        phone,
        date: new Date(date),
        time,
        numberOfGuests,
        notes,
      });

      const savedBooking = await booking.save();

      res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        data: savedBooking,
      });
    } catch (error) {
      next(error);
    }
  }
);



// update status of booking to confirmed or cancelled
router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body, req.params.id);
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }
    booking.status = req.body.status;
    await booking.save();
    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
})

export default router;
