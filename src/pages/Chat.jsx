import { useState, useRef } from 'react'
import ContactsContainer from '../components/ContactsContainer'
import ChatContainer from '../components/ChatContainer'
import EmptyChatContainer from '../components/EmptyChatContainer'

function Chat() {
  const [selectedContact, setSelectedContact] = useState(null)
  const refreshContactsRef = useRef(null)

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ContactsContainer 
        onSelectContact={setSelectedContact}
        registerRefresh={(fn) => refreshContactsRef.current = fn}
      />
      {selectedContact 
        ? <ChatContainer 
            contact={selectedContact}
            onMessageSent={() => refreshContactsRef.current?.()}
          />
        : <EmptyChatContainer />
      }
    </div>
  )
}

export default Chat