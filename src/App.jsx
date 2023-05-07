import './App.css'
import FormField from './Form'
import axios from 'axios';
import { nanoid } from 'nanoid'

const submitForm = (form) =>{
  console.log(form)
  axios.post('https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries', {
    id: nanoid(),
    name: form.name,
    email: form.email,
    subject: form.subject,
    message: form.message
  })
  .then((response)=> {
    console.log(response.data)
  }, (error) =>{
    console.log(error)
  })
}
function App() {

  return (
    <>
      <FormField submitForm={submitForm}/>
    </>
  )
}

export default App
