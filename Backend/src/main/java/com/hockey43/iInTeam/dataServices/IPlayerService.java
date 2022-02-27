package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.Media;
import com.hockey43.iInTeam.dataObjects.MediaEntry;
import com.hockey43.iInTeam.dataObjects.Player;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyPlayerStats;

public interface IPlayerService {

    public Player getPlayer(Long playerId);

    public Player getPlayer(String userId);

    public MediaEntry getProfileImage(Long playerId);

    void saveProfileImage(long playerId, MediaEntry image);

    void removeProfileImage(long playerId);

    public Player savePlayer(Player player);


    public Player createPlayer(Long userId, Player player);

    public HockeyPlayerStats getPlayerStats(Long playerId);



}
