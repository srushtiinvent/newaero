package com.aeropath.alertservice.dto;

import com.aeropath.alertservice.entity.Alert;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.UUID;

public class AlertDtos {

    public record CreateAlertRequest(
        @NotBlank String userId,
        @NotBlank String flightId,
        @NotNull Alert.AlertType type,
        @NotBlank String message
    ) {}

    public record AlertResponse(
        UUID id,
        String userId,
        String flightId,
        Alert.AlertType type,
        String message,
        boolean resolved,
        Instant createdAt
    ) {
        public static AlertResponse from(Alert a) {
            return new AlertResponse(
                a.getId(), a.getUserId(), a.getFlightId(),
                a.getType(), a.getMessage(), a.isResolved(), a.getCreatedAt()
            );
        }
    }
}
