
import React from 'react';
import { fetchHomepageBanner, HomepageBanner } from '../../lib/strapi';

const NoticeSection = async () => {
    const banner: HomepageBanner | null = await fetchHomepageBanner();
    
    // Don't render anything if banner is null (not visible or no data)
    if (!banner) {
        return null;
    }

    return (
        <section>
            <div className="mb-2 container">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-text">
                                    <h2>{banner.title}</h2>
                                    <p>{banner.description}</p>
                                    {banner.linkText && banner.linkUrl && (
                                        <p>
                                            <i className="fa fa-tint mr-2" aria-hidden="true"></i>
                                            <a 
                                                href={banner.linkUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            >
                                                {banner.linkText}
                                            </a>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NoticeSection;
