import React, { useState } from 'react'

function App() {

  const [song, setSong] = useState('');  // unused rn


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("user input =\t", song);

    const musicData = {
      song,
    };
    console.log("musicData: ", musicData);
    try {
      const response = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( musicData ),
      });

      const result = await response.json();
      console.log('Response from server:', result);
    } 
    catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="song"
        value={song}
        onChange={(e) => setSong(e.target.value)}
        placeholder="song"
      />
      <button type="submit">Submit</button>
      </form>
    </div>
  );

}

export default App