package com.aeropath.alertservice.controller;

import com.aeropath.alertservice.dto.AlertDtos.AlertResponse;
import com.aeropath.alertservice.dto.AlertDtos.CreateAlertRequest;
import com.aeropath.alertservice.service.AlertService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin // tighten to the Node backend's origin before deploying
public class AlertController {

    private final AlertService service;

    public AlertController(AlertService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<AlertResponse> createAlert(@Valid @RequestBody CreateAlertRequest request) {
        AlertResponse response = service.createAlert(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<AlertResponse>> getAlerts(
        @PathVariable String userId,
        @RequestParam(defaultValue = "false") boolean unresolvedOnly
    ) {
        return ResponseEntity.ok(service.getAlertsForUser(userId, unresolvedOnly));
    }

    @PatchMapping("/{id}/resolve")
    public ResponseEntity<AlertResponse> resolveAlert(@PathVariable UUID id) {
        return ResponseEntity.ok(service.resolveAlert(id));
    }
}
