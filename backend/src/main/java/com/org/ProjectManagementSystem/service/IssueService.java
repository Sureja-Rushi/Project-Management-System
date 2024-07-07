package com.org.ProjectManagementSystem.service;

import com.org.ProjectManagementSystem.model.Issue;
import com.org.ProjectManagementSystem.model.User;
import com.org.ProjectManagementSystem.request.IssueRequest;

import java.util.List;
import java.util.Optional;

public interface IssueService {

    Issue getIssueById (Long issueId) throws Exception;

    List<Issue> getIssuesByProjectId (Long projectId) throws Exception;

    Issue createIssue(IssueRequest issue, User user) throws Exception;

    void deleteIssue (Long issueId, Long userId) throws Exception;

//    List<Issue> searchIssues(String title, String status, String priority, Long assigneeId) throws Exception;

    Issue addUserToIssue (Long issueId, Long userId) throws Exception;

    Issue updateStatus (Long issueId, String status) throws Exception;
}
