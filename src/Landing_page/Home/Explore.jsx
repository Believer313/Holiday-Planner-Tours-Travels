const Explore = () => {
  return (
    <div className='explore'>
      <h1>Explore with Us</h1>
      <p>
        "Our most popular tours take you on a journey to discover the beauty of creation .From the stunning landscapes of the countryside to the hustle and bustle of the city, our tours offer a unique experience that will leave you with unforgettable memories. Whether you’re looking for a relaxing retreat or an action-packed adventure, we have something for everyone. So why wait? Book your dream holiday today and let us take you on the trip of a lifetime!"
      </p>
      <div className='explore-tours'>
        <div className='tour'>
          <img src='/assets/MumbaiCity.jpg' alt='tour1' />
          <h3>City Breaks</h3>
          <p>Explore the city with our guided tours</p>
        </div>
        <div className='tour'>
          <img src='/assets/sunderban tiger.jpg' alt='tour2' />
          <h3>Winter Holidays</h3>
          <p>Relax and enjoy the mangroove forest of Sunderban and the breathtaking site of the Royal Bengal Tiger</p>
        </div>
        <div className='tour'>
          <img src='/assets/Mountains.jpg'alt='tour3' />
          <h3>Adventure Tours</h3>
          <p>Get your adrenaline pumping with our adventure tours on Mountains </p>
        </div>
        <div className='tour'>
          <img src='/assets/Puruliabeauty.jpg' alt='tour4' />
          <h3>Family Holidays</h3>
          <p>Enjoy quality time with your loved ones along with the beauty of Bengal </p>
        </div>

      </div>
    </div>
  )
}
export default Explore