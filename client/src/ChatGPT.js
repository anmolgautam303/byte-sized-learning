import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import ClipLoader from "react-spinners/ClipLoader";

export const ChatGPT = () => {
  const [loading, setLoading] = useState(false);
  const [kidsAge, setKidsAge] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!kidsAge || !hobbies) {
      alert('Enter age and hobbies!');
      return;
    }

    try {
      setLoading(true);
      const prompt = `
      - You are a teacher and creating a tutorial for kids aged ${kidsAge}. 
      - Kid's hobbies are ${hobbies}.
      - This tutorial will be supported by a code sandbox that will contain an "App.js"
      - Kids won't need to open any link. Sandbox is already opened and setup. Don't mention about setup.
      - Requirements are: kids have no prior knowledge of react-native, it needs to be engaging fun for kids, and descriptive.
      - The kid will be able to complete this all alone without any support from an adult.
      - give the output as markdown syntax
      - Only use on functional component App.js and do not create another component.`
      const result = await axios.post('http://localhost:3001/chat', { prompt });
      setResponse(result.data.result);
    } catch (error) {
      setResponse('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="kidsAge">
          <Form.Label>Enter your age:</Form.Label>
          <Form.Control
            placeholder={"Age"}
            type="number"
            value={kidsAge}
            onChange={(e) => setKidsAge(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="hobbies">
          <Form.Label>Enter 2 of your favorite hobbies:</Form.Label>
          <Form.Control
            placeholder={"hobbies"}
            type="text"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-button">
          {loading ? 'Submitting' : 'Submit'}
          {loading && <ClipLoader
              color={'white'}
              loading={loading}
              // cssOverride={override}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          }
        </Button>
      </Form>
      <div>
        {!loading && (
          <ReactMarkdown className="tutorial">{response}</ReactMarkdown>
        )}
      </div>
    </Container>
  );
};
