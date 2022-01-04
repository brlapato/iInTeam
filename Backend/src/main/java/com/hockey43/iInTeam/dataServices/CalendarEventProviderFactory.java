package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataServices.hockey.HockeyGameService;

import java.util.ArrayList;
import java.util.List;

public class CalendarEventProviderFactory {
    public List<ICalendarEventProvider> build() {
        List<ICalendarEventProvider> providers = new ArrayList<>();
        providers.add(new HockeyGameService());
        providers.add(new ClinicService());
        providers.add(new PracticeService());

        return providers;
    }
}
