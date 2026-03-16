import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, CheckCheck, Search, MoreVertical, Paperclip, Smile, Settings, ArrowLeft, Phone, Video, MessageSquare } from 'lucide-react';

const AdminMessageManager = ({ onMessagesRead, searchTerm = '' }) => {
    const [threads, setThreads] = useState([]);
    const [activeThread, setActiveThread] = useState(null);
    const [messages, setMessages] = useState([]);
    const [replyContent, setReplyContent] = useState('');
    const [loadingThreads, setLoadingThreads] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    // Mobile view: 'list' | 'chat'
    const [mobileView, setMobileView] = useState('list');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchThreads = async (isInitial = false) => {
        try {
            if (isInitial) setLoadingThreads(true);
            const res = await axios.get('http://localhost:5000/api/messages/admin/threads');
            setThreads(res.data);

            if (isInitial && res.data.length > 0 && !activeThread) {
                const firstThread = res.data[0]._id;
                setActiveThread(firstThread);
                fetchMessages(firstThread, true);
            }
        } catch (err) {
            console.error('Error fetching admin threads:', err);
        } finally {
            if (isInitial) setLoadingThreads(false);
        }
    };

    const fetchMessages = async (domainName, isInitial = false) => {
        if (!domainName) return;
        try {
            if (isInitial) setLoadingMessages(true);
            const res = await axios.get(`http://localhost:5000/api/messages/${domainName}`);
            setMessages(res.data);
            await axios.patch(`http://localhost:5000/api/messages/read/${domainName}`);
            fetchThreads(false);
            if (onMessagesRead) onMessagesRead();
        } catch (err) {
            console.error('Error fetching messages:', err);
        } finally {
            if (isInitial) setLoadingMessages(false);
            setTimeout(scrollToBottom, 50);
        }
    };

    useEffect(() => {
        fetchThreads(true);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleThreadClick = (domainName) => {
        setActiveThread(domainName);
        fetchMessages(domainName, true);
        setMobileView('chat');
    };

    const handleSendReply = async () => {
        if (!replyContent.trim() || !activeThread) return;
        const currentThread = activeThread;
        try {
            await axios.post('http://localhost:5000/api/messages', {
                domainName: currentThread,
                sender: { name: 'Admin', avatar: 'https://i.pravatar.cc/150?u=admin', role: 'Admin' },
                content: replyContent
            });
            setReplyContent('');
            fetchMessages(currentThread, false);
        } catch (err) {
            console.error('Error sending reply:', err);
        }
    };

    const filteredThreads = threads.filter(t =>
        t._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeThreadData = threads.find(t => t._id === activeThread);

    /* ── Thread List Panel ── */
    const ThreadList = (
        <div className="chat-thread-panel d-flex flex-column bg-white h-100">
            {/* Header */}
            <div className="px-4 pt-4 pb-3" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0 text-white">Chats</h5>
                    <div className="d-flex gap-2">
                        <div className="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
                            <Settings size={16} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Thread list */}
            <div className="flex-grow-1 overflow-auto custom-scrollbar px-2 pt-2 pb-3">
                {loadingThreads ? (
                    <div className="text-center py-5">
                        <div className="spinner-border spinner-border-sm text-primary opacity-25" />
                    </div>
                ) : filteredThreads.length === 0 ? (
                    <div className="text-center py-5 text-muted small">No chats found</div>
                ) : (
                    filteredThreads.map(thread => {
                        const isActive = activeThread === thread._id;
                        return (
                            <div
                                key={thread._id}
                                className={`d-flex align-items-center p-3 mb-1 rounded-3 cursor-pointer transition-all ${isActive ? 'bg-primary bg-opacity-10' : ''}`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleThreadClick(thread._id)}
                            >
                                {/* Avatar */}
                                <div className="position-relative me-3 flex-shrink-0">
                                    <img
                                        src={`https://i.pravatar.cc/100?u=${thread._id}`}
                                        alt="User"
                                        className="rounded-circle"
                                        style={{ width: 48, height: 48, objectFit: 'cover' }}
                                    />
                                    <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle" style={{ width: 12, height: 12 }} />
                                </div>
                                {/* Info */}
                                <div className="flex-grow-1 overflow-hidden">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className={`fw-bold small text-truncate ${isActive ? 'text-primary' : 'text-dark'}`}>{thread._id}</span>
                                        <span className="text-muted" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>
                                            {new Date(thread.lastTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <div className="text-muted text-truncate" style={{ fontSize: '0.75rem' }}>{thread.lastMessage}</div>
                                </div>
                                {/* Unread badge */}
                                {thread.unreadCount > 0 && (
                                    <span className="badge bg-primary rounded-circle ms-2" style={{ width: 20, height: 20, fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, flexShrink: 0 }}>
                                        {thread.unreadCount}
                                    </span>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );

    /* ── Chat Panel ── */
    const ChatPanel = (
        <div className="chat-chat-panel d-flex flex-column h-100">
            {/* Chat Header */}
            <div className="chat-header px-4 py-3 border-bottom d-flex align-items-center justify-content-between bg-white">
                <div className="d-flex align-items-center gap-3">
                    {/* Back button – only visible on mobile */}
                    <button
                        className="btn btn-sm btn-light rounded-circle p-2 d-lg-none"
                        onClick={() => setMobileView('list')}
                        style={{ width: 36, height: 36 }}
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <img
                        src={`https://i.pravatar.cc/100?u=${activeThread}`}
                        alt="User"
                        className="rounded-circle"
                        style={{ width: 40, height: 40, objectFit: 'cover' }}
                    />
                    <div>
                        <div className="fw-bold text-dark small">{activeThread}</div>
                        <div className="text-success" style={{ fontSize: '0.7rem' }}>● Active Now</div>
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-light btn-sm rounded-circle" style={{ width: 34, height: 34 }}>
                        <Phone size={15} className="text-muted" />
                    </button>
                    <button className="btn btn-light btn-sm rounded-circle" style={{ width: 34, height: 34 }}>
                        <Video size={15} className="text-muted" />
                    </button>
                    <button className="btn btn-light btn-sm rounded-circle" style={{ width: 34, height: 34 }}>
                        <MoreVertical size={15} className="text-muted" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="chat-history flex-grow-1 overflow-auto custom-scrollbar p-4 d-flex flex-column gap-3"
                style={{ background: '#f8f9ff' }}>
                {loadingMessages ? (
                    <div className="h-100 d-flex align-items-center justify-content-center">
                        <div className="spinner-border text-primary opacity-25" />
                    </div>
                ) : (
                    messages.map(msg => {
                        const isMe = msg.sender.role === 'Admin';
                        return (
                            <div key={msg._id} className={`d-flex align-items-end gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
                                {!isMe && (
                                    <img
                                        src={`https://i.pravatar.cc/100?u=${activeThread}`}
                                        alt="Avatar"
                                        className="rounded-circle flex-shrink-0"
                                        style={{ width: 28, height: 28, objectFit: 'cover' }}
                                    />
                                )}
                                <div className={`d-flex flex-column ${isMe ? 'align-items-end' : 'align-items-start'}`} style={{ maxWidth: '72%' }}>
                                    <div style={{
                                        padding: '10px 16px',
                                        borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                        background: isMe ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#ffffff',
                                        color: isMe ? '#fff' : '#1e293b',
                                        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                                        fontSize: '0.88rem',
                                        lineHeight: 1.5
                                    }}>
                                        {msg.content}
                                    </div>
                                    <span className="text-muted mt-1" style={{ fontSize: '0.62rem' }}>
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        {isMe && <CheckCheck size={11} className="ms-1 text-primary" />}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-footer p-3 border-top bg-white">
                <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-light rounded-circle flex-shrink-0" style={{ width: 40, height: 40 }}>
                        <Paperclip size={16} className="text-muted" />
                    </button>
                    <div className="flex-grow-1 d-flex align-items-center bg-light rounded-pill px-4 gap-2" style={{ height: 44 }}>
                        <input
                            type="text"
                            className="form-control border-0 bg-transparent shadow-none p-0 small"
                            placeholder="Type a message..."
                            value={replyContent}
                            onChange={e => setReplyContent(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSendReply()}
                        />
                        <Smile size={18} className="text-muted flex-shrink-0 cursor-pointer" />
                    </div>
                    <button
                        className="btn btn-primary rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center"
                        style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none' }}
                        onClick={handleSendReply}
                    >
                        <Send size={18} className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );

    const EmptyState = (
        <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted opacity-25">
            <MessageSquare size={64} className="mb-3" />
            <h6 className="fw-bold">Select a chat to start messaging</h6>
        </div>
    );

    return (
        <>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .chat-wrapper { height: 750px; overflow: hidden; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
                .chat-thread-panel { border-right: 1px solid #f1f5f9; }

                /* Desktop: side-by-side */
                @media (min-width: 992px) {
                    .chat-wrapper { display: flex; }
                    .chat-thread-panel { width: 340px; flex-shrink: 0; }
                    .chat-chat-panel { flex: 1; }
                    .mobile-only { display: none !important; }
                }

                /* Mobile: full-screen panels, slide between them */
                @media (max-width: 991.98px) {
                    .chat-wrapper { position: relative; display: block; height: calc(100vh - 160px); min-height: 500px; }
                    .chat-thread-panel,
                    .chat-chat-panel {
                        position: absolute;
                        top: 0; left: 0;
                        width: 100%; height: 100%;
                        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    .chat-thread-panel { transform: translateX(0); z-index: 1; }
                    .chat-chat-panel  { transform: translateX(100%); z-index: 2; }
                    /* When in chat view */
                    .show-chat .chat-thread-panel { transform: translateX(-100%); }
                    .show-chat .chat-chat-panel  { transform: translateX(0); }
                }
            `}</style>

            <div className={`chat-wrapper ${mobileView === 'chat' ? 'show-chat' : ''}`}>
                {ThreadList}
                <div className="chat-chat-panel d-flex flex-column h-100">
                    {activeThread ? (
                        <>
                            {/* Chat Header */}
                            <div className="chat-header px-4 py-3 border-bottom d-flex align-items-center justify-content-between bg-white">
                                <div className="d-flex align-items-center gap-3">
                                    <button
                                        className="btn btn-sm btn-light rounded-circle p-0 d-flex align-items-center justify-content-center d-lg-none"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setMobileView('list');
                                        }}
                                        style={{ width: 36, height: 36, cursor: 'pointer', zIndex: 10 }}
                                    >
                                        <ArrowLeft size={18} />
                                    </button>
                                    <img src={`https://i.pravatar.cc/100?u=${activeThread}`} alt="User" className="rounded-circle" style={{ width: 40, height: 40, objectFit: 'cover' }} />
                                    <div>
                                        <div className="fw-bold text-dark small">{activeThread}</div>
                                        <div className="text-success" style={{ fontSize: '0.7rem' }}>● Active Now</div>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-light btn-sm rounded-circle" style={{ width: 34, height: 34 }}><Phone size={15} className="text-muted" /></button>
                                    <button className="btn btn-light btn-sm rounded-circle" style={{ width: 34, height: 34 }}><Video size={15} className="text-muted" /></button>
                                    <button className="btn btn-light btn-sm rounded-circle" style={{ width: 34, height: 34 }}><MoreVertical size={15} className="text-muted" /></button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="chat-history flex-grow-1 overflow-auto custom-scrollbar p-4 d-flex flex-column gap-3" style={{ background: '#f8f9ff' }}>
                                {loadingMessages ? (
                                    <div className="h-100 d-flex align-items-center justify-content-center">
                                        <div className="spinner-border text-primary opacity-25" />
                                    </div>
                                ) : (
                                    messages.map(msg => {
                                        const isMe = msg.sender.role === 'Admin';
                                        return (
                                            <div key={msg._id} className={`d-flex align-items-end gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
                                                {!isMe && (
                                                    <img src={`https://i.pravatar.cc/100?u=${activeThread}`} alt="Avatar" className="rounded-circle flex-shrink-0" style={{ width: 28, height: 28, objectFit: 'cover' }} />
                                                )}
                                                <div className={`d-flex flex-column ${isMe ? 'align-items-end' : 'align-items-start'}`} style={{ maxWidth: '72%' }}>
                                                    <div style={{
                                                        padding: '10px 16px',
                                                        borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                                        background: isMe ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#ffffff',
                                                        color: isMe ? '#fff' : '#1e293b',
                                                        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                                                        fontSize: '0.88rem',
                                                        lineHeight: 1.5
                                                    }}>
                                                        {msg.content}
                                                    </div>
                                                    <span className="text-muted mt-1" style={{ fontSize: '0.62rem' }}>
                                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        {isMe && <CheckCheck size={11} className="ms-1 text-primary" />}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="chat-footer p-3 border-top bg-white">
                                <div className="d-flex align-items-center gap-2">
                                    <button className="btn btn-light rounded-circle flex-shrink-0" style={{ width: 40, height: 40 }}>
                                        <Paperclip size={16} className="text-muted" />
                                    </button>
                                    <div className="flex-grow-1 d-flex align-items-center bg-light rounded-pill px-4 gap-2" style={{ height: 44 }}>
                                        <input
                                            type="text"
                                            className="form-control border-0 bg-transparent shadow-none p-0 small"
                                            placeholder="Type a message..."
                                            value={replyContent}
                                            onChange={e => setReplyContent(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && handleSendReply()}
                                        />
                                        <Smile size={18} className="text-muted flex-shrink-0 cursor-pointer" />
                                    </div>
                                    <button
                                        className="btn rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center"
                                        style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none' }}
                                        onClick={handleSendReply}
                                    >
                                        <Send size={18} className="text-white" />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted opacity-25">
                            <MessageSquare size={64} className="mb-3" />
                            <h6 className="fw-bold">Select a chat to start messaging</h6>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminMessageManager;
