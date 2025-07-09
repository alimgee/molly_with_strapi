
import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

const Quote = () => {
    return(
        <section>
            <Container>
                <Row>
                    <Col>
                    <blockquote><span>" Wash off yesterday, and dress for today "</span></blockquote> 
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Quote;
