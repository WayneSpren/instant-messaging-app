import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function CreateRoom() {
  const [contacts, setContacts] = useState([])
  const [selected, setSelected] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/api/contacts/all-contacts')
      .then(res => setContacts(res.data.contacts))
      .catch(() => setError('Failed to load users'))
  }, [])

  const toggleContact = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const handleCreate = async () => {
    if (selected.length === 0) {
      setError('Select at least one person')
      return
    }
    try {
      const res = await api.post('/api/contacts/search', { searchTerm: '' })
      navigate('/home')
    } catch {
      setError('Failed to create chatroom')
    }
  }

  return (
    <div>
      <h1>Create Chatroom</h1>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <h2>Select Members (max 8)</h2>
      {contacts.map(contact => (
        <div key={contact._id} onClick={() => toggleContact(contact._id)}
          style={{ cursor: 'pointer', background: selected.includes(contact._id) ? 'lightblue' : 'white' }}>
          <p>{contact.email}</p>
        </div>
      ))}
      <button onClick={handleCreate}>Create</button>
      <button onClick={() => navigate('/home')}>Cancel</button>
    </div>
  )
}

export default CreateRoom