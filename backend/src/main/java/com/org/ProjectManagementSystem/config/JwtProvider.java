package com.org.ProjectManagementSystem.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import javax.crypto.SecretKey;
import java.util.Collection;
import java.util.Date;

public class JwtProvider {
    static SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRETE_KEY.getBytes());

    public static String generateToken(Authentication auth){
//        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities(); // it use for role base

        return Jwts.builder().setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + (15 * 86400000)))
                .claim("email",auth.getName())
                .signWith(key)
                .compact();
    }

    public static String getEmailFromToken(String jwt){
        jwt = jwt.substring(7);
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

        return String.valueOf(claims.get("email"));
    }
}