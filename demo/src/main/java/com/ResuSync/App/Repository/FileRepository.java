package com.ResuSync.App.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ResuSync.App.Objects.Files;



public interface FileRepository extends JpaRepository<Files,Long>{
    @Query(nativeQuery = true,value = "select f.* from Files f join users u on f.uid=u.uid where u.uid=:uid ")
    List<Files> findByUserid(Long uid);

    @Query(nativeQuery = true,value="select f.* from Files f join users u on f.uid=u.uid order by f.fid desc limit 1" )
    Files getRecentFile();

}