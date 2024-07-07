package com.org.ProjectManagementSystem.service;

import com.org.ProjectManagementSystem.model.Comment;
import com.org.ProjectManagementSystem.model.Issue;
import com.org.ProjectManagementSystem.model.User;
import com.org.ProjectManagementSystem.repository.CommentRepository;
import com.org.ProjectManagementSystem.repository.IssueRepository;
import com.org.ProjectManagementSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Comment createComment(Long issueId, Long userId, String content) throws Exception {
        Optional<User> optionalUser = userRepository.findById(userId);
        Optional<Issue> optionalIssue = issueRepository.findById(issueId);

        if(optionalUser.isEmpty()){
            throw new Exception("User not found with id: "+ userId);
        }
        if(optionalIssue.isEmpty()){
            throw new Exception("Issue not found with id: "+issueId);
        }

        Issue issue = optionalIssue.get();
        User user = optionalUser.get();

        Comment comment = new Comment();

        comment.setIssue(issue);
        comment.setUser(user);
        comment.setCreatedDateTime(LocalDateTime.now());
        comment.setContent(content);

        Comment savedComment = commentRepository.save(comment);
        issue.getComments().add(savedComment);

        return savedComment;
    }

    @Override
    public void deleteComment(Long commentId, Long userId) throws Exception {
        Optional<User> optionalUser = userRepository.findById(userId);
        Optional<Comment> optionalComment = commentRepository.findById(commentId);

        if(optionalUser.isEmpty()){
            throw new Exception("User not found with id: "+ userId);
        }
        if(optionalComment.isEmpty()){
            throw new Exception("Issue not found with id: "+commentId);
        }

        Comment comment = optionalComment.get();
        User user = optionalUser.get();

        if(comment.getUser().equals(user)){
            commentRepository.delete(comment);
        }
        else{
            throw new Exception("User doesn't have permission to delete this comment");
        }
    }

    @Override
    public List<Comment> findCommentsByIssueId(Long issueId) {
        return commentRepository.findByIssueId(issueId);
    }
}
