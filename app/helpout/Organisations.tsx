
import React from "react";
import { Organisations } from "./data";
import {
    Card,
    CardBody,
} from 'reactstrap';
import Image from 'next/image';

export const Items = () => {

    return (
        <div>
            {Organisations.map((data, key) => (
                <Card key={key} className="mb-3">
                    <a href={data.link} style={{textDecoration:"none"}} target="_blank" rel="noopener noreferrer">
                        <h3 className="news-header">{data.name}</h3>
                        <div className="card-horizontal">
                            <div className="img-square-wrapper">
                                <Image src={data.logo} alt={data.name} width={48} height={48} className="" style={{ width: "3rem", padding:".15rem" }} />
                            </div>
                            <CardBody>
                                <p className="card-text" style={{marginTop:"-1rem", fontSize:".75rem"}}>{data.content}</p>
                            </CardBody>
                        </div>
                    </a>
                </Card>
            ))}
        </div>
    );
};
