package com.hockey43.iInTeam.dataServices.hockey;

import com.hockey43.iInTeam.dataObjects.GameType;
import com.hockey43.iInTeam.dataObjects.Record;
import com.hockey43.iInTeam.dataObjects.RecordEntry;
import com.hockey43.iInTeam.dataObjects.TeamEvent;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyGame;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyPlayerStats;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyPlayerStatsEntry;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyTeam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class HockeyStatsService {

    @Autowired
    private HockeyGameService hockeyGameService;

    public List<HockeyPlayerStatsEntry> aggregateStatsFromEvents(List<TeamEvent> events, String statSet) {
        List<HockeyGame> hockeyGames = new ArrayList<HockeyGame>();
        events.forEach((event)->{
            if(event instanceof HockeyGame) {
                hockeyGames.add((HockeyGame) event);
            }
        });

        return aggregateStats(hockeyGames, statSet);
    }

    public List<HockeyPlayerStatsEntry> aggregateStats(List<HockeyGame> games, String statSet) {

        Map<String, HockeyPlayerStats> statsMap = new LinkedHashMap<String, HockeyPlayerStats>();

        for (int gameIdx = 0; gameIdx < games.size(); gameIdx++) {
            HockeyGame cGame = games.get(gameIdx);

            if(cGame.isComplete()) {
                String[] gameKeys = this.getKey(cGame, statSet);
                if( gameKeys != null ) {
                    for (int keyIndex = 0; keyIndex < gameKeys.length; keyIndex++) {
                        String gameKey = gameKeys[keyIndex];
                        HockeyPlayerStats groupStats = statsMap.getOrDefault(gameKey, null);
                        if (groupStats == null) {
                            groupStats = new HockeyPlayerStats();
                            statsMap.put(gameKey, groupStats);
                        }
                        updatePlayerStats(cGame, groupStats);
                    }
                }
            }
        }
        List<HockeyPlayerStatsEntry> results = new ArrayList<HockeyPlayerStatsEntry>();
        for (Map.Entry<String, HockeyPlayerStats> entry : statsMap.entrySet()) {
            HockeyPlayerStatsEntry newEntry = new HockeyPlayerStatsEntry();
            newEntry.setDescription(entry.getKey());
            newEntry.setHockeyPlayerStats(entry.getValue());
            results.add(newEntry);
        }

        return results;
    }

    public List<RecordEntry> getPlayerWinRecords(long playerId, String statSet) {
        return null;
    }


    private String[] getKey(HockeyGame game, String statSet) {
        String[] key = null;
        switch (statSet.toLowerCase(Locale.ROOT)) {
            case "overall":
                key = new String[]{"Overall"};
                break;
            case "byteam":
                key =  new String[]{game.getOwnerTeam().getOrg().getCity() + " " + game.getOwnerTeam().getOrg().getName()};
                break;
            case "byopponent":
                key =  new String[]{game.getOpponentTeamName()};
                break;
            case "byseason":
                key =  new String[]{game.getOwnerTeam().getSeason()};
                break;
            case "byopponentlevel":
                key =  new String[]{game.getOpponentLevel()};
                break;
            case "byleague":
                if (game.getGameType()== GameType.League) {
                    key = game.getSeperateLeages();
                } else if (game.getGameType() == GameType.Tournament) {
                    key =  new String[]{game.getGameType().toString()};
                } else {
                    key =  new String[]{"Non League"};
                }
                break;
            case "byleaguedetail":
                key =  game.getSeperateLeages();
                break;
            case "bygametype":
                key =  new String[]{game.getGameType().toString()};
                break;
            case "byrink":
                key =  new String[]{game.getLocation()};
                break;
            case "byageclass":
                if (game.getOwnerTeam() instanceof HockeyTeam) {
                    key =  new String[]{((HockeyTeam)game.getOwnerTeam()).getAgeClass().toString()};
                } else {
                    key = new String[]{"Other"};
                }

                break;

        }

        return key;
    }

    private void updatePlayerStats(HockeyGame game, HockeyPlayerStats stats) {
        stats.setGamesPlayed(stats.getGamesPlayed() + 1);
        stats.setGoals(stats.getGoals() + game.getGoals());
        stats.setAssists(stats.getAssists() + game.getAssists());
        stats.setPoints(stats.getPoints() + game.getAssists() + game.getGoals());
        stats.setShots(stats.getShots() + game.getShots());
        stats.setPenaltyMin(stats.getPenaltyMin() + game.getPenaltyMin());

    }


}
