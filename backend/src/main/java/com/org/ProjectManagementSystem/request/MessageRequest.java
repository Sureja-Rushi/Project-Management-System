package com.org.ProjectManagementSystem.request;

import lombok.Data;

@Data
public class MessageRequest {

    private Long senderId;
    private String content;
    private Long projectId;

}
