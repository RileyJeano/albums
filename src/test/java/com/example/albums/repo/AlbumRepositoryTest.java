package com.example.albums.repo;

import static org.hamcrest.Matchers.hasItems;
import static org.junit.Assert.assertThat;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.albums.models.Album;
import com.example.albums.repository.AlbumRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class AlbumRepositoryTest {

	@Resource
	AlbumRepository repo;

	@Test
	public void shouldReturnAllAlbums() {
		Album album = repo.save(new Album());
		Album album2 = repo.save(new Album());

		// Act
		Iterable<Album> result = repo.findAll();

		// Assert
		assertThat(result, hasItems(album2));
	}
}
