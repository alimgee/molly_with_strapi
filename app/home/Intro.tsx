
import React from 'react';
import { Container } from 'reactstrap';
import Link from 'next/link';
import { fetchHeroContent } from '../../lib/strapi';

const Intro = async () => {
    const heroContent = await fetchHeroContent();

    return (
        <section className="hero-section">
            <div className="jumbotron">
                <Container>
                    <h1 className="display-4">{heroContent.title}</h1>
                    <div className="content">
                        <p className="lead">{heroContent.subtitle}</p>
                        <Link href={heroContent.buttonLink} className="hero-btn">
                            {heroContent.buttonText}
                        </Link>
                    </div>
                </Container>
            </div>
        </section>
    );
};

export default Intro;
