import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap'

const VALIDATION = {
    email: [
      {
        isValid: (value) => !!value,
        message: '*required.',
      },
      {
        isValid: (value) => /\S+@\S+\.\S+/.test(value),
        message: 'Needs to be an email.',
      },
    ],
    name: [
      {
        isValid: (value) => !!value,
        message: '*required.',
      },
    ],
  };
  
  const getErrorFields = (form) =>
    Object.keys(form).reduce((acc, key) => {
      if (!VALIDATION[key]) return acc;
  
      const errorsPerField = VALIDATION[key]
        // get a list of potential errors for each field
        // by running through all the checks
        .map((validation) => ({
          isValid: validation.isValid(form[key]),
          message: validation.message,
        }))
        // only keep the errors
        .filter((errorPerField) => !errorPerField.isValid);
  
      return { ...acc, [key]: errorsPerField };
    }, {});
  
  

const FormField = (props) =>{


    const INITIAL_STATE = {name: '', email: '', subject: '', message: ''}
    const [form, setForm] = useState(INITIAL_STATE)
    const handleChange = (event) =>{
        const updatedForm = {...form, [event.target.id]: event.target.value}
        setForm(updatedForm)
    }
    const Submit = (event) =>{
        event.preventDefault();
        const hasErrors = Object.values(errorFields).flat().length > 0;
    if (hasErrors) return;        
        props.submitForm(form)
        setForm(INITIAL_STATE)
    }
    const errorFields = getErrorFields(form);
    return (
        <>
            <div className="title">
                <h2>Send A Message To Us</h2>
                <p>We would love to hear from you!</p>
            </div>
             <div className="form-container">
            <Form className="signup-form">
                <Form.Group>
                  <div className='my-3 input-left'>

                    <Form.Control className="name-input" type="text" placeholder="name" name="name" value={form.name} onChange={handleChange} id="name" required></Form.Control>
                    {errorFields.name?.length ? (
                      <span style={{ color: 'red' }}>
            {errorFields.name[0].message}
          </span>
        ) : null}
        </div>
                    <div className='my-3 input-left'>

                    <Form.Control className="email-input" type="email" placeholder="email" name="email" value={form.email} onChange={handleChange} id="email" required></Form.Control>
                    {errorFields.email?.length ? (
                      <span style={{ color: 'red' }}>
            {errorFields.email[0].message}
          </span>
        ) : null}
        </div>

                    <Form.Control className="subject-input my-3" type="text" placeholder="subject" name="subject" value={form.subject} onChange={handleChange} id="subject"></Form.Control>
                    <Form.Control as="textarea" className="message-input h-4 my-3" type="text" placeholder="message" name="message" value={form.message} onChange={handleChange} id="message"></Form.Control>
                    <Button className="submit-button my-3" value="submit" type="submit" onClick={Submit}>submit</Button>
                </Form.Group>
            </Form>
        </div>
        </>
    )
}
export default FormField;