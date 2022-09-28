import React from "react";
import client from "../client";
import { Col, Container, Row } from "react-bootstrap";
import Hero from "components/Hero";
import Layout from "components/Layout";

export default function Home() {
  const [exams, setExams] = React.useState([]);

  const getExams = React.useCallback(async () => {
    let { data: exams, error } = await client.from("exams").select(`*`);
    if (!error) setExams(exams);
  }, []);
  React.useEffect(() => {
    getExams();
  }, [getExams]);

  return (
    <Layout>
      <section className="mb-5">
        <Hero
          title="Welcome to Take Your Certificate website"
          description="Get started by taking a exam"
        />
      </section>

      <section>
        <Container>
          <Row>
            {exams.map(({ id, title, description }) => (
              <Col lg={4} xs={6} key={id}>
                <div>
                  <a
                    href={`/exam/${id}`}
                    className="d-block  border border-white rounded p-4 text-white exam-card"
                  >
                    <Row>
                      <Col xs={12} className="mb-3">
                        <div className="w-100 d-flex justify-content-between">
                          <h2>{title}</h2>
                          <h2>&rarr;</h2>
                        </div>
                      </Col>
                      <Col xs={12}>
                        <p>{description}</p>
                      </Col>
                    </Row>
                  </a>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Layout>
  );
}
