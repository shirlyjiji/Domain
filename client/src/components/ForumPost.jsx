import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ThumbsUp, MessageSquare, Share2, Award, ArrowUp, ArrowDown, AlertCircle, Send, Heart } from 'lucide-react';

const ForumPost = ({ post, isFirst, isReply = false, onVote, onReply, onAward, onShare, replyCount = 0 }) => {
    const [domainDetails, setDomainDetails] = useState(null);
    const [backendError, setBackendError] = useState(null);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [likes, setLikes] = useState(post.likes || 0);
    const [thanks, setThanks] = useState(post.thanks || 0);

    useEffect(() => {
        setLikes(post.likes || 0);
        setThanks(post.thanks || 0);
    }, [post.likes, post.thanks]);

    useEffect(() => {
        // Shown empty Reply Section again if it was just submitted
        if (localStorage.getItem('openReply') === post?.id) {
            setShowReplyForm(true);
            localStorage.removeItem('openReply');
        }

        // Get details from DB if it's the main post
        if (isFirst && post?.domain) {
            const fetchDbDetails = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/domains?search=${post.domain}`);
                    if (res.data.domains && res.data.domains.length > 0) {
                        setDomainDetails(res.data.domains[0]);
                    }
                } catch (err) {
                    console.error('Backend fetch error:', err);
                    setBackendError(err.response?.data?.message || err.message);
                }
            };
            fetchDbDetails();
        }
    }, [isFirst, post?.domain, post?.id]);

    const handlePostReply = async () => {
        if (!replyText.trim()) return;
        setIsSubmitting(true);
        try {
            const displayDomain = domainDetails?.name || post.domain;
            const payload = {
                domainName: displayDomain || 'CanadaToAI.com',
                sender: {
                    name: 'GuestUser', 
                    avatar: 'https://i.pravatar.cc/150?u=guest',
                    role: 'Buyer'
                },
                content: replyText
            };
            
            // Post message to DB
            await axios.post('http://localhost:5000/api/messages', payload);
            
            // Set flag to re-open form after refresh
            localStorage.setItem('openReply', post.id);
            
            setReplyText(''); // Shown empty Reply Section
            
            // Reload page to show new message in thread and updated reply count
            window.location.reload(); 
        } catch (err) {
            console.error('Error posting reply:', err);
            setBackendError(err.response?.data?.message || err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLike = async () => {
        // Increment locally first for immediate feedback (Optimistic Update)
        setLikes(prev => prev + 1);
        
        try {
            const targetId = post._id || post.id;
            // Only call backend if it's a real ID (not the 'main' placeholder)
            if (targetId && targetId !== 'main') {
                const endpoint = isFirst ? `http://localhost:5000/api/forum/threads/${targetId}/like` : `http://localhost:5000/api/messages/${targetId}/like`;
                const { data } = await axios.patch(endpoint);
                if (data && data.likes !== undefined) {
                    setLikes(data.likes); // Sync with actual server count
                }
            }
        } catch (err) {
            console.error('Error liking:', err);
            setBackendError('Like could not be saved to server');
        }
    };

    const handleThanks = async () => {
        // Increment locally first for immediate feedback (Optimistic Update)
        setThanks(prev => prev + 1);
        
        try {
            const targetId = post._id || post.id;
            // Only call backend if it's a real ID (not the 'main' placeholder)
            if (targetId && targetId !== 'main') {
                const endpoint = isFirst ? `http://localhost:5000/api/forum/threads/${targetId}/thank` : `http://localhost:5000/api/messages/${targetId}/thank`;
                const { data } = await axios.patch(endpoint);
                if (data && data.thanks !== undefined) {
                    setThanks(data.thanks); // Sync with actual server count
                }
            }
        } catch (err) {
            console.error('Error thanking:', err);
            setBackendError('Thanks could not be saved to server');
        }
    };

    if (!post) return null;

    // Use DB details if available, otherwise fallback to props
    const displayPrice = domainDetails?.price || post.price;
    const displayRegistrar = domainDetails?.registrar || 'GoDaddy';
    const displayDomain = domainDetails?.name || post.domain;

    return (
        <div className={`reddit-post ${isReply ? 'reddit-reply' : ''}`} id={post.id}>
            {!isFirst && <div className="thread-line"></div>}

            {/* Error Message from Backend */}
            {backendError && (
                <div className="alert alert-danger d-flex align-items-center gap-2 m-3 p-2 small">
                    <AlertCircle size={16} />
                    <span><strong>Error:</strong> {backendError}</span>
                </div>
            )}

            <div className="reddit-post-header">
                <img
                    src={post.user?.avatar || "https://i.pravatar.cc/150?u=user"}
                    alt={post.user?.name}
                    className="reddit-avatar shadow-sm"
                />
                <div className="d-flex align-items-center gap-2">
                    <span className={`reddit-user-meta ${post.user?.role === 'Admin' ? 'text-primary' : 'text-dark-blue'}`}>
                        {post.user?.name || 'User'}
                    </span>
                    <span className="text-muted small">•</span>
                    <span className="reddit-timestamp">{post.date || '8h ago'}</span>
                    {post.awards && post.awards.length > 0 && (
                        <div className="d-flex gap-1 ms-2">
                            {post.awards.map((award, i) => (
                                <span key={i} title={award} className="badge bg-warning rounded-circle p-1" style={{ width: '18px', height: '18px', fontSize: '0.6rem' }}>🏆</span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="reddit-content">
                {isFirst && (
                    <div className="listing-details mb-3 p-3 bg-light-soft rounded-3 border">
                        <h5 className="fw-bold text-dark mb-3">Domain For Sale: <span className="text-primary">{displayDomain}</span></h5>
                        <div className="row g-2 small">
                            <div className="col-6">
                                <div className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.6rem' }}>Price</div>
                                <div className="fw-bold text-success-dark fs-6">${displayPrice}</div>
                            </div>
                            <div className="col-6">
                                <div className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.6rem' }}>Registrar</div>
                                <div className="fw-bold">{displayRegistrar}</div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="post-text">
                    {post.content}
                </div>
            </div>

            <div className="reddit-interaction-bar">
                <div className="d-flex align-items-center bg-light-soft rounded-pill px-1">
                    <button className="reddit-btn p-1" onClick={() => onVote?.(post.id, 'up')}><ArrowUp size={16} /></button>
                    <span className="small fw-bold px-1">{post.votes || 1}</span>
                    <button className="reddit-btn p-1" onClick={() => onVote?.(post.id, 'down')}><ArrowDown size={16} /></button>
                </div>
                
                <button className="reddit-btn" onClick={handleLike}>
                    <ThumbsUp size={16} className={likes > 0 ? "text-primary" : ""} /> <span className="fw-bold">{likes}</span> Like
                </button>
                
                <button className="reddit-btn" onClick={handleThanks}>
                    <Heart size={16} className={thanks > 0 ? "text-danger" : ""} /> <span className="fw-bold">{thanks}</span> Thanks
                </button>

                <button 
                    className={`reddit-btn ${showReplyForm ? 'text-primary' : ''}`} 
                    onClick={() => {
                        setShowReplyForm(!showReplyForm);
                        onReply?.();
                    }}
                >
                    <MessageSquare size={16} /> {replyCount > 0 && <span className="me-1">{replyCount}</span>} Reply
                </button>

                <button className="reddit-btn d-none d-md-flex" onClick={() => setShowReplyForm(true)}>
                    <Send size={16} /> Quick reply
                </button>

                <button className="reddit-btn" onClick={() => onShare?.(post.id)}>
                    <Share2 size={16} /> Share
                </button>
            </div>

            {/* Inline Reply Form */}
            {showReplyForm && (
                <div className="mt-3 p-3 bg-white border rounded shadow-sm">
                    <textarea
                        className="form-control border-secondary-subtle mb-3 p-2"
                        rows="3"
                        placeholder="What are your thoughts?"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        autoFocus
                    ></textarea>
                    <div className="d-flex justify-content-end gap-2">
                        <button 
                            className="btn btn-sm btn-light-soft rounded-pill px-3" 
                            onClick={() => setShowReplyForm(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button 
                            className="btn btn-sm btn-primary rounded-pill px-4 d-flex align-items-center gap-2 fw-bold" 
                            onClick={handlePostReply}
                            disabled={isSubmitting || !replyText.trim()}
                        >
                            {isSubmitting ? 'Posting...' : <><Send size={14} /> Post Message</>}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForumPost;
