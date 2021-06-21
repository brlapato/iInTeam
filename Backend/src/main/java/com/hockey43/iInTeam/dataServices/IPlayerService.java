package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.Player;
import com.hockey43.iInTeam.dataObjects.PlayerStats;

public interface IPlayerService {

    public Player getPlayer(Long playerId);

    public Player getPlayer(String userId);

    public Player savePlayer(Player player);


    public Player createPlayer(Long userId, Player player);

    public PlayerStats getPlayerStats(Long playerId);



}
