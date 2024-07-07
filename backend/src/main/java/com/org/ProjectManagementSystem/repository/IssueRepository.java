package com.org.ProjectManagementSystem.repository;

import com.org.ProjectManagementSystem.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {

    public List<Issue> findByProjectId (Long projectId);
}
