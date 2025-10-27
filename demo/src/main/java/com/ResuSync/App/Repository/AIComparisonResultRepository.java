package com.ResuSync.App.Repository;

import com.ResuSync.App.Objects.AIComparisonResults;
import com.ResuSync.App.Objects.Users;
import com.ResuSync.App.Services.AIComparison.AIComparisonResult;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AIComparisonResultRepository extends JpaRepository<AIComparisonResults, Long> {

    List<AIComparisonResults> findByUser(Users user);

    @Query(nativeQuery = true,value = "select * from aicomparisonresults where fid=:fid")
    AIComparisonResults findByFid(Long fid);
    
}