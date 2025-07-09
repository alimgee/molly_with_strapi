
import React from 'react';
import { Metadata } from 'next';
import Intro from '@/app/home/Intro';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import { Items } from '@/app/helpout/Organisations';

export const metadata: Metadata = {
  title: "Help Out - Molly Rose",
  description: "Discover how you can help support childhood cancer awareness and charities that assist families affected by childhood cancer.",
};

export default function HelpPage() {

    return (
        <main>
            <Intro />
            <Container>
                <Row>
                    <Col>
                        <h2>How you Can Help </h2>
                        <p className="text-primary"><span className="first-character">T</span>here are many charities and organistions that we have encountered during our time in treatment
                          and the subsequent aftermath of loss. Some are very close to our hearts. 
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Items />
                    </Col>
                </Row>
            </Container>
        </main>
    );
};
