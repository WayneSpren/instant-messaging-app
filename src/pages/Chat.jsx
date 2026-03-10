import { useState } from 'react'
import ContactsContainer from '../components/ContactsContainer'
import ChatContainer from '../components/ChatContainer.jsx'
import EmptyChatContainer from '../components/EmptyChatContainer'

function Chat() {
  const [selectedContact, setSelectedContact] = useState(null)

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ContactsContainer onSelectContact={setSelectedContact} />
      {selectedContact 
        ? <ChatContainer contact={selectedContact} />
        : <EmptyChatContainer />
      }
    </div>
  )
}

export default Chat