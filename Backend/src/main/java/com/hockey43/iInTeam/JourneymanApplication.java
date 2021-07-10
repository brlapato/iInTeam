package com.hockey43.iInTeam;

import com.hockey43.iInTeam.dataServices.HockeyTeamService;
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
import org.springframework.http.MediaType;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;

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

			boolean initializeDatabase = !dataExist();

			if (initializeDatabase) {

				LOG.info("Begin database initialization...");
				LOG.info("Creating Session");
				Session session = HibernateUtil.getSessionFactory().openSession();
				session.beginTransaction();

				LOG.info("Running initialization...");
				initializeData(session);

				LOG.info("Committing Database population...");
				session.getTransaction().commit();
			}

			LOG.info("Test database connection");
			HockeyTeamService hts = new HockeyTeamService();
			List<HockeyTeam> activeTeams = hts.getHockeyTeams(1, true);
			LOG.info("Found " + String.valueOf(activeTeams.size()) + " active teams for Player 1...");
			for (int teamIdx = 0; teamIdx < activeTeams.size(); teamIdx++) {
				LOG.info(activeTeams.get(teamIdx).getName());
			}


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

		HockeyTeam mites1 = new HockeyTeam();
		mites1.setOrg(orgFred);
		mites1.setPlayerOwner(owner);
		mites1.setAgeClass(AgeClass.U8);
		mites1.setLevel(Level.UA);
		mites1.setName("Frederick Freeze Mites 1");
		mites1.setHeadCoach("Tommy Demers");
		mites1.setAssistantCoach1("Christian Wilson");

		session.save(mites1);
	}

	private void initializeData(Session session) throws IOException {

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
		Media bradleyImage = new Media();
		bradleyImage.setDescription("Bradley profile picture");
		bradleyImage.setFile(this.readFileBase64("images/bradley.jpeg"));
		bradleyImage.setMediaType(MediaType.IMAGE_JPEG_VALUE);
		bradleyPlayer.setPlayerPicture(bradleyImage);

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
		Media wesleyImage = new Media();
		wesleyImage.setDescription("Wesley profile picture");
		wesleyImage.setFile(this.readFileBase64("images/wesley.jpeg"));
		wesleyImage.setMediaType(MediaType.IMAGE_JPEG_VALUE);
		wesleyPlayer.setPlayerPicture(wesleyImage);
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

		Org orgVaVipers = new Org();
		orgVaVipers.setName("Vipers");
		orgVaVipers.setCity("Viginia");
		session.save(orgVaVipers);

		// Create Teams
		HockeyTeam mites1 = new HockeyTeam();
		mites1.setOrg(orgFred);
		mites1.setPlayerOwner(bradleyPlayer);
		mites1.setAgeClass(AgeClass.U8);
		mites1.setLevel(Level.UA);
		mites1.setName("20-21 Frederick Freeze Mites 1");
		mites1.setHeadCoach("Tommy Demers");
		mites1.setAssistantCoach1("Christian Wilson");
		mites1.setPlayerNumber(43);
		mites1.setRegularPosition(Position.Defense);
		mites1.setActive(false);
		session.save(mites1);

		HockeyTeam mites2 = new HockeyTeam();
		mites2.setOrg(orgFred);
		mites2.setPlayerOwner(wesleyPlayer);
		mites2.setAgeClass(AgeClass.U8);
		mites2.setLevel(Level.LA);
		mites2.setName("20-21 Frederick Freeze Mites 2");
		mites2.setHeadCoach("Brian Ball");
		mites2.setAssistantCoach1("Glen MacLachlan");
		mites2.setRegularPosition(Position.Forward);
		mites2.setPlayerNumber(14);
		mites2.setActive(false);
		session.save(mites2);

		HockeyTeam howardSquirts = new HockeyTeam();
		howardSquirts.setOrg(orgHoward);
		howardSquirts.setPlayerOwner(bradleyPlayer);
		howardSquirts.setAgeClass(AgeClass.U10);
		howardSquirts.setLevel(Level.AA);
		howardSquirts.setName("21-22 Howard Squirt Blue AA");
		howardSquirts.setHeadCoach("Brad Powell");
		howardSquirts.setManager("Shayna Walsh");
		howardSquirts.setPlayerNumber(3);
		howardSquirts.setRegularPosition(Position.Defense);
		howardSquirts.setActive(true);
		session.save(howardSquirts);

		/*** VA Vipers ***/
		HockeyTeam vaVipers = new HockeyTeam();
		vaVipers.setOrg(orgVaVipers);
		vaVipers.setPlayerOwner(bradleyPlayer);
		vaVipers.setAgeClass(AgeClass.U10);
		vaVipers.setLevel(Level.AA);
		vaVipers.setName("2021 Virginia Vipers Tournament Team");
		vaVipers.setHeadCoach("Chris Bass");
		vaVipers.setPlayerNumber(10);
		vaVipers.setRegularPosition(Position.Defense);
		vaVipers.setActive(true);
		session.save(vaVipers);

		HockeyGame vaGame1 = new HockeyGame(vaVipers, LocalDateTime.of(2021, 07, 16, 13, 10), "IW JEST 2012", Level.AA, Side.Home);
		vaGame1.setLocation("Ice Works Rink 1");
		vaGame1.setGameType(GameType.Tournament);
		vaGame1.setLeague("2021 Ice Works Summer Fire Tournament");
		session.save(vaGame1);

		HockeyGame vaGame2 = new HockeyGame(vaVipers, LocalDateTime.of(2021, 07, 17, 06, 15), "Gotta Hockey", Level.AA, Side.Home);
		vaGame2.setLocation("Ice Works Rink 4");
		vaGame2.setGameType(GameType.Tournament);
		vaGame2.setLeague("2021 Ice Works Summer Fire Tournament");
		session.save(vaGame2);

		HockeyGame vaGame3 = new HockeyGame(vaVipers, LocalDateTime.of(2021, 07, 17, 13, 45), "Richmond Selects", Level.AA, Side.Home);
		vaGame3.setLocation("PNY Rink");
		vaGame3.setGameType(GameType.Tournament);
		vaGame3.setLeague("2021 Ice Works Summer Fire Tournament");
		session.save(vaGame3);

		HockeyTeam howardMites = new HockeyTeam();
		howardMites.setOrg(orgHoward);
		howardMites.setPlayerOwner(wesleyPlayer);
		howardMites.setAgeClass(AgeClass.U8);
		howardMites.setLevel(Level.LA);
		howardMites.setName("21-22 Howard Mites Blue LA");
		howardMites.setHeadCoach("Brian Walsh");
		howardMites.setManager("Shayna Walsh");
		howardMites.setActive(true);
		session.save(howardMites);

		// Create Games
		HockeyGame game1 = new HockeyGame(mites1, LocalDateTime.of(2020, 02, 01, 13, 00), "Loudon Knights", Level.LA, Side.Home);
		game1.setOpponentScore(3);
		game1.setTeamScore(7);
		game1.setResult(GameResult.Win);
		game1.setOvertime(false);
		game1.setGoals(1);
		game1.setAssists(2);
		game1.setShots(3);
		game1.setLocation("Skate Frederick");
		game1.setGameType(GameType.NonLeague);
		session.save(game1);

		HockeyGame game2 = new HockeyGame(mites1, LocalDateTime.of(2020, 02, 13, 14, 30), "Howard Huskies", Level.UA, Side.Away);
		game2.setOpponentScore(4);
		game2.setTeamScore(5);
		game2.setResult(GameResult.Win);
		game1.setOvertime(true);
		game2.setGoals(0);
		game2.setAssists(1);
		game2.setShots(5);
		game2.setLocation("Laurel Ice Gardens, Patrick Rink");
		game2.setGameType(GameType.League);
		game2.setLeague("CBHL");
		session.save(game2);
	}

	private byte[] readFile(String filePath) throws IOException {
		ClassLoader classloader = Thread.currentThread().getContextClassLoader();
		InputStream is = classloader.getResourceAsStream(filePath);
		return is.readAllBytes();
	}

	private String readFileBase64(String filePath) throws IOException {
		ClassLoader classloader = Thread.currentThread().getContextClassLoader();
		InputStream is = classloader.getResourceAsStream(filePath);
		return Base64.getEncoder().encodeToString(is.readAllBytes());
	}

	private boolean dataExist() {
		Session session = HibernateUtil.getSessionFactory().openSession();
		session.beginTransaction();

		LOG.info("Checking if data initialized...");

		List<Player> players = session.createQuery("from Player")
				.list();

		session.getTransaction().commit();

		if (players.size() > 0) {
			return true;
		} else {
			LOG.info("No data found, need to initialize...");
			return false;
		}
	}


}
