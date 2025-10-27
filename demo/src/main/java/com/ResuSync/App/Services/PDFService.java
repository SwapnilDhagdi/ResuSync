package com.ResuSync.App.Services;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ResuSync.App.Objects.Files;
import com.ResuSync.App.Repository.FileRepository;

import jakarta.transaction.Transactional;



@Service
public class PDFService {
    @Autowired
    FileRepository fileRepository;
    public String getFileData(){
        List<Files> file=fileRepository.findAll();
        String text="";
            try{
                PDDocument document=Loader.loadPDF(file.get(0).getFileData());
                PDFTextStripper stripper=new PDFTextStripper();
                text=stripper.getText(document);
            }catch(IOException e){
                System.out.println(e);
            }
        return text;
    }
    @Transactional
    public List<String> getRecentFile(){
        Files file=fileRepository.getRecentFile();
        List<String> li=new ArrayList<>();
        try{

            PDDocument resume=Loader.loadPDF(file.getFileData());
            PDDocument jd=Loader.loadPDF(file.getJDFileData());
            PDFTextStripper stripper =new PDFTextStripper();
            String resumeData=stripper.getText(resume);
            String jdData=stripper.getText(jd);
            li.add(resumeData);
            li.add(jdData);
        }catch(Exception e){
            System.out.println("Got error while TextStripping"+e.getMessage());
        }
        return li;
    }
}
