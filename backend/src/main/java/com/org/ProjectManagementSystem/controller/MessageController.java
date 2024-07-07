package com.org.ProjectManagementSystem.controller;

import com.org.ProjectManagementSystem.model.Chat;
import com.org.ProjectManagementSystem.model.Message;
import com.org.ProjectManagementSystem.model.User;
import com.org.ProjectManagementSystem.request.MessageRequest;
import com.org.ProjectManagementSystem.service.MessageService;
import com.org.ProjectManagementSystem.service.ProjectService;
import com.org.ProjectManagementSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody MessageRequest request) throws Exception{
        User user = userService.findUserById(request.getSenderId());
        Chat chat = projectService.getProjectById(request.getProjectId()).getChat();
        if(chat == null) throw new Exception("Chats not found");

        Message sentMessages = messageService.sendMessage(request.getSenderId(), request.getProjectId(), request.getContent());
        return ResponseEntity.ok(sentMessages);
    }

    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>> getMessagesByProjectId(@PathVariable Long projectId) throws Exception{
        List<Message> messages = messageService.getMessageByProjectId(projectId);
        return ResponseEntity.ok(messages);
    }

}
