package com.hockey43.iInTeam.dataObjects;

import javax.persistence.*;

@Entity
@Table(name="Org",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"Name", "City"})}
        )
public class Org {

    @Id
    @Column(name="OrgId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orgId;

    @Column(name="Name")
    private String name;

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Column(name="City")
    private String city;

    public Org() {
    }

    public int getOrgId() {
        return orgId;
    }

    public void setOrgId(int orgId) {
        this.orgId = orgId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
