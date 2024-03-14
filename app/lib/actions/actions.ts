'use server';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const GenerateInvoiceOmit = FormSchema.omit({ id: true, date: true });

interface FormData {
  customerId: string;
  amount: number;
  status: string;
}

export const generateInvoice = async (formData: FormData) => {
  const { customerId, amount, status } = GenerateInvoiceOmit.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  console.log(customerId, amount, status);
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
};
