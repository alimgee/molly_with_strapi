import { Metadata } from 'next';
import { fetchArticles } from '@/lib/strapi';
import Intro from '@/app/home/Intro';
import { Items } from '@/app/news/Articles';
import { Container, Row, Col } from 'reactstrap';

export const metadata: Metadata = {
  title: "News & Events - Molly Rose",
  description: "Latest news and events related to childhood cancer awareness and support for families affected by childhood cancer.",
};

export default async function NewsPage() {
  const articles = await fetchArticles();

  return (
    <main>
      <Intro />
      <Container>
        <Row>
          <Col>
            <h2>News & Events </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Items articles={articles} />
          </Col>
        </Row>
      </Container>
    </main>
  );
}