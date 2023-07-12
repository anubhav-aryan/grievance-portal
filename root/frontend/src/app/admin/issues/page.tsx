'use client'
import React, { useState, useEffect } from 'react';
import getHandler from '@/app/handlers/getHandler';

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getHandler('http://127.0.0.1:8080/posts/get');
      if (response.status === 1) {
        setPosts(response.data);
      }
    };
    fetchData();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Generate array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Post List</h1>
      <div className="grid grid-cols-1 gap-6">
        {currentPosts.map((post) => (
          <div key={post.anymtype} className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-bold mb-2">{post.issuetype}</h2>
            <p className="text-gray-500 mb-4">{post.description}</p>
            <p className="text-gray-500">Grad Year: {post.gradyr}</p>
            <p className="text-gray-500">
              {post.anymtype === 0 ? 'Anonymous' : 'Not Anonymous'}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex items-center">
          <button
            className="bg-gray-200 text-gray-700 rounded-l px-4 py-2"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`mx-1 px-3 py-2 rounded bg-gray-200 text-gray-700 ${
                pageNumber === currentPage ? 'font-bold' : ''
              }`}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className="bg-gray-200 text-gray-700 rounded-r px-4 py-2"
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastPost >= posts.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;




