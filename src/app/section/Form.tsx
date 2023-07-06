'use client'
import React, { useState } from 'react';

const Form = () => {
    const [anonymousFeedback, setAnonymousFeedback] = useState('');
    const [graduationYear, setGraduationYear] = useState('');
    const [issueSelection, setIssueSelection] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [email, setEmail] = useState('');

    const handleAnonymousFeedbackChange = (e) => {
        setAnonymousFeedback(e.target.value);
    };

    const handleGraduationYearChange = (e) => {
        setGraduationYear(e.target.value);
    };

    const handleIssueSelectionChange = (e) => {
        setIssueSelection(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleRegistrationNumberChange = (e) => {
        setRegistrationNumber(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            anonymousFeedback,
            graduationYear,
            issueSelection,
            subject,
            description,
        });
    };

    return (
        <div className={`flex flex-col items-center align-center ${anonymousFeedback === 'no' ? 'mt-[5%] mb-[2%]' : 'mt-[10%]'} justify-center mx-[10%]`}>
            <div>
                <p className='text-5xl mb-16'>Send Us Your Feedback!</p>
            </div>
            <div className=''>
                <div className='mb-4'>
                    <p className='text-xl mb-2'>Do you want your feedback to be anonymous?</p>
                    <select
                        className='text-lg w-full border-2 border-black bg-white rounded pl-2'
                        value={anonymousFeedback}
                        onChange={handleAnonymousFeedbackChange}
                    >
                        <option value='yes'>YES</option>
                        <option value='no'>NO</option>
                    </select>
                </div>
                {anonymousFeedback === 'no' && (
                    <>
                        <div className='mb-4'>
                            <p className='text-xl'>Name:</p>
                            <input
                                type='text'
                                className='text-lg w-full border-2 border-black bg-white rounded pl-2'
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className='mb-4'>
                            <p className='text-xl'>Registration Number:</p>
                            <input
                                type='text'
                                className='text-lg w-full border-2 border-black bg-white rounded pl-2'
                                value={registrationNumber}
                                onChange={handleRegistrationNumberChange}
                            />
                        </div>
                        <div className='mb-4'>
                            <p className='text-xl'>Email ID:</p>
                            <input
                                type='email'
                                className='text-lg w-full border-2 border-black bg-white rounded pl-2'
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                    </>
                )}
                <div className='mb-4'>
                    <p className='text-xl'>Year Of Graduation:</p>
                    <select
                        className='text-lg w-full border-2 border-black bg-white rounded pl-2'
                        value={graduationYear}
                        onChange={handleGraduationYearChange}
                    >
                        <option value='2024'>2024</option>
                        <option value='2025'>2025</option>
                        <option value='2026'>2026</option>
                    </select>
                </div>
                <div className='mb-4'>
                    <p className='text-xl'>Issue Selection</p>
                    <select
                        className='text-lg w-full border-2 border-black bg-white rounded pl-2'
                        value={issueSelection}
                        onChange={handleIssueSelectionChange}
                    >
                        <option value='yes'>YES</option>
                    </select>
                </div>
                <div className='mb-4'>
                    <p className='text-xl'>Subject</p>
                    <input
                        type='text'
                        className='text-lg w-full border-2 border-black bg-white rounded pl-2'
                        value={subject}
                        onChange={handleSubjectChange}
                    />
                </div>
                <div className='mb-4'>
                    <p className='text-xl'>Describe your issue</p>
                    <textarea
                        className='text-lg w-full border-2 border-black bg-white rounded pl-2'
                        rows='4'
                        value={description}
                        onChange={handleDescriptionChange}
                    ></textarea>
                </div>
            </div>
            <div>
                <button className="bg-[#111827] text-white px-8 py-2 rounded" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Form;
