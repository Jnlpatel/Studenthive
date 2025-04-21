import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();
  const [method, setMethod] = useState('debit');
  const [form, setForm] = useState({
    cardNumber: '',
    expDate: '',
    cvv: '',
    name: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handlePay = () => {
    // validate if you like...
    alert('Payment successful!');
    navigate('/'); // back to home
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="flex items-center bg-white px-4 py-3 border-b">
        <button onClick={() => navigate(-1)} className="text-gray-600 mr-3">
          <FaArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold">Payment</h2>
      </div>

      <div className="px-4 mt-6 space-y-6">
        {/* Toggle */}
        <div className="bg-white p-1 rounded-full flex overflow-hidden">
          {['debit','credit'].map(m => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 text-center py-2 rounded-full font-medium ${
                method===m
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-600'
              }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        {/* Card Number */}
        <label className="block">
          <span className="text-teal-800 font-medium">Card Number</span>
          <input
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className="mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </label>

        {/* Exp + CVV */}
        <div className="flex gap-4">
          <label className="flex-1 block">
            <span className="text-teal-800 font-medium">Exp Date</span>
            <input
              name="expDate"
              value={form.expDate}
              onChange={handleChange}
              placeholder="MM/YY"
              className="mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </label>
          <label className="w-24 block">
            <span className="text-teal-800 font-medium">CVV</span>
            <input
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              placeholder="123"
              className="mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </label>
        </div>

        {/* Name */}
        <label className="block">
          <span className="text-teal-800 font-medium">Name</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Cardholder Name"
            className="mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </label>
      </div>

      {/* Footer */}
      <div className="fixed bottom-9 left-0 w-full bg-white p-4 border-t flex flex-col items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 mb-3"
        >
          Cancel Payment
        </button>
        <button
          onClick={handlePay}
          className="w-full max-w-md bg-teal-600 text-white py-3 rounded-full"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
