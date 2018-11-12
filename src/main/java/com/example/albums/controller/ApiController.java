package com.example.albums.controller;

import java.util.Collection;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.albums.models.Album;
import com.example.albums.models.Artist;
import com.example.albums.models.Comment;
import com.example.albums.models.Song;
import com.example.albums.models.Tag;
import com.example.albums.repository.AlbumRepository;
import com.example.albums.repository.ArtistRepository;
import com.example.albums.repository.CommentRepository;
import com.example.albums.repository.SongRepository;
import com.example.albums.repository.TagRepository;

@CrossOrigin
@RestController
public class ApiController {

	@Autowired
	AlbumRepository albumRepo;

	@Autowired
	ArtistRepository artistRepo;

	@Autowired
	CommentRepository commentRepo;

	@Autowired
	SongRepository songRepo;

	@Autowired
	TagRepository tagRepo;

	@GetMapping("/api/artists")
	public Collection<Artist> showArtists() {
		return (Collection<Artist>) artistRepo.findAll();
	}

	@GetMapping("api/{artistId}/tags")
	public Collection<Tag> showArtistsTags(@PathVariable(value = "artistId") Long artistId) {
		return artistRepo.findById(artistId).get().getTags();
	}

	@GetMapping("/api/{artistId}/albums")
	public Collection<Album> showArtistsAlbums(@PathVariable(value = "artistId") Long artistId) {
		return (Collection<Album>) artistRepo.findById(artistId).get().getAlbums();
	}

	@GetMapping("/api/{artistId}/albums/{albumId}")
	public Album showAlbum(@PathVariable(value = "artistId") Long artistId,
			@PathVariable(value = "albumId") Long albumId) {
		return albumRepo.findById(albumId).get();
	}

//////////////////////////////////////////////////////////////////////???
	@GetMapping("api/{artistId}/comments")
	public Collection<Comment> showArtistsComment(@PathVariable(value = "artistId") Long artistId) {
		return artistRepo.findById(artistId).get().getComments();
	}

	@GetMapping("/api/{artistId}/albums/{albumId}/songs")
	public Collection<Song> showAnAlbumsSongs(@PathVariable(value = "artistId") Long artistId,
			@PathVariable(value = "albumId") Long albumId) {
		return (Collection<Song>) albumRepo.findById(albumId).get().getSongs();
	}

	@GetMapping("/api/{artistId}/albums/{albumId}/songs/{songId}")
	public Song showSong(@PathVariable(value = "artistId") Long artistId, @PathVariable(value = "albumId") Long albumId,
			@PathVariable(value = "songId") Long songId) {
		return songRepo.findById(songId).get();
	}

	@GetMapping("/api/{artistId}/albums/{albumId}/songs/{songId}/tags")
	public Collection<Tag> showSongTags(@PathVariable(value = "artistId") Long artistId,
			@PathVariable(value = "albumId") Long albumId, @PathVariable(value = "songId") Long songId) {
		return songRepo.findById(songId).get().getTags();
	}

	@GetMapping("/api/albums")
	public Collection<Album> showAlbums() {
		return (Collection<Album>) albumRepo.findAll();
	}

	@GetMapping("/api/songs")
	public Collection<Song> showSongs() {
		return (Collection<Song>) songRepo.findAll();
	}

	@GetMapping("/api/tags")
	public Collection<Tag> showTags() {
		return (Collection<Tag>) tagRepo.findAll();
	}

	@GetMapping("/api/tags/{id}")
	public Tag returnATag(@PathVariable(value = "id") Long id) {
		return tagRepo.findById(id).get();
	}

	@GetMapping("/api/comments")
	public Collection<Comment> showComments() {
		return (Collection<Comment>) commentRepo.findAll();
	}

	// comments song
	@GetMapping("/api/{artistId}/albums/{albumId}/songs/{songId}/comments")
	public Collection<Comment> showSongComments(@PathVariable(value = "artistId") Long artistId,
			@PathVariable(value = "albumId") Long albumId, @PathVariable(value = "songId") Long songId) {
		return songRepo.findById(songId).get().getComments();
	}

	// comments artist/////////////////////////////////////////////////////
//	@GetMapping("/api/{artistId}/comments")
//	public Collection<Comment> showArtistComments(@PathVariable(value = "artistId") Long artistId) {
//		return songRepo.findById(artistId).get().getComments();
//	}

