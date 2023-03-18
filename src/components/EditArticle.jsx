import React, {useState} from 'react'
import {doc, setDoc } from 'firebase/firestore';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";

const EditArticle = ({data}) => {

  const [show, setShow] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({});
  const [title, setTitle] = ("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 

  const updatePost = () => {
    setUpdatedPost(data);
    console.log(updatedPost);
    handleShow();
  } 

  const handleChange = (e) => {
    const {name, value } = e.target;

    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
    console.log(updatedPost)
  }

  return (
    <div>
      <button 
          className='btn btn-warning' 
          onClick={() => updatePost()}
      >Edit</button>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>Update Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form>
                title<Form.Control name="title" value={updatedPost.title} onChange={e => setTitle(e.target.value)} />
                description<Form.Control name="description" value={updatedPost.text} onChange={handleChange} />
                tags<Form.Control name="tags" value={data.tags} onChange={handleChange} />
                image URL<Form.Control name="imageUrl" value={data.imageUrl} onChange={handleChange} />
                git<Form.Control name="git" value={data.git} onChange={handleChange} />
                URL<Form.Control name="url" value={data.url} onChange={handleChange} />
              </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
              Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
              Save Changes
          </Button>
          </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditArticle