
import React from "react";
import { fetchSupportOrganizations } from '@/lib/strapi/cancer-info';
import {
    Card,
    CardBody,
} from 'reactstrap';
import Image from 'next/image';

export async function Items() {
    // Fetch support organizations from Strapi
    const organizations = await fetchSupportOrganizations();

    // If no organizations from Strapi, fall back to static data for now
    if (organizations.length === 0) {
        const { Organisations } = await import("./data");
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
    }

    // Use Strapi data
    return (
        <div>
            {organizations.map((org, key) => (
                <Card key={key} className="mb-3">
                    <a href={org.website || '#'} style={{textDecoration:"none"}} target="_blank" rel="noopener noreferrer">
                        <h3 className="news-header">{org.name}</h3>
                        <div className="card-horizontal">
                            <div className="img-square-wrapper">
                                <Image 
                                    src={org.logoUrl || '/images/charities/default.svg'} 
                                    alt={org.name} 
                                    width={48} 
                                    height={48} 
                                    className="" 
                                    style={{ width: "3rem", padding:".15rem" }} 
                                />
                            </div>
                            <CardBody>
                                <p className="card-text" style={{marginTop:"-1rem", fontSize:".75rem"}}>{org.description}</p>
                            </CardBody>
                        </div>
                    </a>
                </Card>
            ))}
        </div>
    );
};
