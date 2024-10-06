import { client } from "../graphql-client";

const CREATE_INVOICE_MUTATION = `mutation createInvoice($input: CreateInvoiceInput!) {
    createInvoice(input: $input) {
      id
      totalAmount
    }
  }
`;

export const createInvoiceApi = async (invoiceData: any) => {
    debugger
    const variables = {
        input: {
            createInvoiceAttributes: {
                billingFromAttributes: {
                    companyName: invoiceData.billingFrom.companyName,
                    companyEmail: invoiceData.billingFrom.companyEmail,
                    billingFromAddressAttributes: {
                        streetAddress: invoiceData.billingFrom.billingFromAddress.streetAddress,
                        city: invoiceData.billingFrom.billingFromAddress.city,
                        country: invoiceData.billingFrom.billingFromAddress.country,
                        postalCode: invoiceData.billingFrom.billingFromAddress.postalCode,
                    },
                },
                billingToAttributes: {
                    clientName: invoiceData.billingTo.clientName,
                    clientEmail: invoiceData.billingTo.clientEmail,
                    billingToAddressAttributes: {
                        streetAddress: invoiceData.billingTo.billingToAddress.streetAddress,
                        city: invoiceData.billingTo.billingToAddress.city,
                        country: invoiceData.billingTo.billingToAddress.country,
                        postalCode: invoiceData.billingTo.billingToAddress.postalCode,
                    },
                },
                invoiceDate: invoiceData.invoiceDate,
                paymentTerms: invoiceData.paymentTerms,
                projectDescription: invoiceData.projectDescription,
                itemAttributes: invoiceData.items.map((item: any) => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                })),
            },
        },
    };

    try {
        const response = await client.request(CREATE_INVOICE_MUTATION, variables);
        return response;
    } catch (error) {
        console.error('Error creating invoice:', error);
        throw new Error('Failed to create invoice');
    }
};
