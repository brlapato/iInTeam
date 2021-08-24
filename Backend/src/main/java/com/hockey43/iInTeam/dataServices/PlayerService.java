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
        return getPlayerWithQuery("FROM Player WHERE UserId = :pid", userId);
    }

    @Override
    public Player getPlayer(Long playerId) {
        return getPlayerWithQuery("FROM Player WHERE PlayerId = :pid", playerId.toString());
    }

    @Override
    public Media getProfileImage(Long playerId) {
        Player player = getPlayerWithQuery("FROM Player WHERE PlayerId = :pid", playerId.toString());
        return player.getPlayerPicture();
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


    private Player getPlayerWithQuery(String query, String lookupValue) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<Player> players = session.createQuery(query)
                .setParameter("pid", lookupValue)
                .list();

        session.getTransaction().commit();
        session.close();
        if (0 < players.size()) {
            return players.get(0);
        } else {
            return null;
        }
    }


}
