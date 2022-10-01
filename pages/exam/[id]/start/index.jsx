import React from "react";
import DynamicForm from "components/DynamicForm";
import client from "client";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Layout from "components/Layout";
import * as yup from "yup";
import Celebration from "components/Celebration";
import Link from "next/link";
import Print from "components/Print";
import Certificate from "components/Certificate";
import { useSelector } from "react-redux";
import Hero from "components/Hero";

function Exam({ exam, questions }) {
  const [mark, setMark] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const [print, setPrint] = React.useState(false);
  const userName = useSelector((app) => app.userName);

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
      const examFields = questions.map(
        ({ id, title, text, answers, answer_id }) => ({
          name: `${id}`,
          title: title,
          placeholder: text,
          id: "question" + id,
          component: "radio",
          required: true,
          options: answers?.map(({ text, id }) => ({
            label: text,
            value: id,
          })),
          defaultValue: "",
        })
      );
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
      <section className="mb-5">
        <Hero title={exam.title} description={exam.description} />
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
      <Celebration show={result} />
      <div className="d-none">
        <Print print={print}>
          <Certificate name={userName} exam={exam.title} mark={mark} />
        </Print>
      </div>
      <Modal
        show={mark !== null}
        centered
        // onHide={() => {
        //   setMark(null);
        //   setResult(null);
        // }}
        size="lg"
      >
        <Modal.Header closeButton={false}>
          <Modal.Title className="text-black">
            {result ? "Congratulations" : "Hard Luck"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-black">
          {result ? "Congratulations" : "Hard luck"}! your make is: {mark}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="text-white">
            <Link href="/">Back to exam page?</Link>
          </Button>

          {result ? (
            <Button
              variant="primary"
              className="text-white"
              onClick={() => setPrint(true)}
            >
              Show your certificate
            </Button>
          ) : (
            <Button variant="primary" className="text-white">
              <Link href={`/exam/${exam?.id}`}>Repeat the exam?</Link>
            </Button>
          )}
        </Modal.Footer>
      </Modal>
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
