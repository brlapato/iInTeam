package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.Player;
import com.hockey43.iInTeam.dataObjects.PlayerStats;
import com.hockey43.iInTeam.persistance.HibernateUtil;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PlayerService implements IPlayerService {

    //private Session session;
    private static Logger LOG = LoggerFactory
            .getLogger(PlayerService.class);

    public PlayerService() {
       // this.session = HibernateUtil.getSessionFactory().openSession();
    }


    //public PlayerService(Session session) {
    //    this.session = session;
    //}

    @Override
    public Player getPlayer(Long playerId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<Player> players = session.createQuery("FROM Player WHERE PlayerId = :pid")
                .setParameter("pid", playerId)
                .list();

        session.getTransaction().commit();
        session.close();
        if (0 < players.size()) {
            return players.get(0);
        } else {
            return null;
        }
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
    public PlayerStats getPlayerStats(Long playerId) {
        LOG.warn("getPlayerStats does not have a real implementation yet.");
        return new PlayerStats();
    }

}
