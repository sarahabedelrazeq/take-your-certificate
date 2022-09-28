import React from "react";
import DynamicForm from "components/DynamicForm";
import client from "client";
import { Col, Container, Row } from "react-bootstrap";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "store/app";
import styles from "styles/Home.module.css";
import Layout from "components/Layout";

export default function Exam() {
  const [exam, setExam] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const userName = useSelector(({ app }) => app.userName);

  const getExam = React.useCallback(async (exam_id) => {
    let { data: exam, error } = await client
      .from("exams")
      .select(`*`)
      .eq("id", exam_id);
    if (!error) setExam(exam[0]);
  }, []);

  const schema = React.useMemo(() => {
    return yup
      .object({
        name: yup.string().required("enter your full name"),
      })
      .required();
  }, []);

  const fields = React.useMemo(() => {
    return {
      name: {
        name: "name",
        title: "Name",
        placeholder: "Name",
        id: "name",
        required: true,
        defaultValue: userName,
      },
    };
  }, [userName]);

  const startExam = React.useCallback(
    async ({ name }) => {
      if (name) dispatch(setUserName(name));
      router.push(`/exam/${id}/start`);
    },
    [dispatch, router, id]
  );

  React.useEffect(() => {
    setLoading(true);
    if (id) getExam(id);
    if (id) {
      Promise.all([getExam(id)]).finally(() => setLoading(false));
    }
  }, [getExam, id]);

  return (
    <Layout loading={loading}>
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
                onSubmit={startExam}
                submitText="start your exam"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
}