	// comments albums
	@GetMapping("/api/{artistId}/albums/{albumId}/comments")
	public Collection<Comment> showAlbumComments(@PathVariable(value = "artistId") Long artistId,
			@PathVariable(value = "albumId") Long albumId) {
		return songRepo.findById(albumId).get().getComments();
	}

	@GetMapping("/api/{artistId}/albums/{albumId}/tags")
	public Collection<Tag> showAlbumsTags(@PathVariable(value = "artistId") Long artistId,
			@PathVariable(value = "albumId") Long albumId) {
		return albumRepo.findById(albumId).get().getTags();
	}

	@PostMapping("/api/artist/add")
	public void addArtist(@RequestBody String artistContent) throws JSONException {
		JSONObject json = new JSONObject(artistContent);
		String artistName = json.getString("name");
		String artistImage = json.getString("image");
		String artistAge = json.getString("age");
		String artistHome = json.getString("home");
		Artist artist = new Artist(artistName, artistImage, artistAge, artistHome);
		artist = artistRepo.save(artist);
	}

	@PostMapping("/api/{id}/albums/add")
	public void addAlbum(@PathVariable(value = "id") Long id, @RequestBody String content) throws JSONException {
		Artist artist = artistRepo.findById(id).get();
		JSONObject json = new JSONObject(content);
		String albumName = json.getString("name");
		String albumImage = json.getString("image");

		Album album = new Album(albumName, albumImage, artist);
		album = albumRepo.save(album);
	}

	@PostMapping("/api/{artistId}/albums/{albumId}/rating/add")
	public void increaseAlbumRating(@PathVariable(value = "artistId") Long artistId,
			@PathVariable(value = "albumId") Long albumId, @RequestBody String content) throws JSONException {
		Album album = albumRepo.findById(albumId).get();
		album.setRating(album.getRating() + 1);
		albumRepo.save(album);
	}

	@PostMapping("/api/{artistId}/albums/{albumId}/songs/add")
	public void addSong(@PathVariable(value = "artistId") Long artistId, @PathVariable(value = "albumId") Long albumId,
			@RequestBody String content) throws JSONException {
		Artist artist = artistRepo.findById(artistId).get();
		Album album = albumRepo.findById(albumId).get();
		JSONObject json = new JSONObject(content);
		String songName = json.getString("name");
		String songLength = json.getString("length");
		String songLink = json.getString("link");

		Song song = new Song(songName, songLink, songLength, album);
		song = songRepo.save(song);
	}

	// add comments song
	@PostMapping("api/{artistId}/albums/{albumId}/songs/{songId}/comments/add")
	public void addCommentOnASong(@PathVariable(value = "artistId") Long artistId,
			@PathVariable(value = "albumId") Long albumId, @PathVariable(value = "songId") Long songId,
			@RequestBody String content) throws JSONException {
		Artist artist = artistRepo.findById(artistId).get();
		Album album = albumRepo.findById(albumId).get();
		Song song = songRepo.findById(songId).get();
		JSONObject json = new JSONObject(content);
		String userName = json.getString("name");
		String commentContent = json.getString("content");

		Comment comment = new Comment(userName, commentContent);
		comment.addSong(song);
		// song.add
		songRepo.save(song);
		comment = commentRepo.save(comment);
	}

	// add comments artist
	@PostMapping("api/{artistId}/comments/add")
	public void addCommentOnAArtist(@PathVariable(value = "artistId") Long artistId,
			@RequestBody String content) throws JSONException {
		Artist artist = artistRepo.findById(artistId).get();
		JSONObject json = new JSONObject(content);
		String userName = json.getString("name");
		String commentContent = json.getString("content");

		Comment comment = new Comment(userName, commentContent);
		comment.addAritst(artist);
		comment = commentRepo.save(comment);
	}

	// add comments album
	@PostMapping("api/{artistId}/albums/{albumId}/comments/add")
	public void addCommentOnAAlbum(@PathVariable(value = "artistId") Long artistId,
			@PathVariable(value = "albumId") Long albumId, @PathVariable(value = "songId") Long songId,
			@RequestBody String content) throws JSONException {
		Artist artist = artistRepo.findById(artistId).get();
		Album album = albumRepo.findById(albumId).get();
		Song song = songRepo.findById(songId).get();
		JSONObject json = new JSONObject(content);
		String userName = json.getString("name");
		String commentContent = json.getString("content");

		Comment comment = new Comment(userName, commentContent);
		comment.addAlbum(album);
		// song.add
		albumRepo.save(album);
		comment = commentRepo.save(comment);
	}

