import { z } from 'zod';
export declare const createCatSchema: z.ZodObject<{
    name: z.ZodString;
    age: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name?: string;
    age?: number;
}, {
    name?: string;
    age?: number;
}>;
export type CreateCatDto = z.infer<typeof createCatSchema>;
