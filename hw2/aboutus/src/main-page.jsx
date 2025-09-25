import './App.css';
import Box from './box';   


function MainPage() {
  return (
    <div className="App">
      <h1> ABOUT ME ^^</h1>


      <div className="side left">
        </div>
        <div className="side right">
        </div>

      {/* Top */}
      <div className="top-section">
        <Box className="picture-box">
        </Box>

        <Box className="favorites-box" title="MY FAVORITE">
          <p>Artist: Gorillaz</p>
          <p>Song: Merry Christmas Mr. Lawrance</p>
          <p>Manga: Tokyo Ghoul</p>
          <p>Movie: Interstellar</p>
        </Box>
  
      </div>

      {/* Middle */}
      <Box className="info-box">
        <p>Name: Nurakyn Ayala</p>
        <p>Birthday: 24.07</p>
        <p>Pronouns: she/her/hers</p>
        <p>Language(s) I speak: Kazakh, Russian, English</p>
        <p>MBTI: INTJ</p>
      </Box>

      {/* Bottom */}
      <div className="bottom-section">
        <Box title="Hobbies">
          <ul>
            <li>• Watching movies </li>
            <li>• Daydreaming</li>
            <li>• Building mini houses</li>
            <li>• Learning languages</li>
          </ul>
        </Box>

        <Box title="Random facts">
          <ul>
            <li>• Obsessed with music</li>
            <li>• Fav number is 8</li>
            <li>• Late owl person</li>
            <li>• Wanted to be architect</li>
          </ul>
        </Box>
      </div>
    </div>
  );
}

export default MainPage;
