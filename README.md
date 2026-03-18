# Instant Messaging App Frontend by Derek Dickinson
# https://github.com/derekdickinsonpdx/instant-messaging-app

# Code Structure

# src/pages:
# Chat.jsx - main chat page
# Login.jsx - login page
# Profile.jsx - edit profile info
# Register.jsx - register account
# Help.jsx - help page

# src/components:
# ChatContainer.jsx - message display
# ContactsContainer.jsx - contacts display
# EmptyChatContainer.jsx - displays when no contact selected
# Notification.jsx - notification display

# src/api.js:
# App.jsx - routing
# main.jsx - entry point

# Testing

# Unit Tests:
# Register page rejects invalid credentials
# Login page rejects invalid credentials
# Notifications display on the screen when prompted

# Feature Test:
# Account login info is saved correctly
# Contacts are searchable
# Contacts can't search themselves
# Message history displays properly
# Chats can be deleted
# Logout redirects to login page

# System Test:
# Real-time messaging works and messages are saved
# List of contacts is saved and updatable
# Notifications are displayed when appropriate

# Challenges Faced:
# Being new to React, Vite, Axios etc made it very difficult to get started.
# Real time messaging was very difficult to set up due the userId parameter not being mentioned in the API spec.
# Trying to connect to the remote backend delayed production by about a week.
# Many features ended up needing to be completely different than I'd planned in earlier documents.
# Some backend behavior generally differed from specs.
# Was often very difficult to debug the project due to the variety of interacting tools.

# Additional Features
# Message timestamps show the day sent.
# Confirm button employed when deleting conversations.
# Contact search results clear when joining a chat.