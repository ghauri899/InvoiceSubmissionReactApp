import React from 'react';
import './invoiceform.css';
import BillForm from '../components/BillForm/BillForm';
import { formatDate, paymentTermsPrinter, totalCalculator } from '../utills/commonUtilities';
import { toast } from 'react-toastify';
import Toast from '../components/toast/Toast';
import { createInvoiceApi } from '../api/invoiceApi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
enum InvoiceTermsEnum {
    NET_10_DAYS = 'Net 10 Days',
    NET_20_DAYS = 'Net 20 Days',
    NET_30_DAYS = 'Net 30 Days',
}
export interface Item {
    name: string;
    quantity: number;
    price: number;
    totalPrice?: number;
    // ID?:number;
}
export type Items = Item[];

export interface BillFrom {
    company: string;
    email: string;
    country: string;
    city: string;
    postalCode: string;
    address: string;
}

export interface BillTo {
    name: string;
    email: string;
    country: string;
    city: string;
    postalCode: string;
    address: string;
}

export interface InvoiceDate {
    date: Date | string;
    paymentTerms: "NET_10_DAYS" | "NET_20_DAYS" | "NET_30_DAYS" | string; // Use a union type for payment terms
}

export interface Errors {
    billFrom: Record<string, string>; // Stores error messages for the billFrom fields
    billTo: Record<string, string>;   // Stores error messages for the billTo fields
    projectDescription: string;        // Stores error message for the project description
}
const InvoiceForm = () => {
    const printRef = React.useRef<HTMLDivElement>(null);
    const [errors, setErrors] = React.useState<Errors>({
        billFrom: {},
        billTo: {},
        projectDescription: '',
    });
    const [billFrom, setBillFrom] = React.useState<BillFrom>({
        company: "",
        email: "",
        country: "",
        city: "",
        postalCode: "",
        address: ""
    });
    const [billTo, setBillTo] = React.useState<BillTo>({
        name: "",
        email: "",
        country: "",
        city: "",
        postalCode: "",
        address: ""
    });
    const [invoiceDate, setInvoiceDate] = React.useState<InvoiceDate>({
        date: new Date(),
        paymentTerms: "NET_10_DAYS"
    });
    const [projectDescription, setProjectDescription] = React.useState<string>("");
    const [items, setItems] = React.useState<Items>([]);
    const [totalPrice, setTotalPrice] = React.useState<number>(0);
    React.useEffect(() => {
        const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
        const tax = subtotal * 0.1; // 10% tax
        setTotalPrice(subtotal - tax);
    }, [items]);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = (): boolean => {
        const newErrors = {
            billFrom: {} as Record<string, string>,
            billTo: {} as Record<string, string>,
            projectDescription: '',
        };
        let isValid = true;

        // Validate Bill From Fields
        if (!billFrom.company) {
            newErrors.billFrom.company = 'Company name is required';
            isValid = false;
        }
        if (!billFrom.email || !validateEmail(billFrom.email)) {
            newErrors.billFrom.email = 'Valid email is required';
            isValid = false;
        }
        if (!billFrom.country) {
            newErrors.billFrom.country = 'Country is required';
            isValid = false;
        }
        if (!billFrom.city) {
            newErrors.billFrom.city = 'City is required';
            isValid = false;
        }
        if (!billFrom.postalCode) {
            newErrors.billFrom.postalCode = 'Postal code is required';
            isValid = false;
        }
        if (!billFrom.address) {
            newErrors.billFrom.address = 'Address is required';
            isValid = false;
        }

        // Validate Bill To Fields
        if (!billTo.name) {
            newErrors.billTo.name = 'Client name is required';
            isValid = false;
        }
        if (!billTo.email || !validateEmail(billTo.email)) {
            newErrors.billTo.email = 'Valid client email is required';
            isValid = false;
        }
        if (!billTo.country) {
            newErrors.billTo.country = 'Country is required';
            isValid = false;
        }
        if (!billTo.city) {
            newErrors.billTo.city = 'City is required';
            isValid = false;
        }
        if (!billTo.postalCode) {
            newErrors.billTo.postalCode = 'Postal code is required';
            isValid = false;
        }
        if (!billTo.address) {
            newErrors.billTo.address = 'Address is required';
            isValid = false;
        }

        // Validate Project Description
        if (!projectDescription.trim()) {
            newErrors.projectDescription = 'Project description is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };
    const handleSave = async () => {

        if (validateForm()) {
            const invoiceData = {
                billingFrom: {
                    billingFromAddress: {
                        city: billFrom.city,
                        country: billFrom.country,
                        postalCode: billFrom.postalCode,
                        streetAddress: billFrom.address,
                    },
                    companyEmail: billFrom.email,
                    companyName: billFrom.company,

                },
                billingTo: {
                    billingToAddress: {
                        city: billTo.city,
                        country: billTo.country,
                        postalCode: billTo.postalCode,
                        streetAddress: billTo.address,
                    },
                    clientEmail: billTo.email,
                    clientName: billTo.name,

                },

                invoiceDate: invoiceDate.date,  // ISO8601 formatted date
                items: items,
                paymentTerms: invoiceDate.paymentTerms,
                projectDescription: projectDescription,
                subTotal: totalCalculator(items),
                tax: '10%',
                totalAmount: totalPrice,
            };

            try {
                const result = await createInvoiceApi(invoiceData);
                toast.success(<Toast title='Invoice created successfully!' text='Your invoice has been created.' />, {
                    position: "top-right",
                    icon: false,
                });
                handleReset(false)
            } catch (error) {
                toast.error("Something went wrong")

            }

        }
        else {
            toast.error("Validation Checks Failed")
        }
    }
    const handleDownloadPDF = () => {
        const input = printRef.current;
        if (input) {
            html2canvas(input).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgWidth = 210; // A4 width in mm
                const pageHeight = 295; // A4 height in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save('invoice-preview.pdf');
            });
        }
    };
    const handleSaveAndPrint = async () => {
        await handleSave()
        handleDownloadPDF()
    }
    const handleReset = (showToast = true) => {
        setBillFrom({
            company: "",
            email: "",
            country: "",
            city: "",
            postalCode: "",
            address: ""
        })
        setBillTo({
            name: "",
            email: "",
            country: "",
            city: "",
            postalCode: "",
            address: ""
        })
        setInvoiceDate({
            date: new Date(),
            paymentTerms: "NET_10_DAYS"
        })
        setProjectDescription("")
        setItems([])
        setTotalPrice(0)
        { showToast && toast.success(<Toast title='Reset Complete' text='Your form has been reset' />, { icon: false }) }
    }
    return (
        <div className='invoicePage'>
            {/* <Toast/> */}
            <div id='header-section' className='d-flex justify-content-between'>
                <div className='mb-4'>
                    <p className='heading1'>New Invoice</p>
                    <p className='greyText'>Create new invoice for your customers</p>
                </div>
                <div className='d-flex gap-3 align-self-center'>
                    <button type='button' className='form-btn btn-reset' onClick={()=>handleReset(true)}>Reset</button>
                    <button type='button' className='form-btn bg-voilet' onClick={handleSave}>Save</button>
                    <button type='button' className=' bg-voilet' onClick={handleSaveAndPrint}>Save & Print</button>
                </div>
            </div>
            <div id='forms-container' className='row justify-content-between'>
                <BillForm billFrom={billFrom} billTo={billTo} setBillFrom={setBillFrom} setBillTo={setBillTo} invoiceDate={invoiceDate} setInvoiceDate={setInvoiceDate} projectDescription={projectDescription} setProjectDescription={setProjectDescription} items={items} setItems={setItems} errors={errors} setErrors={setErrors} />
                <div id='preview-form' className='col-12 col-md-5 custom-col  invoiceForm  previewForm bg-grey mb-3'>
                    <p className='heading2 mb-3'>Preview</p>
                    <div ref={printRef} className='invoiceForm previewForm bg-white'>
                        <p className='heading3'>New Invoice</p>
                        <hr className='hr-line' />
                        <div className='row mb-4'>
                            <div className='col-6'>
                                <p className='mb-2 previewFormLabel'>Invoice Date</p>
                                <p className='previewFormValue'>{formatDate(invoiceDate.date)}</p>
                            </div>
                            <div className='col-6'>
                                <p className='mb-2 previewFormLabel'>Payment Terms</p>
                                <p className='previewFormValue'>{paymentTermsPrinter(invoiceDate.paymentTerms)}</p>
                            </div>
                        </div>
                        <div className='row mb-4 wrapMyWord'>
                            <div className='col-lg-6 col-md-12'>
                                <p className='mb-2 previewFormLabel'>Billed From</p>
                                <p className='previewFormValue mb-3'>{billFrom.company}</p>
                                <p className='previewFormValue mb-3 '>{billFrom.email}</p>
                                <p className='previewFormValue mb-3'>{billFrom.address}</p>
                                <p className='previewFormValue mb-3'>{billFrom.city}{billFrom.city && billFrom.postalCode && ","} {billFrom.postalCode}</p>
                                <p className='previewFormValue mb-3'>{billFrom.country}</p>
                            </div>
                            <div className='col-lg-6 col-md-12 wrapMyWord'>
                                <p className='mb-2 previewFormLabel'>Billed To</p>
                                <p className='previewFormValue mb-3'>{billTo.name}</p>
                                <p className='previewFormValue mb-3 '>{billTo.email}</p>
                                <p className='previewFormValue mb-3'>{billTo.address}</p>
                                <p className='previewFormValue mb-3'>{billTo.city}{billTo.city && billTo.postalCode && ","} {billTo.postalCode}</p>
                                <p className='previewFormValue mb-3'>{billTo.country}</p>
                            </div>
                        </div>
                        <div className='row mb-4'>
                            <p className='previewFormLabel mb-3'>Project Description</p>
                            <p className='previewFormValue mb-3'>{projectDescription}</p>
                            {!projectDescription.trim().length && <p className='previewFormValue mb-3'>No project description added yet</p>}
                        </div>
                        <div className='row mb-4 justify-content-center'>
                            <table>
                                <thead className='bg-grey tableHeader'>
                                    <tr className='previewFormLabel'>
                                        <td className='w-30 px-2'>Item</td>
                                        <td className='w-20'>Qty.</td>
                                        <td className='w-25'>Price</td>
                                        <td className='text-end pr-3'>Total Amount</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => <tr className='previewFormValue'>
                                        <td className=' px-2'> {item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>$ {item.price}</td>
                                        <td className='text-end pr-3'>$ {item.totalPrice}</td>
                                    </tr>)}
                                    {!items.length && <tr className='previewFormLabel text-center'><td className='w-30'>No Item Added Yet</td></tr>}
                                </tbody>
                            </table>
                        </div>
                        <hr className='hr-line' />
                        <div className='d-flex justify-content-end mb-3'>
                            <div className='d-flex w-45 justify-content-between heading4'>
                                <p>Subtotal</p>
                                <p> $ {totalCalculator(items)}</p>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end mb-3'>
                            <div className='d-flex w-45 justify-content-between heading4'>
                                <p>Tax</p>
                                <p> 10%</p>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end mb-3'>
                            <div className='d-flex w-45 justify-content-between heading0'>
                                <p>Total</p>
                                <p> $ {totalPrice}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceForm;
