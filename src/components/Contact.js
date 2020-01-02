import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobileAlt, faMapMarkerAlt, faUser, faAt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';

function Contact() {
  const onSubmit = data => console.log(data);
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange"
  });
  return (
    <div className="contact-container">
      <div id="contact" className="wrapper contact">
        <div className="contact-title">Contact</div>
        <div className="contact-form">
          <h2>Get in touch</h2>
          <p>Feel free to contact me</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
              <div className="input">
                <label htmlFor="firstname">Firstname *</label>
                <div>
                  <span><FontAwesomeIcon icon={faUser} /></span>
                  <input name="firstname" type="text" id="firstname" placeholder="Your firstname here..." ref={register({ required: true })} />
                </div>
                {errors.firstname && <span className="error-message">This field is required</span>}
              </div>
              <div className="input">
                <label htmlFor="lastname">Lastname *</label>
                <div>
                  <span><FontAwesomeIcon icon={faUser} /></span>
                  <input name="lastname" type="text" id="lastname" placeholder="Your lastname here..." ref={register({ required: true })} />
                </div>
                {errors.lastname && <span className="error-message">This field is required</span>}
              </div>
            </div>
            <div className="input-container">
              <div className="input">
                <label htmlFor="email">Email *</label>
                <div>
                  <span><FontAwesomeIcon icon={faAt} /></span>
                  <input name="email" type="text" id="email" placeholder="Your email here..." ref={register({ required: true })} />
                </div>
                {errors.email && <span className="error-message">This field is required</span>}
              </div>
              <div className="input">
                <label htmlFor="phone">Phone *</label>
                <div>
                  <span><FontAwesomeIcon icon={faMobileAlt} /></span>
                  <input name="phone" type="text" id="phone" placeholder="Your phone here..." ref={register({ required: true })} />
                </div>
                {errors.phone && <span className="error-message">This field is required</span>}
              </div>
            </div>
            <div className="input-container">
              <div className="input">
                <label htmlFor="subject">Subject *</label>
                <div>
                  <span><FontAwesomeIcon icon={faEnvelope} /></span>
                  <input name="subject" type="text" id="subject" placeholder="Your subject here..." ref={register({ required: true })} />
                </div>
                {errors.subject && <span className="error-message">This field is required</span>}
              </div>
            </div>
            <div className="text-area">
              <label htmlFor="message">Message*</label>
              <div>
                <textarea name="message" id="message" placeholder="Your message here..." ref={register({ required: true })} />
              </div>
              {errors.message && <span className="error-message">This field is required</span>}
            </div>
            {/* <div className="submit-contact">
              <input type="submit" />
              <FontAwesomeIcon icon={faPaperPlane} />
            </div> */}
            <button className="submit-contact" type="submit">
              Send now
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
        <div className="contact-info">
          <div className="container-img-contact">
            <img src="./Hergibo_Sacha.jpg" alt="Hergibo Sacha" />
          </div>
          <ul>
            <li><span><FontAwesomeIcon icon={faEnvelope} /></span> sachahergibo@gmail.com</li>
            <li><span><FontAwesomeIcon icon={faMobileAlt} /></span> +32/498643049</li>
            <li>
              <span><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
              <div>
                <div> Route de Velaines, 24A</div>
                <div>7543 Mourcourt</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;