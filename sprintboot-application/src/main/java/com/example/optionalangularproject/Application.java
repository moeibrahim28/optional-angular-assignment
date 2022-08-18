package com.example.optionalangularproject;

import com.example.optionalangularproject.model.Item;
import com.example.optionalangularproject.model.User;
import com.example.optionalangularproject.repositories.ItemRepository;
import com.example.optionalangularproject.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}


	@Bean
	CommandLineRunner init(UserRepository userRepository, ItemRepository itemRepository) {
		return args -> {
			Stream.of("John", "Julie", "Jennifer", "Helen", "Rachel").forEach(name -> {
				User user = new User();
				user.setEmail(name.toLowerCase() + "@domain.com");
				user.setName(name);
				userRepository.save(user);
			});
			userRepository.findAll().forEach(System.out::println);

			Stream.of("Soda", "Milk", "Chips", "Eggs", "Bread",
					"Cereal", "Oatmeal", "Candy", "Cheese", "Beer",
					"Water", "Chocolate", "Cookies", "Eggs", "Cupcakes",
					"Breakfast Bars", "Fruits", "Vegetables", "Coffee", "Yogurt",
					"Juice", "Beef", "Chicken", "Hot Dogs", "Peanut Butter",
					"Sandwiches", "Pizza", "Whipped Cream", "Sausage", "Macaroni",
					"Biscuits", "Fish", "Rice", "Tea", "Coffee").forEach(name -> {
				Item item = new Item();

				item.setName(name);
				itemRepository.save(item);
			});
			itemRepository.findAll().forEach(System.out::println);



		};
	}
}