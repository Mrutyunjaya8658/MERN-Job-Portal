import { HeightIcon } from '@radix-ui/react-icons';
import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';


const Footer = () => {
    const footerStyle = {
        backgroundColor: '#ffbd03', // Yellow color
        color: '#333',              // Dark text color for contrast
        textAlign: 'center',
        padding: '20px',
      
        width: '100%',
        bottom: '0'
      };
    
      // Inline style for social media icons
      const iconStyle = {
        color: '#333',              // Dark color for icons
        margin: '0 10px',
        fontSize: '24px',
        textDecoration: 'none'
      };

  return (
    <footer className='flex justify-between items-center' style={footerStyle}>
      <p className='font-bold text-md'>&copy; 2024 Your Company. All rights reserved.</p>
      <div className='flex items-center gap-4'>
        <a href="https://facebook.com" style={iconStyle} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" style={iconStyle} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" style={iconStyle} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" style={iconStyle} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
        </a>
      </div>
    </footer>
      
  )
}

export default Footer