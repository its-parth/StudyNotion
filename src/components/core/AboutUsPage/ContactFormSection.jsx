import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='w-full text-white'>
      <h1 className='text-center text-4xl'>Get In Touch</h1>
      <p className='text-center text-richblack-300 mt-3'>We&apos;d love to here for you, Please fill out this form.</p>
      <div className='py-15'>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection