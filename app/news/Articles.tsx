'use client';

import React from "react";
import Script from 'next/script';
import { Card, CardBody } from 'reactstrap';

export const Items = ({ articles }) => {
    return (
        <div>
            {articles.map((data, key) => (
                <Card key={key} className="mb-3">
                    <CardBody>
                        <div>
                            <div className="card-text">
                                <a href={data.link} target="_blank" rel="noopener noreferrer" title="Go to news article" style={{ textDecoration: "none" }}>
                                    <div className="news-header">{data.name}</div>
                                </a>
                                <div className="news-content">{data.content}</div>
                                <span className="small text-muted">(source: {data.provider})</span>
                            </div>
                            <div className="small text-muted mt-1">{new Date(data.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        </div>
                        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-text="Driving awareness of childhood cancer." data-hashtags="ChildhoodCancer" data-related="mollyrosecancer" data-show-count="false">Tweet</a>
                    </CardBody>
                </Card>
            ))}
            <Script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></Script>
        </div>
    );
};
