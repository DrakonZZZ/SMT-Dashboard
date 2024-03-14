import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/create-form';
import { fetchCustomers } from '@/app/lib/data';

const page = async () => {
  const allCustomers = await fetchCustomers();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/generate',
            active: true,
          },
        ]}
      />
      <Form customers={allCustomers} />
    </main>
  );
};

export default page;