	// add tags songs
	@PostMapping("api/{artistId}/albums/{albumId}/songs/{songId}/tags/add")
	public void addTagOnASong(@PathVariable(value = "artistId") Long artistId,
			@PathVariable(value = "albumId") Long albumId, @PathVariable(value = "songId") Long songId,
			@RequestBody String content) throws JSONException {
		Artist artist = artistRepo.findById(artistId).get();
		Album album = albumRepo.findById(albumId).get();
		Song song = songRepo.findById(songId).get();
		JSONObject json = new JSONObject(content);
		String tagName = json.getString("tagName");

		if (tagRepo.findByTagName(tagName) == null) {
			Tag tag = new Tag(tagName);
			tag.addSong(song);
			tag = tagRepo.save(tag);
			song.addTag(tag);
			songRepo.save(song);
		}

		else {
			Tag tag = tagRepo.findByTagName(tagName);
			// if this tag is already applied to this song
			if (songRepo.findById(songId).get().getTags().contains(tag)) {
				return;
			} else {
				tag.addSong(song);
				tag = tagRepo.save(tag);
				song.addTag(tag);
				songRepo.save(song);
			}
		}

	}

	// add tags artists
	@PostMapping("api/{artistId}/tags/add")
	public void addTagOnAArtist(@PathVariable(value = "artistId") Long artistId,
			@PathVariable(value = "albumId") Long albumId, @PathVariable(value = "songId") Long songId,
			@RequestBody String content) throws JSONException {
		Artist artist = artistRepo.findById(artistId).get();
		Album album = albumRepo.findById(albumId).get();
		Song song = songRepo.findById(songId).get();
		JSONObject json = new JSONObject(content);
		String tagName = json.getString("tagName");

		if (tagRepo.findByTagName(tagName) == null) {
			Tag tag = new Tag(tagName);
			tag.addArtist(artist);
			tag = tagRepo.save(tag);
			artist.addTag(tag);
			artistRepo.save(artist);
		}

		else {
			Tag tag = tagRepo.findByTagName(tagName);
			// if this tag is already applied to this song
			if (artistRepo.findById(artistId).get().getTags().contains(tag)) {
				return;
			} else {
				tag.addArtist(artist);
				tag = tagRepo.save(tag);
				artist.addTag(tag);
				artistRepo.save(artist);
			}
		}

	}

	// add tags albums
	@PostMapping("api/{artistId}/albums/{albumId}/tags/add")
	public void addTagOnAAlbum(@PathVariable(value = "artistId") Long artistId,
			@PathVariable(value = "albumId") Long albumId, @PathVariable(value = "songId") Long songId,
			@RequestBody String content) throws JSONException {
		Artist artist = artistRepo.findById(artistId).get();
		Album album = albumRepo.findById(albumId).get();
		Song song = songRepo.findById(songId).get();
		JSONObject json = new JSONObject(content);
		String tagName = json.getString("tagName");

		if (tagRepo.findByTagName(tagName) == null) {
			Tag tag = new Tag(tagName);
			tag.addAlbum(album);
			tag = tagRepo.save(tag);
			album.addTag(tag);
			albumRepo.save(album);
		}

		else {
			Tag tag = tagRepo.findByTagName(tagName);
			// if this tag is already applied to this song
			if (albumRepo.findById(songId).get().getTags().contains(tag)) {
				return;
			} else {
				tag.addAlbum(album);
				tag = tagRepo.save(tag);
				album.addTag(tag);
				albumRepo.save(album);
			}
		}

	}

//add rating song
	@PostMapping("/api/{artistId}/albums/{albumId}/songs/{songId}/rating/add")
	public void increaseSongRating(@PathVariable(value = "artistId") Long artistId,
			@PathVariable(value = "albumId") Long albumId, @PathVariable(value = "songId") Long songId,
			@RequestBody String content) throws JSONException {
		Song song = songRepo.findById(songId).get();
		song.setRating(song.getRating() + 1);
		songRepo.save(song);
	}

	// add rating artist
	@PostMapping("/api/{artistId}/rating/add")
	public void increaseArtistRating(@PathVariable(value = "artistId") Long artistId, @RequestBody String content)
			throws JSONException {
		Artist artist = artistRepo.findById(artistId).get();
		artist.setRating(artist.getRating() + 1);
		artistRepo.save(artist);
	}

}
