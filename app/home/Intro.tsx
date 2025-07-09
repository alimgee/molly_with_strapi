
import React from 'react';
import { Container } from 'reactstrap';
import Link from 'next/link';

const Intro = () => {
    return (
        <section style={{backgroundColor:"black"}}>
            <div className="jumbotron">
                <Container>
                    <h1 className="display-4">Molly Rose</h1>
                    <div className="content">
                        <p className="lead">Driving Awareness of Childhood Cancer
                        </p>
                        <Link href="/story" passHref legacyBehavior>
                            <a title="Read about Mollys Story" className="btn" style={{textAlign: "left"}} role="button">Mollys Story</a>
                        </Link>
                    </div>
                </Container>
            </div>
        </section>
    );
};

export default Intro;
