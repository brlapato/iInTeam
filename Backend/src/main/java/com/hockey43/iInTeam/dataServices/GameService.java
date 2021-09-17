package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.Team;
import com.hockey43.iInTeam.dataObjects.TeamEvent;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public abstract class GameService {


    public abstract List<TeamEvent> getGamesForPlayer(long playerId, boolean activeTeams);

    public abstract List<TeamEvent> getGamesForTeam(long teamId);

    public abstract List<TeamEvent> getUpcomingGames(long playerId, int gameCount);

    public abstract List<TeamEvent> getRecentGames(long playerId, int gameCount);


}
