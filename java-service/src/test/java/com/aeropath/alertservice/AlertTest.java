package com.aeropath.alertservice;

import com.aeropath.alertservice.entity.Alert;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AlertTest {

    @Test
    void newAlertIsUnresolvedByDefault() {
        Alert alert = new Alert("user1", "flight1", Alert.AlertType.DELAY, "Flight delayed 45 minutes");
        assertFalse(alert.isResolved());
        assertEquals("user1", alert.getUserId());
    }

    @Test
    void resolveMarksAlertAsResolved() {
        Alert alert = new Alert("user1", "flight1", Alert.AlertType.DELAY, "Flight delayed 45 minutes");
        alert.resolve();
        assertTrue(alert.isResolved());
    }
}
