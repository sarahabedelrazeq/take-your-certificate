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
        id: "2",
        text: " ",
        choices: ["MPAs", "DPAs", "CPAs", "SPAs"],
        answer: 4,
      },
      {
        id: "3",
        text: " ",
        choices: [
          "Decorator pattern",
          "Observer pattern",
          "MVVM architecture pattern",
          "MVC architecture pattern",
        ],
        answer: 3,
      },
      {
        id: "4",
        text: " ",
        choices: ["True", "False"],
        answer: 1,
      },
      {
        id: "5",
        text: " ",
        choices: [
          "[expression]",
          "{{expressions}}",
          "{{{expressions}}}",
          "{expressions}",
        ],
        answer: 2,
      },
      {
        id: "6",
        text: " ",
        choices: [
          "ng-bind directive",
          "ng-model directive",
          "ng-init directive",
          "ng-app directive",
        ],
        answer: 1,
      },
      {
        id: "7",
        text: " ",
        choices: [
          "it is a function that takes text as input",
          "the lowercase filter converts a text to lowercase text",
          "both a and b",
          "none of the above",
        ],
        answer: 2,
      },
      {
        id: "8",
        text: " ",
        choices: [
          "it provides reusable components",
          "it uses dependency injection and makes use of separation of concerns",
          "it is unit-testable",
          "all of the above",
        ],
        answer: 4,
      },
      {
        id: "9",
        text: " ",
        choices: [
          "an angular controller is used for displaying the data",
          "an angular controller is used for controlling the data",
          "both a and b",
          "None of the above",
        ],
        answer: 2,
      },
      {
        id: "10",
        text: " ",
        choices: [
          "module(“app”,[])",
          "var myModule=angular.module()",
          "var myModule = new Module();",
          "None of the above",
        ],
        answer: 1,
      },
    ];

    for (let i = 0; i < questions.length; i++) {
      let { data: answers, error } = await client
        .from("answers")
        .select(`*`)
        .eq("text", questions[i]?.choices[questions[i].answer - 1]);

      let { data: question } = await client
        .from("questions")
        .update({ answer_id: answers[0]?.id })
        .eq("id", answers[0]?.question_id);

      console.log("object :>> ", answers[0]?.id, answers[0]?.question_id);
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
