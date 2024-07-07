package com.org.ProjectManagementSystem.controller;

import com.org.ProjectManagementSystem.model.Comment;
import com.org.ProjectManagementSystem.model.Issue;
import com.org.ProjectManagementSystem.model.User;
import com.org.ProjectManagementSystem.repository.CommentRepository;
import com.org.ProjectManagementSystem.request.CommentRequest;
import com.org.ProjectManagementSystem.response.MessageResponse;
import com.org.ProjectManagementSystem.service.CommentService;
import com.org.ProjectManagementSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Comment> createComment (@RequestBody CommentRequest req,
                                                  @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        Comment comment = commentService.createComment(req.getIssueId(), user.getId(), req.getContent());

        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<MessageResponse> deleteComment(@PathVariable Long commentId,
                                                         @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        commentService.deleteComment(commentId, user.getId());
        MessageResponse res = new MessageResponse();
        res.setMessage("comment deleted successfully...");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<List<Comment>> getCommentsByIssueId(@PathVariable Long issueId){
        List<Comment> comments = commentService.findCommentsByIssueId(issueId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

}
