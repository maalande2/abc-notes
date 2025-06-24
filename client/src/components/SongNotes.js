import React, { useRef} from 'react'

function SongNotes() {
  const songRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents reload
    const songName = songRef.current.value;
    console.log(songName);

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
      console.log(data.notes); // notes stored in data.notes from flask
    } catch(err) {
      console.error(err.message);
    }
  }


  return (
<div className="bg-gray-600 h-screen w-screen flex flex-col items-center justify-center px-4">
  <h1 className="text-gray-100 text-2xl -mt-16 mb-16">abc notes</h1>

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

  </div>
</div>
  );
  
}

export default SongNotes