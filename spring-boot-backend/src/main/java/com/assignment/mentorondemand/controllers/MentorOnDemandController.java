package com.assignment.mentorondemand.controllers;

import javax.validation.Valid;
import com.assignment.mentorondemand.models.MentorOnDemand;
import com.assignment.mentorondemand.repositories.MentorOnDemandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class MentorOnDemandController {

    @Autowired
    MentorOnDemandRepository mentorondemandRepository;

    @GetMapping("/mentors")
    public List<MentorOnDemand> getAllMentorOnDemand() {
        Sort sortByCreatedAtDesc = new Sort(Sort.Direction.DESC, "createdAt");
        return mentorondemandRepository.findAll(sortByCreatedAtDesc);
    }

    @PostMapping("/mentors")
    public MentorOnDemand createMentorOnDemand(@Valid @RequestBody MentorOnDemand mentorondemand) {
    	mentorondemand.setCompleted(false);
        return mentorondemandRepository.save(mentorondemand);
    }

    @GetMapping(value="/mentors/{id}")
    public ResponseEntity<MentorOnDemand> getMentorOnDemandById(@PathVariable("id") String id) {
        return mentorondemandRepository.findById(id)
                .map(mentorondemand -> ResponseEntity.ok().body(mentorondemand))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping(value="/mentors/{id}")
    public ResponseEntity<MentorOnDemand> updateMentorOnDemand(@PathVariable("id") String id,
                                           @Valid @RequestBody MentorOnDemand mentorondemand) {
        return mentorondemandRepository.findById(id)
                .map(mentorondemandData -> {
                	mentorondemandData.setTitle(mentorondemand.getTitle());
                	mentorondemandData.setCompleted(mentorondemand.getCompleted());
                	MentorOnDemand updatedMentorOnDemand = mentorondemandRepository.save(mentorondemandData);
                    return ResponseEntity.ok().body(updatedMentorOnDemand);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(value="/mentors/{id}")
    public ResponseEntity<?> deleteMentorOnDemand(@PathVariable("id") String id) {
        return mentorondemandRepository.findById(id)
                .map(mentorondemand -> {
                	mentorondemandRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}