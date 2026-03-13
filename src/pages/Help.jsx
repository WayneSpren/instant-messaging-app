import { useNavigate } from 'react-router-dom'

function Help() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h1>Instant Messaging App Help Guide</h1>
      <p>To use the app's chat features, first you must register an account and log in.</p>
      <p>Then, you can use the search bar in the sidebar to search for other users.</p>
      <p>Once you create a conversation, you can send messages using the text box at the bottom of the chat page.</p>
      <p>You can delete conversations by pressing the Delete Conversation button at the top of the chat page.</p>
      <p>Finally, press Logout in the sidebar when you're finished using the app.</p>
      <button onClick={() => navigate('/chat')}>Back to Chat</button>
    </div>
  )
}

export default Help