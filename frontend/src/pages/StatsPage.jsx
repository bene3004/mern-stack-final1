import { useEffect, useState } from 'react';
import axios from 'axios';

const StatsPage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get('/api/notes/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error('Error while loading the stats', err));
  }, []);

  return (
    <div>
      <h2>Total Notes per user</h2>
      <ul>
        {stats.map((item) => (
          <li key={item.userId}>
            {item.username}: {item.totalNotes} Notes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatsPage;