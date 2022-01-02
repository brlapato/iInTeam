package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.CalendarEvent;
import org.apache.tomcat.jni.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class CalendarService {
    public List<CalendarEvent> getEventsOverDateRange(long playerId, LocalDateTime start, LocalDateTime end) {
        List<ICalendarEventProvider> providers = new CalendarEventProviderFactory().build();
        List<CalendarEvent> events = new ArrayList<CalendarEvent>();

        providers.forEach(p->events.addAll(p.getEventsOverDateRange(playerId, start, end)));

        events.sort(new Comparator<CalendarEvent>() {
            @Override
            public int compare(CalendarEvent o1, CalendarEvent o2) {
                return o1.getStartDateTime().compareTo(o2.getStartDateTime());
            }
        });

        return events;
    }
}
