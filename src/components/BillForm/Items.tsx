import React from 'react';
import { Items as itemInterface, Item as singleItem } from '../../pages/InvoiceForm';

interface ItemProps {
  items: itemInterface;
  setItems: React.Dispatch<React.SetStateAction<itemInterface>>;
}

const Items: React.FC<ItemProps> = ({ items, setItems }) => {
  const [myItem, setMyItem] = React.useState<singleItem>({
    name: '',
    quantity: 0,
    price: 0,
    totalPrice: 0,
  });

  // State for validation errors
  const [errors, setErrors] = React.useState({
    name: '',
    quantity: '',
    price: '',
  });

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMyItem((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value, // Ensure quantity and price are numbers
    }));
    // Clear the error for the field being changed
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateFields = () => {
    let valid = true;
    let tempErrors = { name: '', quantity: '', price: '' };

    if (!myItem.name.trim()) {
      tempErrors.name = 'Required';
      valid = false;
    }
    if (myItem.quantity <= 0) {
      tempErrors.quantity = 'Required';
      valid = false;
    }
    if (myItem.price <= 0) {
      tempErrors.price = 'Required';
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const addItem = () => {
    // Run validation before adding the item
    if (validateFields()) {
      const newItem = { ...myItem, totalPrice: myItem.price * myItem.quantity };

      // Use spread to avoid mutating state directly
      setItems((prevItems) => [...prevItems, newItem]);

      // Clear the input fields for the next item
      setMyItem({
        name: '',
        quantity: 0,
        price: 0,
        totalPrice: 0,
      });
    }
  };

  const deleteItem = (delIndex: number) => {
    // Use filter to remove the item at the specific index
    setItems((prevItems) => prevItems.filter((_, index) => index !== delIndex));
  };

  return (
    <>
      <p className="heading2 mb-4">Items List</p>
      <div className="row mb-3">
        <div className="col-lg-5">
          <p className="formLabel">Item Name</p>
          <input
            className={`formInput ${errors.name ? 'input-error' : ''}`}
            name="name"
            onChange={handleItemChange}
            value={myItem.name}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>
        <div className="col-lg-2">
          <p className="formLabel">Qty.</p>
          <input
            className={`formInput ${errors.quantity ? 'input-error' : ''}`}
            name="quantity"
            type="number"
            onChange={handleItemChange}
            value={myItem.quantity}
          />
          {errors.quantity && <p className="error-text">{errors.quantity}</p>}
        </div>
        <div className="col-lg-2">
          <p className="formLabel">Price</p>
          <input
            className={`formInput ${errors.price ? 'input-error' : ''}`}
            name="price"
            type="number"
            onChange={handleItemChange}
            value={myItem.price}
          />
          {errors.price && <p className="error-text">{errors.price}</p>}
        </div>
        <div className="col-lg-3">
          <p className="formLabel">Total</p>
          <input
            className="formInput"
            value={myItem.quantity * myItem.price}
            disabled
          />
        </div>
      </div>
      <div className="mb-3 gap-5">
        <button
          className="col-12 d-flex justify-content-center gap-2 btn-rad bg-voilet"
          onClick={addItem}
        >
          <img src="plus.svg" />
          <p>Add New Item</p>
        </button>
      </div>

      {/* Display existing items */}
      {items.length > 0 &&
        items.map((item, index) => (
          <div className="row mb-3" key={index}>
            <div className="col-lg-5">
              <p className="formLabel">Item Name</p>
              <input
                className="formInput"
                name="name"
                value={item.name}
                readOnly
              />
            </div>
            <div className="col-lg-2">
              <p className="formLabel">Qty.</p>
              <input
                className="formInput"
                name="quantity"
                value={item.quantity}
                readOnly
              />
            </div>
            <div className="col-lg-2">
              <p className="formLabel">Price</p>
              <input
                className="formInput"
                name="price"
                value={item.price}
                readOnly
              />
            </div>
            <div className="col-lg-3">
              <p className="formLabel">Total</p>
              <div className="d-flex gap-2">
                <input
                  className="formInput"
                  value={item.quantity * item.price}
                  disabled
                />
                <img
                  className="align-self-center icon-img"
                  src="trash.svg"
                  alt="delete"
                  onClick={() => deleteItem(index)}
                />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Items;
