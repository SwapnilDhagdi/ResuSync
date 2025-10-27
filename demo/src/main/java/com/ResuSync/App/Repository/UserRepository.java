package com.ResuSync.App.Repository;

import org.springframework.stereotype.Repository;

import com.ResuSync.App.Objects.Users;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


@Repository
public interface UserRepository extends JpaRepository<Users,Long> {

@Query(nativeQuery = true,value="select * from Users where email=:email limit 1")
Users findByEmail(@Param("email") String email);
}

