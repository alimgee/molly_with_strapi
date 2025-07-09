
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Container,
    Row,
    Col,
    CardText,
    Card,
    CardImg,
    CardHeader,
    CardBody,
} from 'reactstrap';
import { FirstArticle } from '@/app/news/FirstArticle';
import { Articles } from '@/app/news/data';

const CardSection = () => {
    const firstArticle = Articles[0] || null;
    return (
        <section>
            <Container className="mb-4">
                <Row>
                    <Col lg="4" className="mb-4">
                        <Card>
                            <CardHeader><h2>Tell me more</h2></CardHeader>
                            <Image src="/assets/img/cancer-module.png" alt="balloons floating into the sky" className="card-img img-fluid rounded" width={500} height={500} />
                            <CardBody>
                                <div className="card-text" ><h3 className="news-header" style={{fontFamily:"Roboto Mono"}}>Childhood Cancer causes, signs and symptoms</h3></div>
                                <CardText>
                                    There are many types of diseases that are classed Childhood Cancer. The causes are manifold and in some cases largley unknown.
                                    However be assured that Childhood Cancer is very rare.
                                </CardText>
                                <Link href="/childhoodcancer" passHref legacyBehavior>
                                    <a title="Find out more information about Childhood Cancer" className="btn" style={{ textAlign: "left"  }} role="button">Childhood Cancer</a>
                                </Link>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="4" className="mb-4">
                        <Card>
                            <CardHeader><h2>How Can I Help?</h2></CardHeader>
                            <Image src="/assets/img/crumlin2.png" alt="Crumlin Childrens Hospital" className="img-fluid rounded" width={500} height={500}/>
                            <CardBody>
                                <div className="card-text" ><h3 className="news-header" style={{fontFamily:"Roboto Mono"}}>Donating blood and helping out charitys </h3></div>
                                <CardText >
                                    There are many organisations and charitys that provide much needed support. From assisting the children themselves to 
                                    supporting families affected by a childhood cancer diagnosis
                                </CardText>
                                <Link href="/helpout" passHref legacyBehavior>
                                    <a title="Find out the many ways to help" className="btn" style={{ textAlign: "left" }} role="button">Helping Out</a>
                                </Link>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="4" className="mb-4">
                        <Card>
                            <CardHeader><h2>News & Events</h2></CardHeader>
                            <Image src="/assets/img/events.png" alt="Colourful chalk pieces" className="img-fluid rounded" width={500} height={500} />
                            <CardBody>
                                <FirstArticle article={firstArticle}/>
                                <Link href="/news" passHref legacyBehavior>
                                    <a title="Find out the latest news on Childhood Cancer" className="btn" style={{ textAlign: "left" }} role="button">Browse News</a>
                                </Link>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default CardSection;
