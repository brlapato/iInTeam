package com.hockey43.iInTeam;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCache;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
@EnableCaching
public class CachingConfig {

    @Bean
    public CacheManager cacheManager() {

        SimpleCacheManager cacheManager = new SimpleCacheManager();
        cacheManager.setCaches(Arrays.asList(
                new ConcurrentMapCache("teamEvents"),
                new ConcurrentMapCache("upcomingHockeyGames"),
                new ConcurrentMapCache("recentHockeyGames"),
                new ConcurrentMapCache("hockeyGamesForPlayer"),
                new ConcurrentMapCache("getHockeyTeamSummary"),
                new ConcurrentMapCache("getHockeyTeam"),
                new ConcurrentMapCache("hockeyGamesForTeam")));
        return cacheManager;


    }
}