import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobileAlt, faMapMarkerAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import ContactInput from './ContactInput/ContactInput';



function Contact() {
  return (
    <div className="contact-container">
      <div id="contact" className="wrapper contact">
        <div className="contact-title">Contact</div>
        <div className="contact-form">
          <h2>Get in touch</h2>
          <p>Feel free to contact me</p>
          <form>
            <div className="input-container">
              <ContactInput id="email" label="Email" fontAwe={faUser} type="email" inputType="input" text="Your email here..."/>
              <ContactInput id="phone" label="Phone" fontAwe={faMobileAlt} type="phone" inputType="input" text="Your phone here..."/>
            </div>
            <ContactInput id="message" label="Message" type="phone" inputType="text-area" text="Your message here..."/>
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