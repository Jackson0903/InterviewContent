const { z } = require('zod');
const signupSchema = z.object({
    UserName: z.string()
        .min(3, 'Username must be at least 3 characters')
        .max(50, 'Username cannot exceed 50 characters')
        .trim(),
    Password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    email: z.string()
        .email('Invalid email format')
        .max(255, 'Email cannot exceed 255 characters')
        .trim()
        .toLowerCase()
});

const loginSchema = z.object({
    email: z.string()
        .email('Invalid email format')
        .max(255, 'Email cannot exceed 255 characters')
        .trim()
        .toLowerCase(),
    Password: z.string()
        .min(1, 'Password is required')
});

const validateRequest = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: 'Validation failed',
            errors: error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }))
        });
    }
};
module.exports = {
    signupSchema,
    loginSchema,
    validateRequest
};