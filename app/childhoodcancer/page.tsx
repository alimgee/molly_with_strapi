
import React from 'react';
import { Metadata } from 'next';
import Intro from '@/app/home/Intro';
import Signs from '@/app/childhoodcancer/Signs';
import Types from '@/app/childhoodcancer/Types';

export const metadata: Metadata = {
  title: "Childhood Cancer - Molly Rose",
  description: "Learn about childhood cancer signs, symptoms, and types including neuroblastoma. Essential information for parents and families.",
};

export default function CancerPage() {
    return (
        <main>
            <Intro />
            <Signs />
            <Types />
        </main>
    );
};
