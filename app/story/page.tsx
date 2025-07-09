
import React from 'react';
import { Metadata } from 'next';
import { Container, Row, Col } from 'reactstrap';
import Intro from '@/app/home/Intro';
import Detail from '@/app/story/StoryDetail';

export const metadata: Metadata = {
  title: "Mollys Story - Molly Rose",
  description: "Read Molly Rose's brave story - her journey with neuroblastoma and how her legacy continues to drive awareness of childhood cancer.",
};

export default function StoryPage() {
    return (
        <main>
            <Intro />
            <Container className="mb-2">
                <Row>
                    <Col className="text-center">
                    <h2>Mollys Story </h2>
                    </Col>
                </Row>
            </Container>
            <Detail />
        </main>
    );
};
