package com.aeropath.alertservice.repository;

import com.aeropath.alertservice.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AlertRepository extends JpaRepository<Alert, UUID> {
    List<Alert> findByUserIdOrderByCreatedAtDesc(String userId);
    List<Alert> findByUserIdAndResolvedFalseOrderByCreatedAtDesc(String userId);
}
