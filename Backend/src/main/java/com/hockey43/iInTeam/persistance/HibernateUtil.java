package com.hockey43.iInTeam.persistance;

import org.hibernate.cfg.Configuration;
import org.hibernate.SessionFactory;

public class HibernateUtil
{
    private static final SessionFactory sessionFactory = buildSessionFactory();

    private static SessionFactory buildSessionFactory()
    {
        try
        {
            // Create the SessionFactory from hibernate.cfg.xml
            Configuration config = new Configuration().configure("hibernate.cfg.xml");

            HibernateUtil.overrideSetting(config, "hibernate.connection.url", "DB_CONNECTION_URL");
            HibernateUtil.overrideSetting(config, "hibernate.connection.username", "DB_USER");
            HibernateUtil.overrideSetting(config, "hibernate.connection.password", "DB_PASSWORD");

            return config.buildSessionFactory();
        }
        catch (Throwable ex) {
            // Make sure you log the exception, as it might be swallowed
            System.err.println("Initial SessionFactory creation failed." + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

    private static void overrideSetting(Configuration config, String settingName, String envVariableName) {
        String envVariableValue = System.getenv(envVariableName);
        if (envVariableValue != null) {
            config.setProperty(settingName, envVariableValue);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public static void shutdown() {
        // Close caches and connection pools
        getSessionFactory().close();
    }
}
