package com.hockey43.iInTeam.webResources;

import com.hockey43.iInTeam.dataObjects.*;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGameSheet;
import com.hockey43.iInTeam.dataServices.ClinicService;

import com.hockey43.iInTeam.dataServices.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ClinicResource {

    @Autowired
    private ClinicService clinicService;

    @Autowired
    private PlayerService playerService;

    @PreAuthorize("@authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @GetMapping("/players/{playerId}/clinics")
    public List<ClinicSummary> getClinics(
            Principal principal,
            @PathVariable long playerId,
            @RequestParam(name="includeCompleted", required = false, defaultValue = "false") boolean includeCompleted) {
        List<Clinic> clinics = this.clinicService.getClinicsForPlayer(playerId, includeCompleted);

        List<ClinicSummary> clinicSummaries = new ArrayList<ClinicSummary>();
        clinics.forEach((clinic)->clinicSummaries.add(new ClinicSummary(clinic)));
        return clinicSummaries;
    }

    @PreAuthorize("@authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @PostMapping("/players/{playerId}/clinics")
    public ResponseEntity<ClinicSummary> createClinic(
            Principal principal,
            @PathVariable long playerId,
            @RequestBody ClinicSummary clinicSummary
    ) {
        Player player = this.playerService.getPlayer(playerId);

        Clinic clinic = new Clinic();
        clinic.setPlayerOwner(player);
        clinic.mergeSummary(clinicSummary);
        this.clinicService.saveClinic(clinic);
        clinicSummary.setClinicId(clinic.getClinicId());

        return new ResponseEntity<ClinicSummary>(clinicSummary, HttpStatus.OK);
    }

    @PreAuthorize("@authenticator.userCanAccessClinic(#principal.getName(), #teamId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @PutMapping("/players/{playerId}/clinics/{clinicId}")
    public ResponseEntity<ClinicSummary> updateClinic(
            Principal principal,
            @PathVariable long playerId,
            @PathVariable long clinicId,
            @RequestBody ClinicSummary clinicSummary
    ) {
        Player player = this.playerService.getPlayer(playerId);

        Clinic clinic = this.clinicService.getClinicById(clinicId);
        clinic.mergeSummary(clinicSummary);
        this.clinicService.saveClinic(clinic);
        clinicSummary.setClinicId(clinic.getClinicId());

        return new ResponseEntity<ClinicSummary>(clinicSummary, HttpStatus.OK);
    }

    @PreAuthorize("@authenticator.userCanAccessClinic(#principal.getName(), #teamId) && @authenticator.userCanAccessPlayer(#principal.getName(), #playerId)")
    @DeleteMapping("/players/{playerId}/clinics/{clinicId}")
    public ResponseEntity<HockeyGameSheet> deleteClinic(
            Principal principal,
            @PathVariable long playerId,
            @PathVariable long clinicId
    ) {
        this.clinicService.deleteClinicById(clinicId);
        return ResponseEntity.noContent().build();
    }

}
