import { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'
import api from '../api'
import Notification from './Notification'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

function ChatContainer({ contact, onMessageSent }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const socketRef = useRef(null)
  const messagesEndRef = useRef(null)
  const [notification, setNotification] = useState('')
  const [page, setPage] = useState(1)
  const messagesPerPage = 20

  useEffect(() => {
    api.get('/api/auth/userinfo')
      .then(res => {
        console.log('User info:', res.data)
        setUserInfo(res.data)
      })
      .catch(() => console.error('Failed to get user info'))
  }, [])

  useEffect(() => {
    if (!userInfo) return
    setPage(1)

    console.log('Fetching messages for contact:', contact._id)
    api.post('/api/messages/get-messages', { id: contact._id })
      .then(res => {
        console.log('Messages response:', res.data)
        setMessages(res.data.messages)
      })
      .catch((err) => console.error('Failed to load messages:', err))

    socketRef.current = io(SERVER_URL, {
      withCredentials: true,
      extraHeaders: { "ngrok-skip-browser-warning": "true" },
      query: { userId: userInfo.id }
    })

    socketRef.current.on('receiveMessage', (message) => {
      console.log('Received receiveMessage:', message)
      setMessages(prev => [...prev, message])
      const senderId = message.sender?._id || message.sender
      if (senderId !== userInfo?.id) {
        setNotification(`New message from ${contact.email}`)
      }
    })

    socketRef.current.on('newMessage', (message) => {
      console.log('Received newMessage:', message)
      setMessages(prev => [...prev, message])
      const senderId = message.sender?._id || message.sender
      if (senderId !== userInfo?.id) {
        setNotification(`New message from ${contact.email}`)
      }
    })

    socketRef.current.on('connect', () => {
      console.log('Socket connected:', socketRef.current.id)
      socketRef.current.emit('addUser', userInfo.id)
    })

    socketRef.current.on('connect_error', (err) => {
      console.log('Socket error:', err.message)
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [contact._id, userInfo])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const totalPages = Math.ceil(messages.length / messagesPerPage)
  const paginatedMessages = messages.slice(
    (page - 1) * messagesPerPage,
    page * messagesPerPage
  )

  const handleSend = () => {
    if (!newMessage.trim() || !userInfo) return
    console.log('Sending message:', {
      sender: userInfo.id,
      recipient: contact._id,
      content: newMessage
    })
    socketRef.current.emit('sendMessage', {
      sender: userInfo.id,
      recipient: contact._id,
      content: newMessage,
      messageType: 'text'
    })
    setNewMessage('')
    setTimeout(() => onMessageSent?.(), 500)
  }

  const handleDeleteDM = async () => {
    if (!window.confirm('Are you sure you want to delete this conversation?')) return
    try {
      await api.delete(`/api/contacts/delete-dm/${contact._id}`)
      window.location.reload()
    } catch {
      console.error('Failed to delete DM')
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return `Today ${date.toLocaleTimeString()}`
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday ${date.toLocaleTimeString()}`
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    }
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Chat with {contact.firstName || contact.email}</h2>
        <button onClick={handleDeleteDM} style={{ color: 'red' }}>Delete Conversation</button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '8px' }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
          </div>
        )}
        {paginatedMessages.map((msg, i) => {
          const senderId = msg.sender?._id || msg.sender
          const isMe = senderId === userInfo?.id
          return (
            <div key={msg._id || i} style={{ marginBottom: '8px' }}>
              <small>
                {isMe ? 'You' : (contact.email || senderId)} · {formatTimestamp(msg.timestamp)}
              </small>
              <p style={{ margin: 0 }}>{msg.content}</p>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          style={{ flex: 1 }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
      <Notification message={notification} onClose={() => setNotification('')} />
    </div>
  )
}

export default ChatContainer