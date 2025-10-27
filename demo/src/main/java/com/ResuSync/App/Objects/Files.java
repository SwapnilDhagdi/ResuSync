package com.ResuSync.App.Objects;




import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Files")
public class Files{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long Fid;

    private String fileName;
    private String fileType;
    @Lob
    private byte[] fileData;

    private String JDfileName;
    private String JDfileType;
    @Lob
    private byte[] JDfileData;
    @ManyToOne
    @JoinColumn(name = "uid",nullable=false)
    @OnDelete(action=OnDeleteAction.CASCADE)
    private Users user;
    
    public Files() {}

    public Files(String fileName, String fileType, byte[] fileData, Users user ,String JDfileData,String JDfileType,String JDfileName,byte[] JDfiledata) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.fileData = fileData;
        this.JDfileData=JDfiledata;
        this.JDfileName=JDfileName;
        this.JDfileType=JDfileType;
        this.user = user;
    }
     public Long getId() { return Fid; }
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }

    public byte[] getFileData() { return fileData; }
    public void setFileData(byte[] fileData) { this.fileData = fileData; }

    public String getJDFileName(){return JDfileName;}
    public void setJDFileName(String JDfileName){this.JDfileName=JDfileName;}

    public String getJDFileType(){return JDfileType;}
    public void setJDFileType(String JDfileType) {this.JDfileType=JDfileType;}

    public byte[] getJDFileData(){return JDfileData;}
    public void setJDFileData(byte[] JDfileData){this.JDfileData=JDfileData;}

    public Users getUser() { return user; }
    public void setUser(Users user) { this.user = user; }


    public String toString(){
        return String.format(
        """ 
        Resume 
        file name %s 
        file type %s 
        
        JD 
        JDFilename %s
        JDFileType %s
                
                """, fileName,fileType,JDfileName,JDfileType);

        }
}
