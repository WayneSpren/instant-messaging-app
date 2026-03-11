import { useNavigate } from 'react-router-dom'

function Help() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h1>Help Guide</h1>
      <h2>Getting Started</h2>
      <p>Register an account with your email and password, then log in to access the chat.</p>
      <h2>Searching for Users</h2>
      <p>Use the search bar in the sidebar to find other users by name or email. Click their name to open a conversation.</p>
      <h2>Sending Messages</h2>
      <p>Type your message in the text box at the bottom of the chat and press Enter or click Send.</p>
      <h2>Deleting a Conversation</h2>
      <p>Click the Delete Conversation button at the top of any chat to remove the message history.</p>
      <h2>Editing Your Profile</h2>
      <p>Click Edit Profile in the sidebar to set your first and last name.</p>
      <h2>Logging Out</h2>
      <p>Click the Logout button in the sidebar to securely log out of your account.</p>
      <button onClick={() => navigate('/chat')}>Back to Chat</button>
    </div>
  )
}

export default Help