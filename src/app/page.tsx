import Image from 'next/image';
import Form from './section/Form';
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex overflow-hidden">
        <div className='w-1/2 bg-[#408ec5] backdrop-blur-md relative'>
          <div className="h-full">
            <Image src="/chapters.png" alt="Chapters" fill={true} />
            <div className="absolute inset-0 flex justify-end pr-[2vw] pt-[1vh]">
              <div className="w-1/3 h-[10%] relative">
                <Image src="/logo.svg" alt="VIT Logo" fill={true} />
              </div>
            </div>
            <div className='absolute text-white left-[10%] top-[20%] flex-col'>
              <p className='text-3xl mb-16'>About Us:</p>
              <p className='pr-[20%] text-sm'>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
              </p>
            </div>
          </div>
        </div>
        <div className='w-1/2'>
          <Form />
        </div>
      </main>
      <footer className="bg-[#1A212D] py-[1%] px-[5%] flex justify-between">
        <div>
          <p className='text-white'>Copyright VIT</p>
        </div>
        <div className='flex'>
          <a href="https://www.facebook.com" className="text-white mx-2 hover:text-gray-300">
            <FaFacebook size={24}/>
          </a>
          <a href="https://www.linkedin.com" className="text-white mx-2 hover:text-gray-300">
            <FaLinkedin size={24}/>
          </a>
          <a href="https://www.instagram.com" className="text-white mx-2 hover:text-gray-300">
            <FaInstagram size={24}/>
          </a>
          <a href="https://www.twitter.com" className="text-white mx-2 hover:text-gray-300">
            <FaTwitter size={24}/>
          </a>
          <a href="https://www.twitter.com" className="text-white mx-2 hover:text-gray-300">
            <FaYoutube size={24}/>
          </a>
        </div>
      </footer>
    </div>
  );
}

