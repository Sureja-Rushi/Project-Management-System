package com.org.ProjectManagementSystem.service;

import com.org.ProjectManagementSystem.model.PlanType;
import com.org.ProjectManagementSystem.model.Subscription;
import com.org.ProjectManagementSystem.model.User;

public interface SubscriptionService {

    Subscription createSubscription (User user);

    Subscription getUserSubscription(Long userId) throws Exception;

    Subscription upgradeSubscription (Long userId, PlanType planType);

    boolean isValid(Subscription subscription);
}
