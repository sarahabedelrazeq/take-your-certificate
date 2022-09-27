import React from "react";
import styles from "../styles/Home.module.css";
import client from "../client";
import { Col, Container, Row } from "react-bootstrap";

const test = [
  {
    id: "1",
    text: "React is also known as _____.",
    choices: ["ReactJS", "js library", "Both A. and B", "None of these"],
    answer: 3,
  },
  {
    id: "2",
    text: "React is a ____.",
    choices: [
      "Web development Framework",
      "JavaScript Library",
      "jQuery",
      "Web Server",
    ],
    answer: 2,
  },
  {
    id: "3",
    text: "Which ReactJS function renders HTML to the web page?",
    choices: [
      "render()",
      "ReactDOM.render()",
      "renders()",
      "ReactDOM.renders()",
    ],
    answer: 2,
  },
  {
    id: "4",
    text: "JSX stands for _____.",
    choices: ["JSON", "JSON XML", "JavaScript XML", "JavaScript and AngularJS"],
    answer: 3,
  },
  {
    id: "5",
    text: "JSX allows us to write _____.",
    choices: [
      "jQuery in React",
      "Angular Code in React",
      "MySQL in React",
      "HTML in React",
    ],
    answer: 4,
  },
  {
    id: "6",
    text: "What is the correct syntax to write expression in JSX?",
    choices: [
      "[ expression ]",
      "{ expression }",
      "{{ expression }}",
      "_expression",
    ],
    answer: 2,
  },
  {
    id: "7",
    text: "A class component must include the _______ statement.",
    choices: [
      "extends React.Component",
      "extends React",
      "extends Component",
      "extends React.Component.All",
    ],
    answer: 1,
  },
  {
    id: "8",
    text: "What are Props?",
    choices: [
      "Props are arguments passed into React components",
      "Props are functions in the ReactJS",
      "Props are used to returns multiple values from the function",
      "All of the above",
    ],
    answer: 1,
  },
  {
    id: "9",
    text: "What does props stand for?",
    choices: [
      "Proper Arguments",
      "Properties",
      "Proper Return Values",
      "All of the above",
    ],
    answer: 2,
  },
  {
    id: "10",
    text: "Which ReactJS command is used to create a new application?",
    choices: [
      "create-react-app",
      "new-react-app",
      "create-new-reactapp",
      "react-app",
    ],
    answer: 1,
  },
];

export default function Home() {
  const [exams, setExams] = React.useState([]);

  const insertQuestions = React.useCallback(
    async ({ id, text, choices, answer }) => {
      let { data, error } = await client
        .from("questions")
        .update([{ answer_id: answer }])
        .eq("id", id);
    },
    []
  );

  return (
    <div>
      <button onClick={() => test.forEach((item) => insertQuestions(item))}>
        test
      </button>
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
