import React from 'react';

const Form = () => {
  return (
    <div className='flex flex-col items-center h-screen justify-center'>
      <div>
        <p className='text-5xl mb-16'>Send Us Your Feedback!</p>
      </div>
      <div className=''>
        <div className='mb-4'>
          <p className='text-xl mb-2'>Do you want your feedback to be anonymous?</p>
          <select className='text-lg w-full border-2 border-black bg-white rounded pl-2'>
            <option value='yes'>YES</option>
            <option value='no'>NO</option>
          </select>
        </div>
        <div className='mb-4'>
          <p className='text-xl'>Year Of Graduation:</p>
          <select className='text-lg w-full border-2 border-black bg-white rounded pl-2'>
            <option value='2024'>2024</option>
            <option value='2025'>2025</option>
            <option value='2026'>2026</option>
          </select>
        </div>
        <div className='mb-4'>
          <p className='text-xl'>Issue Selection</p>
          <select className='text-lg w-full border-2 border-black bg-white rounded pl-2'>
            <option value='yes'>YES</option>
          </select>
        </div>
        <div className='mb-4'>
          <p className='text-xl'>Subject</p>
          <input
            type='text'
            className='text-lg w-full border-2 border-black bg-white rounded pl-2'
          />
        </div>
        <div className='mb-4'>
          <p className='text-xl'>Describe your issue</p>
          <textarea
            className='text-lg w-full border-2 border-black bg-white rounded pl-2'
            rows='4'
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Form;
