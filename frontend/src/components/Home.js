import React from 'react';
import './Home.css'; // Import the CSS file

const Home = () => {
  const posts = [
    {
      id: 1,
      title: 'Adam Ondra Climbs his 212th 9a | Narcissus',
      contentType: 'video',
      contentUrl: 'https://www.youtube.com/embed/PzgOb99i654',
      body: 'Text goes here',
    },
    {
      id: 2,
      title: 'Max Milne flashes Bewilderness (8B+)',
      contentType: 'image',
      contentUrl: 'https://img.ukclimbing.com/i/435037?fm=webp&time=1724070115&dpr=2&w=768&sharp=7&s=bb4dfef68a3a7c1234bd7f29955ade5d',
      body: 'Text goes here',
    },
    {
      id: 3,
      title: 'Sample Text Post',
      contentType: 'text',
      content: 'Text goes here',
    },
    {
      id: 4,
      title: 'Alex Megos climbs Change (9b+)',
      contentType: 'image',
      contentUrl: 'https://img.ukclimbing.com/i/435365?fm=webp&time=1724409943&dpr=2&w=1134&sharp=7&s=6f4662d20c9ee318c32a9ef508f5f7a5',
      body: 'Text goes here',
    },
    {
      id: 5,
      title: 'Iconic Rocklands Hatchling Boulder Collapses',
      contentType: 'image',
      contentUrl: 'https://img.ukclimbing.com/i/196334?fm=webp&time=1582704776&s=4483ee6238346611c6696b32d7a996d1',
      body: 'Text goes here',
    },
    
  ];

  return (
    <div className="home-container">
      <div className="feed">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h2 className="post-title">{post.title}</h2>
            {post.contentType === 'video' && (
              <div className="video-wrapper">
                <iframe
                  src={post.contentUrl}
                  title={post.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            {post.contentType === 'image' && (
              <div className="post-content">
                <a href={post.contentUrl} target="_blank" rel="noopener noreferrer">
                  <img src={post.contentUrl} alt={post.title} className="post-image" />
                </a>
              </div>
            )}
            {post.contentType === 'text' && (
              <div className="post-content">
                <p>{post.content}</p>
              </div>
            )}
            <p className="post-body">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
