import { useEffect } from 'react'

function Notification({ message, onClose }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [message])

  if (!message) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#333',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '8px',
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
    }}>
      {message}
    </div>
  )
}

export default Notification