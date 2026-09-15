package com.aeropath.alertservice.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "alerts")
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "flight_id", nullable = false)
    private String flightId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AlertType type;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private boolean resolved = false;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();

    public enum AlertType {
        DELAY, CANCELLATION, GATE_CHANGE, AT_RISK_CONNECTION
    }

    protected Alert() {
        // required by JPA
    }

    public Alert(String userId, String flightId, AlertType type, String message) {
        this.userId = userId;
        this.flightId = flightId;
        this.type = type;
        this.message = message;
    }

    public UUID getId() { return id; }
    public String getUserId() { return userId; }
    public String getFlightId() { return flightId; }
    public AlertType getType() { return type; }
    public String getMessage() { return message; }
    public boolean isResolved() { return resolved; }
    public Instant getCreatedAt() { return createdAt; }

    public void resolve() { this.resolved = true; }
}
