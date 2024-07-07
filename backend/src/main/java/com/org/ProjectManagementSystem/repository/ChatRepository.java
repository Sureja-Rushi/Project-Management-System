package com.org.ProjectManagementSystem.repository;

import com.org.ProjectManagementSystem.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
}
