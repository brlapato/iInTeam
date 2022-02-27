package com.hockey43.iInTeam.dataServices;

import com.hockey43.iInTeam.dataObjects.Media;
import com.hockey43.iInTeam.dataObjects.MediaEntry;
import com.hockey43.iInTeam.dataObjects.Player;
import com.hockey43.iInTeam.dataObjects.TeamEvent;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyPlayerStats;
import com.hockey43.iInTeam.persistance.HibernateUtil;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
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
    public MediaEntry getProfileImage(Long playerId) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        List<Player> players = session.createQuery("FROM Player WHERE PlayerId = :pid")
                .setParameter("pid", playerId.toString())
                .list();

        MediaEntry playerImage;
        if (0 < players.size()) {
            Media playerImageTemp = players.get(0).getPlayerPicture();
            if (playerImageTemp == null) {
                try {
                    playerImage = new MediaEntry();
                    playerImage.setDescription("Default Profile Image");
                    playerImage.setFile(this.readFileBase64("images/emptyProfile.png"));
                    playerImage.setMediaType(MediaType.IMAGE_PNG_VALUE);
                } catch (IOException ex) {
                    // If can't load the file, just return null
                    playerImage = null;
                }
            } else {
                playerImage = new MediaEntry(playerImageTemp);
            }

        } else {
            playerImage = null;
        }
        session.getTransaction().commit();
        session.close();

        return playerImage;
    }

    @Override
    public void saveProfileImage(long playerId, MediaEntry image) {
        Player player = this.getPlayer(playerId);
        Media imageMedia = new Media();
        imageMedia.mergeMediaEntry(image);
        imageMedia.setOwner(player);

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        session.save(imageMedia);
        player.setPlayerPicture(imageMedia);
        session.saveOrUpdate(player);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void removeProfileImage(long playerId) {
        Player player = this.getPlayer(playerId);


        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        player.setPlayerPicture(null);
        session.saveOrUpdate(player);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public Player savePlayer(Player player) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        session.saveOrUpdate(player);
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

    public List<TeamEvent> getRecentGames(long playerId, int numberOfEvents) {
        return null;
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

    private String readFileBase64(String filePath) throws IOException {
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        InputStream is = classloader.getResourceAsStream(filePath);
        return Base64.getEncoder().encodeToString(is.readAllBytes());
    }



}
