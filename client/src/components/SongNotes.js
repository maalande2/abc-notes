import React, { useRef, useState } from 'react'

function SongNotes() {
  const songRef = useRef();
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents reload
    const songName = songRef.current.value;
    console.log(songName);
    setIsLoading(true);
    
    // try fetch req
    try {
      const response = await fetch('/get-notes', {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({songName}) // jsonify songName from songRef
      })

      const data = await response.json();
      setIsLoading(false);
      console.log(data.notes);
      setNotes(data.notes); // notes from server
    } catch(err) {
      console.error(err.message);
    }
  }


  return (
  <div className="bg-gray-600 h-screen w-screen flex flex-col items-center justify-center px-4">
    
    {/* navigation buttons */}
    <div className='absolute top-4 left-4 flex flex-row space-x-4'>
      <a href="/" className='text-gray-100 underline'>home</a>
      <a href="/search" className='text-gray-100 underline'>search song</a>
    </div>

    {/* page title */}
    <h1 className="absolute top-32 left-1/2 transform -translate-x-1/2 text-gray-100 text-2xl">
          abc notes
    </h1>

    {/* song search form */}
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-xl mb-4">
      <input
        ref={songRef}
        placeholder="enter music and artist"
        className="bg-gray-300 rounded-md p-2 placeholder:text-md text-md flex-1"
      />
      <button
        type="submit"
        className="bg-gray-300 text-gray-800 rounded-md p-2"
      >
        get notes
      </button>
    </form>

    {/* result box for notes */}
    <div className="bg-gray-700 w-full max-w-xl min-h-[120px] p-4 rounded-md text-gray-100 shadow-md">
      { isLoading ? (
        <p className='animate-pulse'>Loading Notes...</p>
      ) : (
        <pre>{notes}</pre>
      )}
    </div>
  </div>
  );
  
}

export default SongNotes