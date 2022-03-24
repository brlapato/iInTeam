package com.hockey43.iInTeam.webResources;

import com.hockey43.iInTeam.dataObjects.*;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGameSheet;
import com.hockey43.iInTeam.dataServices.PracticeService;
import com.hockey43.iInTeam.dataServices.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
public class PracticeResource {

    @Autowired
    private PracticeService practiceService;

    @Autowired
    private TeamService teamService;

    @PreAuthorize("@authenticator.userCanAccessTeam(#principal.getName(), #teamId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @GetMapping("/players/{playerId}/teams/{teamId}/practices")
    public List<PracticeSummary> getTeamPractices(Principal principal,
                                                  @PathVariable long playerId,
                                                  @PathVariable long teamId) {
        Team team = this.teamService.getTeamById(teamId);
        if (team != null) {
            List<Practice> practices = this.practiceService.getPracticesForTeam(team);

            List<PracticeSummary> summaries = new ArrayList<PracticeSummary>();
            practices.forEach(p -> summaries.add(new PracticeSummary(p)));

            return summaries;
        } else {
            return null;
        }
    }

    @PreAuthorize("@authenticator.userCanAccessTeam(#principal.getName(), #teamId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @PostMapping("/players/{playerId}/teams/{teamId}/practices")
    public ResponseEntity<PracticeSummary> createPractice(
            Principal principal,
            @PathVariable long playerId,
            @PathVariable long teamId,
            @RequestBody PracticeSummary practiceSummary
    ) {
        Practice practice = this.practiceService.getNewPractice(teamId);
        practice.mergePracticeSummary(practiceSummary);

        this.practiceService.savePractice(practice);
        practiceSummary.setTeamEventId(practice.getEventId());


        return new ResponseEntity<PracticeSummary>(practiceSummary, HttpStatus.OK);
    }

    @PreAuthorize("@authenticator.userCanAccessTeamEvent(#principal.getName(), #practiceId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @PutMapping("/players/{playerId}/teams/{teamId}/practices/{practiceId}")
    public ResponseEntity<PracticeSummary> editPractice(
            Principal principal,
            @PathVariable long playerId,
            @PathVariable long practiceId,
            @RequestBody PracticeSummary practiceSummary
    ) {
        Practice practice = this.practiceService.getPracticeById(practiceId);
        practice.mergePracticeSummary(practiceSummary);

        this.practiceService.savePractice(practice);
        practiceSummary.setTeamEventId(practice.getEventId());


        return new ResponseEntity<PracticeSummary>(practiceSummary, HttpStatus.OK);
    }

    @PreAuthorize("@authenticator.userCanAccessTeamEvent(#principal.getName(), #practiceId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @DeleteMapping("/players/{playerId}/teams/{teamId}/practices/{practiceId}")
    public ResponseEntity<PracticeSummary> deletePractice(
            Principal principal,
            @PathVariable long teamId,
            @PathVariable long practiceId
    ) {
        this.practiceService.deletePracticeById(practiceId);
        return ResponseEntity.noContent().build();
    }
}
