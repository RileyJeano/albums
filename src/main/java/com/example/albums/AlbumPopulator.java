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
///////////////////////////
		Artist artist1 = new Artist("Captain Carrion and the Buzzards", "google.com", "A billion", "Jupiter");
		artist1 = artistRepo.save(artist1);

			Album album1 = new Album("Arg Me Jewels", "/images/albumart.png", artist1);
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

//////////////////
		Artist artist2 = new Artist("Dudley and his Buddies", "google.com", "34", "Indianapolis");
		artist2 = artistRepo.save(artist2);

			Album album2 = new Album("Just Hanging Out and Doing Crafts", "/images/albumart.png", artist2);
			album2 = albumRepo.save(album2);
			
				Song song3 = new Song("Pass the Hot Glue (Broken Hearts)", "google.com", "2:58", album2);
				song3 = songRepo.save(song3);
				
				Song song4 = new Song("Glitter Glue and Tears", "google.com", "3:32", album2);
				song4 = songRepo.save(song4);
		
			Album album3 = new Album("I'm Much Better Now", "/images/albumart.png", artist2);
			album3 = albumRepo.save(album3);
			
				Song song5 = new Song("I Built A Bird House (Just For Myself)", "www.wwwwwww.com.co", "2:31", album3);
				song5 = songRepo.save(song5);
				
				Song song6 = new Song("Taking Up Birdwatching", "www.wwwwwwwwwwwwwwwww.com.co", "Just Long Enough", album3);
				song6 = songRepo.save(song6);
				
			Album album6 = new Album("This Time I'm Really Over It", "/images/albumart.png", artist2);
			album6 = albumRepo.save(album6);
			
				Song song12 = new Song("Normal Hobbies", "wwwwwww", "3:11", album6);
				song12 = songRepo.save(song12);
				
				Song song13 = new Song("Midlife Crimespree", "wwwwwww", "2:49", album6);
				song13 = songRepo.save(song13);
				
				Song song14 = new Song("Power of Love (Huey Lewis cover)", "", "3:04", album6);
				song14 = songRepo.save(song14);

///////////////////////
		Artist artist3 = new Artist("Alligator McQueen", "google.com", "28", "Center of the Earth");
		artist3 = artistRepo.save(artist3);
		
			Album album4 = new Album("How to Fight a Heyena", "/images/albumart.png", artist3);
			album4 = albumRepo.save(album4);
			
				Song song7 = new Song("If I Only Had Guns for Hands", "goooooogle.com", "1:46", album4);
				song7 = songRepo.save(song7);
				
				Song song8 = new Song("My Cyborg Heart Runs on Diesel", "goooooogle.com", "1:36", album4);
				song8 = songRepo.save(song8);
				
			Album album5 = new Album("How to Fight a Heyena Part 2", "/images/albumart.png", artist3);
			album5 = albumRepo.save(album5);
			
				Song song9 = new Song("You Cannot Fight Heyenas", "goooooogle.com", "1:21", album5);
				song9 = songRepo.save(song9);
				
				Song song10 = new Song("I Made A Mistake", "goooooogle.com", "1:35", album5);
				song10 = songRepo.save(song10);
				
				Song song11 = new Song("Alone At The Hospital", "goooooogle.com", "1:15", album5);
				song11 = songRepo.save(song11);
				
		
	}

}
