import React, {useState} from 'react';
import { useLocation, useNavigate} from "react-router-dom";
import TodoDataService from '../services/todos';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const AddTodo = props => {
    let editing = false;
    let initialTodoTitle = "";
    let initialTodoMemo = "";
    const location = useLocation();
    const navigate = useNavigate();


  if (location.state && location.state.currentTodo) {
        editing = true;
        initialTodoTitle = location.state.currentTodo.title;
        initialTodoMemo = location.state.currentTodo.memo;
    }


    const [title, setTitle] = useState(initialTodoTitle);
    const [memo, setMemo] = useState(initialTodoMemo); // keeps track if todo is submitted
    const [submitted, setSubmitted] = useState(false);

    const onChangeTitle = e => {
        const title = e.target.value;
        setTitle(title);
        }

    const onChangeMemo = e => {
        const memo = e.target.value;
        setMemo(memo);
    }

    const saveTodo = () => {
        var data = {
            title: title,
            memo: memo,
            completed: false,
        }

        if (editing) {
            TodoDataService.updateTodo(location.state.currentTodo.id, data, props.token)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                    navigate("/");

                })
                .catch(e => {
                    console.log(e);
                })
        } else {
            TodoDataService.createTodo(data, props.token)
                .then(response => {
                    setSubmitted(true);
                    navigate("/");
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>{editing ? "Edit" : "Create"} Todo</Form.Label> <Form.Control
                    type="text"
                    required
                    placeholder="e.g. buy gift tomorrow" value={title} onChange={onChangeTitle}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea" rows={3}
                            value={memo}
                            onChange={onChangeMemo} />
                </Form.Group>
                <Button variant="info" onClick={saveTodo}>
                    {editing ? "Edit" : "Add"} To-do </Button>
            </Form>
        </Container>
    )
}

export default AddTodo;
