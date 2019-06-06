package com.assignment.mentorondemand.repositories;

import com.assignment.mentorondemand.models.MentorOnDemand;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MentorOnDemandRepository extends MongoRepository<MentorOnDemand, String> {

}