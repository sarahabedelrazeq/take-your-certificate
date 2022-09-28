import React from "react";
import styles from "../styles/Home.module.css";
import client from "../client";
import { Col, Container, Row } from "react-bootstrap";

export default function Home() {
  const [exams, setExams] = React.useState([]);

  const getExams = React.useCallback(async () => {
    let { data: exams, error } = await client.from("exams").select(`*`);
    if (!error) setExams(exams);
  }, []);
  React.useEffect(() => {
    getExams();
  }, [getExams]);

  // const testInsert = React.useCallback(
  //   async ({ id, text, choices, answer }) => {
  //     let { data: realAnswer, error } = await client
  //       .from("answers")
  //       .select(`*`)
  //       .eq("text", choices[answer - 1]);

  //     let { data } = await client
  //       .from("questions")
  //       .update({ answer_id: realAnswer[0].id })
  //       .eq("id", id);
  //   },
  //   []
  // );

  return (
    <div>
      <section className="mb-5">
        <Container>
          <Row>
            <Col xs={12}>
              <h1 className={styles.title}>
                Welcome to <a href="https://nextjs.org">Next.js!</a>
              </h1>
            </Col>
            <Col xs={12}>
              <p className={styles.description}>
                Get started by editing
                <code className={styles.code}>pages/index.js</code>
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            {exams.map(({ id, title, description }) => (
              <Col lg={4} xs={6} key={id}>
                <div className={styles.grid}>
                  <a href={`/exam/${id}`} className={styles.card}>
                    <Row>
                      <Col xs={12}>
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
    </div>
  );
}
