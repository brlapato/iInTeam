package com.hockey43.iInTeam.webResources;

import com.hockey43.iInTeam.dataObjects.Media;
import com.hockey43.iInTeam.dataObjects.RecordEntry;
import com.hockey43.iInTeam.dataObjects.TeamEvent;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyPlayerStatsEntry;
import com.hockey43.iInTeam.dataServices.IPlayerService;
import com.hockey43.iInTeam.dataServices.hockey.HockeyGameService;
import com.hockey43.iInTeam.dataServices.hockey.HockeyStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class StatResource {

    @Autowired
    private IPlayerService playerService;

    @Autowired
    private HockeyGameService hockeyGameService;

    @Autowired
    private HockeyStatsService hockeyStatService;


    @GetMapping(value = "/players/{playerId}/hockeyStats")
    public List<HockeyPlayerStatsEntry> getPlayerStatsHockey(@PathVariable long playerId, @RequestParam(required = true) String statSet) {
        List<TeamEvent> events = this.hockeyGameService.getGamesForPlayer(playerId, false);

        return this.hockeyStatService.aggregateStatsFromEvents(events, statSet);
    }

    @GetMapping(value = "/players/{playerId}/winRecord")
    public List<RecordEntry> getPlayerRecordHockey(@PathVariable long playerId, @RequestParam(required = true) String statSet) {
        List<TeamEvent> events = this.hockeyGameService.getGamesForPlayer(playerId, false);

        return this.hockeyStatService.aggregateRecordFromEvents(events, statSet);
    }
}
