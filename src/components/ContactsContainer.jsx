import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function ContactsContainer({ onSelectContact }) {
  const [contacts, setContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/api/contacts/get-contacts-for-list')
      .then(res => setContacts(res.data.contacts))
      .catch(() => setError('Failed to load contacts'))
  }, [])

  const handleSearch = async () => {
    if (!searchTerm) return
    try {
      const res = await api.post('/api/contacts/search', { searchTerm })
      setSearchResults(res.data.contacts)
    } catch {
      setError('Search failed')
    }
  }

  const handleLogout = async () => {
    await api.post('/api/auth/logout')
    navigate('/login')
  }

  return (
    <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '10px', height: '100vh' }}>
      <h2>Chats</h2>
      <div>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {searchResults.length > 0 && (
        <div>
          <h3>Results</h3>
          {searchResults.map(contact => (
            <div
              key={contact._id}
              onClick={() => { onSelectContact(contact); setSearchResults([]) }}
              style={{ cursor: 'pointer', padding: '8px', borderBottom: '1px solid #eee' }}
            >
              <p style={{ margin: 0 }}>{contact.firstName} {contact.lastName}</p>
              <small>{contact.email}</small>
            </div>
          ))}
        </div>
      )}
      <h3>Recent</h3>
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
      <button onClick={() => navigate('/profile')}>Edit Profile</button>
      <button onClick={() => navigate('/help')}>Help</button>
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
      
    </div>
  )
}

export default ContactsContainer