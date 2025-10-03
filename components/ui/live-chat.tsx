"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Phone, 
  Video, 
  Paperclip, 
  Smile,
  MoreHorizontal,
  User,
  Bot,
  Clock,
  CheckCheck,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { AnimatedButton } from "./animated-button"
import { FloatingCard } from "./floating-card"

interface Message {
  id: string
  content: string
  sender: 'user' | 'agent' | 'bot'
  timestamp: Date
  status: 'sending' | 'sent' | 'delivered' | 'read'
  type: 'text' | 'image' | 'file' | 'system'
}

interface Agent {
  id: string
  name: string
  avatar: string
  status: 'online' | 'away' | 'busy'
  role: string
  responseTime: string
}

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting')
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock agent data
  const agents: Agent[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
      status: 'online',
      role: 'Senior Support Agent',
      responseTime: '< 1 min'
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: '/placeholder.svg?height=40&width=40',
      status: 'online',
      role: 'Product Specialist',
      responseTime: '< 2 min'
    }
  ]

  // Initialize chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Simulate connection and initial messages
      setTimeout(() => {
        setConnectionStatus('connected')
        setCurrentAgent(agents[0])
        
        const welcomeMessages: Message[] = [
          {
            id: '1',
            content: 'Welcome to SoleStyle Support! 👋',
            sender: 'bot',
            timestamp: new Date(),
            status: 'delivered',
            type: 'text'
          },
          {
            id: '2',
            content: 'I\'m connecting you with one of our specialists...',
            sender: 'bot',
            timestamp: new Date(),
            status: 'delivered',
            type: 'system'
          }
        ]
        
        setMessages(welcomeMessages)
        
        // Agent joins
        setTimeout(() => {
          const agentMessage: Message = {
            id: '3',
            content: `Hi! I'm ${agents[0].name}, your support specialist. How can I help you today?`,
            sender: 'agent',
            timestamp: new Date(),
            status: 'delivered',
            type: 'text'
          }
          setMessages(prev => [...prev, agentMessage])
        }, 2000)
      }, 1000)
    }
  }, [isOpen])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Simulate typing indicator
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => setIsTyping(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isTyping])

  const sendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending',
      type: 'text'
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue("")
    
    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' }
            : msg
        )
      )
    }, 500)

    // Simulate agent response
    setTimeout(() => {
      setIsTyping(true)
      
      setTimeout(() => {
        const responses = [
          "I understand your concern. Let me help you with that.",
          "That's a great question! Here's what I can tell you...",
          "I'd be happy to assist you with this. Let me check our system.",
          "Thanks for reaching out! I can definitely help you with that.",
          "Let me look into this for you right away."
        ]
        
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: responses[Math.floor(Math.random() * responses.length)],
          sender: 'agent',
          timestamp: new Date(),
          status: 'delivered',
          type: 'text'
        }
        
        setMessages(prev => [...prev, agentResponse])
        setIsTyping(false)
      }, 2000)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'busy': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getMessageStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending': return <Clock className="w-3 h-3 text-muted-foreground" />
      case 'sent': return <CheckCheck className="w-3 h-3 text-muted-foreground" />
      case 'delivered': return <CheckCheck className="w-3 h-3 text-blue-500" />
      case 'read': return <CheckCheck className="w-3 h-3 text-green-500" />
    }
  }

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <AnimatedButton
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-primary shadow-lg relative"
          animation="magnetic"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </AnimatedButton>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 100 }}
      animate={{ 
        scale: 1, 
        opacity: 1, 
        y: 0,
        height: isMinimized ? 60 : 500
      }}
      exit={{ scale: 0, opacity: 0, y: 100 }}
      className="fixed bottom-6 right-6 z-50 w-80"
    >
      <FloatingCard className="h-full flex flex-col bg-background/95 backdrop-blur-xl border-border/50">
        {/* Header */}
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
          <div className="flex items-center space-x-3">
            {currentAgent && (
              <>
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={currentAgent.avatar} alt={currentAgent.name} />
                    <AvatarFallback>{currentAgent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(currentAgent.status)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {currentAgent.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {currentAgent.role} • {currentAgent.responseTime}
                  </p>
                </div>
              </>
            )}
            
            {connectionStatus === 'connecting' && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Connecting...</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Video className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-8 h-8"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-8 h-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <Separator />
            
            {/* Messages */}
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-80 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        {message.sender !== 'user' && (
                          <div className="flex items-center space-x-2 mb-1">
                            {message.sender === 'agent' ? (
                              <User className="w-3 h-3 text-muted-foreground" />
                            ) : (
                              <Bot className="w-3 h-3 text-primary" />
                            )}
                            <span className="text-xs text-muted-foreground">
                              {message.sender === 'agent' ? currentAgent?.name : 'SoleStyle Bot'}
                            </span>
                          </div>
                        )}
                        
                        <div className={`rounded-2xl px-3 py-2 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : message.type === 'system'
                            ? 'bg-muted/50 text-muted-foreground text-center'
                            : 'bg-muted'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                        
                        <div className={`flex items-center space-x-1 mt-1 ${
                          message.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}>
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {message.sender === 'user' && getMessageStatusIcon(message.status)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex justify-start"
                      >
                        <div className="bg-muted rounded-2xl px-3 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>

            <Separator />

            {/* Input */}
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Paperclip className="w-4 h-4" />
                </Button>
                
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Smile className="w-4 h-4" />
                </Button>
                
                <AnimatedButton
                  onClick={sendMessage}
                  disabled={!inputValue.trim()}
                  size="icon"
                  className="w-8 h-8 bg-gradient-primary"
                  animation="scale"
                >
                  <Send className="w-4 h-4" />
                </AnimatedButton>
              </div>
            </CardContent>
          </>
        )}
      </FloatingCard>
    </motion.div>
  )
}
