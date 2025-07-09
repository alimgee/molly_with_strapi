import React from 'react';
import { Container, Row, Col } from 'reactstrap'
import Intro from '@/app/home/Intro'

const Notfound = () => {
    return(
        <main>
        <Intro />
        <Container className="mb-2">
            <Row>
                <Col className="text-center">
                    <h1>404 - Page not found</h1>
                </Col>
            </Row>
            <Row>
                <Col className="text-left">
                    <p>Opps!! Sorry. The page you are looking for no longer exists</p>
                </Col>

            </Row>
        </Container>
    </main>)

}

export default Notfound