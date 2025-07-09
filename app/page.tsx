import React from 'react';
import { Metadata } from 'next';
import Intro from '@/app/home/Intro';
import Quote from '@/app/home/Quote';
import CardSection from '@/app/home/Cards';
import NoticeSection from '@/app/home/Notice';

export const metadata: Metadata = {
  title: "Home - Molly Rose",
  description: "Molly Rose Foundation - Driving awareness of childhood cancer. Learn about Molly's story and how you can help support families affected by childhood cancer.",
};

export default function HomePage() {
  return (
    <main>
      <Intro />
      <Quote />
      <NoticeSection />
      <CardSection />
    </main>
  );
};