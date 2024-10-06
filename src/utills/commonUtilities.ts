import { Items } from "../pages/InvoiceForm";

export function formatDate(dateString:string|Date) {
if(typeof dateString === "string")
{
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const [year, month, day] = dateString.split('-');
  
  const formattedDate = `${parseInt(day)} ${months[parseInt(month) - 1]}, ${year}`;
  
  return formattedDate;
}
else{
  const options:any = { day: '2-digit', month: 'short', year: 'numeric' }; 
  return dateString.toLocaleDateString('en-US', options);
}
}
export function paymentTermsPrinter(value:string){
  if(value==="NET_10_DAYS")
    return "Net 10 Days"
  else if(value==="NET_20_DAYS")
    return "Net 20 Days"
  else if(value==="NET_30_DAYS")
    return "Net 30 Days"
}

export function totalCalculator(items:Items){
  let total = 0;
  items.map((item)=>total+=(item.totalPrice!))
  return total
}