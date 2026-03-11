import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, User, Clock, CheckCheck, RefreshCcw, Globe, MessageSquare, Search, MoreVertical, Paperclip, Smile, Settings } from 'lucide-react';

const AdminMessageManager = () => {
    const [threads, setThreads] = useState([]);
    const [activeThread, setActiveThread] = useState(null);
    const [messages, setMessages] = useState([]);
    const [replyContent, setReplyContent] = useState('');
    const [loadingThreads, setLoadingThreads] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
        if (domainName === activeThread) return;
        setActiveThread(domainName);
        fetchMessages(domainName, true);
    };

    const handleSendReply = async () => {
        if (!replyContent.trim() || !activeThread) return;
        const currentThread = activeThread;
        try {
            const payload = {
                domainName: currentThread,
                sender: {
                    name: 'Admin',
                    avatar: 'https://i.pravatar.cc/150?u=admin',
                    role: 'Admin'
                },
                content: replyContent
            };
            await axios.post('http://localhost:5000/api/messages', payload);
            setReplyContent('');
            fetchMessages(currentThread, false);
        } catch (err) {
            console.error('Error sending reply:', err);
        }
    };

    const filteredThreads = threads.filter(t =>
        t._id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="admin-messages-manager d-flex bg-white rounded-4 overflow-hidden border shadow-sm" style={{ height: '750px' }}>
            {/* Sidebar */}
            <div className="sidebar-container border-end d-flex flex-column bg-white" style={{ width: '380px' }}>
                <div className="p-4 border-bottom">
                    <h4 className="fw-bold mb-4 text-dark">Chat</h4>
                    <div className="position-relative">
                        <Search size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted opacity-50" />
                        <input
                            type="text"
                            className="form-control border-0 bg-light rounded-3 ps-5 py-2 small shadow-none"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="thread-list flex-grow-1 overflow-auto custom-scrollbar p-3">
                    {loadingThreads ? (
                        <div className="text-center py-5">
                            <div className="spinner-border spinner-border-sm text-primary opacity-25"></div>
                        </div>
                    ) : filteredThreads.length === 0 ? (
                        <div className="text-center py-5 text-muted small">No discussions found</div>
                    ) : (
                        filteredThreads.map(thread => (
                            <div
                                key={thread._id}
                                className={`d-flex align-items-center p-3 mb-2 rounded-4 cursor-pointer transition-all ${activeThread === thread._id ? 'bg-light shadow-sm' : 'hover-bg-light'}`}
                                onClick={() => handleThreadClick(thread._id)}
                            >
                                <div className="position-relative me-3">
                                    <div className="rounded-circle overflow-hidden bg-white border shadow-sm" style={{ width: '48px', height: '48px' }}>
                                        <img src={`https://i.pravatar.cc/100?u=${thread._id}`} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle" style={{ width: '12px', height: '12px' }}></div>
                                </div>
                                <div className="flex-grow-1 overflow-hidden">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span className="fw-bold text-dark small text-truncate">{thread._id}</span>
                                        <span className="text-muted" style={{ fontSize: '0.65rem' }}>{new Date(thread.lastTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <div className="text-muted small text-truncate" style={{ fontSize: '0.75rem' }}>{thread.lastMessage}</div>
                                </div>
                                {thread.unreadCount > 0 && (
                                    <span className="badge bg-danger rounded-circle ms-2" style={{ padding: '4px 6px', fontSize: '0.6rem' }}>{thread.unreadCount}</span>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Flow */}
            <div className="chat-container flex-grow-1 d-flex flex-column bg-white">
                {activeThread ? (
                    <>
                        <div className="chat-header p-4 border-bottom d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-3">
                                <div className="rounded-circle overflow-hidden bg-white border shadow-sm" style={{ width: '40px', height: '40px' }}>
                                    <img src={`https://i.pravatar.cc/100?u=${activeThread}`} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-0 text-dark">{activeThread}</h6>
                                    <div className="small text-success fw-medium" style={{ fontSize: '0.7rem' }}>Active Now</div>
                                </div>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-light btn-sm rounded-circle p-2"><Search size={18} className="text-muted" /></button>
                                <button className="btn btn-light btn-sm rounded-circle p-2"><Settings size={18} className="text-muted" /></button>
                            </div>
                        </div>

                        <div className="chat-history flex-grow-1 p-4 overflow-auto custom-scrollbar d-flex flex-column gap-4 bg-white">
                            {loadingMessages ? (
                                <div className="h-100 d-flex align-items-center justify-content-center">
                                    <div className="spinner-border text-primary opacity-10"></div>
                                </div>
                            ) : (
                                messages.map((msg, idx) => {
                                    const isMe = msg.sender.role === 'Admin';
                                    return (
                                        <div key={msg._id} className={`d-flex align-items-start gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="rounded-circle overflow-hidden bg-white border shadow-sm" style={{ width: '32px', height: '32px' }}>
                                                    <img src={isMe ? 'https://i.pravatar.cc/100?u=admin' : `https://i.pravatar.cc/100?u=${activeThread}`} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                            </div>
                                            <div className={`d-flex flex-column ${isMe ? 'align-items-end' : 'align-items-start'}`} style={{ maxWidth: '70%' }}>
                                                <div className={`p-3 px-4 shadow-sm ${isMe ? 'bg-white border text-dark' : 'bg-light-blue-soft text-dark'}`} style={{
                                                    borderRadius: '20px',
                                                    borderBottomRightRadius: isMe ? '4px' : '20px',
                                                    borderBottomLeftRadius: isMe ? '20px' : '4px',
                                                    backgroundColor: isMe ? '#fff' : '#eef6ff'
                                                }}>
                                                    <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{msg.content}</div>
                                                </div>
                                                <span className="text-muted mt-2" style={{ fontSize: '0.65rem' }}>
                                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    {isMe && <CheckCheck size={12} className="ms-1 text-primary" />}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="chat-footer p-4 border-top">
                            <div className="d-flex align-items-center gap-3">
                                <div className="input-group bg-light rounded-pill px-4 py-1 border-0 overflow-hidden shadow-none flex-grow-1 d-flex align-items-center">
                                    <input
                                        type="text"
                                        className="form-control border-0 bg-transparent shadow-none small flex-grow-1"
                                        placeholder="Type a message"
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                                        style={{ height: '45px' }}
                                    />
                                    <div className="d-flex gap-3 text-muted pe-1">
                                        <Smile size={20} className="cursor-pointer hover-text-primary" />
                                        <Paperclip size={20} className="cursor-pointer hover-text-primary" />
                                    </div>
                                </div>
                                <button
                                    className={`btn rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm ${replyContent.trim() ? 'btn-primary' : 'btn-light disabled opacity-50'}`}
                                    onClick={handleSendReply}
                                    style={{ height: '45px' }}
                                >
                                    <span className="fw-bold">Send</span>
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted opacity-25">
                        <MessageSquare size={64} className="mb-3" />
                        <h5 className="fw-bold">Select a thread to start chatting</h5>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
                .bg-light-blue-soft {
                    background-color: #eef6ff;
                }
                .hover-bg-light:hover {
                    background-color: #f8fafc;
                }
            ` }} />
        </div>
    );
};

export default AdminMessageManager;
