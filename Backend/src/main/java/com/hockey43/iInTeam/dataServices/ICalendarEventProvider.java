package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.CalendarEvent;

import java.time.LocalDateTime;
import java.util.List;

public interface ICalendarEventProvider {
    public List<CalendarEvent> getEventsOverDateRange(long playerId, LocalDateTime start, LocalDateTime end);
}
