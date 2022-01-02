package com.hockey43.iInTeam.webResources;


import com.hockey43.iInTeam.dataObjects.CalendarEvent;
import com.hockey43.iInTeam.dataObjects.Clinic;
import com.hockey43.iInTeam.dataObjects.ClinicSummary;
import com.hockey43.iInTeam.dataServices.CalendarService;
import com.hockey43.iInTeam.dataServices.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
public class CalendarResource {

    @Autowired
    private CalendarService calendarService;

    @GetMapping("/players/{playerId}/calendar")
    public List<CalendarEvent> getEventsForDateRange(@PathVariable long playerId,
                                   @RequestParam(name="start", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
                                   @RequestParam(name="end", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end ) {

        return this.calendarService.getEventsOverDateRange(playerId, start, end);
    }
}
