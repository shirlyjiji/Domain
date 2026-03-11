import React from 'react';
import { ThumbsUp, MessageSquare, Share2, Award, ArrowUp, ArrowDown } from 'lucide-react';

const ForumPost = ({ post, isFirst, isReply = false, onVote, onReply, onAward, onShare, replyCount = 0 }) => {
    return (
        <div className={`reddit-post ${isReply ? 'reddit-reply' : ''}`} id={post.id}>
            {!isFirst && <div className="thread-line"></div>}

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
                        <h5 className="fw-bold text-dark mb-3">Domain For Sale: <span className="text-primary">{post.domain}</span></h5>
                        <div className="row g-2 small">
                            <div className="col-6">
                                <div className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.6rem' }}>Price</div>
                                <div className="fw-bold text-success-dark fs-6">${post.price}</div>
                            </div>
                            <div className="col-6">
                                <div className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.6rem' }}>Registrar</div>
                                <div className="fw-bold">GoDaddy</div>
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
                <button className="reddit-btn" onClick={() => onReply?.()}>
                    <MessageSquare size={16} /> {replyCount > 0 && <span className="me-1">{replyCount}</span>} Reply
                </button>
                <button className="reddit-btn" onClick={() => onAward?.(post.id)}>
                    <Award size={16} /> Award
                </button>
                <button className="reddit-btn" onClick={() => onShare?.(post.id)}>
                    <Share2 size={16} /> Share
                </button>
            </div>
        </div>
    );
};

export default ForumPost;
