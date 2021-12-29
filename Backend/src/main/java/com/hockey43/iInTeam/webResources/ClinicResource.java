package com.hockey43.iInTeam.webResources;

import com.hockey43.iInTeam.dataObjects.Clinic;
import com.hockey43.iInTeam.dataObjects.ClinicSummary;
import com.hockey43.iInTeam.dataObjects.PersonalGoal;
import com.hockey43.iInTeam.dataObjects.TeamSummary;
import com.hockey43.iInTeam.dataServices.ClinicService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ClinicResource {

    @Autowired
    private ClinicService clinicService;

    @GetMapping("/players/{playerId}/clinics")
    public List<ClinicSummary> getClinics(@PathVariable long playerId,
                                              @RequestParam(name="includeCompleted", required = false, defaultValue = "false") boolean includeCompleted) {
        List<Clinic> clinics = this.clinicService.getClinicsForPlayer(playerId, includeCompleted);

        List<ClinicSummary> clinicSummaries = new ArrayList<ClinicSummary>();
        clinics.forEach((clinic)->clinicSummaries.add(new ClinicSummary(clinic)));
        return clinicSummaries;
    }

}
