package com.hockey43.iInTeam;

import com.hockey43.iInTeam.dataServices.PlayerService;
import com.hockey43.iInTeam.dataObjects.*;
import com.hockey43.iInTeam.persistance.HibernateUtil;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.Banner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
public class JourneymanApplication {

	private static Logger LOG = LoggerFactory
			.getLogger(JourneymanApplication.class);

	public static void main(String[] args) {
		new SpringApplicationBuilder(JourneymanApplication.class)
				.bannerMode(Banner.Mode.OFF)
				.run(args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		return args -> {
			LOG.info("EXECUTING : Hibernate Test");

			LOG.info("EXECUTING : Create Session");
			Session session = HibernateUtil.getSessionFactory().openSession();
			session.beginTransaction();

			//initializeData(session);

			LOG.info("EXECUTING : Commit");
			session.getTransaction().commit();

			session.beginTransaction();
			PlayerService pa = new PlayerService();
			Player cPlayer = pa.getPlayer(1L);
			System.out.println(String.format("%s, %s",cPlayer.getLastName(), cPlayer.getFirstName()));
			session.getTransaction().commit();
			//HibernateUtil.shutdown();
		};
	}



	private Player playerTest(Session session) {

		LOG.info("EXECUTING : New Player");
		Player newPlayer = new Player();
		newPlayer.setFirstName("Bradley");
		newPlayer.setLastName("Lapato");

		LOG.info("EXECUTING : Save Player");
		session.save(newPlayer);

		return newPlayer;
	}

	private void orgTest(Session session) {
		LOG.info("EXECUTING : Create Orgs");
		Org orgFred = new Org();
		orgFred.setName("Freeze");
		orgFred.setCity("Frederick");

		Org orgHoward = new Org();
		orgHoward.setName("Huskies");
		orgHoward.setCity("Howard");

		LOG.info("EXECUTING : Save Orgs");
		session.save(orgFred);
		session.save(orgHoward);
	}

	private void teamTest(Session session, Player owner) {
		Org orgFred = new Org();
		orgFred.setName("Freeze");
		orgFred.setCity("Frederick");

		Team mites1 = new Team();
		mites1.setOrg(orgFred);
		mites1.setPlayerOwner(owner);
		mites1.setAgeClass(AgeClass.U8);
		mites1.setLevel(Level.UA);
		mites1.setName("Frederick Freeze Mites 1");
		mites1.setHeadCoach("Tommy Demers");
		mites1.setAssistantCoach1("Christian Wilson");

		session.save(mites1);
	}

	private void initializeData(Session session){

		// Create Players
		Player bradleyPlayer = new Player();
		bradleyPlayer.setFirstName("Bradley");
		bradleyPlayer.setLastName("Lapato");
		bradleyPlayer.setUserId("auth0|60c66cf78bc73d00700554f3");
		bradleyPlayer.setHeightFeet(4);
		bradleyPlayer.setHeightInches(5);
		bradleyPlayer.setWeight(74);
		bradleyPlayer.setIncludeHockey(true);
		bradleyPlayer.getHockeyAttributes().setPosition(Position.Defense);
		bradleyPlayer.getHockeyAttributes().setShot(Shot.Left);
		session.save(bradleyPlayer);

		Player wesleyPlayer = new Player();
		wesleyPlayer.setFirstName("Wesley");
		wesleyPlayer.setLastName("Lapato");
		wesleyPlayer.setUserId("auth0|60c651d2d02f6500695be415");
		wesleyPlayer.setNickName("Panther");
		wesleyPlayer.setHeightFeet(4);
		wesleyPlayer.setHeightInches(0);
		wesleyPlayer.setIncludeHockey(true);
		wesleyPlayer.getHockeyAttributes().setPosition(Position.Forward);
		wesleyPlayer.getHockeyAttributes().setShot(Shot.Right);
		session.save(wesleyPlayer);

		// Create Orgs
		Org orgFred = new Org();
		orgFred.setName("Freeze");
		orgFred.setCity("Frederick");
		session.save(orgFred);

		Org orgHoward = new Org();
		orgHoward.setName("Huskies");
		orgHoward.setCity("Howard");
		session.save(orgHoward);

		// Create Teams
		Team mites1 = new Team();
		mites1.setOrg(orgFred);
		mites1.setPlayerOwner(bradleyPlayer);
		mites1.setAgeClass(AgeClass.U8);
		mites1.setLevel(Level.UA);
		mites1.setName("Frederick Freeze Mites 1");
		mites1.setHeadCoach("Tommy Demers");
		mites1.setAssistantCoach1("Christian Wilson");
		session.save(mites1);

		Team mites2 = new Team();
		mites2.setOrg(orgFred);
		mites2.setPlayerOwner(wesleyPlayer);
		mites2.setAgeClass(AgeClass.U8);
		mites2.setLevel(Level.LA);
		mites2.setName("Frederick Freeze Mites 2");
		mites2.setHeadCoach("Brian Ball");
		mites2.setAssistantCoach1("Glen MacLachlan");
		session.save(mites2);

		Team howardSquirts = new Team();
		howardSquirts.setOrg(orgHoward);
		howardSquirts.setPlayerOwner(bradleyPlayer);
		howardSquirts.setAgeClass(AgeClass.U10);
		howardSquirts.setLevel(Level.AA);
		howardSquirts.setName("Howard Squirt Blue AA");
		howardSquirts.setHeadCoach("Brad Powell");
		session.save(howardSquirts);

		Team howardMites = new Team();
		howardMites.setOrg(orgHoward);
		howardMites.setPlayerOwner(bradleyPlayer);
		howardMites.setAgeClass(AgeClass.U8);
		howardMites.setLevel(Level.UA);
		howardMites.setName("Howard Squirt Blue AA");
		howardMites.setHeadCoach("Brian Walsh");
		howardMites.setManager("Shayna Walsh");
		session.save(howardMites);

		// Create Games
		Game game1 = new Game(mites1, LocalDateTime.of(2020, 02, 01, 13, 00), "Loudon Knights", Level.LA, Side.Home);
		game1.setOpponentScore(3);
		game1.setTeamScore(7);
		game1.setGoals(1);
		game1.setAssists(2);
		game1.setShots(3);
		game1.setRink("Skate Frederick");
		game1.setGameType(GameType.NonLeague);
		session.save(game1);

		Game game2 = new Game(mites1, LocalDateTime.of(2020, 02, 13, 14, 30), "Howard Huskies", Level.UA, Side.Away);
		game2.setOpponentScore(4);
		game2.setTeamScore(5);
		game2.setGoals(0);
		game2.setAssists(1);
		game2.setShots(5);
		game2.setRink("Laurel Ice Gardens, Patrick Rink");
		game2.setGameType(GameType.League);
		game2.setLeague("CBHL");
		session.save(game2);
	}


}
