package com.hockey43.iInTeam;

import com.hockey43.iInTeam.dataObjects.hockey.HockeyGame;
import com.hockey43.iInTeam.dataObjects.hockey.HockeyTeam;
import com.hockey43.iInTeam.dataServices.hockey.HockeyGameService;
import com.hockey43.iInTeam.dataServices.hockey.HockeyTeamService;
import com.hockey43.iInTeam.dataObjects.*;
import com.hockey43.iInTeam.dataServices.TeamService;
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

				LOG.info("Generating Test Data");
				//initializeRandomData();
				LOG.info("Test Data Done");


			}

			LOG.info("Test database connection");
			HockeyTeamService hts = new HockeyTeamService();
			List<HockeyTeam> activeTeams = hts.getHockeyTeams(1, true);
			LOG.info("Found " + String.valueOf(activeTeams.size()) + " active teams for Player 1...");
			for (int teamIdx = 0; teamIdx < activeTeams.size(); teamIdx++) {
				LOG.info(activeTeams.get(teamIdx).getName());
			}

			TeamService ts = new TeamService();
			List<Team> teams = ts.getTeamForPlayer(1);
			LOG.info("Found " + String.valueOf(teams.size()) + " total teams for Player 1...");
			for (int teamIdx = 0; teamIdx < teams.size(); teamIdx++) {
				LOG.info(teams.get(teamIdx).toString());
			}

			HockeyGameService hockeyGameService = new HockeyGameService();
			List<TeamEvent> games =  hockeyGameService.getRecentGames(1, 5);
			LOG.info("Found " + String.valueOf(games.size()) + " recent games for Player 1...");
			LOG.info("Last game location: " + games.get(0).getLocation());

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
		bradleyPlayer.getHockeyAttributes().setPosition("Forward");
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
		wesleyPlayer.getHockeyAttributes().setPosition("Forward");
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
		orgVaVipers.setCity("Virginia");
		session.save(orgVaVipers);

		// Create Teams


		HockeyTeam howardSquirts = new HockeyTeam();
		howardSquirts.setOrg(orgHoward);
		howardSquirts.setPlayerOwner(bradleyPlayer);
		howardSquirts.setAgeClass(AgeClass.U10);
		howardSquirts.setLevel("AA");
		howardSquirts.setName("21-22 Howard Squirt Blue AA");
		howardSquirts.setHeadCoach("Brad Powell");
		howardSquirts.setAssistantCoach1("Sam Mrvos");
		howardSquirts.setAssistantCoach2("Kevin McCarthy");
		howardSquirts.setManager("Shayna Walsh");
		howardSquirts.setPlayerNumber(3);
		howardSquirts.setRegularPosition("Left Wing");
		howardSquirts.setSeason("2021-22");

		howardSquirts.setActive(true);
		howardSquirts.setStartDate(LocalDateTime.of(2021, 05, 21,0,0,0));
		session.save(howardSquirts);

		HockeyGame howard10UEJ1 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 8, 27, 11, 30), "Nassau", "AA", Side.Home);
		howard10UEJ1.setLocation("Klick Lewis Arena");
		howard10UEJ1.setLocationDetail("Rink 1");
		howard10UEJ1.setGameType(GameType.League);
		howard10UEJ1.setLeague("EJEPL");
		howard10UEJ1.setResult(GameResult.Win);
		howard10UEJ1.setTeamScore(6);
		howard10UEJ1.setOpponentScore(1);
		howard10UEJ1.setShots(3);
		howard10UEJ1.setAssists(1);
		session.save(howard10UEJ1);

		HockeyGame howard10UEJ2 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 8, 27, 15, 0), "Darien", "AA", Side.Away);
		howard10UEJ2.setLocation("Klick Lewis Arena");
		howard10UEJ2.setLocationDetail("Rink 1");
		howard10UEJ2.setGameType(GameType.League);
		howard10UEJ2.setLeague("EJEPL");
		howard10UEJ2.setResult(GameResult.Win);
		howard10UEJ2.setTeamScore(10);
		howard10UEJ2.setOpponentScore(1);
		howard10UEJ2.setShots(1);
		howard10UEJ2.setAssists(2);
		session.save(howard10UEJ2);

		HockeyGame howard10UEJ3 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 8, 28, 9, 45), "Central Caps", "AA", Side.Home);
		howard10UEJ3.setLocation("Klick Lewis Arena");
		howard10UEJ3.setLocationDetail("Rink 1");
		howard10UEJ3.setGameType(GameType.League);
		howard10UEJ3.setLeague("EJEPL");
		howard10UEJ3.setResult(GameResult.Win);
		howard10UEJ3.setTeamScore(7);
		howard10UEJ3.setOpponentScore(1);
		howard10UEJ3.setShots(3);
		howard10UEJ3.setAssists(1);
		howard10UEJ3.setGoals(1);
		session.save(howard10UEJ3);

		HockeyGame howard10UEJ4 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 8, 28, 13, 15), "CT Riverhawks", "AA", Side.Home);
		howard10UEJ4.setLocation("Klick Lewis Arena");
		howard10UEJ4.setLocationDetail("Rink 1");
		howard10UEJ4.setGameType(GameType.League);
		howard10UEJ4.setLeague("EJEPL");
		howard10UEJ4.setResult(GameResult.Win);
		howard10UEJ4.setTeamScore(2);
		howard10UEJ4.setOpponentScore(0);
		howard10UEJ4.setShots(3);
		howard10UEJ4.setAssists(0);
		howard10UEJ4.setGoals(1);
		session.save(howard10UEJ4);

		HockeyGame howard10U911 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 9, 11, 9, 0), "St James", "AA", Side.Home);
		howard10U911.setLocation("Gardens Ice House");
		howard10U911.setLocationDetail("Logsdon");
		howard10U911.setGameType(GameType.NonLeague);
		howard10U911.setLeague("Exhibition");
		howard10U911.setResult(GameResult.Loss);
		howard10U911.setTeamScore(0);
		howard10U911.setOpponentScore(4);
		howard10U911.setShots(2);
		session.save(howard10U911);

		HockeyGame howard10U1 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 9, 12, 12, 10), "Loudoun Knights", "AA", Side.Away);
		howard10U1.setOpponentTeamNameMod("Gold");
		howard10U1.setLocation("Ion");
		howard10U1.setLocationDetail("Arena Rink");
		howard10U1.setGameType(GameType.League);
		howard10U1.setLeague("EJEPL");
		howard10U1.setResult(GameResult.Win);
		howard10U1.setTeamScore(6);
		howard10U1.setOpponentScore(1);
		howard10U1.setShots(2);
		howard10U1.setGoals(1);
		howard10U1.setAssists(1);
		howard10U1.setPostGameNotes("Game delayed 1 hour due to Zamboni and ice issues.  Bradley got the hard hat.  Skated hard and had a very strong game.");
		session.save(howard10U1);

		HockeyGame howard10U919 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 9, 19, 12, 0), "Ashburn Xtreme", "AA", Side.Home);
		howard10U919.setLocation("Gardens Ice House");
		howard10U919.setLocationDetail("Resor");
		howard10U919.setGameType(GameType.League);
		howard10U919.setLeague("CBHL");
		howard10U919.setResult(GameResult.Loss);
		howard10U919.setShots(4);
		howard10U919.setOpponentScore(5);
		howard10U919.setTeamScore(2);
		session.save(howard10U919);

		HockeyGame howard10U2 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 9, 25, 16, 15), "Loudoun Knights", "AA", Side.Home);
		howard10U2.setOpponentTeamNameMod("Gold");
		howard10U2.setLocation("Columbia Ice Rink");
		howard10U2.setGameType(GameType.League);
		howard10U2.setLeague("EJEPL, CBHL");
		howard10U2.setResult(GameResult.Tie);
		howard10U2.setTeamScore(3);
		howard10U2.setOpponentScore(3);
		howard10U2.setShots(5);
		howard10U2.setPenaltyMin(2);
		howard10U2.setOvertime(true);
		howard10U2.setPostGameNotes("Down 3-0 going into third even though outplaying Loudoun.  3 goal third period to tie it.  2 5 minute OT periods, 4v4 then 3v3.");

		session.save(howard10U2);

		HockeyGame howard10U926 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 9, 26, 8, 10), "Montgomery Blue Devils", "AA", Side.Home);
		howard10U926.setOpponentTeamNameMod("Gold");
		howard10U926.setLocation("Columbia Ice Rink");
		howard10U926.setGameType(GameType.NonLeague);
		howard10U926.setLeague("Exhibition");
		howard10U926.setResult(GameResult.Win);
		howard10U926.setTeamScore(6);
		howard10U926.setOpponentScore(1);
		howard10U926.setShots(5);
		howard10U926.setPostGameNotes("Good backchecking and getting stick on puck.  Needs to keep skating full speed attaching to goal as F2 and on forecheck.");
		session.save(howard10U926);

		HockeyGame howard10U1002a = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 10, 02, 12, 20), "Aston Nordiques", "AA", Side.Home);
		howard10U1002a.setLocation("Gardens Ice House");
		howard10U1002a.setLocationDetail("Logsdon");
		howard10U1002a.setGameType(GameType.League);
		howard10U1002a.setLeague("EJEPL");
		session.save(howard10U1002a);

		HockeyGame howard10U1002b = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 10, 02, 17, 10), "Aston Nordiques", "AA", Side.Home);
		howard10U1002b.setLocation("Gardens Ice House");
		howard10U1002b.setLocationDetail("Logsdon");
		howard10U1002b.setGameType(GameType.League);
		howard10U1002b.setLeague("EJEPL");
		session.save(howard10U1002b);

		HockeyGame howard10U1003 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 10, 3, 9, 30), "Southern MD Sabres", "UA", Side.Home);
		howard10U1003.setLocation("Gardens Ice House");
		howard10U1003.setLocationDetail("Logsdon");
		howard10U1003.setGameType(GameType.League);
		howard10U1003.setLeague("CBHL");
		session.save(howard10U1003);

		HockeyGame howard10U1009 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 10, 9, 19, 0), "St James", "AA", Side.Away);
		howard10U1009.setLocation("St James");
		howard10U1009.setLocationDetail("North Rink");
		howard10U1009.setGameType(GameType.League);
		howard10U1009.setLeague("CBHL");
		session.save(howard10U1009);

		HockeyGame howard10U1010 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 10, 10, 17, 30), "Caps Academy", "AA", Side.Away);
		howard10U1010.setLocation("Kettler");
		howard10U1010.setGameType(GameType.League);
		howard10U1010.setLeague("CBHL");
		session.save(howard10U1010);

		HockeyGame howard10U1019 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 10, 19, 15, 0), "St James", "AA", Side.Away);
		howard10U1019.setLocation("Capital One Arena");
		howard10U1019.setGameType(GameType.NonLeague);
		howard10U1019.setLeague("Exhibition");
		session.save(howard10U1019);

		HockeyGame howard10U1023 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 10, 23, 17, 30), "Loudoun Knights", "AA", Side.Home);
		howard10U1023.setOpponentTeamNameMod("Gold");
		howard10U1023.setLocation("TBD");
		howard10U1023.setGameType(GameType.League);
		howard10U1023.setLeague("CBHL, EJEPL");
		session.save(howard10U1023);

		HockeyGame howard10U1031 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 10, 31, 9, 10), "Montgomery Blue Devils", "AA", Side.Away);
		howard10U1031.setOpponentTeamNameMod("Gold");
		howard10U1031.setLocation("Piney Orchard");
		howard10U1031.setLocationDetail("Rink 2");
		howard10U1031.setGameType(GameType.League);
		howard10U1031.setLeague("CBHL");
		session.save(howard10U1031);

		HockeyGame howard10U1031106 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 11, 6, 14, 50), "Ashburn Xtreme", "AA", Side.Away);
		howard10U1031106.setLocation("Asburn Ice House");
		howard10U1031106.setGameType(GameType.League);
		howard10U1031106.setLeague("CBHL");
		session.save(howard10U1031106);

		HockeyGame howard10U1031107 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 11, 7, 11, 30), "Reston Raiders", "AA", Side.Home);
		howard10U1031107.setLocation("Gardens Ice House");
		howard10U1031107.setLocationDetail("Resor");
		howard10U1031107.setGameType(GameType.League);
		howard10U1031107.setLeague("CBHL, EJEPL");
		session.save(howard10U1031107);

		HockeyGame howard10U1031113 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 11, 13, 13, 10), "Loudoun Knights", "AA", Side.Away);
		howard10U1031113.setOpponentTeamNameMod("Gold");
		howard10U1031113.setLocation("Ion");
		howard10U1031113.setGameType(GameType.League);
		howard10U1031113.setLeague("CBHL, EJEPL");
		session.save(howard10U1031113);

		HockeyGame howard10U1031114 = new HockeyGame(howardSquirts, LocalDateTime.of(2021, 11, 14, 11, 35), "Ashburn Xtreme", "AA", Side.Home	);
		howard10U1031114.setLocation("Columbia Ice Rink");
		howard10U1031114.setGameType(GameType.League);
		howard10U1031114.setLeague("CBHL");
		session.save(howard10U1031114);

		/*** VA Vipers ***/
		HockeyTeam vaVipers = new HockeyTeam();
		vaVipers.setOrg(orgVaVipers);
		vaVipers.setPlayerOwner(bradleyPlayer);
		vaVipers.setAgeClass(AgeClass.U10);
		vaVipers.setLevel("AA");
		vaVipers.setName("2021 Virginia Vipers Tournament Team");
		vaVipers.setHeadCoach("Chris Bass");
		vaVipers.setPlayerNumber(10);
		vaVipers.setRegularPosition("Defense");
		vaVipers.setActive(false);
		vaVipers.setStartDate(LocalDateTime.of(2021, 04, 21,0,0,0));
		vaVipers.setSeason("2021-22");
		session.save(vaVipers);

		HockeyGame vaGame1 = new HockeyGame(vaVipers, LocalDateTime.of(2021, 07, 16, 13, 10), "Aston Thunder Cats", "AA", Side.Home);
		vaGame1.setLocation("Ice Works");
		vaGame1.setLocationDetail("Rink 1");
		vaGame1.setGameType(GameType.Tournament);
		vaGame1.setLeague("2021 Ice Works Summer Fire Tournament");
		vaGame1.setResult(GameResult.Win);
		vaGame1.setNumberPeriods(3);
		vaGame1.setPeriodLength(13);
		vaGame1.setShots(1);
		vaGame1.setOpponentScore(2);
		vaGame1.setTeamScore(5);
		session.save(vaGame1);

		HockeyGame vaGame2 = new HockeyGame(vaVipers, LocalDateTime.of(2021, 07, 17, 06, 15), "Gotta Hockey", "AA", Side.Home);
		vaGame2.setLocation("Ice Works");
		vaGame2.setLocationDetail("Rink 4");
		vaGame2.setGameType(GameType.Tournament);
		vaGame2.setLeague("2021 Ice Works Summer Fire Tournament");
		vaGame2.setResult(GameResult.Loss);
		vaGame2.setNumberPeriods(3);
		vaGame2.setPeriodLength(13);
		vaGame2.setShots(0);
		vaGame2.setOpponentScore(13);
		vaGame2.setTeamScore(0);
		session.save(vaGame2);

		HockeyGame vaGame3 = new HockeyGame(vaVipers, LocalDateTime.of(2021, 07, 17, 13, 45), "Delco Phantoms", "AA", Side.Home);
		vaGame3.setLocation("PNY Rink");
		vaGame3.setGameType(GameType.Tournament);
		vaGame3.setLeague("2021 Ice Works Summer Fire Tournament");
		vaGame3.setResult(GameResult.Loss);
		vaGame3.setNumberPeriods(3);
		vaGame3.setPeriodLength(13);
		vaGame3.setShots(0);
		vaGame3.setOpponentScore(3);
		vaGame3.setTeamScore(2);
		session.save(vaGame3);

		HockeyGame vaGame4 = new HockeyGame(vaVipers, LocalDateTime.of(2021, 07, 18, 6, 00), "Gotta Hockey", "AA", Side.Home);
		vaGame4.setLocation("Ice Works");
		vaGame4.setLocationDetail("Rink 3");
		vaGame4.setGameType(GameType.Tournament);
		vaGame4.setLeague("2021 Ice Works Summer Fire Tournament");
		vaGame4.setResult(GameResult.Loss);
		vaGame4.setNumberPeriods(3);
		vaGame4.setPeriodLength(13);
		vaGame4.setShots(4);
		vaGame4.setOpponentScore(14);
		vaGame4.setTeamScore(0);
		session.save(vaGame4);


		HockeyGame vaGame5 = new HockeyGame(vaVipers, LocalDateTime.of(2021, 8, 06, 6, 45), "Aston 1494", "AAA", Side.Away);
		vaGame5.setLocation("Ice Works");
		vaGame5.setLocationDetail("Rink 4");
		vaGame5.setGameType(GameType.Tournament);
		vaGame5.setLeague("2021 One Hockey Philadelphia Summer");
		vaGame5.setNumberPeriods(3);
		vaGame5.setPeriodLength(15);
		vaGame5.setTeamScore(9);
		vaGame5.setOpponentScore(4);
		vaGame5.setResult(GameResult.Win);
		vaGame5.setShots(2);
		session.save(vaGame5);

		HockeyGame vaGame6 = new HockeyGame(vaVipers, LocalDateTime.of(2021, 8, 07, 13, 00), "Hockey Lab", "AAA", Side.Away);
		vaGame6.setLocation("Ice Works");
		vaGame6.setLocationDetail("Rink 3");
		vaGame6.setGameType(GameType.Tournament);
		vaGame6.setLeague("2021 One Hockey Philadelphia Summer");
		vaGame6.setNumberPeriods(3);
		vaGame6.setPeriodLength(15);
		vaGame6.setTeamScore(7);
		vaGame6.setOpponentScore(2);
		vaGame6.setAssists(1);
		vaGame6.setResult(GameResult.Win);
		vaGame6.setShots(2);
		session.save(vaGame6);

		HockeyGame vaGame7 = new HockeyGame(vaVipers, LocalDateTime.of(2021, 8, 7, 19, 00), "Valley Forge Minutemen", "AAA", Side.Home);
		vaGame7.setLocation("Ice Works");
		vaGame7.setLocationDetail("Rink 3");
		vaGame7.setGameType(GameType.Tournament);
		vaGame7.setLeague("2021 One Hockey Philadelphia Summer");
		vaGame7.setNumberPeriods(3);
		vaGame7.setPeriodLength(15);
		vaGame7.setTeamScore(7);
		vaGame7.setOpponentScore(2);
		vaGame7.setAssists(1);
		vaGame7.setResult(GameResult.Win);
		vaGame7.setShots(5);
		vaGame7.setPostGameNotes("Played wing");
		session.save(vaGame7);

		HockeyGame vaGame8 = new HockeyGame(vaVipers, LocalDateTime.of(2021, 8, 8, 8, 30), "Hockey Lab", "AAA", Side.Home);
		vaGame8.setLocation("Ice Works");
		vaGame8.setLocationDetail("Rink 3");
		vaGame8.setGameType(GameType.Tournament);
		vaGame8.setLeague("2021 One Hockey Philadelphia Summer");
		vaGame8.setNumberPeriods(3);
		vaGame8.setPeriodLength(15);
		vaGame8.setTeamScore(6);
		vaGame8.setOpponentScore(7);
		vaGame8.setAssists(1);
		vaGame8.setOvertime(true);
		vaGame8.setResult(GameResult.Loss);
		vaGame8.setShots(4);
		vaGame8.setPreGameNotes("Championship game.");
		session.save(vaGame8);


		HockeyTeam howardMites = new HockeyTeam();
		howardMites.setOrg(orgHoward);
		howardMites.setPlayerOwner(wesleyPlayer);
		howardMites.setAgeClass(AgeClass.U8);
		howardMites.setLevel("LA");
		howardMites.setName("21-22 Howard Mites Blue LA");
		howardMites.setHeadCoach("Brian Walsh");
		howardMites.setAssistantCoach1("Adam Boston");
		howardMites.setManager("Mark Dorsey");
		howardMites.setActive(true);
		howardMites.setPlayerNumber(14);
		howardMites.setStartDate(LocalDateTime.of(2021, 05, 21,0,0,0));
		howardMites.setSeason("2021-22");
		session.save(howardMites);

		HockeyGame howard08U1 = new HockeyGame(howardMites, LocalDateTime.of(2021, 9, 19, 8, 50), "Junior Black Bears", "LA", Side.Away);
		howard08U1.setLocation("Bowie Ice Rink");
		howard08U1.setGameType(GameType.NonLeague);
		howard08U1.setLeague("Jamboree");
		howard08U1.setSide(Side.Home);
		howard08U1.setShots(1);
		howard08U1.setResult(GameResult.Win);
		howard08U1.setTeamScore(7);
		howard08U1.setOpponentScore(5);
		session.save(howard08U1);

		HockeyGame howard08U2 = new HockeyGame(howardMites, LocalDateTime.of(2021, 9, 19, 8, 0), "Southern Maryland", "LA", Side.Away);
		howard08U2.setLocation("Bowie Ice Rink");
		howard08U2.setGameType(GameType.NonLeague);
		howard08U2.setLeague("Jamboree");
		howard08U2.setSide(Side.Away);
		howard08U2.setResult(GameResult.Win);
		howard08U2.setTeamScore(4);
		howard08U2.setOpponentScore(1);
		howard08U2.setAssists(2);
		howard08U2.setShots(1);
		session.save(howard08U2);

		HockeyGame howard08U3 = new HockeyGame(howardMites, LocalDateTime.of(2021, 9, 19, 8, 25), "Bowie Bruins", "LA", Side.Away);
		howard08U3.setLocation("Bowie Ice Rink");
		howard08U3.setGameType(GameType.NonLeague);
		howard08U3.setLeague("Jamboree");
		howard08U3.setSide(Side.Home);
		howard08U3.setResult(GameResult.Loss);
		howard08U3.setTeamScore(1);
		howard08U3.setOpponentScore(4);
		howard08U3.setShots(1);
		session.save(howard08U3);

		HockeyGame howard08U4 = new HockeyGame(howardMites, LocalDateTime.of(2021, 9, 18, 8, 20), "Frederick Freeze", "LA", Side.Away);
		howard08U4.setLocation("Skate Frederick");
		howard08U4.setGameType(GameType.NonLeague);
		howard08U4.setLeague("Jamboree");
		howard08U4.setSide(Side.Away);
		howard08U4.setTeamScore(5);
		howard08U4.setOpponentScore(3);
		howard08U4.setResult(GameResult.Win);
		howard08U4.setShots(3);
		howard08U4.setGoals(1);
		howard08U4.setAssists(1);
		howard08U4.setNumberPeriods(1);
		howard08U4.setPeriodLength(16);
		session.save(howard08U4);

		HockeyGame howard08U5 = new HockeyGame(howardMites, LocalDateTime.of(2021, 9, 18, 8, 0), "Hagerstown Bulldogs", "LA", Side.Away);
		howard08U5.setLocation("Skate Frederick");
		howard08U5.setGameType(GameType.NonLeague);
		howard08U5.setLeague("Jamboree");
		howard08U5.setSide(Side.Away);
		howard08U5.setTeamScore(4);
		howard08U5.setOpponentScore(1);
		howard08U5.setResult(GameResult.Loss);
		howard08U5.setShots(2);
		howard08U5.setGoals(0);
		howard08U5.setAssists(0);
		howard08U5.setNumberPeriods(1);
		howard08U5.setPeriodLength(16);
		session.save(howard08U5);

		HockeyGame howard08U6 = new HockeyGame(howardMites, LocalDateTime.of(2021, 9, 18, 7, 40), "Bowie Bruins", "LA", Side.Away);
		howard08U6.setLocation("Skate Frederick");
		howard08U6.setGameType(GameType.NonLeague);
		howard08U6.setLeague("Jamboree");
		howard08U6.setSide(Side.Away);
		howard08U6.setTeamScore(0);
		howard08U6.setOpponentScore(5);
		howard08U6.setResult(GameResult.Loss);
		howard08U6.setShots(1);
		howard08U6.setGoals(0);
		howard08U6.setAssists(0);
		howard08U6.setNumberPeriods(1);
		howard08U6.setPeriodLength(16);
		session.save(howard08U6);

		HockeyGame howard08U7= new HockeyGame(howardMites, LocalDateTime.of(2021, 9, 25, 7, 40), "Frederick Freeze", "LA", Side.Away);
		howard08U7.setLocation("Skate Frederick");
		howard08U7.setGameType(GameType.NonLeague);
		howard08U7.setLeague("Exhibition");
		howard08U7.setSide(Side.Away);
		howard08U7.setResult(GameResult.Win);
		howard08U7.setTeamScore(21);
		howard08U7.setOpponentScore(5);
		howard08U7.setGoals(2);
		howard08U7.setAssists(2);
		howard08U7.setShots(7);
		session.save(howard08U7);

		HockeyGame howard08U8= new HockeyGame(howardMites, LocalDateTime.of(2021, 10, 02, 9, 45), "Junior Black Bears", "LA", Side.Away);
		howard08U8.setLocation("Prince William Ice Center");
		howard08U8.setGameType(GameType.NonLeague);
		howard08U8.setLeague("CBHL Preseason Jamboree");
		session.save(howard08U8);

		HockeyGame howard08U9= new HockeyGame(howardMites, LocalDateTime.of(2021, 10, 02, 10, 20), "Navy", "LA", Side.Away);
		howard08U9.setLocation("Prince William Ice Center");
		howard08U9.setGameType(GameType.NonLeague);
		howard08U9.setLeague("CBHL Preseason Jamboree");
		session.save(howard08U9);

		HockeyGame howard08U10= new HockeyGame(howardMites, LocalDateTime.of(2021, 10, 02, 11, 0), "Baltimore Stars", "LA", Side.Away);
		howard08U10.setLocation("Prince William Ice Center");
		howard08U10.setGameType(GameType.NonLeague);
		howard08U10.setLeague("CBHL Preseason Jamboree");
		session.save(howard08U10);

		HockeyGame howard08U11= new HockeyGame(howardMites, LocalDateTime.of(2021, 11, 14, 8, 0), "Hagerstown Bulldogs", "LA", Side.Away);
		howard08U11.setLocation("Hagerstown Ice Rink");
		howard08U11.setGameType(GameType.League);
		howard08U11.setLeague("CBHL Jamboree");
		session.save(howard08U11);

		HockeyGame howard08U12= new HockeyGame(howardMites, LocalDateTime.of(2021, 11, 14, 8, 0), "Reston Raiders", "LA", Side.Away);
		howard08U12.setOpponentTeamNameMod("Reston 2");
		howard08U12.setLocation("Hagerstown Ice Rink");
		howard08U12.setGameType(GameType.League);
		howard08U12.setLeague("CBHL Jamboree");
		session.save(howard08U12);

		HockeyGame howard08U13= new HockeyGame(howardMites, LocalDateTime.of(2021, 11, 14, 8, 0), "Junior Black Bears", "LA", Side.Away);
		howard08U13.setLocation("Hagerstown Ice Rink");
		howard08U13.setGameType(GameType.League);
		howard08U13.setLeague("CBHL Jamboree");
		session.save(howard08U13);

		HockeyGame howard08U14= new HockeyGame(howardMites, LocalDateTime.of(2021, 11, 21, 9, 15), "Navy", "LA", Side.Away);
		howard08U14.setLocation("Brigade Sports Complex");
		howard08U14.setGameType(GameType.League);
		howard08U14.setLeague("CBHL Jamboree");
		session.save(howard08U14);

		HockeyGame howard08U15= new HockeyGame(howardMites, LocalDateTime.of(2021, 11, 21, 9, 15), "Ashburn Xtreme", "LA", Side.Away);
		howard08U15.setOpponentTeamNameMod("Ashburn 2");
		howard08U15.setLocation("Brigade Sports Complex");
		howard08U15.setGameType(GameType.League);
		howard08U15.setLeague("CBHL Jamboree");
		session.save(howard08U15);

		HockeyGame howard08U16= new HockeyGame(howardMites, LocalDateTime.of(2021, 11, 21, 9, 15), "Baltimore Stars", "LA", Side.Away);
		howard08U16.setLocation("Brigade Sports Complex");
		howard08U16.setGameType(GameType.League);
		howard08U16.setLeague("CBHL Jamboree");
		session.save(howard08U16);

		HockeyGame howard08U17= new HockeyGame(howardMites, LocalDateTime.of(2021, 10, 10, 11, 20), "TBD", "LA", Side.Away);
		howard08U17.setLocation("Capital Clubhouse");
		howard08U17.setGameType(GameType.League);
		howard08U17.setLeague("Jamboree");
		session.save(howard08U17);

		HockeyGame howard08U18= new HockeyGame(howardMites, LocalDateTime.of(2021, 10, 10, 11, 20), "TBD", "LA", Side.Away);
		howard08U18.setLocation("Capital Clubhouse");
		howard08U18.setGameType(GameType.League);
		howard08U18.setLeague("Jamboree");
		session.save(howard08U18);

		HockeyGame howard08U19= new HockeyGame(howardMites, LocalDateTime.of(2021, 10, 10, 11, 20), "TBD", "LA", Side.Away);
		howard08U19.setLocation("Capital Clubhouse");
		howard08U19.setGameType(GameType.League);
		howard08U19.setLeague("Jamboree");
		session.save(howard08U19);



	}

	private void initializeRandomData() throws IOException {

		int numPlayers = 1000;

		for (int playerIdx = 0; playerIdx < numPlayers; playerIdx++) {
			Session testDataSession = HibernateUtil.getSessionFactory().openSession();
			testDataSession.beginTransaction();
			createTestTeam(testDataSession, playerIdx, 5, 35);
			if (playerIdx % (numPlayers / 10) == 0) {
				LOG.info( String.valueOf(numPlayers / 10) + "%" );
			}
			testDataSession.getTransaction().commit();
		}


	}

	private void createTestTeam(Session session, int testId, int numTeams, int numGames) throws IOException {
		// create test player
		Player testPlayer = new Player();
		testPlayer.setFirstName("TestFirstName" + String.valueOf(testId));
		testPlayer.setLastName("TestLastName" + String.valueOf(testId));
		testPlayer.setUserId("auth0|");
		testPlayer.setHeightFeet(4);
		testPlayer.setHeightInches(5);
		testPlayer.setWeight(74);
		testPlayer.setIncludeHockey(true);
		testPlayer.getHockeyAttributes().setPosition("Forward");
		testPlayer.getHockeyAttributes().setShot(Shot.Left);
		Media bradleyImage = new Media();
		bradleyImage.setDescription("Bradley profile picture");
		bradleyImage.setFile(this.readFileBase64("images/bradley.jpeg"));
		bradleyImage.setMediaType(MediaType.IMAGE_JPEG_VALUE);
		testPlayer.setPlayerPicture(bradleyImage);

		session.save(testPlayer);

		Org orgTest = new Org();
		orgTest.setName("TestOrg" + String.valueOf(testId));
		orgTest.setCity("Test Org");
		session.save(orgTest);

		// create 5 test teams
		for (int teamIdx=0; teamIdx < numTeams; teamIdx++) {
			HockeyTeam testTeam = new HockeyTeam();
			testTeam.setOrg(orgTest);
			testTeam.setPlayerOwner(testPlayer);
			testTeam.setAgeClass(AgeClass.U10);
			testTeam.setLevel("AA");
			testTeam.setName("Test Team " + String.valueOf(testId) + "_" + String.valueOf(teamIdx));
			testTeam.setHeadCoach("Test Coach");
			testTeam.setPlayerNumber(10);
			testTeam.setRegularPosition("Defense");
			testTeam.setActive(true);
			testTeam.setStartDate(LocalDateTime.of(2021, 04, 21,0,0,0));
			testTeam.setSeason("2021-22");
			session.save(testTeam);

			for(int gameIdx =0; gameIdx < numGames; gameIdx++) {
				HockeyGame testGame= new HockeyGame(testTeam, LocalDateTime.of(2021, 10, 02, 12, 0).plusDays(gameIdx), "TBD 3", "LA", Side.Away);
				testGame.setLocation("A Rink");
				testGame.setGameType(GameType.League);
				testGame.setLeague("NHL");


				if (gameIdx % 2 == 0) {
					testGame.setSide(Side.Away);
				} else {
					testGame.setSide(Side.Home);
				}

				testGame.setTeamScore(4);
				testGame.setOpponentScore(1);
				testGame.setResult(GameResult.Loss);
				testGame.setShots(2);
				testGame.setGoals(0);
				testGame.setAssists(0);
				testGame.setNumberPeriods(1);
				testGame.setPeriodLength(16);

				session.save(testGame);
			}
		}


		// for each team, create 30 games
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
