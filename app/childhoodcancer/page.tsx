
import React from 'react';
import { Metadata } from 'next';
import Intro from '@/app/home/Intro';
import Signs from '@/app/childhoodcancer/Signs';
import Types from '@/app/childhoodcancer/Types';
import { fetchCancerInfoByCategory } from '@/lib/strapi/cancer-info';

export const metadata: Metadata = {
  title: "Childhood Cancer - Molly Rose",
  description: "Learn about childhood cancer signs, symptoms, and types including neuroblastoma. Essential information for parents and families.",
};

export default async function CancerPage() {
  const signsData = await fetchCancerInfoByCategory('signs');
  const typesData = await fetchCancerInfoByCategory('types');

    return (
        <main>
            <Intro />
            <Signs signs={signsData} />
            <Types types={typesData} />
        </main>
    );
};
