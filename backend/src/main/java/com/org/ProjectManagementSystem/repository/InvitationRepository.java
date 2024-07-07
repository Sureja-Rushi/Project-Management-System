package com.org.ProjectManagementSystem.repository;

import com.org.ProjectManagementSystem.model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    Invitation findByToken(String token);

    Invitation findByEmail(String userEmail);
}
