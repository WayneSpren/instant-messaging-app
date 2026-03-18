import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function Profile() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/api/auth/userinfo')
      .then(res => {
        setFirstName(res.data.firstName || '')
        setLastName(res.data.lastName || '')
      })
      .catch(() => setError('Profile did not load'))
  }, [])

  const handleUpdate = async () => {
    try {
      await api.post('/api/auth/update-profile', { firstName, lastName })
      setSuccess('Profile updated!')
      setTimeout(() => navigate('/chat'), 1000)
    } catch {
      setError('Profiel could not be updated')
    }
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <div>
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <button onClick={handleUpdate}>Save</button>
      <button onClick={() => navigate('/chat')}>Cancel</button>
    </div>
  )
}

export default Profile