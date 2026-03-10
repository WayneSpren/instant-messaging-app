import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function ContactsContainer({ onSelectContact }) {
  const [contacts, setContacts] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/api/contacts/get-contacts-for-list')
      .then(res => setContacts(res.data.contacts))
      .catch(() => setError('Failed to load contacts'))
  }, [])

  const handleLogout = async () => {
    await api.post('/api/auth/logout')
    navigate('/login')
  }

  return (
    <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '10px', height: '100vh' }}>
      <h2>Chats</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {contacts.length === 0 && <p>No contacts yet</p>}
      {contacts.map(contact => (
        <div
          key={contact._id}
          onClick={() => onSelectContact(contact)}
          style={{ cursor: 'pointer', padding: '8px', borderBottom: '1px solid #eee' }}
        >
          <p style={{ margin: 0 }}>{contact.firstName} {contact.lastName}</p>
          <small>{contact.email}</small>
        </div>
      ))}
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
    </div>
  )
}

export default ContactsContainer