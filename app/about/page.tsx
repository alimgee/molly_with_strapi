
import React from 'react';
import { Metadata } from 'next';
import { Container, Row, Col } from 'reactstrap';
import Intro from '@/app/home/Intro';
import TwitterContainer from '@/app/about/Twitter';

export const metadata: Metadata = {
  title: "About Us - Molly Rose",
  description: "Learn about the Molly Rose Foundation, our mission to drive awareness of childhood cancer, and how we support families affected by childhood cancer.",
};

export default function AboutPage() {
    return (
        <main>
            <Intro />
            <Container className="mb-2">
                <Row>
                    <Col className="text-center">
                        <h2>About Us</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md="4" className="text-center">
                        <TwitterContainer />
                    </Col>
                    <Col md="8" className="text-left">
                        <p><span className="first-character">I</span>n 2015 we first walked the halls of St Johns ward for peadiatric cancer and became
                        part of that small group of families who know what it is to try to deal with a
                        childhood cancer diagnosis. We will never forget the bravery of the many children
                        we met on those corridors. We will also remember the health care professionals that
                        looked after Molly and done thier best to help her beat this insidious horrific disease
                        </p>
                        <p>
                            We created this site with the aim to drive awareness of childhood cancer as before out
                            journey we were ignorant to the world of peadiatric cancer.
                        </p>
                        <p>
                            This is our way of
                            giving back a little bit and trying to preserve the memory of our beautiful
                            much loved daughter. This is Molly Roses legacy.
                        </p>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};
