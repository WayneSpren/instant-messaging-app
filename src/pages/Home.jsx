import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function Home() {
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
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <h2>Your Chats</h2>
      {contacts.length === 0 && <p>No chats yet</p>}
      {contacts.map(contact => (
        <div key={contact._id} onClick={() => navigate(`/chatroom/${contact._id}`)}>
          <p>{contact.username || contact.email}</p>
        </div>
      ))}
      <button onClick={() => navigate('/create-room')}>Create Chatroom</button>
    </div>
  )
}

export default Home