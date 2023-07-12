'use client'
import React, { useState } from 'react';
import postHandler from '../handlers/postHandler';

const Form = () => {
    const [anonymousFeedback, setAnonymousFeedback] = useState('');
    const [graduationYear, setGraduationYear] = useState<number>(2024);
    const [issueSelection, setIssueSelection] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [email, setEmail] = useState('');
    const [problemSubject, setProblemSubject] = useState('');

    const handleAnonymousFeedbackChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAnonymousFeedback(e.target.value);
    };

    const handleProblemSubject = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProblemSubject(e.target.value);
    };

    const handleGraduationYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGraduationYear(parseInt(e.target.value));
    };    

    const handleIssueSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIssueSelection(e.target.value);
    };

    const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubject(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleRegistrationNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegistrationNumber(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    
        const formData = {
          anymtype: anonymousFeedback === 'no' ? 1 : 0,
          gradyr: graduationYear,
          issuetype: problemSubject,
          description: description,
          name: name,
          regno: registrationNumber,
          email: email,
        };
        
        const response = await postHandler('http://127.0.0.1:8080/posts/create', formData);
        console.log(response);
      };
    return (
        <div className={`flex flex-col items-center align-center ${anonymousFeedback === 'no' ? 'md:mt-[3%] mt-[5%] mb-[3%] md:mb-[1%]' : 'mt-[10%] mb-[3%]'} justify-center mx-[10%]`}>
            <div>
                <p className={`text-4xl ${anonymousFeedback === 'no' ? 'mb-4' : 'mb-16'}`}>Send Us Your Feedback!</p>
            </div>
            <div className=''>
                <div className='mb-4'>
                    <p className='text-lg mb-2'>Do you want your feedback to be anonymous?</p>
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
                            <p className='text-lg'>Name:</p>
                            <input
                                type='text'
                                className='text-lg w-full border-2 border-black bg-white rounded pl-2'
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className='mb-4'>
                            <p className='text-lg'>Registration Number:</p>
                            <input
                                type='text'
                                className='text-lg w-full border-2 border-black bg-white rounded pl-2'
                                value={registrationNumber}
                                onChange={handleRegistrationNumberChange}
                            />
                        </div>
                        <div className='mb-4'>
                            <p className='text-lg'>Email ID:</p>
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
                    <p className='text-lg'>Year Of Graduation:</p>
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
                {/* <div className='mb-4'>
                    <p className='text-lg'>Issue Selection</p>
                    <select
                        className='text-lg w-full border-2 border-black bg-white rounded pl-2'
                        value={issueSelection}
                        onChange={handleIssueSelectionChange}
                    >
                        <option value='yes'>YES</option>
                    </select>
                </div> */}
                {/* <div className='mb-4'>
                    <p className='text-lg'>Subject</p>
                    <input
                        type='text'
                        className='text-lg w-full border-2 border-black bg-white rounded pl-2'
                        value={subject}
                        onChange={handleSubjectChange}
                    />
                </div> */}
                <div className='mb-4'>
                    <p className='text-lg'>Problem Subject</p>
                    <select
                        className='text-lg w-full border-2 border-black bg-white rounded pl-2'
                        value={problemSubject}
                        onChange={handleProblemSubject}
                    >
                        <option value='Select'>Select </option>
                        <option value='General Grievance'>General Grievance </option>
                        <option value='Proctor Grievance'>Proctor Grievance </option>
                        <option value='Academic Counselling'>Academic Counselling </option>
                        <option value='NRI/Foreign Students Issues'>NRI/Foreign Students' Issues</option>
                        <option value='Clubs and Chapters'>Clubs and Chapters</option>
                        <option value='ECA Course'>ECA Course</option>
                        <option value='Student Achievements'>Student Achievements</option>
                        <option value='Day Scholars'>Day Scholars </option>
                        <option value='Day Boarders'>Day Boarders</option>
                        <option value='Other'>Other</option>
                        <option value='Disciplinary Issues'>Disciplinary Issues</option>
                        <option value='Hostel'>Hostel </option>
                        <option value='Canteen / Eating Places'>Canteen / Eating Places</option>
                        <option value='Health Center'>Health Center</option>
                        <option value='Campus Shops'>Campus Shops</option>
                        <option value='Other'>Other</option>
                    </select>
                </div>
                <div className='mb-4'>
                    <p className='text-lg'>Describe your issue</p>
                    <textarea
                        className='text-lg w-full border-2 border-black bg-white rounded pl-2'
                        rows={3}
                        value={description}
                        onChange={handleDescriptionChange}
                    ></textarea>
                </div>
            </div>
            <div>
            <button className="bg-[#111827] text-white px-8 py-2 rounded" onClick={handleSubmit as React.MouseEventHandler<HTMLButtonElement>}>
                Submit
            </button>
            </div>
        </div>
    );
};

export default Form;
