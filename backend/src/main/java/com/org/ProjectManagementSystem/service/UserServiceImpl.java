package com.org.ProjectManagementSystem.service;

import com.org.ProjectManagementSystem.config.JwtProvider;
import com.org.ProjectManagementSystem.model.User;
import com.org.ProjectManagementSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;
    @Override
    public User findUserProfileByJwt(String jwt) throws Exception {
        String email = JwtProvider.getEmailFromToken(jwt);
        return findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if(user == null){
            throw new Exception("User not found");
        }
        return user;
    }

    @Override
    public User findUserById(Long userId) throws Exception {
        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser == null){
            throw new Exception("User not found");
        }
        return optionalUser.get();
    }

    @Override
    public User updateUsersProjectSize(User user, int size) {
        user.setProjectNumber(user.getProjectNumber() + size);
        return userRepository.save(user);
    }
}
