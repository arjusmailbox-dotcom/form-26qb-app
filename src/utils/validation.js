import { z } from 'zod';

// PAN validation regex: AAAAA9999A
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

// PIN code validation: 6 digits
const pinRegex = /^[0-9]{6}$/;

// Mobile validation: 10 digits
const mobileRegex = /^[0-9]{10}$/;

export const form26QBSchema = z.object({
    // Section I: Buyer/Transferee Details
    multipleBuyers: z.enum(['yes', 'no']),

    // Single Buyer Fields
    buyerPAN: z.string().toUpperCase().optional().or(z.literal('')),
    buyerName: z.string().optional().or(z.literal('')),
    buyerMobile: z.string().optional().or(z.literal('')),
    buyerEmail: z.string().optional().or(z.literal('')),

    // Multiple Buyers - 1st Applicant
    buyer1PAN: z.string().toUpperCase().optional().or(z.literal('')),
    buyer1Name: z.string().optional().or(z.literal('')),
    buyer1Mobile: z.string().optional().or(z.literal('')),
    buyer1Email: z.string().optional().or(z.literal('')),

    // Multiple Buyers - 2nd Applicant
    buyer2PAN: z.string().toUpperCase().optional().or(z.literal('')),
    buyer2Name: z.string().optional().or(z.literal('')),
    buyer2Mobile: z.string().optional().or(z.literal('')),
    buyer2Email: z.string().optional().or(z.literal('')),

    // Section II: Seller/Transferor Details
    sellerPreset: z.enum(['sobha', 'other']),
    sellerDataConfirmed: z.boolean().optional(),
    sellerPAN: z.string()
        .regex(panRegex, 'Invalid PAN format (e.g., ABCDE1234F)')
        .toUpperCase(),
    sellerName: z.string().min(1, 'Seller name is required'),
    sellerAddress: z.string().min(10, 'Complete address is required'),
    sellerPIN: z.string().regex(pinRegex, 'PIN must be 6 digits'),
    sellerMobile: z.string().regex(mobileRegex, 'Mobile must be 10 digits'),
    sellerEmail: z.string().email('Invalid email address'),
    sellerResidentialStatus: z.enum(['resident', 'non-resident']),
    multipleSellers: z.enum(['yes', 'no']),

    // Section III: Property Details
    propertyAddress: z.string().min(1, 'Flat number is required'),
    projectName: z.string().min(1, 'Project name is required'),
    propertyAddressConfirmed: z.boolean().optional(),
    propertyFullAddress: z.string().min(10, 'Complete property address is required'),
    propertyPIN: z.string().regex(pinRegex, 'PIN must be 6 digits'),
    agreementDate: z.string().min(1, 'Agreement date is required'),
    totalConsideration: z.string()
        .refine((val) => {
            const num = parseFloat(val);
            return num >= 5000000;
        }, 'Consideration must be at least ₹50,00,000'),
    paymentType: z.enum(['lumpsum', 'installment']),
    stampDutyHigher: z.enum(['yes', 'no']),
    stampDutyValue: z.string().optional(),
    lastInstallment: z.enum(['yes', 'no']).optional(),
    previousInstallmentAmount: z.string().optional(),

    // Section IV: Tax Deposit Details
    amountPaid: z.string().min(1, 'Amount paid is required'),
    paymentDate: z.string().min(1, 'Payment date is required'),
    tdsAmount: z.string().optional(),
    deductionDate: z.string().min(1, 'Deduction date is required'),

    // Calculated fields
    valuePerApplicant: z.string().optional(),
    amountPaidPerApplicant: z.string().optional(),
}).superRefine((data, ctx) => {
    // Conditional validation for Single Buyer
    if (data.multipleBuyers === 'no') {
        if (!data.buyerPAN || !panRegex.test(data.buyerPAN)) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid PAN format', path: ['buyerPAN'] });
        }
        if (!data.buyerName || data.buyerName.length < 1) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Buyer name is required', path: ['buyerName'] });
        }
        if (!data.buyerMobile || !mobileRegex.test(data.buyerMobile)) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Mobile must be 10 digits', path: ['buyerMobile'] });
        }
        if (!data.buyerEmail || !z.string().email().safeParse(data.buyerEmail).success) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid email', path: ['buyerEmail'] });
        }
    }
    // Conditional validation for Multiple Buyers
    else {
        // Applicant 1
        if (!data.buyer1PAN || !panRegex.test(data.buyer1PAN)) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid PAN format', path: ['buyer1PAN'] });
        }
        if (!data.buyer1Name || data.buyer1Name.length < 1) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Buyer name is required', path: ['buyer1Name'] });
        }
        if (!data.buyer1Mobile || !mobileRegex.test(data.buyer1Mobile)) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Mobile must be 10 digits', path: ['buyer1Mobile'] });
        }
        if (!data.buyer1Email || !z.string().email().safeParse(data.buyer1Email).success) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid email', path: ['buyer1Email'] });
        }

        // Applicant 2
        if (!data.buyer2PAN || !panRegex.test(data.buyer2PAN)) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid PAN format', path: ['buyer2PAN'] });
        }
        if (!data.buyer2Name || data.buyer2Name.length < 1) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Buyer name is required', path: ['buyer2Name'] });
        }
        if (!data.buyer2Mobile || !mobileRegex.test(data.buyer2Mobile)) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Mobile must be 10 digits', path: ['buyer2Mobile'] });
        }
        if (!data.buyer2Email || !z.string().email().safeParse(data.buyer2Email).success) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid email', path: ['buyer2Email'] });
        }
    }
});

// Form schema is ready for use in components
