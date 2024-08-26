import React from 'react';
import './Home.css';

const Home = () => {
  // Array of post objects to display on the home page
  const posts = [
    {
      id: 1,
      title: 'Adam Ondra Climbs his 212th 9a | Narcissus',
      contentType: 'video',
      contentUrl: 'https://www.youtube.com/embed/PzgOb99i654',
      body: 'Adam Ondra has done Narcissus (9a) in Oltrefinale / Albenga, on his second go. “Amazing line by Matteo Gambaro. We both used kneepads and took kind of different direction/beta on the very top (what we believe is more intuitive) which makes it much easier. and I think it could be soft 9a like this. The way Matteo did it is much harder and could be even 9a+?”. The 40 meter route is a link up of two 8b+ with a hard roof section in between, Gambaro was 45 when he did the First Ascent.',
    },
    {
      id: 2,
      title: 'Max Milne flashes Bewilderness (8B+)',
      contentType: 'image',
      contentUrl: 'https://img.ukclimbing.com/i/435037?fm=webp&time=1724070115&dpr=2&w=768&sharp=7&s=bb4dfef68a3a7c1234bd7f29955ade5d',
      body: '23-year-old British climber Max Milne has flashed Bewilderness (8B+/V14) at Badgers Cove in the Peak District, England. First climbed by Dan Varian, this is a rare flash of an 8B+ and only the first time this difficulty has been flashed on UK soil.',
    },
    {
      id: 3,
      title: 'Janja Garnbret Wins Olympic Gold',
      contentType: 'image',
      contentUrl: 'https://gripped.com/wp-content/uploads/2024/08/20240810_9848_JANVIRTA_240ppi-1-scaled.jpg',
      body: 'On the final day of Sport Climbing at the Olympic Games, the womens combined climbing podium has been decided, and its defending Olympic Champion Janja Garnbret who will be taking home the Gold.',
    },
    {
      id: 4,
      title: 'Alex Megos climbs Change (9b+)',
      contentType: 'image',
      contentUrl: 'https://img.ukclimbing.com/i/435365?fm=webp&time=1724409943&dpr=2&w=1134&sharp=7&s=6f4662d20c9ee318c32a9ef508f5f7a5',
      body: 'Alex Megos has made the fourth ascent of Change (9b+), in Hanshelleren Cave in Flatanger, Norway. Megos climbed the route in just his fifth session, without having climbed either of the routes two pitches in isolation.',
    },
    {
      id: 5,
      title: 'Iconic Rocklands Hatchling Boulder Collapses',
      contentType: 'image',
      contentUrl: 'https://img.ukclimbing.com/i/196334?fm=webp&time=1582704776&s=4483ee6238346611c6696b32d7a996d1',
      body: 'One of the most famous boulders in Rocklands, South Africa, collapsed last week. The Hatchling (f7C+), first climbed in 2008 by Noah Kaufman, was given its name due to the shape of the precariously-balanced boulder resembling a cracked-open eggshell. Initially graded 8A, the difficulty eventually settled at 7C+.',
    },
    {
      id: 6,
      title: 'Anna Hazelnutt Climbing a Famous 5.13d Slab',
      contentType: 'video',
      contentUrl: 'https://www.youtube.com/embed/4SIHNd6kEGY',
      body: 'Anna Hazelnutt climbs Ron Kauks test-piece slab route Peace 5.13d in Yosemite National Park. Peace is a 45-metre technical route that was first climbed nearly 30 years ago.',
    },
    {
      id: 7,
      title: 'Toby Roberts wins Olympic Gold',
      contentType: 'image', 
      contentUrl: 'https://img.ukclimbing.com/i/434227?fm=webp&time=1723205192&dpr=2&w=1134&sharp=7&s=37f06aae4c2f295e0316d7565fe1479f',
      body: 'After three days of climbing, a new Olympic Champion has been decided, and its Toby Roberts who stands on top of the podium. It was a thrilling final round of climbing for the mens combined event at the Paris Olympics today, with Toby Roberts of Great Britain going home with the gold medal. In second was Japanese climber Sorato Anratu and in third was Austrian Jakob Schubert.',
    },
    {
      id: 8,
      title: 'Climbing Youth World Championships 2024 in Guiyang, China',
      contentType: 'image', 
      contentUrl: 'https://www.planetmountain.com/uploads/img/1/130513.jpg', 
      body: 'The IFSC Youth World Championships 2024 will take place at Guiyang in China. 599 athletes from 49 nations are taking part in the 10-day event.',
    },
    {
      id: 10,
      title: 'Watch Robbie Phillips repeating & Seb Berthe flashing Le Voyage at Annot',
      contentType: 'video', 
      contentUrl: 'https://www.youtube.com/embed/x7BwDT4xrhE', 
      body: 'In April 2023 Belgian climber Sébastien Berthe managed to flash one of the hardest trad climbs in France, Le voyage at Annot in France. First ascended by James Pearson in 2017, this line boasts difficulties up to 8b+ but is graded E10 7a as it is protected by cams and wires. Berthe flashed the line after Robbie Phillips repeated it, and after spending a day watching the Scot and Mathieu Miquel work the moves.',
    },
    {
      id: 11,
      title: 'Janja Garnbret climb Fontainebleaus Big Five in a day',
      contentType: 'video', 
      contentUrl: 'https://www.youtube.com/embed/lVgCdN24xD8', 
      body: 'The video of Slovenias Janja Garnbret climbing the iconic Big Five boulder problems at Fontainebleau in France in a single day: Big Boss, Fourmis Rouge, Tristesse, Big Golden and Atrésie.',
    },
    {
      id: 12,
      title: 'Michaela Kiersch sends Amandla (8B+)',
      contentType: 'image', 
      contentUrl: 'https://www.planetmountain.com/uploads/img/1/130346.jpg', 
      body: 'American climber Michaela Kiersch recently returned from a highly successful bouldering trip to Rocklands in South Africa, where she amassed a huge list of ascents that include Amandla 8B+. What makes her repeats even more impressive is the fact that prior to the trip the 29-year-old had fractured her finger.',
    },
    {
      id: 13,
      title: 'Devotion: Jakob Schuberts journey to the apex of sport climbing',
      contentType: 'video', 
      contentUrl: 'https://www.youtube.com/embed/y47TXwLbCu8',
      body: 'Jakob Schubert is in a class of his own: two Olympic bronze medals, six world championship titles and the highest level of difficulty ever mastered in lead climbing and bouldering. Heres the path that got him there.',
    },
  ];

  return (
    <div className="home-container">
      <div className="feed">
        {posts.map((post) => ( // Map through each post to render
          <div key={post.id} className="post-card">
            <h2 className="post-title">{post.title}</h2>
            {post.contentType === 'video' && ( // Render a video if the content type is 'video'
              <div className="video-wrapper">
                <iframe
                  src={post.contentUrl} // Video URL
                  title={post.title} // Title for accessibility
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            {post.contentType === 'image' && ( // Render an image if the content type is 'image'
              <div className="post-content">
                <img src={post.contentUrl} alt={post.title} className="post-image" /> {/* Image with alt text */}
              </div>
            )}
            {post.contentType === 'text' && ( // Render text if the content type is 'text'
              <div className="post-content">
                <p>{post.content}</p>
              </div>
            )}
            <p className="post-body">{post.body}</p> {/* Post description */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
