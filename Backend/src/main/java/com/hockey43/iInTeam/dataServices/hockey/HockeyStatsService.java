package com.hockey43.iInTeam.dataServices.hockey;

import com.hockey43.iInTeam.dataObjects.GameType;
import com.hockey43.iInTeam.dataObjects.Record;
import com.hockey43.iInTeam.dataObjects.RecordEntry;
import com.hockey43.iInTeam.dataObjects.TeamEvent;
import com.hockey43.iInTeam.dataObjects.hockey.*;
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

        Comparator<HockeyGame> comparator = this.getComparator(statSet);

        if (comparator != null) {
            games.sort(comparator);
        }


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

    public List<RecordEntry> aggregateRecordFromEvents(List<TeamEvent> events, String statSet) {
        List<HockeyGame> hockeyGames = new ArrayList<HockeyGame>();
        events.forEach((event)->{
            if(event instanceof HockeyGame) {
                hockeyGames.add((HockeyGame) event);
            }
        });

        return aggregateWinRecord(hockeyGames, statSet);
    }

    public List<RecordEntry> aggregateWinRecord(List<HockeyGame> games, String statSet) {
        Comparator<HockeyGame> comparator = this.getComparator(statSet);

        if (comparator != null) {
            games.sort(comparator);
        }


        Map<String, HockeyRecord> recordMap = new LinkedHashMap<String, HockeyRecord>();

        for (int gameIdx = 0; gameIdx < games.size(); gameIdx++) {
            HockeyGame cGame = games.get(gameIdx);

            if(cGame.isComplete()) {
                String[] gameKeys = this.getKey(cGame, statSet);
                if( gameKeys != null ) {
                    for (int keyIndex = 0; keyIndex < gameKeys.length; keyIndex++) {
                        String gameKey = gameKeys[keyIndex];
                        HockeyRecord groupRecord = recordMap.getOrDefault(gameKey, null);
                        if (groupRecord == null) {
                            groupRecord = new HockeyRecord();
                            recordMap.put(gameKey, groupRecord);
                        }
                        updateGameRecord(cGame, groupRecord);
                    }
                }
            }
        }
        List<RecordEntry> results = new ArrayList<RecordEntry>();
        for (Map.Entry<String, HockeyRecord> entry : recordMap.entrySet()) {
            RecordEntry newEntry = new RecordEntry();
            newEntry.setDescription(entry.getKey());
            newEntry.setWinRecord(entry.getValue());
            results.add(newEntry);
        }

        return results;
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

    private Comparator<HockeyGame> getComparator(String statSet) {
        Comparator<HockeyGame> comparator = null;
        switch (statSet.toLowerCase(Locale.ROOT)) {
            case "byleague":
                comparator = new Comparator<HockeyGame>() {
                    @Override
                    public int compare(HockeyGame o1, HockeyGame o2) {
                        if(o1.getGameType() == GameType.NonLeague) {
                            return 1;
                        } else if (o2.getGameType() == GameType.NonLeague){
                            return -1;
                        } else if (o1.getGameType() == GameType.Tournament) {
                           return 1;
                        } else if (o1.getGameType() == GameType.Tournament) {
                            return -1;
                        }
                        return o1.getLeague().compareTo(o2.getLeague());
                    }
                };
                break;
            case "byteam":
                comparator = new Comparator<HockeyGame>() {
                    @Override
                    public int compare(HockeyGame o1, HockeyGame o2) {
                        return o1.getOwnerTeam().getOrg().getCity().compareTo(o2.getOwnerTeam().getOrg().getCity());
                    }
                };
                break;
            case "byopponent":
                comparator = new Comparator<HockeyGame>() {
                    @Override
                    public int compare(HockeyGame o1, HockeyGame o2) {
                        return o1.getOpponentTeamName().compareTo(o2.getOpponentTeamName());
                    }
                };
                break;
        }

        return comparator;
    }

    private void updatePlayerStats(HockeyGame game, HockeyPlayerStats stats) {
        stats.setGamesPlayed(stats.getGamesPlayed() + 1);
        stats.setGoals(stats.getGoals() + game.getGoals());
        stats.setAssists(stats.getAssists() + game.getAssists());
        stats.setPoints(stats.getPoints() + game.getAssists() + game.getGoals());
        stats.setShots(stats.getShots() + game.getShots());
        stats.setPenaltyMin(stats.getPenaltyMin() + game.getPenaltyMin());
    }

    private void updateGameRecord(HockeyGame cGame, HockeyRecord record) {
        if (cGame.getResult() != null) {
            switch (cGame.getResult()) {
                case Win:
                    record.setWins(record.getWins() + 1);
                    break;
                case Loss:
                    record.setLosses(record.getLosses() + 1);
                    break;
                case Tie:
                    record.setTies(record.getTies() + 1);
                    break;
                case OvertimeLoss:
                    record.setOverTimeLosses(record.getOverTimeLosses() + 1);
                    break;
            }

            record.setGoalsFor(record.getGoalsFor() + cGame.getTeamScore());
            record.setGoalsAgainst(record.getGoalsAgainst() + cGame.getOpponentScore());
            record.setGoalDifferential(record.getGoalsFor() - record.getGoalsAgainst());
        }
    }


}
