package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.Media;
import com.hockey43.iInTeam.dataObjects.Player;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyPlayerStats;
import com.hockey43.iInTeam.persistance.HibernateUtil;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService implements IPlayerService {

    //private Session session;
    private static Logger LOG = LoggerFactory
            .getLogger(PlayerService.class);

    public PlayerService() {
       // this.session = HibernateUtil.getSessionFactory().openSession();
    }


    @Override
    public Player getPlayer(String userId) {
        return getPlayerWithQuery("FROM Player WHERE UserId = :pid", userId, false);
    }

    @Override
    public Player getPlayer(Long playerId) {
        return getPlayerWithQuery("FROM Player WHERE PlayerId = :pid", playerId.toString(), false);
    }

    @Override
    public Media getProfileImage(Long playerId) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<Player> players = session.createQuery("FROM Player WHERE PlayerId = :pid")
                .setParameter("pid", playerId.toString())
                .list();

        Media playerImage;
        if (0 < players.size()) {
            Media playerImageTemp = players.get(0).getPlayerPicture();
            playerImage = new Media();
            playerImage.setDescription(playerImageTemp.getDescription());
            playerImage.setMediaType(playerImageTemp.getMediaType());
            playerImage.setFile(playerImageTemp.getFile());
            playerImage.setMediaId(playerImageTemp.getMediaId());
        } else {
            playerImage = null;
        }
        session.getTransaction().commit();
        session.close();

        return playerImage;
    }

    @Override
    public Player savePlayer(Player player) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        session.save(player);
        session.getTransaction().commit();
        LOG.debug(String.format("Player %s saved", player.getPlayerId()));
        session.close();

        return player;

    }

    @Override
    public Player createPlayer(Long userId, Player player) {
        return null;
    }

    @Override
    public HockeyPlayerStats getPlayerStats(Long playerId) {
        LOG.warn("getPlayerStats does not have a real implementation yet.");
        return new HockeyPlayerStats();
    }


    private Player getPlayerWithQuery(String query, String lookupValue, Boolean loadPlayerImage) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<Player> players = session.createQuery(query)
                .setParameter("pid", lookupValue)
                .list();

        Player player;
        if (0 < players.size()) {
            player = players.get(0);
            if (loadPlayerImage) {
                //force loading the player picture
                player.getPlayerPicture().getMediaType();
            }
        } else {
            player = null;
        }
        session.getTransaction().commit();
        session.close();

        return player;
    }


}
