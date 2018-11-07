package com.example.albums;

import javax.annotation.Resource;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

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

@Service
public class AlbumPopulator implements CommandLineRunner {

	@Resource
	AlbumRepository albumRepo;

	@Resource
	ArtistRepository artistRepo;

	@Resource
	CommentRepository commentRepo;

	@Resource
	SongRepository songRepo;

	@Resource
	TagRepository tagRepo;

	@Override
	public void run(String... args) throws Exception {
		Artist artist1 = new Artist("Captain Karian and the Buzzards", "google.com", "A billion", "Jupiter");
		artist1 = artistRepo.save(artist1);

		Album album1 = new Album("Arg Me Jewels", "google.com", artist1);
		album1 = albumRepo.save(album1);

		Song song1 = new Song("Termites in Me Peg Leg", "google.com", "30 hrs.", album1);
		song1 = songRepo.save(song1);

		Song song2 = new Song("You keelhawled my heart", "google.com", "3:45", album1);
		song2 = songRepo.save(song2);

		Comment comment1 = new Comment("Max, it's me I am the Comment", "I like this song");
		comment1.addSong(song1);
		comment1 = commentRepo.save(comment1);

		Comment comment2 = new Comment("GoalKid99", "Where is all this screaming about peg legs???");
		comment2.addSong(song2);
		comment2 = commentRepo.save(comment2);

		Tag tag1 = new Tag("Arrgh Yeah!");
		tag1.addSong(song2);
		tag1.addArtist(artist1);
		tag1 = tagRepo.save(tag1);
	}

}
