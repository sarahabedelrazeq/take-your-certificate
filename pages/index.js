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

  const setAnswers = async () => {
    const questions = [
      {
        question: "What type of framework is Next.js?",
        answerOptions: [
          { answer: "Frontend" },
          { answer: "Backend" },
          { answer: "FullStack", isCorrect: true },
          { answer: "None of the above" },
        ],
      },
      {
        question: "When was Next.js released?",
        answerOptions: [
          { answer: "20 September 2019" },
          { answer: "14 January 2017" },
          { answer: "25 October 2016", isCorrect: true },
          { answer: "28 March 2018" },
        ],
      },
      {
        question: "Which CSS Framework are we using?",
        answerOptions: [
          { answer: "Bootstrap" },
          { answer: "TailwindCSS", isCorrect: true },
          { answer: "Chakra UI" },
          { answer: "Bulma CSS" },
        ],
      },
      {
        question:
          "Which class in Tailwind is used to set flex direction of column?",
        answerOptions: [
          { answer: "col" },
          { answer: "col-flex" },
          { answer: "flex-col", isCorrect: true },
          { answer: "None of the above" },
        ],
      },
    ];

    // let { data: question } = await client.from("answers").insert(
    //   questions.map(({ question }, index) => ({
    //     id: index + 21,
    //     title: question,
    //     text: question,
    //     exam_id: 3,
    //   }))
    // );

    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i]?.answerOptions.length; j++) {
        let { data: answer } = await client.from("answers").insert([
          {
            text: questions[i]?.answerOptions[j]?.answer,
            question_id: i + 21,
          },
        ]);
        if (questions[i]?.answerOptions[j]?.isCorrect) {
          let { data: question } = await client
            .from("questions")
            .update({ answer_id: answer?.id })
            .eq("id", i + 21);
        }
      }

      // let { data: answers, error } = await client
      //   .from("answers")
      //   .select(`*`)
      //   .eq("text", questions[i]?.choices[questions[i].answer - 1]);
      // let { data: question } = await client
      //   .from("questions")
      //   .update({ answer_id: answers[0]?.id })
      //   .eq("id", answers[0]?.question_id);
    }
  };

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
          <Row className="gy-4">
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
                          <h2 className="fs-3">{title}</h2>
                          <h2 className="fs-3">&rarr;</h2>
                        </div>
                      </Col>
                      <Col xs={12}>
                        <p className="fs-5">{description}</p>
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
