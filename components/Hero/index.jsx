import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function Hero({ title, description }) {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1 className="fs-1 text-center">{title}</h1>
        </Col>
        <Col xs={12}>
          <p className="fs-3 text-center">{description}</p>
        </Col>
      </Row>
    </Container>
  );
}
