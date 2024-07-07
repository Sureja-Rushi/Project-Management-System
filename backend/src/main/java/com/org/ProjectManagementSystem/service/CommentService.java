package com.org.ProjectManagementSystem.service;

import com.org.ProjectManagementSystem.model.Comment;

import java.util.List;

public interface CommentService {
    public Comment createComment(Long issueId, Long userId, String content) throws Exception;
    public void deleteComment(Long commentId, Long userId) throws Exception;
    public List<Comment> findCommentsByIssueId(Long issueId);
}
