import React from 'react'
import "../../pages/invoiceform.css"
import { BillFrom, BillTo, Errors, InvoiceDate, Items as ItemsType } from '../../pages/InvoiceForm';
import Items from './Items';


interface BillFormProps {
    billFrom: BillFrom;
    billTo: BillTo;
    setBillFrom: React.Dispatch<React.SetStateAction<BillFrom>>;
    setBillTo: React.Dispatch<React.SetStateAction<BillTo>>;
    invoiceDate: InvoiceDate
    setInvoiceDate: React.Dispatch<React.SetStateAction<InvoiceDate>>;
    projectDescription: string;
    setProjectDescription:React.Dispatch<React.SetStateAction<string>>;
    items: ItemsType;
    setItems:React.Dispatch<React.SetStateAction<ItemsType>>;
    errors:Errors;
    setErrors:React.Dispatch<React.SetStateAction<Errors>>;
}

const BillForm: React.FC<BillFormProps>= ({ billFrom, billTo, setBillFrom, setBillTo, invoiceDate,setInvoiceDate,projectDescription,setProjectDescription,items,setItems,errors,setErrors })  => {

    
      const handleBillFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBillFrom((prev) => ({ ...prev, [name]: value }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          billFrom: { ...((prevErrors && prevErrors.billFrom) || {}), [name]: '' },
        }));
      };
    
      const handleBillTo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBillTo((prev) => ({ ...prev, [name]: value }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          billTo: { ...prevErrors.billTo, [name]: '' },
        }));
      };
    
      const handleInvoiceDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInvoiceDate((prev) => ({ ...prev, date: e.target.value }));
      };
    
      const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInvoiceDate((prev) => ({ ...prev, paymentTerms: e.target.value }));
      };
    
  return (
    <div className='col-12 col-md-5 custom-col invoiceForm mb-3'>
          <p className='heading2 mb-4'>Bill From</p>
         <div>
         <div className='row mb-3'>
            <div className='col-lg-6'>
                <p className='formLabel'>Company Name</p>
                <input className={`formInput ${errors.billFrom.company && 'input-error'}`} name='company' value={billFrom.company} onChange={handleBillFrom}/>
                {errors.billFrom.company && <p className="error-text">{errors.billFrom.company}</p>}
            </div>
            <div className='col-lg-6'>
                <p className='formLabel'>Company Email</p>
                <input className={`formInput ${errors.billFrom.email && 'input-error'}`} name='email' value={billFrom.email} onChange={handleBillFrom}/>
                {errors.billFrom.email && <p className="error-text">{errors.billFrom.email}</p>}
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-lg-4'>
                <p className='formLabel'>Country</p>
                <input className={`formInput ${errors.billFrom.country && 'input-error'}`} name='country' value={billFrom.country} onChange={handleBillFrom}/>
                {errors.billFrom.country && <p className="error-text">{errors.billFrom.country}</p>}
            </div>
            <div className='col-lg-4'>
                <p className='formLabel'>City</p>
                <input className={`formInput ${errors.billFrom.city && 'input-error'}`} name='city' value={billFrom.city} onChange={handleBillFrom}/>
                {errors.billFrom.city && <p className="error-text">{errors.billFrom.city}</p>}
            </div>
            <div className='col-lg-4'>
                <p className='formLabel'>Postal Code</p>
                <input className={`formInput ${errors.billFrom.postalCode && 'input-error'}`} name='postalCode' value={billFrom.postalCode} onChange={handleBillFrom}/>
                {errors.billFrom.postalCode && <p className="error-text">{errors.billFrom.postalCode}</p>}
            </div>
          </div>
          <div className='row mb-5'>
            <div className='col-12'>
                <p className='formLabel'>Street Address</p>
                <input className={`formInput ${errors.billFrom.address && 'input-error'}`} name='address' value={billFrom.address} onChange={handleBillFrom}/>
                {errors.billFrom.address && <p className="error-text">{errors.billFrom.address}</p>}
            </div>
          </div>

          <p className='heading2 mb-4'>Bill To</p>
          <div className='row mb-3'>
            <div className='col-lg-6'>
                <p className='formLabel'>Client's Name</p>
                <input className={`formInput ${errors.billTo.name && 'input-error'}`} name='name' value={billTo.name} onChange={handleBillTo}/>
                {errors.billTo.name && <p className="error-text">{errors.billTo.name}</p>}
            </div>
            <div className='col-lg-6'>
                <p className='formLabel'>Client's Email</p>
                <input className={`formInput ${errors.billTo.email && 'input-error'}`} name='email' value={billTo.email} onChange={handleBillTo}/>
                {errors.billTo.email && <p className="error-text">{errors.billTo.email}</p>}
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-lg-4'>
                <p className='formLabel'>Country</p>
                <input className={`formInput ${errors.billTo.country && 'input-error'}`} name='country' value={billTo.country} onChange={handleBillTo}/>
                {errors.billTo.country && <p className="error-text">{errors.billTo.country}</p>}
            </div>
            <div className='col-lg-4'>
                <p className='formLabel'>City</p>
                <input className={`formInput ${errors.billTo.city && 'input-error'}`} name='city' value={billTo.city} onChange={handleBillTo}/>
                {errors.billTo.city && <p className="error-text">{errors.billTo.city}</p>}
            </div>
            <div className='col-lg-4'>
                <p className='formLabel'>Postal Code</p>
                <input className={`formInput ${errors.billTo.postalCode && 'input-error'}`} name='postalCode' value={billTo.postalCode} onChange={handleBillTo}/>
                {errors.billTo.postalCode && <p className="error-text">{errors.billTo.postalCode}</p>}
            </div>
          </div>
          <div className='row mb-5'>
            <div className='col-12'>
                <p className='formLabel'>Street Address</p>
                <input className={`formInput ${errors.billTo.address && 'input-error'}`} name='address' value={billTo.address} onChange={handleBillTo}/>
                {errors.billTo.address && <p className="error-text">{errors.billTo.address}</p>}
            </div>
          </div>
            {/* the fields for bill to form */}
       <>
       <div className='row mb-3'>
            <div className='col-lg-6'>
                <p className='formLabel'>Invoice Date</p>
                <input type="date" className='formInput datePicker' defaultValue={typeof invoiceDate.date==="string"?invoiceDate.date:invoiceDate.date.toISOString().split('T')[0]} onChange={handleInvoiceDate}/>
            </div>
            <div className='col-lg-6'>
                <p className='formLabel'>Payment Terms</p>
                <div className="custom-dropdown">
                        <select className='w-100 bg-white paymentTermDropdown ddIcon' value={invoiceDate.paymentTerms} onChange={handleSelect}>
                        <option value="NET_10_DAYS" label='Net 10 days'/>  
                        <option value="NET_20_DAYS" label='Net 20 days'/>  
                        <option value="NET_30_DAYS" label='Net 30 days'/>  
                        </select>
                        <label className="dropdown-icon">
                              <img src="ddIcon.svg" alt="Dropdown Icon" />
                          </label>
                        </div>
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-12'>
                <p className='formLabel'>Project Description</p>
                <input className={`formInput ${errors.projectDescription && 'input-error'}`} value={projectDescription} name='projectDescription' onChange={(e)=>setProjectDescription(e.target.value)}/>
                 {errors.projectDescription && <p className="error-text">{errors.projectDescription}</p>}
            </div>
          </div>
          {/* itemslist */}
        <Items items={items} setItems={setItems}/>
       </>
         </div>
        </div>
  )
}

export default BillForm
