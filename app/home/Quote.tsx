
import React from 'react';
import { fetchQuoteContent } from '../../lib/strapi';

const Quote = async () => {
    const quoteData = await fetchQuoteContent();
    
    return (
        <section className="quote-section">
            <div className="container">
                <div className="quote-content">
                    <blockquote>
                        <span>{quoteData.text}</span>
                    </blockquote>
                </div>
            </div>
        </section>
    );
};

export default Quote;
