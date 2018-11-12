package com.example.albums.models;

import java.util.Collection;
import java.util.HashSet;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Artist {
	@Id
	@GeneratedValue
	private Long id;
	private String name;
	private String image;
	private String age;
	private String home;

	private int rating;

	@OneToMany(mappedBy = "artist")
	private Collection<Album> albums = new HashSet<>();

	@JsonIgnore
	@ManyToMany
	private Collection<Tag> tags = new HashSet<>();

	@OneToMany(mappedBy = "artist")
	private Collection<Comment> comments = new HashSet<>();

	public Artist() {

	}

	public Artist(String name, String image, String age, String home) {
		this.name = name;
		this.image = image;
		this.age = age;
		this.home = home;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getImage() {
		return image;
	}

	public String getAge() {
		return age;
	}

	public String getHome() {
		return home;
	}

	public Collection<Album> getAlbums() {
		return albums;
	}

	public void addTag(Tag tag) {
		tags.add(tag);
	}

	public Collection<Tag> getTags() {
		return tags;
	}

	public Collection<Comment> getComments() {
		return comments;
	}

}
