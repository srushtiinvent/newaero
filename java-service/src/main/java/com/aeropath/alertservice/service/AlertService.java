package com.aeropath.alertservice.service;

import com.aeropath.alertservice.dto.AlertDtos.AlertResponse;
import com.aeropath.alertservice.dto.AlertDtos.CreateAlertRequest;
import com.aeropath.alertservice.entity.Alert;
import com.aeropath.alertservice.repository.AlertRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AlertService {

    private final AlertRepository repository;

    public AlertService(AlertRepository repository) {
        this.repository = repository;
    }

    public AlertResponse createAlert(CreateAlertRequest request) {
        Alert alert = new Alert(request.userId(), request.flightId(), request.type(), request.message());
        return AlertResponse.from(repository.save(alert));
    }

    public List<AlertResponse> getAlertsForUser(String userId, boolean unresolvedOnly) {
        List<Alert> alerts = unresolvedOnly
            ? repository.findByUserIdAndResolvedFalseOrderByCreatedAtDesc(userId)
            : repository.findByUserIdOrderByCreatedAtDesc(userId);

        return alerts.stream().map(AlertResponse::from).collect(Collectors.toList());
    }

    public AlertResponse resolveAlert(UUID id) {
        Alert alert = repository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Alert not found: " + id));
        alert.resolve();
        return AlertResponse.from(repository.save(alert));
    }
}
