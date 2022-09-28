import React from "react";
import DynamicForm from "components/DynamicForm";
import client from "client";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import styles from "styles/Home.module.css";
import Layout from "components/Layout";
import * as yup from "yup";
import Celebration from "components/Celebration";
import Link from "next/link";
import Print from "components/Print";

const Icon = () => (
  <svg
    width="99"
    height="139"
    viewBox="0 0 99 139"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0H99V138.406L52.1955 118.324L0 138.406V0Z" fill="#e100ff" />
    <path
      d="M25.4912 83.2515C25.4912 79.4116 27.0222 75.7289 29.7474 73.0137C32.4727 70.2985 36.1689 68.7731 40.0229 68.7731C43.877 68.7731 47.5732 70.2985 50.2984 73.0137C53.0236 75.7289 54.5546 79.4116 54.5546 83.2515M40.0229 59.724C40.0229 55.8841 41.5539 52.2014 44.2791 49.4862C47.0044 46.7709 50.7006 45.2455 54.5546 45.2455C58.4087 45.2455 62.1049 46.7709 64.8301 49.4862C67.5553 52.2014 69.0863 55.8841 69.0863 59.724V83.2515"
      stroke="white"
      strokeWidth="10.6193"
    />
  </svg>
);

function Exam({ exam, questions }) {
  const [mark, setMark] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const [print, setPrint] = React.useState(false);

  const finishExam = React.useCallback(
    (data) => {
      let mark = 0;
      questions.forEach(({ id, answer_id }) => {
        if (answer_id == data[`${id}`]) mark++;
      });
      window.scrollTo(0, 0);
      setMark(mark);
      setResult(mark >= 5);
    },
    [questions]
  );

  const fields = React.useMemo(() => {
    if (questions) {
      const examFields = questions.map(({ id, title, text, answers }) => ({
        name: `${id}`,
        title: title,
        placeholder: text,
        id: "question" + id,
        component: "radio",
        required: true,
        options: answers?.map(({ text, id }) => ({ label: text, value: id })),
        defaultValue: "",
      }));
      return examFields;
    } else return {};
  }, [questions]);

  const schema = React.useMemo(() => {
    let schemaObj = {};
    fields.forEach(({ name }) => {
      schemaObj[`${name}`] = yup
        .string()
        .required("Please solve this question");
    });

    return yup.object(schemaObj);
  }, [fields]);

  return (
    <Layout loading={false}>
      <Celebration show={result} />
      <div className=" certificate">
        <Print print={print}>
          <div className="App">
            <Icon />
            <p className="byline">Certificate of completion</p>

            <div className="content">
              <p>Awarded to</p>
              <h1>Name Surname</h1>
              <p>for completing:</p>
              <h2>Creating PDFs with React & Make.cm</h2>
            </div>

            <p className="date">
              Issued on <span className="bold">March 15 2021</span>
            </p>
          </div>
        </Print>
      </div>
      <Modal
        show={mark !== null}
        centered
        onHide={() => {
          setMark(null);
          setResult(null);
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{result ? "Congratulations" : "Hard Luck"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {result ? "Congratulations" : "Hard luck"}! your make is: {mark}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
            <Link href="/">Repeat The Exam?</Link>
          </Button>

          {result ? (
            <Button
              variant="primary"
              className="text-white"
              onClick={() => setPrint(true)}
            >
              show your certificate
            </Button>
          ) : (
            <Button variant="primary" className="text-white">
              <Link href={`/exam/${exam?.id}`}>Repeat The Exam?</Link>
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <section className="mb-5">
        <Container>
          <Row>
            <Col xs={12}>
              <h1 className={styles.title}>{exam.title}</h1>
            </Col>
            <Col xs={12}>
              <p className={styles.description}>{exam.description}</p>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row className="justify-content-center">
            <Col xl={8} xs={12}>
              <DynamicForm
                fields={fields}
                schema={schema}
                onSubmit={finishExam}
                submitText="end your exam"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
}
export async function getServerSideProps({ query }) {
  let { data: exam, error: examError } = await client
    .from("exams")
    .select(`*`)
    .eq("id", query["id"]);

  let { data: questions, error: questionsError } = await client
    .from("questions")
    .select(`*, answers(*)`)
    .eq("exam_id", query["id"]);

  return {
    props: {
      exam: examError ? {} : exam[0],
      questions: questionsError ? {} : questions,
    },
  };
}

export default Exam;
