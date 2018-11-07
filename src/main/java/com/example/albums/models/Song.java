package com.example.albums.models;

import java.util.Collection;
import java.util.HashSet;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Song {
	@Id
	@GeneratedValue
	private Long id;

	private String name;
	private String link;
	private String length;

	@JsonIgnore
	@ManyToOne
	private Album album;

	@ManyToMany
	private Collection<Tag> tags = new HashSet<>();

	@OneToMany(mappedBy = "song")
	private Collection<Comment> comments = new HashSet<>();

	public Song() {

	}

	public Song(String name, String link, String length, Album album) {
		this.name = name;
		this.link = link;
		this.length = length;
		this.album = album;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getLink() {
		return link;
	}

	public String getLength() {
		return length;
	}

	public Album getAlbum() {
		return album;
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
