package com.org.ProjectManagementSystem.repository;

import com.org.ProjectManagementSystem.model.Subscription;
import com.org.ProjectManagementSystem.service.SubscriptionService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Subscription findByUserId(Long userId);
}
