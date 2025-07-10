import React from 'react';
import { fetchFooterContent, FooterContent } from '../lib/strapi';

export default async function Footer() {
  const footerSections = await fetchFooterContent();

  return (
    <footer className="text-white py-4 mt-5 footer-molly">
      <div className="container">
        <div className="row">
          {footerSections.map((section: FooterContent) => (
            <div key={section.id} className="col-md-6 col-lg-4 mb-4">
              <h5 className="text-white">{section.sectionTitle}</h5>
              <div 
                dangerouslySetInnerHTML={{ __html: section.content }}
                className="footer-content text-white"
              />
            </div>
          ))}
        </div>
        
        <hr className="my-4 footer-hr" />
          
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-0 text-white">
              © {new Date().getFullYear()} Molly Rose Foundation. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}