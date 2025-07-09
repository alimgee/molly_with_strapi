
import React from 'react';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import Image from 'next/image';

import molly from 'public/assets/img/molly2.png';
import mollycol from 'public/assets/img/molly1.png';

const Detail = () => {
    return (
        <Container fluid className="mb-4 mt-2">
            <Row>
                <Col md="9" className="text-left text-primary" >
                    <p><span className="first-character">I</span>n late October 2015, Molly Rose,
                    who was then just 9 months young, a whole life of possibilities ahead, began to
                    exhibit bruising and swelling around both her eyes, darkened shadows of what
                    was about to come into her our lives and, dismantle in a slow drip, her life.
                    After a couple of worried trips to local doctors we found ourselves in the
                     community x-ray clinic, oblivious and stressed but unaware of what lay beneath those
                    bruises. It was early November, tuesday, my only memory of that day lay between the
                    sterile walls of that clinic and, of a dark malevolence hovering.</p>
                    <p>On Wednesday 11th, after a trip to James Hospital, we found
                    ourselves in the place that would soon become our new home
                    from home, Crumlins Children Hospital. I felt my world heave
                    earlier that morning after speaking to a apologetic professor in James hospital
                    who held on to a dark secret and then arranged for us to go to Crumlin with the parting words 'You are in for a tough time'. Our worlds collapsed that
                    afternoon. New words flitted in and out of the tears
                    - 'mycn amplified' , 'aspiration', MIBG scan' and the worst
                    of all 'Nueroblastoma stage 4'. A cancer was eating away at
                    Molly and devouring what should have been her future.
</p>
                </Col>
                <Col md="3" className="order-1 text-center">
                    <Image alt="Molly Rose before cancer" className="rounded img-fluid story-img"  src={molly} />
                </Col>
            </Row>
            <Row>
                <Col md="3" className="text-center order-2 order-md-1" >
                    <Image alt="Molly Rose after tumour removal" className="rounded img-fluid story-img" src={mollycol} />
                </Col>
                <Col md="9" className="text-left text-primary order-1">
                    <p>We went on to be part of a treatment trial. Scans showed that Molly had
                    a tumour 'the size of an orange' above her adrenal gland and her bone
                    marrow and bones were also invaded, most of her young fragile body under
                    attack. Over the course of months Molly received many large doses of various
                    Chemotherapy treatments. Multiple stays in hospitals, anti sickness pills,
                    frequent growth hormone injections to repair marrow, unwanted needles and
                    invasive nasal gastric tubes were the order of the day. And the hair, nothing prepares
                    for that level of suffering, and nothing breaks you more when you see your
                         beloveds hair shedded on a hospital white pillow.</p>
                    <p>Molly took the treatment like a princess warrior, she was a little hero to all
                    who were touched by her story, stranger, friend and family alike. The
                    support we received at that time helped us through, so many good people,
                    so many well wishers, so many. By the time we got to June, 7 months later,
                    Mollys tumour was sucessfully removed, scans showed no trace of the dark
                    cancer, the lurking ghost seemed vanquished. We breathed a cautious sigh of
                    hope as doctors declared her recovery 'miraculous' and began preparations
                        for stem cell harvesting, we were swelling free and the bruises felt like just a bad memory.</p>
                </Col>
            </Row>
            <Row>
                <Col  className="text-left text-primary">
                    <p>The month of July was almost idyllic as cancer treatments go, we had no Chemo and Molly was looking
                    healthy, She got to spend quality time with her family, and the hair, to see the
                    hair coming back was the lift that was needed to get through the next steps.</p>
                    <p>The 'next steps' began in August. We would be transplanting Mollys earlier
                    harvested stem cells back into her body. But before that we had to poison
                    Molly with one more horrific dose of chemo to obliterate her marrow and
                    reboot her system in the hope of preventing the return of the dark spectre.
                    The chemo this time was horrendous, the nightmare slipped inception like
                    to a deeper level. The stem cells were replanted and began doing their work
                        but Molly was sick, very sick, and would remain so.</p>
                    <p>On thursday 25th August, Molly was rushed to PICU. She had developed sepsis
                    after an Adenovirus infection on top of everything else, her body was
                    shutting down. Molly, hooked up to a breathing machine, kidney machine
                    and many other life extending devices was now in a fight for her unlived
                    future. Our Molly rallied that weekend and by the start of the week blood
                    infection markers were showing huge improvement. By the time we
                    approached the end of the week we were prepping to remove the breathing
                         assistance and to get out of ICU.</p>
                    <p>Molly suffered a stroke and brain hemorrhage that friday afternoon from which
                    she would never recover. She was rushed to Temple street hospital for brain
                    surgery but all hope was done. Molly gave up her fight on the 3rd September
                    2016 in her daddys arms with her Mummy and Granny, our princess lost the only fight worth having, the fight to live and
                         love.</p>
                    <p>Molly loved and delighted in her sister Charlotte, 2 years her senior, but she also loved, 
                        strawberrys, monkeys, James Bays 'Hold Back the River', chocolate, buttery toast, tayto chipsticks, been held by Granny, 
                        The Lumineers 'Hey Ho', waiting for daddy in the evening and mammys cradle like arms.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Detail;
