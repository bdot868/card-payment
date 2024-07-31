// // components/CreditCardForm.js
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// // Validation schema
// const schema = yup.object().shape({
//   cardType: yup.string().required('Card Type is required'),
//   cardNumber: yup.string().required('Card Number is required').matches(/^\d{16}$/, 'Card Number must be 16 digits'),
//   expirationDate: yup.string().required('Expiration Date is required').matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'Invalid expiration date'),
//   securityCode: yup.string().required('Security Code is required').matches(/^\d{3}$/, 'Security Code must be 3 digits'),
//   paymentAmount: yup.number().required('Payment Amount is required').positive('Payment Amount must be a positive number').typeError('Payment Amount must be a number')
// });

// const CreditCardForm = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema
//         const onSubmit = (data) => {
//             console.log(data);
//           }
//     )})
//           return (
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-green-100">
//               <div>
//                 <label className="block">Card Type</label>
//                 <select {...register('cardType')} className="mt-1 block w-full border border-gray-300 rounded-md">
//                   <option value="">Select Card Type</option>
//                   <option value="Visa">Visa</option>
//                   <option value="MasterCard">MasterCard</option>
//                   <option value="Discover">Discover</option>
//                 </select>
//                 {errors.cardType && <p className="text-red-500">{errors.cardType.message}</p>}
//               </div>
//               <div>
//                 <label className="block">Card Number</label>
//                 <input {...register('cardNumber')} className="mt-1 block w-full border border-gray-300 rounded-md" />
//                 {errors.cardNumber && <p className="text-red-500">{errors.cardNumber.message}</p>}
//               </div>
//               <div>
//                 <label className="block">Expiration Date</label>
//                 <input {...register('expirationDate')} placeholder="mm/yyyy" className="mt-1 block w-full border border-gray-300 rounded-md" />
//                 {errors.expirationDate && <p className="text-red-500">{errors.expirationDate.message}</p>}
//               </div>
//               <div>
//                 <label className="block">Security Code</label>
//                 <input {...register('securityCode')} className="mt-1 block w-full border border-gray-300 rounded-md" />
//                 {errors.securityCode && <p className="text-red-500">{errors.securityCode.message}</p>}
//               </div>
//               <div>
//                 <label className="block">Payment Amount</label>
//                 <input {...register('paymentAmount')} className="mt-1 block w-full border border-gray-300 rounded-md" />
//                 {errors.paymentAmount && <p className="text-red-500">{errors.paymentAmount.message}</p>}
//               </div>
//               <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
//             </form>
//           );
//         };
//         export default CreditCardForm;
        